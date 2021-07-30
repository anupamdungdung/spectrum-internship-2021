import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, FlatList, ToastAndroid, Keyboard, ImageBackground } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import Icon from 'react-native-vector-icons/Ionicons';
import { onSnapshot, addDoc, removeDoc } from '../services/collections';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import ToDoItem from '../components/ToDoItem';
import image from '../assets/images/appBackground.png';


const user = auth().currentUser

const showToast = (msg) => {
    return ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
}

const ToDoScreen = () => {

    const [todoItems, setToDoItems] = useState([]);
    const [newItem, setNewItem] = useState('');

    

    //Reference to Firestore Database
    const toDoItemsRef = firestore().collection('users').doc(auth().currentUser.uid).collection('toDoItems');
    

    useEffect(() => {
      
        const unsubscribe=onSnapshot(toDoItemsRef, (newToDoItems) => {
            setToDoItems(newToDoItems);
        }, {
            sort: (a, b) => {
                if (a.index < b.index) {
                    return -1;
                }
                if (a.index > b.index) {
                    return 1;
                }
                return 0;
            }
        },err=>{
        console.log(`Encountered error: ${err}`);
    });

    // const unsubscribe=toDoItemsRef.onSnapshot((snapshot,)=>{
    //     let items=snapshot.docs.map((doc)=>{
    //         const data=doc.data();
    //         data.id=doc.id;//Just to make sure we are storing the user/doc id locally 
    //         return data;
    //     });
    //     items=items.sort(sort)
    //     setToDoItems(items);
    // },err=>{
    //     console.log(`Encountered error: ${err}`);
    // })
        return ()=>unsubscribe();
    }, [])

    const addItemToLists = (item) => {
        if (item.text.length == 0) {
            showToast('Please enter a task!')

        }
        else {
            // todoItems.push(item);
            // setToDoItems([...todoItems]);
            addDoc(toDoItemsRef, item)
            setNewItem('');
            Keyboard.dismiss();

        }

    }

    const removeItemsFromLists = (index) => {
        todoItems.splice(index, 1);
        setToDoItems([...todoItems])
    }

    const updateItemToList = (index, item) => {
        todoItems[index] = item;
        setToDoItems([...todoItems])

    }

    const handleOnChangeText = (val) => {
        if (val.trim().length == 0) {
            showToast('Please enter a task!')
        }
        else {
            setNewItem(val);
            console.log(val);

        }
    }


    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.bgimage}>
            <View style={styles.todoEnter}>
                <TextInput placeholder="Enter a Task"
                    onSubmitEditing={() => { }}
                    style={styles.textInput} onChangeText={(val) => { handleOnChangeText(val) }}
                    autoFocus={true} value={newItem}/>
                <TouchableOpacity onPress={() => addItemToLists({ text: `${newItem}`, isChecked: false })} style={styles.addButton}>
                    <Icon name="add" size={35} color="#fff" />
                </TouchableOpacity>

            </View>
            <View style={styles.toDolist}>
                <FlatList
                    data={todoItems}
                    renderItem={({ item: { id, text, isChecked }, index }) => {
                        return <ToDoItem text={text} isChecked={isChecked} onChecked={() => {
                            const toDoItem = todoItems[index];
                            toDoItem.isChecked = !isChecked;
                            updateItemToList(index, toDoItem);

                            const item = { text, isChecked: !isChecked };
                            if (id) {
                                item.id = id;
                            }
                            addDoc(toDoItemsRef, item);

                        }} onChangeText={(newText) => {
                            const toDoItem = todoItems[index];
                            toDoItem.text = newText;
                            updateItemToList(index, toDoItem);

                        }} onDelete={() => {
                            removeItemsFromLists(index);
                            id && removeDoc(toDoItemsRef, id);
                        }} />

                    }}>

                </FlatList>

            </View>


            {/* <View style={styles.logOutButton}>
                <TouchableOpacity onPress={() => { logout(unsubscribe) }} >
                    <LinearGradient
                        colors={['#00B4DB', '#0083B0']}
                        style={styles.customButton}>
                        <Text style={styles.buttonText}>LOGOUT</Text>

                    </LinearGradient>
                </TouchableOpacity>
            </View> */}

            </ImageBackground>
            

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor: '#04F5F5',
    },
     customButton: {
        padding: 8,
        margin: 8,
        borderRadius: 5,
        elevation: 5,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: '#fff',
        textAlign: 'center'
    },
    todoEnter: {
        flexDirection: "row",
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
        borderBottomWidth: 1,

    },
    logOutButton: {

    },
    textInput: {
        fontSize: 20,
        paddingBottom: 5,
        borderBottomWidth: 1,
        margin: 5,
        flex: 1
    },
    addButton: {
        margin: 5,
        backgroundColor: '#75ABBC',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,

    },
    toDolist: {
        flex: 1,
        
    },
    
    bgimage:{
        width:'100%',
        flex:1,
        
        
    }

})



export default ToDoScreen;