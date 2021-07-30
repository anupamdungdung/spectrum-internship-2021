import 'react-native-gesture-handler';
import React,{useEffect,useContext,useState} from 'react';
import { StyleSheet} from 'react-native';
import {LogBox } from 'react-native';
LogBox.ignoreLogs(['Reanimated 2']);

import FileData from './components/FileData';
import Providers from './navigation';

import DocumentStorage from './screens/DocumentStorageScreen';

export default function App() { 

  //React hook
  useEffect(()=>{
    //Simulating
   
  
  },[]);

  return (    

    <Providers></Providers>
    // <FileData></FileData>
    // <DocumentStorage></DocumentStorage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


