import { Box, Stack, Typography } from "@mui/material";
import { handleSidebarColor } from "./helperOne.ts";
import { MainContext } from "../component/context.tsx";
import { CloseOutlined } from "@mui/icons-material";
import BlogIcon from "../assets/writer_3079998.png";
import Posts from "../assets/social-media_13665988.png";
import Favorites from "../assets/favourite_9489928.png";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
function Sidebar({ isFixed }: any) {
  const { mode } = MainContext();
  const [path, setPath] = useState<String | null>();
  const navigate = useNavigate();
  useEffect(() => {
    setPath(window.location.pathname);
  }, [window.location.pathname]);
  if (!isFixed) {
    return (
      <Stack className={mode == "light" ? "sidebarLight" : "sidebarDark"}>
        <hr />
        <Box
          onClick={() => {
            navigate("/blogs", { replace: true });
          }}
          sx={{
            opacity: path?.includes("blogs") ? "50%" : "100%",
          }}
        >
          <Typography variant="body1">Blogs</Typography>
          <img src={BlogIcon} alt="" width={"20%"} height={"max-content"} />
        </Box>
        <hr />
        <Box
          onClick={() => navigate("/posts", { replace: true })}
          sx={{
            opacity: path?.includes("posts") ? "50%" : "100%",
          }}
        >
          <Typography variant="body1">My Posts</Typography>
          <img src={Posts} alt="" width={"20%"} height={"max-content"} />
        </Box>
        <hr />
        <Box
          onClick={() => navigate("/favorites", { replace: true })}
          sx={{
            opacity: path?.includes("favorites") ? "50%" : "100%",
          }}
        >
          <Typography variant="body1">Favorites</Typography>
          <img src={Favorites} alt="" width={"20%"} height={"max-content"} />
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
        <p>Favorites</p>
        <img src={Favorites} alt="" width={"20%"} height={"max-content"} />
      </Box>
      <hr />
    </Stack>
  );
}

export default Sidebar;
