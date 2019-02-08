import React, { Component } from 'react';
/* https://material-ui.com/demos/lists/ */
class TodoItem extends Component{
    constructor(props){
      super(props);
      this.markDone = this.markDone.bind(this);
    }
    markDone(e){
      /*console.log(e.target.value, e.target.checked, e.target.dataset.key);
      this.props.items[e.target.dataset.key].done = e.target.checked;
      console.log(this.props);*/
      this.props.markDone(e.target.dataset.key,e.target.checked);
    }
    render(){
      /*var todoChecked = this.props.item.done ? "checked=checked" : "";*/
      var items = "";
      if(this.props.todoItems!==undefined && this.props.todoItems.length > 0){
        items = this.props.todoItems.map( (item, index) => {
          return <li key={index}><input type="checkbox" key={index} data-key={index} checked={item.done} onChange={this.markDone} className="task-index-chk" value={item.index} /><span>{item.task}</span></li>
        });
      }
      return items;
    }
  }

  export default TodoItem;