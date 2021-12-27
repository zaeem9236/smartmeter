import React, { useState, useEffect } from 'react';
import { saveUid, getUid, getAuthenticationStatus, isAuthenticatedTrue, isAuthenticatedFalse } from '../../Redux/Slices/uidSlice';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';

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
    } else if (role === 'blocked') {
        return (
            <div className=' vh-100 d-flex flex-column justify-content-center align-items-center'>
                <p className='fw-blod h1'>Your account is blocked</p>
                <Button className="mt-3" variant="outlined" color="error"
                    onClick={() => {
                        firebaseServices.auth().signOut().then(function () {
                            console.log('Signed Out');
                        }, function (error) {
                            console.error('Sign Out Error', error);
                        });
                    }}>
                    Sign out
                </Button>
            </div>
        )
    } else {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
                <h1>Loading</h1>
            </div>
        )
    }
}

export default MainPage;
