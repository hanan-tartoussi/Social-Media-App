import React, {useState, useContext, useRef} from 'react';
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
import EyePassword from '../Components/EyePassword';

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [inputBackGcolor, setInputBackGcolor] = useState('#cce6ff');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [confPasswordVisibility, setConfPasswordVisibility] = useState(true);
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [passEyeName, setPassEyeName] = useState('ios-eye-off-outline');
  const [confPassEyeName, setConfPassEyeName] = useState('ios-eye-off-outline');

  const {register} = useContext(AuthContext);

  const usernameOnEndEditing = () => {
    //Can only contain letters, numbers, and these characters: - _ .
    //Username be at least 8 characters long
    var regex =
      /^(?=.{4,20}$)(?!.*[_.-]{2})[a-zA-Z]+[_\.\-]*[a-zA-Z]+[0-9]{0,3}$/;
    if (!regex.test(username)) {
      setUsernameError(
        'Can only contain letters, numbers, and these characters: - _ .',
      );
      return false;
    } else {
      setUsernameError('');
      return true;
    }
  };

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
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^(&)_*-]*).{6,}$/;
    if (!regex.test(password)) {
      setPasswordError(
        'A password contains at least 6 characters, including at least one number and includes both lower and uppercase letters.',
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

  var yourPicture = require('../Images/pic.jpg');

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image style={styles.image} source={yourPicture} />

      <View style={styles.whiteSheet}>
        <SafeAreaView style={styles.form}>
          <View style={{marginTop: 40}}>
            <Text style={styles.title}>Sign Up</Text>

            <InputForm
              labelValue={username}
              onChangeText={userusername => setUsername(userusername)}
              placeholderText="Username"
              returnKeyType="next"
              onSubmitEditing={() => {
                console.log('emailRef', emailRef);
                emailRef.current.focus();
              }}
              onEndEditing={usernameOnEndEditing}
            />

            <View>
              <Text style={styles.TextError}>{usernameError}</Text>
            </View>

            <InputForm
              labelValue={email}
              onChangeText={userEmail => setEmail(userEmail)}
              placeholderText="Email"
              keyboardType="email-address"
              returnKeyType="next"
              _ref={emailRef}
              onEndEditing={emailOnEndEditing}
              onSubmitEditing={() => {
                console.log('passwordRef', passwordRef);
                passwordRef.current.focus();
              }}
            />

            <View>
              <Text style={styles.TextError}>{emailError}</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <InputForm
                inputBackgroundColor={inputBackGcolor}
                labelValue={password}
                onChangeText={userPassword => {
                  setPassword(userPassword);
                  //passwordOnEndEditing();
                }}
                placeholderText="Password"
                secureTextEntry={passwordVisibility}
                returnKeyType="next"
                _ref={passwordRef}
                onFocus={() => setInputBackGcolor('#b3daff')} //e6f3ff
                onBlur={() => setInputBackGcolor('#cce6ff')}
                onSubmitEditing={() => {
                  confirmPasswordRef.current.focus();
                }}
                onEndEditing={passwordOnEndEditing}
              />
              <EyePassword
                passEyeName={passEyeName}
                onPress={() => {
                  passwordVisibility
                    ? (setPasswordVisibility(false),
                      setPassEyeName('eye-outline'))
                    : (setPasswordVisibility(true),
                      setPassEyeName('ios-eye-off-outline'));
                }}
              />
            </View>

            <Text style={styles.PassError}>{passwordError}</Text>

            <View style={{flexDirection: 'row'}}>
              <InputForm
                labelValue={confirmPassword}
                onChangeText={userPassword => setConfirmPassword(userPassword)}
                placeholderText="Confirm Password"
                secureTextEntry={confPasswordVisibility}
                returnKeyType="done"
                _ref={confirmPasswordRef}
              />
              <EyePassword
                passEyeName={confPassEyeName}
                onPress={() => {
                  confPasswordVisibility
                    ? (setConfPasswordVisibility(false),
                      setConfPassEyeName('eye-outline'))
                    : (setConfPasswordVisibility(true),
                      setConfPassEyeName('ios-eye-off-outline'));
                }}
              />
            </View>

            <Text style={[styles.TextError]}>{confirmPasswordError}</Text>

            <View style={{marginTop: -40}}>
              <ButtonForm
                buttonTitle="Sign Up"
                onPress={() => {
                  if (
                    (username === '') &
                    (email === '') &
                    (password === '') &
                    (confirmPassword === '')
                  ) {
                    Alert.alert(
                      'Signup error',
                      'Please fill out the registration form',
                    );
                  } else if (
                    (emailOnEndEditing() === false) &
                    (usernameOnEndEditing() === false) &
                    (passwordOnEndEditing() === false)
                  ) {
                    Alert.alert(
                      'Error',
                      'Please make sure of your registration fill',
                    );
                  } else if (confirmPassword !== password) {
                    Alert.alert(
                      'Confirm password Error',
                      'Please make sure your passwords match ',
                    );
                  } else {
                    register(email, password, username);
                  }
                }}
              />
            </View>
          </View>
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

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

    paddingBottom: 30,
    marginBottom: 20,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
    //margiBottom: 200,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'orange',
    paddingBottom: 24,
    alignSelf: 'center',
  },
  TextError: {
    marginBottom: 10,
    fontWeight: 'bold',
    marginLeft: 15,
    paddingTop: 3,
    color: 'black',
  },
  PassError: {
    marginBottom: 10,
    paddingTop: 3,
    fontWeight: 'bold',
    marginLeft: 15,
    color: 'black',
  },
  forgot_button: {
    color: '#a6a6a6',
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
