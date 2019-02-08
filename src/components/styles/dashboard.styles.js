import { amber, blue, brown, cyan, green, indigo, lime, pink, purple, red, teal, yellow } from '@material-ui/core/colors';

const drawerWidth = 240;
export const styles = theme => ({
    root: {
      display: 'flex',
      height: '100vh'
    },
    flexWrap:{
      display: 'flex',
      alignItems: 'flex-start',
      flexWrap: 'wrap'
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing.unit * 7,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing.unit * 9,
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
      height: '100vh',
      overflow: 'auto',
    },
    chartContainer: {
      marginLeft: -22,
    },
    tableContainer: {
      height: 320,
    },
    h5: {
      marginBottom: theme.spacing.unit * 2,
    },
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
    },
    listsWrap:{
      width: '100%'
    },
    listsContainer:{
      width: '100%'
    },
    addListBtnFab: {
      position: 'absolute',
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2,
    },
    TodoAdd:{
      display: 'flex',
      flexWrap: 'wrap',
      padding: '20px',
      width: '100%',
      marginTop: '100px',
    },
    centerHeading:{
      textAlign: 'center',
    },
    headingMargin:{
      marginTop: '20px'
    },
    themeSelectBtn:{
      margin: 0,
      borderRadius: 0
    },
    themeSelectDoneIcon:{
      color: '#fff',
    },
    hideSmDown:{
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    hideXsDown:{
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    chartWrapper:{
      height:'50vh'
    },
    amberLeftBorder:{
      borderLeftColor: amber[800],
      borderLeftStyle: 'solid',
      borderLeftWidth: '5px'
    }, 
    blueLeftBorder:{
      borderLeftColor: blue[800],
      borderLeftStyle: 'solid',
      borderLeftWidth: '5px'
    }, 
    brownLeftBorder:{
      borderLeftColor: brown[800],
      borderLeftStyle: 'solid',
      borderLeftWidth: '5px'
    }, 
    cyanLeftBorder:{
      borderLeftColor: cyan[800],
      borderLeftStyle: 'solid',
      borderLeftWidth: '5px'
    },
    greenLeftBorder:{
      borderLeftColor: green[800],
      borderLeftStyle: 'solid',
      borderLeftWidth: '5px'
    },
    indigoLeftBorder:{
      borderLeftColor: indigo[800],
      borderLeftStyle: 'solid',
      borderLeftWidth: '5px'
    },
    limeLeftBorder:{
      borderLeftColor: lime[800],
      borderLeftStyle: 'solid',
      borderLeftWidth: '5px'
    },
    pinkLeftBorder:{
      borderLeftColor: pink[800],
      borderLeftStyle: 'solid',
      borderLeftWidth: '5px'
    },
    purpleLeftBorder:{
      borderLeftColor: purple[800],
      borderLeftStyle: 'solid',
      borderLeftWidth: '5px'
    },
    redLeftBorder:{
      borderLeftColor: red[800],
      borderLeftStyle: 'solid',
      borderLeftWidth: '5px'
    },
    tealLeftBorder:{
      borderLeftColor: teal[800],
      borderLeftStyle: 'solid',
      borderLeftWidth: '5px'
    },
    yellowLeftBorder:{
      borderLeftColor: yellow[800],
      borderLeftStyle: 'solid',
      borderLeftWidth: '5px'
    },
  });