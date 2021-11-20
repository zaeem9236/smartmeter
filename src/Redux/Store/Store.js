import { configureStore } from '@reduxjs/toolkit';
// import dataBaseReducer from '../Slices/dataBaseSlice';
import uidReducer from '../Slices/uidSlice';
// import AdminSlice from '../Slices/AdminSlice';
// import currentReducer from './currentSlice';


export default configureStore({
    reducer:{
        uid: uidReducer,
    }
})