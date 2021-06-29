import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const InformationScreen = ({navigation}) => {
    return (
        <View style={styles.ViewContainer}>
            <View style={styles.CardContainer}>
                <Text style={styles.TextStyle}>Name: {navigation.getParam('name')}</Text>
                <Text style={styles.TextStyle}>Branch: {navigation.getParam('branch')}</Text>
                <Text style={styles.TextStyle}>Year: {navigation.getParam('year')}</Text>
                <Text style={styles.TextStyle}>Registration No: {navigation.getParam('regnNo')}</Text>

                

            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    ViewContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#04F5F5',
    },
    TextStyle:{
        fontSize:25,
        fontWeight:'bold',
        margin:10,

    },
    CardContainer:{
        backgroundColor:'#fff',
        padding:20,
        width:300,


borderRadius:5,

    }
})

export default InformationScreen;