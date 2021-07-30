import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { AuthContext } from './AuthProvider';
import AuthStack from './AuthStack';
import SplashScreen from '../screens/SplashScreen';
import AppStack from './AppStack';

const Routes = () => {
    const { user, setUser } = useContext(AuthContext);
    const [isLoading,setIsLoading]=useState(true);
    const [initializing, setInitializing] = useState(true);

    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) setInitializing(false);
    };

    useEffect(() => {
        setTimeout(()=>{
            setIsLoading(false);
        },1000)
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);
    
    if(isLoading){
        return(
            <SplashScreen></SplashScreen>
        )
    }   
    
        return (
            <NavigationContainer>
                {user ? <AppStack /> : <AuthStack />}
            </NavigationContainer>
        )
    

   
}

export default Routes;