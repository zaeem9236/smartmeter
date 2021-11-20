import React, { useState, useEffect } from 'react';
import { firebaseServices } from '../Firebase/firebaseServices';
import Button from '@mui/material/Button';


import './UserPage.css'

function UserPage() {
    let [userData, setUserData] = useState({
        billAmount: '',
        current: '',
        power: '',
        powerFactor: '',
        unitsConsume: '',
        voltage: ''
    });
    useEffect(() => {
        const userFolderData = firebaseServices.database().ref('/User/')
            .on('value', function (data) {
                // console.log('--databa111sr------')
                // console.log(data.val());
                setUserData(data.val());

            });
    }, [])
    return (
        <div className='user_maindiv'>
            <div className='user_div1'>
                <div className='user_displaybox'>
                    <div className='user_value'>
                        {userData.voltage}
                    </div>
                    <div className='user_text'>
                        Voltage
                    </div>
                </div>

                <div className='user_displaybox'>
                    <div className='user_value'>
                        {userData.current}
                    </div>
                    <div className='user_text'>
                        Current
                    </div>
                </div>

                <div className='user_displaybox'>
                    <div className='user_value'>
                        {userData.power}
                    </div>
                    <div className='user_text'>
                        Power
                    </div>
                </div>
            </div>

            <div className='user_div2'>
                <div className='user_displaybox'>
                    <div className='user_value'>
                        {userData.powerFactor}
                    </div>
                    <div className='user_text'>
                        Power Factor
                    </div>
                </div>

                <div className='user_displaybox'>
                    <div className='user_value'>
                        {userData.unitsConsume}
                    </div>
                    <div className='user_text'>
                        Units Consumed
                    </div>
                </div>

                <div className='user_displaybox'>
                    <div className='user_value'>
                        {userData.billAmount}
                    </div>
                    <div className='user_text'>
                        Bill Amount
                    </div>
                </div>
            </div>

            <div className='user_button'>
                <Button variant="outlined" color="error"
                onClick={()=>{firebaseServices.auth().signOut().then(function() {
                    console.log('Signed Out');
                  }, function(error) {
                    console.error('Sign Out Error', error);
                  });}}>
                    Sign out
                </Button>
            </div>
        </div>
    );
}

export default UserPage;
