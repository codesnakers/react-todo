import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoList extends Component{
    render(){
      /*console.log(this.props.children);*/
      return (
        <div className="todo-tasklist-wrap">
          <ul className="todo-tasklist">
            <TodoItem markDone={this.props.markDone} lists={this.props.lists} todoItems={this.props.todoItems} />
          </ul>
        </div>
      );
    }
  }

  export default TodoList;