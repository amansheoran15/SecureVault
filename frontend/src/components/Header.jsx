"use client";

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useRecoilValue } from "recoil"; // Use useRecoilValue to get the state
import { authAtom } from "../atoms/authAtom"; // Assuming authAtom is structured as { isAuthenticated, user }

export default function Header() {
    const { logout } = useAuth(); // Get the logout function from the auth hook
    const { isAuthenticated, user } = useRecoilValue(authAtom); // Get user info and authentication state

    return (
        <Navbar fluid rounded>
            <Link to="/">
                <Navbar.Brand>
                    {/*<img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="MyLocker Logo" />*/}
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">MyLocker</span>
                </Navbar.Brand>
            </Link>
            <div className="flex md:order-2">
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar alt="User settings" rounded />
                    }
                >
                    {isAuthenticated ? (
                        <>
                            <Dropdown.Header>
                                <span className="block text-sm">{user.name}</span>
                                <span className="block truncate text-sm font-medium">{user.email}</span>
                            </Dropdown.Header>
                            <Link to="/dashboard">
                                <Dropdown.Item>
                                    Dashboard
                                </Dropdown.Item>
                            </Link>
                            <Link to="/settings">
                                <Dropdown.Item>
                                    Settings
                                </Dropdown.Item>
                            </Link>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={logout} className="cursor-pointer text-red-500">
                                Sign Out
                            </Dropdown.Item>
                        </>
                    ) : (
                        <>
                            <Link to="/register">
                                <Dropdown.Item>
                                    Register
                                </Dropdown.Item>
                            </Link>
                            <Link to="/sign-in">
                                <Dropdown.Item>
                                    Sign In
                                </Dropdown.Item>
                            </Link>
                        </>
                    )}
                </Dropdown>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link className="text-xl" active>
                    <Link to="/">Home</Link>
                </Navbar.Link>
                <Navbar.Link className="text-xl">
                    <Link to="/about">About</Link>
                </Navbar.Link>
                <Navbar.Link className="text-xl">
                    <Link to="/contact">Contact</Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}
