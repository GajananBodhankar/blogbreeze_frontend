import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./footer";
import "./blogs.css";
import { MainContext } from "./context";
import { useEffect, useState } from "react";

import Sidebar from "../helper/Sidebar";
import { getAllBlogs, handleLikes } from "../api/apicalls";
import { apiEndPoint, imageEndpoint } from "../config";
import { Favorite, ThumbUp, ThumbUpAltOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";
function Blogs() {
  const { mode } = MainContext();
  const [allBlogs, setAllBlogs] = useState<Array<Object>>();
  const media = useMediaQuery("(max-width:768px)");
  useEffect(() => {
    console.log("hi");
  }, [mode]);
  useEffect(() => {
    getAllBlogs(allBlogs, setAllBlogs);
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
          >
            {allBlogs?.map((blog: any, index: number) => {
              return (
                index < 9 && (
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
                            onClick={async () =>
                              await handleLikes(blog, allBlogs, setAllBlogs)
                            }
                          />
                        ) : (
                          <ThumbUpAltOutlined
                            onClick={async () =>
                              await handleLikes(blog, allBlogs, setAllBlogs)
                            }
                          />
                        )}
                        <Favorite style={{ color: "red" }} />
                        {/* <FavoriteBorderOutlined /> */}
                        <Link to={"#"} onClick={async () => {}}>
                          Read More
                        </Link>
                      </CardActions>
                    </Card>
                  </Grid>
                )
              );
            })}
          </Grid>
        ) : (
          <>
            {allBlogs?.map((blog: any, index: number) => {
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
