import React from "react";
import { View, Text, TextInput, Button } from "react-native";
import {
  NativeBaseProvider as nbProvider,
  Box as nbBox,
  Button as nbButton,
  Input as nbInput,
  Select as nbSelect,
} from "native-base";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import * as yup from "yup";

import { objectDescriptorDefinitions } from "./dataDescriptors.js";
import { aReSContext } from "../contexts/aReSContext.js";

const Form = ({
  id,
  name,
  dataDescriptor,
  objectValue,
  onSubmit,
  onError,
  accept_charset,
  action,
  autocomplete,
  enctype,
  method,
  noValidate,
  rel,
  target,
}) => {
  const { aReS } = useContext(aReSContext);
  const dataDescriptorMap = Object.keys(dataDescriptor);
  const schema = yup.object().shape(
    dataDescriptorMap.map((key) => {
      const field = dataDescriptor[key];
      if (field.pattern) {
        return {
          [key]: yup
            .string()
            .matches(field.pattern, aReS.locale.values["form.field.pattern"]),
        };
      } else if (objectDescriptorDefinitions[key]) {
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
      }
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

  return (
    <nbProvider>
      <SafeAreaView>
        <nbBox>
          {dataDescriptorMap.map((key) => (
            <View key={key}>
              <Text>{dataDescriptor[key].label || key}</Text>
              <Controller
                name={key}
                control={control}
                render={({ element }) => {
                  if (dataDescriptor[key] && reactNativeRender) {
                    if (
                      typeof dataDescriptor[key].reactNativeRender ===
                      "function"
                    )
                      dataDescriptor[key].reactNativeRender(element);
                  } else return <nbInput {...element} />;
                }}
              />
              {errors[key] && (
                <Text style={{ color: "red" }}>{errors[key].message}</Text>
              )}
            </View>
          ))}
          <nbButton onPress={handleSubmit(onSubmit)}>Submit</nbButton>
        </nbBox>
      </SafeAreaView>
    </nbProvider>
  );
};

export default Form;
