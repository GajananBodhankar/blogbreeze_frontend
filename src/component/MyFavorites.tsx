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
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./footer";
import Sidebar from "../helper/Sidebar";
import {
  getUserFavorites,
  handleAddFavorite,
  handleFavoriteLikes,
  handleLikes,
} from "../api/apicalls";
import { Link, useNavigate } from "react-router-dom";
import {
  Favorite,
  FavoriteBorder,
  ThumbUp,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import Pagination from "../helper/Pagination";

function MyFavorites() {
  const [contentLoader, setContentLoader] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<any>();
  const navigate = useNavigate();
  const [allBlogs, setAllBlogs] = useState<any>();
  const [page, setPage] = useState(1);

  const media = useMediaQuery("(max-width:768px)");
  useEffect(() => {
    async function callGetAllBlogs() {
      setContentLoader(true);
      await getUserFavorites(setFavorites);
      setContentLoader(false);
    }
    callGetAllBlogs();
    if (!localStorage.getItem("user")) {
      navigate("/", { replace: true });
    }
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
            {favorites?.map((blog: any) => {
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
            {allBlogs?.data.map((blog: any, index: number) => {
              return (
                index < 9 && (
                  <Grid item sm={6}>
                    <img
                      src={`${imageEndpoint}/${blog.image}`}
                      width={"100%"}
                      alt=""
                    />
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

export default MyFavorites;
