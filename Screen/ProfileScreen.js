import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../Navigation/AuthProvider';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchUser } from '../Redux/FetchData';
import Card from '../Components/Card';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Alert } from 'react-native';
const ProfileScreen = ({ navigation, route }) => {
  const { user, logout } = useContext(AuthContext);
  let dispatch = useDispatch();
  const userid = useSelector(state => state.userdata.user_id);
  const username = useSelector(state => state.userdata.name);
  const userBio = useSelector(state => state.userdata.bio);
  const userProfileImg = useSelector(state => state.userdata.userProfileImage);
  const postsData = useSelector(state => state.postdata.allPosts);
  const myArrayPosts = Object.values(postsData);
  const myPosts = ([] = myArrayPosts.filter(
    myArrayPosts => myArrayPosts.userID == userid,
  ));
  console.log('my posts here: ', myPosts);
  useEffect(() => {
    dispatch(fetchUser(user.uid));
    dispatch(fetchPosts());
  }, []);
  renderItem = ({ item }) => {
    <Swipeable
      renderRightActions={() =>
        <TouchableOpacity style={{
          width: 100, height: '100%', justifyContent: 'center',
          alignItems: 'center', backgroundColor: 'white'
        }}
          onPress={ Alert.alert(
            'Hey There!'
            // 'Two button alert dialog',
            // [
            //   { text: 'Yes', onPress: () => console.log('Yes button clicked') },
            //   { text: 'No', onPress: () => console.log('No button clicked'), style: 'cancel' },
            // ],
            // // {
            // //   cancelable: true
            // // }
          )
          }>
          <Ionic name="trash-outline" style={{ fontSize: 35, color: 'red' }} />
          <Text style={{ color: 'red' }}>Delete</Text>
        </TouchableOpacity>}>
      <Card cardDetails={item} />
    </Swipeable>;
  }
  const [isRefreshing, setOnRefresh] = useState(false);
  const handleRefresh = () => {
    setOnRefresh(true);
    setTimeout(() => {
      setOnRefresh(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View
        style={styles.container}
        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.userInfoWrapper}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Image
              source={{ uri: userProfileImg }}
              style={{
                resizeMode: 'cover',
                width: 80,
                height: 80,
                borderRadius: 100,
              }}
            />
            <Text
              style={{
                paddingVertical: 5,
                fontWeight: 'bold',
                color: 'black',
              }}>
              {username}
            </Text>
          </View>

          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>
              {myPosts.length > 0 ? myPosts.length : '0'}
            </Text>
            <Text style={styles.userInfoSubTitle}>Posts</Text>
          </View>

          <View style={styles.userBtnWrapper}>
            <TouchableOpacity
              style={styles.userBtn}
              onPress={() => {
                navigation.navigate('EditProfileScreen');
              }}>
              <Text style={styles.userBtnTxt}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.userBtn} onPress={() => logout()}>
              <Text style={styles.userBtnTxt}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.aboutUser}>{userBio}</Text>
        </View>
        <View>
          <FlatList
            data={myPosts}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            contentContainerStyle={{ paddingBottom: 200 }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  userImg: {
    height: 120,
    width: 120,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'left',
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '50%',
    height: '40%',
    marginTop: 33,
    marginBottom: 10,
  },
  userBtn: {
    borderColor: 'white',
    backgroundColor: '#f57c00',
    borderWidth: 2,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  userBtnTxt: {
    color: 'white',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 5,
  },
  userInfoItem: {
    justifyContent: 'center',
    marginTop: 5,
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});