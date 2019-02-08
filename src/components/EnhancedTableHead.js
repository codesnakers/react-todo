import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import {styles} from './styles/dashboard.styles';
import Tooltip from '@material-ui/core/Tooltip';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';


const rows = [
    { id: 'todo', numeric: false, disablePadding: true, label: 'Todo' },
    { id: 'dueDate', numeric: false, disablePadding: false, label: 'Due Date' },
    { id: 'created', numeric: false, disablePadding: false, label: 'Created' },
    { id: 'actions', numeric: false, disablePadding: true, label: ' ' },
  ];
  
  class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
      this.props.onRequestSort(event, property);
    };
  
    render() {
      const { order, orderBy, classes } = this.props;
  
      return (
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              {/*<Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={numSelected === rowCount}
                onChange={onSelectAllClick}
              />*/}
            </TableCell>
            {rows.map(row => {
              return (
                  <TableCell
                    key={row.id}
                    numeric={row.numeric}
                    padding={row.disablePadding ? 'none' : 'default'}
                    sortDirection={orderBy === row.id ? order : false}
                    className={row.id==="dueDate"?classes.hideXsDown:(row.id==="created"?classes.hideSmDown:"")}
                  >
                    <Tooltip
                      title="Sort"
                      placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                      enterDelay={300}
                    >
                      <TableSortLabel
                        active={orderBy === row.id}
                        direction={order}
                        onClick={this.createSortHandler(row.id)}
                      >
                        {row.label}
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
              );
            }, this)}
          </TableRow>
        </TableHead>
      );
    }
  }
  
  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  export default withStyles(styles)(EnhancedTableHead);