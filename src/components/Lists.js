import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';

/*import {styles} from './styles/dashboard.styles';*/
import {ThemeContext} from './theme-context';

/*const styles = theme => ({
  root: {
    width: '100%',
    /*maxWidth: 360,* /
    backgroundColor: theme.palette.background.paper,
  },
});*/

class CheckboxList extends React.Component {
  state = {
    checked: [0],
  };

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
    /*console.log(this.props);
    const { classes } = this.props;*/

    return (
        <ThemeContext.Consumer>
        {(classes)=>(
            /*<div className={classes.listRoot}>*/
            <Paper className={`${classes.paper} ${classes.listsWrap}`}>
                <List className={classes.listsContainer}>
                {[0, 1, 2, 3, 4].map(value => (
                    <ListItem key={value} role={undefined} dense button onClick={this.handleToggle(value)}>
                    {/*<Checkbox
                        checked={this.state.checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple="false"
                        color="primary"
                    />*/}
                    <ListItemText primary={`Line item ${value + 1}`} />
                    <ListItemSecondaryAction>
                        <span className="listItemCount">0/3</span>
                        <IconButton aria-label="Delete">
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                    </ListItem>
                ))}
                </List>
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

CheckboxList.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default CheckboxList;
/*export default withStyles(styles)(CheckboxList);*/