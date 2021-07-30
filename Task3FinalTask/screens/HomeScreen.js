import React from 'react';
import { StyleSheet, Text, View,Button,TouchableOpacity,Image,ImageBackground} from 'react-native';
import image from '../assets/images/getStarted.png'
import bgimage from '../assets/images/appBackground.png';
import * as Animatable from 'react-native-animatable';


const HomeScreen=({navigation})=>{
    return (
        <View style={styles.container}>
            <ImageBackground source={bgimage} resizeMode="cover" style={styles.bgimage}>
            <Text style={styles.text}>Virtual Teacher Assistant</Text>
            <Animatable.View animation="pulse" iterationCount='infinite'>
                <TouchableOpacity style={styles.customButton} onPress={()=>navigation.openDrawer()}>
                <Image source={image} style={styles.logo}></Image>
            </TouchableOpacity>

            </Animatable.View>

            </ImageBackground>
            
            
            
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#DFE0E2'

    },
    text:{
        fontSize:40,
        fontFamily:'Boogaloo-Regular',

    },
    customButton:{
        padding:10,
        
    },
    logo:{
        height:200,
        width:200,
    }, 
    bgimage:{
        width:'100%',
        flex:1,
        justifyContent:'center',
        alignItems:'center'
        
        
    }

});

export default HomeScreen;

