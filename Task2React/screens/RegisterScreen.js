import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AuthContext } from '../navigation/AuthProvider';

const isValidObjField = (obj) => {
    return Object.values(obj).every(value => value.trim());
}

const isValidEmail = (value) => {
    //RegEx for email validation
    const regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return regx.test(value);
}
const showToast = (msg) => {
    return ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT,ToastAndroid.BOTTOM);
}
const RegisterScreen = ({ navigation }) => {
    const [data, setData] = React.useState({
        email: '',
        password: '',
        confirmpassword: '',
    })





    const { email, password, confirmpassword } = data;
    //By using the useContext hook we are gonna get the register funtion
    const { register } = useContext(AuthContext);

    const handleOnChangeText = (value, fieldName) => {
        setData({ ...data, [fieldName]: value });
    }

    const isValidForm = () => {
        //Accept only if all the fields have value
        //Object.values(object) will convert the object into Array
        if (!isValidObjField(data)) showToast('Required all fields!')
        //Valid email
        else if (!isValidEmail(email)) showToast('Please enter a valid e-mail!')
        // //Password must have 8 or more characters
        else if (!password.trim() || password.length < 8) showToast('Password should be more than 8 characters!')
        // //Password and confirm password must be the same
        else if (password !== confirmpassword) showToast('Passwords must match!')
        else{
            return true;
        }
        return false;
    }

    const submitForm = () => {
        if (isValidForm()) {
            register(email.trim(), password.trim())
        }

    }


    return (
        <View style={styles.container}>
            <Text style={styles.loginHead}>SIGN UP</Text>
            <View style={styles.loginCard}>
                <Text style={styles.cardHeadingText}>E-Mail</Text>
                <View style={styles.action}>

                    <TextInput value={email} placeholder="E-mail" style={styles.textInput} onChangeText={(val) => handleOnChangeText(val, 'email')} autoCapitalize="none"></TextInput>

                </View>
                <Text style={styles.cardHeadingText}>Password</Text>
                <View style={styles.action}>

                    <TextInput value={password} placeholder="Password" style={styles.textInput} secureTextEntry={true}
                        onChangeText={(val) => handleOnChangeText(val, 'password')} autoCapitalize="none"></TextInput>

                </View>
                <Text style={styles.cardHeadingText}>Confirm Password</Text>
                <View style={styles.action}>

                    <TextInput value={confirmpassword} placeholder="Password" style={styles.textInput} secureTextEntry={true} autoCapitalize="none"
                        onChangeText={(val) => handleOnChangeText(val, 'confirmpassword')}>
                    </TextInput>

                </View>

            </View>
            <TouchableOpacity onPress={submitForm}>
                <LinearGradient
                    colors={['#00B4DB', '#0083B0']}
                    style={styles.customButton}>
                    <Text style={styles.buttonText}>REGISTER</Text>

                </LinearGradient>
            </TouchableOpacity>

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
    customButton: {
        backgroundColor: '#03A9F4',
        padding: 10,
        margin: 8,
        borderRadius: 5,
        elevation: 5,

    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: '#fff',
    },
    loginCard: {
        backgroundColor: "#fff",
        padding: 20,
        margin: 30,
        width: '80%',
        borderRadius: 5
    },
    loginHead: {
        fontSize: 40,
        fontWeight: "bold",


    },
    cardHeadingText: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: "bold",
    },
    textInput: {
        fontSize: 20,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
        marginLeft: 10,
        flex: 1,
        borderBottomWidth: 1,


    },
    action: {
        flexDirection: "row",
        marginBottom: 10,
    }

})

export default RegisterScreen;