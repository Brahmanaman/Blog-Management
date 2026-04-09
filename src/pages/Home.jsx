import BlogCard from "../components/BlogCard";
import { useBlog } from "../context/BlogContext";

const Home = () => {
  const { blogPosts } = useBlog();
  const blogLength = blogPosts.filter((post) => post.published).length;
  return (
    <>
      <section className="mb-12 text-center">
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Welcome to <span className="text-primary">Inkwell</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
          Discover thoughtful articles on technology, programming, and software
          engineering from passionate writers.
        </p>
      </section>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">
          Latest Articles
        </h2>
        <span className="text-sm text-muted-foreground">
          {blogLength} articles
        </span>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts
          .filter((post) => post.published)
          .map((post, id) => (
            <BlogCard key={id} data={post} />
          ))}
      </div>
    </>
  );
};

export default Home;
