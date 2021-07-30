import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default ({fileName,downloadLink,goToLink}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.itemText}>{fileName}</Text>
            <TouchableOpacity onPress={goToLink}>
            <Text style={styles.downloadLink}>Show File</Text>
            </TouchableOpacity>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems: "flex-start",
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderRadius:5,

    },
    itemText: {
        textAlign: 'center',
        alignItems: 'center',
        marginLeft: 10,
        fontSize: 20,
    },
    downloadLink:{
        fontSize: 20,
        marginLeft: 10,
        color:'red',
        fontFamily: "Boogaloo-Regular",

    }
})