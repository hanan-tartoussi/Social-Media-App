import React, { useState, useContext, useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import ButtonForm from '../Components/ButtonForm';
import { AuthContext } from '../Navigation/AuthProvider';
import Card from '../Components/Card';
import Header from '../Components/Header';
import { fetchPosts, fetchUser } from '../Redux/FetchData';
import LogOutBtn from '../Components/LogOutBtn';
state = {
  UsersPosts: [
    // {
    //   id: 1,
    //   userImg: require('../Images/userProf.png'),
    //   name: 'Wafaa Al Jarrah',
    //   date: '4 mins',
    //   postText: 'Hello!! This is my post',
    //   postImg: require('../Images/postImg.png'),
    // },
    // {
    //   id: 2,
    //   userImg: require('../Images/user2.png'),
    //   name: 'Ahmad',
    //   date: 'Jan 1,2023',
    //   postText:
    //     'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
    //   postImg: '',
    // },
    // {
    //   id: 3,
    //   userImg: require('../Images/user3.png'),
    //   name: 'Kareem',
    //   date: 'Dec 10,2022',
    //   postText:
    //     'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...',
    //   postImg: require('../Images/post2.png'),
    // },
    // {
    //   id: 4,
    //   userImg: require('../Images/user4.png'),
    //   name: 'Hanan Tartoussi',
    //   date: 'Oct 10,2021',
    //   postText: 'Hello!!!',
    //   postImg: '',
    // },
  ],
};

renderItem = ({ item }) => <Card cardDetails={item} />;

export default function HomeScreen() {
  let dispatch = useDispatch();
  const { user, logout } = useContext(AuthContext);

  const userInfo = useSelector(state => state.userTabInfo.user);
  const userid = useSelector(state => state.userdata.user_id);
  const postsData = useSelector(state => state.postdata.allPosts);
  console.log('userinfo: ', userInfo, userid);
  console.log('postsData: ', postsData);

  //////////////////////////////////
  // const [UsersPosts, setUsersPosts] = useState('');
  // const newReference = firebase
  //   .app()
  //   .database(
  //     'https://socialmediaapp-79d46-default-rtdb.europe-west1.firebasedatabase.app/',
  //   )
  //   .ref('/Posts/')
  //   .once('value')
  //   .then(snapshot => {
  //     console.log('User data: ', snapshot.val());
  //   });
  // const scores = database().ref('scores').orderByValue().once('value');
  // /////////////////////////////////

  const [isRefreshing, setOnRefresh] = useState(false);
  const handleRefresh = () => {
    setOnRefresh(true);
    setTimeout(() => {
      setOnRefresh(false);
    }, 2000);
  };

  useEffect(() => {
    dispatch(fetchUser(user.uid));
    dispatch(fetchPosts());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      
      <FlatList
        data={state.UsersPosts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
