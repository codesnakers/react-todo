import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
/*import logo from './logo.svg';*/
import TextField from '@material-ui/core/TextField';
import { FormControl } from '@material-ui/core';

import { MuiThemeProvider } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';

import Paper from '@material-ui/core/Paper';
import {ThemeContext} from './theme-context';
import { Redirect } from 'react-router-dom';
import {themeList} from './themes';

class TodoCreateList extends Component{
    constructor(props){
      super(props);
      this.state = { newList:'', theme:'indigo', redirect:false };
      this.handleAddListTxt = this.handleAddListTxt.bind(this);
      this.addList = this.addList.bind(this);
      this.handleThemeSelect = this.handleThemeSelect.bind(this);
      this.clearForm = this.clearForm.bind(this);
    }
    handleAddListTxt(e){
      this.setState({newList: e.target.value });
    }
    clearForm(){
      this.setState({newList: '', redirect:true });
    }
    addList(){
      /*console.log(this.state.newTask, this.props.currentListID, this.state.due);
      console.log(this.props.location.pathname.replace("/add",""));*/
      this.props.addList(this.state.newList, this.state.theme);
      this.clearForm();
    }
    handleThemeSelect(themeName){
      this.setState({theme: themeName });
    }
    render(){
      const themeNames = Object.keys(themeList);
        /*const classes = this.props.classes;*/
        const {currentListID} = this.props;
        const _self = this;
        console.log("currentListID: ", currentListID);
        /*console.log("add item to ",this.props.lists[this.props.currentListID].listName);*/
        /*console.log("add item to ",lists, currentListID);*/
      return this.state.redirect?(
        <Redirect to={`/list/${currentListID}`} />
      ):(
        <ThemeContext.Consumer>
        {(classes)=>(
        /*<div className="todo-addtask-wrap">
          <input type="text" className="addtask-text" onChange={this.handleAddTaskTxt} placeholder="Type New Task Here..." />
          <button onClick={this.addItem} className="addtask-btn">Add Task</button>
        </div>
        /*<main className={classes.content}>
        <div className={classes.appBarSpacer} />*/
        /*<Typography variant="h4" gutterBottom component="h2">Products</Typography>*/
        /*<div className={classes.tableContainer}><SimpleTable /></div>*/
        <div className={classes.TodoAdd}>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                  <FormControl fullWidth className={classes.margin}>
                    {/*<InputLabel htmlFor="newTask">New Todo</InputLabel>*/}
                    <TextField required id="newList" name="newList" label="New List" InputLabelProps={{shrink: true}} className={classes.newListTxt} onChange={this.handleAddListTxt} />
                  </FormControl>
                  <br />
                  <div className={classes.flexWrap}>
                  {themeNames.map(function(themeName){
                    return  <MuiThemeProvider theme={themeList[themeName]}>
                            <Button variant="contained" onClick={()=>_self.handleThemeSelect(themeName)} color="primary" className={classes.themeSelectBtn}>
                              <DoneIcon color="primary" className={_self.state.theme===themeName?`${classes.themeSelectDoneIcon}`:``} />
                            </Button>
                          </MuiThemeProvider>;
                  })}
                  </div>
                  <br />
                  <FormControl fullWidth className={classes.margin}>
                  <Button variant="contained" color="primary" className={classes.submit} onClick={this.addList} >{`Add List`}</Button>
                  </FormControl>
                </Paper>
            </main>
        </div>
          /*</div>
         /*</main>*/
        )}
        </ThemeContext.Consumer>
      );
    }
  }
  /*export default withStyles(styles)(TodoAdd);*/
  export default TodoCreateList;