import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  media: {
    paddingTop: '100%', 
    height: "20px",
    width:"100%"
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function ThirdCol() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            L
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={<p style={{fontSize: "16px", fontWeight: "bold", marginBottom: "0px"}}>Lamborghini Paella</p>}
        subheader="September 14, 2016"
      />
      <CardContent>
        <p style={{fontSize: "16px", fontWeight: "500"}}> File Preview</p>
        <img src="https://media.architecturaldigest.com/photos/5b9691509cd13621bf9b559b/16:9/w_2991,h_1682,c_limit/JPrice_Lamborghini_MCW18-1755.jpg" alt="car"  width="100%" style={{borderRadius: "10px"}}/>

        <p style={{fontWeight: "500", marginTop: "15px", marginBottom:" 0px"}}>Dil Mere - The Local Train<span style={{color:"grey"}}>.mp4</span></p>
        <small style={{color:"grey"}}>2.6 GB, 26 Min</small>
      </CardContent>

      <CardContent>
        <p style={{fontSize: "16px", fontWeight: "500"}}> File Description</p>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent>

      <CardContent>
        <p style={{fontSize: "16px", fontWeight: "500"}}> File Shared With</p>
        <div >
          <div style={{display: "inline-block"}}>
            <Avatar aria-label="recipe" style={{backgroundColor:"#4AB7FF"}}>
              A
            </Avatar>
          </div>
          <div style={{display: "inline-block", marginLeft: "5px"}}>
             - Alex Walker
          </div>
        </div>
        <div style={{marginTop: "5px"}}>
          <div style={{display: "inline-block"}}>
            <Avatar aria-label="recipe" className={classes.avatar}  >
              C
            </Avatar>
          </div>
          <div style={{display: "inline-block", marginLeft: "5px"}}>
             - Christiano Ronaldo
          </div>
        </div>
      </CardContent>
    </div>
  );
}