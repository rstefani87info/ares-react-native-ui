
import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import Controller from '../fields/Field';
import {fuseObjects} from '@ares/core/objects';
import useLocales from '../../../locales/useLocales';
import TranslatedText from '../../output/TranslatedText';

Field.propTypes={
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    exists: PropTypes.bool,
    notExists: PropTypes.bool,
    fieldComponent: PropTypes.func,
    helperLink: PropTypes.shape({
      text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      onPress: PropTypes.func,
    }),
    helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    wrapper: PropTypes.func,
    actions: PropTypes.object,
    style: PropTypes.object,
    required: PropTypes.bool,
    formFieldStyle: PropTypes.object,
    formActionStyle: PropTypes.object,
  };
export function Field ({
    label,
    type,
    placeholder,
    exists,
    notExists,
    fieldComponent,
    helperLink,
    helperText,
    wrapper,
    actions,
    style,
    required=false,
    formFieldStyle={},
    formActionStyle={},
    
    ...props
  },key) {
    const {translate} = useLocales();
    let FieldComponent = fieldComponent || Controller;
    let options = [];
    if (Array.isArray(exists)) {
      options = exists.map(([key, value]) => ({
        value: key,
        text: value,
      }));
      } else if (typeof exists === 'function') {
        options = exists();
      } else if (typeof exists === 'object') {
        options = Object.entries(exists).map(([key, value]) => ({
          value: key,
          text: value,
        }));
      } else if (typeof exists === 'string') {
        options = exists
          .split(/,+\|\s{2,}/)
          .map(option => ({value: option, text: option}));
      }

    if (notExists) {
      if (notExists.dataKeyForStateCache) {
        options = useSelector(
          state => state.cache[notExists.dataKeyForStateCache],
        );
      } else if (typeof notExists === 'function') {
        options = exists();
      } else if (Array.isArray(notExists)) {
        options = notExists.map(([key, value]) => ({
          value: key,
          text: value,
        }));
      } else if (typeof notExists === 'object') {
        options = Object.entries(notExists).map(([key, value]) => ({
          value: key,
          text: value,
        }));
      } else if (typeof exists === 'string') {
        options = exists
          .split(/,+\|\s{2,}/)
          .map(option => ({value: option, text: option}));
      }
    }

    const FieldWrapper = wrapper || View;

    return (
      <FieldWrapper
        key={key}
        style={{
          ...(formFieldStyle?.wrapper ?? {}),
          ...(style?.wrapper ?? {}),
        }}
        {...props}>
        <TranslatedText
          style={[
            ((formFieldStyle?.label) ?? {}),
           (style?.label ?? {}),
          ]} text={label}/>
        {helperText || helperLink ? <View
          style={{
            ...(formFieldStyle?.helper?.wrapper ?? {}),
            ...(style?.helper?.wrapper ?? {}),
            flexDirection: 'row',
          }}>
          {helperText ? <TranslatedText
            style={[
              ...(formFieldStyle?.helper?.text ?? {}),
              ...(style?.helper?.text ?? {}),
            ]}>
            helperText
          </TranslatedText>: null}
          {helperLink && (
            <Link
              style={fuseObjects(
                fuseObjects(
                  formFieldStyle?.helper?.link,
                  style?.helper?.link,
                ),
                helperLink?.style,
              )}
              source={helperLink?.source}>
              {translate(helperLink?.text)}
            </Link>
          )}
        </View> : null}
        <FieldComponent
          type={type}
          style={fuseObjects(formFieldStyle?.component, style?.component)}
          placeholder={translate(placeholder)}
          options={{options}}
        />
        <View
          style={{
            flexDirection: 'row',
            ...fuseObjects(
              formFieldStyle?.actions?.wrapper,
              style?.actions?.wrapper,
            ),
          }}>
          {actions &&
            actions.map((fieldAction, index) => (
              <Button
                key={index}
                onPress={fieldAction[name]}
                style={fuseObjects(
                  fuseObjects(formFieldStyle?.action, style?.action),
                  fieldAction?.style,
                )}
                text={fieldAction?.label}
                icon={fieldAction?.icon}
              />
            ))}
        </View>
      </FieldWrapper>
    );
  };