import React,{useContext} from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { AuthContext } from './AuthProvider';


//This is the custom drawer
const CustomDrawer = (props) => {
    const { logout } = useContext(AuthContext);

    return (
        <View style={{ flex: 1 ,backgroundColor:'#75ABBC'}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View>
                            <Avatar.Image source={require('../assets/images/avatarLogo.png')} size={100}  />

                        </View>
                        <Text style={styles.logoText}>Virtual Teacher Assistant</Text>
                    </View>
                </View>
                <Drawer.Section style={styles.drawerSection}>
                    <DrawerItem
                        icon={() => (
                            <Icon
                                name="home-outline"
                                color='white'
                                size={20}
                            />
                        )}
                        label="Home"
                        labelStyle={{ fontSize: 25, 
                            fontFamily: 'Boogaloo-Regular',
                        color:'white'}}
                        onPress={() => { props.navigation.navigate('Home') }}
                        style={{borderBottomWidth:1,
                        borderBottomColor:'white'}}
                        
                    />
                    <DrawerItem
                        icon={() => (
                            <Icon
                                name="file-document"
                                color='white'
                                size={20}
                            />
                        )}
                        label="PDF Maker"
                        labelStyle={{ fontSize: 25, 
                            fontFamily: 'Boogaloo-Regular' ,color:'white'}}
                        onPress={() => { props.navigation.navigate('PdfMaker') }}
                        style={{borderBottomWidth:1,
                            borderBottomColor:'white'}}
                    />
                    {/* <DrawerItem
                        icon={() => (
                            <Icon
                                name="table-clock"
                                color='white'
                                size={20}
                            />
                        )}
                        label="Time Table"
                        labelStyle={{ fontSize: 25, 
                            fontFamily: 'Boogaloo-Regular' ,color:'white'}}
                        onPress={() => { props.navigation.navigate('Home') }}
                        style={{borderBottomWidth:1,
                            borderBottomColor:'white'}}
                    /> */}
                    {/* <DrawerItem
                        icon={() => (
                            <Icon
                                name="calendar-clock"
                                color='white'
                                size={20}
                            />
                        )}
                        label="Reminder"
                        labelStyle={{ fontSize: 25, 
                            fontFamily: 'Boogaloo-Regular',color:'white' }}
                        onPress={() => { props.navigation.navigate('Home') }}
                        style={{borderBottomWidth:1,
                            borderBottomColor:'white'}}
                    /> */}
                    <DrawerItem
                        icon={() => (
                            <Icon
                                name="database"
                                color='white'
                                size={20}
                            />
                        )}
                        label="Document Storage"
                        labelStyle={{ fontSize: 25, 
                            fontFamily: 'Boogaloo-Regular',color:'white' }}
                        onPress={()=>{props.navigation.navigate('DocumentStorage')}}
                        style={{borderBottomWidth:1,
                            borderBottomColor:'white'}}
                    />
                    <DrawerItem
                        icon={() => (
                            <Icon
                                name="format-list-checks"
                                color='white'
                                size={20}
                            />
                        )}
                        label="To-do List"
                        labelStyle={{ fontSize: 25, 
                            fontFamily: 'Boogaloo-Regular',color:'white' }}
                        onPress={() => { props.navigation.navigate('ToDo') }}
                        style={{borderBottomWidth:1,
                            borderBottomColor:'white'}}
                    />
                    <DrawerItem
                        icon={() => (
                            <Icon
                                name="account-group"
                                color='white'
                                size={20}
                            />
                        )}
                        label="POC Section"
                        labelStyle={{ fontSize: 25, 
                            fontFamily: 'Boogaloo-Regular' ,color:'white'}}
                        onPress={() => { props.navigation.navigate('POCSection') }}
                    />
                   
                </Drawer.Section>
                
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                    <DrawerItem
                        icon={() => (
                            <Icon name="exit-to-app"
                                size={25} color='white'></Icon>
                        )

                        }
                        label="Sign Out"
                        labelStyle={{
                            fontSize: 25,
                            color:'white',
                            fontFamily: 'Boogaloo-Regular'
                        }}

                        onPress={() => {logout()}}>

                    </DrawerItem>
                </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        borderBottomWidth:2,
        borderBottomColor:'#f4f4f4',
        backgroundColor:'#75ABBC'
    },
    userInfoSection: {
        padding: 5,
        margin: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    drawerSection: {
        marginTop: 5,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,


    },
    logoText: {
        fontFamily: 'Boogaloo-Regular',
        fontSize: 30,
        marginTop: 10,
        color:'white',

    },
   
});

export default CustomDrawer;