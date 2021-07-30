import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ToDoScreen from '../screens/ToDoScreen';

import NavigationDrawer from './DrawerNavigator';

const Stack = createStackNavigator();


const AppStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false,}}>
            <Stack.Screen name="Virtual Teacher Assistant" component={NavigationDrawer} options={{
                headerShown: false, headerTitleAlign: 'center', headerTitleStyle: {
                    fontFamily: 'Boogaloo-Regular',
                    fontSize: 28,
                    color: 'white',
                }, headerStyle: {
                    backgroundColor: '#75ABBC'
                }
            }
            } ></Stack.Screen>

            <Stack.Screen name="ToDoScreen" component={ToDoScreen} options={{
                headerShown: true,
                title: 'To Do App', headerTitleAlign: 'center', headerStyle: {
                    backgroundColor: "#75ABBC"
                }, headerTintColor: '#fff',
                // headerRight: () => {
                //     <Icon.Button name='' width={25} height={25} fill="black" />
                // }
            }} />


        </Stack.Navigator>)

}

export default AppStack;