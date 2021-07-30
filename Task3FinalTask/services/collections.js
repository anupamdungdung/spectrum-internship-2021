export const onSnapshot=(ref,callback,options,error)=>{
    //ref gonna be the reference to the location of the item in the database
    //creates a listener to any item on the database
    const unsubsribe=ref.onSnapshot((snapshot)=>{
        //Items will be object with all the fields in the doc with the id
        let items=snapshot.docs.map((doc)=>{
            const data=doc.data();
            data.id=doc.id;//Just to make sure we are storing the user/doc id locally 
            return data;
        });
        items=options && options.sort?items.sort(options.sort):items;
        callback(items);
    },err=>{error()
        console.log(err);
    });
    return unsubsribe;
    
}

export const addDoc=(ref,{id,...data})=>{
    const doc=id?ref.doc(id):ref.doc();
    doc.set(data).then(()=>{
        console.log('Added new item');
    })
}

export const removeDoc=(ref,id)=>{
    ref.doc(id).delete().then(()=>{
        console.log(`Removed Item: ${id}`)
    });
}

export const updateDoc=(ref,id,data)=>{
    ref.doc(id).set(data).then(()=>{
        console.log(`Updated Item: ${id}`);
    })
}

// export  const uploadDoc=async (ref,{id,fileType,file,...data})=>{
//     // const doc=id?ref.doc(id):ref.doc();
//     await ref.putString(file,'base64',{contentType:fileType}).then(()=>{
//         console.log('File Uploaded Successfully');
//     });

// }