import React, { Component, Fragment } from "react";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import { green } from '@material-ui/core/colors';
import { Link } from "react-router-dom";

const AddButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
}))(Button);

class BillingProfileList extends Component {
    render() {
        return (
            <Fragment>
                <AddButton
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    component={Link} to="/billingprofiles/add"
                >Añadir perfil</AddButton>
            </Fragment>
        );
    }
}

export default BillingProfileList;
