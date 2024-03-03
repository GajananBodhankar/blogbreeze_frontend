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
import "./blogs.css";
import { useEffect, useState } from "react";

import Sidebar from "../helper/Sidebar";
import { getAllBlogs, handleLikes } from "../api/apicalls";
import { imageEndpoint } from "../config";
import { Favorite, ThumbUp, ThumbUpAltOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Pagination from "../helper/Pagination";
function Blogs() {
  const [allBlogs, setAllBlogs] = useState<any>();
  const media = useMediaQuery("(max-width:768px)");
  const [likesLoader, setLikesLoader] = useState<boolean>(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getAllBlogs(allBlogs, setAllBlogs, page);
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
          >
            {allBlogs?.data.map((blog: any) => {
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
                      {blog.id}
                    </CardContent>
                    <CardActions>
                      {blog.likedUsers.includes(
                        localStorage.getItem("user")
                      ) ? (
                        <ThumbUp
                          style={{ color: "#007fff" }}
                          onClick={async () => {
                            setLikesLoader(true);
                            await handleLikes(
                              blog,
                              allBlogs,
                              setAllBlogs,
                              page
                            );
                            setLikesLoader(false);
                          }}
                        />
                      ) : (
                        <ThumbUpAltOutlined
                          onClick={async () => {
                            setLikesLoader(true);
                            await handleLikes(
                              blog,
                              allBlogs,
                              setAllBlogs,
                              page
                            );
                            setLikesLoader(false);
                          }}
                        />
                      )}
                      <Favorite style={{ color: "red" }} />
                      {/* <FavoriteBorderOutlined /> */}
                      <Link to={"#"}>Read More</Link>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
            <Pagination
              allBlogs={allBlogs}
              page={page}
              setAllBlogs={setAllBlogs}
              setPage={setPage}
            />
            <Dialog open={likesLoader}>
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
      <Sidebar isFixed={true} />

      <Footer />
    </Box>
  );
}

export default Blogs;
