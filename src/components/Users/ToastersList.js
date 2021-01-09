import React from "react";

import ToasterSkeleton from "./ToasterSkeleton";
import UsersService from "../../services/UsersService";

import { Grid } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Divider } from '@material-ui/core';


class ToastersList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            toasters: [] }
    }

    componentDidMount(){ 
        UsersService.getAllToasters().then(
            (result) => {
                this.setState({
                    toasters: result.data
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
                <Container maxWidth="md">
                  <Typography component="h1" variant="h4" style={{ textAlign: 'center', marginTop: "24px",
                marginBottom: "8px"}}>
                    Toasters
                  </Typography> 
                  <Divider variant="fullWidth" /><br/>
                </Container>
              </div>
              <Container maxWidth="md">
                <Grid container spacing={4}>
                  {this.state.toasters.map((toaster) => (
                      <ToasterSkeleton toaster={toaster}/>
                  ))}
                </Grid>
              </Container>
            </main>
          </React.Fragment>

        )
    }
    
}
export default ToastersList;


