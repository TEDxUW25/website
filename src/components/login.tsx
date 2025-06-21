import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Login = () => {
        
    return (
      <>
       <SignedOut>
        <SignInButton mode="modal">
          <button className="hover:underline underline-offset-2 transition ease-in-out pt-2 text-white">
            Log In
          </button>
        </SignInButton>
            </SignedOut>
    
             <SignedIn>
        <UserButton/>
            </SignedIn>
      </>
    )
}

export default Login;

