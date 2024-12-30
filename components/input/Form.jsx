import React from "react";
import { View, Text } from "react-native";

import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import axios from "axios";
import * as yup from "yup";
import { useSelector } from "react-redux";

import { objectDescriptorDefinitions } from "./dataDescriptors";
import Field,{ types } from "./fields/Field";
import { aReSContext } from "../contexts/aReSContext";
import Button from "./actions/Button";

Form.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  path: PropTypes.string,
  query: PropTypes.object,
  transaction: PropTypes.string,
  method: PropTypes.string,
  getToken: PropTypes.func,
  headers: PropTypes.object,
  connectionSetting: PropTypes.object,
  parametersValidationRoles: PropTypes.func,
  graphicArrangement: PropTypes.object,
  mapParameters: PropTypes.func,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  mapResults: PropTypes.func,
  accept_charset: PropTypes.string,
  enctype: PropTypes.string,
  rel: PropTypes.string,
  target: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
}
export default function Form ({
  id,
  name,
  query,
  transaction,
  method,
  getToken,
  headers,
  connectionSetting, 
  parametersValidationRoles,
  style,
	mapParameters,
	onSubmit,
  onReset,
  mapResults,
  accept_charset,
  enctype,
  rel,
  target,
  actions,
  title,
  description,
})  {
  const { aReS } = useContext(aReSContext);
  const dataKeyArray = query.split(/[\/\\\.]+/);
  const [request, setRequest] = useState(aReS.createRequest());
  const data = useSelector(state => state.cache[dataKey]);
  const error = useSelector(state => state.cache.error);
  const dataDescriptorMap = parametersValidationRoles(request,aReS);
  
  
  const schema = yup.object().shape(
    Object.keys(dataDescriptorMap).map((key) => {
      const field = [key];
      return {
        [key]: yup
          .string()
          .test(
            "form.field." + key,
            aReS.locale.values["form.field." + key],
            (value) =>
              objectDescriptorDefinitions[key](value, dataDescriptor[key])
          ),
      };
    })
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: dataDescriptor,
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const axiosFunction = axios[mapper.method.split("|")[0].toLowerCase()];
    const url =
      aReS.datasourceMap[mapper.connectionSetting].baseUrl + "/" + mapper.url;
    const header = aReS.datasourceMap[mapper.connectionSetting].headers || {};
    axiosFunction(url, data, header)
      .then((response) => {
        console.log(response.data);
        onSubmit(response.data, null);
      })
      .catch((error) => {
        console.error(error);
        onSubmit(null, error);
      });
  };

  const graphicArrangementMap = style(aReS);

  return (
    <nbProvider>
      <SafeAreaView>
        <nbBox>
          <DynamicForm name={name} config={graphicArrangementMap} />
        </nbBox>
      </SafeAreaView>
    </nbProvider>
  );
};



export function DynamicForm  ({name, config, style }) {
  const renderHelper = (helperTextOrComponent) => {
    if (helperTextOrComponent) {
     if(helperTextOrComponent instanceof Function )  
      return  (
        {helperTextOrComponent}
      ) ;
    if (typeof helperTextOrComponent === "string")  
          return (  <Text>{helperTextOrComponent}</Text>);
    }
    return null;
  };

  const renderField = (key, field) => {
    const { key, label, placeholder, optionSettings, fieldComponent, helperLink, helperText, wrapper, actions, style: fieldStyle } = field;
    let FieldComponent = fieldComponent || TextInput; 

    let options = [];
    if (optionSettings) {
      if (optionSettings.dataKeyForStateCache) {
        options = useSelector(state => state.cache[optionSettings.dataKeyForStateCache]);
      } else if (typeof optionSettings === 'function') {
        options = optionSettings();
      } else if (Array.isArray(optionSettings)) {
        options = optionSettings.map(([key, value]) => ({ value:key, text:value }));;
      } else if ( typeof optionSettings === 'object') {
        options = Object.entries(optionSettings).map(([key, value]) => ({ value:key, text:value }));
      }else if ( typeof optionSettings === 'string') {
        options =  optionSettings.split(/,+\|\s{2,}/).map(option => ({ value:option, text:option }));
      }
    }

    const FieldWrapper = wrapper || View;

    return (
      <FieldWrapper key={key} style={{...style?.field?.wrapper , ...fieldStyle?.wrapper}}>
        <Text style={[...style?.field?.label, ...fieldStyle.label]}>{label}</Text>
        <View style={{flexDirection:'row',...style?.field?.helper?.wrapper, ...fieldStyle?.helper?.wrapper}}>
        <Text style={[...style?.field?.label, ...fieldStyle.label]}>helperText</Text>
        {helperLink && <Link style={[...style?.field?.helper?.link, ...fieldStyle?.helper?.link, ...helperLink.style]} source={helperLink.source}>{helperLink.text}</Link>}
        </View>
        <FieldComponent  
          style={{...style?.field?.component, ...fieldStyle?.component}}
          placeholder={placeholder}
          // options={{options}}
        />
        {actions && actions.map((action, index) => (
          <Button key={index} onPress={actions[name]} style={ {...style?.field?.action , ...fieldStyle?.action, ...action.style}}>
            <Text>{action.label}</Text>
          </Button>
        ))}
      </FieldWrapper>
    );
  };

  const showFields = () =>{Object.keys(config.fields).sort((k1,k2) =>  {
    let pos1 = config.fields[k1].position;
    if(!pos1) pos1 = 0;
    let pos2 = config.fields[k2].position;
    if(!pos2) pos2 = 0;
    return pos1 - pos2;
    } ).map(key => renderField(key, config.fields[key]))};

  return (
    <View style={config.style??{}}>
      {config.wrapper ? (
        <config.wrapper>
          {showFields()}
        </config.wrapper>
      ) : (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {showFields()}
        </View>
      )}

      {config.actions && config.actions.map((action, index) => {
        return(
          <Button key={index} {...action} style={{...style?.actions, ...action.style}}/>
        );
      })}
    </View>
  );
};

 
function getAcionStyle(style, name) {
  return {
    ...style?.action,
    ...style?.actions[name],
  };
}