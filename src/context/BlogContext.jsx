import { createContext, useContext, useState, useEffect } from "react";
import { getLocalStorage, setLocalStorage, defaultBlogData } from "../utils/localstorage";

const Blog = createContext();

export const BlogContext = ({ children }) => {
  const [blogPosts, setBlogPosts] = useState(getLocalStorage("blog_posts") || defaultBlogData);

  useEffect(() => {
    const existingData = getLocalStorage("blog_posts");
    if (!existingData) {
      setLocalStorage("blog_posts", defaultBlogData);
    }
  }, []);

  return <Blog.Provider value={{ blogPosts, setBlogPosts }}>{children}</Blog.Provider>;
};

export const useBlog = () => useContext(Blog);
