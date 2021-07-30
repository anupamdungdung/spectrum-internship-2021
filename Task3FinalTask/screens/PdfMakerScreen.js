import React, { useEffect,useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput,ToastAndroid,Keyboard ,ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import bgimage from '../assets/images/appBackground.png';
import { requestFileStorage } from '../services/requestPermission';

const isValidObjField = (obj) => {
    return Object.values(obj).every(value => value.trim());
}

const showToast = (msg) => {
    return ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
}


const PdfMakerScreen = () => {

    const [data,setData]=useState({
        pdfData:'',
        fileName:''
    });    

    const {pdfData,fileName}=data;


    useEffect(() => {
        requestFileStorage();
    }, [])

    //Function to create the PDF
    const createPDF = async () => {
        let options = {
            html: `<h1>${pdfData}</h1>`,
            fileName: `${fileName}`,
            directory: 'Documents',
        };
        try {
            let file = await RNHTMLtoPDF.convert(options)
            // console.log(file.filePath);
            // alert('PDF stored in Documents Folder');
            showToast('PDF stored in Documents Folder')
        }
        catch (err) {
            console.log(err);
        }

        
    }

    const isValidForm = () => {
        //Accept only if all the fields have value
        //Object.values(object) will convert the object into Array
        if (!isValidObjField(data)) showToast('Required all fields!')
        else {
            return true;
        }
        return false;
    }

    const handleOnChangeText = (value, fieldName) => {
        setData({ ...data, [fieldName]: value });
    }

    const submitForm = () => {
        if (isValidForm()) {
            Keyboard.dismiss();
            createPDF()
            setData({
                pdfData:'',
                fileName:'',
            })
        }

    }


    return (
        <View style={styles.container}>
            <ImageBackground source={bgimage} resizeMode="cover" style={styles.bgimage}>
                <View style={styles.mainContent}>
                <View style={styles.input}>
                <Text style={styles.text}>Enter Data</Text>
                <View style={styles.action}>

                    <TextInput placeholder="Enter Data" style={styles.textInput}
                        onChangeText={(val) => handleOnChangeText(val, 'pdfData')} multiline={true} value={pdfData}/>

                </View>
                <Text style={styles.text}>Enter File Name</Text>
                <View style={styles.action}>

                    <TextInput placeholder="Save as" style={styles.textInput}
                        onChangeText={(val) => handleOnChangeText(val, 'fileName')}  value={fileName}/>

                </View>
            </View>

            <TouchableOpacity onPress={submitForm} >
                <LinearGradient
                    colors={['#156373', '#071013']}
                    style={styles.customButton}>
                    <Text style={styles.buttonText}>Create PDF</Text>

                </LinearGradient>
            </TouchableOpacity>
                </View>
            
            </ImageBackground>
            
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: '#DFE0E2',
        

    },
    text: {
        fontSize: 30,
        fontFamily: 'Boogaloo-Regular',

    },
    customButton: {
        padding: 8,
        borderRadius: 5,
        elevation: 5,
        width: '100%',
        justifyContent:'flex-end',
        

    },
    buttonText: {
        fontSize: 25,
        color: 'white',
        fontFamily: "Boogaloo-Regular",
        textAlign:'center'

    },
    content: {
        flex: 1,
        padding: 5,
    },
    action: {
        flexDirection: "row",
        marginBottom: 10,
        width: '100%',
    },
    textInput: {
        fontSize: 20,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
        flex: 1,
        borderBottomWidth: 1,
    },
    bgimage:{
        width:'100%',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        
        
        
    },
    mainContent:{
        width:'80%'
    }
});

export default PdfMakerScreen;
