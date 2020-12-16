import { Card, Grid } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    heigh: '100px',
  },
  cardContent: {
    flexGrow: 1,
  },
  cardSecondaryInfo: {
    display: 'flex',
  },
  CardActions: {
    margin: "auto",
  },
}));

function Roaster(props){
  const classes = useStyles();
  return (
      <Grid item key={props.roaster._id} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={props.roaster.pictureUrl}
          title="Image title"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {props.roaster.name}
          </Typography>
          <Typography>
            {props.roaster.description}
          </Typography>
          
        </CardContent>
        <CardContent className={classes.cardContent}>
            
          Telefono: {props.roaster.phoneNumber}
          <br></br>
          Dirección: {props.roaster.address}
        </CardContent>
        <CardActions className={classes.CardActions}>
          <Button size="large" color="primary" variant="contained">
            Contacto
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default Roaster
