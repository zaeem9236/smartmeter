import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@mui/material/Grid';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useHistory } from 'react-router-dom';






import InputAdornment from '@material-ui/core/InputAdornment';

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import { firebaseServices } from '../Firebase/firebaseServices'


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Smart Meter
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        paddingTop: theme.spacing(11),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: 'green',
        alignItems: 'center'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignupTemplate() {
    let history = useHistory();

    let [credentials, setCredentials] = useState({ Email: '', Password: '', passwordVisible: false });
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs" >
            <CssBaseline />
            <div className={classes.paper} >
                <Avatar className={classes.avatar}>
                    <AccountCircleIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => { setCredentials({ ...credentials, Email: e.target.value }) }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={credentials.passwordVisible === false ? 'password' : 'email'}
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => { setCredentials({ ...credentials, Password: e.target.value }) }}

                        InputProps={{
                            endAdornment: (
                                <InputAdornment onClick={() => { setCredentials({ ...credentials, passwordVisible: !credentials.passwordVisible }) }} position="end">
                                    {credentials.passwordVisible === false ?
                                        <VisibilityOffIcon style={{ color: 'gray', opacity: credentials.Password === '' ? '0' : '0.7', fontSize: '25px' }} />
                                        :
                                        <VisibilityIcon style={{ color: 'gray', opacity: credentials.Password === '' ? '0' : '0.7', fontSize: '25px' }} />
                                    }
                                </InputAdornment>
                            )
                        }}

                    />
                    {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
                    <Button
                        style={{ backgroundColor: 'green', color: 'white' }}
                        // type="submit"
                        fullWidth
                        variant="contained"
                        // color="success"
                        className={classes.submit}
                        onClick={() => {
                            console.log('aa ss dd')

                            firebaseServices.auth().createUserWithEmailAndPassword(credentials.Email, credentials.Password)
                                .then((e) => {
                                    // console.log('new user details')
                                    // console.log(e)
                                    CreateDatabaseTemplate(credentials.Email)
                                    history.push('/mainpage');
                                    alert(' New user created, status: Ok');

                                })
                                .catch((error) => { alert(error) })
                        }}
                    >
                        Create Account
                    </Button>

                    <Grid container>
                        {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}

                        {/* <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid> */}
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

function CreateDatabaseTemplate(email) {
    if (firebaseServices.auth().currentUser !== null){
        let uid = firebaseServices.auth().currentUser.uid;
        firebaseServices.database().ref(`/authUsers/${uid}`).set({role:'user', email: email});
        // console.log(!(records[monthsArr[index]].paid))
      }
    
    
}