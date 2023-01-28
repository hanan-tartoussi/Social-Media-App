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
    <TextInput
      value={labelValue}
      style={styles.input}
      numberOfLines={1}
      placeholder={placeholderText}
      placeholderTextColor="#666"
      ref={_ref}
      {...rest}
    />
    // <View
    //   style={[styles.inputContainer, {backgroundColor: inputBackgroundColor}]}>
    //   <TextInput
    //     value={labelValue}
    //     style={styles.input}
    //     numberOfLines={1}
    //     placeholder={placeholderText}
    //     placeholderTextColor="#666"
    //     ref={_ref}
    //     {...rest}
    //   />
    // </View>
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
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
    // justifyContent: 'center',
    // alignItems: 'center',

    // flex: 1,
  },
});
