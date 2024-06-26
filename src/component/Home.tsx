import { Suspense, lazy, useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./home.css";
import Footer from "./footer";
import { Box, CircularProgress, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { MainContext } from "./context";
let LazyImage = lazy(() => import("../helper/LazyHomeImage"));
function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<any>("");
  const { mode } = MainContext();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [localStorage.getItem("user")]);
  return (
    <Box className="mainContainer">
      <Navbar user={user} setUser={setUser} />

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
              <Link
                to={{ pathname: "/login" }}
                className={mode == "light" ? "linkLight" : "linkDark"}
              >
                Login
              </Link>{" "}
              or{" "}
              <Link
                to={{ pathname: "/register" }}
                className={mode == "light" ? "linkLight" : "linkDark"}
              >
                Register
              </Link>{" "}
              to share your own story.
            </p>
          ) : (
            <>
              <p>
                Checkout{" "}
                <Link
                  to={{ pathname: "/blogs" }}
                  className={mode == "light" ? "linkLight" : "linkDark"}
                >
                  Blogs
                </Link>
              </p>
            </>
          )}
        </Grid>
        <Grid item className="imgDiv" md={5} xs={12}>
          <Suspense
            fallback={<CircularProgress style={{ alignSelf: "center" }} />}
          >
            <LazyImage />
          </Suspense>
        </Grid>
      </Grid>

      <Footer />
    </Box>
  );
}

export default Home;
