import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Image, Button } from 'react-native'
import { FloatingAction } from "react-native-floating-action"
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import database, { firebase } from '@react-native-firebase/database';
export default function AddPost() {
    const navigation = useNavigation();

    const [imageUri, setImageUri] = useState('');
    const [textInput, setTextInput] = useState('');

    const openCamera = () => {
        const options = {
            StorageOptions: {
                path: 'ímages',
                mediaType: 'photo',
            },
            selectionLimit: 1,
            saveToPhotos: true,//Image or video captured via camera will be stored in temporary folder so will be deleted any time, 
            //so don't expect it to persist. 
            //we use saveToPhotos: true (default is false) to save the file in the public photos
        };

        launchCamera(options, response => {
            console.log('Response =', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image picker error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.assets[0].uri }//how to save it??
                setImageUri(source);
            }
        })
    }

    const openGallery = () => {
        const options = {
            StorageOptions: {
                path: 'ímages',
                mediaType: 'photo',
            },
            selectionLimit: 1,
            saveToPhotos: true,
        };

        launchImageLibrary(options, response => {
            console.log('Response =', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image picker error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.assets[0].uri }
                setImageUri(source);
            }
        })
    }


    const actions = [
        {
            text: "Take Photo",
            icon: require('../Images/takePhoto.png'),
            name: "btn_take_photo",
            position: 1,
        },
        {
            text: "Choose Photo",
            icon: require('../Images/choosePhoto.png'),
            name: "btn_choose_photo",
            position: 2
        },
    ];
    const btnPost = () => {
        const newReference =firebase.app(). database('https://socialmediaapp-79d46-default-rtdb.europe-west1.firebasedatabase.app/').ref('/Posts/').push();

        console.log('Auto generated key: ', newReference.key);
        //zidi storage hon
        newReference
            .set({
                id:newReference.key,
                caption: textInput,
                image: imageUri.uri,//get uri from storage 
            })
            .then(() => console.log('Data updated.'))
            .catch(e=>console.log(e));
            //faddi textInput + imageUri krmel yfda bl addpost
         navigation.navigate('Home')
    }
    return (
        <View style={styles.InputWrapper}>
            <View style={styles.BtnPost}>
                <Button
                    onPress={btnPost}
                    title="Post"
                    color="#1c51de" />
            </View>
            <Image
                source={imageUri}
                style={{
                    height: 100,
                    width: 100,
                    borderColor: 'black',
                }}
            />
            <TextInput style={styles.InputFiled}
                placeholder="What's on your mind?"
                placeholderTextColor={'#5b637b'}
                color="black"
                multiline
                numberOfLines={4}
                defaultValue={textInput}
                onChangeText={newText => setTextInput(newText)}
            />
            <FloatingAction
                actions={actions}
                onPressItem={(name) => {
                    if (name == 'btn_take_photo') openCamera();
                    else openGallery();

                }}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    InputWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#dfe1f0'
    },
    InputFiled: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
        textAlign: 'center',
        width: '90%',
    },
    BtnPost: {
        width: 60,
        position: 'absolute',
        right: 5,
        top: 5,
    },

});

