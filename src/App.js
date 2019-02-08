import React, { Component } from 'react';
import axios from 'axios';
/*import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';*/
/*import {todosFbRef, auth} from './firebase.js';*/
import {db, auth} from './firebase.js';
import ROUTES from './config/routes';
import Todo from './components/Todo';
import SignOut from './components/SignOut';
import Lists from './components/Lists';
import Items from './components/Items';
import Table from './components/Table';
import TodoAdd from './components/TodoAdd';
import TodoCreateList from './components/TodoCreateList';

import { Route, BrowserRouter as Router , Switch } from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";
import LoginSection from './components/LoginSection';
import SignupSection from './components/SignupSection';
import Notfound from './notfound'
import Dashboard from "./Dashboard";
import {DateHelper} from './helper/DateHelper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MuiThemeProvider } from '@material-ui/core/styles';
import {themeList} from './components/themes';
import Layout from './components/Layout.js';
import withWidth from '@material-ui/core/withWidth';

/*import { withRouter } from "react-router";*/
/*import logo from './logo.svg';*/
/*import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';*/

import './App.css';

/*
https://console.firebase.google.com/project/baymax-ai-5bfac/database/baymax-ai-5bfac/data
https://firebase.google.com/docs/auth/web/password-auth
https://firebase.google.com/docs/samples/
https://firebase.google.com/docs/auth/web/manage-users

*/

/*todoItems.push({index: 4, value: "learn react", done: false});
todoItems.push({index: 5, value: "Go shopping", done: true});
todoItems.push({index: 6, value: "buy flowers", done: true});*/

/*var todoItems2 = [];
todoItems2.push({index: 4, task: "learn react", done: false});
todoItems2.push({index: 5, task: "Go shopping", done: true});
todoItems2.push({index: 6, task: "buy flowers", done: true});*/

class App extends Component {
  defaultTheme = 'indigo';
  CLOUDURL = "https://us-central1-baymax-ai-5bfac.cloudfunctions.net/";
  constructor(props){
    super(props);
    this.markDone = this.markDone.bind(this);
    this.addItem = this.addItem.bind(this);
    /*this.getNextIndex = this.getNextIndex.bind(this);*/
    this.afterLogin = this.afterLogin.bind(this);
    this.addList = this.addList.bind(this);
    /*this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogin = this.handleLogin.bind(this);*/
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.setCurrentListIdInApp = this.setCurrentListIdInApp.bind(this);
    this.setItemCounts = this.setItemCounts.bind(this);
    this.resetCurrentListAndTheme = this.resetCurrentListAndTheme.bind(this);
    var isLoggedIn = false, userId = null;
    /*console.log("in constructor ");*/
    /*console.log("setting initial state to ", isLoggedIn);*/
    var drawerOpen = (this.props.width==="lg")?true:false;
    this.state = { currentListID: null, todoItems:{}, lists:[], loggedIn: isLoggedIn, authLoading: true, 
                  userId: userId, drawerOpen: drawerOpen, dataLoading: true, theme:this.defaultTheme, itemCounts:{} };
  }
  handleDrawerOpen = () => {
    /*console.log("drawer open");*/
    this.setState({ drawerOpen: true });
  };
  handleDrawerClose = () => {
    /*console.log("close drawer");*/
    this.setState({ drawerOpen: false });
  };
  setCurrentListIdInApp(listId){
    this.setState({ currentListID: listId, theme: this.state.lists[listId].theme });
  }
  resetCurrentListAndTheme(){
    this.setState({currentListID: null, theme: this.defaultTheme});
  }
  getSnapshot(){
    if(this.state.loggedIn){
      /*todosFbRef.once('value').then(function(snapshot) {
        var allTodos = snapshot.val();
        console.log(allTodos);
        if(allTodos === null) allTodos = [];
        _self.setState({ todoItems: allTodos });
      });*/
      var _self = this;
      /*console.log(this.state.userId, auth.O);*/
      /*db.ref("/lists/"+auth.O).once('value').then(function(snapshot) {
        var lists = snapshot.val();
        console.log(lists);
        _self.setState({ lists: lists, dataLoading: false });
        /*if(allTodos === null) allTodos = [];
        _self.setState({ todoItems: allTodos });* /
      });*/

      db.ref("/lists/"+auth.O).on('value', function(snapshot) {
        var lists = snapshot.val();
        _self.setState({ lists: lists, dataLoading: false });
        /*if(allTodos === null) allTodos = [];
        _self.setState({ todoItems: allTodos });*/
        _self.setItemCounts();
      });
    }
  }
  addItem(newTaskTxt, listID, due){
    var newPostKey = db.ref().child('items').push().key;
    var updates = {};
    updates['/items/' + auth.O + '/' + listID + '/' + newPostKey] = { task: newTaskTxt , done: false, created: DateHelper.getTodayTimestamp() , due: DateHelper.getTimestampFromDateString(due) };
    db.ref().update(updates);
    /*var newIndex = this.getNextIndex();* /
    /*var newTask = { index: newIndex , task: newTaskTxt , done: false };* /
    /*var newTask = { task: newTaskTxt , done: false };
    var items = this.state.todoItems;
    items.push(newTask);
    console.log(items);
    var uid = this.state.userId;
    var userData = [];
    if(newIndex===0){
      this.setState({ todoItems: items });
      userData[uid] = this.state.todoItems;
      /*todosFbRef.set( userData );* /
    }*/
  }
  componentDidMount() {
    var _self = this;
    auth.onAuthStateChanged(function(user) {
      if (user) {
        /*console.log("set state user logged in uid: ", user.uid);*/
        _self.setState({loggedIn: true, authLoading: false, userId: user.uid, dataLoading: true});
        _self.getSnapshot();
      } else {
        /*console.log("set state user logged out");*/
        _self.setState({loggedIn: false, authLoading: false});
      }
    });
  }
  /*handleSignUp(email, pass){}
  handleLogin(email, pass){}*/
  markDone(itemID, update){
    /*console.log(itemID, update, auth.O, this.state.currentListID);*/
    /*var updates = {};
    updates['/items/' + auth.O + '/' + this.state.currentListID + '/' + itemID] = update;*/
    console.log('/items/' + auth.O + '/' + this.state.currentListID + '/' + itemID);
    /*db.ref().update(update);*/
    db.ref('/items/' + auth.O + '/' + this.state.currentListID + '/' + itemID).set(update,function(err){
      console.error(err);
    });
  }
  /*getNextIndex(){
    if(this.state.todoItems.length===0){
      return 0;
    }else{
      return this.state.todoItems[this.state.todoItems.length - 1].index + 1;
    }
  }*/
  addList(listName, theme){
    /* -LRBsyrtXr1DSByt8coc */
    var newPostKey = db.ref().child('lists').push().key;
    /*var newPostKey = db.ref().child('items').push().key;*/
    var updates = {};
    updates['/lists/' + auth.O + '/' + newPostKey] = { listName: listName, theme: theme };
    /*updates['/items/' + auth.O + '/-LRBsyrtXr1DSByt8coc/' + newPostKey] = { task: "new Task Txt" , done: false, created: this.today(), due: this.todayPlusTen() };*/
    /*console.log(updates);*/
    db.ref().update(updates);
    this.setState({ currentListID: newPostKey });
  }
  
  afterLogin(uid){
    if(uid === undefined){
      uid = auth.currentUser.uid;
    }
    this.setState({loggedIn: true, authLoading: false, userId: uid});
  }
  checkLoggedIn(){
    if(typeof auth=="object" && typeof auth.currentUser=="object" && auth.currentUser!=null){
      //isLoggedIn = true;
      /*console.log("loggedin ", auth.currentUser);*/
      this.afterLogin();
      return true;
      //userId = auth.currentUser.uid;
    }else{
      //isLoggedIn = false;
      /*console.log("not loggedin");*/
      return false;
    }
  }
  setItemCounts(){
    var _self = this;
    var userid = this.state.userId;
    if(userid !== null){
      axios.get(this.CLOUDURL+'getDoneItems?userid='+userid).then((response) => {
        _self.setState({
          itemCounts: response.data
        });
      });
    }
  }
  /*componentWillReceiveProps(nextProps){
    console.log("componentWillReceiveProps");
    this.checkLoggedIn();
  }*/
  render() {
    const { loggedIn, userId, authLoading, todoItems, lists, dataLoading, currentListID, theme,itemCounts } = this.state;
    /*console.log("render App ", authLoading, loggedIn, todoItems);*/
    /*if (this.state.loggedIn === true) {
      return <Redirect to={ROUTES.APP_PAGE} />
    }*/
    //if(this.state.loggedIn){
      return authLoading && !dataLoading ? (<div className="loadingWrap"><CircularProgress className="loading" /></div>) : (
        /*<div className="TodoApp">
            <TodoHeader />
            <TodoAdd addItem={this.addItem}  />
            <TodoList markDone={this.markDone} items={this.state.todoItems} />
        </div>*/
        <MuiThemeProvider theme={themeList[theme]} >
        <Router>
          <Layout dataLoading={dataLoading} userId={userId} lists={lists} currentListID={currentListID} 
                  handleDrawerClose={this.handleDrawerClose} handleDrawerOpen={this.handleDrawerOpen} 
                  drawerOpen={this.state.drawerOpen} itemCounts={itemCounts} setItemCounts={this.setItemCounts} >
          <Switch>
          <PrivateRoute
              exact
              path={ROUTES.APP_PAGE}
              component={Dashboard}
              todoItems={todoItems}
              lists={lists}
              authenticated={loggedIn}
              markDone={this.markDone}
              userId={userId}
              CLOUDURL = {this.CLOUDURL}
              resetCurrentListAndTheme={this.resetCurrentListAndTheme}
              theme={theme}
              defaultTheme={this.defaultTheme}
              title="Dashboard"
            />
            <PrivateRoute
              exact
              path={ROUTES.LISTS}
              component={Lists}
              todoItems={todoItems}
              lists={lists}
              authenticated={loggedIn}
              userId={userId}
              title="My Lists"
            />
            <PrivateRoute
              exact
              path={ROUTES.ITEMS}
              component={Items}
              setCurrentListIdInApp={this.setCurrentListIdInApp}
              lists={lists}
              authenticated={loggedIn}
              userId={userId}
              markDone={this.markDone}
              resetCurrentListAndTheme={this.resetCurrentListAndTheme}
              title="Items"
              itemCounts={itemCounts} setItemCounts={this.setItemCounts}
            />
            <PrivateRoute
              exact
              path={ROUTES.ADDITEM}
              component={TodoAdd}
              lists={lists}
              authenticated={loggedIn}
              userId={userId}
              currentListID={this.state.currentListID}
              addItem={this.addItem}
              title="Add Item"
            />
            <PrivateRoute
              exact
              path={ROUTES.CREATELIST}
              component={TodoCreateList}
              lists={lists}
              authenticated={loggedIn}
              userId={userId}
              currentListID={this.state.currentListID}
              addList={this.addList}
              title="Add List"
            />
            <Route exact path={ROUTES.TODO} component={Todo}  todoItems={todoItems} authenticated={loggedIn}
              addItem={this.addItem}
              markDone={this.markDone}
              uid={userId} />
            <Route exact path={ROUTES.LOGIN_PAGE} authLoading={authLoading} component={() => <LoginSection afterLogin={this.afterLogin} />} />
            <Route exact path={ROUTES.SIGNUP_PAGE} component={SignupSection} />
            <Route exact path={ROUTES.SIGNOUT} component={SignOut} />
            <Route exact path={ROUTES.TABLE} component={Table} />
            {/*<Route exact path={ROUTES.DASHBOARD} component={Dashboard} />*/}
            <Route component={Notfound} />
            </Switch>
            </Layout>
        </Router>
        </MuiThemeProvider>
      );
    //}else{
      /*return (
        <div className="TodoApp">
            <LoginSection />
            <SignupSection />
        </div>
      );*/
    //}
  }
}

export default withWidth()(App);
