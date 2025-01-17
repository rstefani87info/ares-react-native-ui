import React, {
  useContext,
  useState,
  forwardRef,
  useImperativeHandle,
  memo,
  useCallback,
} from 'react';
import {View, Text} from 'react-native';

import PropTypes from 'prop-types';
import {useForm, FormProvider} from 'react-hook-form';
// import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {fuseObjects} from '@ares/core/objects';
import {convertArrayToObject} from '@ares/core/arrays';

import {objectDescriptorDefinitions} from '@ares/core/dataDescriptors';

import {aReSContext} from '@ares/react-native-ui/contexts/ARESContext';
import Button from '@ares/react-native-ui/components/input/actions/Button';
import Field from './Field';


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
  const {state} = useContext(aReSContext);
 const aReS = state.aReS;
  const initData = (newData, validate) => {
    const ret = {};
      switch (typeof newData) {
        case 'string':
          ret.data = JSON.parse(newData);
          break;
        case 'array':
          ret.data = convertArrayToObject(newData);
          break;
        case 'function':
          ret.data =  newData();
          break;
        case 'object':
          ret.data = newData;
          break;
        default:
          ret.data = {};
      };
      
    ret.request =  {body:ret.data};
    ret.dataDescriptorMap = parametersValidationRoles(ret.request, aReS);
    ret.mapper = aReS.datasourceMap[connectionSetting][query];
    return ret;
  };
  const initialStates = initData(defaultData, false);



  const [request, setRequest] = useState(initialStates.request);
  const [data, setDataNatively] = useState(initialStates.data);
  const [dataDescriptorMap, setDataDescriptorMap] = useState(
    initialStates.dataDescriptorMap);
  const [mapper, setMapper] = useState(initialStates.mapper);
  const [validationSchema, setValidationSchema] = useState(
    yup.object().shape({ })
  );
  const createRequest = dataToSend => {
    let preparedRequest = aReS.createRequest({
      body: mapParameters ? mapParameters(dataToSend) : dataToSend,
      options: {
        headers,
      },
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
    // register,
    // unregister,
    // formState,
    // watch,
    // handleSubmit,
    reset,
    // resetField,
    // setError,
    // clearErrors,
    // setValue,
    // setFocus,
    // getValues,
    // getFieldState,
    trigger,
    // control,
    // Form,
  } = useForm({
    defaultValues: {},
    resolver:  validationSchema,
  });

  const getYupRoles = useCallback( () => {
    const roles = {};
    Object.keys(dataDescriptorMap??{}).forEach(key => {
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
      const ret =  initData(newData, validate);
      if (ret) {
        setDataNatively(ret.data);
        setRequest(ret.request);
        reset(ret.data);
        getYupRoles();
        if (validate) {
          await trigger();
        }
        setDataDescriptorMap(ret.dataDescriptorMap, aReS);
        setMapper( ret.mapper);
      }
      return ret;
    },
    [ reset, trigger,setDataNatively,  setRequest, createRequest, getYupRoles, setDataDescriptorMap, parametersValidationRoles, setMapper]
  );

  
   
   

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

  const wrapperStyle = style?.wrapper;
  const titleStyle = style?.title ?? {fontSize: 20, fontWeight: 'bold', marginBottom: 10};
  const descriptionStyle = [
    style?.description ?? {fontSize: 16, marginBottom: 10},
  ];
  const formFieldStyle = style?.fieldSetting ?? {};
  const formActionStyle = style?.actionSetting ?? {};

  const showFields = useCallback(() => {
    return Object.keys(dataDescriptorMap??{})
      .sort((k1, k2) => {
        let pos1 = dataDescriptorMap[k1].positionIndex;
        if (!pos1) pos1 = 0;
        let pos2 = dataDescriptorMap[k2].positionIndex;
        if (!pos2) pos2 = 0;
        return pos1 - pos2;
      })
      .map(k => {
        if(!dataDescriptorMap[k].id) dataDescriptorMap[k].id=k;
        if(!dataDescriptorMap[k].name) dataDescriptorMap[k].name=k;
        return(<Field key={k} formFieldStyle={formFieldStyle} formActionStyle={formActionStyle} {...dataDescriptorMap[k]} />)});
  }, [dataDescriptorMap] );

  const showActions = () => {
    return Object.keys(actions)
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
    <View ref={ref} style={wrapperStyle ?? {flexDirection: 'row', flexWrap: 'wrap'}}>
      <FormProvider>
        <Text style={titleStyle}>{title}</Text>
        <Text style={descriptionStyle}>{description}</Text>
          {showFields()}
          {showActions()}
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
