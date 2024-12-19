"use client";

import { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Mail, User, Key, AlertCircle } from 'lucide-react';

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { useAuth } from "../hooks/useAuth";
import SignInWithGoogle from "./SignInWithGoogle";

export default function RegisterForm() {
    const { registerUser } = useAuth();
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmitCallback = async (formData) => {
        setIsLoading(true);
        try {
            await registerUser(formData);
            navigate("/");
        } catch (error) {
            console.error('Registration failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 min-h-screen py-8 flex items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                    <CardDescription>Enter your details to create your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmitCallback)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    className="pl-10"
                                    {...register("name", {
                                        required: "This is a required field",
                                        minLength: {
                                            value: 4,
                                            message: "Name must be at least 4 characters"
                                        }
                                    })}
                                />
                            </div>
                            {errors.name && (
                                <p className="text-sm text-red-500 flex items-center mt-1">
                                    <AlertCircle className="w-4 h-4 mr-1" />
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="johndoe@example.com"
                                    className="pl-10"
                                    {...register("email", {
                                        required: "This is a required field",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                            message: 'Invalid email address',
                                        },
                                    })}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-sm text-red-500 flex items-center mt-1">
                                    <AlertCircle className="w-4 h-4 mr-1" />
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-10"
                                    {...register("password", {
                                        required: "This is a required field",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters"
                                        }
                                    })}
                                />
                            </div>
                            {errors.password && (
                                <p className="text-sm text-red-500 flex items-center mt-1">
                                    <AlertCircle className="w-4 h-4 mr-1" />
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="repeat-password">Repeat Password</Label>
                            <div className="relative">
                                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <Input
                                    id="repeat-password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-10"
                                    {...register("repeat_password", {
                                        required: "This is a required field",
                                        validate: (val) => val === getValues("password") || "Passwords don't match"
                                    })}
                                />
                            </div>
                            {errors.repeat_password && (
                                <p className="text-sm text-red-500 flex items-center mt-1">
                                    <AlertCircle className="w-4 h-4 mr-1" />
                                    {errors.repeat_password.message}
                                </p>
                            )}
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Creating Account..." : "Create Account"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <div className="relative w-full">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>
                    <SignInWithGoogle />
                    <p className="text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/sign-in" className="font-semibold text-primary hover:underline">
                            Sign in
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}

