import { Box, Grid, useMediaQuery } from "@mui/material";
import React from "react";
import Navbar from "./Navbar";
import Footer from "./footer";
import Sidebar from "../helper/Sidebar";

function MyPosts() {
  const media = useMediaQuery("(max-width:768px)");

  return (
    <Box className="mainContainer">
      <Navbar />
      <Grid container>
        {!media && (
          <Grid item sm={3} md={2}>
            <Sidebar isFixed={false} />
          </Grid>
        )}
      </Grid>
      <Footer />
    </Box>
  );
}

export default MyPosts;
