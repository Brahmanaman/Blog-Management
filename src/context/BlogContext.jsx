import { createContext, useContext, useState, useEffect, use } from "react";
import { getLocalStorage, setLocalStorage, defaultBlogData } from "../utils/localstorage";

const Blog = createContext();

export const BlogContext = ({ children }) => {
  const [blogPosts, setBlogPosts] = useState(getLocalStorage("blog_posts") || defaultBlogData);
  const [blogCurrentUser, setBlogCurrentUser] = useState(getLocalStorage("blog_current_user") || null);
  const [blogUsers, setBlogUsers] = useState(getLocalStorage("blog_users") || []);

  useEffect(() => {
    const existingData = getLocalStorage("blog_posts");
    if (!existingData) {
      setLocalStorage("blog_posts", defaultBlogData);
    }
  }, []);

  return (
    <Blog.Provider value={{ blogPosts, setBlogPosts, blogCurrentUser, setBlogCurrentUser, blogUsers, setBlogUsers }}>
      {children}
    </Blog.Provider>
  );
};

export const useBlog = () => useContext(Blog);
