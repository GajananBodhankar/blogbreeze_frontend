import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogTitle,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./footer";
import Sidebar from "../helper/Sidebar";
import {
  getUserFavorites,
  handleAddFavorite,
  handleFavoriteLikes,
} from "../api/apicalls";
import { Link, useNavigate } from "react-router-dom";
import {
  Favorite,
  FavoriteBorder,
  ThumbUp,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import { MainContext } from "./context";

function MyFavorites() {
  const [contentLoader, setContentLoader] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<any>();
  const navigate = useNavigate();
  const [user, setUser] = useState<string>("");
  const [snack, setSnack] = useState({ open: false, message: "", color: "" });
  const media = useMediaQuery("(max-width:768px)");
  const { mode } = MainContext();
  useEffect(() => {
    async function callGetAllFavorites() {
      setContentLoader(true);
      await getUserFavorites(setFavorites);
      setContentLoader(false);
    }
    callGetAllFavorites();
    if (!localStorage.getItem("user")) {
      navigate("/", { replace: true });
    }
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
        {!media ? (
          <Grid
            className="gridContainer"
            gap={{ md: 4, sm: 5, lg: 4 }}
            padding={1}
            position={"relative"}
            marginBottom={10}
            display={"flex"}
            justifyContent={"center"}
          >
            {favorites?.length == 0 && (
              <Typography
                variant="h4"
                color={mode == "dark" ? "orange" : "initial"}
              >
                No blogs added to favorite 🙁...
              </Typography>
            )}
            {favorites?.map((blog: any) => {
              return (
                <Grid
                  item
                  md={3}
                  sm={5}
                  lg={4}
                  className="blogItems"
                  key={blog._id}
                >
                  <Card className={mode == "light" ? "cardLight" : "cardDark"}>
                    <CardMedia
                      component="img"
                      className="cardMedia"
                      image={blog.image}
                      alt="Image not found"
                    />
                    <CardContent>
                      <Typography style={{ fontSize: "x-large" }}>
                        {blog.title.length > 40
                          ? blog.title.slice(0, 40) + "..."
                          : blog.title}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      {blog.likedUsers.includes(
                        localStorage.getItem("user")
                      ) ? (
                        <>
                          <ThumbUp
                            style={{ color: "#007fff" }}
                            onClick={async () => {
                              setContentLoader(true);
                              await handleFavoriteLikes(blog, setFavorites);
                              setContentLoader(false);
                            }}
                          />
                          <p>{blog.likes}</p>
                        </>
                      ) : (
                        <>
                          <ThumbUpAltOutlined
                            onClick={async () => {
                              setContentLoader(true);
                              await handleFavoriteLikes(blog, setFavorites);
                              setContentLoader(false);
                            }}
                          />
                          <p>{blog.likes}</p>
                        </>
                      )}
                      {favorites
                        ?.map((i: { _id: any }) => i._id)
                        .includes(blog._id) ? (
                        <Favorite
                          style={{ color: "red" }}
                          onClick={async () => {
                            setContentLoader(true);
                            await handleAddFavorite(blog, setFavorites);
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
                            await handleAddFavorite(blog, setFavorites);
                            setContentLoader(false);
                            setSnack({
                              ...snack,
                              open: true,
                              message: "Added to favorites",
                            });
                          }}
                        />
                      )}
                      <Link
                        to={{ pathname: "/view" }}
                        style={{
                          color: mode == "light" ? "blue" : "orange",
                        }}
                        className={"readMore"}
                        state={blog}
                      >
                        Read More
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Grid
            container
            gap={4}
            display={"flex"}
            justifyContent={"center"}
            marginY={10}
            position={"relative"}
          >
            {favorites?.map((blog: any) => {
              return (
                <Grid item sm={5} xs={10} key={blog._id}>
                  <Card className={mode == "light" ? "cardLight" : "cardDark"}>
                    <CardMedia
                      component="img"
                      className="cardMedia"
                      image={blog.image}
                      alt="Image not found"
                    />
                    <CardContent>
                      <Typography style={{ fontSize: "x-large" }}>
                        {blog.title.length > 40
                          ? blog.title.slice(0, 40) + "..."
                          : blog.title}
                      </Typography>
                      {blog._id}
                    </CardContent>
                    <CardActions>
                      {blog.likedUsers.includes(
                        localStorage.getItem("user")
                      ) ? (
                        <>
                          <ThumbUp
                            style={{ color: "#007fff" }}
                            onClick={async () => {
                              setContentLoader(true);
                              await handleFavoriteLikes(blog, setFavorites);
                              setContentLoader(false);
                            }}
                          />
                          <p>{blog.likes}</p>
                        </>
                      ) : (
                        <>
                          <ThumbUpAltOutlined
                            onClick={async () => {
                              setContentLoader(true);
                              await handleFavoriteLikes(blog, setFavorites);
                              setContentLoader(false);
                            }}
                          />
                          <p>{blog.likes}</p>
                        </>
                      )}
                      {favorites
                        ?.map((i: { _id: any }) => i._id)
                        .includes(blog._id) ? (
                        <Favorite
                          style={{ color: "red" }}
                          onClick={async () => {
                            setContentLoader(true);
                            await handleAddFavorite(blog, setFavorites);
                            setContentLoader(false);
                          }}
                        />
                      ) : (
                        <FavoriteBorder
                          onClick={async () => {
                            setContentLoader(true);
                            await handleAddFavorite(blog, setFavorites);
                            setContentLoader(false);
                          }}
                        />
                      )}
                      <Link
                        to={{ pathname: "/view" }}
                        style={{
                          color: mode == "light" ? "blue" : "orange",
                        }}
                        className={"readMore"}
                        state={blog}
                      >
                        Read More
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Grid>
      <Sidebar isFixed={true} />
      <Dialog open={contentLoader}>
        <DialogTitle>
          <CircularProgress />
        </DialogTitle>
      </Dialog>
      <Footer />
    </Box>
  );
}

export default MyFavorites;
