import { auth } from "@/auth";
import Link from "next/link";

async function Hero() {
  const session = await auth();
  return (
    <div className="flex justify-center items-center min-h-[800px] text-center ">
      <div>
        <div className="text-4xl md:text-6xl lg:text-9xl tracking-tight">
          Be Part of a<div className="font-bold">better internet</div>
        </div>
        <div className="mt-12 md:mt-5 text-xl">
          <div className="font-light tracking-tight">
            Read. Write. Deepen your understanding.
          </div>
          <div className="mt-5 md:mt-3 font-semibold tracking-tight">
            Share your knowledge with the world. Together, we can make the web a
            better place.
          </div>
        </div>
        <div className="mt-12 ">
          {!session ? (
            <Link
              className="px-8 py-2 bg-black text-white rounded-full tracking-tight"
              href={"/api/auth/signin"}
            >
              Become a member
            </Link>
          ) : (
            <Link
              className="px-8 py-2 bg-black text-white rounded-full tracking-tight no-underline"
              href={"/blogs"}
            >
              Browse Blogs
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
export default Hero;
