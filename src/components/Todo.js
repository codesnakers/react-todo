import React, { Component } from 'react';

import TodoAdd from './TodoAdd';
import TodoList from './TodoList';
/*import { Route, Link, BrowserRouter as Router , Switch } from 'react-router-dom';*/
/*import logo from './logo.svg';*/
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

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
      /*marginTop: theme.spacing.unit * 3,*/
      /*height: "36px",*/
      borderRadius: 0
    },
    newTaskTxt: {
        /*height: "36px",*/
    },
    signupLink:{
        /*marginTop: theme.spacing.unit * 2,*/
        textAlign: 'center',
        display: 'block'
    }
  });

class Todo extends Component{

    render(){
        const classes = this.props.classes;
        return (
            <div className="TodoApp">
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                    {/*<TodoHeader />*/}
                    <TodoAdd addItem={this.props.addItem}  />
                    <TodoList markDone={this.props.markDone} lists={this.props.lists} todoItems={this.props.todoItems} />
                    </Paper>
                </main>
            </div>
          );
    }
  }
  export default withStyles(styles)(Todo);