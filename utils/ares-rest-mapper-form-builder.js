
import {objectDescriptorDefinitions} from '@ares/core/dataDescriptors.js';

export function writeYupValidationCode(name,dataDescriptor) {
  if(dataDescriptor){
    let ret= `${name}: yup.${getYupType(dataDescriptor)}()`;
    for(const key in objectDescriptorDefinitions[dataDescriptor.type]) {
      if(dataDescriptor[key]){
        ret+=`.test('${key}', 'not_valide_because_of_${key}', (v) => objectDescriptorDefinitions['${dataDescriptor.type}'].${key}(v,${JSON.stringify(dataDescriptor[key])})')`;
      }
    }
  }

  return ret + ',\n';
}


export function getYupType(field) {
  switch (field.type) {
      case 'date':
          return 'date()';
      case 'boolean':
          return 'boolean()';
      case 'number':
          return 'number()';
      case 'array':
          return 'array()';
      default:
          return 'string()';
  }
}

export function buildFormFromMapper(mapper,aReS) {
    let jsxCode = `import React from 'react';
import {objectDescriptorDefinitions} from '@ares/core/dataDescriptors.js';
import { View, Text, TextInput, Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import * as yup from 'yup';

const schema = yup.object().shape({\n`;

    Object.keys(validateParamObject).forEach(key => {
        const field = validateParamObject[key];

        if (field.pattern) {
            jsxCode += `  ${key}: yup.string().matches(${field.pattern}, '${key} non valido'),\n`;
        } else {
            jsxCode += `  ${key}: yup.string(),\n`;
        }
    });

    jsxCode += `});

const ${mapper.name}_FORM = () => {
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    axios.${ mapper.method.split('|')[0].toLowerCase() }('${aReS.datasourceMap[mapper.connectionSetting].baseUrl}/${mapper.url}', data, ${ JSON.stringify(aReS.datasourceMap[mapper.connectionSetting].headers  || {}) })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View>
      
        <View key={fieldName}>
          <Text>{fieldName}</Text>
          <Controller
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder={fieldName}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
              />
            )}
            name={fieldName}
            defaultValue=""
          />
          {errors[fieldName] && <Text style={{ color: 'red' }}>{errors[fieldName].message}</Text>}
        </View>
       
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default FormComponent;
`;

    return jsxCode;
}

 