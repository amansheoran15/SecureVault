"use client";

import { Button, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import SignInWithGoogle from "./SignInWithGoogle.jsx";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
    const { registerUser } = useAuth(); // Custom hook to register user
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const password = getValues("password");
    const navigate = useNavigate();

    const onSubmitCallback = async (formData) => {
        await registerUser(formData);
        navigate("/");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div id="heading" className="text-center font-semibold text-4xl mb-5">
                Register
            </div>
            <div id="form-container" className="flex flex-col items-center w-3/4 justify-center">
                <form className="flex max-w-md flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmitCallback)}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="text2" value="Full Name"/>
                        </div>
                        <TextInput
                            id="text2"
                            {...register("name", {
                                required: "This is a required field",
                                minLength: {
                                    value: 4,
                                    message: "Name must be of minimum length 4"
                                }
                            })}
                            color={errors.name ? "failure" : undefined}
                            helperText={errors.name ? <> {errors.name.message}</> : undefined}
                            placeholder="John Doe"
                            type="text"
                            shadow
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email2" value="Email ID"/>
                        </div>
                        <TextInput
                            id="email2"
                            {...register("email", {
                                required: "This is a required field",
                                pattern: {
                                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: 'Invalid email address',
                                },
                            })}
                            color={errors.email ? "failure" : undefined}
                            helperText={errors.email ? <> {errors.email.message}</> : undefined}
                            type="email"
                            placeholder="johndoe@example.com"
                            shadow
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password2" value="Your password"/>
                        </div>
                        <TextInput
                            id="password2"
                            {...register("password", {
                                required: "This is a required field",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters"
                                }
                            })}
                            color={errors.password ? "failure" : undefined}
                            helperText={errors.password ? <> {errors.password.message}</> : undefined}
                            type="password"
                            shadow
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="repeat-password" value="Repeat password"/>
                        </div>
                        <TextInput
                            id="repeat-password"
                            {...register("repeat_password", {
                                required: "This is a required field",
                                validate: (val) => val === password || "Password doesn't match"
                            })}
                            color={errors.repeat_password ? "failure" : undefined}
                            helperText={errors.repeat_password ? <> {errors.repeat_password.message}</> : undefined}
                            type="password"
                            shadow
                        />
                    </div>
                    <Button type="submit"><span className="text-lg">Sign Up</span></Button>
                </form>
            </div>
            <div id="divider" className="max-w-md w-full text-center mt-4">
                OR
            </div>
            <SignInWithGoogle/>
            <div id="sign-in" className="text-center w-full max-w-md text-gray-500 text-sm mt-2">
                Already have an account? <Link to="/sign-in" className="text-blue-600 underline cursor-pointer">Sign In</Link>
            </div>
        </div>
    );
}
