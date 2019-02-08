import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

class TodoHeader extends Component{
    render(){
      /*return (<header className="todo-header"><h1>ToDo App</h1></header>);*/
      return ( <Typography component="h1" variant="h5">
            ToDo App
        </Typography> );
    }
  }
export default TodoHeader;