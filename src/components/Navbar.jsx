import { Outlet, useNavigate } from "react-router";
import { useBlog } from "../context/BlogContext";
import { clearLocalStorage } from "../utils/localstorage";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const navigate = useNavigate();
  const { blogCurrentUser, setBlogCurrentUser, isDarktheme, setIsDarkTheme } =
    useBlog();
  const popupRef = useRef(null);

  const handleLogout = () => {
    setBlogCurrentUser(null);
    clearLocalStorage("blog_current_user");
    navigate("/");
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (popupRef?.current && !popupRef?.current?.contains(event.target)) {
        setOpenPopup(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <a
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-pen-line h-6 w-6 text-primary"
              aria-hidden="true"
            >
              <path d="M13 21h8"></path>
              <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
            </svg>
            <span className="text-xl font-semibold tracking-tight">
              Inkwell
            </span>
          </a>
          <nav className="flex items-center gap-2">
            <button
              onClick={() => setIsDarkTheme(!isDarktheme)}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([className*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 size-9"
            >
              {isDarktheme ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-moon h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-sun h-5 w-5"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2"></path>
                  <path d="M12 20v2"></path>
                  <path d="m4.93 4.93 1.41 1.41"></path>
                  <path d="m17.66 17.66 1.41 1.41"></path>
                  <path d="M2 12h2"></path>
                  <path d="M20 12h2"></path>
                  <path d="m6.34 17.66-1.41 1.41"></path>
                  <path d="m19.07 4.93-1.41 1.41"></path>
                </svg>
              )}
            </button>
            {blogCurrentUser ? (
              <div className="flex items-center gap-2 relative">
                <button
                  onClick={() => setOpenPopup(!openPopup)}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([className*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 h-9 px-4 py-2 has-[&gt;svg]:px-3 gap-2"
                  type="button"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground uppercase">
                    {blogCurrentUser.name.slice(0, 1)}
                  </div>
                  <span className="sm:inline capitalize">
                    {blogCurrentUser.name}
                  </span>
                </button>

                {openPopup && (
                  <div>
                    <div
                      ref={popupRef}
                      className="popup-panel absolute top-10 right-0 mt-2 w-56 rounded-md border border-border bg-white dark:bg-[#0a0e11] shadow-md z-50 animate-in fade-in zoom-in-95"
                    >
                      <div className="px-3 py-2">
                        <p className="text-sm font-medium text-foreground dark:text-slate-100">
                          {blogCurrentUser.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {blogCurrentUser.email}
                        </p>
                        <p className="mt-1 text-xs capitalize text-gray-400 dark:text-gray-500">
                          {blogCurrentUser.role}
                        </p>
                      </div>

                      <div className="my-1 h-px bg-gray-200 dark:bg-gray-700" />
                      {blogCurrentUser.role === "author" && (
                        <>
                          <a
                            onClick={() => navigate("/dashboard")}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-foreground dark:text-slate-100 rounded-md hover:bg-[#008774] dark:hover:bg-[#00665f] cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-layout-dashboard mr-2 h-4 w-4"
                              aria-hidden="true"
                            >
                              <rect
                                width="7"
                                height="9"
                                x="3"
                                y="3"
                                rx="1"
                              ></rect>
                              <rect
                                width="7"
                                height="5"
                                x="14"
                                y="3"
                                rx="1"
                              ></rect>
                              <rect
                                width="7"
                                height="9"
                                x="14"
                                y="12"
                                rx="1"
                              ></rect>
                              <rect
                                width="7"
                                height="5"
                                x="3"
                                y="16"
                                rx="1"
                              ></rect>
                            </svg>
                            Dashboard
                          </a>

                          <div className="my-1 h-px bg-gray-200" />
                        </>
                      )}

                      <div
                        onClick={() => handleLogout()}
                        className="flex items-center gap-2 px-3 py-2 text-sm rounded-md text-red-500 dark:text-red-400 hover:bg-[#008774] dark:hover:bg-[#00665f] cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-log-out mr-2 h-4 w-4"
                          aria-hidden="true"
                        >
                          <path d="m16 17 5-5-5-5"></path>
                          <path d="M21 12H9"></path>
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        </svg>
                        Logout
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <a
                  data-slot="button"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([className*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 h-9 px-4 py-2 has-[&gt;svg]:px-3"
                  onClick={() => navigate("/login")}
                >
                  Login
                </a>
                <a
                  data-slot="button"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([className*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 has-[&gt;svg]:px-3"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </a>
              </div>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
