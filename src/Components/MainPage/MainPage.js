import React, { useState, useEffect } from 'react';
import { saveUid, getUid, getAuthenticationStatus, isAuthenticatedTrue, isAuthenticatedFalse } from '../../Redux/Slices/uidSlice';
import { useSelector, useDispatch } from 'react-redux';

import { firebaseServices } from '../Firebase/firebaseServices'

import UserPage from '../UserPage/UserPage';
import AdminPage from '../AdminPage/AdminPage';

function MainPage() {
    let [role, setRole] = useState('');
    let uid = useSelector(getUid);

    useEffect(() => {
        const dbrole = firebaseServices.database().ref('/authUsers/' + uid + '/role')
            .on('value', function (data) {
                // console.log('-----databasr------')
                // console.log(data.val());
                setRole(data.val());
            });
    }, [])

    if (role === 'user') {
        return (
            <UserPage />
        );
    } else if (role === 'admin') {
        return (
            <AdminPage />
        );
    } else {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
                <h1>Loading</h1>
            </div>
        )
    }
}

export default MainPage;
