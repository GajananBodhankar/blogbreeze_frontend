import {
  Box,
  Button,
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
import Navbar from "./Navbar";
import Footer from "./footer";
import Sidebar from "../helper/Sidebar";
import { useEffect, useState } from "react";
import {
  getAllPostsApiCall,
  getUserFavorites,
  handleAddFavorite,
  handleMyPostsLikes,
} from "../api/apicalls";
import {
  Favorite,
  FavoriteBorder,
  ThumbUp,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { MainContext } from "./context";
function MyPosts() {
  const media = useMediaQuery("(max-width:768px)");
  const [myPosts, setMyPosts] = useState<any>();
  const [contentLoader, setContentLoader] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<any>();
  const { mode } = MainContext();
  useEffect(() => {
    async function getAllPosts() {
      setContentLoader(true);
      await getAllPostsApiCall(setMyPosts);
      await getUserFavorites(setFavorites);
      setContentLoader(false);
    }
    getAllPosts();
  }, []);
  const navigate = useNavigate();
  return (
    <Box className="mainContainer">
      <Navbar />
      <Grid container>
        {!media && (
          <Grid item sm={3} md={2}>
            <Sidebar isFixed={false} />
          </Grid>
        )}
        {!media ? (
          <Grid
            container
            className="gridContainer"
            gap={{ md: 4, sm: 5, lg: 4 }}
            padding={1}
            position={"relative"}
            marginBottom={10}
            display={"flex"}
            justifyContent={"center"}
          >
            {myPosts?.map((blog: any) => {
              return (
                <Grid
                  item
                  md={3}
                  sm={5}
                  lg={4}
                  className="blogItems"
                  key={blog._id}
                >
                  <Card className="card">
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
                              await handleMyPostsLikes(blog, setMyPosts);
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
                              await handleMyPostsLikes(blog, setMyPosts);
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
                      <Link to={"/View"} state={blog}>
                        Read More
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}

            <Button
              style={{
                position: "fixed",
                display: "flex",
                alignContent: "center",
                right: 30,
                bottom: 30,
                zIndex: 1,
                backgroundColor: mode == "light" ? "" : "orange",
              }}
              variant="contained"
              onClick={() => navigate("/upload")}
            >
              <CloudUploadIcon />
              <Typography variant="body1" style={{ marginLeft: 10 }}>
                Upload
              </Typography>
            </Button>
          </Grid>
        ) : (
          <Grid
            container
            gap={4}
            display={"flex"}
            justifyContent={"center"}
            marginY={5}
          >
            {myPosts?.map((blog: any) => {
              return (
                <Grid item sm={5} xs={10} key={blog._id}>
                  <Card className="card">
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
                              await handleMyPostsLikes(blog, setMyPosts);
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
                              await handleMyPostsLikes(blog, setMyPosts);
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
                      <Link to={"/View"} state={blog}>
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

export default MyPosts;
