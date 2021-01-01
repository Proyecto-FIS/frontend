import { Component } from "react";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import snackBarFinished from "../../redux/actions/SnackBar/snackBarFinished";
import { connect } from "react-redux";

class SnackBarListener extends Component {

    render() {
        const { snackBar, snackBarFinished } = this.props;
        const snackBarOpen = snackBar.message !== "";
    
        return (
            <Snackbar open={snackBarOpen} autoHideDuration={5000} onClose={snackBarFinished}>
                <MuiAlert elevation={6} variant="filled" onClose={snackBarFinished} severity={snackBar.severity}>
                    {snackBar.message}
                </MuiAlert>
            </Snackbar>);
    }
}

const mapDispatchToProps = {
    snackBarFinished
};

const mapStateToProps = (state) => {
    return {
        snackBar: {
            severity: state.SnackbarReducer.severity,
            message: state.SnackbarReducer.message
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SnackBarListener);
