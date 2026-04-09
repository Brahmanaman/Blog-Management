import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useBlog } from "../context/BlogContext";
import { setLocalStorage } from "../utils/localstorage";

const BlogList = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);
  const navigate = useNavigate();
  const date = new Date(data.updatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const { blogPosts, setBlogPosts } = useBlog();
  const updatePublished = (e, val) => {
    e.preventDefault();
    setIsOpen(false);
    let updatedData = blogPosts.map((post) => {
      if (post.id === data.id) {
        post.published = val;
      }
      return post;
    });
    setBlogPosts(updatedData);
    setLocalStorage("blog_posts", updatedData);
  };
  const deleteBlog = (e) => {
    e.preventDefault();
    let updatedData = blogPosts.filter((post) => post.id !== data.id);
    setBlogPosts(updatedData);
    setLocalStorage("blog_posts", updatedData);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        data-slot="card"
        className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm transition-shadow hover:shadow-md"
      >
        <div className="flex items-center justify-between p-4 relative">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate font-medium">{data.title}</h3>
              {data.published ? (
                <span
                  data-slot="badge"
                  className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90"
                >
                  Published
                </span>
              ) : (
                <span
                  data-slot="badge"
                  className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent bg-secondary text-secondary-foreground [a&amp;]:hover:bg-secondary/90"
                >
                  Draft
                </span>
              )}
            </div>
            <p className="mt-1 truncate text-sm text-muted-foreground">
              {data.content}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">{date}</p>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 size-9 ml-4 shrink-0"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-ellipsis h-4 w-4"
              aria-hidden="true"
            >
              <circle cx={12} cy={12} r={1} />
              <circle cx={19} cy={12} r={1} />
              <circle cx={5} cy={12} r={1} />
            </svg>
          </button>

          {isOpen && (
            <div
              ref={popupRef}
              className="absolute right-5 top-15 mt-2 w-44 rounded-md border bg-white shadow-md popup-panel z-50"
            >
              {data.published && (
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    navigate(`/blog/${data.id}`);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer popup-panel dark:hover:!bg-[#007F6A]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-eye mr-2 h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  View
                </a>
              )}

              <a
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  navigate(`/dashboard/edit/${data.id}`);
                }}
                className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer popup-panel dark:hover:!bg-[#007F6A]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-pencil mr-2 h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
                  <path d="m15 5 4 4"></path>
                </svg>{" "}
                Edit
              </a>

              {data.published ? (
                <div
                  onClick={(e) => updatePublished(e, false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer popup-panel dark:hover:!bg-[#007F6A]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-eye-off mr-2 h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"></path>
                    <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"></path>
                    <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"></path>
                    <path d="m2 2 20 20"></path>
                  </svg>
                  Unpublish
                </div>
              ) : (
                <div
                  onClick={(e) => updatePublished(e, true)}
                  className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer popup-panel dark:hover:!bg-[#007F6A]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-eye mr-2 h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  Publish
                </div>
              )}

              <div
                onClick={deleteBlog}
                className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 cursor-pointer popup-panel dark:hover:!bg-[#007F6A]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-trash2 lucide-trash-2 mr-2 h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M10 11v6"></path>
                  <path d="M14 11v6"></path>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                  <path d="M3 6h18"></path>
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                Delete
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogList;
