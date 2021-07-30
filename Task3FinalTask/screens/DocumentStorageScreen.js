import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, ToastAndroid, Alert, Linking, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ActivityIndicator } from 'react-native-paper';
import { requestFileStorage } from '../services/requestPermission';
// import {chooseSingleFile,chooseMultipleFiles} from '../services/fileUpload';
import bgimage from '../assets/images/appBackground.png';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob'
import { onSnapshot, addDoc, removeDoc, updateDoc } from '../services/collections';
import FileData from '../components/FileData';


const showToast = (msg) => {
    return ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
}

const returnUniqueName = (fileName) => {
    console.log(fileName);
    const extension = fileName.split('.').pop();
    const name = fileName.split('.').slice(0, -1).join('.');
    return name + Date.now() + '.' + extension;


}

const DocumentStorage = () => {

    const [fileDocuments, setFileDocuments] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadCompleted, setUploadCompleted] = useState(false);
    const [transferred, setTransferred] = useState(0);
    // const [downloadLink, setDownloadLink] = useState('');

    const [fileData,setFileData]=useState({
        fileName:'',
        fileType:'',
        downloadLink:''
    })

    const {fileName,fileType,downloadLink}=fileData;

    const filesRef = firestore().collection('users').doc(auth().currentUser.uid).collection('files');

    useEffect(() => {
        const unsubscribe = onSnapshot(filesRef, (files) => {
            setFileDocuments(files);
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
        return () => unsubscribe();
    }, [])

    //Add Files data to Firestore
    const addItemToLists = (item) => {

        addDoc(filesRef, item);
        setFileDocuments([...fileDocuments])

    }


    //Uploading File to Firebase Storage
    const uploadFileToFirebaseStorage = async (result, file) => {

        try {
            setUploading(true);
            setTransferred(0);
            setUploadCompleted(false);
            //Reference to Firestore
            const StorageItemsRef = storage().ref().child(`${auth().currentUser.uid}/${file.name}`).putString(result, 'base64', { contentType: file.type })

            StorageItemsRef.on('state_changed',
                (snapshot) => {

                    setTransferred(
                        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );


                    // switch (snapshot.state) {
                    //     case storage.TaskState.PAUSED: // or 'paused'
                    //         console.log('Upload is paused');
                    //         break;
                    //     case storage.TaskState.RUNNING: // or 'running'
                    //         console.log('Upload is running');
                    //         break;
                    // }
                },
                (error) => {
                    showToast('File should be less than 5 MB')
                    console.log(error);
                    // Handle unsuccessful uploads
                },
                () => {
                    // Handle successful uploads on complete
                    setUploading(false);
                    // showToast('Uploaded successfully!');
                    Alert.alert('File Uploaded!', 'Your files have been successfully uploaded to the Cloud Firebase Storage.')
                    StorageItemsRef.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        setUploadCompleted(true);
                        console.log('File available at', downloadURL);
                        setFileData({
                            fileName:`${file.name}`,
                            downloadLink:`${downloadURL}`
                        })
                        addItemToLists({ 
                            fileName: `${file.name}`, 
                            downloadLink: downloadURL })
                    });
                }
            );


        }
        catch (err) {
            console.log(err);
        }
    }

    // Pick single file
    const chooseSingleFile = async () => {
        requestFileStorage();

        try {
            const file = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });

            //Checking if the file size if less than 5 MB or not
            if (file.size > 5 * 1024 * 1024) return (
                showToast('File should be less than 5 MB')

            )

            file.name = returnUniqueName(file.name);

            const result = await RNFetchBlob.fs.readFile(file.uri, 'base64');//converts the file to base64 string

            uploadFileToFirebaseStorage(result, file);



        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }


    }

    // Pick multiple files
    const chooseMultipleFiles = async () => {
        requestFileStorage();

        const results = [];
        try {
            const files = await DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.allFiles],
            });

            for (const file of files) {
                //   console.log(
                //     file.uri,
                //     file.type, // mime type
                //     file.name,
                //     file.size
                //   );
                if (file.size > 5 * 1024 * 1024) return (
                    showToast('File should be less than 5 MB')

                )
                file.name = returnUniqueName(file.name);

                const result = await RNFetchBlob.fs.readFile(file.uri, 'base64');//converts the file to base64 string
                results.push(result);//Storing the files as list of strings(base64)
                uploadFileToFirebaseStorage(result, file);

            }

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={bgimage} resizeMode="cover" style={styles.bgimage}>
                <View style={{ padding: 15 }}>
                    <Text style={styles.text}>Upload Files to Firebase</Text>
                    <TouchableOpacity onPress={chooseSingleFile} >
                        <LinearGradient
                            colors={['#156373', '#071013']}
                            style={styles.customButton}>
                            <Text style={styles.buttonText}>Upload Single File</Text>

                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={chooseMultipleFiles} >
                        <LinearGradient
                            colors={['#156373', '#071013']}
                            style={styles.customButton}>
                            <Text style={styles.buttonText}>Upload Mutiple Files</Text>

                        </LinearGradient>
                    </TouchableOpacity>
                    {uploading ? (<View style={styles.statusWrapper}>
                        <Text style={styles.text}>{transferred} % completed</Text>
                        <ActivityIndicator size="large" color='#23B5D3'></ActivityIndicator>
                    </View>) : null}
                    {/* {uploadCompleted?(<TouchableOpacity onPress={async ()=>{
                    try{
                        await Linking.openURL(downloadURL);

                    }
                    catch(err){
                        console.log(err);
                    }
                }}>
                    <View style={styles.downloadLink}>
                    <Text style={styles.text}>{downloadURL}</Text>
                </View>
                </TouchableOpacity>
                ):null} */}
                </View>
                <View style={styles.filesList}>
                    <FlatList
                        data={fileDocuments}
                        renderItem={({ item: { id, fileName, downloadLink }, index }) => {
                            return <FileData fileName={fileName} downloadLink={downloadLink} goToLink={async ()=>{
                                try{
                                    await Linking.openURL(downloadLink);
                                }
                                catch(err){
                                    console.log(err);
                                }
                            }}/>

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
        alignItems: 'center',
        backgroundColor: '#DFE0E2',

    },
    text: {
        fontSize: 30,
        fontFamily: 'Boogaloo-Regular',
        marginBottom: 10,

    },
    customButton: {
        padding: 8,
        borderRadius: 5,
        elevation: 5,
        width: '100%',
        justifyContent: 'flex-end',
        marginBottom: 10,


    },
    buttonText: {
        fontSize: 25,
        color: 'white',
        fontFamily: "Boogaloo-Regular",

    },

    bgimage: {
        width: '100%',
        flex: 1,

    },
    statusWrapper: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    downloadLink: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    filesList: {
        flex: 1,
        
        margin: 10,
       
        borderRadius:5,
    }
});

export default DocumentStorage;