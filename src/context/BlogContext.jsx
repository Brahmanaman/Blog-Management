import { createContext, useContext, useState, useEffect, use } from "react";
import {
  getLocalStorage,
  setLocalStorage,
  defaultBlogData,
} from "../utils/localstorage";

const Blog = createContext();

export const BlogContext = ({ children }) => {
  const [blogPosts, setBlogPosts] = useState(
    getLocalStorage("blog_posts") || defaultBlogData,
  );
  const [blogCurrentUser, setBlogCurrentUser] = useState(
    getLocalStorage("blog_current_user") || null,
  );
  const [blogUsers, setBlogUsers] = useState(
    getLocalStorage("blog_users") || [],
  );
  const [isDarktheme, setIsDarkTheme] = useState(
    getLocalStorage("isDarkTheme") || false,
  );

  useEffect(() => {
    const existingData = getLocalStorage("blog_posts");
    if (!existingData) {
      setLocalStorage("blog_posts", defaultBlogData);
    }
  }, []);

  useEffect(() => {
    setLocalStorage("isDarkTheme", isDarktheme);
    if (isDarktheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarktheme]);

  return (
    <Blog.Provider
      value={{
        blogPosts,
        setBlogPosts,
        blogCurrentUser,
        setBlogCurrentUser,
        blogUsers,
        setBlogUsers,
        isDarktheme,
        setIsDarkTheme,
      }}
    >
      {children}
    </Blog.Provider>
  );
};

export const useBlog = () => useContext(Blog);
