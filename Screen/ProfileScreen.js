import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  FlatList
} from 'react-native';
import { AuthContext } from '../Navigation/AuthProvider';
import firebase from '@react-native-firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchUser } from '../Redux/FetchData';
import Card from '../Components/Card';
const ProfileScreen = ({ navigation, route }) => {
  const { user, logout } = useContext(AuthContext);
  let dispatch = useDispatch();
  const userid = useSelector(state => state.userdata.user_id);
  const username = useSelector(state => state.userdata.name);
  const userBio = useSelector(state => state.userdata.bio);
  const userProfileImg = useSelector(state => state.userdata.userProfileImage);
  const postsData = useSelector(state => state.postdata.allPosts);
  const myArrayPosts = Object.values(postsData);
  const myPosts = [] = myArrayPosts.filter((eachpost) => { eachpost.userid == userid });
  console.log('all postsData here: ', myArrayPosts);
  useEffect(() => {
    dispatch(fetchUser(user.uid));
    dispatch(fetchPosts());
  }, []);
  renderItem = ({ item }) => <Card cardDetails={item} />;
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
        {/* <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Image style={styles.userImg} source={userProfileImg.uri} />
                    <Text style={styles.userName}>{username}</Text>
                </View> */}
        <View style={styles.userInfoWrapper}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Image
              source={require('../Images/img1.jpg')}
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
              }}>
              {username}
            </Text>
            <Text style={styles.aboutUser}>{userBio}</Text>
          </View>

          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>0</Text>
            <Text style={styles.userInfoSubTitle}>Posts</Text>
          </View>
        </View>
        <View style={styles.userBtnWrapper}>
          <TouchableOpacity style={styles.userBtn} onPress={() => { navigation.navigate('EditProfileScreen'); }}>
            <Text style={styles.userBtnTxt}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.userBtn} onPress={() => logout()}>
            <Text style={styles.userBtnTxt}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={myPosts}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
        </View>


      </View>
    </SafeAreaView>
  );
}
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  userImg: {
    height: 150,
    width: 150,
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
    textAlign: 'center',
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userBtn: {
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#2e64e5',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

// import React, { useState, useEffect, useContext } from 'react';
// import {
//     View,
//     Text,
//     Image,
//     TouchableOpacity,
//     StyleSheet,
//     ScrollView,
//     SafeAreaView,
// } from 'react-native';
// import  ButtonForm from '../Components/ButtonForm';
// import { AuthContext } from '../Navigation/AuthProvider';

// import firestore from '@react-native-firebase/firestore';
// import PostCard from '../Components/Card';

// const ProfileScreen = ({ navigation, route }) => {
//     const { user, logout } = useContext(AuthContext);

//     const [posts, setPosts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [deleted, setDeleted] = useState(false);
//     const [userData, setUserData] = useState(null);

//     const fetchPosts = async () => {
//         try {
//             const list = [];

//             await firestore()
//                 .collection('posts')
//                 .where('userId', '==', route.params ? route.params.userId : user.uid)
//                 .orderBy('postTime', 'desc')
//                 .get()
//                 .then((querySnapshot) => {
//                     // console.log('Total Posts: ', querySnapshot.size);

//                     querySnapshot.forEach((doc) => {
//                         const {
//                             userId,
//                             post,
//                             postImg,
//                             postTime,
//                             likes,
//                             comments,
//                         } = doc.data();
//                         list.push({
//                             id: doc.id,
//                             userId,
//                             userName: 'Test Name',
//                             userImg:
//                                 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
//                             postTime: postTime,
//                             post,
//                             postImg,
//                             liked: false,
//                             likes,
//                             comments,
//                         });
//                     });
//                 });

//             setPosts(list);

//             if (loading) {
//                 setLoading(false);
//             }

//             console.log('Posts: ', posts);
//         } catch (e) {
//             console.log(e);
//         }
//     };

//     const getUser = async () => {
//         await firestore()
//             .collection('users')
//             .doc(route.params ? route.params.userId : user.uid)
//             .get()
//             .then((documentSnapshot) => {
//                 if (documentSnapshot.exists) {
//                     console.log('User Data', documentSnapshot.data());
//                     setUserData(documentSnapshot.data());
//                 }
//             })
//     }

//     useEffect(() => {
//         getUser();
//         fetchPosts();
//         navigation.addListener("focus", () => setLoading(!loading));
//     }, [navigation, loading]);

//     const handleDelete = () => { };

//     return (
//         <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
//             <ScrollView
//                 style={styles.container}
//                 contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
//                 showsVerticalScrollIndicator={false}>
//                 <Image
//                     style={styles.userImg}
//                     source={{ uri: userData ? userData.userImg || 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' }}
//                 />
//                 <Text style={styles.userName}>{userData ? userData.fname || 'Test' : 'Test'} {userData ? userData.lname || 'User' : 'User'}</Text>
//                 {/* <Text>{route.params ? route.params.userId : user.uid}</Text> */}
//                 <Text style={styles.aboutUser}>
//                     {userData ? userData.about || 'No details added.' : ''}
//                 </Text>
//                 <View style={styles.userBtnWrapper}>
//                     {route.params ? (
//                         <>
//                             <TouchableOpacity style={styles.userBtn} onPress={() => { }}>
//                                 <Text style={styles.userBtnTxt}>Message</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity style={styles.userBtn} onPress={() => { }}>
//                                 <Text style={styles.userBtnTxt}>Follow</Text>
//                             </TouchableOpacity>
//                         </>
//                     ) : (
//                         <>
//                             <TouchableOpacity
//                                 style={styles.userBtn}
//                                 onPress={() => {
//                                     navigation.navigate('EditProfile');
//                                 }}>
//                                 <Text style={styles.userBtnTxt}>Edit</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity style={styles.userBtn} onPress={() => logout()}>
//                                 <Text style={styles.userBtnTxt}>Logout</Text>
//                             </TouchableOpacity>
//                         </>
//                     )}
//                 </View>

//                 <View style={styles.userInfoWrapper}>
//                     <View style={styles.userInfoItem}>
//                         <Text style={styles.userInfoTitle}>{posts.length}</Text>
//                         <Text style={styles.userInfoSubTitle}>Posts</Text>
//                     </View>
//                     <View style={styles.userInfoItem}>
//                         <Text style={styles.userInfoTitle}>10,000</Text>
//                         <Text style={styles.userInfoSubTitle}>Followers</Text>
//                     </View>
//                     <View style={styles.userInfoItem}>
//                         <Text style={styles.userInfoTitle}>100</Text>
//                         <Text style={styles.userInfoSubTitle}>Following</Text>
//                     </View>
//                 </View>

//                 {posts.map((item) => (
//                     <PostCard key={item.id} item={item} onDelete={handleDelete} />
//                 ))}
//             </ScrollView>
//         </SafeAreaView>
//     );
// };

// export default ProfileScreen;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         padding: 20,
//     },
//     userImg: {
//         height: 150,
//         width: 150,
//         borderRadius: 75,
//     },
//     userName: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginTop: 10,
//         marginBottom: 10,
//     },
//     aboutUser: {
//         fontSize: 12,
//         fontWeight: '600',
//         color: '#666',
//         textAlign: 'center',
//         marginBottom: 10,
//     },
//     userBtnWrapper: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         width: '100%',
//         marginBottom: 10,
//     },
//     userBtn: {
//         borderColor: '#2e64e5',
//         borderWidth: 2,
//         borderRadius: 3,
//         paddingVertical: 8,
//         paddingHorizontal: 12,
//         marginHorizontal: 5,
//     },
//     userBtnTxt: {
//         color: '#2e64e5',
//     },
//     userInfoWrapper: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         width: '100%',
//         marginVertical: 20,
//     },
//     userInfoItem: {
//         justifyContent: 'center',
//     },
//     userInfoTitle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 5,
//         textAlign: 'center',
//     },
//     userInfoSubTitle: {
//         fontSize: 12,
//         color: '#666',
//         textAlign: 'center',
//     },
// });
