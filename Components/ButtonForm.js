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
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: '#4da6ff', //'#FF1493',
  },
  loginText: {
    color: '#003366',
    fontWeight: 'bold',
  },
});
