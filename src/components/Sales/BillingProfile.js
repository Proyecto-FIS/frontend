import { Component } from "react";
import { Card, CardContent, Grid, Typography, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import BillingProfileService from "../../services/BillingProfileService";
import setBillingProfile from "../../redux/actions/BillingProfile/setBillingProfile";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class BillingProfile extends Component {

    edit() {
        this.props.setBillingProfile(this.props.profile);
        this.props.history.push("/billingprofiles/add");
    }

    delete() {
        BillingProfileService.deleteProfile(this.props.profile)
            .then(() => BillingProfileService.requestProfiles())
            .catch(() => { });
    }

    render() {
        const { profile } = this.props;

        return (
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid container item xs={11} direction="column" spacing={1}>
                            <Grid item>
                                <Typography variant="h5" color="textPrimary">
                                    {profile.name} {profile.surname}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" color="textPrimary">
                                    {profile.address}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1" color="textSecondary">
                                    [{profile.zipCode}] {profile.city}, {profile.province}, {profile.country}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1" color="textSecondary">
                                    {profile.phoneNumber}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1" color="textSecondary">
                                    {profile.email}
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
    setBillingProfile
};

export default withRouter(connect(null, mapDispatchToProps)(BillingProfile));
