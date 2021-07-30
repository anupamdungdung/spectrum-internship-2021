import React,{useEffect} from 'react';
import { StyleSheet, Text, View,ImageBackground} from 'react-native';

const SplashScreen=()=>{
    return(
        <View style={styles.container}>
            <ImageBackground style={styles.image} source={require('../assets/images/splashScreen.png')}></ImageBackground>
        </View>
    )
}

export default SplashScreen;

const styles=StyleSheet.create({
    container:{
        flex:1,
        
    },
    image:{
        flex:1,
        
        

    }
})
