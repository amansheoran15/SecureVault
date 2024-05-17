import {Button} from "flowbite-react";
import {FaGoogle} from "react-icons/fa";

export default function SignInWithGoogle(){
    return (
        <div id={"google-button"} className={"max-w-md w-full text-center mt-4"}>
            <Button color="light" className={"w-full flex items-center justify-center"}>
                <FaGoogle className="mr-3 h-5 w-5 m-auto"/>
                <span className="text-lg">Sign In with Google</span>
            </Button>
        </div>
    );
}