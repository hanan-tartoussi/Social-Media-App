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
    // width: '80%',
    borderRadius: 10,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#f57c00', //'#FF1493',
    // width: '80%',
    // borderRadius: 25,
    // height: 50,
    // alignItems: 'center',
    // justifyContent: 'center',
    // marginTop: 30,
    // backgroundColor: '#4da6ff', //'#FF1493',
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
