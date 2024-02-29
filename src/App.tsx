import Home from "./component/Home";
import "./index.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./component/Login";
import { ContextProvider } from "./component/context";
import Register from "./component/Register";
import { Box, Button, StyledEngineProvider, TextField } from "@mui/material";
import Blogs from "./component/Blogs";
import { useState } from "react";
import axios from "axios";
import { apiEndPoint } from "./config";

function App() {
  const [file, setFile] = useState<any>();
  const [image, setImage] = useState([]);
  async function handleSubmit() {
    let formData = new FormData();
    console.log(file);
    formData.append("image", file);
    formData.append("title", "JavaScript Basic");
    formData.append(
      "content",
      "Delve into backend development using Node.js. Build scalable and efficient server-side applications with JavaScript."
    );
    formData.append(
      "related_links",
      JSON.stringify([
        "https://reactjs.org/docs/hooks-intro.html",
        "https://www.robinwieruch.de/react-hooks-fetch-data",
      ])
    );

    try {
      let response = await axios.post(
        // `${apiEndPoint}/blogs/gargi_18`,
        "https://blogbreeze-46cn.onrender.com/blogbreeze/blogs/srinath_4",
        // "http://localhost:3000/blogbreeze/blogs/srinath_4",
        formData
      );
      console.log(response);
    } catch (error: any) {
      console.error("Error uploading image:", error.response.data);
    }
  }

  return (
    <StyledEngineProvider injectFirst>
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route index path="/" Component={Home} />
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
            <Route path="/blogs" Component={Blogs} />
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </StyledEngineProvider>
    // <Box>
    //   <TextField
    //     multiline
    //     maxRows={20}
    //     fullWidth
    //     inputProps={{
    //       style: {
    //         minHeight: "300px",
    //         maxHeight: "310px",
    //         overflow: "scroll",
    //       },
    //     }}
    //   />
    //   <TextField
    //     type="file"
    //     onChange={(e) => {
    //       console.log(e.target.files[0]);
    //       setFile(e.target.files[0]);
    //     }}
    //   />
    //   <Button onClick={() => handleSubmit()}>CLick</Button>
    //   <Button
    //     onClick={async () => {
    //       let response = await axios.get(
    //         "https://blogbreeze-backend.onrender.com/blogbreeze/blogs/all"
    //       );
    //       if (response.data) {
    //         console.log(response.data);
    //       }
    //       let result = response.data.map(
    //         (i: { image: any }) =>
    //           `https://blogbreeze-backend.onrender.com/images/${i.image}`
    //       );
    //       console.log(result, typeof result, result[0]);
    //       setImage(Array.from(result));
    //     }}
    //   >
    //     get all
    //   </Button>
    //   {image?.map((i, j) => (
    //     <Box component={"img"} src={i} key={j} height={"500px"} />
    //   ))}
    // </Box>
  );
}

export default App;
