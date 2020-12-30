import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Alert, AlertTitle}  from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

//Posibles valores de severity: error - warning - info - success

const AlertComp = ({ alerts }) => {
    const classes = useStyles();

    return (
        alerts !== null && alerts.length > 0 && alerts.map(alert => (
            <div className={classes.root}>

            <Alert key={alert.id} severity={alert.alertType}>
                <AlertTitle>{alert.alertType}</AlertTitle>
                {alert.msg}
            </Alert>

            </div>
        ))
    )
}

AlertComp.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  alerts: state.AlertReducer
});

export default connect(mapStateToProps)(AlertComp);