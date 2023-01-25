import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';

const InputForm = ({
  labelValue,
  placeholderText,
  inputBackgroundColor,
  _ref,
  ...rest
}) => {
  return (
    <View
      style={[styles.inputContainer, {backgroundColor: inputBackgroundColor}]}>
      <TextInput
        value={labelValue}
        style={styles.input}
        numberOfLines={1}
        placeholder={placeholderText}
        placeholderTextColor="#666"
        ref={_ref}
        {...rest}
      />
    </View>
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
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    flex: 1,
    padding: 10,
  },
});
