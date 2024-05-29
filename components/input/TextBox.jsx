import React, { useContext, useEffect, useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import BaseInput from './BaseInput';
import aReS from '../contexts/aReSContext.js';

const TextBox = ({ id, name, validator, onChange, options, context }) => {
  
  const {aReSContext} = useContext(aReS);
  const {realOptions , setRealOptions} = useState([]);

  useEffect(() => {
    if(Array.isArray(options)) setRealOptions(options);
    else if(options.connectionSetting ){
      aReSContext.
    }
  }, [options ,realOptions, setRealOptions]);


  return (
    <BaseInput>
      { !options && 
        <TextInput
          style={styles.input}
          onChangeText={handleChange}
          value={context[name]}
        />
      }
    </BaseInput>
    
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
  },
});

export default TextBox;
