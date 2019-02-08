import React from 'react';

import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

/*import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './components/listItems';
import SimpleTable from './components/SimpleTable';*/
/*import SimpleLineChart from './components/SimpleLineChart';*/
import Grid from '@material-ui/core/Grid';
import {styles} from './components/styles/dashboard.styles';
import { LineChart, Line,BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

class Dashboard extends React.Component {
  state = {    createdLastMonth: [], dueNextMonth:[]  };
  constructor(props){
    super(props);
    this.getItemsCreatedLastMonth = this.getItemsCreatedLastMonth.bind(this);
    this.getItemsDueNextMonth = this.getItemsDueNextMonth.bind(this);
    this.getListItemsStatus = this.getListItemsStatus.bind(this);
  }
  getItemsCreatedLastMonth(){
    var _self = this;
    var userid = this.props.userId;
    if(userid !== null){
      axios.get(this.props.CLOUDURL+'getItemsCreatedLastMonth?userid='+userid).then((response) => {
        _self.setState({
          createdLastMonth: response.data
        });
      });
    }
  }
  getItemsDueNextMonth(){
    var _self = this;
    var userid = this.props.userId;
    if(userid !== null){
      axios.get(this.props.CLOUDURL+'getItemsDueNextMonth?userid='+userid).then((response) => {
        _self.setState({
          dueNextMonth: response.data
        });
      });
    }
  }
  getListItemsStatus(){
    var _self = this;
    var userid = this.props.userId;
    if(userid !== null){
      axios.get(this.props.CLOUDURL+'getListItemsStatus?userid='+userid).then((response) => {
        _self.setState({
          listItemsStatus: response.data
        });
      });
    }
  }
  componentDidMount(){
    this.getItemsCreatedLastMonth();
    this.getItemsDueNextMonth();
    this.getListItemsStatus();
  }
  componentDidUpdate(){
    if(this.props.theme !== this.props.defaultTheme){
      this.props.resetCurrentListAndTheme();
    }
  }
  render() {
    const { classes } = this.props;
    
    return (
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Grid container spacing={24}>
          <Grid className={classes.chartWrapper} item md={6} sm={12}>
            <Typography variant="h6" margin={{top: 0}} className={classes.centerHeading}>
              ToDo Items Created Last Month
            </Typography>
            <ResponsiveContainer>
            <LineChart data={this.state.createdLastMonth}
                  margin={{top: 5, right: 0, left: 0, bottom: 5}}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              <Legend />
              <Line type="monotone" dataKey="created" stroke="#8884d8" activeDot={{r: 8}}/>
              {/*<Line type="monotone" dataKey="due" stroke="#82ca9d" />*/}
            </LineChart>
            </ResponsiveContainer>
          </Grid>
          <Grid className={classes.chartWrapper} item md={6} sm={12}>
            <Typography variant="h6" margin={{top: 0}} className={classes.centerHeading}>
              ToDo Items Due Next Month
            </Typography>
            <ResponsiveContainer>
              <LineChart data={this.state.dueNextMonth}
                    margin={{top: 5, right: 0, left: 0, bottom: 5}}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                <Line type="monotone" dataKey="due" stroke="#82ca9d" activeDot={{r: 8}}/>
                {/*<Line type="monotone" dataKey="due" stroke="#82ca9d" />*/}
              </LineChart>
            </ResponsiveContainer>  
          </Grid>
        </Grid>
        <Grid container spacing={24}>
        <Grid  item md={6} sm={12} className={classes.chartWrapper} >
            <Typography variant="h6" className={`${classes.centerHeading} ${classes.headingMargin}`}>My Lists Overview</Typography>
            <ResponsiveContainer>
              <BarChart data={this.state.listItemsStatus}
                  margin={{top: 20, right: 0, left: 0, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend />
                <Bar dataKey="pending" stackId="a" fill="#8884d8" />
                <Bar dataKey="complete" stackId="a" fill="#82ca9d" />
                <Bar dataKey="overdue" fill="#d9ac28" />
              </BarChart>
            </ResponsiveContainer>
          </Grid>
          <Grid  item md={6} sm={12}>
            <Typography variant="h5" className={`${classes.centerHeading} ${classes.headingMargin}`}>
              <br />This is a ToDo application created using <a target="_blank" rel="noopener noreferrer" href="https://reactjs.org/">Reactjs</a>, <a target="_blank" rel="noopener noreferrer" href="https://material-ui.com/">Material UI</a>, <a target="_blank" rel="noopener noreferrer" href="https://reacttraining.com/react-router/">React Router</a>, <a target="_blank" rel="noopener noreferrer" href="http://recharts.org/en-US/">Recharts</a> for the Frontend<br />
              <a target="_blank" rel="noopener noreferrer" href="https://firebase.google.com/">Firebase</a> for backend, <a target="_blank" rel="noopener noreferrer" href="https://firebase.google.com/docs/functions/">Firebase Cloud Functions</a> have been used for fetching data for the Charts<br />
              Here are links to my <a target="_blank" rel="noopener noreferrer" href="http://codesnakers.com/portfolio.php">Portfolio</a>, <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/makhijavijay/">Linkedin</a>, <a target="_blank" rel="noopener noreferrer" href="http://codesnakers.com/uploads/VijayMakhija_CV.pdf">Resume</a>
            </Typography>
          </Grid>
        </Grid>
        {/*<Typography variant="h4" gutterBottom component="h2">Products</Typography>*/}
        {/*<div className={classes.tableContainer}><SimpleTable /></div>*/}
        {/*<div className="TodoApp">
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                <TodoHeader />*/}
                {/*<TodoAdd addItem={this.props.addItem}  />*/}
                {/*<TodoList markDone={this.props.markDone} lists={this.props.lists} todoItems={this.props.todoItems} />
                </Paper>
            </main>
        </div>*/}
      </main>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
