import React, {
  useContext,
  useState,
  forwardRef,
  useEffect,
  useImperativeHandle,
  memo,
  useCallback,
} from 'react';
import {View, Text} from 'react-native';

import PropTypes from 'prop-types';
import {useForm, FormProvider} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useSelector} from 'redux';

import {fuseObjects} from '@ares/core/objects';
import {convertArrayToObject} from '@ares/core/arrays';

import {objectDescriptorDefinitions} from '@ares/core/dataDescriptors';
import Field, {types} from './fields/Field';
import {aReSContext} from '../../contexts/ARESContext';
import Button from './actions/Button';


export const Form = forwardRef(function (
  {
    defaultData = {},
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
    actions = {},
  },
  ref,
) {
  const {aReS} = useContext(aReSContext);
  console.log('aReS', aReS);
  const dataKeyArray = query.split(/[\/\\\.]+/);
  const [request, setRequest] = useState({});
  const [data, setDataNatively] = useState(null);
  const [dataDescriptorMap, setDataDescriptorMap] = useState({});
  const [mapper, setMapper] = useState(null);
  const isUsingStateCache = defaultData && typeof defaultData === 'string';
  // const error = useSelector(state => state.cache.error);
  const [validationSchema, setValidationSchema] = useState(
    yup.object().shape({ })
  );
  const selector = useSelector(state =>
    isUsingStateCache ? state.cache[defaultData] : {},
  );
  const createRequest = async dataToSend => {
    let preparedRequest = await aReS.createRequest({
      body: mapParameters ? mapParameters(dataToSend) : dataToSend,
    });
    if (getToken) {
      preparedRequest = {
        ...preparedRequest,
        ...getToken(aReS),
      };
    }
    return preparedRequest;
  };

  const {
    register,
    unregister,
    formState,
    watch,
    handleSubmit,
    reset,
    resetField,
    setError,
    clearErrors,
    setValue,
    setFocus,
    getValues,
    getFieldState,
    trigger,
    control,
    Form,
  } = useForm({
    defaultValues: {},
    resolver:  validationSchema,
  });

  const getYupRoles = useCallback( () => {
    const roles = {};
    Object.keys(dataDescriptorMap).forEach(key => {
      const field = [key];
      roles[key] = yup
        .string()
        .test(
          'form.field.' + key,
          aReS.locale.values['form.field.' + key],
          value =>
            objectDescriptorDefinitions[key](value, dataDescriptorMap[key]),
        );
    });
    setValidation(roles);
    return roles;
  }, [dataDescriptorMap, aReS]);

  const setValidation = useCallback( (roles) => {
    setValidationSchema( yup.object().shape(roles));
  }, []);

  const setData = useCallback(
    async (newData, validate) => {
      let ret;
      if (newData) {
        switch (typeof newData) {
          case 'string':
            ret = selector;
            break;
          case 'array':
            ret = convertArrayToObject(newData);
            break;
          case 'function':
            ret = await newData();
            break;
          case 'object':
            ret = newData;
            break;
          default:
            ret = {};
        }
        setDataNatively(ret);
        setRequest(await createRequest(ret));
        reset(ret);
        getYupRoles();
        if (validate) {
          await trigger();
        }
        setDataDescriptorMap(parametersValidationRoles(request, aReS));
        setMapper( aReS.datasourceMap[connectionSetting.name][query]);
      }
      return ret;
    },
    [selector, reset, trigger,setDataNatively,  setRequest, createRequest, getYupRoles, setDataDescriptorMap, parametersValidationRoles, setMapper]
  );

  setData(defaultData, false);

  const handleSubmitCallback = useCallback(async dataToSend => {
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
    let response = mapper.execute(preparedRequest);
    if (mapResults) {
      response = mapResults(response);
    }
    if (onSubmit) {
      onSubmit(dataToSend);
    }
  });


  const submit =  {handler: handleSubmitCallback, positionIndex: 100};
  actions = {
    ...actions,
  };

  if(!actions.submit) {
    actions.submit = submit;
  }

  const styleByName = style?.forms ? style?.forms[name] ?? {} : {};
  const wrapperStyle = [style?.form.wrapper, styleByName?.wrapper ?? {}];
  const titleStyle = [style?.form.title, styleByName?.title ?? {}];
  const descriptionStyle = [
    style?.form.description,
    styleByName?.description ?? {},
  ];
  const formFieldStyle = fuseObjects(
    style?.form.fieldSetting,
    styleByName?.fieldSetting,
  );
  const formActionStyle = fuseObjects(
    style?.form.actionSetting,
    styleByName?.actionSetting,
  );

  const renderField = (key, field) => {
    const {
      label,
      placeholder,
      exists:optionSettings,
      notExists:optionSettingsNotExists,
      fieldComponent,
      helperLink: fieldHelperLink,
      helperText: fieldHelperText,
      wrapper,
      actions: fieldActions,
      style: fieldStyle,
      required=false,
    } = field;
    let FieldComponent = fieldComponent || TextInput;
    let options = [];
    if (optionSettings) {
      if (optionSettings.dataKeyForStateCache) {
        options = useSelector(
          state => state.cache[optionSettings.dataKeyForStateCache],
        );
      } else if (typeof optionSettings === 'function') {
        options = optionSettings();
      } else if (Array.isArray(optionSettings)) {
        options = optionSettings.map(([key, value]) => ({
          value: key,
          text: value,
        }));
      } else if (typeof optionSettings === 'object') {
        options = Object.entries(optionSettings).map(([key, value]) => ({
          value: key,
          text: value,
        }));
      } else if (typeof optionSettings === 'string') {
        options = optionSettings
          .split(/,+\|\s{2,}/)
          .map(option => ({value: option, text: option}));
      }
    }

    if (optionSettingsNotExists) {
      if (optionSettingsNotExists.dataKeyForStateCache) {
        options = useSelector(
          state => state.cache[optionSettingsNotExists.dataKeyForStateCache],
        );
      } else if (typeof optionSettingsNotExists === 'function') {
        options = optionSettings();
      } else if (Array.isArray(optionSettingsNotExists)) {
        options = optionSettingsNotExists.map(([key, value]) => ({
          value: key,
          text: value,
        }));
      } else if (typeof optionSettingsNotExists === 'object') {
        options = Object.entries(optionSettingsNotExists).map(([key, value]) => ({
          value: key,
          text: value,
        }));
      } else if (typeof optionSettings === 'string') {
        options = optionSettings
          .split(/,+\|\s{2,}/)
          .map(option => ({value: option, text: option}));
      }
    }

    const FieldWrapper = wrapper || View;

    return (
      <FieldWrapper
        key={key}
        style={{
          ...(formFieldStyle.wrapper ?? {}),
          ...(fieldStyle?.wrapper ?? {}),
        }}>
        <Text
          style={[
            ...(formFieldStyle.label ?? {}),
            ...(fieldStyle.label ?? {}),
          ]}>
          {label}
        </Text>
        {fieldHelperText || fieldHelperLink ? <View
          style={{
            ...(formFieldStyle.helper?.wrapper ?? {}),
            ...(fieldStyle?.helper?.wrapper ?? {}),
            flexDirection: 'row',
          }}>
          {fieldHelperText ? <Text
            style={[
              ...(formFieldStyle.helper?.text ?? {}),
              ...(fieldStyle.helper?.text ?? {}),
            ]}>
            fieldHelperText
          </Text>: null}
          {fieldHelperLink && (
            <Link
              style={fuseObjects(
                fuseObjects(
                  formFieldStyle.helper?.link,
                  fieldStyle?.helper?.link,
                ),
                fieldHelperLink.style,
              )}
              source={fieldHelperLink.source}>
              {fieldHelperLink.text}
            </Link>
          )}
        </View> : null}
        {/* <FieldComponent
          style={fuseObjects(formFieldStyle.component, fieldStyle?.component)}
          placeholder={placeholder}
          options={{options}}
        /> */}
        <View
          style={{
            flexDirection: 'row',
            ...fuseObjects(
              formFieldStyle?.actions?.wrapper,
              fieldStyle?.actions?.wrapper,
            ),
          }}>
          {fieldActions &&
            fieldActions.map((fieldAction, index) => (
              <Button
                key={index}
                onPress={fieldAction[name]}
                style={fuseObjects(
                  fuseObjects(formFieldStyle.action, fieldStyle?.action),
                  fieldAction.style,
                )}
                text={fieldAction.label}
                icon={fieldAction.icon}
              />
            ))}
        </View>
      </FieldWrapper>
    );
  };

  const showFields = () => {
    Object.keys(dataDescriptorMap)
      .sort((k1, k2) => {
        let pos1 = dataDescriptorMap[k1].positionIndex;
        if (!pos1) pos1 = 0;
        let pos2 = dataDescriptorMap[k2].positionIndex;
        if (!pos2) pos2 = 0;
        return pos1 - pos2;
      })
      .map(k => renderField(k, dataDescriptorMap[k]));
  };

  const showActions = () => {
    Object.keys(actions)
      .sort((k1, k2) => {
        let pos1 = actions[k1].positionIndex;
        if (!pos1) pos1 = 0;
        let pos2 = actions[k2].positionIndex;
        if (!pos2) pos2 = 0;
        return pos1 - pos2;
      })
      .map((k, i) => (
        <Button
          key={k}
          icon={actions[k].icon}
          text={actions[k].text}
          onPress={actions[k].handler}
          style={fuseObjects(
            fuseObjects(
              style?.action?.button,
              style?.action ? style?.action[k] ?? {} : {},
            ),
            actions[k].style,
          )}
        />
      ));
  };

  useImperativeHandle(ref, () => ({
    data,
    setData,
    request,
  }));
  return (
    <SafeAreaView ref={ref}>
      <FormProvider>
        <Text style={titleStyle}>{title}</Text>
        <Text style={descriptionStyle}>{description}</Text>
        <View style={wrapperStyle ?? {flexDirection: 'row', flexWrap: 'wrap'}}>
          {showFields()}
          {showActions()}
        </View>
      </FormProvider>
    </SafeAreaView>
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
