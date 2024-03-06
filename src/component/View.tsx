import {
  useMediaQuery,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Dialog,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Sidebar from "../helper/Sidebar";
import Navbar from "./Navbar";
import { Link, useLocation } from "react-router-dom";
import {
  Favorite,
  FavoriteBorder,
  ThumbUp,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import { MainContext } from "./context";
import {
  getUserFavorites,
  handleAddFavorite,
  handleViewLikes,
} from "../api/apicalls";

function View() {
  const media = useMediaQuery("(max-width:768px)");
  const { state } = useLocation();
  const [contentLoader, setContentLoader] = useState<boolean>(false);
  const { mode } = MainContext();
  const [data, setData] = useState<Object | any>();
  const [favorites, setFavorites] = useState<Array<Object> | any>();
  useEffect(() => {
    async function handler() {
      setContentLoader(true);
      await getUserFavorites(setFavorites);
      setData(state);
      setContentLoader(false);
    }
    handler();
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
        <Grid item md={9} sx={{ flexBasis: !media ? "70%" : "" }}>
          {Object.keys(state).length && (
            <Card
              style={{
                backgroundColor: mode == "dark" ? "black" : "",
                color: mode == "dark" ? "white" : "",
              }}
            >
              <CardMedia
                sx={{
                  maxHeight: `${window.innerHeight / 1.5}px`,
                  objectFit: "contain",
                }}
                component="img"
                image={data?.image}
                alt="Image not found"
              />
              <CardContent>
                <Typography style={{ fontSize: "x-large" }}>
                  {data?.title?.length > 40
                    ? data?.title.slice(0, 40) + "..."
                    : data?.title}
                </Typography>
                {data?._id}
                <p>
                  {data?.content}
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Cupiditate distinctio eum voluptatum corrupti nesciunt
                  voluptate autem eaque, eius odio officia? Suscipit nulla optio
                  molestias quasi velit quis fugit illo, ut temporibus ipsam
                  dolores error repellat, accusamus ullam, voluptates deleniti
                  iusto culpa eum. Modi velit illum aliquam eveniet dolor magni
                  tempore saepe perspiciatis, explicabo ipsam cupiditate fugit!
                  Perferendis voluptas iusto nemo amet inventore soluta eius
                  voluptatem et nulla ad incidunt enim, harum numquam. Commodi
                  fugit vel rerum doloribus repudiandae distinctio cumque maxime
                  voluptate, aperiam, sunt mollitia nesciunt itaque aut corporis
                  dolores, nemo doloremque perferendis alias soluta iusto
                  deleniti ad expedita culpa.
                </p>
              </CardContent>
              <CardActions>
                {data?.likedUsers.includes(localStorage.getItem("user")) ? (
                  <>
                    <ThumbUp
                      style={{ color: "#007fff" }}
                      onClick={async () => {
                        setContentLoader(true);
                        await handleViewLikes(data, setData);
                        setContentLoader(false);
                      }}
                    />
                    <p>{data?.likes}</p>
                  </>
                ) : (
                  <>
                    <ThumbUpAltOutlined
                      onClick={async () => {
                        setContentLoader(true);
                        await handleViewLikes(data, setData);
                        setContentLoader(false);
                      }}
                    />
                    <p>{data?.likes}</p>
                  </>
                )}
                {favorites
                  ?.map((i: { _id: any }) => i._id)
                  .includes(data._id) ? (
                  <Favorite
                    style={{ color: "red" }}
                    onClick={async () => {
                      setContentLoader(true);
                      await handleAddFavorite(data, setFavorites);
                      setContentLoader(false);
                    }}
                  />
                ) : (
                  <FavoriteBorder
                    onClick={async () => {
                      setContentLoader(true);
                      await handleAddFavorite(data, setFavorites);
                      setContentLoader(false);
                    }}
                  />
                )}
                <Dialog open={contentLoader}>
                  <DialogTitle>
                    <CircularProgress />
                  </DialogTitle>
                </Dialog>
              </CardActions>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default View;
