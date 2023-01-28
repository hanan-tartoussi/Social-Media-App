import React, {useContext} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import ButtonForm from '../Components/ButtonForm';
import {AuthContext} from '../Navigation/AuthProvider';

const HomeScreen = () => {
  const {user, logout} = useContext(AuthContext);
  //const userInfo = useSelector(state => state.products.item);
  //  console.log('userinfo: ', userInfo);
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <Text>HELLO, IT'S SHAHINAZ</Text>
      {/* <Text>Welcome {userInfo}</Text> */}
      <Text>USerID: {user.email}</Text>
      <ButtonForm buttonTitle="Logout" onPress={() => logout()} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
