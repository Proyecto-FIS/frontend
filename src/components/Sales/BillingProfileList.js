import React, { Component } from "react";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import { green } from '@material-ui/core/colors';
import { Link } from "react-router-dom";
import MainGrid from "../Common/MainGrid";
import BillingProfile from "./BillingProfile";
import { Grid } from "@material-ui/core";

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
        const profile = {
            name: "Andrés",
            surname: "Martínez",
            address: "Calle de la amargura Nº20",
            city: "Woohoo",
            province: "Salsa",
            country: "España",
            zipCode: "12345",
            phoneNumber: "123456",
            email: "a@a.com"
        };
        return (
            <MainGrid>
                <AddButton variant="contained" color="primary"
                    startIcon={<AddIcon />}
                    component={Link} to="/billingprofiles/add">Añadir perfil</AddButton>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <BillingProfile profile={profile} />
                    </Grid>
                    <Grid item xs={12}>
                        <BillingProfile profile={profile} />
                    </Grid>
                </Grid>
            </MainGrid>
        );
    }
}

export default BillingProfileList;
