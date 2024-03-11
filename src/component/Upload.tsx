import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Box,
  Button,
  Grid,
  Select,
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
  checkFileImage,
  handleDeleteItem,
  handleFileChange,
  handleKeyDown,
  initialState,
  reducerFunction,
} from "../helper/helperOne";
import { ReactNode, useReducer, useState } from "react";
import { Clear, RemoveCircle } from "@mui/icons-material";
import { MainContext } from "./context";
import CustomSnackBar from "../helper/CustomSnackBar";
function Upload() {
  const [data, setData] = useState<any>([]);
  const [val, setVal] = useState("");
  const [name, setName] = useState("");
  const media = useMediaQuery("(max-width:768px)");
  const { mode } = MainContext();
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
          container
          sm={9}
          md={10}
          gap={{ md: 4, sm: 5, lg: 4 }}
          padding={1}
          position={"relative"}
          margin={"auto"}
          marginY={5}
          display={"flex"}
          justifyContent={"center"}
        >
          <Grid
            item
            xs={12}
            gap={5}
            display={"flex"}
            position={"relative"}
            flexDirection={"column"}
          >
            <Box>
              <label htmlFor="customFile" className="lableImage" style={{
                border: 
              }}>
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
                color="initial"
                maxWidth={"250px"}
                style={{ marginTop: 10 }}
              >
                {name}
              </Typography>
            </Box>
            <TextField
              type="text"
              placeholder="Title goes here.."
              sx={{ width: "70%" }}
            />
            <TextareaAutosize
              maxRows={20}
              minRows={20}
              placeholder="Content goes here..."
            />
            <Box className={"parentBoxList"}>
              <label htmlFor="val">Enter links and press enter</label>
              <TextField
                name="val"
                type="text"
                placeholder="Related Links goes here..."
                sx={{ width: "70%" }}
                value={val}
                onChange={(e) => setVal(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, data, val, setData, setVal)}
              />
              {data?.length ? (
                <Box className="listStyle">
                  {data?.map((item: any, index: number) => (
                    <p>
                      {item}{" "}
                      <Clear
                        fontSize="small"
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
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Sidebar isFixed={true} />
      <CustomSnackBar snack={snack} setSnack={setSnack} />
      <Footer />
    </Box>
  );
}

export default Upload;
