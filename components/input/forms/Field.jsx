
import React from 'react';
import PropTypes from 'prop-types';
import Controller from '../fields/Field';
import {fuseObjects} from '@ares/core/objects';
import useLocales from '../../../locales/useLocales';


Field.propTypes={
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    type: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    exists: PropTypes.array,
    notExists: PropTypes.array,
    fieldComponent: PropTypes.func,
    helperLink: PropTypes.shape({
      text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      onPress: PropTypes.func,
    }),
    helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    mask: PropTypes.func,
    actions: PropTypes.object,
    style: PropTypes.object,
    required: PropTypes.bool,
    formFieldStyle: PropTypes.object,
    formActionStyle: PropTypes.object,
    options: PropTypes.array,
  };
export default function Field ({
    label,
    type,
    placeholder,
    exists,
    notExists,
    helperLink,
    helperText,
    mask,
    actions,
    style,
    required=false,
    formFieldStyle={},
    formActionStyle={},
    options,
    ...props
  },key) {
    // if (Array.isArray(exists)) {
    //   options = exists.map((value) => ({
    //     value: value.id,
    //     text: value.name,
    //   }));
    //   } else if (typeof exists === 'function') {
    //     options = exists();
    //   } else if (typeof exists === 'object') {
    //     options = Object.entries(exists).map(([key, value]) => ({
    //       value: key,
    //       text: value,
    //     }));
    //   } else if (typeof exists === 'string') {
    //     options = exists
    //       .split(/,+\|\s{2,}/)
    //       .map(option => ({value: option, text: option}));
    //   }

    // if (notExists) {
    //   if (typeof notExists === 'function') {
    //     options = notExists();
    //   } else if (Array.isArray(notExists)) {
    //     options = notExists.map(([key, value]) => ({
    //       value: key,
    //       text: value,
    //     }));
    //   } else if (typeof notExists === 'object') {
    //     options = Object.entries(notExists).map(([key, value]) => ({
    //       value: key,
    //       text: value,
    //     }));
    //   } else if (typeof exists === 'string') {
    //     options = exists
    //       .split(/,+\|\s{2,}/)
    //       .map(option => ({value: option, text: option}));
    //   }
    // }

    
    const newStyle={};
    newStyle.component = fuseObjects(formFieldStyle?.component, style?.component);
    newStyle.wrapper={
      ...(formFieldStyle?.wrapper ?? {}),
      ...(style?.wrapper ?? {}),
    };
    newStyle.label=[
      ((formFieldStyle?.label) ?? {}),
      (style?.label ?? {}),
    ];
    newStyle.helper={};
    newStyle.helper.wrapper={
      ...(formFieldStyle?.helper?.wrapper ?? {}),
      ...(style?.helper?.wrapper ?? {}),
    };
    newStyle.helper.text={
      ...(formFieldStyle?.helper?.text ?? {}),
      ...(style?.helper?.text ?? {})
    };
    newStyle.helper.link=fuseObjects(
      fuseObjects(
        formFieldStyle?.helper?.link,
        style?.helper?.link,
      ),
      helperLink?.style,
    );
    newStyle.actions={};
    newStyle.actions.wrapper={
      ...fuseObjects(
        formFieldStyle?.actions?.wrapper,
        style?.actions?.wrapper,
      ),
    };
    actions?.forEach((fieldAction, index) => {
      fieldAction.style = fuseObjects(
          fuseObjects(formFieldStyle?.action, style?.action),
          fieldAction?.style,
        );
      }
    );
        
    return (
      <Controller
        mask={mask}
        options={options}
        label={label}
        type={type}
        placeholder={placeholder}
        required={required}
        style={newStyle}
        helperLink={helperLink}
        helperText={helperText}
        actions={actions}
        exists={exists}
        notExists={notExists}
        key={key}
        {...props}
        />)
  };