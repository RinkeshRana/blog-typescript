import SignIn from "./SignIn";
import UserAvatar from "./UserAvatar";
function Navbar() {
  return (
    <div className="flex justify-center  py-6 px-6 md:px-20 border-b border-black">
      <div className="max-w-6xl flex justify-between w-full">
        <div className="text-3xl">Medium</div>
        <div className="flex gap-x-6 items-center">
          <div className="hidden md:block">Home</div>
          <div className="hidden md:block">Profile</div>
          <div className="hidden md:block">Sign in</div>
          <div>
            <button className="px-4 py-2 bg-blue-600 rounded-full">
              Get Started
            </button>
            <SignIn />
            <UserAvatar />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
