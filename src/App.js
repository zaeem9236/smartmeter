import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import MainPage from './Components/MainPage/MainPage';
import LoginPage from './Components/LoginPage/LoginPage';
import UserPage from './Components/UserPage/UserPage';
import AdminPage from './Components/AdminPage/AdminPage';
import SignupPage from './Components/SignupPage/SignupPage';

import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={LoginPage} />
        <Route exact path='/signup' component={SignupPage} />

        {ProtectedRoute(MainPage)} 

        <Redirect to='/' />



      </Switch>
    </BrowserRouter>
  );
}

export default App;

// export const ProtectedRoute = (MainPage) =>{
//   if (true) {
//     return (<Route exact path='/mainpage' component={MainPage} />)
//   } else {
//     return (<Route exact path='/mainpage'> <Redirect to='/' /> </Route>)
//   }
// }


