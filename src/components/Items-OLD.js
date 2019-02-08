import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import {db, auth} from '../firebase.js';

/*import {styles} from './styles/dashboard.styles';*/
import {ThemeContext} from './theme-context';
import { Typography } from '@material-ui/core';

/*const styles = theme => ({
  root: {
    width: '100%',
    /*maxWidth: 360,* /
    backgroundColor: theme.palette.background.paper,
  },
});*/

class Items extends React.Component {
  state = {
    checked: [0],
    listID:"",
    todoItems:[],
    itemKeys:[],
    dataLoading: true
  };
  constructor(props){
      super(props);
        /*if(this.props.match.params.listID !== this.state.listID){
            this.setState({listID: this.props.match.params.listID})
        }*/
    this.getItems = this.getItems.bind(this);
    console.log("constructor Items.js");
  }
  componentDidMount(){
      /*this.setState({listID:this.props.match.params.listID})*/
      console.log("componentDidMount Items.js");
      this.getItems(this.props.match.params.listID);
  }
  componentDidUpdate(prevProps){
    console.log("componentDidUpdate Items.js ", prevProps);
    if(prevProps.match.params.listID !== this.props.match.params.listID){
        this.setState({dataLoading: true});
        this.getItems(this.props.match.params.listID);
    }
    /*this.getItems(this.props.match.params.listID);*/
  }
  getItems(listID){
    let _self = this;
    console.log("getItems Items.js ", listID);
    /*_self.setState({ todoItems: [], itemKeys: [] });*/
    /*db.ref("/items/"+auth.O+"/"+_self.state.listID).once('value').then(function(snapshot) {*/
    db.ref("/items/"+auth.O+"/"+listID).on('value', function(snapshot){
        var items = snapshot.val();
        items = items === null ? [] : items;
        console.log(items, listID);
        _self.setState({ todoItems: items, itemKeys: Object.keys(items), listID: listID, dataLoading:false });
        /*if(allTodos === null) allTodos = [];
        _self.setState({ todoItems: allTodos });*/
    });
  }

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    console.log("render Items.js");
    /*console.log(this.props);
    const { classes } = this.props;*/
    console.log(this.props.match);
    
    var {todoItems, itemKeys, dataLoading} = this.state;

    return (
        <ThemeContext.Consumer>
        {(classes)=>(
            /*<div className={classes.listRoot}>*/
            <Paper className={`${classes.paper} ${classes.listsWrap}`}>
            <div>{this.props.match.params.listID}</div>
                
                
                {/*(itemKeys.length === 0)?(*/
                  (dataLoading === true)?(
                    <div className="loadingWrap"><CircularProgress className="loading" /></div>
                ):(
                    (itemKeys.length === 0)?(
                        <Typography variant="h6" color="inherit">
                        No ToDo Items, Click on + at bottom right corner to create one
                        </Typography>
                    ):(
                        <List className={classes.listsContainer}>
                        {itemKeys.map(value => (
                        <ListItem key={value} role={undefined} dense button onClick={this.handleToggle(value)}>
                        <Checkbox
                            checked={this.state.checked.indexOf(value) !== -1}
                            tabIndex={-1}
                            disableRipple={false}
                            color="primary"
                        />
                        <ListItemText primary={todoItems[value].task} />
                        <ListItemSecondaryAction>
                            <span className="listItemCount">0/3</span>
                            <IconButton aria-label="Delete">
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                        </ListItem>
                        ))}
                        </List>
                    )
                )}
                
                <Button variant="fab" color="primary" aria-label="Add" className={`${classes.button} ${classes.addListBtnFab}`}>
                    <AddIcon />
                </Button>
            </Paper>
            /*</div>*/
        )}
      </ThemeContext.Consumer>
    );
  }
}

Items.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default Items;
/*export default withStyles(styles)(CheckboxList);*/