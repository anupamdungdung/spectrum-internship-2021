import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export default ({ isChecked, onChecked, ...props }) => {
    return (
        <TouchableOpacity onPress={onChecked}>
            {isChecked ? <Icon name='checkmark-outline' size={25} color='green' style={styles.checkIcon} /> : <Icon name='checkmark-outline' size={25} style={styles.checkIcon} color='white' />}

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    checkIcon: {
        borderWidth: 1,
        borderRadius: 5,
        marginRight: 5,

    },

})