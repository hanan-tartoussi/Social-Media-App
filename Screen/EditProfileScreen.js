import React, {useEffect, useState, useContext, useRef} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import Card from '../Components/Card';
import {fetchPosts, fetchUser} from '../Redux/FetchData';
import {useNavigation} from '@react-navigation/native';
import {useDisclosure} from '@chakra-ui/react';
import {Actionsheet} from 'react-native-actionsheet';
import {firebase, ref, update} from '@react-native-firebase/database';
import {Alert, Modal} from 'react-native';
import storage from '@react-native-firebase/storage';
const EditProfileScreen = ({route, navigation}) => {
  const userid = useSelector(state => state.userdata.user_id);
  const name = useSelector(state => state.userdata.name);
  const userBio = useSelector(state => state.userdata.bio);
  const userProfileImg = useSelector(state => state.userdata.userProfileImage);
  const [username, setUsername] = useState(name);
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
  // const storageUserName = async () => {
  //   debugger;
  //   try {
  //     firebase
  //       .app()
  //       .database(
  //         'https://socialmediaapp-79d46-default-rtdb.europe-west1.firebasedatabase.app/',
  //       )
  //       .ref('/Users/' + userid).update({
  //         username: url,
  //       })
  //       .then(() => console.log('name updated.'));
  //   } catch (e) {
  //     console.log('error from realtime', e);
  //   }
  // }
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
  const btnPost = async () => {
    //debugger;
    try {
      firebase
        .app()
        .database(
          'https://socialmediaapp-79d46-default-rtdb.europe-west1.firebasedatabase.app/',
        )
        .ref('/Users/' + userid)
        .update({name: username})
        .then(() => {
          console.log('Name updated.' + username);
          dispatch({type: 'SET_USER_NAME', payload: username});
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
  console.log(userProfileImg);
  return (
    <>
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
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>
      </View>
      <View
        style={{
          width: '100%',
          height: '100%',
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
            <Ionic name="close-outline" style={{fontSize: 35}} />
          </TouchableOpacity>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Edit Profile</Text>
          <TouchableOpacity
            onPress={() => {
              if (username === '') {
                Alert.alert('Edit error', 'Please put a userName');
              } else if (usernameOnEndEditing() === false) {
                Alert.alert('Error', 'Please make sure of your editing fill');
              } else {
                btnPost();
                TostMessage();
                navigation.goBack();
              }
            }}>
            <Ionic name="checkmark" style={{fontSize: 35, color: '#3493D9'}} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}>
          <View style={{padding: 20, alignItems: 'center'}}>
            <Image
              source={{uri: userProfileImg}}
              style={{width: 80, height: 80, borderRadius: 100}}
            />
            <Text
              style={{
                color: '#3493D9',
              }}>
              Change profile photo
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{padding: 10}}>
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
              }}
            />
            <View>
              <Text style={styles.TextError}>{usernameError}</Text>
            </View>
          </View>
          <View style={{paddingVertical: 10}}>
            <Text
              style={{
                opacity: 0.5,
              }}>
              Bio:
            </Text>
            <TextInput
              placeholder="Bio"
              defaultValue={userBio}
              style={{
                fontSize: 16,
                borderBottomWidth: 1,
                borderColor: '#CDCDCD',
              }}
            />
          </View>
        </View>
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
    </>
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
    marginTop: 22,
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
    backgroundColor: '#2196F3',
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
