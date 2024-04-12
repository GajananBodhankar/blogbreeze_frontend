import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  LinearProgress,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Suspense, lazy, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./footer";
import EmailIcon from "@mui/icons-material/Email";
import "./login.css";
import { goToRegister, handleSnackClose, notchedLine } from "./functions";
import { MainContext } from "./context";
import { useNavigate } from "react-router-dom";
import CustomInputField from "./CustomInputField";
import { loginApiCall } from "../api/apicalls";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";
let LazyImage = lazy(() => import("../helper/LazyLoginImage"));
function Login() {
  const [show, setShow] = useState(false);
  const { mode } = MainContext();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const match = useMediaQuery("(max-width:768px)");
  const [snack, setSnack] = useState({ open: false, message: "", color: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<string>("");
  type verticalAlign = "top" | "bottom";
  type horizontalAlign = "left" | "center" | "right";
  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={() => handleSnackClose(snack, setSnack)}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );
  const [vertical] = useState<verticalAlign>("bottom");
  const [horizontal] = useState<horizontalAlign>("center");
  useEffect(() => {
    notchedLine(mode);
  }, []);
  const navigate = useNavigate();
  return (
    <Box className="mainContainer" gap={10}>
      <Navbar user={user} setUser={setUser} />

      <Grid container justifyContent={"center"}>
        <Grid
          item
          className={mode == "light" ? "stackLight" : "stackDark"}
          md={5}
          xs={10}
          gap={3}
        >
          <Suspense
            fallback={<CircularProgress style={{ alignSelf: "center" }} />}
          >
            <LazyImage />
          </Suspense>
          <CustomInputField
            lable="email"
            Icon={EmailIcon}
            value={email}
            setValue={setEmail}
            helpertext={
              "Email must have characters or numbers followed by @gmail.com "
            }
          />
          <CustomInputField
            lable="Enter password"
            show={show}
            setShow={setShow}
            value={password}
            setValue={setPassword}
            helpertext={"Password must have max 10 and min 5 characters "}
          />
          <Typography className="account">
            Don't have an Account?{" "}
            <a
              className={mode == "light" ? "linkLight" : "linkDark"}
              onClick={() => goToRegister(navigate, true)}
            >
              Register
            </a>{" "}
          </Typography>
          {loading && (
            <Box sx={{ width: "70%", alignSelf: "center" }}>
              <LinearProgress color="warning" />
            </Box>
          )}
          <Button
            variant="contained"
            className={mode == "light" ? "submitLight" : "submitDark"}
            size={match ? "small" : "medium"}
            onClick={async () => {
              if (email && password) {
                setLoading(true);
                let result = await loginApiCall(
                  email,
                  password,
                  snack,
                  setSnack
                );
                if (result?.success) {
                  navigate("/blogs", { replace: true });
                }
                setLoading(false);
              } else {
                setSnack({
                  open: true,
                  message: "Please fill all the fields",
                  color: "error",
                });
              }
            }}
          >
            Login
          </Button>
        </Grid>
      </Grid>
      <Footer />
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => handleSnackClose(snack, setSnack)}
        message={snack.message}
        ContentProps={{
          classes: {
            root: snack.message.includes("Success")
              ? "snackSuccess"
              : "snackError",
          },
        }}
        key={vertical + horizontal}
        action={action}
      />
    </Box>
  );
}

export default Login;
