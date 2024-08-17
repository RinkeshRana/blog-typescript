"use server";
// import { revalidatePath } from "next/cache";
import client from "@/lib/mongodb";
import { Blog, HeaderBlock } from "@/types/type";
import { randomId, slugify } from "@/lib/utils";
import { auth, signIn } from "@/auth";
import { signOut } from "@/auth";

export async function addBlog(blog: Blog) {
  const session = await auth();

  if (!session) {
    return {
      error: "You need to be signed in to add a blog",
    };
  }

  const blogBlocks = blog.blocks;
  const db = client.db("blog-app");
  const collection = db.collection<Blog>("blogs");

  // Find the block header with level 1 and 2 for title and subtitle
  const title = (blog.title ||
    blog.blocks.find(
      (block) => block.type === "header" && block.data.level === 1
    )) as HeaderBlock;
  const subTitle =
    blog.subTitle ||
    (blog.blocks.find(
      (block) => block.type === "header" && block.data.level === 2
    ) as HeaderBlock | undefined);

  const subTitleText =
    typeof subTitle === "string" ? "" : subTitle?.data?.text || "";

  if (!title) {
    return {
      error: "Add a title to your blog",
    };
  }

  // remove the title and subtitle from the blocks
  const titleIndex = blogBlocks.findIndex(
    (block) => block.type === "header" && block.data.level === 1
  );
  if (titleIndex !== -1) {
    blogBlocks.splice(titleIndex, 1);
  }
  if (subTitle) {
    const subTitleIndex = blogBlocks.findIndex(
      (block) =>
        typeof block !== "string" &&
        block.type === "header" &&
        block.data.level === 2
    );
    if (subTitleIndex !== -1) {
      blogBlocks.splice(subTitleIndex, 1);
    }
  }

  const slug = slugify(title.data.text + " " + randomId());
  const createdAt = new Date();
  const result = await collection.insertOne({
    ...blog,
    slug: slug,
    createdAt,
    title: title.data.text,
    subTitle: subTitleText,
    author: session.user?.name || "",
    email: session.user?.email || "",
    avatar: session.user?.image || "",
  });

  return {
    slug,
    createdAt,
  };
}

export async function signOutAction() {
  await signOut();
}
export async function signInAction() {
  await signIn();
}
