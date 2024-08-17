import client from "@/lib/mongodb";
import Blog from "./Blog";

async function getBlogs() {
  const blogs = await client
    .db("blog-app")
    .collection("blogs")
    .find()
    .toArray();

  return blogs;
}

async function Page() {
  const blogs = await getBlogs();

  return (
    <div className="px-6 flex items-center justify-center w-full">
      <div className="max-w-2xl ">
        <Blog
          title="10 Self-Improvement Books That 4x My Income in 3 Years"
          subTitle="If you haven’t read them, you’re leaving money on the table"
          author="Rinkesh Rana"
          avatar="https://avatars.githubusercontent.com/u/47269252?v=4"
          createdAt={new Date("2021-09-10")}
          slug="10-self-improvement-books-that-4x-my-income-in-3-years"
        />
        {blogs.map((blog) => (
          <Blog
            key={blog._id.toString()}
            title={blog.title}
            subTitle={blog.subTitle}
            author={blog.author}
            avatar={blog.avatar}
            createdAt={blog.createdAt}
            slug={blog.slug}
          />
        ))}
      </div>
    </div>
  );
}
export default Page;
