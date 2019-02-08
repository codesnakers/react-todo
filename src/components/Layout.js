import React, {Component} from 'react'
import ROUTES from '../config/routes';
import { withRouter } from "react-router-dom";

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListIcon from '@material-ui/icons/List';
import TimerIcon from '@material-ui/icons/Timer';
import AddIcon from '@material-ui/icons/Add';

import { secondaryListItems } from './listItems';
/*import SimpleLineChart from './components/SimpleLineChart';*/
import {styles} from './styles/dashboard.styles';
import {ThemeContext} from './theme-context';
import { NavLink } from 'react-router-dom';

class Layout extends Component {

    /*constructor(props){        super(props);      }*/
    ROUTE_TITLES = {
      APP_PAGE:       "Dashboard",
      LOGIN_PAGE:     "Login",
      SIGNUP_PAGE:    "Sign Up",
      SIGNOUT:        "Log Out",
      DASHBOARD:      "Dashboard",
      TODO:           "ToDo",
      LISTS:          "My Lists",
      CREATELIST:     "Add List"
    }
    constructor(props){
      super(props);
      this.setItemCounts = this.setItemCounts.bind(this);
    }
    setItemCounts(){
      this.props.setItemCounts();
    }
    getTitle(path, lists){
      var title, route_ids = Object.keys(this.ROUTE_TITLES);
      /*console.log(path);*/
      for(var i in route_ids){
        /*console.log(ROUTES[route_ids[i]] , path);*/
        if(ROUTES[route_ids[i]] === path){
          title = this.ROUTE_TITLES[route_ids[i]];
          break;
        }
      }
      if(path.match(/\/list\/(-)\w+/g)!==null){
        let listid = path.replace(/list/g,"").replace(/add/g,"").replace(/\//g,"");
        if(lists[listid] !== undefined){
          title = lists[listid].listName;
        }
      }
      if(path.match(/\/list\/(-)\w+\/add/g)!==null){
        title = "Add Item"
      }
      return title;
    }
    componentDidMount(){
      console.log("layout mount ", this.props.userId);
    }
    componentDidUpdate(props){
      if(props.userId !== this.props.userId){
        this.setItemCounts();
      }
    }
    render() {
        /*var classes = styles;*/
        var {classes, lists, dataLoading, itemCounts} = this.props;
        var listIDs;
        if(lists===undefined || lists===null){
          listIDs = [];
        }else{
          listIDs = Object.keys(lists);
        }
        var p = window.location.pathname;

        var title = this.getTitle(p, lists, listIDs);
        
        return (p === ROUTES.LOGIN_PAGE || p === ROUTES.SIGNUP_PAGE || p === ROUTES.SIGNOUT) ? (
            <div className="nonDashboardPage">
                {this.props.children}
            </div>
        ) : (
        <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar
            position="absolute" className={classNames(classes.appBar, this.props.drawerOpen && classes.appBarShift)} >
            <Toolbar disableGutters={!this.props.drawerOpen} className={classes.toolbar}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.props.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  this.props.drawerOpen && classes.menuButtonHidden,44
                )}
              >
                <MenuIcon />
              </IconButton>
              <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>{title}</Typography>
              {/*<IconButton color="inherit"><DeleteIcon /></IconButton>*/}
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !this.props.drawerOpen && classes.drawerPaperClose)
            }}
            open={this.props.drawerOpen}
          >
            <div className={classes.toolbarIcon}>
              <IconButton aria-label="Close drawer" onClick={this.props.handleDrawerClose}><ChevronLeftIcon /></IconButton>
            </div>
            <Divider />
            {/*<List>{mainListItems}</List>*/}
            <List>
                <ListItem button>
                    <NavLink className="menuLink" to="/">
                    <ListItemIcon><DashboardIcon /></ListItemIcon>
                    <ListItemText primary="Dashboard" />
                    </NavLink>
                </ListItem>
                {dataLoading===true?
                  <ListItem>
                        <ListItemIcon><TimerIcon /></ListItemIcon>
                        <ListItemText primary="Loading..." />
                    </ListItem>
                :listIDs.map(id => (
                    <ListItem button className={this.props.location.pathname===`/list/${id}`?`activeLink ${classes[lists[id].theme+"LeftBorder"]}`:`${classes[lists[id].theme+"LeftBorder"]}`}>
                        {/*<NavLink className={this.props.location.pathname===`/list/${id}`?"menuLink activeLink":"menuLink"} to={`/list/${id}`}>*/}
                        <NavLink className={`menuLink ${this.props.drawerOpen?"drawerOpen":"drawerClose"}`} to={`/list/${id}`}>
                        <ListItemIcon><ListIcon /></ListItemIcon>
                        <ListItemText primary={lists[id].listName} secondary={(itemCounts[id]!==undefined)?itemCounts[id].doneItems+"/"+itemCounts[id].totalItems:""} />
                        </NavLink>
                    </ListItem>
                ))}
                <ListItem button>
                    <NavLink className="menuLink" to="/createlist">
                    <ListItemIcon><AddIcon /></ListItemIcon>
                    <ListItemText primary="Create List" />
                    </NavLink>
                </ListItem>
            </List>
            <Divider />
            <List>{secondaryListItems}</List>
          </Drawer>
            <ThemeContext.Provider value={classes}>
                {this.props.children}
            </ThemeContext.Provider>
                </div>
      </React.Fragment>
        );
    }
}

Layout.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Layout));