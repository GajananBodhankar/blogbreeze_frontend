import {
  Box,
  Button,
  Grid,
  IconButton,
  LinearProgress,
  Snackbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./footer";
import "./register.css";
import { MainContext } from "./context";
import { HandleRegister, goToLogin, notchedLine } from "./functions";
import { AccountCircle, Visibility } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";
import CustomInputField from "./CustomInputField";
import CloseIcon from "@mui/icons-material/Close";
import { LazyLoadImage } from "react-lazy-load-image-component";
function Register() {
  const { mode } = MainContext();
  const [show, setShow] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: "", color: "" });
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const navigate = useNavigate();
  const [user, setUser] = useState<any>("");
  const [showCnf, setShowCnf] = useState(false);
  const match = useMediaQuery("(max-width:768px)");
  useEffect(() => {
    notchedLine(mode);
  }, []);
  type verticalAlign = "top" | "bottom";
  type horizontalAlign = "left" | "center" | "right";

  const [vertical] = useState<verticalAlign>("bottom");
  const [horizontal] = useState<horizontalAlign>("center");
  const [loading, setLoading] = useState<boolean>(false);
  const handleClose = () => {
    setSnack({ ...snack, open: false });
  };
  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Box className={"mainContainer"} gap={10}>
      <Navbar user={user} setUser={setUser} />

      <Grid container justifyContent={"center"}>
        <Grid
          item
          className={mode == "light" ? "stackLight" : "stackDark"}
          md={5}
          xs={10}
          gap={3}
        >
          <LazyLoadImage
            effect="blur"
            src="Data_security_05.jpg"
            className="registerImage"
            loading="lazy"
          />
          <CustomInputField
            lable={"username"}
            Icon={AccountCircle}
            value={username}
            setValue={setUsername}
            helpertext={"Username minimum length must be five"}
          />
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
          <CustomInputField
            lable="Confirm password"
            value={confirm}
            setValue={setConfirm}
            helpertext={"Password and confirm password must match"}
            Icon={Visibility}
            show={showCnf}
            setShow={setShowCnf}
            password={password}
          />
          <Typography className="account">
            Already have an Account?{" "}
            <a
              className={mode == "light" ? "linkLight" : "linkDark"}
              onClick={() => goToLogin(navigate, true)}
            >
              Login
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
              setLoading(true);
              let result = await HandleRegister(
                username,
                email,
                password,
                confirm,
                snack,
                setSnack
              );
              if (typeof result === "string") {
                setSnack({ ...snack, open: true, message: result });
              } else if (result) {
                setSnack({ ...snack, open: true, message: "Login Success" });
                setTimeout(() => {
                  navigate("/login", { replace: true });
                }, 3000);
              }
              setLoading(false);
            }}
          >
            Register
          </Button>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={snack.open}
            autoHideDuration={3000}
            message={snack.message}
            onClose={handleClose}
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
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
}

export default Register;
