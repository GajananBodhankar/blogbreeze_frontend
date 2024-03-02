import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./home.css";
import Footer from "./footer";
import { Box, Grid } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { goToLogin, goToRegister } from "./functions";
import { MainContext } from "./context";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Home() {
  let navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { mode } = MainContext();
  useEffect(() => {
    // console.log(mode);
    // checkScroll();
  }, [mode]);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });
  return (
    <Box className="mainContainer">
      <Navbar />

      <Grid container className="mainContent" spacing={5}>
        <Grid item md={6} xs={12}>
          <h1>Welcome to Your Blog App BlogBreeze</h1>
          <p>
            Explore a world of captivating stories, insightful articles, and
            engaging content. Whether you're a reader or a writer, our platform
            is here to inspire and connect you with a community of like-minded
            individuals.
          </p>
          {!isLoggedIn ? (
            <p>
              Ready to dive in?{" "}
              <a
                className={mode == "light" ? "linkLight" : "linkDark"}
                onClick={() => goToLogin(navigate, false)}
              >
                Login
              </a>{" "}
              or{" "}
              <a
                className={mode == "light" ? "linkLight" : "linkDark"}
                onClick={() => goToRegister(navigate, false)}
              >
                Create an Account
              </a>{" "}
              to share your own story.
            </p>
          ) : (
            <>
              <p>
                Checkout{" "}
                <a
                  className={mode == "light" ? "linkLight" : "linkDark"}
                  onClick={() => navigate("/blogs")}
                >
                  Blogs
                </a>
              </p>
            </>
          )}
        </Grid>
        <Grid item className="imgDiv" md={5} xs={12}>
          <LazyLoadImage
            effect="blur"
            src="5174551.jpg"
            alt="Image not found"
            loading="lazy"
            className="homeImage"
          />
        </Grid>
      </Grid>

      <Footer />
    </Box>
  );
}

export default Home;
