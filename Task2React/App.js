import 'react-native-gesture-handler';
import React,{useEffect,useContext,useState} from 'react';
import { StyleSheet} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Providers from './navigation';

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  //React hook
  useEffect(()=>{
    //Simulating
    setTimeout(()=>{
      setIsLoading(false);
    },1000);
  },[]);
  
  // if (isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //         <ActivityIndicator size="large" color="green"/>
  //     </View>
  //   )
  // }


  return (    
      <Providers/>
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


