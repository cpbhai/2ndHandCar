import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
//import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import CardStyle from "./CardStyle";
import "./ProductCard.css";
const ProductCard = ({ itm }) => {
  const useStyles = makeStyles((theme) => CardStyle(theme));
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <img className="prodCardImg" src={`${itm.images[0].url}`} alt="..." />
        <CardContent>
          <Typography gutterBottom variant="subtitle2" component="div">
            {itm.title}
          </Typography>
          <Typography variant="p" display="block" gutterBottom>
            {itm.discost}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/*<Button size="small" onClick={() => console.log("B")}>
      Share
    </Button>*/}
    </Card>
  );
};

export default ProductCard;
