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
function Upload() {
  const [data, setData] = useState<any>([]);
  const [val, setVal] = useState("");
  const [name, setName] = useState("");
  const media = useMediaQuery("(max-width:768px)");
  const { mode } = MainContext();
  const [titleMessage, setTitleMessage] = useState("");
  const [state, dispatch] = useReducer(reducerFunction, initialState);
  const [snack, setSnack] = useState({ open: false, message: "", color: "" });
  return (
    <Box className="mainContainer">
      <Navbar />
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
          <TextareaAutosize
            style={{ color: mode == "dark" ? "white" : "black" }}
            id="textArea"
            className="textAreaLight"
            maxRows={20}
            minRows={20}
            placeholder="Content goes here..."
          />
          <Box className={"parentBoxList"}>
            <label htmlFor="val">Enter links and press enter</label>
            <TextField
              name="val"
              type="text"
              style={{ width: "70%" }}
              placeholder="Related Links goes here..."
              id={mode == "light" ? "relatedLinksLight" : "relatedLinksDark"}
              value={val}
              onChange={(e) => setVal(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, data, val, setData, setVal)}
            />
            {data?.length ? (
              <Box
                className={mode == "light" ? "listStyleLight" : "listStyleDark"}
              >
                {data?.map((item: any, index: number) => (
                  <p>
                    {item}{" "}
                    <Clear
                      fontSize="small"
                      style={{ marginLeft: 10 }}
                      onClick={() => handleDeleteItem(data, setData, index)}
                    />
                  </p>
                ))}
              </Box>
            ) : null}
          </Box>
          <Button
            variant="contained"
            sx={{ width: "max-content", alignSelf: "center" }}
            color={mode == "dark" ? "warning" : "primary"}
            onClick={() => {}}
          >
            Submit
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
