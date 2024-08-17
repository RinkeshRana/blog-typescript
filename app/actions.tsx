"use server";
// import { revalidatePath } from "next/cache";
import client from "@/lib/mongodb";
import { Blog } from "@/types/type";
import { randomId, slugify } from "@/lib/utils";

type BlogPost = Blog & {
  createdAt: Date;
  slug: string;
  title: string;
  subTitle?: string;
};

export async function addBlog(blog: BlogPost) {
  const blogBlocks = blog.blocks;
  const db = client.db("blog-app");
  const collection = db.collection<BlogPost>("blogs");

  // Find the block header with level 1 and 2 for title and subtitle
  const title =
    blog.title ||
    blog.blocks.find(
      (block) => block.type === "header" && block.data.level === 1
    );
  const subTitle =
    blog.subTitle ||
    blog.blocks.find(
      (block) => block.type === "header" && block.data.level === 2
    );

  if (!title) {
    return {
      error: "Add a title to your blog",
    };
  }

  // remove the title and subtitle from the blocks
  blogBlocks.splice(blogBlocks.indexOf(title), 1);
  if (subTitle) {
    blogBlocks.splice(blogBlocks.indexOf(subTitle), 1);
  }

  const slug = slugify(title.data.text + " " + randomId());
  const createdAt = new Date();
  const result = await collection.insertOne({
    ...blog,
    slug,
    createdAt,
    title: title.data.text,
    subTitle: subTitle?.data.text ?? "",
  });

  return {
    slug,
    createdAt,
  };
}
