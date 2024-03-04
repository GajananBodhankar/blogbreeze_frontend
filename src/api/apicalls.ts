import axios, { AxiosResponse } from "axios";
import { SetStateAction } from "react";
import { apiEndPoint } from "../config.ts";

async function loginApiCall(
  email: string,
  password: string,
  _snack: { open: boolean; message: string; color: string },
  setSnack: {
    (
      value: SetStateAction<{ open: boolean; message: string; color: string }>
    ): void;
    (arg0: { open: boolean; message: any; color: string }): void;
  }
) {
  try {
    let response: AxiosResponse = await axios.post(
      `${apiEndPoint}/auth/login`,
      {
        email: email,
        password: password,
      }
    );
    if (response.status === 200) {
      localStorage.setItem("user", response.data.username);
      setSnack({
        open: true,
        message: response.data.message,
        color: "success",
      });
      return response.data;
    }
  } catch (error: any) {
    setSnack({
      open: true,
      message: error.response.data.message,
      color: "danger",
    });
  }
}

async function getAllBlogs(
  _data: Array<Object> | undefined,
  setData: (arg0: Array<Object>) => void,
  page: number
) {
  try {
    let response: AxiosResponse = await axios.get(
      `${apiEndPoint}/blogs/all?page=${page}`
    );
    if (response.status == 200) {
      setData(response.data);
    }
    console.log("allblogs");
  } catch (error) {
    alert(error);
  }
}

async function getUserFavorites(setFavorites: {
  (value: any): void;
  (arg0: any): void;
}) {
  try {
    let response = await axios.get(
      `${apiEndPoint}/blogs/user/${localStorage.getItem("user")}`
    );
    if (response.status == 200) {
      setFavorites(response.data[0].blogs);
    }
    console.log(response.data[0].blogs);
  } catch (e: any) {
    alert(e.response.data.message);
  }
}

async function handleAddFavorite(
  blog: any,
  setFavorites: {
    (value: any): void;
    (value: any): void;
    (value: any): void;
    (arg0: any): void;
  }
) {
  try {
    let res = await axios.put(
      `http://localhost:3000/blogbreeze/blogs/favorite/${localStorage.getItem(
        "user"
      )}`,
      blog
    );
    if (res.data.success) {
      await getUserFavorites(setFavorites);
      return true;
    } else {
      return false;
    }
  } catch (e) {
    alert(e);
  }
}

async function handleLikes(
  blog: { _id: any },
  allBlogs: Object[] | undefined,
  setAllBlogs: {
    (value: SetStateAction<Object[] | undefined>): void;
    (value: SetStateAction<Object[] | undefined>): void;
    (arg0: Object[]): void;
  },
  page: number
) {
  let result = await axios.put(
    `http://localhost:3000/blogbreeze/blogs/likes/${localStorage.getItem(
      "user"
    )}/${blog._id}`,
    blog
  );
  if (result.data.success) {
    getAllBlogs(allBlogs, setAllBlogs, page);
  }
}

export {
  loginApiCall,
  getAllBlogs,
  handleLikes,
  getUserFavorites,
  handleAddFavorite,
};
