import "./index.css";
import { RouterProvider } from "react-router-dom";
import { ContextProvider } from "./component/context";
import { StyledEngineProvider } from "@mui/material";
import Router from "./helper/BrowserRouter";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ContextProvider>
        <RouterProvider router={Router} />
      </ContextProvider>
    </StyledEngineProvider>
  );
}

export default App;
