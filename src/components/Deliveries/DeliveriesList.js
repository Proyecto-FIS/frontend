import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Delivery from "./Delivery";
import DeliveryService from "../../services/DeliveryService";

const styles = (theme) => ({
    centerColumn: {
        backgroundColor: "lightgray",
        marginTop: theme.spacing(0),
    }
});

export class DeliveriesList extends Component {

    componentDidMount() {
        this.DeliveryService = new DeliveryService();
        this.DeliveryService.requestAllDeliveries();
    }

    render() {
        const { classes, deliveries } = this.props;

        let deliveriesList = deliveries.map(delivery => <Delivery key={delivery._id} delivery={delivery} />)
            
        return (
            <Grid container spacing={2}>
                <Grid item xs={2} />
                <Grid container item xs={8} spacing={2} className={classes.centerColumn}>
                    {deliveriesList}
                </Grid>
                <Grid item xs={2} />
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        deliveries: state.DeliveriesReducer.deliveryList,
    };
};

export default connect(mapStateToProps)(
    withStyles(styles, { withTheme: true })(DeliveriesList)
);