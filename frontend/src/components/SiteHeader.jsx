import { KeyRound, Moon, Sun, User } from 'lucide-react'
import { Link } from "react-router-dom"
import { useTheme } from "./ThemeProvider"

import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { useAuth } from "../hooks/useAuth.js"
import { useRecoilValue } from "recoil"
import { authAtom } from "../atoms/authAtom.js"

export default function SiteHeader() {
  const { theme, setTheme } = useTheme()
  const { logout } = useAuth()
  const { isAuthenticated, user } = useRecoilValue(authAtom)

  return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <KeyRound className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">SecureVault</span>
          </Link>
          <nav className="flex items-center space-x-1 sm:space-x-6">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary px-2 py-1 rounded-md hover:bg-primary/10">
              Home
            </Link>
            <Link to="/about" className="text-sm font-medium transition-colors hover:text-primary px-2 py-1 rounded-md hover:bg-primary/10">
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium transition-colors hover:text-primary px-2 py-1 rounded-md hover:bg-primary/10">
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle theme"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isAuthenticated ? (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/profile">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                    </>
                ) : (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/register">Register</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/sign-in">Sign In</Link>
                      </DropdownMenuItem>
                    </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
  )
}

