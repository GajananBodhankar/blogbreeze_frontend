import { Box, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./footer";
import "./blogs.css";
import { MainContext } from "./context";
import { useEffect, useState } from "react";

import Sidebar from "../helper/Sidebar";
import { getAllBlogs } from "../api/apicalls";
import { imageEndpoint } from "../config";
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
        <Grid item sm={3} md={2}>
          <Sidebar isFixed={false} />
        </Grid>
        {!media ? (
          <Grid container sm={9} md={10} gap={5} padding={1}>
            {allBlogs?.map((blog: any) => {
              return (
                <Grid
                  item
                  md={3}
                  style={{
                    maxWidth: "30%",
                    flexBasis: "30%",
                  }}
                >
                  <img src={`${imageEndpoint}/${blog.image}`} alt="" />
                  <Typography>{blog.title}</Typography>
                  <Typography>{blog.description}</Typography>

                  laudantium maxime facilis.
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Grid item xs={12} sx={{ backgroundColor: "red" }}>
            {allBlogs?.map((blog: any) => {
              return (
                <Grid item>
                  <img src={blog.image} alt="" />
                  <Typography>{blog.title}</Typography>
                  <Typography>{blog.description}</Typography>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Grid>
      <Sidebar isFixed={true} />

      <Footer />
    </Box>
  );
}

export default Blogs;
