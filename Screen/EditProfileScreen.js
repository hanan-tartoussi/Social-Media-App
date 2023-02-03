import React, { useEffect, useState, useContext, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import Ionic from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Components/Card';
import { fetchPosts, fetchUser } from '../Redux/FetchData';
const EditProfileScreen = ({ route, navigation }) => {
  const name = useSelector(state => state.userdata.name);
  const userBio = useSelector(state => state.userdata.bio);
  const userProfileImg = useSelector(state => state.userdata.userProfileImage);
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const TostMessage = () => {
    ToastAndroid.show('Edited Sucessfully !', ToastAndroid.SHORT);
  };
  const renderHeader = () => (<Text>Hello </Text>);
  const renderInner = () => { }
  bs = React.createRef();
  fall = new Animated.Value(1);

  const usernameOnEndEditing = () => {
    //Can only contain letters, numbers, and these characters: - _ .
    //Username be at least 8 characters long
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
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
      }}>
      {/* <BottomSheet
        ref={this.bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={this.fall}
        enabledGestureInteraction={true}
      /> */}
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
            if (
              (username === '')) {
              Alert.alert(
                'Edit error',
                'Please put a userName',
              );
            } else if (
              (usernameOnEndEditing() === false)) {
              Alert.alert(
                'Error',
                'Please make sure of your editing fill',
              );
            }
            TostMessage();
            navigation.goBack();
          }}>
          <Ionic name="checkmark" style={{ fontSize: 35, color: '#3493D9' }} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => { }}>
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Image
            source={userProfileImg}
            style={{ width: 80, height: 80, borderRadius: 100 }}
          />
          <Text
            style={{
              color: '#3493D9',
            }}>
            Change profile photo
          </Text>
        </View>
      </TouchableOpacity>
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
            }}
          />
          <View>
            <Text style={styles.TextError}>{usernameError}</Text>
          </View>
        </View>
        <View style={{ paddingVertical: 10 }}>
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
});