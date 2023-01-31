import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const imageExist = postImg => {
  if (postImg == '') return <Divider />;
  else return <Image style={styles.PostImg} source={postImg} />;
};

export default function Card(props) {
  return (
    <View style={styles.Container}>
      <View style={styles.Card}>
        <View style={styles.UserInfo}>
          <Image style={styles.UserImage} source={props.cardDetails.userImg} />
          <View style={styles.UserInfoText}>
            <Text style={styles.UserName}>{props.cardDetails.name}</Text>
            <Text style={styles.PostDate}>{props.cardDetails.date}</Text>
          </View>
        </View>
        <Text style={styles.PostText}>{props.cardDetails.postText}</Text>
        {imageExist(props.cardDetails.postImg)}
        <View style={styles.InteractionWrapper}>
          <TouchableOpacity style={styles.Interaction}>
            <Icon name="heart-outline" size={25} color="blue" />
            <Text style={styles.InteractionText}>Like</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Interaction}>
            <Icon name="md-chatbubble-outline" size={25} color="blue" />
            <Text style={styles.InteractionText}>Comment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
  },
  Card: {
    backgroundColor: '#f8f8f8',
    width: '100%',
    borderRadius: 10,
  },
  text: {
    fontSize: 10,
    color: 'black',
  },
  UserInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 15,
  },
  UserImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  UserName: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Lato-Regular',
    color: 'black',
  },
  PostDate: {
    fontSize: 12,
    fontFamily: 'Lato-Regular',
    color: '#666',
  },
  PostText: {
    fontSize: 14,
    fontFamily: 'Lato-Regular',
    paddingLeft: 20,
    paddingRight: 15,
    marginBottom: 15,
    color: 'black',
  },
  UserInfoText: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
  },
  PostImg: {
    width: '100%',
    height: 200,
    marginTop: 15,
  },
  InteractionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
  },
  InteractionText: {
    fontSize: 12,
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
    marginLeft: 5,
  },
  Interaction: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
    //paddingHorizontal: 2,
    //paddingVertical: 2,
  },
  Divider: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    width: '92%',
    alignSelf: 'center',
    marginTop: 15,
  },
});