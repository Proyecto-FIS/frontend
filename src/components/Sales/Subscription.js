import { Component } from "react";
import { Card, CardContent, Grid, Typography, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SubscriptionService from "../../services/SubscriptionService";
import setSubscription from "../../redux/actions/Payment/setSubscription";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Subscription extends Component {

    edit() {
        this.props.setSubscription(this.props.subscription);
        this.props.history.push("/subscriptions/add");
    }

    delete() {
        SubscriptionService.deleteSubscription(this.props.subscription)
            .then(() => SubscriptionService.requestSubscriptions())
            .catch(() => { });
    }

    render() {
        const { subscription } = this.props;

        return (
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid container item xs={11} direction="column" spacing={1}>
                            <Grid item>
                                <Typography variant="h5" color="textPrimary">
                                    {subscription.name} {subscription.surname}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" color="textPrimary">
                                    {subscription.address}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1" color="textSecondary">
                                    [{subscription.zipCode}] {subscription.city}, {subscription.province}, {subscription.country}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1" color="textSecondary">
                                    {subscription.phoneNumber}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1" color="textSecondary">
                                    {subscription.email}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container item xs={1} spacing={2} alignItems="flex-end">
                            <Grid item>
                                <IconButton aria-label="Editar" onClick={() => this.edit()}>
                                    <EditIcon />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <IconButton aria-label="Borrar" onClick={() => this.delete()}>
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

const mapDispatchToProps = {
    setSubscription
};

export default withRouter(connect(null, mapDispatchToProps)(Subscription));
