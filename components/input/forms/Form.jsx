import {
  useContext,
  useState,
  forwardRef,
  useImperativeHandle,
  memo,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import {View} from 'react-native';

import PropTypes from 'prop-types';
import {useForm, FormProvider} from 'react-hook-form';

import {fuseObjects} from '@ares/core/objects';
import {convertArrayToObject} from '@ares/core/arrays';

import {format} from '@ares/core/dataDescriptors';

import {aReSContext} from '@ares/react-native-ui/contexts/ARESContext';
import Button from '@ares/react-native-ui/components/input/actions/Button';
import TranslatedText from '@ares/react-native-ui/components/output/TranslatedText';
import Field from './Field';
import {getUiTokens} from '../../../styles';

function initData(newData, aReS) {
  const ret = {};
  if (typeof newData === 'string') {
    try {
      ret.data = JSON.parse(newData);
    } catch {
      ret.data = {};
    }
  } else if (Array.isArray(newData)) {
    ret.data = convertArrayToObject(newData);
  } else if (typeof newData === 'function') {
    ret.data = newData();
  } else if (newData && typeof newData === 'object') {
    ret.data = newData;
  } else {
    ret.data = {};
  }

  ret.request = {body: ret.data, session: {id: 'default'}};
  ret.mapper = null;
  return ret;
}

export const Form = forwardRef(  (
  {
    defaultData,
    connectionSetting,
    name,
    title,
    description,
    query,
    transaction,
    getToken,
    headers,
    parametersValidationRoles,
    style,
    mapParameters,
    onSubmit,
    onReset,
    mapResults,
    target,
    actions,
  },
  ref,
) => {
  const tokens = getUiTokens(style?.tokens);
  const {state} = useContext(aReSContext);
  const aReS = state.aReS;
  if (!aReS) {
    throw new Error('Form requires ARESProvider and setConfig({ ares }) before rendering.');
  }
  const initializedData = initData(defaultData, aReS);
  if (connectionSetting && query && aReS?.datasourceMap?.[connectionSetting]?.[query]) {
    initializedData.mapper = aReS.datasourceMap[connectionSetting][query];
  }
  if (state?.sessionId) {
    initializedData.request.session.id = state.sessionId;
  }
  const [request, setRequest] = useState(initializedData.request);
  const [data, setDataNatively] = useState(initializedData.data);
  const [mapper, setMapper] = useState(initializedData.mapper);
  const [dataDescriptorMap, setDataDescriptorMap] = useState({});

 useEffect(() => {
    const loadDataDescriptorMap = async () => {
      setDataDescriptorMap( await parametersValidationRoles(request, aReS));
    };
    loadDataDescriptorMap();
  }, [parametersValidationRoles, aReS, request]);


  const createRequest = useCallback((dataToSend) => {
    let preparedRequest = aReS.createRequest({
      body: mapParameters ? mapParameters(dataToSend) : dataToSend,
      options: {
        headers,
      },
    });
    if (getToken && typeof getToken === 'function') {
      preparedRequest = {
        ...preparedRequest,
        ...getToken(aReS),
      };
    } else if (getToken && typeof getToken === 'object') {
      preparedRequest = {
        ...preparedRequest,
        ...getToken,
      };
    }
    return preparedRequest;
  }, [aReS, mapParameters, headers, getToken]);

  const resolver = useCallback(
    async values => {
      const reqLike = {
        ...(values ?? {}),
        body: values ?? {},
        parameters: values ?? {},
        query: values ?? {},
        session: request?.session,
      };
      const formatted = await format(reqLike, dataDescriptorMap ?? {}, null);
      const errors = {};
      const resolvedValues = {};
      for (const k of Object.keys(dataDescriptorMap ?? {})) {
        resolvedValues[k] = formatted[k];
        if (formatted?.['€rror']?.[k]?.length) {
          const descriptorMessageKey = dataDescriptorMap?.[k]?.error_message;
          const fallbackType = formatted['€rror'][k][0] ?? 'default';
          const fallbackKey = `ares.form.validation.${fallbackType}`;
          errors[k] = {
            type: formatted['€rror'][k][0],
            message: descriptorMessageKey ?? fallbackKey,
          };
        }
      }
      return {
        values: resolvedValues,
        errors,
      };
    },
    [dataDescriptorMap, request?.session],
  );

  const methods = useForm({
    defaultValues: data ?? {},
    resolver,
    mode: 'onChange',
  });
  const {handleSubmit, reset, trigger, setError, clearErrors, formState} = methods;

  const setData = useCallback(
    async (newData, validate = false) => {
      const next = initData(newData, aReS);
      setDataNatively(next.data);
      const preparedRequest = createRequest(next.data);
      if (state?.sessionId) {
        preparedRequest.session = {id: state.sessionId};
      }
      setRequest(preparedRequest);
      reset(next.data);
      if (validate) {
        await trigger();
      }
      if (connectionSetting && query && aReS?.datasourceMap?.[connectionSetting]?.[query]) {
        setMapper(aReS.datasourceMap[connectionSetting][query]);
      }
      return {data: next.data, request: preparedRequest};
    },
    [aReS, state?.sessionId, reset, trigger, createRequest, connectionSetting, query],
  );

  const handleSubmitCallback = useCallback(async (dataToSend) => {
    let preparedRequest = createRequest(dataToSend);
    setRequest(preparedRequest);
    const isJWTSensible = mapper?.isJWTSensible && getToken;
    if (isJWTSensible && typeof getToken === 'function') {
      preparedRequest = {
        ...preparedRequest,
        ...getToken(aReS),
      };
    } else if (isJWTSensible && typeof getToken === 'object') {
      preparedRequest = {
        ...preparedRequest,
        ...getToken,
      };
    }
    clearErrors('root');
    let response = null;
    try {
      if (mapper?.execute) {
        response = await mapper.execute(preparedRequest);
      }
    } catch (e) {
      setError('root', {
        type: 'submit',
        message: 'ares.form.validation.submit',
      });
      throw e;
    }
    if (mapResults) {
      response = mapResults(response);
    }
    if (onSubmit) {
      onSubmit(dataToSend);
    }
    return response;
  }, [aReS, clearErrors, createRequest, getToken, mapper, mapResults, onSubmit, setError]);

  const computedActions = useMemo(() => {
    const next = {
      ...(actions || {}),
    };
    next.submit = next.submit || {text: 'ares.submit'};
    next.submit.handler = handleSubmit(next.submit.handler || handleSubmitCallback);
    next.submit.positionIndex = 1000;
    return next;
  }, [actions, handleSubmit, handleSubmitCallback]);



  const wrapperStyle = style?.wrapper;
  const defaultWrapperStyle = {flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md, padding: tokens.spacing.md};
  const titleStyle = style?.title ?? {fontSize: tokens.typography.size.xl, fontWeight: tokens.typography.weight.bold, color: tokens.colors.text, marginBottom: tokens.spacing.xs};
  const descriptionStyle = [
    style?.description ?? {fontSize: tokens.typography.size.md, color: tokens.colors.textMuted, marginBottom: tokens.spacing.md},
  ];
  const formFieldStyle = style?.fieldSetting ?? {};
  const formActionStyle = style?.actionSetting ?? {
    wrapper: {
      borderRadius: tokens.radii.md,
      backgroundColor: tokens.colors.surface,
      borderWidth: 1,
      borderColor: tokens.colors.border,
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
      marginTop: tokens.spacing.sm,
      alignItems: 'center',
      justifyContent: 'center',
    },
    wrapperOnPress: {backgroundColor: tokens.colors.surface2},
    text: {fontSize: tokens.typography.size.md, fontWeight: tokens.typography.weight.semibold, color: tokens.colors.text},
  };

  useImperativeHandle(ref, () => ({
    data,
    setData,
    request,
  }));
  return (
    <View
      ref={ref}
      style={wrapperStyle ?? defaultWrapperStyle}>
      <FormProvider {...methods}>
        <TranslatedText style={titleStyle} text={title}/>
        <TranslatedText style={descriptionStyle} text={description}/>
          <ShowFields dataDescriptorMap={dataDescriptorMap} formFieldStyle={formFieldStyle} formActionStyle={formActionStyle} />
          <ShowErrors tokens={tokens} dataDescriptorMap={dataDescriptorMap} errors={formState?.errors} formName={name} />
          <ShowActions actions={computedActions} formActionStyle={formActionStyle} />
      </FormProvider>
    </View>
  );
});
Form.propTypes = {
  defaultData: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.func,
    PropTypes.object,
  ]),
  connectionSetting: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  query: PropTypes.string.isRequired,
  transaction: PropTypes.bool,
  getToken: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  headers: PropTypes.object,
  parametersValidationRoles: PropTypes.func,
  mapParameters: PropTypes.func,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  mapResults: PropTypes.func,
  target: PropTypes.object,
  actions: PropTypes.object,
};
export default memo(Form);


function ShowFields({dataDescriptorMap, formFieldStyle, formActionStyle}){
  return Object.keys(dataDescriptorMap ?? {})
    .sort((k1, k2) => {
      return (dataDescriptorMap[k1]?.positionIndex ?? 0) - (dataDescriptorMap[k2]?.positionIndex ?? 0);
    })
    .map(k => {
      if(!dataDescriptorMap[k].id) {dataDescriptorMap[k].id = k;}
      if(!dataDescriptorMap[k].name) {dataDescriptorMap[k].name = k;}
      return(<Field key={k} formFieldStyle={formFieldStyle} formActionStyle={formActionStyle} {...dataDescriptorMap[k]} />);});
}

function ShowErrors({tokens, dataDescriptorMap, errors, formName}){
  const fullWidthStyle = {minWidth: '100%'};
  const entries = Object.entries(errors ?? {}).filter(([k]) => k !== 'root');
  const rootError = errors?.root;
  if (entries.length === 0 && !rootError) {
    return null;
  }
  const rootMessageKey = rootError?.message ?? 'ares.form.validation.submit';
  return (
    <View style={fullWidthStyle}>
      {rootError ? (
        <TranslatedText
          style={{color: tokens?.colors?.danger ?? 'red'}}
          text={{key: rootMessageKey, params: [formName ?? 'form']}}
        />
      ) : null}
      {entries.map(([fieldName, err]) => {
        const descriptorMessageKey = dataDescriptorMap?.[fieldName]?.error_message;
        const messageKey = descriptorMessageKey ?? err?.message ?? `ares.form.validation.${err?.type ?? 'default'}`;
        return (
          <TranslatedText
            key={fieldName}
            style={{color: tokens?.colors?.danger ?? 'red'}}
            text={{key: messageKey, params: [fieldName]}}
          />
        );
      })}
    </View>
  );
}

function ShowActions({actions, style, formActionStyle}){
  return Object.keys(actions)
    .sort((k1, k2) => {
      const pos1 = actions[k1]?.positionIndex ?? 0;
      const pos2 = actions[k2]?.positionIndex ?? 0;
      return pos1 - pos2;
    })
    .map((k, i) => {
      const actSyle = fuseObjects(fuseObjects(
        fuseObjects(
          style?.action?.button,
          style?.action ? style?.action[k] ?? {} : {},
        ),
        actions[k].style,
      ) , formActionStyle);
     return  <Button
        key={k}
        icon={actions[k].icon}
        text={actions[k].text}
        onPress={actions[k].handler}
        style={actSyle}
      />;
    });
}
