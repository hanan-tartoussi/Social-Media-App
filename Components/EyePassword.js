import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';

const EyePassword = ({passEyeName, ...rest}) => {
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        paddingRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 0,
      }}
      {...rest}>
      <Ionicons name={passEyeName} size={25} color="#666" />
    </TouchableOpacity>
  );
};

export default EyePassword;
