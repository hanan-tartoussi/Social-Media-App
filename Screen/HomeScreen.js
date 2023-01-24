import React, {useContext} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import ButtonForm from '../Components/ButtonForm';
import {AuthContext} from '../Navigation/AuthProvider';

const HomeScreen = () => {
  const {user, logout} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <Text>Welcome {user.uid}</Text>
      <ButtonForm buttonTitle="Logout" onPress={() => logout()} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
