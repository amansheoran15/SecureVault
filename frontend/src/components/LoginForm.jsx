"use client";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { FaKey, FaGoogle } from "react-icons/fa";
import SignInWithGoogle from "./SignInWithGoogle.jsx";
import {Link} from "react-router-dom";

export default function LoginForm(props) {
    return<div className="flex flex-col items-center justify-center h-screen w-4/5 m-auto">
        <div id= "heading" className="text-center font-semibold text-4xl mb-5">
            MyLocker
        </div>
        <div id="form-container" className="w-full flex flex-col items-center">
            <form className="flex max-w-md flex-col gap-4 w-full">
                <div >
                    <div className="mb-2 block">
                        <Label htmlFor="email1" value="Email"/>
                    </div>
                    <TextInput id="email1" type="email" placeholder="abc@example.com" rightIcon={HiMail} required shadow/>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password1" value="Password"/>
                    </div>
                    <TextInput className="rounded-md" id="password1" type="password" rightIcon={FaKey}
                               placeholder="password123" required shadow/>
                    <div id="forgot-password" className="text-right w-full max-w-md text-gray-500 text-sm mt-1">
                        <a className="cursor-pointer">Forgot Password?</a>
                    </div>
                </div>
                <Button type="submit"><span className="text-lg">Sign In</span></Button>
            </form>
        </div>
        <div id="divider" className={"max-w-md w-full text-center mt-4"}>
        OR
        </div>
        <SignInWithGoogle/>
        <div id="register" className="text-right w-full max-w-md text-gray-500 text-sm mt-1">
            Are you new? <Link to="/register" className="text-blue-600 underline cursor-pointer">Create an account</Link>
        </div>
    </div>
}