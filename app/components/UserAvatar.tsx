import { auth, signIn } from "@/auth";

export default async function UserAvatar() {
  const session = await auth();

  if (!session || !session.user)
    return (
      <div
        onClick={async () => {
          const { redirect } = await signIn();
        }}
      ></div>
    );

  return (
    <div>
      <img src={session.user.image || ""} alt="User Avatar" />
    </div>
  );
}
