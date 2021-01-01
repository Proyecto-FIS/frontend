import { Component } from "react";
import { IconButton, Typography, Grid } from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import PurchaseHistoryService from "../../services/PurchaseHistoryService";

class PurchaseHistoryNav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            pageTimestamps: [new Date()]
        };

        this.reloadPage();
    }

    loadPage(increment) {
        
        const currentPage = this.state.page + increment;

        if(this.state.pageTimestamps.length < currentPage) {
            this.state.pageTimestamps.push(this.props.beforeTimestamp);
        }

        PurchaseHistoryService.getHistory(this.props.pageSize, this.state.pageTimestamps[currentPage - 1])
            .then(() => {
                if(this.props.loaded && this.props.isEmpty && currentPage > 1) {
                    this.reloadPage();
                } else {
                    this.setState(prevState => ({ page: prevState.page + increment }));
                }
            })
            .catch(() => { });
    }

    prevPage = () => this.loadPage(-1)
    nextPage = () => this.loadPage(1)
    reloadPage = () => this.loadPage(0)

    render() {

        const { loaded, isEmpty } = this.props;

        const canGoBack = loaded && this.state.page > 1;
        const canGoForward = loaded && !isEmpty;

        return (
            <Grid container spacing={1} alignItems="center">
                <Grid item>
                    <IconButton aria-label="prevPage" disabled={!canGoBack} onClick={() => this.prevPage()}>
                        <ArrowBackIosIcon />
                    </IconButton>
                </Grid>
                <Grid item>
                    <Typography>Página {this.state.page}</Typography>
                </Grid>
                <Grid item>
                    <IconButton aria-label="nextPage" disabled={!canGoForward} onClick={() => this.nextPage()}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Grid>
            </Grid>
        );
    }
};

export default PurchaseHistoryNav;
