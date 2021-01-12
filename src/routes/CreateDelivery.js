import React, { Component } from "react";
import NewDelivery from "../components/Deliveries/NewDelivery";
import { Grid } from "@material-ui/core";

class CreateDelivery extends Component {
    render() {
        return (
            <Grid container>
                <Grid container item sm={2} xs={1}></Grid>
                <Grid item sm={8} xs={10}>
                    <NewDelivery/>
                </Grid>
            </Grid>
        );
    }
}

export default CreateDelivery;