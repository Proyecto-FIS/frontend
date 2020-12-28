import React, { Component } from "react";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import { green } from '@material-ui/core/colors';
import { Link } from "react-router-dom";
import MainGrid from "../Common/MainGrid";
import BillingProfile from "./BillingProfile";
import { Grid, Card } from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import BillingProfileService from "../../services/BillingProfileService";
import { connect } from "react-redux";

const AddButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
}))(Button);

const AddButtonGrid = () => (
    <Grid item>
        <AddButton variant="contained" color="primary"
            startIcon={<AddIcon />}
            component={Link} to="/billingprofiles/add">Añadir perfil</AddButton>
    </Grid>
);

class BillingProfileList extends Component {

    constructor(props) {
        super(props);
        BillingProfileService.requestProfiles();
    }

    render() {

        const { profiles } = this.props;

        const skeleton = Array.from({ length: 8 }).map((v, i) => (
            <Grid key={i} item xs={12}>
                <Card><Skeleton variant="rect" height={"30vh"} /></Card>
            </Grid>
        ));

        const profileList = profiles === null ? skeleton : profiles.map((v, i) => (
            <Grid key={i} item xs={12}>
                <BillingProfile profile={v} />
            </Grid>
        ));

        return (
            <MainGrid container spacing={2} justify="flex-end">
                <AddButtonGrid />
                <Grid item container spacing={2}>
                    {profileList}
                </Grid>
            </MainGrid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        profiles: state.LoaderReducer.elements
    };
};

export default connect(mapStateToProps)(BillingProfileList);
