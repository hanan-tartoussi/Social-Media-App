import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TextInput, Image, Button, Alert} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/database';
import {useDispatch, useSelector} from 'react-redux';
import storage from '@react-native-firebase/storage';

export default function AddPost() {
  let dispatch = useDispatch();
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
        const source = {uri: response.assets[0].uri};
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
        const source = {uri: response.assets[0].uri};
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
  const btnPost = async () => {
    const uri = imageUri.uri;
    let fileName = uri.substring(uri.lastIndexOf('/') + 1);
    try {
      const fileRef = await storage().ref(fileName).putFile(uri);

      const ref = firebase.storage().ref(fileName);
      const url = await ref.getDownloadURL();
      console.log('this my image url:', url);

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
          userProfileImage: userProfileImg,
          caption: textInput,
          image: url,
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
  return (
    <View style={styles.InputWrapper}>
      <View style={styles.BtnPost}>
        <Button onPress={btnPost} title="Post" color="#1c51de" />
      </View>
      <TextInput
        style={styles.InputFiled}
        placeholder="What's on your mind?"
        placeholderTextColor={'#5b637b'}
        color="black"
        multiline
        numberOfLines={4}
        defaultValue={textInput}
        onChangeText={newText => setTextInput(newText)}
      />

      {imageUri ? (
        <Image
          source={imageUri}
          style={{
            height: 250,
            width: '100%',
            borderColor: 'black',
          }}
        />
      ) : null}

      <FloatingAction
        actions={actions}
        onPressItem={name => {
          if (name == 'btn_take_photo') openCamera();
          else openGallery();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  InputWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#dfe1f0',
  },
  InputFiled: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
    textAlign: 'center',
    width: '90%',
  },
  BtnPost: {
    width: 60,
    position: 'absolute',
    right: 5,
    top: 5,
  },
});
