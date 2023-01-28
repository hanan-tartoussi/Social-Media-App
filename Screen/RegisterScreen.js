import React, {useEffect, useState, useContext, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ButtonForm from '../Components/ButtonForm';
import InputForm from '../Components/InputForm';
import {AuthContext} from '../Navigation/AuthProvider';

const RegisterScreen = ({navigation}) => {
  // const [username, setUsername] = useState('');
  // const [usernameError, setUsernameError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [inputBackGcolor, setInputBackGcolor] = useState('#cce6ff');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const {register} = useContext(AuthContext);

  const onPressRegister = () => {
    emailOnEndEditing();
    passwordOnEndEditing();
    confirmPassword_OnEndEditing();
  };

  // const usernameOnEndEditing = () => {
  //   //Can only contain letters, numbers, and these characters: - _ .
  //   //Username be at least 8 characters long
  //   var regex = /^(?=.{8,20}$)(?!.*[_.-]{2})[a-z]+[_\.\-]*[a-z]+[0-9]{0,3}$/;
  //   if (!regex.test(username)) {
  //     setUsernameError('Invalid.');
  //   } else {
  //     setUsernameError('');
  //   }
  // };

  const emailOnEndEditing = () => {
    var regex = /^[\w-\.]+@([\w]+\.)+[\w]{2,4}$/;
    if (!regex.test(email)) {
      setEmailError('Invalid email.');
    } else {
      setEmailError('');
    }
  };

  const passwordOnEndEditing = () => {
    var regex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (!regex.test(password)) {
      setPasswordError(
        'A password contains at least eight characters, including at least one number and includes both lower and uppercase letters and special characters.',
      );
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const confirmPassword_OnEndEditing = () => {
    if (confirmPassword !== password) {
      setConfirmPasswordError('Please make sure your passwords match');

      return false;
    } else {
      setConfirmPasswordError('');
      return true;
    }
  };

  const confirmPasswordRequired = () => {
    if ((email !== '') & (password !== '') & (confirmPassword === '')) {
      setConfirmPasswordError('Field required');
      return false;
    } else {
      setConfirmPasswordError('');
      return true;
    }
  };

  var yourPicture = require('../Images/pic.jpg'); //var yourPicture = require('../Images/wallpaper.jpg'); //var yourPicture = require('../Images/logo.png');

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image style={styles.image} source={yourPicture} />

      <View style={styles.whiteSheet} />

      <SafeAreaView style={styles.form}>
        <View style={{marginTop: 40}}>
          <Text style={styles.title}>Sign Up</Text>

          <InputForm
            inputBackgroundColor={inputBackGcolor}
            labelValue={email}
            onChangeText={userEmail => setEmail(userEmail)}
            placeholderText="Email"
            keyboardType="email-address"
            returnKeyType="next"
            onFocus={() => setInputBackGcolor('#b3daff')} //e6f3ff
            onBlur={() => setInputBackGcolor('#cce6ff')}
            onEndEditing={emailOnEndEditing}
            onSubmitEditing={() => {
              console.log('passwordRef', passwordRef);
              passwordRef.current.focus();
            }}
          />

          <View>
            <Text style={styles.TextError}>{emailError}</Text>
          </View>

          <InputForm
            inputBackgroundColor={inputBackGcolor}
            labelValue={password}
            onChangeText={userPassword => {
              setPassword(userPassword);
              passwordOnEndEditing();
            }}
            placeholderText="Password"
            secureTextEntry={true}
            returnKeyType="next"
            _ref={passwordRef}
            onFocus={() => setInputBackGcolor('#b3daff')} //e6f3ff
            onBlur={() => setInputBackGcolor('#cce6ff')}
            onSubmitEditing={() => {
              confirmPasswordRef.current.focus();
            }}
            //onEndEditing={passwordOnEndEditing}
          />

          <Text style={styles.PassError}>{passwordError}</Text>

          <InputForm
            inputBackgroundColor={inputBackGcolor}
            labelValue={confirmPassword}
            onChangeText={userPassword => setConfirmPassword(userPassword)}
            placeholderText="Confirm Password"
            secureTextEntry={true}
            returnKeyType="done"
            _ref={confirmPasswordRef}
            onFocus={() => setInputBackGcolor('#b3daff')} //e6f3ff
            onBlur={() => setInputBackGcolor('#cce6ff')}
            //onEndEditing={confirmPassword_OnEndEditing}
          />

          <Text style={[styles.TextError, {paddingBottom: 0}]}>
            {confirmPasswordError}
          </Text>

          <ButtonForm
            buttonTitle="Sign Up"
            onPress={() => {
              if (
                (email === '') &
                (password === '') &
                (confirmPassword === '')
              ) {
                Alert.alert(
                  'Signup error',
                  'Please fill out the registration form',
                );
              } else if (passwordOnEndEditing() === false) {
                Alert.alert(
                  'Password Error',
                  'A password contains at least eight characters, including at least one number and includes both lower and uppercase letters and special characters.',
                );
              } else if (confirmPassword !== password) {
                Alert.alert(
                  'Confirm password Error',
                  'Please make sure your passwords match ',
                );
              } else {
                register(email, password);
              }
            }}
          />
        </View>
      </SafeAreaView>

      {/* <InputForm
        inputBackgroundColor={inputBackGcolor}
        labelValue={username}
        onChangeText={userusername => setUsername(userusername)}
        placeholderText="Username"
        returnKeyType="next"
        onFocus={() => setInputBackGcolor('#b3daff')} //e6f3ff
        onBlur={() => setInputBackGcolor('#cce6ff')}
        //onEndEditing={usernameOnEndEditing}
      />

      <View>
        <Text style={styles.TextError}>{usernameError}</Text>
      </View> */}

      {/* <InputForm
        inputBackgroundColor={inputBackGcolor}
        labelValue={email}
        onChangeText={userEmail => setEmail(userEmail)}
        placeholderText="Email"
        keyboardType="email-address"
        returnKeyType="next"
        onFocus={() => setInputBackGcolor('#b3daff')} //e6f3ff
        onBlur={() => setInputBackGcolor('#cce6ff')}
        onEndEditing={emailOnEndEditing}
        onSubmitEditing={() => {
          console.log('passwordRef', passwordRef);
          passwordRef.current.focus();
        }}
      />

      <View>
        <Text style={styles.TextError}>{emailError}</Text>
      </View>

      <InputForm
        inputBackgroundColor={inputBackGcolor}
        labelValue={password}
        onChangeText={userPassword => {
          setPassword(userPassword);
          passwordOnEndEditing();
        }}
        placeholderText="Password"
        secureTextEntry={true}
        returnKeyType="next"
        _ref={passwordRef}
        onFocus={() => setInputBackGcolor('#b3daff')} //e6f3ff
        onBlur={() => setInputBackGcolor('#cce6ff')}
        onSubmitEditing={() => {
          confirmPasswordRef.current.focus();
        }}
        //onEndEditing={passwordOnEndEditing}
      />

      <Text style={styles.PassError}>{passwordError}</Text>

      <InputForm
        inputBackgroundColor={inputBackGcolor}
        labelValue={confirmPassword}
        onChangeText={userPassword => setConfirmPassword(userPassword)}
        placeholderText="Confirm Password"
        secureTextEntry={true}
        returnKeyType="done"
        _ref={confirmPasswordRef}
        onFocus={() => setInputBackGcolor('#b3daff')} //e6f3ff
        onBlur={() => setInputBackGcolor('#cce6ff')}
        onEndEditing={confirmPassword_OnEndEditing}
      />

      <Text style={styles.TextError}>{confirmPasswordError}</Text> */}

      {/* <ButtonForm
        buttonTitle="Register"
        onPress={() => register(email, password)}
      /> */}

      {/* <ButtonForm
        buttonTitle="Sign Up"
        onPress={() => {
          if (passwordOnEndEditing) {
            register(email, password);
          } else {
            Alert.alert('Invalid Password', passwordError + ' ', [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
          }
        }}
      /> */}
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
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
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
    marginTop: 100,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'orange',
    paddingBottom: 24,
    alignSelf: 'center',
  },
  TextError: {
    paddingBottom: 5,
    fontWeight: 'bold',
    width: '70%',
    marginLeft: 15,
    //justifyContent: 'center',
    // alignItems: 'center',
  },
  PassError: {
    paddingBottom: 5,
    fontWeight: 'bold',
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginTop: -10,
  },
  forgot_button: {
    color: '#a6a6a6', //'#2e64e5'
    //marginBottom: 30,
    //fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Lato-Regular',
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
