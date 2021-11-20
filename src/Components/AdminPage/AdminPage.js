import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

import { firebaseServices } from '../Firebase/firebaseServices';

import 'bootstrap/dist/css/bootstrap.min.css';
import './admin.css'
function AdminPage() {
  let [records, setRecords] = useState({

    Jan: {
      billAmount: 0,
      paid: false
    },
    Feb: {
      billAmount: 0,
      paid: false
    },
    Mar: {
      billAmount: 0,
      paid: false
    },
    Apr: {
      billAmount: 0,
      paid: false
    },
    May: {
      billAmount: 0,
      paid: false
    },
    Jun: {
      billAmount: 0,
      paid: false
    },
    Jul: {
      billAmount: 0,
      paid: false
    },
    Aug: {
      billAmount: 0,
      paid: false
    },
    Sep: {
      billAmount: 0,
      paid: false
    },
    Oct: {
      billAmount: 0,
      paid: false
    },
    Nov: {
      billAmount: 0,
      paid: false
    },
    Dec: {
      billAmount: 0,
      paid: false
    }
  });

  let monthsArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  useEffect(() => {
    const userFolderData = firebaseServices.database().ref('/Admin/')
      .on('value', function (data) {
        // console.log('--databa111sr------')
        // console.log(data.val());
        setRecords(data.val());
        // ref.child('imagex').setValue("map");
      });
  }, [])

  return (
    <div className='admin_maindiv'>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Month</th>
            <th scope="col">Monthly Bill Amount</th>
            <th scope="col">Total Bill with dues</th>
            <th scope="col">Paid Status</th>
          </tr>
        </thead>
        <tbody>

          {Object.keys(records).map(function (key, index) {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{monthsArr[index]}</td>
                <td>{records[monthsArr[index]].billAmount}</td>
                <td>{overdueCheck(index, records, monthsArr)}</td>
                <td>{records[monthsArr[index]].paid === true ? <span style={{color: 'green'}}>Paid</span> : <span style={{color: 'red'}}>Pending</span>}</td>
                <td>
                  <button onClick={() => {
                    firebaseServices.database().ref(`/Admin/${monthsArr[index]}`).child('paid').set(!(records[monthsArr[index]].paid));
                    // console.log(!(records[monthsArr[index]].paid))
                  }} className="btn btn-warning">
                    Change Status
                  </button>
                </td>

              </tr>
            )
          })}

        </tbody>
      </table>

      
      <div className='admin_button'>
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

export default AdminPage;

function overdueCheck(index, records, monthsArr){
  if (index !==0){
    if (records[monthsArr[index-1]].paid === false){
    return(records[monthsArr[index-1]].billAmount + records[monthsArr[index]].billAmount)
    }else{
      return(records[monthsArr[index]].billAmount)
    }
  }else {
    return(records[monthsArr[index]].billAmount)
  }
}
