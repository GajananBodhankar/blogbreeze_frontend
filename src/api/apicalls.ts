import axios, { AxiosResponse } from "axios";
import { SetStateAction } from "react";
import { apiEndPoint } from "../config.ts";
import { checkBlogPostData } from "../helper/helperOne.ts";

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
      `${apiEndPoint}/blogs/favorites/${localStorage.getItem("user")}`
    );
    if (response.status == 200) {
      setFavorites(response.data);
    }
  } catch (e: any) {
    alert(e.response.data.message);
  }
}
async function handleFavoriteLikes(
  blog: { _id: any },
  setFavorites: { (value: any): void; (arg0: any): void }
) {
  let result1 = await axios.put(
    `${apiEndPoint}/blogs/likes/${localStorage.getItem("user")}/${blog._id}`,
    blog
  );

  if (result1.data) {
    await getUserFavorites(setFavorites);
  } else {
    alert("error");
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
      `${apiEndPoint}/blogs/favorite/${localStorage.getItem("user")}`,
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
  try {
    let result1 = await axios.put(
      `${apiEndPoint}/blogs/likes/${localStorage.getItem("user")}/${blog._id}`,
      blog
    );

    if (result1.data) {
      await getAllBlogs(allBlogs, setAllBlogs, page);
    }
  } catch (e) {
    alert(`${e}`);
  }
}

async function getAllPostsApiCall(setAllPosts: (arg0: any) => void) {
  try {
    let result = await axios.get(
      `${apiEndPoint}/blogs/item/${localStorage.getItem("user")}`
    );
    if (result.data) {
      setAllPosts(result.data);
    }
  } catch (e: any) {
    alert(e.response.data.message);
  }
}

async function handleMyPostsLikes(
  blog: {
    username: any;
    _id: any;
  },
  setMyPosts: any
) {
  try {
    let response = await axios.put(
      `${apiEndPoint}/blogs/likes/${localStorage.getItem("user")}/${blog._id}`,
      blog
    );
    if (response.data.success) {
      let result = response.data.data.blogs.map((i: { _id: any }) => ({
        ...i,
        username: blog.username,
      }));
      setMyPosts(result);
    }
  } catch (error) {
    alert(`${error}`);
  }
}

async function handleViewLikes(
  blog: {
    username: any;
    _id: any;
  },
  setData: any
) {
  try {
    let response = await axios.put(
      `${apiEndPoint}/blogs/likes/${localStorage.getItem("user")}/${blog._id}`,
      blog
    );
    if (response.data.success) {
      let result = response.data.data.blogs.filter(
        (i: { _id: any }) => i._id == blog._id
      );

      result[0].username = blog.username;

      setData(...result);
    }
  } catch (error) {
    alert(`${error}`);
  }
}

async function PostBlog(
  state: any,
  dispatch: {
    (value: { type: any; payload: any }): void;
    (arg0: { type: any; payload: any }): void;
  },
  snack: { open: boolean; message: string; color: string },
  setSnack: {
    (
      value: SetStateAction<{ open: boolean; message: string; color: string }>
    ): void;
    (arg0: any): void;
  },
  setData: { (value: any): void; (arg0: never[]): void },
  setName: { (value: SetStateAction<string>): void; (arg0: string): void }
) {
  if (checkBlogPostData(state, snack, setSnack)) {
    try {
      let response = await axios.post(
        `${apiEndPoint}/blogs/${localStorage.getItem("user")}`,
        state
      );
      if (response.data?.success) {
        setSnack({ ...snack, open: true, message: "Blog posted successfully" });
        dispatch({ type: "reset", payload: "" });
        setData([]);
        setName("");
        return true;
      } else {
        setSnack({ ...snack, open: true, message: "Blog not posted" });
        return false;
      }
    } catch (e) {
      alert(`${e}`);
      return e;
    }
  }
}

export {
  loginApiCall,
  getAllBlogs,
  handleLikes,
  getUserFavorites,
  handleAddFavorite,
  handleFavoriteLikes,
  getAllPostsApiCall,
  handleViewLikes,
  handleMyPostsLikes,
  PostBlog,
};
