import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
/*import logo from './logo.svg';*/
import TextField from '@material-ui/core/TextField';
import { FormControl } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import {ThemeContext} from './theme-context';
import { Redirect } from 'react-router-dom';

/*const styles = theme => ({
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
      /*marginTop: theme.spacing.unit * 3,*/
      /*height: "36px",* /
      borderRadius: 0
    },
    newTaskTxt: {
        /*height: "36px",* /
    },
    signupLink:{
        /*marginTop: theme.spacing.unit * 2,* /
        textAlign: 'center',
        display: 'block'
    }
  });*/

class TodoAdd extends Component{
    constructor(props){
      super(props);
      this.state = { newTask:'', due:'', redirect:false };
      this.handleAddTaskTxt = this.handleAddTaskTxt.bind(this);
      this.handleDueDate = this.handleDueDate.bind(this);
      this.addItem = this.addItem.bind(this);
      this.clearForm = this.clearForm.bind(this);
    }
    handleAddTaskTxt(e){
      this.setState({newTask: e.target.value });
    }
    handleDueDate(e){
      this.setState({due: e.target.value });
    }
    clearForm(){
      this.setState({newTask: '', due:'', redirect:true });
    }
    addItem(){
      /*console.log(this.state.newTask, this.props.currentListID, this.state.due);
      console.log(this.props.location.pathname.replace("/add",""));*/
      this.props.addItem(this.state.newTask, this.props.currentListID, this.state.due);
      this.clearForm();
    }
    render(){
        /*const classes = this.props.classes;*/
        const {lists, currentListID, location} = this.props;
        /*console.log("add item to ",this.props.lists[this.props.currentListID].listName);*/
        /*console.log("add item to ",lists, currentListID);*/
      return this.state.redirect?(
        <Redirect to={location.pathname.replace("/add","")} />
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
                    <TextField required id="newTask" name="newTask" label="New Task Here..." InputLabelProps={{shrink: true}} className={classes.newTaskTxt} onChange={this.handleAddTaskTxt} />
                  </FormControl>
                  <br />
                  <FormControl fullWidth className={classes.margin}>
                    {/*<InputLabel htmlFor="duedate">Due Date</InputLabel>*/}
                    <TextField required id="duedate" name="duedate" label="Due Date" type="date" InputLabelProps={{shrink: true}} onChange={this.handleDueDate} />
                  </FormControl>
                  <br />
                  <FormControl fullWidth className={classes.margin}>
                  <Button variant="contained" color="primary" className={classes.submit} onClick={this.addItem} >{`Add Task to ${lists[currentListID].listName}`}</Button>
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
  export default TodoAdd;