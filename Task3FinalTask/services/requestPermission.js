import { PermissionsAndroid} from 'react-native';

//Request for file storage
export const requestFileStorage = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: "VTA App Permission",
                message:
                    "VTA app needs access to your file storage " +
                    "to store PDF files.",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the file storage");
        } else {
            console.log("File storage permission denied");
        }
    } catch (err) {
        console.warn(err);
    }
};