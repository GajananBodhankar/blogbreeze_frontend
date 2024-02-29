import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { handleSidebarColor } from "./helperOne.ts";
import { MainContext } from "../component/context.tsx";
import { CloseOutlined } from "@mui/icons-material";
import BlogIcon from "../assets/writer_3079998.png";
import Posts from "../assets/social-media_13665988.png";
import Favourites from "../assets/favourite_9489928.png";
function Sidebar({ isFixed }: any) {
  const { mode } = MainContext();
  if (!isFixed) {
    return (
      <Stack className={mode == "light" ? "sidebarLight" : "sidebarDark"}>
        <hr />
        <Box>
          <Typography variant="body1">Blogs</Typography>
          <img src={BlogIcon} alt="" width={"20%"} height={"max-content"} />
        </Box>
        <hr />
        <Box>
          <Typography variant="body1">My Posts</Typography>
          <img src={Posts} alt="" width={"20%"} height={"max-content"} />
        </Box>
        <hr />
        <Box>
          <Typography variant="body1">Favourites</Typography>
          <img src={Favourites} alt="" width={"20%"} height={"max-content"} />
        </Box>
        <hr />
      </Stack>
    );
  }
  return (
    <Stack
      className={
        mode == "light"
          ? "sidebarFixedLight sidebar"
          : "sidebarFixedDark sidebar"
      }
    >
      <CloseOutlined
        sx={{ position: "absolute", right: 0, top: 10 }}
        onClick={() => handleSidebarColor(mode)}
      />
      <Box>
        <p>Blogs</p>
        <img src={BlogIcon} alt="" width={"20%"} height={"max-content"} />
      </Box>
      <hr />
      <Box>
        <p>My Posts</p>
        <img src={Posts} alt="" width={"20%"} height={"max-content"} />
      </Box>
      <hr />
      <Box>
        <p>Favourites</p>
        <img src={Favourites} alt="" width={"20%"} height={"max-content"} />
      </Box>
      <hr />
    </Stack>
  );
}

export default Sidebar;
