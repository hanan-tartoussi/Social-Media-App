import React, {useState} from 'react';
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
import moment from 'moment';
import {useSelector} from 'react-redux';
import {firebase} from '@react-native-firebase/database';

const imageExist = image => {
  if (!image) return <Divider style={styles.dividerStyle} />;
  else return <Image style={styles.PostImg} source={{uri: image}} />;
};

export default function Card(props) {
  //const date = moment(props.cardDetails.addedDate).format("MMMM D, YYYY") //February 3,2023
  //const date = moment(props.cardDetails.addedDate).startOf('hour').fromNow() //43 minutes ago
  //const date = moment(props.cardDetails.addedDate).startOf('day').fromNow();  //21 hours ago
  const date = moment(props.cardDetails.addedDate).fromNow();
  const user = useSelector(
    state => state.userdata.users[props.cardDetails.userID],
  );
  const myUserid = useSelector(state => state.userdata.user_id);
  console.log('user:', user);
  console.log('cardDetails', props.cardDetails);
  const postReference = firebase
    .app()
    .database(
      'https://socialmediaapp-79d46-default-rtdb.europe-west1.firebasedatabase.app/',
    )
    .ref('/Posts/' + props.cardDetails.id);
  const [likeIcon, setLikeIcon] = useState('heart-outline');

  return (
    <View style={styles.Container}>
      <View style={styles.Card}>
        <View style={styles.UserInfo}>
          <Image
            style={styles.UserImage}
            source={{uri: props.cardDetails.userProfileImage}}
          />
          <View style={styles.UserInfoText}>
            <Text style={styles.UserName}>{props.cardDetails.username}</Text>
            <Text style={styles.PostDate}>{date}</Text>
            {/* <Text style={styles.PostDate}>{props.cardDetails.addedDate}</Text> */}
          </View>
        </View>
        <Text style={styles.PostText}>{props.cardDetails.caption}</Text>
        {imageExist(props.cardDetails.image)}
        <View style={styles.InteractionWrapper}>
          <TouchableOpacity
            style={styles.Interaction}
            onPress={() => {
              let like = props.cardDetails?.likes ?? [];
              let myLike = like.findIndex(i => i == myUserid); //return number
              if (myLike == -1) {
                like.push(myUserid);
                setLikeIcon('heart-sharp');
              } //not exist
              else {
                like.splice(myLike, 1);
                setLikeIcon('heart-outline');
              } //exist
              postReference.update({likes: like});
            }}>
            <Icon name={likeIcon} size={25} color="blue" />
            <Text style={styles.InteractionText}>
              {' '}
              {props.cardDetails?.likes?.length} Like
            </Text>
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
  dividerStyle: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    width: '92%',
    alignSelf: 'center',
    marginTop: 15,
  },
});
