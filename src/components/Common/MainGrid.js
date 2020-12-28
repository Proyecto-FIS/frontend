import { Grid } from "@material-ui/core";

const MainGrid = ({ children }) => (
    <Grid container>
        <Grid item sm={2} xs={1}></Grid>
        <Grid item sm={8} xs={10}>
            {children}
        </Grid>
        <Grid item sm={2} xs={1}></Grid>
    </Grid>
);

export default MainGrid;
