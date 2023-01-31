import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const ButtonForm = ({buttonTitle, ...others}) => {
  return (
    <TouchableOpacity style={styles.loginBtn} {...others}>
      <Text style={styles.loginText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export default ButtonForm;

const styles = StyleSheet.create({
  loginBtn: {
    borderRadius: 10,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#f57c00',
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
