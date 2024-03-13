import {
  useMediaQuery,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Dialog,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import Sidebar from "../helper/Sidebar";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import {
  Favorite,
  FavoriteBorder,
  ThumbUp,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import { MainContext } from "./context";
import {
  getUserFavorites,
  handleAddFavorite,
  handleViewLikes,
} from "../api/apicalls";
import CustomSnackBar from "../helper/CustomSnackBar";

function View() {
  const media = useMediaQuery("(max-width:768px)");
  const { state } = useLocation();
  const [contentLoader, setContentLoader] = useState<boolean>(false);
  const { mode } = MainContext();
  const [data, setData] = useState<Object | any>();
  const [favorites, setFavorites] = useState<Array<Object> | any>();
  const [snack, setSnack] = useState({ open: false, message: "", color: "" });
  const [user, setUser] = useState<string>("");
  useEffect(() => {
    async function handler() {
      setContentLoader(true);
      await getUserFavorites(setFavorites);
      setData(state);
      setContentLoader(false);
    }
    handler();
  }, []);
  return (
    <Box className="mainContainer">
      <Navbar user={user} setUser={setUser} />

      <Grid container>
        {!media && (
          <Grid item sm={3} md={2}>
            <Sidebar isFixed={false} />
          </Grid>
        )}
        <Grid item md={9} sx={{ flexBasis: !media ? "70%" : "", padding: 5 }}>
          {Object.keys(state).length && (
            <Card
              style={{
                backgroundColor: mode == "dark" ? "black" : "",
                color: mode == "dark" ? "white" : "",
                border: mode == "dark" ? "1px solid white" : "1px solid black",
              }}
            >
              <CardMedia
                sx={{
                  maxHeight: `${window.innerHeight / 1.5}px`,
                  objectFit: "contain",
                }}
                component="img"
                image={data?.image}
                alt="Image not found"
              />
              <CardContent
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  paddingTop: 30,
                }}
              >
                <Typography style={{ fontSize: "x-large" }}>
                  {data?.title?.length > 40
                    ? data?.title.slice(0, 40) + "..."
                    : data?.title}
                </Typography>
                <Typography variant="body1">{data?.content}</Typography>
                {data?.related_links.map((item: any, index: number) => (
                  <a
                    href={item}
                    style={{
                      display: "block",
                      color: mode == "dark" ? "orange" : "blue",
                    }}
                    target="_blank"
                  >
                    Link -{index + 1}
                  </a>
                ))}
              </CardContent>
              <CardActions>
                {data?.likedUsers.includes(localStorage.getItem("user")) ? (
                  <>
                    <ThumbUp
                      style={{ color: "#007fff" }}
                      onClick={async () => {
                        setContentLoader(true);
                        await handleViewLikes(data, setData);
                        setContentLoader(false);
                      }}
                    />
                    <p>{data?.likes}</p>
                  </>
                ) : (
                  <>
                    <ThumbUpAltOutlined
                      onClick={async () => {
                        setContentLoader(true);
                        await handleViewLikes(data, setData);
                        setContentLoader(false);
                      }}
                    />
                    <p>{data?.likes}</p>
                  </>
                )}
                {favorites
                  ?.map((i: { _id: any }) => i._id)
                  .includes(data._id) ? (
                  <Favorite
                    style={{ color: "red" }}
                    onClick={async () => {
                      setContentLoader(true);
                      await handleAddFavorite(data, setFavorites);
                      setContentLoader(false);
                      setSnack({
                        ...snack,
                        open: true,
                        message: "Removed from favorites",
                      });
                    }}
                  />
                ) : (
                  <FavoriteBorder
                    onClick={async () => {
                      setContentLoader(true);
                      await handleAddFavorite(data, setFavorites);
                      setContentLoader(false);
                      setSnack({
                        ...snack,
                        open: true,
                        message: "Added to favorites",
                      });
                    }}
                  />
                )}
                <Dialog open={contentLoader}>
                  <DialogTitle>
                    <CircularProgress />
                  </DialogTitle>
                </Dialog>
              </CardActions>
            </Card>
          )}
        </Grid>
        <CustomSnackBar snack={snack} setSnack={setSnack} />
      </Grid>
      <Sidebar isFixed={true} />
    </Box>
  );
}

export default View;
