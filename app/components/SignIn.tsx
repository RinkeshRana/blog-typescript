import { signIn } from "@/auth";
import { signInAction } from "../actions";

export function SignIn() {
  return (
    <form action={signInAction}>
      <button type="submit">Sign in</button>
    </form>
  );
}
