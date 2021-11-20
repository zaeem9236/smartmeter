import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { saveUid, getUid, getAuthenticationStatus, isAuthenticatedTrue, isAuthenticatedFalse } from '../../Redux/Slices/uidSlice';

import { useSelector, useDispatch } from 'react-redux';

 const ProtectedRoute = (MainPage) =>{
     let auth = useSelector(getAuthenticationStatus)
    if (auth) {
        return (<Route exact path='/mainpage' component={MainPage} />)
      } else {
        return (<Route exact path='/mainpage'> <Redirect to='/' /> </Route>)
      }
}

export default ProtectedRoute;