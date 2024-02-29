import { useEffect, useState } from "react";
import "./navbar.css";
import { modeChange } from "./functions";
import { Box, Grid, Tooltip, Typography, useMediaQuery } from "@mui/material";
import { MainContext } from "./context";
import { useNavigate } from "react-router-dom";
import { AccountCircleRounded, Logout, Menu } from "@mui/icons-material";
function Navbar() {
  const { mode, setMode } = MainContext();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();
  const [scrollable] = useState(false);
  const [user, setUser] = useState<any>("");
  const [showMenu, setShowMenu] = useState(false);
  const matches = useMediaQuery("(max-width:768px)");
  function handletooltip() {
    setShowMenu(!showMenu);
  }
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setLoggedIn(true);
      setUser(localStorage.getItem("user"));
    } else {
      setLoggedIn(false);
    }
  }, [localStorage.getItem("user")]);
  return (
    <Grid
      container
      className={mode == "light" ? "navbar navbarLight" : "navbar navbarDark"}
    >
      <Typography style={{ display: "flex", gap: 10 }}>
        {window.location.href.includes("blogs") && matches && (
          <Menu
            sx={{ alignSelf: "center" }}
            onClick={() => {
              let doc = document.querySelector(".sidebar");
              if (mode == "light") {
                if (doc?.classList.contains("sidebarFixedLight")) {
                  doc?.classList.remove("sidebarFixedLight");
                  doc.classList.add("sidebarFixedLightShow");
                } else {
                  doc?.classList.add("sidebarFixedLight");
                  doc?.classList.remove("sidebarFixedLightShow");
                }
              } else {
                if (doc?.classList.contains("sidebarFixedDark")) {
                  doc?.classList.remove("sidebarFixedDark");
                  doc.classList.add("sidebarFixedDarkShow");
                } else {
                  doc?.classList.add("sidebarFixedDark");
                  doc?.classList.remove("sidebarFixedDarkShow");
                }
              }
            }}
          />
        )}
        BlogBreeze
      </Typography>
      <Grid item className="subNavbar">
        <ul className="ul">
          <li
            className="underLine"
            onClick={() => navigate("/", { replace: true })}
          >
            Home
          </li>
          {loggedIn && (
            <>
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handletooltip}
                open={showMenu}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                arrow
                title={
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Typography>{user}</Typography>
                    <hr />
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        ":hover": { cursor: "pointer" },
                      }}
                      onClick={() => {
                        localStorage.removeItem("user");
                        navigate("/", { replace: true });
                        setLoggedIn(false);
                        setShowMenu(false);
                      }}
                    >
                      <Logout />
                      <Typography variant="body1" color="white">
                        Logout
                      </Typography>
                    </Box>
                  </Box>
                }
              >
                <AccountCircleRounded onClick={handletooltip} />
              </Tooltip>
            </>
          )}
        </ul>
        <span
          className="material-symbols-outlined"
          onClick={() => modeChange(mode, setMode, scrollable)}
        >
          {mode == "light" ? `dark_mode` : `light_mode`}
        </span>
      </Grid>
    </Grid>
  );
}

export default Navbar;
// navigate("/", { replace: true });
// setLoggedIn(false);
// setShowMenu(false);

// onClick={() => {
//   localStorage.removeItem("user");
//   navigate("/", { replace: true });
//   setLoggedIn(false);
//   setShowMenu(false);
// }}
