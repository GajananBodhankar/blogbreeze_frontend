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
  setData: (arg0: Array<Object>) => void
) {
  try {
    let response: AxiosResponse = await axios.get(`${apiEndPoint}/blogs/all`);
    if (response.status == 200) {
      setData(response.data);
    }
  } catch (error) {
    alert(error);
  }
}

async function handleLikes(
  blog: { id: any },
  allBlogs: Object[] | undefined,
  setAllBlogs: {
    (value: SetStateAction<Object[] | undefined>): void;
    (value: SetStateAction<Object[] | undefined>): void;
    (arg0: Object[]): void;
  }
) {
  let result = await axios.put(
    `${apiEndPoint}/blogs/likes/${localStorage.getItem("user")}/${blog.id}`,
    blog
  );
  if (result.data.success) {
    getAllBlogs(allBlogs, setAllBlogs);
  }
}

export { loginApiCall, getAllBlogs, handleLikes };
