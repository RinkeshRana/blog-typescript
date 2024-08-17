import dynamic from "next/dynamic";
// import { addBlog } from "@/app/actions";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const Editor = dynamic(() => import("@/app/add-blog/Editor"), { ssr: false });

async function Page() {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="p-6">
      <Editor holder="editorjs-container" />
    </div>
  );
}

export default Page;
