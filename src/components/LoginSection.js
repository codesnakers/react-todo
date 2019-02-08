import React, { Component } from 'react';

import { Link, Redirect } from 'react-router-dom';
import ROUTES from '../config/routes';
import {auth} from '../firebase.js';
import Button from '@material-ui/core/Button';
/*import logo from './logo.svg';*/
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';

const styles = theme => ({
    layout: {
      width: 'auto',
      display: 'block', // Fix IE11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
    signupLink:{
        marginTop: theme.spacing.unit * 2,
        textAlign: 'center',
        display: 'block'
    }
  });

class LoginSection extends Component{
    
    constructor(props){
        super(props);
        this.email = React.createRef();
        this.pass = React.createRef();
        this.handleLogin = this.handleLogin.bind(this);
        this.handleKey = this.handleKey.bind(this);
        this.state = { dialogOpen: false, loggedIn: false, authLoading: this.props.authLoading };
        /*console.log("loginsection constructor");*/
    }
    componentDidMount() {
      console.log("LoginSection component did mount ");
        var _self = this;
        /*console.log("loginsection componenet did mount");*/
        this.removeListener = auth.onAuthStateChanged(function(user) {
          if (user) {
            console.log("user logged in and redirecting to /   uid: ", user.uid);
            /*_self.setState({loggedIn: true, userId: user.uid});
            _self.getSnapshot();*/
            /*_self.props.afterLogin(user.uid);*/
            /*_self.props.history.push(ROUTES.APP_PAGE);*/
            _self.setState({loggedIn: true});
          } else {
            console.log("user logged out");
            _self.setState({loggedIn: false});
          }
        });
    }
    componentWillUnmount () {
      this.removeListener()
    }
    handleKey(e){
      if(13 === e.which){
        this.handleLogin();
      }
    }
    handleLogin(){
        var email, pass;
        email = this.email.current.value;
        pass = this.pass.current.value;
        var _self = this;
        /*this.props.handleSignUp(email, pass);*/
        _self.setState({authLoading: true});
        auth.signInWithEmailAndPassword(email, pass).then(function(o){
            console.log(o);
            console.log("login successful ");
            /*_self.props.afterLogin();*/
            /*_self.props.history.push(ROUTES.APP_PAGE);*/
            _self.setState({loggedIn: true, authLoading: false});
        }).catch(function(e){
            console.log(e);
            console.log("error logging in ");
            _self.setState({loggedIn: false, dialogOpen: true, authLoading: false});
        });
    }
    checkIsLoggedIn(){
        if(auth!=null && typeof auth.currentUser==="object"){
            return true;
        }
        return false;
    }
    handleDialogOpen = () => {
      this.setState({ dialogOpen: true });
    }
    handleDialogClose = () => {
      this.setState({ dialogOpen: false });
    }
    render(){
      const classes = this.props.classes;
      /*console.log("login section rendered");*/
      /*return this.checkIsLoggedIn() ? ( <Redirect to={ROUTES.APP_PAGE} /> ) : (*/
        if(this.state.authLoading){
          return <div className="loadingWrap"><CircularProgress className="loading" /></div>;
        }
       return this.state.loggedIn ? (<Redirect to={ROUTES.APP_PAGE} />) : (
        /*<div className="login-section">
        <input type="email" placeholder="Email" /><br />
        <input type="password" placeholder="Password" /><br />
        <Button>Log In</Button>
        </div><FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />*/
        <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}><LockIcon /></Avatar>
          <Typography component="h1" variant="h5">Sign in</Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" inputRef={this.email} autoFocus onKeyPress={this.handleKey} />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password"
                autoComplete="current-password"
                inputRef={this.pass}
                onKeyPress={this.handleKey}
              />
            </FormControl>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleLogin}
            >
              Sign in
            </Button>
            <Link className={classes.signupLink} to="/signup">New User? Sign Up</Link>
          </form>
        </Paper>
        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{""}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Error Logging in, please check you email and password.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      </main>
      );
    }
  }

  /*export default withRouter(withStyles(styles)(LoginSection));*/
  export default withStyles(styles)(LoginSection)