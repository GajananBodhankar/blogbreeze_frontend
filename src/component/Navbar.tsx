import { useEffect, useState } from "react";
import "./navbar.css";
import { modeChange } from "./functions";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { MainContext } from "./context";
import { useNavigate } from "react-router-dom";
import { AccountCircleRounded, Logout, Menu } from "@mui/icons-material";
import { handleConfirmClose } from "../helper/helperOne";
function Navbar({ user, setUser }: any) {
  const { mode, setMode } = MainContext();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();
  const [scrollable] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const matches = useMediaQuery("(max-width:768px)");
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  function handletooltip() {
    setShowMenu(!showMenu);
  }
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setLoggedIn(true);
      setUser(localStorage.getItem("user"));
    } else {
      setLoggedIn(false);
      setUser("");
    }
  }, [localStorage.getItem("user")]);
  return (
    <Grid
      container
      className={mode == "light" ? "navbar navbarLight" : "navbar navbarDark"}
    >
      <Typography style={{ display: "flex", gap: 10 }}>
        {localStorage.getItem("user") && matches && (
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
                        setConfirmOpen(true);
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
      <Dialog open={confirmOpen}>
        <DialogTitle>Are you Sure?</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/", { replace: true });
              setLoggedIn(false);
              setShowMenu(false);
              handleConfirmClose(confirmOpen, setConfirmOpen);
            }}
          >
            Logout
          </Button>
          <Button
            onClick={() => handleConfirmClose(confirmOpen, setConfirmOpen)}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default Navbar;
