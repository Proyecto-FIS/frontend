import React from "react";
import { Grid } from "@material-ui/core";
import Roaster from "./Roaster";
import UsersService from "../../services/UsersService";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

class RoastersList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            roasters: [] }
    }

    componentDidMount(){ 
        UsersService.getAllRoasters().then(
            (result) => {
                this.setState({
                    roasters: result.data
                })
            }
        )
    }

    render(){
        return (
            <React.Fragment>
            <CssBaseline />
            <main>
              <div>
                <Container maxWidth="sm">
                  <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Roasters
                  </Typography>
                </Container>
              </div>
              <Container maxWidth="md">
                <Grid container spacing={4}>
                  {this.state.roasters.map((roaster) => (
                      <Roaster roaster={roaster}></Roaster>
                  ))}
                </Grid>
              </Container>
            </main>
          </React.Fragment>

        )
    }
    
}
export default RoastersList;


