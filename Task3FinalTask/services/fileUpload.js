import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob'

export const chooseSingleFile= async ()=>{

    try {
        const file = await DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles],
        });

        // console.log(
        //     file.uri,
        //     file.type, // mime type
        //     file.name,
        //     file.size
        // );
        const result=await RNFetchBlob.fs.readFile(file.uri,'base64');//converts the file to base64 string
        console.log(result);
        
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          // User cancelled the picker, exit any dialogs or menus and move on
        } else {
          throw err;
        }
      }

}

export const chooseMutipleFiles=async()=>{
    // Pick multiple files
try {
    const files = await DocumentPicker.pickMultiple({
      type: [DocumentPicker.types.images],
    });
    const results=[];
    for (const file of files) {
    //   console.log(
    //     file.uri,
    //     file.type, // mime type
    //     file.name,
    //     file.size
    //   );
    const result=await RNFetchBlob.fs.readFile(file.uri,'base64');//converts the file to base64 string
    results.push(result);//Storing the files as list of strings(base64)
    }
    console.log(results);
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      throw err;
    }
  }
}