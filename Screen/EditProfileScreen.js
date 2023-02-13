import React, { useEffect, useState, useContext, useRef } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { firebase, ref, update } from '@react-native-firebase/database';
import { Alert, Modal } from 'react-native';
import storage from '@react-native-firebase/storage';
const EditProfileScreen = ({ route, navigation }) => {
  const userid = useSelector(state => state.userdata.user_id);
  const name = useSelector(state => state.userdata.name);
  const userBio = useSelector(state => state.userdata.bio);
  const userProfileImg = useSelector(state => state.userdata.userProfileImage);
  const [username, setUsername] = useState(name);
  const [userbio, setUserbio] = useState(userBio);
  const [usernameError, setUsernameError] = useState('');
  const TostMessage = () => {
    ToastAndroid.show('Edited Sucessfully !', ToastAndroid.SHORT);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const dispatch = useDispatch();
  const storageImage = async uri => {
    //debugger;
    let fileName = uri.substring(uri.lastIndexOf('/') + 1);
    try {
      const fileRef = await storage().ref(`/Avatar/${fileName}`).putFile(uri);

      const ref = firebase.storage().ref(`/Avatar/${fileName}`);
      const url = await ref.getDownloadURL();
      console.log('this my image url:', url);
      firebase
        .app()
        .database(
          'https://socialmediaapp-79d46-default-rtdb.europe-west1.firebasedatabase.app/',
        )
        .ref('/Users/' + userid)
        .update({
          userProfileImage: url,
        })
        .then(() => console.log('Data updated.'));
    } catch (e) {
      console.log('error from storage', e);
    }
  };

  const storageRemoveImage = async () => {
    try {
      firebase
        .app()
        .database(
          'https://socialmediaapp-79d46-default-rtdb.europe-west1.firebasedatabase.app/',
        )
        .ref('/Users/' + userid).update({
          userProfileImage: 'https://static.vecteezy.com/system/resources/previews/002/534/006/non_2x/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg',
        })
        .then(() => console.log('Data updated.'), setModalVisible(false));

    } catch (e) {
      console.log('error from storageRemoveImage', e);
    }
  }

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
        setTimeout(() => {
          // storageImage(source);
        }, 500);
      }
    });
    setModalVisible(false);
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
        setTimeout(() => {
          // storageImage(source);
        }, 500);
      }
    });
    setModalVisible(false);
  };
  useEffect(() => {
    console.log('image uri ' + imageUri);
    if (imageUri) storageImage(imageUri);
  }, [imageUri]);
  useEffect(() => {
    btnPost();
  }, []);
  useEffect(() => {
    userbioOnEndEditing();
  }, []);
  const btnPost = async () => {
    //debugger;
    try {
      firebase
        .app()
        .database(
          'https://socialmediaapp-79d46-default-rtdb.europe-west1.firebasedatabase.app/',
        )
        .ref('/Users/' + userid)
        .update({ name: username })
        .then(() => {
          console.log('Name updated.' + username);
          dispatch({ type: 'SET_USER_NAME', payload: username });
        })
        .catch(e => console.log('error from realtime:', e));
    } catch (error) {
      console.log('error from realtime', error);
    }
    // setUsername('');
    //navigation.goBack();
  };

  const usernameOnEndEditing = () => {
    var regex =
      /^(?=.{5,20}$)(?!.*[_.-]{2})[a-zA-Z]+[_\.\-]*[a-zA-Z]+[0-9]{0,3}$/;
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
  const userbioOnEndEditing = async () => {
    //debugger;
    try {
      firebase
        .app()
        .database(
          'https://socialmediaapp-79d46-default-rtdb.europe-west1.firebasedatabase.app/',
        )
        .ref('/Users/' + userid)
        .update({ bio: userbio })
        .then(() => {
          console.log('Bio updated.' + userbio);
          dispatch({ type: 'SET_USER_BIO', payload: userbio });
        })
        .catch(e => console.log('error from realtime:', e));
    } catch (error) {
      console.log('error from realtime', error);
    }
  };
  console.log(userProfileImg)
  const dimensions = useWindowDimensions();
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Change Profile Picture</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => openCamera()}>
                <Text style={styles.textStyle}>Take Photo</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => openGallery()}>
                <Text style={styles.textStyle}>Choose Photo</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => storageRemoveImage()}>
                <Text style={styles.textStyle}>Remove Photo</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {/* <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable> */}
      </View>
      <View
        style={{
          flex: 1,
          height: dimensions.height,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionic name="close-outline" style={{ fontSize: 35 }} />
          </TouchableOpacity>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Edit Profile</Text>
          <TouchableOpacity
            onPress={() => {
              if (username === '') {
                Alert.alert('Edit error', 'Please put a userName');
              } else if (usernameOnEndEditing() === false) {
                Alert.alert('Error', 'Please make sure of your editing fill');
              } else {
                userbioOnEndEditing();
                btnPost();
                TostMessage();
                navigation.goBack();
              }
            }}>
            <Ionic name="checkmark" style={{ fontSize: 35, color: '#f57c00' }} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}>
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Image
              source={{ uri: userProfileImg }}
              style={{ width: 80, height: 80, borderRadius: 100 }}
            />
            <Text
              style={{
                color: '#f57c00',
              }}>
              Change profile photo
            </Text>
          </View>
        </TouchableOpacity>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          keyboardVerticalOffset={200}
        >
          <View style={{ padding: 10 }}>
            <View>
              <Text
                style={{
                  opacity: 0.5,
                }}>
                username:
              </Text>
              <TextInput
                placeholder="name"
                defaultValue={name}
                onChangeText={userusername => setUsername(userusername)}
                onEndEditing={usernameOnEndEditing}
                style={{
                  fontSize: 16,
                  borderBottomWidth: 1,
                  borderColor: '#CDCDCD',
                }} />
              <View>
                <Text style={styles.TextError}>{usernameError}</Text>
              </View>
            </View>
            <View style={{ paddingVertical: 10 }}>
              <Text
                style={{
                  opacity: 0.5,
                }}>
                Bio:
              </Text>
              <TextInput
                placeholder="Bio"
                defaultValue={userBio}
                maxLength={100}
                multiline
                numberOfLines={4}
                onChangeText={useruserbio => setUserbio(useruserbio)}
                onEndEditing={userbioOnEndEditing}
                style={{
                  fontSize: 16,
                  borderBottomWidth: 1,
                  borderColor: '#CDCDCD',
                }} />
              <Text
                style={{
                  opacity: 0.5,
                }}>
                {/* {100 - userbio.maxLength} */}
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
        {/* <View>
      <Text
        style={{
          marginVertical: 10,
          padding: 10,
          color: '#3493D9',
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: '#EFEFEF',
        }}>
        Personal information setting
      </Text>
    </View> */}
      </View>
    </ScrollView>
  );
};

export default EditProfileScreen;
const styles = StyleSheet.create({
  TextError: {
    marginBottom: 10,
    fontWeight: 'bold',
    marginLeft: 15,
    paddingTop: 3,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: 'white',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#f57c00',
    marginTop: 10,
    // width: 150,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
