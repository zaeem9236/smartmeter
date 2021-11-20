import firebase from 'firebase/app';
import 'firebase/auth';
import "firebase/database";

var firebaseConfig = {
    apiKey: "AIzaSyDJUxMWlBcNeAO5j4-bxHGJIu1T5UaoSU8",
    authDomain: "smartmeter-4d06a.firebaseapp.com",
    databaseURL: "https://smartmeter-4d06a-default-rtdb.firebaseio.com",
    projectId: "smartmeter-4d06a",
    storageBucket: "smartmeter-4d06a.appspot.com",
    messagingSenderId: "933296072306",
    appId: "1:933296072306:web:dd5d48812ab84de38504eb",
    measurementId: "G-M01L8KN3NX"
};

const firebaseServices = firebase.initializeApp(firebaseConfig);

export { firebaseServices };