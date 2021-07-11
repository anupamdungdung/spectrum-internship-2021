import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity ,ToastAndroid} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
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
    return ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
}

const LoginScreen = ({ navigation }) => {

    const [data, setData] = useState({
        email: '',
        password: '',
    })

    const { login } = useContext(AuthContext);

    const {email,password} =data;

    const isValidForm = () => {
        //Accept only if all the fields have value
        //Object.values(object) will convert the object into Array
        if (!isValidObjField(data)) showToast('Required all fields!')
        //Valid email
        else if (!isValidEmail(email)) showToast('Please enter a valid e-mail!')
        // //Password must have 8 or more characters
        else if (!password.trim() || password.length < 8) showToast('Password should be more than 8 characters!')
        // //Password and confirm password must be the same
        else{
            return true;
        }
        return false;
    }

    const handleOnChangeText = (value, fieldName) => {
        setData({ ...data, [fieldName]: value });
    }

    const submitForm = () => {
        if (isValidForm()) {
            login(email.trim(), password.trim())
        }

    }


    return (
        <View style={styles.container}>
            <Animatable.Text style={styles.loginHead} animation="fadeInUpBig">Welcome!</Animatable.Text>
            <Animatable.View style={styles.loginCard} animation="fadeInUpBig">
                <Text style={styles.cardHeadingText}>E-Mail</Text>
                <View style={styles.action}>

                    <TextInput placeholder="E-mail" style={styles.textInput}
                        onChangeText={(val) => handleOnChangeText(val, 'email')}
                        autoCapitalize="none" />

                </View>
                <Text style={styles.cardHeadingText}>Password</Text>
                <View style={styles.action}>
                    <TextInput placeholder="Password" style={styles.textInput} secureTextEntry={true} onChangeText={(val) => handleOnChangeText(val, 'password')} autoCapitalize="none" />

                </View>

            </Animatable.View>
            <Animatable.View animation="fadeInUpBig" style={styles.button}>
                <TouchableOpacity onPress={submitForm} >
                    <LinearGradient
                        colors={['#00B4DB', '#0083B0']}
                        style={styles.customButton}>
                        <Text style={styles.buttonText}>LOGIN</Text>

                    </LinearGradient>
                </TouchableOpacity>
            </Animatable.View>

            <Animatable.View animation="fadeInUpBig" style={styles.button}>
                <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")} >
                    <LinearGradient
                        colors={['#00B4DB', '#0083B0']}
                        style={styles.customButton}>
                        <Text style={styles.buttonText}>New User? Create an Account</Text>

                    </LinearGradient>
                </TouchableOpacity>
            </Animatable.View>




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
    errMsg: {
        fontSize: 15,
        color: "red"
    },
    customButton: {

        padding: 8,
        margin: 8,
        borderRadius: 5,
        elevation: 5,
        width: '100%',


    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: '#fff',
    },
    loginCard: {
        backgroundColor: "#fff",
        padding: 20,
        margin: 20,
        width: '80%',
        borderRadius: 5
    },
    loginHead: {
        fontSize: 40,
        fontWeight: "bold",
        fontFamily: "AntDesign"   

    },
    cardHeadingText: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 5,

    },
    textInput: {
        fontSize: 20,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
        flex: 1,
        borderBottomWidth: 1,
    },
    action: {
        flexDirection: "row",
        marginBottom: 10,
    },
    button: {
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
    }


})

export default LoginScreen;