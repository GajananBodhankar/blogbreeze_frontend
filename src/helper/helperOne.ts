import { SetStateAction } from "react";

function handleSidebarColor(mode: string) {
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
      doc.classList.remove("sidebarFixedDark");
      doc.classList.add("sidebarFixedDarkShow");
    } else {
      doc?.classList.add("sidebarFixedDark");
      doc?.classList.remove("sidebarFixedDarkShow");
    }
  }
}

function handleConfirmClose(
  confirm: boolean,
  setConfirm: (arg0: boolean) => void
) {
  setConfirm(!confirm);
}

function handleFileChange(
  e: { target: { files: any } },
  dispatch: {
    (value: { type: any; payload: any }): void;
    (arg0: { type: string; payload: string | ArrayBuffer | null }): void;
  },
  snack: { open: boolean; message: string; color: string },
  setSnack: {
    (
      value: SetStateAction<{ open: boolean; message: string; color: string }>
    ): void;
    (arg0: any): void;
  },
  setName: { (value: SetStateAction<string>): void; (arg0: any): void }
) {
  console.log(e.target);
  if (checkFileImage(e.target.files)) {
    let fs = new FileReader();
    fs.readAsDataURL(e.target.files[0]);
    fs.onload = () => {
      dispatch({ type: "image", payload: fs.result });
      setName(e.target.files[0].name);
    };
  } else {
    setSnack({ ...snack, open: true, message: "Invalid Image type" });
  }
}

function checkFileImage(name: any) {
  let temp = name[0].name.split(".");
  let ext = temp[temp.length - 1];
  if (
    ext.includes("jpg") ||
    ext.includes("png") ||
    ext.includes("avif") ||
    ext.includes("jpeg")
  ) {
    return true;
  }
  return false;
}

function handleKeyDown(
  e: { key: string },
  data: string | any[],
  val: any,
  setData: (arg0: any) => void,
  setVal: (arg0: string) => void
) {
  if (e.key == "Enter" && val) {
    let temp = data.concat(val);
    setData(temp);
    setVal("");
  }
}
function handleDeleteItem(
  data: any,
  setData: { (value: any): void; (arg0: any[]): void },
  index: number
) {
  let pop = [...data];
  pop.splice(index, 1);
  setData(pop);
}

interface Idata {
  image: string;
  title: string;
  content: string;
  related_links: Array<String>;
}

const initialState: Idata = {
  image: "",
  title: "",
  content: "",
  related_links: [],
};

const reducerFunction = (state: any, action: { type: any; payload: any }) => {
  switch (action.type) {
    case "image":
      return { ...state, image: action.payload };
    case "title":
      return { ...state, title: action.payload };
    case "content":
      return { ...state, content: action.payload };
    case "related_links":
      return { ...state, related_links: action.payload };
    default:
      return state;
  }
};

function CheckTitle(val: string) {
  let r = /[a-zA-Z~!@#$%^&*():",.?]{5}/i;
  if (r.test(val)) {
    return true;
  }
  return false;
}

function handleTitle(
  state: any,
  dispatch: {
    (value: { type: any; payload: any }): void;
    (arg0: { type: string; payload: any }): void;
  },
  value: string
) {
  if (CheckTitle(value)) {
    dispatch({ type: "title", payload: value });
  } else {
    
  }
}

export {
  reducerFunction,
  initialState,
  handleSidebarColor,
  handleConfirmClose,
  checkFileImage,
  handleKeyDown,
  handleFileChange,
  handleDeleteItem,
  handleTitle,
};
