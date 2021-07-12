import React, { createContext, useState } from 'react';
import { ToastAndroid } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

//We have to create a ContextAPI
export const AuthContext = createContext();

const showToast = (msg) => {
    return ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider
            //Creating different states from authentication such as Login,Register and Log Out
            value={{
                user, setUser,
                login: async (email, password) => {
                    try {
                        await auth().signInWithEmailAndPassword(email, password);
                        showToast('Login Successful!')

                    }
                    catch (e) {
                        console.log(e);
                        if (e.code === 'auth/user-not-found') {
                            showToast('User does not exist!');
                        }
                        if(e.code === 'auth/wrong-password'){
                            showToast('Incorrect password');
                        }
                    }
                },
                register: async (email, password) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email, password).then(({user}) => {
                            firestore().collection("users").doc(user.uid).set({});
                            showToast('Registration Successful!');
                            
                        });
                        

                    }
                    catch (e) {
                        if (e.code === 'auth/email-already-in-use') {
                            showToast('E-mail already in use!');
                        }
                        else if (e.code === 'auth/invalid-email') {
                            showToast('Invalid E-mail!');
                        }
                    }
                },
                logout: async (unsubscribe) => {
                    try {
                        
                        await auth().signOut();
                        showToast('Logged Out Successfully!')
                       
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
            }}>
            {children}
        </AuthContext.Provider>
    )
}
