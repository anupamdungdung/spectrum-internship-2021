import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import CheckBox from './CheckBox';
import Icon from 'react-native-vector-icons/Ionicons';


export default ({ text, isChecked, onChecked, onDelete }) => {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                <CheckBox isChecked={isChecked} onChecked={onChecked} />
                <Text style={styles.itemText, {
                    color: isChecked ? 'grey' : 'black', marginLeft: 10,
                    fontSize: 20,
                    textDecorationLine: isChecked ? 'line-through' : 'none',
                }}>{text}</Text>
                
            </View>
            <TouchableOpacity onPress={onDelete}>
                    <Icon name='trash-outline' size={25} color='#FF5252'/>
                </TouchableOpacity>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderRadius:10,
        

    },
    itemText: {
        textAlign: 'center',
        alignItems: 'center',
        marginLeft: 10,
        fontSize: 20,
    }
})