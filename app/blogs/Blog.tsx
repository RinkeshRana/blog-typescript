import Link from "next/link";

type BlogProps = {
  title: string;
  subTitle: string;
  author: string;
  avatar: string;
  createdAt: Date;
  slug: string;
};

function Blog({ title, subTitle, author, avatar, createdAt, slug }: BlogProps) {
  return (
    <div>
      <div className="flex items-center mt-4">
        <img src={avatar} alt={author} className="w-12 h-12 rounded-full" />
        <div className="ml-2">
          <p className="text-sm">{author}</p>
          <p className="text-sm">{createdAt.toDateString()}</p>
        </div>
      </div>
      <div className="w-fit">
        <Link href={`/blog/${slug}`} className="no-underline ">
          <h1 className="font-bold text-lg md:text-2xl hover:text-gray-700 dark:hover:text-gray-400">
            {title}
          </h1>
        </Link>
      </div>
      <div className="w-fit">
        <Link href={`/blog/${slug}`} className="no-underline">
          <h2 className="hover:text-gray-700 dark:hover:text-gray-400">
            {subTitle}
          </h2>
        </Link>
      </div>
    </div>
  );
}
export default Blog;
