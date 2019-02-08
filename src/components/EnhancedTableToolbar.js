import React from 'react';
import PropTypes from 'prop-types';

import { lighten } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Toolbar from '@material-ui/core/Toolbar';

const toolbarStyles = theme => ({
    root: {
      paddingRight: theme.spacing.unit,
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    spacer: {
      flex: '1 1 100%',
    },
    actions: {
      color: theme.palette.text.secondary,
    },
    title: {
      flex: '0 0 auto',
    },
    deleteButton:{
      minWidth: '140px'
    }
  });
  
  /*let EnhancedTableToolbar = props => {*/
    class EnhancedTableToolbar extends React.Component{
      state = {anchorEl: null, dialogOpen: false, filter: "all" };
      handleDialogOpen = () => {
        this.setState({ dialogOpen: true });
      }
      handleDialogClose = () => {
        this.setState({ dialogOpen: false });
      }
      handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleClose = () => {
        this.setState({ anchorEl: null });
      };
      deleteList = () => {
        this.props.deleteList();
        this.handleDialogClose();
      };
      handleFilter = (e) => {
        console.log(e.target.name, e.target.value);
        this.setState({filter: e.target.value});
        this.props.handleFilter(e.target.value);
      }
     /* constructor(props){
        super(props);
        this.deleteItems = this.deleteItems.bind(this);
        this.handleClose = this.handleClose.bind(this);
      }
      deleteItems(){
        this.handleClose();
        this.props.deleteItems();
      }*/

    render(){
      const { classes, listName } = this.props;
      return (
        /*<Toolbar className={classNames(classes.root, {  [classes.highlight]: numSelected > 0, })} >*/
        <Toolbar className={classes.root}>
          <div className={classes.title}>
          <span>View : &nbsp;</span>
          <Select name="filter" value={this.state.filter} onChange={this.handleFilter}>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value={false}>Incomplete</MenuItem>
            <MenuItem value={true}>Complete</MenuItem>
          </Select>
            {/*<Typography variant="h6" id="tableTitle">{listName}</Typography>*/}
            {/*numSelected > 0 ? (
              <Typography color="inherit" variant="subtitle1">
                {numSelected} selected
              </Typography>
            ) : (
              <Typography variant="h6" id="tableTitle">
                {listName}
              </Typography>
            )*/}
          </div>
          <div className={classes.spacer} />
          <div className={classes.actions}>
              <Button variant="contained" onClick={this.handleDialogOpen} className={classes.deleteButton}>Delete List</Button>
            {/*<Tooltip title="Delete">
                <IconButton onClick={this.handleDialogOpen} aria-label="Delete">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            numSelected > 0 ? (
              <Tooltip title="Delete">
                <IconButton onClick={this.handleClickOpen} aria-label="Delete">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Filter list">
                <IconButton aria-label="Filter list">
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
            )*/}
          </div>
          <Dialog
            open={this.state.dialogOpen}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Delete Item?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete {listName}<br />All Items in the list will be deleted?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleDialogClose} color="primary">No</Button>
              <Button onClick={this.deleteList} color="primary" autoFocus>Yes</Button>
            </DialogActions>
          </Dialog>
        </Toolbar>
      );
    }
  };
  
  EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    listName: PropTypes.string.isRequired
  };
  
  EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

  export default EnhancedTableToolbar;