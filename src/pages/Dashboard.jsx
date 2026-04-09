import React from "react";
import { useBlog } from "../context/BlogContext";
import { Navigate, useNavigate } from "react-router";
import BlogList from "../components/BlogList";

const Dashboard = () => {
  const navigate = useNavigate();
  const { blogCurrentUser, blogPosts } = useBlog();
  if (blogCurrentUser.role === "user") {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your articles, {blogCurrentUser.name}
          </p>
        </div>
        <a
          data-slot="button"
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3"
          onClick={() => navigate("/dashboard/new")}
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
            className="lucide lucide-plus mr-2 h-4 w-4"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          New Article
        </a>
      </div>
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div
          data-slot="card"
          className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm"
        >
          <div
            data-slot="card-header"
            className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 pb-2"
          >
            <div
              data-slot="card-description"
              className="text-muted-foreground text-sm"
            >
              Total Articles
            </div>
            <div data-slot="card-title" className="font-semibold text-3xl">
              {blogPosts.slice(3).length}
            </div>
          </div>
        </div>
        <div
          data-slot="card"
          className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm"
        >
          <div
            data-slot="card-header"
            className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 pb-2"
          >
            <div
              data-slot="card-description"
              className="text-muted-foreground text-sm"
            >
              Published
            </div>
            <div
              data-slot="card-title"
              className="font-semibold text-3xl text-green-600"
            >
              {blogPosts.slice(3).filter((data) => data.published).length}
            </div>
          </div>
        </div>
        <div
          data-slot="card"
          className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm"
        >
          <div
            data-slot="card-header"
            className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 pb-2"
          >
            <div
              data-slot="card-description"
              className="text-muted-foreground text-sm"
            >
              Drafts
            </div>
            <div
              data-slot="card-title"
              className="font-semibold text-3xl text-muted-foreground"
            >
              {blogPosts.slice(3).filter((data) => !data.published).length}
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Articles</h2>
        <div className="space-y-3">
          {blogPosts.slice(3).map((data) => (
            <BlogList key={data.id} data={data} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
