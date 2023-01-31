import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState, useContext, useRef} from 'react';
import {Switch, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import {StyleSheet, View, Text, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ButtonForm from '../Components/ButtonForm';
import InputForm from '../Components/InputForm';
import {AuthContext} from '../Navigation/AuthProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({navigation}) => {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef();
  const {user, login} = useContext(AuthContext);
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [passEyeName, setPassEyeName] = useState('ios-eye-off-outline');

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
    setRememberMe(value);
    if (value === true) {
      rememberUser();
    } else {
      forgetUser();
    }
  };

  const rememberUser = async () => {
    try {
      const key = email + '';
      await AsyncStorage.setItem(key, password + '');
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
      const key = email;
      const returnRememberedPass = await AsyncStorage.getItem(key + '');
      if (returnRememberedPass !== null) {
        return returnRememberedPass;
      }
    } catch (error) {}
  };

  useEffect(() => {
    const fetchRemember = async () => {
      const rememberedPass = await getRememberedUser();
      setPassword(rememberedPass);
      setRememberMe(rememberedPass ? true : false);
    };
    fetchRemember();
  }, [email]);

  var yourPicture = require('../Images/pic.jpg');

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image style={styles.image} source={yourPicture} />

      <View style={styles.whiteSheet}>
        <SafeAreaView style={styles.form}>
          <Text style={styles.title}>Login</Text>

          <View style={{marginBottom: 20}}>
            <InputForm
              labelValue={email}
              onChangeText={userEmail => setEmail(userEmail)}
              placeholderText="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordRef.current.focus();
              }}
              // onEndEditing={emailOnEndEditing}
            />
          </View>
          <View style={{marginBottom: 20, flexDirection: 'row'}}>
            <InputForm
              labelValue={password}
              onChangeText={userPassword => setPassword(userPassword)}
              placeholderText="Password"
              secureTextEntry={passwordVisibility}
              _ref={passwordRef}
              // onEndEditing={passwordOnEndEditing}
            />
            <TouchableOpacity
              style={{
                padding: 10,
                paddingRight: 20,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 'auto',
                marginRight: 0,
              }}
              onPress={() => {
                passwordVisibility
                  ? (setPasswordVisibility(false),
                    setPassEyeName('eye-outline'))
                  : (setPasswordVisibility(true),
                    setPassEyeName('ios-eye-off-outline'));
              }}>
              <Ionicons name={passEyeName} size={25} color="#666" />
            </TouchableOpacity>
          </View>

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

          <ButtonForm
            buttonTitle="Log In"
            onPress={() => login(email, password)}
          />

          <Text
            style={styles.registerTextStyle}
            onPress={() => navigation.navigate('Register')}>
            Don't have an account yet?{' '}
            <Text
              style={{
                color: '#f57c00', //'#262626',
                textDecorationLine: 'underline',
                fontWeight: 'bold',
              }}>
              Sign Up Here
            </Text>
          </Text>
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 340,
    position: 'absolute',
    top: 0,
    resizeMode: 'cover',
  },
  whiteSheet: {
    width: '100%',
    height: '75%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'orange',
    paddingBottom: 24,
    alignSelf: 'center',
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
