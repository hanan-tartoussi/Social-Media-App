import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Button,
  Alert,
} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {LinkingContext, useNavigation} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/database';
import {useDispatch, useSelector} from 'react-redux';
import storage from '@react-native-firebase/storage';
import ButtonForm from '../Components/ButtonForm';
import InputForm from '../Components/InputForm';

export default function AddPost() {
  let dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(true);
  const userid = useSelector(state => state.userdata.user_id);
  const username = useSelector(state => state.userdata.name);
  const userProfileImg = useSelector(state => state.userdata.userProfileImage);
  const navigation = useNavigation();

  const [imageUri, setImageUri] = useState('');
  const [textInput, setTextInput] = useState('');

  const openCamera = () => {
    const options = {
      StorageOptions: {
        path: 'ímages',
        mediaType: 'photo',
      },
      selectionLimit: 1,
      saveToPhotos: true,
    };

    launchCamera(options, response => {
      console.log('Response =', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response.assets[0].uri;
        setImageUri(source);
      }
    });
  };

  const openGallery = () => {
    const options = {
      StorageOptions: {
        path: 'ímages',
        mediaType: 'photo',
      },
      selectionLimit: 1,
      saveToPhotos: true,
    };

    launchImageLibrary(options, response => {
      console.log('Response =', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response.assets[0].uri;
        setImageUri(source);
      }
    });
  };

  const actions = [
    {
      text: 'Take Photo',
      icon: require('../Images/takePhoto.png'),
      name: 'btn_take_photo',
      position: 1,
    },
    {
      text: 'Choose Photo',
      icon: require('../Images/choosePhoto.png'),
      name: 'btn_choose_photo',
      position: 2,
    },
  ];

  const btnCancelPost = () => {
    setImageUri('');
    setTextInput('');
    navigation.navigate('Home');
  };

  const btnPost = async () => {
    try {
      let url = null;
      const uri = imageUri;
      if (uri) {
        let fileName = uri.substring(uri.lastIndexOf('/') + 1);

        await storage().ref(fileName).putFile(uri);

        const ref = firebase.storage().ref(fileName);
        url = await ref.getDownloadURL();
        console.log('this my image url:', url);
      }

      const newReference = firebase
        .app()
        .database(
          'https://socialmediaapp-79d46-default-rtdb.europe-west1.firebasedatabase.app/',
        )
        .ref('/Posts/')
        .push();

      console.log('Auto generated key: ', newReference.key);

      newReference
        .set({
          id: newReference.key,
          userID: userid,
          username: username,
          caption: textInput,
          userProfileImage: userProfileImg,
          image: url ? url : null,
          addedDate: Date.now(),
        })
        .then(() => {
          console.log('Data updated.', newReference.key);
          dispatch({type: 'SET_POST_ID', payload: newReference.key});
          dispatch({type: 'SET_POST_USER_NAME', payload: username});
          dispatch({type: 'SET_POST_USER_ID', payload: userid});
        })
        .catch(e => console.log('error from realtime:', e));
    } catch (error) {
      console.log('error from storage', error);
    }
    setImageUri('');
    setTextInput('');
    navigation.navigate('Home');
  };

  var yourPicture = require('../Images/insertImage.png');
  return (
    <View style={styles.InputWrapper}>
      <View style={styles.BtnCancelPost}>
        <Button
          onPress={() => btnCancelPost()}
          title="Cancel"
          color="#f57c00"
        />
      </View>
      <View style={styles.BtnPost}>
        <Button
          disabled={isDisabled}
          onPress={btnPost}
          title="Post"
          color="#f57c00"
        />
      </View>

      {/* <TouchableOpacity style={{justifyContent: 'center'}}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Image style={styles.image} source={yourPicture} />
        </View>
      </TouchableOpacity> */}
      <View style={{marginTop: -100, marginBottom: 20}}>
        {imageUri ? (
          <Image
            source={{uri: imageUri}}
            style={{
              height: 250,
              width: '100%',
              borderColor: 'black',
              marginTop: 200,
            }}
          />
        ) : null}
      </View>

      {imageUri ? (
        <View
          style={{
            // marginTop: 290,
            width: '95%',
            justifyContent: 'center',
            textAlign: 'center',
            marginLeft: 10,
          }}>
          <TextInput
            style={styles.InputFiled}
            placeholder="What's on your mind?"
            placeholderTextColor={'#5b637b'}
            color="black"
            multiline
            numberOfLines={4}
            defaultValue={textInput}
            onChangeText={newText => {
              setTextInput(newText),
                newText !== '' || imageUri !== ''
                  ? setIsDisabled(false)
                  : setIsDisabled(true);
            }}
          />

          <ButtonForm buttonTitle="Take Photo" onPress={() => openCamera()} />
          <ButtonForm
            buttonTitle="Choose Photo"
            onPress={() => openGallery()}
          />
        </View>
      ) : (
        <View
          style={{
            marginTop: 290,
            width: '95%',
            justifyContent: 'center',
            textAlign: 'center',
            marginLeft: 10,
          }}>
          <TextInput
            style={styles.InputFiled}
            placeholder="What's on your mind?"
            placeholderTextColor={'#5b637b'}
            color="black"
            multiline
            numberOfLines={4}
            defaultValue={textInput}
            onChangeText={newText => {
              setTextInput(newText),
                newText !== '' || imageUri !== ''
                  ? setIsDisabled(false)
                  : setIsDisabled(true);
            }}
          />

          <ButtonForm buttonTitle="Take Photo" onPress={() => openCamera()} />
          <ButtonForm
            buttonTitle="Choose Photo"
            onPress={() => openGallery()}
          />
        </View>
      )}
      {/* <View
        style={{
          // marginTop: 290,
          width: '95%',
          justifyContent: 'center',
          textAlign: 'center',
          marginLeft: 10,
        }}> */}
      {/* <InputForm
          placeholderText="What's on your mind?"
          placeholderTextColor={'#5b637b'}
          color="black"
          multiline
          style={{height: 78}}
          numberOfLines={4}
          defaultValue={textInput}
          onChangeText={newText => {
            setTextInput(newText), setIsDisabled(false);
          }}
        /> */}
      {/* 
        <TextInput
          style={styles.InputFiled}
          placeholder="What's on your mind?"
          placeholderTextColor={'#5b637b'}
          color="black"
          multiline
          numberOfLines={4}
          defaultValue={textInput}
          onChangeText={newText => {
            setTextInput(newText),
              newText !== '' ? setIsDisabled(false) : setIsDisabled(true);
          }}
        />

        <ButtonForm buttonTitle="Take Photo" onPress={() => openCamera()} />
        <ButtonForm buttonTitle="Choose Photo" onPress={() => openGallery()} />
      </View> */}

      {/* <FloatingAction
        actions={actions}
        onPressItem={name => {
          if (name == 'btn_take_photo') openCamera();
          else openGallery();
        }}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  InputWrapper: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // width: '100%',
    backgroundColor: 'white', //'#dfe1f0',
  },
  InputFiled: {
    backgroundColor: '#F6F7FB',
    height: 88,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
    width: '100%',
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    textAlign: 'center',
  },
  image: {
    width: 400,
    height: 200,
    margin: 15,
    resizeMode: 'contain',
  },
  BtnCancelPost: {
    width: 'auto',
    position: 'absolute',
    left: 0,
    marginLeft: 5,
    top: 5,
  },
  BtnPost: {
    width: 60,
    position: 'absolute',
    right: 5,
    top: 5,
  },
  btnStyle: {
    color: '#f57c00',
  },
});
