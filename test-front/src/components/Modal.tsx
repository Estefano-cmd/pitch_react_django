import * as React from "react";

import {
  Backdrop,
  Box,
  Modal,
  Button,
  Typography,
  Container,
  AppBar,
  TextField,
  Grid,
} from "@mui/material";
import { useSpring, animated } from "@react-spring/web";

import CardComponent from "./Card";
import { indigo, blueGrey } from "@mui/material/colors";

import { Search } from "./search";

interface FadeProps {
  children: React.ReactElement;
  in?: boolean;
  onClick?: any;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onExited?: (node: HTMLElement, isAppearing: boolean) => void;
  ownerState?: any;
}

export type Pitch = {
  id: String;
  title: String;
  description: String;
};

const ModalComponent = React.forwardRef<HTMLDivElement, FadeProps>(
  function Fade(props, ref) {
    const {
      children,
      in: open,
      onClick,
      onEnter,
      onExited,
      ownerState,
      ...other
    } = props;
    const style = useSpring({
      from: { opacity: 0 },
      to: { opacity: open ? 1 : 0 },
      onStart: () => {
        if (open && onEnter) {
          onEnter(null as any, true);
        }
      },
      onRest: () => {
        if (!open && onExited) {
          onExited(null as any, true);
        }
      },
    });

    return (
      <animated.div ref={ref} style={style} {...other}>
        {React.cloneElement(children, { onClick })}
      </animated.div>
    );
  }
);

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

export default function SpringModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [pitchs, setPitch] = React.useState<Pitch[]>([]);
  const [searchValue, setSearchValue] = React.useState("");

  const loadPitch = async () => {
    const response = await fetch("/api/pitch");
    const data = await response.json();
    setPitch(data);
  };

  React.useEffect(() => {
    loadPitch();
    /*  console.log(loadPitch()) */
  }, []);

  let searchedPitchs = [];

  if (searchValue.length <= 1) {
    searchedPitchs = pitchs;
  } else {
    searchedPitchs = pitchs.filter((pitch) => {
      const pitchTitle = pitch.title.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return pitchTitle.includes(searchText);
    });
  }

  return (
    <div>
      <Container
        maxWidth="lg"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Button onClick={handleOpen} variant="contained" sx={{ mt: 20 }}>
          Show
        </Button>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: ModalComponent,
          },
        }}
      >
        <ModalComponent in={open}>
          <Box sx={style}>
            <AppBar
              sx={{
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                bgcolor: "#263238",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                p: 1,
              }}
            >
              <Typography
                id="spring-modal-title"
                variant="h6"
                component="h2"
                sx={{ p: 1 }}
              >
                Create new pitch
              </Typography>
              <Button
                variant="contained"
                sx={{
                  height: "100%",
                  bgColor: blueGrey[800],
                  borderRadius: "20px",
                }}
              >
                Create
              </Button>
            </AppBar>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                mt: 5,
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Typography id="spring-modal-description">Pitch Title</Typography>
              <TextField
                id="outlined-search"
                label="Create a title..."
                type="search"
                size="small"
                sx={{ width: "80%", borderRadius: 10 }}
              />
            </Box>

            <Box
              sx={{
                width: "auto",
                height: 350,
                padding: 2,
                mt: 3,
                bgcolor: blueGrey[200],
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            >
              <Typography
                id="spring-modal-title"
                variant="h6"
                component="h2"
                sx={{ p: 1 }}
              >
                Profiles
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Search
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                ></Search>
              </Box>
              {searchedPitchs.length > 0 ? (
                <CardComponent pitchs={searchedPitchs} />
              ) : (
                <CardComponent pitchs={pitchs} />
              )}
            </Box>
          </Box>
        </ModalComponent>
      </Modal>
    </div>
  );
}
