import axios from "axios";
import { ChangeEvent, SetStateAction } from "react";
import { apiEndPoint } from "../config.ts";
function modeChange(
  lightMode: string,
  setMode: (arg0: string) => void,
  isScrollable: boolean
) {
  let navbar = document.querySelector(".navbar");
  let footer = document.querySelector(".footer");
  let textArea = document.querySelector("#textArea");
  let notchedLine = document.getElementsByClassName(
    "MuiOutlinedInput-notchedOutline"
  );
  if (lightMode === "light") {
    navbar?.classList.remove("navbarLight");
    navbar?.classList.add("navbarDark");
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
    textArea?.classList.remove("textAreaLight");
    textArea?.classList.add("textAreaDark");
    if (isScrollable) {
      footer?.classList.remove("footerRelativeLight");
      footer?.classList.add("footerRelativeDark");
    } else {
      footer?.classList.remove("footerLight");
      footer?.classList.add("footerDark");
    }
    Array.from(notchedLine)?.forEach((i) => {
      i?.classList.add("darkInput");
    });
    setMode("dark");
  } else {
    navbar?.classList.remove("navbarDark");
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
    navbar?.classList.add("navbarLight");
    textArea?.classList.add("textAreaLight");
    textArea?.classList.remove("textAreaDark");
    if (isScrollable) {
      footer?.classList.add("footerRelativeLight");
      footer?.classList.remove("footerRelativeDark");
    } else {
      footer?.classList.add("footerLight");
      footer?.classList.remove("footerDark");
    }
    Array.from(notchedLine)?.forEach((i) => {
      i?.classList.remove("darkInput");
    });
    setMode("light");
  }
}

function goToLogin(
  navigate: (arg0: string, arg1?: object) => void,
  replace: boolean
) {
  if (replace) {
    navigate("/login", { replace: true });
  } else {
    navigate("/login");
  }
}

function goToRegister(
  navigate: (arg0: string, arg1?: object) => void,
  replace: boolean
) {
  if (replace) {
    navigate("/register", { replace: true });
  } else {
    navigate("/register");
  }
}

function handleVisibility(show: boolean, setShow: (arg0: boolean) => void) {
  setShow(!show);
}

function notchedLine(mode: string) {
  let notchedLine = document.getElementsByClassName(
    "MuiOutlinedInput-notchedOutline"
  );
  if (mode !== "light") {
    Array.from(notchedLine)?.forEach((i) => {
      i?.classList.add("darkInput");
    });
  } else {
    Array.from(notchedLine)?.forEach((i) => {
      i?.classList.remove("darkInput");
    });
  }
}

function checkScroll() {}

function checkMode() {
  return document.body.style.color == "black" ? "dark" : "light";
}

function checkEmail(email: string) {
  let val = /[a-zA-Z0-9]+@gmail.com+/;
  return val.test(email) ? true : false;
}

function checkUsername(name: string) {
  let val = /[a-zA-Z0-9~`!@#$%^&*(),._]{5}/;
  return val.test(name) ? true : false;
}

function checkPassword(password: string) {
  let val = /[a-zA-Z0-9~`!@#$%^&*(),.]{5}/;
  return val.test(password) ? true : false;
}
function checkConfirmPassword(
  value: string,
  password: any,
  setFocused: (arg0: boolean) => void,
  _setValue: (arg0: string) => void
) {
  if (value == password) {
    setFocused(false);
    return true;
  } else {
    setFocused(true);
    return false;
  }
}

// CustomInputfield valueChange
function handleValueChange(
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  _value: any,
  setValue: (arg0: any) => void,
  check: { (password: string): boolean; (arg0: any): any },
  setFocused: { (value: SetStateAction<boolean>): void; (arg0: boolean): void }
) {
  setValue(e.target.value);
  if (check(e.target.value)) {
    setFocused(false);
  } else {
    setFocused(true);
  }
}

async function HandleRegister(
  username: string,
  email: string,
  password: string,
  confirm: string,
  snack: { open: any; message?: string },
  setSnack: {
    (
      value: SetStateAction<{ open: boolean; message: string; color: string }>
    ): void;
    (arg0: any): void;
  }
) {
  if (checkUsername(username) && checkEmail(email) && password === confirm) {
    try {
      let response = await axios.post(`${apiEndPoint}/auth`, {
        username: username,
        email: email,
        password: password,
      });
      if (response.status == 200) {
        setSnack({ ...snack, open: true, message: "Register Success" });

        return response.data;
      }
    } catch (error: any) {
      setSnack({ ...snack, open: true, message: error.response.data.message });
      return error.response.data.message;
    }
  } else {
    setSnack({
      ...snack,
      open: true,
      message: "Invalid Input,Please fill all details",
    });
  }
  return false;
}

function handleSnackClose(
  snack: { open: any; message?: string },
  setSnack: {
    (
      value: SetStateAction<{ open: boolean; message: string; color: string }>
    ): void;
    (arg0: any): void;
  }
) {
  setSnack({ ...snack, open: !snack.open });
}

export {
  HandleRegister,
  checkConfirmPassword,
  modeChange,
  goToLogin,
  checkUsername,
  handleVisibility,
  checkScroll,
  checkMode,
  notchedLine,
  goToRegister,
  checkEmail,
  checkPassword,
  handleValueChange,
  handleSnackClose,
};
