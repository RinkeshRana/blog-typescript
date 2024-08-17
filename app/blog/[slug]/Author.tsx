import { BlogAuthor } from "@/types/type";

function Author({ name, avatar }: BlogAuthor) {
  return (
    <div className=" rounded-lg shadow-md  max-w-sm">
      <div className="flex items-center gap-x-4">
        <img
          src={avatar}
          alt={name}
          className="w-16 h-16 rounded-full border-2 border-blue-500"
        />
        <div>
          <div className="flex items-center gap-x-4">
            <button className="text-lg font-semibold hover:underline">
              {name}
            </button>
            <span className="bg-gray-800 w-2 h-2 rounded-full" />
            <button className="text-sm text-blue-500 bg-blue-100 hover:bg-blue-200 px-4 py-1 rounded-full">
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Author;
