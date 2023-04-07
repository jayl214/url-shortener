import { signIn } from "next-auth/react";

export const SignIn = () => {
  return (
    <div>
      <button
        className="btn btn-outline btn-primary"
        onClick={() => void signIn()}
      >
        Sign in
      </button>
    </div>
  )
}