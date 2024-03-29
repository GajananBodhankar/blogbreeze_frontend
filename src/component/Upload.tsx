import {
  Box,
  Button,
  Grid,
  TextField,
  TextareaAutosize,
  useMediaQuery,
  Typography,
} from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "../helper/Sidebar";
import Footer from "./footer";
import "./upload.css";
import {
  handleContent,
  handleDeleteItem,
  handleFileChange,
  handleKeyDown,
  handleTitle,
  initialState,
  reducerFunction,
} from "../helper/helperOne";
import { useReducer, useState } from "react";
import { Clear } from "@mui/icons-material";
import { MainContext } from "./context";
import CustomSnackBar from "../helper/CustomSnackBar";
import { PostBlog } from "../api/apicalls";
function Upload() {
  const [data, setData] = useState<any>([]);
  const [val, setVal] = useState("");
  const [name, setName] = useState("");
  const media = useMediaQuery("(max-width:768px)");
  const { mode } = MainContext();
  const [user, setUser] = useState<string>("");
  const [linkFocus, setLinkFocus] = useState<boolean>(false);
  const [titleMessage, setTitleMessage] = useState("");
  const [contentMessage, setContentMessage] = useState("");
  const [state, dispatch] = useReducer(reducerFunction, initialState);
  const [snack, setSnack] = useState({ open: false, message: "", color: "" });
  return (
    <Box className="mainContainer">
      <Navbar user={user} setUser={setUser} />

      <Grid container>
        {!media && (
          <Grid item sm={3} md={2}>
            <Sidebar isFixed={false} />
          </Grid>
        )}

        <Grid
          sm={9}
          md={10}
          gap={4}
          padding={1}
          position={"relative"}
          margin={"auto"}
          marginY={5}
          display={"flex"}
          justifyContent={"center"}
          item
          xs={12}
          flexDirection={"column"}
        >
          <Box>
            <label
              htmlFor="customFile"
              className="lableImage"
              style={{
                border: mode == "dark" ? "1px solid white" : "1px solid black",
              }}
            >
              Choose Image
            </label>
            <input
              id="customFile"
              accept=".png,.jpg,.avif,jpeg"
              type="file"
              placeholder="Select header image"
              onChange={(e) =>
                handleFileChange(e, dispatch, snack, setSnack, setName)
              }
            />
            <Typography
              variant="body1"
              sx={{
                color: mode == "dark" ? "white" : "black",
              }}
              maxWidth={"250px"}
              style={{ marginTop: 10 }}
            >
              {name}
            </Typography>
          </Box>
          <Box>
            <TextField
              type="text"
              id={mode == "light" ? "blogTitleWhite" : "blogTitleDark"}
              className="blogTitle"
              placeholder="Title goes here.."
              value={state.title}
              onChange={(e) =>
                handleTitle(state, dispatch, e.target.value, setTitleMessage)
              }
              onBlur={() => setTitleMessage("")}
            />
            <Typography
              variant="body1"
              color={mode == "light" ? "black" : "white"}
            >
              {titleMessage}
            </Typography>
          </Box>
          <Box>
            <TextareaAutosize
              style={{ color: mode == "dark" ? "white" : "black" }}
              id="textArea"
              className={mode == "light" ? "textAreaLight" : "textAreaDark"}
              maxRows={20}
              minRows={20}
              value={state.content}
              placeholder="Content goes here..."
              onChange={(e) =>
                handleContent(
                  state,
                  dispatch,
                  e.target.value,
                  setContentMessage
                )
              }
              onBlur={() => setContentMessage("")}
            />{" "}
            <Typography
              variant="body1"
              color={mode == "light" ? "black" : "white"}
            >
              {contentMessage}
            </Typography>
          </Box>
          <Box className={"parentBoxList"}>
            <label htmlFor="val">
              Enter links and press enter :{" "}
              <span style={{ color: "red" }}>
                {data?.length < 2 && linkFocus
                  ? "At least two links required *"
                  : ""}
              </span>
            </label>
            <TextField
              name="val"
              type="text"
              style={{ width: "70%" }}
              placeholder="Related Links goes here..."
              id={mode == "light" ? "relatedLinksLight" : "relatedLinksDark"}
              value={val}
              onFocus={() => setLinkFocus(true)}
              onBlur={() => setLinkFocus(false)}
              onChange={(e) => setVal(e.target.value)}
              onKeyDown={(e) =>
                handleKeyDown(e, data, val, setData, setVal, dispatch)
              }
            />
            {data?.length ? (
              <Box
                className={mode == "light" ? "listStyleLight" : "listStyleDark"}
              >
                {data?.map((item: any, index: number) => (
                  <p key={index}>
                    {item.length < 20
                      ? `${item}`
                      : `${item.substring(0, 20)}...`}
                    <Clear
                      fontSize="small"
                      style={{ marginLeft: 10 }}
                      onClick={() =>
                        handleDeleteItem(data, setData, index, dispatch)
                      }
                    />
                  </p>
                ))}
              </Box>
            ) : null}
          </Box>
          <Button
            variant="contained"
            style={{
              width: "max-content",
              backgroundColor: mode == "dark" ? "orange" : "#1976d2",
              padding: "5px 30px",
            }}
            onClick={() =>
              PostBlog(state, dispatch, snack, setSnack, setData, setName)
            }
          >
            POST
          </Button>
        </Grid>
      </Grid>
      <Sidebar isFixed={true} />
      <CustomSnackBar snack={snack} setSnack={setSnack} />
      <Footer />
    </Box>
  );
}

export default Upload;
