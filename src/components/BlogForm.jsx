import React from "react";
import { useNavigate, useParams } from "react-router";
import { useBlog } from "../context/BlogContext";
import Markdown from "react-markdown";

const BlogForm = () => {
  const { id } = useParams();
  const { blogPosts } = useBlog();
  const blog = blogPosts.find((post) => post.id === id);
  const date = blog
    ? new Date(blog.updatedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
  const navigate = useNavigate();

  if (!blog) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <p className="text-center text-lg text-muted-foreground">
          Blog not found.
        </p>
      </main>
    );
  }

  return (
    <>
      <main className="mx-auto max-w-3xl px-4 py-12">
        <a
          className="mb-8 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
          onClick={() => navigate("/")}
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
            className="lucide lucide-arrow-left mr-2 h-4 w-4"
            aria-hidden="true"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Back to Articles
        </a>
        <article>
          <header className="mb-8">
            <div className="mb-4 flex flex-wrap gap-2">
              {blog.tags.map((tag, id) => (
                <span
                  key={id}
                  data-slot="badge"
                  className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              {blog.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
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
                  className="lucide lucide-user h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx={12} cy={7} r={4} />
                </svg>
                <span>{blog.authorName}</span>
              </div>
              <div className="flex items-center gap-1.5">
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
                  className="lucide lucide-calendar-days h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M8 2v4" />
                  <path d="M16 2v4" />
                  <rect width={18} height={18} x={3} y={4} rx={2} />
                  <path d="M3 10h18" />
                  <path d="M8 14h.01" />
                  <path d="M12 14h.01" />
                  <path d="M16 14h.01" />
                  <path d="M8 18h.01" />
                  <path d="M12 18h.01" />
                  <path d="M16 18h.01" />
                </svg>
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-1.5">
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
                  className="lucide lucide-clock h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M12 6v6l4 2" />
                  <circle cx={12} cy={12} r={10} />
                </svg>
                <span>1 min read</span>
              </div>
            </div>
          </header>
          <div className="prose max-w-none">
            <Markdown>{blog.content}</Markdown>
          </div>
        </article>
      </main>
    </>
  );
};

export default BlogForm;
