import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Keyboard, ImageBackground, TextFrield, ToastAndroid, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import image from '../assets/images/appBackground.png';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import POCCard from '../components/POCCard';
import { onSnapshot, addDoc, removeDoc, updateDoc } from '../services/collections';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'


const isValidObjField = (obj) => {
    return Object.values(obj).every(value => value.trim());
}

const showToast = (msg) => {
    return ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
}



const POCScreen = () => {

    const [POCs, setPOCs] = useState([]);

    const [selectedBranch, setselectedBranch] = useState();
    const [selectedYear, setselectedYear] = useState();
    const POCItemsRef = firestore().collection('users').doc(auth().currentUser.uid).collection('POCs');

    const [data, setData] = useState({
        crName: '',
        grName: '',
        crPhone: '',
        grPhone: '',
        branch: '',
        year: ''
    })



    useEffect(() => {
        const unsubscribe = onSnapshot(POCItemsRef, (newPOCs) => {
            setPOCs(newPOCs);
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
        }, err => {
            console.log(`Encountered error: ${err}`);
        });

        return ()=>{unsubscribe()}

    }, [])

    const isValidEntries = () => {
        if (!isValidObjField(data)) showToast('Required all fields!');
        else if (data.crPhone.length < 10 || data.grPhone.length < 10) showToast('Please Enter a Valid Phone No.')
        else {
            return true;
        }
        return false;
    }

    const addItemToLists = (item) => {
        if (isValidEntries()) {

            addDoc(POCItemsRef, item)
            setPOCs([...POCs]);
            showToast('Data Entered Successfully!');
            setData({
                crName: '',
                crPhone: '',
                grName: '',
                grPhone: '',
                branch: '',
                year: '',
            })
            // console.log(POCs);
            Keyboard.dismiss();
        }

    }

    const removeItemsFromLists = (index) => {
        POCs.splice(index, 1);
        setPOCs([...POCs])
    }


    const handleOnChangeData = (value, fieldName) => {
        setData({ ...data, [fieldName]: value });
    }

    const { crName, grName, crPhone, grPhone, branch, year } = data;

    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.bgimage}>
                <View style={styles.inputDiv}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.containerText}>CR Name:</Text>
                        <TextInput placeholder='CR Name' style={styles.textInput}
                            onChangeText={(val) => {
                                handleOnChangeData(val, 'crName')
                            }} value={crName}></TextInput>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.containerText}>CR Phone No:</Text>
                        <TextInput keyboardType="numeric" maxLength={10} placeholder='CR Phone No' style={styles.textInput}
                            onChangeText={(val) => {
                                handleOnChangeData(val, 'crPhone')
                            }} value={crPhone}></TextInput>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.containerText}>GR Name:</Text>
                        <TextInput placeholder='GR Name' style={styles.textInput}
                            onChangeText={(val) => {
                                handleOnChangeData(val, 'grName')
                            }} value={grName}></TextInput>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.containerText}>GR Phone No:</Text>
                        <TextInput keyboardType="numeric" maxLength={10} placeholder='GR Phone No' style={styles.textInput}
                            onChangeText={(val) => {
                                handleOnChangeData(val, 'grPhone')
                            }} value={grPhone}></TextInput>
                    </View>
                    <View style={{ justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={styles.containerText}>Branch:</Text>
                            <Picker selectedValue={selectedBranch}
                                onValueChange={(val) => {
                                    handleOnChangeData(val, 'branch');
                                    setselectedBranch(val);
                                }} style={styles.picker}>
                                <Picker.Item label="CSE" value='CSE' style={styles.dropDownItem} />
                                <Picker.Item label="IT" value='IT' style={styles.dropDownItem} />
                                <Picker.Item label="I&E" value='I&E' style={styles.dropDownItem} />
                                <Picker.Item label="Mechanical" value='Mechnical' style={styles.dropDownItem} />
                                <Picker.Item label="Electrical" value='Electrical' style={styles.dropDownItem} />

                            </Picker>

                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={styles.containerText}>Year:</Text>
                            <Picker selectedValue={selectedYear}
                                onValueChange={(val) => {
                                    handleOnChangeData(val, 'year');
                                    setselectedYear(val);
                                }} style={styles.picker}>
                                <Picker.Item label="First" value='First' style={styles.dropDownItem} />
                                <Picker.Item label="Second" value='Second' style={styles.dropDownItem} />
                                <Picker.Item label="Third" value='Third' style={styles.dropDownItem} />
                                <Picker.Item label="Fourth" value='Fourth' style={styles.dropDownItem} />
                                <Picker.Item label="Fifth" value='Fifth' style={styles.dropDownItem} />

                            </Picker>

                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => {
                            addItemToLists({
                                crName: `${crName}`,
                                crPhone: `${crPhone}`,
                                grName: `${grName}`,
                                grPhone: `${grPhone}`,
                                branch: `${branch}`,
                                year: `${year}`,
                                id: `${POCs.length + 1}`
                            })
                        }} >
                            <LinearGradient
                                colors={['#156373', '#071013']}
                                style={styles.customButton}>
                                <Text style={styles.buttonText}>ADD</Text>

                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.listDiv}>
                    <FlatList
                        data={POCs}
                        renderItem={({ item: { id, crName, grName, crPhone, grPhone, branch, year }, index }) => {
                            return <POCCard crName={crName} grName={grName} crPhone={crPhone} grPhone={grPhone} branch={branch} year={year} onDelete={() => {
                                removeItemsFromLists(index);
                                id && removeDoc(POCItemsRef, id);
                            }} />
                        }}>

                    </FlatList>
                </View>

            </ImageBackground>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    bgimage: {
        width: '100%',
        flex: 1,

    },
    containerText: {
        fontSize: 25,
        fontFamily: 'Boogaloo-Regular',
        color: 'white'
    },
    inputDiv: {

        padding: 10,
        backgroundColor: '#75ABBC',
        borderRadius: 5,
        margin: 10,
        color: 'white',
    },
    listDiv: {
        flex: 1,
        padding: 10,
    },
    picker: {
        width: 200,
        height: 40,
        borderColor: 'grey',
        color: 'white',

    },
    textInput: {
        flex: 1,
        fontSize: 20,
        borderBottomWidth: 2,
        marginBottom: 5,
        marginLeft: 5,
        fontFamily: 'Boogaloo-Regular',
        color: 'white'
    },
    dropDownItem: {
        fontSize: 20,

    },
    customButton: {
        padding: 10,
        margin: 8,
        borderRadius: 5,
        elevation: 5,


    },
    buttonText: {
        color: 'white',
        fontFamily: 'Boogaloo-Regular',
        fontSize: 25,
        marginLeft: 20,
        marginRight: 20,
    }
})

export default POCScreen;