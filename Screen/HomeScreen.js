import React, { useState, useContext } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import {useSelector} from 'react-redux';
import ButtonForm from '../Components/ButtonForm';
import {AuthContext} from '../Navigation/AuthProvider';
import Card from '../Components/Card';
import Header from '../Components/Header';

state = {
    UsersPosts: [
        { id: 1, userImg: require('../Images/userProf.png'), name: 'Wafaa Al Jarrah', date: '4 mins', postText: 'Hello!! This is my post', postImg: require('../android/app/src/main/assets/images/postImg.png') },
        { id: 2, userImg: require('../Images/user2.png'), name: 'Ahmad', date: 'Jan 1,2023', postText: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...', postImg: '' },
        { id: 3, userImg: require('../Images/user3.png'), name: 'Kareem', date: 'Dec 10,2022', postText: 'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...', postImg: require('../android/app/src/main/assets/images/post2.png') },
        { id: 4, userImg: require('../Images/user4.png'), name: 'Hanan Tartoussi', date: 'Oct 10,2021', postText: 'Hello!!!', postImg: '' }
    ],
    
}
renderItem = ({ item }) => (<Card cardDetails={item} />)

export default function HomeScreen() {
  const {user, logout} = useContext(AuthContext);
//const userInfo = useSelector(state => state.products.item);
//  console.log('userinfo: ', userInfo);
    const [isRefreshing, setOnRefresh] = useState(false);
    const handleRefresh = () => {
        setOnRefresh(true)
        setTimeout(() => {
            setOnRefresh(false)
        }
            , 2000);
    };
    return (
        <SafeAreaView style={styles.container}>
            <Header/>
            <ButtonForm buttonTitle="Logout" onPress={() => logout()} />
            <FlatList
                data={state.UsersPosts}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                 refreshing={isRefreshing}
                 onRefresh={handleRefresh}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});
