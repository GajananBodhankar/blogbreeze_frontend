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
  if (checkFileImage(e.target.files)) {
    let fs = new FileReader();
    fs.readAsDataURL(e.target.files[0]);
    fs.onload = () => {
      dispatch({ type: "image", payload: fs.result });
      setName(e.target.files[0].name);
    };
  } else {
    setSnack({
      ...snack,
      open: true,
      message: "Invalid Image type, supported types:jpeg,avif,png,jpg",
    });
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
  setVal: (arg0: string) => void,
  dispatch: { (value: { type: any; payload: any }): void; (arg0: any): void }
) {
  if (e.key == "Enter" && val) {
    let temp = data.concat(val);
    setData(temp);
    setVal("");
    dispatch({ type: "related_links", payload: JSON.stringify(temp) });
  }
}
function handleDeleteItem(
  data: any,
  setData: { (value: any): void; (arg0: any[]): void },
  index: number,
  dispatch: {
    (value: { type: any; payload: any }): void;
    (arg0: { type: string; payload: any[] }): void;
  }
) {
  let pop = [...data];
  pop.splice(index, 1);
  setData(pop);
  dispatch({ type: "related_links", payload: JSON.stringify(pop) });
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
    case "reset":
      return { image: "", title: "", content: "", related_links: [] };
    default:
      return state;
  }
};
function checkStringTitle(val: any, setMessage: (arg0: string) => void) {
  if (!val.trim().match(/\s/g)?.length) {
    setMessage("Title too short");
  } else if (val.trim().match(/\s/g)?.length < 6) {
    setMessage("Title too short");
  } else if (val.trim().match(/\s/g)?.length > 10) {
    setMessage("Title too long");
  }
  return (
    val.trim().match(/\s/g)?.length >= 5 &&
    val.trim().match(/\s/g)?.length <= 10
  );
}

function CheckTitle(
  val: string,
  setMessage: { (value: SetStateAction<string>): void; (arg0: string): void }
) {
  let r = /[a-zA-Z~!@#$%^&*():",.?]/i;
  if (r.test(val) && checkStringTitle(val, setMessage)) {
    return true;
  }
  return false;
}

function handleTitle(
  _state: any,
  dispatch: {
    (value: { type: any; payload: any }): void;
    (arg0: { type: string; payload: any }): void;
  },
  value: string,
  setMessage: { (value: SetStateAction<string>): void; (arg0: string): void }
) {
  dispatch({ type: "title", payload: value });
  if (CheckTitle(value, setMessage)) {
    setMessage("");
  }
}

function handleContent(
  _state: any,
  dispatch: {
    (value: { type: any; payload: any }): void;
    (arg0: { type: any; payload: any }): void;
  },
  value: any,
  setMessage: { (value: SetStateAction<string>): void; (arg0: string): void }
) {
  dispatch({ type: "content", payload: value });
  if (value.match(/\s/g)?.length < 100) {
    setMessage("Content too short, it must have minimum 100 words");
  } else {
    setMessage("");
  }
}

function checkBlogPostData(
  state: {
    image: any;
    title: {
      trim: () => {
        (): any;
        new (): any;
        match: {
          (arg0: RegExp): { (): any; new (): any; length: number };
          new (): any;
        };
      };
    };
    content: {
      match: (arg0: RegExp) => { (): any; new (): any; length: number };
    };
    related_links: string;
  },
  snack: { open: boolean; message: string; color: string },
  setSnack: {
    (
      value: SetStateAction<{ open: boolean; message: string; color: string }>
    ): void;
    (arg0: any): void;
    (arg0: any): void;
  }
) {
  const urlPattern =
    /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  if (
    !state.image &&
    !state.title &&
    !state.content &&
    state.related_links.length == 0
  ) {
    setSnack({
      ...snack,
      open: true,
      message: "Please fill all the fields",
    });
    return false;
  }
  if (!state.image) {
    setSnack({
      ...snack,
      open: true,
      message: "Please select an image",
    });
    return false;
  }
  if (
    !(
      state.title.trim().match(/\s/g)?.length >= 5 &&
      state.title.trim().match(/\s/g)?.length <= 10
    )
  ) {
    setSnack({
      ...snack,
      open: true,
      message: "Please enter title between 5 and 10 characters",
    });
    return false;
  }
  if (state.content.match(/\s/g)?.length < 100 || !state.content) {
    setSnack({
      ...snack,
      open: true,
      message: "Please enter content more than 100 words",
    });
    return false;
  }
  if (typeof state.related_links === "string") {
    if (JSON.parse(state.related_links).length < 2) {
      setSnack({
        ...snack,
        open: true,
        message: "Please add at least 2 related links",
      });
      return false;
    }
  } else if ([...state.related_links].length < 2) {
    setSnack({
      ...snack,
      open: true,
      message: "Please add at least 2 related links",
    });
    return false;
  }
  if (
    !JSON.parse(state.related_links).every((i: string) => urlPattern.test(i))
  ) {
    console.log("hi");
    setSnack({
      ...snack,
      open: true,
      message: "Please add links only",
    });
    return false;
  }

  return true;
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
  handleContent,
  checkBlogPostData,
};
