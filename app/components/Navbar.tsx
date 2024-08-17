import { auth } from "@/auth";
import { SignIn } from "./SignIn";
import { SignOut } from "./SignOut";
import Link from "next/link";
import MobileNavbar from "./MobileNavbar";

async function Navbar() {
  const session = await auth();

  return (
    <div className="flex justify-center py-6 px-6 md:px-20 border-b border-black">
      <div className="max-w-6xl flex justify-between w-full items-center">
        <Link
          className="text-3xl no-underline hover:text-gray-700 dark:hover:text-gray-400"
          href={"/ "}
        >
          Mastery
        </Link>

        {/* Mobile Navbar */}
        <MobileNavbar session={session} />

        {/* Desktop Navbar Links */}
        <div className="hidden md:flex gap-x-6 items-center">
          <Link
            className="no-underline hover:text-gray-700 dark:hover:text-gray-400"
            href={"/add-blog "}
          >
            Upload Your Blog
          </Link>
          <Link
            className="no-underline hover:text-gray-700 dark:hover:text-gray-400"
            href={"/blogs "}
          >
            All Blogs
          </Link>
          {/* SignIn/SignOut */}
          {session ? <SignOut /> : <SignIn />}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
