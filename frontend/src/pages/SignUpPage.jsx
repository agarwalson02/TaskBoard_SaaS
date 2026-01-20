import { SignUp } from "@clerk/clerk-react"

function SignUpPage(){
    return <div><SignUp routing={"path"} path={"/sign-up"} signInUrl={"/sign-in"}/></div>
}
export default SignUpPage