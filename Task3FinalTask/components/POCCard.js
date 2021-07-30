import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import CheckBox from './CheckBox';

import Icon from 'react-native-vector-icons/Ionicons';


export default ({crName,grName,crPhone,grPhone,branch,year,onDelete})=>{
    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems: 'center'}}>
                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center',justifyContent:'space-between'}}>
                <Text style={styles.cardText}>CR:&nbsp;{crName}</Text>
                <Text style={styles.cardText}>{crPhone}</Text>
                </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems: 'center'}}>
                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center',justifyContent:'space-between'}}>
                <Text style={styles.cardText}>GR:&nbsp;{grName}</Text>
                <Text style={styles.cardText}>{grPhone}</Text>
                </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems: 'center'}}>
                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'column'}}>
                        <Text style={styles.cardText}>Branch:</Text>
                        <Text style={styles.cardText}>{branch}</Text>
                    </View>
                    <View style={{flexDirection:'column'}}>
                        <Text style={{textAlign:'right',fontSize:25,fontFamily:'Boogaloo-Regular'}}>Year:</Text>
                        <Text style={styles.cardText}>{year}</Text>
                    </View>
                
                
                </View>
            </View>
            <View style={{justifyContent:'center'}}>
                <TouchableOpacity onPress={onDelete}>
                    <Icon name='trash-outline' size={25} color='#FF5252'/>
                </TouchableOpacity>
            </View>
            
            
        </View>

    )
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        padding: 10,
        borderRadius:10,
        backgroundColor:'#DFE0E2',
        justifyContent:'center',
        marginBottom:5,

    },
    cardText:{
        fontSize: 25,
        
        fontFamily:'Boogaloo-Regular',
        
    },
    deleteButton:{
        backgroundColor:'#DFE0E2',
        alignItems:'center',
        justifyContent:'center',
        textAlign:'center'
    }
})