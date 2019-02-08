import React, { Component } from 'react';

import { Link} from 'react-router-dom'
import {auth} from '../firebase.js';
import Button from '@material-ui/core/Button';
/*import logo from './logo.svg';*/
/*import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';*/
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import AccountBox from '@material-ui/icons/AccountBox';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';

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
    loginLink:{
        marginTop: theme.spacing.unit * 2,
        textAlign: 'center',
        display: 'block'
    }
  });

class SignupSection extends Component{
    state = {
        snackBarOpen: false,
        userCreatedMsg:'User Created Successfully'
    };
    constructor(props){
        super(props);
        this.email = React.createRef();
        this.pass = React.createRef();
        this.confirmPass = React.createRef();
        this.handleSignUp = this.handleSignUp.bind(this);
    }
    handleSnackBarClose = () => {
        this.setState({ snackBarOpen: false });
    };
    handleSignUp(){
        var email,pass,confirmPass;
        var _self = this;
        email = this.email.current.value;;
        pass = this.pass.current.value;;
        confirmPass = this.confirmPass.current.value;
        console.log(this.email, this.pass);
        /*this.props.handleSignUp(email, pass);*/
        auth.createUserWithEmailAndPassword(email, pass).then(function(o){
            console.log(o);
            console.log("user created");
            _self.setState({ snackBarOpen: true });
        }).catch(function(e){
            console.log(e);
            console.log("error creating user");
            _self.setState({ snackBarOpen: true, userCreatedMsg: 'Error Creating User' });
        });
    }
    render(){
        const classes = this.props.classes;
        return(
          <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <AccountBox />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input id="email" name="email" inputRef={this.email} autoComplete="email" autoFocus />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  inputRef={this.pass}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Confirm Password</InputLabel>
                <Input
                  name="confirm-password"
                  type="password"
                  id="confirm-password"
                  inputRef={this.confirmPass}
                />
              </FormControl>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.handleSignUp}
              >
                Sign Up
              </Button>
              <Link className={classes.loginLink} to="/login">Already have an account? Log In</Link>
            </form>
            <Snackbar
                anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
                open={this.state.snackBarOpen}
                onClose={this.handleSnackBarClose}
                ContentProps={{'aria-describedby': 'message-id'}}
                message={<span id="message-id">{this.state.userCreatedMsg}</span>}
                />
          </Paper>
        </main>
        );
      }
    }
  
    export default withStyles(styles)(SignupSection);