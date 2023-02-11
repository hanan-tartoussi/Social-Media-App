import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
export default function Header() {
    const navigation = useNavigation();
    return (
        <View style={styles.header}>
                <Text style={styles.headerText}>
                reACTIVE
                </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '6%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft : 20,
        paddingRight : 10,
    },
    headerText: {
        fontFamily : 'Lobster-Regular',
        fontSize: 20,
        color: '#333',
        letterSpacing: 1,
    },
    
})
