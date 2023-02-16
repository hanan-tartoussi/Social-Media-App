import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';

const InputForm = ({labelValue, placeholderText, _ref, ...rest}) => {
  return (
    <TextInput
      value={labelValue}
      style={styles.input}
      numberOfLines={1}
      placeholder={placeholderText}
      placeholderTextColor="#666"
      ref={_ref}
      {...rest}
    />
  );
};

export default InputForm;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 5,
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#F6F7FB',
    height: 58,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
    width: '100%',
    color: 'black',
  },
});
