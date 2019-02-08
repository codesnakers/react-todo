import React from 'react';
import {db} from '../firebase.js';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { NavLink, Redirect } from 'react-router-dom'
import {DateHelper} from '../helper/DateHelper';

import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import { CircularProgress, Typography } from '@material-ui/core';

/*let counter = 0;*/
function createData(index, todo, dueDate, created, done) {
  /*counter += 1;*/
  /*console.log(dueDate, created);*/
  dueDate = DateHelper.getFormattedDateFromTimestamp(dueDate);
  created = DateHelper.getFormattedDateFromTimestamp(created);
  /*console.log(dueDate, created);*/
  return { id: index, todo, dueDate, created, done: done };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3 * 2.8,
  },
  table: {
    minWidth: 400,
    width: '100%',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  addListBtnFab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  addFabLink:{
    display: 'inherit',
    color:'#fff',
  },
  emptyMessage:{
    textAlign:'center',
    marginTop: '100px'
  },
  strike:{
    textDecoration: 'line-through'
  },
  /*checkboxRoot: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },*/
  checkboxChecked: {},
  
});

class Items extends React.Component {
  state = {
    order: 'desc',
    orderBy: 'created',
    selected: [],
    currentListID: null,
    data: [],
    page: 0,
    rowsPerPage: 10,
    dataLoading: true,
    dialogOpen: false,
    redirect: false,
    filter: "all"
  };
  constructor(props){
    super(props);
    this.getItemsFromListID = this.getItemsFromListID.bind(this);
    this.setCurrentListIdInApp = this.setCurrentListIdInApp.bind(this);
    this.deleteItems = this.deleteItems.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleItemStatus = this.handleItemStatus.bind(this);
    this.setItemCounts = this.setItemCounts.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    /*this.addItem = this.addItem.bind(this);*/
  }
  setItemCounts(){
    this.props.setItemCounts();
  }
  handleFilter = (value) => {
    this.setState({filter: value})
  }
  handleClickOpen = () => {
    this.setState({ dialogOpen: true });
  }
  handleClose = () => {
    this.setState({ dialogOpen: false });
  }
  setCurrentListIdInApp(listId){
    this.props.setCurrentListIdInApp(listId);
  }
  convertFirebaseListToData(items){
    if(items === null)  return [];
    var keys = Object.keys(items);
    var data = [];
    data = keys.map(function(value, index){
      return createData(value, items[value].task, items[value].due, items[value].created, items[value].done);
    });
    /*console.log(data);*/
    return data;
  }
  getItemsFromListID(listID){
    var _self = this;
    /*console.log("getItemsFromListID ", listID);*/
    db.ref("/items/"+_self.props.userId+"/"+listID).on("value",function(o){
      /*let temp = {};
      temp[listID] = o.val();*/
      _self.setCurrentListIdInApp(listID);
      _self.setState({ currentListID:listID, data: _self.convertFirebaseListToData(o.val()), listName: _self.props.lists[listID].listName,dataLoading: false });
      _self.setItemCounts();
    })
  }
  deleteItems(){
    const {currentListID, selected} = this.state;
    const userId = this.props.userId;
    console.log(currentListID, selected);
    selected.map(function(item){
      db.ref("/items/"+userId+"/"+currentListID+"/"+item).remove();
      return null;
    });
    this.setState({selected:[]});
    this.handleClose();
  }
  deleteList(){
    const {currentListID} = this.state;
    const userId = this.props.userId;
    console.log(currentListID);
    db.ref("/items/"+userId+"/"+currentListID).remove();
    db.ref("/lists/"+userId+"/"+currentListID).remove();
    this.props.resetCurrentListAndTheme();
    this.setState({redirect:true});
  }
  handleItemStatus(event, id, index){
    console.log(event.target.checked, id, index);
    var data = this.state.data;
    console.log(data , id);
    /*if(data[index].id === id){*/
    for(var i = 0; i < data.length; i++){
      if(data[i].id === id){
        index = i;
        data[index].done = event.target.checked
        this.setState({data: data});
        var update = { task: data[index].todo , done: data[index].done, created: DateHelper.getTimestampFromDateString(data[index].created) , due: DateHelper.getTimestampFromDateString(data[index].dueDate) };
        this.props.markDone(id, update);
        break;
      }
    }
  }
  componentDidMount(){
    console.log(" url param ",this.props.match.params);
    this.getItemsFromListID(this.props.match.params.listID);
  }
  componentDidUpdate(props){
    if(props.match.params.listID !== this.props.match.params.listID){
      this.getItemsFromListID(this.props.match.params.listID);
    }
  }
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }
    this.setState({ order, orderBy });
  }
  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  }

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page, listName, dataLoading, redirect, filter } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    const isDataEmpty = data.length === 0;
    const addBtn = <Button variant="fab" color="primary" aria-label="Add" className={`${classes.button} ${classes.addListBtnFab}`}>
                    <NavLink className={classes.addFabLink} to={`${this.props.location.pathname}/add`}><AddIcon /></NavLink>
                  </Button>;
    if(redirect){
      return <Redirect to={`/`} />;
    }
    if(dataLoading){
      return <Paper className={`loadingWrap ${classes.root}`}><CircularProgress className="loading" /></Paper>;
    }else{
      if(isDataEmpty){
        return <Paper className={classes.root}>
                <Typography variant="h5" className={classes.emptyMessage} gutterBottom>{`No Items click on + on the bottom right to create a todo item.`}</Typography>
                {addBtn}
              </Paper>
      }else{
        return (<Paper className={classes.root}>
                  <EnhancedTableToolbar numSelected={selected.length} handleFilter={this.handleFilter} listName={listName} deleteList={this.deleteList} />
                  <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                      <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={this.handleSelectAllClick}
                        onRequestSort={this.handleRequestSort}
                        rowCount={data.length}
                      />
                      <TableBody>
                        {stableSort(data, getSorting(order, orderBy))
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((n, index) => {
                            /*const isSelected = this.isSelected(n.id);*/
                            const isSelected = n.done;
                            if(filter!=="all" && n.done!==filter){
                              return null;
                            }
                            return (
                              <TableRow
                                hover
                                /*onClick={event => this.handleClick(event, n.id)}*/
                                role="checkbox"
                                aria-checked={isSelected}
                                tabIndex={-1}
                                key={n.id}
                                selected={isSelected}
                              >
                                <TableCell padding="checkbox">
                                  <Checkbox checked={isSelected} onClick={event => this.handleItemStatus(event, n.id, index)} classes={{ root: classes.checkboxRoot, checked: classes.checkboxChecked }} />
                                </TableCell>
                                <TableCell className={isSelected?classes.strike:""} component="th" scope="row" padding="none">{n.todo}</TableCell>
                                <Hidden xsDown>
                                  <TableCell className={isSelected?classes.strike:""} >{n.dueDate}</TableCell>
                                </Hidden>
                                <Hidden smDown>
                                  <TableCell className={isSelected?classes.strike:""} >{n.created}</TableCell>
                                </Hidden>
                                <TableCell padding="checkbox">
                                  <Tooltip title="Delete">
                                    <IconButton onClick={this.handleClickOpen} aria-label="Delete">
                                      <DeleteIcon />
                                    </IconButton>
                                  </Tooltip>
                                </TableCell>
                                {/*<TableCell numeric>{n.carbs}</TableCell>
                                <TableCell numeric>{n.protein}</TableCell>*/}
                              </TableRow>
                            );
                          })}
                        {emptyRows > 0 && (
                          <TableRow style={{ height: 49 * emptyRows }}>
                            <TableCell colSpan={4} />
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                      'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                      'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  />
                  {addBtn}
                  <Dialog
                    open={this.state.dialogOpen}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">{"Delete Item?"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Are you sure you wnat to delete todo item?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleClose} color="primary">No</Button>
                      <Button onClick={this.deleteItems} color="primary" autoFocus>Yes</Button>
                    </DialogActions>
                  </Dialog>
                </Paper>
        );
      }
    }
  }
}

Items.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Items);