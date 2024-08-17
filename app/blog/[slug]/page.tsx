import client from "@/lib/mongodb";
import { Blog } from "@/types/type";
import { notFound } from "next/navigation";
import Author from "./Author";

async function fetchBlog(slug: string): Promise<Blog> {
  const fetchedBlog: any = await client
    .db("blog-app")
    .collection("blogs")
    .findOne({ slug });

  if (!fetchedBlog) {
    notFound();
  }

  return fetchedBlog;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  const fetchedBlog: Blog = await fetchBlog(slug);

  return (
    <div className="flex justify-center p-6">
      <div className="flex flex-col gap-y-4 max-w-2xl">
        <div className="text-3xl md:text-4xl font-bold">
          {fetchedBlog.title}
        </div>
        <div className="text-xl md:text-2xl font-semibold">
          {fetchedBlog.subTitle}
        </div>
        <div
          className="
        "
        >
          <Author
            name={fetchedBlog.author}
            avatar={fetchedBlog.avatar}
            email={fetchedBlog.email}
          />
        </div>
        {fetchedBlog.blocks.map((block) => {
          // Handle header block
          if (block.type === "header") {
            const headerClass =
              block.data.level === 1
                ? "text-3xl md:text-4xl font-bold"
                : block.data.level === 2
                ? "text-xl md:text-2xl font-semibold "
                : "text-xl md:text-2xl font-medium";
            return (
              <div
                key={block.id}
                className={headerClass}
                dangerouslySetInnerHTML={{ __html: block.data.text ?? "" }}
              />
            );
          }
          // Handle paragraph block
          else if (block.type === "paragraph") {
            return (
              <div
                key={block.id}
                className="text-lg"
                dangerouslySetInnerHTML={{ __html: block.data.text ?? "" }}
              />
            );
          }
          // Handle image block
          else if (block.type === "image") {
            return (
              <div key={block.id} className="relative">
                <img
                  src={block.data.file?.url}
                  alt={block.data.caption || "Blog Image"}
                  className={`w-full rounded-md ${
                    block.data.withBorder ? "border" : ""
                  } ${block.data.withBackground ? "bg-gray-100" : ""} ${
                    block.data.stretched ? "object-cover" : ""
                  }`}
                />
                {block.data.caption && (
                  <div
                    className="text-sm text-gray-500 text-center mt-1"
                    dangerouslySetInnerHTML={{
                      __html: block.data.caption ?? "",
                    }}
                  />
                )}
              </div>
            );
          }
          // Handle quote block
          else if (block.type === "quote") {
            return (
              <blockquote
                key={block.id}
                className={`border-l-4 pl-4 italic text-gray-700 ${
                  block.data.alignment === "left" ? "text-left" : "text-center"
                }`}
              >
                {block.data.text}
                <footer className="text-sm mt-2 text-gray-500">
                  — {block.data.caption}
                </footer>
              </blockquote>
            );
          }
          // Handle checklist block
          else if (block.type === "checklist") {
            return (
              <ul key={block.id} className="list-none">
                {block.data.items.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      readOnly
                      className="mr-2"
                    />
                    <span className={item.checked ? "line-through" : ""}>
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            );
          }
          // Handle list block
          else if (block.type === "list") {
            return block.data.style === "unordered" ? (
              <ul key={block.id} className="list-disc list-inside">
                {block.data.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <ol key={block.id} className="list-decimal list-inside">
                {block.data.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ol>
            );
          }
          // Handle code block
          else if (block.type === "code") {
            return (
              <pre
                key={block.id}
                className="bg-zinc-900 p-4 rounded-md overflow-auto text-sm font-mono"
              >
                <code>{block.data.code}</code>
              </pre>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
