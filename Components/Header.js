import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
export default function Header() {
    const navigation = useNavigation();
    return (
        <View style={styles.header}>
            <View >
                <Text style={styles.headerText}>
                SMA
                </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('New Post')}>
                <Icon name='add' size={40} color="black" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '8%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft : 20,
        paddingRight : 10,
        //backgroundColor: 'red'
        //borderBottomWidth: 1
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#333',
        letterSpacing: 1,
    },
    
})
