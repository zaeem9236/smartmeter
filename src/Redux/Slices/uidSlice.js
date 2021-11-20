import { createSlice }  from '@reduxjs/toolkit';

export const uidSlice = createSlice({
    name:'uid',
    initialState:{
        uid: 'no uid yet',
        isAuthenticated: false
    },
    reducers:{
        saveUid: (state, uid) => {state.uid = uid.payload },
        isAuthenticatedTrue: (state) => {(state.isAuthenticated = true)},
        isAuthenticatedFalse: (state) => {(state.isAuthenticated = false)}
    }
});

export const { saveUid, isAuthenticatedTrue, isAuthenticatedFalse } = uidSlice.actions;

export const getUid = (state) => {return(state.uid.uid)};
export const getAuthenticationStatus = (state) => {return(state.uid.isAuthenticated)};

export default uidSlice.reducer