import React from 'react';
import { AuthProvider } from './AuthProvider';
import Routes from './Routes'


const Providers=()=>{
    return(
        //We need to wrap the routes with AuthProvider
        <AuthProvider>
            <Routes/>
        </AuthProvider>
    )
}

export default Providers;