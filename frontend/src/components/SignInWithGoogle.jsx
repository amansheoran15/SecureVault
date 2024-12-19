import { Button } from "./ui/button"
import { FaGoogle } from "react-icons/fa"

export default function SignInWithGoogle() {
    return (
        <Button variant="outline" className="w-full">
            <FaGoogle className="mr-2 h-4 w-4" />
            Sign in with Google
        </Button>
    )
}

