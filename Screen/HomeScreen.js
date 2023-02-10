import React, { useState, useContext, useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../Navigation/AuthProvider';
import Card from '../Components/Card';
import Header from '../Components/Header';
import { fetchPosts, fetchUser, fetchUsers } from '../Redux/FetchData';

renderItem = ({ item }) => <Card cardDetails={item} />;

export default function HomeScreen() {
  let dispatch = useDispatch();
  const { user, logout } = useContext(AuthContext);

  const userInfo = useSelector(state => state.userTabInfo.user);
  const userid = useSelector(state => state.userdata.user_id);
  const postsData = useSelector(state => state.postdata.allPosts);
  //const myArrayPosts = Object.values( postsData );
  console.log('all postsData here: ', postsData);
  const allUsers = useSelector(state => state.userdata.users);
  console.log("all users :",allUsers);
  // const [isRefreshing, setOnRefresh] = useState(false);
  // const handleRefresh = () => {
  //   setOnRefresh(true);
  //   setTimeout(() => {
  //     setOnRefresh(false);
  //   }, 2000);
  // };

  useEffect(() => {
    dispatch(fetchUser(user.uid));
    dispatch(fetchPosts());
    dispatch(fetchUsers());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FlatList
        data={postsData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      //refreshing={isRefreshing}
      //onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
