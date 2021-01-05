import React, { Component } from "react";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import { green } from '@material-ui/core/colors';
import { Link } from "react-router-dom";
import MainGrid from "../components/Common/MainGrid";
import Subscription from "../components/Sales/Subscription";
import { Grid, Card } from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import SubscriptionService from "../services/SubscriptionService";
import { connect } from "react-redux";
import setSubscription from "../redux/actions/Subscription/setSubscription";

const AddButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
}))(Button);

class SubscriptionList extends Component {

    constructor(props) {
        super(props);
        this.props.setSubscription(null);
        SubscriptionService.requestSubscriptions();
    }

    render() {

        const { subscriptions } = this.props;

        const skeleton = Array.from({ length: 8 }).map((v, i) => (
            <Grid key={i} item xs={12}>
                <Card><Skeleton aria-label="skeleton" variant="rect" height={"30vh"} /></Card>
            </Grid>
        ));

        const subscriptionList = subscriptions === null ? skeleton : subscriptions.map((v, i) => (
            <Grid key={i} item xs={12}>
                <Subscription subscription={v} />
            </Grid>
        ));

        return (
            <MainGrid container spacing={2} justify="flex-end">
                <Grid item>
                    <AddButton variant="contained" color="primary"
                        startIcon={<AddIcon />}
                        component={Link} to="/subscription/add">Añadir perfil</AddButton>
                </Grid>
                <Grid item container spacing={2}>
                    {subscriptionList}
                </Grid>
            </MainGrid>
        );
    }
}

const mapDispatchToProps = {
    setSubscription
};

const mapStateToProps = (state) => {
    return {
        subscriptions: state.LoaderReducer.elements
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionList);
