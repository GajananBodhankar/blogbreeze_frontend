import { useEffect, useState } from "react";
import "./footer.css";
import { Box } from "@mui/material";
import { MainContext } from "./context";
function Footer() {
  const [footercls, setfooterClass] = useState("footer  ");
  const { mode } = MainContext();
  function setClassName() {
    if (mode == "light") {
      setfooterClass("footerRelativeLight footer");
    } else {
      setfooterClass("footerRelativeDark footer");
    }
  }
  function check() {
    setClassName();
    window.addEventListener("resize", () => {
      setClassName();
    });
  }
  useEffect(() => {
    check();
  });
  useEffect(() => {
    setClassName();
  }, [mode]);
  return (
    <Box className={footercls}>
      <p style={{ margin: "auto" }}>
        &copy; 2024 BlogBreeze. All rights reserved. |{" "}
        <a className={mode == "light" ? "linkLightFooter" : "linkDarkFooter"}>
          Privacy Policy
        </a>{" "}
        |{" "}
        <a className={mode == "light" ? "linkLightFooter" : "linkDarkFooter"}>
          Terms of Service
        </a>
      </p>
    </Box>
  );
}

export default Footer;
