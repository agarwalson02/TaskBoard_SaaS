import {SignIn } from "@clerk/clerk-react"

function SignInPage(){
    return <div>
        <SignIn routing={"path"} path={"/sign-in"} signUpUrl={"/sign-up"}/>
    </div>
}
export default SignInPage