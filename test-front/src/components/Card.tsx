import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  IconButtonProps,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { blueGrey, indigo, red, yellow } from "@mui/material/colors";
import LanguageIcon from "@mui/icons-material/Language";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

export type Pitch = {
  id: String;
  title: String;
  description: String;
};

export type PitchProps = {
  pitchs: any;
};

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CardComponent: React.FC<PitchProps> = ({ pitchs }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  console.log(pitchs);
  return (
    <>
      <div style={{ overflowY: "auto", overflowX: "hidden", height: 230 }}>
        <Grid container spacing={2}>
          {pitchs.map((pitch: Pitch, i: number) => (
            <div key={i}>
              <Grid item xs={6} marginLeft={3} marginTop={2}>
                <Card sx={{ minWidth: "300px" }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: yellow[500] }} aria-label="recipe">
                        <LanguageIcon />
                      </Avatar>
                    }
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ mt: -3, color: indigo[400] }}
                    >
                      {pitch.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {pitch.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "space-between" }}>
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{
                        width: "35%",
                        fontSize: "10px",
                        borderRadius: 5,
                        borderColor: blueGrey[800],
                        color: blueGrey[800],
                      }}
                    >
                      See Profile
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        width: "50%",
                        fontSize: "10px",
                        borderRadius: 5,
                        bgcolor: blueGrey[800],
                      }}
                    >
                      Generate Profile
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </div>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default CardComponent;
