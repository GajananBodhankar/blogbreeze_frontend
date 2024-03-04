import { Box, Stack, Typography } from "@mui/material";
import { handleSidebarColor } from "./helperOne.ts";
import { MainContext } from "../component/context.tsx";
import { CloseOutlined } from "@mui/icons-material";
import BlogIcon from "../assets/writer_3079998.png";
import Posts from "../assets/social-media_13665988.png";
import Favorites from "../assets/favourite_9489928.png";
import { useNavigate } from "react-router-dom";
function Sidebar({ isFixed }: any) {
  const { mode } = MainContext();
  const navigate = useNavigate();
  if (!isFixed) {
    return (
      <Stack className={mode == "light" ? "sidebarLight" : "sidebarDark"}>
        <hr />
        <Box
          onClick={() => {
            navigate("/blogs", { replace: true });
          }}
        >
          <Typography variant="body1">Blogs</Typography>
          <img src={BlogIcon} alt="" width={"20%"} height={"max-content"} />
        </Box>
        <hr />
        <Box onClick={() => navigate("/posts", { replace: true })}>
          <Typography variant="body1">My Posts</Typography>
          <img src={Posts} alt="" width={"20%"} height={"max-content"} />
        </Box>
        <hr />
        <Box onClick={() => navigate("/favorites", { replace: true })}>
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
