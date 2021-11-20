import React, { useState, useEffect } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';


import { firebaseServices } from '../Firebase/firebaseServices';
import { saveUid, getUid, getAuthenticationStatus, isAuthenticatedTrue, isAuthenticatedFalse } from '../../Redux/Slices/uidSlice';

import { useSelector, useDispatch } from 'react-redux';

import LoginTemplate from './LoginTemplate';


function LoginPage() {
   
    let dispatch = useDispatch();
    let authenticationStatus = useSelector(getAuthenticationStatus);
  
  
    let history = useHistory();
  

    useEffect(() => {
        // check if user is logged in?
        // if logged in, then get relevent data from firebase and store it in central place
        firebaseServices.auth().onAuthStateChanged(function (user) {
          if (user) {
            // console.log('down down')
            console.log(user.uid);
            dispatch(saveUid(user.uid)); // to save user uid in store vis uidSlice
            dispatch(isAuthenticatedTrue());
    
            const dataBase = firebaseServices.database().ref('/' + user.uid)
              .on('value', function (data) {
                // console.log('-----databasr------')
                // console.log(data.val());
              });
    
            history.push('/mainpage');
    
    
            // <Redirect to="/" />
            // console.log('---take2----');
            // console.log(dataBase);
            // firebaseServices.database().ref('/data').update(obj);
          } else {
            // console.log('-----No signed n user found-----');
            dispatch(isAuthenticatedFalse());
          }
        });
    
    
      }, []);
    
    
  return (
    <div style={{height: '100vh', width: '100vw'}}>
      <LoginTemplate />   
    </div>
  );
}

export default LoginPage;


