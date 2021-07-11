import React, { useState, useEffect } from 'react';
import { View ,Button} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ToDoScreen from '../screens/ToDoScreen';
import * as Icon from 'react-native-feather';

const Stack = createStackNavigator();


const AppStack = () => {
    return (<Stack.Navigator screenOptions={{ headerShown: true, }}>

        <Stack.Screen name="ToDoScreen" component={ToDoScreen} options={{
            title: 'To Do App', headerTitleAlign: 'center', headerStyle: {
                backgroundColor: "#1ABC9C"
            }, headerTintColor: '#fff',
            headerRight:()=>{
                <Icon.ArrowLeft width={25} height={25} fill="black"/>
            }
        }} />

    </Stack.Navigator>)

}

export default AppStack;