import { View, Text, Image } from 'react-native'
import React from 'react'
import { ProfileBody, ProfileButtons } from '../Components/ProfileBody'

export default function Profile() {
    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
            <View style={{ width: '100%', padding: 10 }}>
                <ProfileBody
                    name="Shahinaz wehbi"
                    accountName="Sh.w"
                    profileImage={require('../Images/img1.jpg')}
                    followers="3.6M"
                    following="35"
                    post="458" />
                <ProfileButtons
                    id={0}
                    name="Shahinaz wehbi"
                    accountName="Sh.w"
                 profileImage={require('../Images/img1.jpg')}
                />
            </View>
        </View>
    )
}