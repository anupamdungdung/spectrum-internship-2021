import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';


const HomeScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [branch, setBranch] = useState('');
    const [year, setYear] = useState('');
    const [regnNo, setRegnNo] = useState('');
    const pressHandler = () => {
        navigation.navigate('Information', { name: name, branch: branch, year: year, regnNo: regnNo });
        
    }


    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Enter Details:</Text>

            <TextInput style={styles.nameInput}
                placeholder='Name'
                onChangeText={(value) => {
                    setName(value);
                }} 
                clearButtonMode="always"/>
            <TextInput style={styles.nameInput}
                placeholder='Branch'
                onChangeText={(value) => {
                    setBranch(value);
                }}
                clearButtonMode="always" />
            <TextInput style={styles.nameInput}
                placeholder='Year'
                onChangeText={(value) => {
                    setYear(value);
                }}
                clearButtonMode="always" />
            <TextInput style={styles.nameInput}
                placeholder='Registration No.'
                onChangeText={(value) => {
                    setRegnNo(value);
                    
                }}
                keyboardType='numeric'
                clearButtonMode="always"/>
            <View style={styles.buttonContainer} >
                <Button title="Show Details" onPress={pressHandler} />
            </View>

            {/* <CustomButton onPress={{pressHandle:pressHandler}} /> */}

            <StatusBar style="auto" />
        </View>
    )

}
const styles = StyleSheet.create({

    container: {
        flex: 1,

        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#04F5F5',
    },
    heading: {
        fontSize: 35,
        fontWeight:'bold',
        margin: 5,
    },
    nameInput: {
        borderWidth: 1,
        borderColor: '#777',
        borderRadius: 4,
        padding: 8,
        margin: 10,
        width: 300,
        fontSize: 20,
        fontFamily: "Roboto",
        backgroundColor: '#fff',
    },
    buttonContainer: {
        padding: 8,
        margin: 10
    }
});


export default HomeScreen;