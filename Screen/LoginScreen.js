import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState, useContext, useRef} from 'react';
import {Alert, Switch, TouchableOpacity} from 'react-native';
import {StyleSheet, View, Text, Image} from 'react-native';
import ButtonForm from '../Components/ButtonForm';
import InputForm from '../Components/InputForm';
import {AuthContext} from '../Navigation/AuthProvider';

const LoginScreen = ({navigation}) => {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputBackGcolor, setInputBackGcolor] = useState('#cce6ff');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const passwordRef = useRef();
  const {user, login} = useContext(AuthContext);

  const onPress = () => {
    navigation.navigate('Home');
  };

  const emailOnEndEditing = e => {
    var regex = /^[\w-\.]+@([\w]+\.)+[\w]{2,4}$/;
    if (!regex.test(e.nativeEvent.text)) {
      setEmailError('Invalid email.');
    } else {
      setEmailError('');
    }
  };

  const passwordOnEndEditing = e => {
    var regex = /^[\w-\.]+@([\w]+\.)+[\w]{2,4}$/;
    if (!regex.test(e.nativeEvent.text)) {
      setPasswordError('Invalid email.');
    } else {
      setPasswordError('');
    }
  };

  const toggleRememberMe = value => {
    //console.log('3-hello: on change ', value);
    setRememberMe(value);
    if (value === true) {
      //user wants to be remembered
      //console.log('4-from if: ', value);
      rememberUser();
    } else {
      forgetUser();
    }
  };

  const rememberUser = async () => {
    //console.log('5- from rememberUSer hello');
    try {
      const key = email + '';
      await AsyncStorage.setItem(key, password + '');
      //console.log('6- email from rememberUser: ');
      //console.log('7- key: ', key);
      const asyncPass = await AsyncStorage.getItem(key);
      //console.log('getItem: ', asyncPass);
    } catch (error) {}
  };

  const forgetUser = async () => {
    try {
      const key = email + '';
      await AsyncStorage.removeItem(key);
    } catch (error) {}
  };
  const getRememberedUser = async () => {
    try {
      //console.log('email: ', email);
      const key = email;
      //console.log('email from getRememberedUser key: ', key);
      const returnRememberedPass = await AsyncStorage.getItem(key + '');
      if (returnRememberedPass !== null) {
        // console.log(
        //   'dans if returnRememberedPass from getRememberedUser key: ',
        //   key,
        // );
        return returnRememberedPass;
      }
    } catch (error) {}
  };

  useEffect(() => {
    //console.log('1-hello');
    const fetchRemember = async () => {
      const rememberedPass = await getRememberedUser();
      setPassword(rememberedPass);
      setRememberMe(rememberedPass ? true : false);
      //console.log('hello nb 2', rememberedPass);
    };
    fetchRemember();
  }, [email]);

  var yourPicture = require('../Images/logo.png'); //'../Images/logo.png');

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={yourPicture} />

      <InputForm
        inputBackgroundColor={inputBackGcolor}
        labelValue={email}
        onChangeText={userEmail => setEmail(userEmail)}
        placeholderText="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        onFocus={() => setInputBackGcolor('#b3daff')} //e6f3ff
        onBlur={() => setInputBackGcolor('#cce6ff')}
        returnKeyType="next"
        onSubmitEditing={() => {
          passwordRef.current.focus();
        }}
        // onEndEditing={emailOnEndEditing}
      />

      <View>
        <Text style={styles.TextError}>{emailError}</Text>
      </View>

      <InputForm
        inputBackgroundColor={inputBackGcolor}
        labelValue={password}
        onChangeText={userPassword => setPassword(userPassword)}
        placeholderText="Password"
        secureTextEntry={true}
        onFocus={() => setInputBackGcolor('#b3daff')} //e6f3ff
        onBlur={() => setInputBackGcolor('#cce6ff')}
        _ref={passwordRef}
        // onEndEditing={passwordOnEndEditing}
      />

      <Text style={styles.TextPassword}>{}</Text>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginRight: 110,
        }}>
        <Switch
          value={rememberMe}
          onValueChange={value => toggleRememberMe(value)}
          style={{}}
        />
        <Text
          style={{
            color: '#003366', //'#262626',
          }}>
          Remember Me
        </Text>
      </View>

      <ButtonForm buttonTitle="LOGIN" onPress={() => login(email, password)} />

      <TouchableOpacity onPress={onPress}>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <Text
        style={styles.registerTextStyle}
        onPress={() => navigation.navigate('Register')}>
        Don't have an account yet?{' '}
        <Text
          style={{
            color: '#003366', //'#262626',
            textDecorationLine: 'underline',
            fontWeight: 'bold',
          }}>
          Create Here
        </Text>
      </Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginBottom: 40,
  },
  TextError: {
    paddingBottom: 10,
    fontWeight: 'bold',
  },
  forgot_button: {
    color: '#a6a6a6', //'#2e64e5'
    paddingTop: 10,
    //fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Lato-Regular',
  },
  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#4da6ff', //'#FF1493',
  },
  loginText: {
    color: '#003366',
    fontWeight: 'bold',
  },
  registerTextStyle: {
    color: '#a6a6a6',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
    marginTop: 10,
  },
});
