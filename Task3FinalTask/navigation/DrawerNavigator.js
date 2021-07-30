import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './customDrawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { color } from 'react-native-reanimated';

import HomeScreen from '../screens/HomeScreen';
import ToDoScreen from '../screens/ToDoScreen';
import POCScreen from '../screens/POCScreen';
import PdfMakerScreen from '../screens/PdfMakerScreen';
import DocumentStorage from '../screens/DocumentStorageScreen';





const NavigationDrawer = () => {

    const Drawer = createDrawerNavigator();


    return (

        <Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawer {...props} drawerContentOptions={{
            activeTintColor: '#e91e63',
            itemStyle: {marginVertical: 5},
          }}></CustomDrawer>} >
            <Drawer.Screen name="Home" component={HomeScreen} options={{
                headerShown: true,
                title: 'Home',
                headerStyle: { backgroundColor: '#75ABBC' },
                headerTitleStyle: {
                    color: 'white'
                }
            
            }} />
            <Drawer.Screen name="PdfMaker" component={PdfMakerScreen} options={{
                headerShown: true,
                title: 'PDF Maker',
                headerStyle: { backgroundColor: '#75ABBC' },
                headerTitleStyle: {
                    color: 'white'
                }
            
            }} />
            <Drawer.Screen name="ToDo" component={ToDoScreen} options={{
                headerShown: true, title: 'To Do List', headerStyle: { backgroundColor: '#75ABBC' },
                headerTitleStyle: {
                    color: 'white'
                }
            }} />
            <Drawer.Screen name="POCSection" component={POCScreen} options={{
                headerShown: true, title: 'POC Section', headerStyle: { backgroundColor: '#75ABBC' },
                headerTitleStyle: {
                    color: 'white'
                }
            }} />
            <Drawer.Screen name="DocumentStorage" component={DocumentStorage} options={{
                headerShown: true, title: 'Document Storage', headerStyle: { backgroundColor: '#75ABBC' },
                headerTitleStyle: {
                    color: 'white'
                }
            }} />
            

        </Drawer.Navigator>
    )

}

export default NavigationDrawer;