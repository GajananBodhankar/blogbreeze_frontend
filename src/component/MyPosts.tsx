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
import Navbar from "./Navbar";
import Footer from "./footer";
import Sidebar from "../helper/Sidebar";
import { useEffect, useState } from "react";
import {
  getAllPostsApiCall,
  getUserFavorites,
  handleAddFavorite,
  handleFavoriteLikes,
  handleMyPostsLikes,
} from "../api/apicalls";
import {
  Favorite,
  FavoriteBorder,
  ThumbUp,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

function MyPosts() {
  const media = useMediaQuery("(max-width:768px)");
  const [myPosts, setMyPosts] = useState<any>();
  const [contentLoader, setContentLoader] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<any>();
  useEffect(() => {
    async function getAllPosts() {
      await getAllPostsApiCall(setMyPosts);
      await getUserFavorites(setFavorites);
    }
    getAllPosts();
  }, []);
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
            sm={9}
            md={10}
            gap={{ md: 4, sm: 5, lg: 4 }}
            padding={1}
            position={"relative"}
            marginBottom={10}
            display={"flex"}
            justifyContent={"center"}
          >
            {myPosts?.map((blog: any) => {
              return (
                <Grid item md={3} sm={5} lg={4} className="blogItems">
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
                      {/* <FavoriteBorderOutlined /> */}
                      <Link to={"#"}>Read More</Link>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}

            <Dialog open={contentLoader}>
              <DialogTitle>
                <CircularProgress />
              </DialogTitle>
            </Dialog>
          </Grid>
        ) : (
          <>
            {myPosts.map((blog: any, index: number) => {
              return (
                index < 9 && (
                  <Grid item sm={6}>
                    <img src={`${blog.image}`} width={"100%"} alt="" />
                    <Typography>{blog.title}</Typography>
                    <Typography>{blog.description}</Typography>
                  </Grid>
                )
              );
            })}
          </>
        )}
      </Grid>
      <Footer />
    </Box>
  );
}

export default MyPosts;
