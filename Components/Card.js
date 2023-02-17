import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  FlatList,
  ScrollView,
} from 'react-native';
import {Divider, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {firebase} from '@react-native-firebase/database';

const imageExist = image => {
  if (!image) return <Divider style={styles.dividerStyle} />;
  else
    return (
      <Image
        style={styles.PostImg}
        resizeMode="contain"
        source={{uri: image}}
      />
    );
};

export default function Card(props) {
  let date = null;
  const oneDay = 24 * 60 * 60 * 1000;
  if (props.cardDetails.addedDate + oneDay < Date.now()) {
    date = moment(props.cardDetails.addedDate).format('MMMM D, YYYY / hh:mm a');
  } else {
    date = moment(props.cardDetails.addedDate).fromNow();
  }
  const user = useSelector(
    state => state.userdata.users[props.cardDetails.userID],
  );
  console.log('user: from card ', user);
  const myUserid = useSelector(state => state.userdata.user_id);
  const userProfileImg = useSelector(state => state.userdata.userProfileImage);
  const postReference = firebase
    .app()
    .database(
      'https://socialmediaapp-79d46-default-rtdb.europe-west1.firebasedatabase.app/',
    )
    .ref('/Posts/' + props.cardDetails.id);

  const [modalVisible, setModalVisible] = useState(false);
  renderItemss = ({item}) => <Text style={{color: 'black'}}>{item}</Text>;
  const [commentContent, setCommentContent] = useState('');

  return (
    <View style={styles.Container}>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            //Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Comments</Text>
              {console.log(
                'props.cardDetails.comments',
                props.cardDetails?.comments,
              )}
              <ScrollView>
                {props.cardDetails.comments?.map(p => (
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                      marginRight: 80,
                      marginBottom: 10,
                    }}>
                    <Image
                      source={{uri: p.userCmntImage}}
                      style={{
                        resizeMode: 'cover',
                        width: 25,
                        height: 25,
                        borderRadius: 100,
                      }}
                    />
                    <Text style={styles.modalCommentsText}>{p.content}</Text>
                  </View>
                ))}
              </ScrollView>
              <View style={{marginBottom: 20, flexDirection: 'row'}}>
                <TextInput
                  style={styles.commentInputStyle}
                  value={commentContent}
                  placeholder="new comment"
                  onChangeText={cmntContent => setCommentContent(cmntContent)}
                />
                <TouchableOpacity
                  style={styles.postCommentStyle}
                  onPress={() => {
                    let comment = props.cardDetails?.comments ?? [];
                    const obj = {
                      userid: myUserid,
                      userCmntImage: userProfileImg,
                      content: commentContent,
                    };
                    comment.push(obj);
                    postReference.update({comments: comment});
                    setCommentContent('');
                  }}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: 'bold',
                      color: 'black',
                    }}>
                    Post
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.Card}>
        <View style={styles.UserInfo}>
          <Image
            style={styles.UserImage}
            source={{uri: user?.userProfileImage}}
          />
          <View style={styles.UserInfoText}>
            <Text style={styles.UserName}>{user?.name}</Text>
            <Text style={styles.PostDate}>{date}</Text>
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
                // setLikeIcon('heart-sharp');
              } //not exist
              else {
                like.splice(myLike, 1);
                // setLikeIcon('heart-outline');
              } //exist
              postReference.update({likes: like});
            }}>
            <Icon
              name={
                props.cardDetails?.likes?.findIndex(i => i == myUserid) > -1
                  ? 'heart-sharp'
                  : 'heart-outline'
              }
              size={25}
              color="#f57c00"
            />
            <Text style={styles.InteractionText}>
              {' '}
              {props.cardDetails?.likes?.length} Like
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Interaction}
            onPress={() => {
              setModalVisible(true);
            }}>
            <Icon name={'md-chatbubble-outline'} size={25} color="#f57c00" />
            <Text style={styles.InteractionText}>Comment</Text>
          </TouchableOpacity>
        </View>
        {/* {props?.cardDetails?.comments?.map(i => (
          <Text>{i?.content}</Text>
        ))} */}
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'white',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalView: {
    width: 350,
    height: 420,
    //margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 35,
    //paddingBottom: 10,
    overflow: 'hidden',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginTop: -20,
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalCommentsText: {
    fontSize: 18,
    color: 'black',
    marginRight: 100,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: 120,
    height: 40,
    textAlign: 'center',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#f57c00',
    marginTop: 10,
    // width: 150,
  },
  commentInputStyle: {
    backgroundColor: '#F6F7FB',
    height: 18,
    fontSize: 20,
    borderRadius: 10,
    padding: 12,
    width: '100%',
    color: 'black',
  },
  postCommentStyle: {
    padding: 10,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 0,
  },
});
