"use client"

import { useState } from 'react'
import { User, Mail, Camera } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import {useRecoilState, useRecoilValue} from "recoil";
import {authAtom} from "../atoms/authAtom.js";

export default function ProfilePage() {
  const { user } = useRecoilValue(authAtom); // Get user info and authentication state
  const [authState, setAuthState] = useRecoilState(authAtom);
  const [isEditing, setIsEditing] = useState(false)

  const handleInputChange = (e) => {
    alert("Edit profile is not available yet");
    return;

    const { name, value } = e.target
    const updatedUser = { ...user, [name]: value }
    setAuthState({ isAuthenticated: true, user: updatedUser});
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsEditing(false)
    // Here you would typically send the updated data to your backend
    console.log("Updated user data:", user)
  }

  return (
      <div className="container mx-auto py-12 px-4">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200">
                  <User className="w-full h-full text-gray-400" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Mail className="w-6 h-6 text-gray-400" />
                    <div className="flex-grow">
                      <Label htmlFor="email">Email</Label>
                      <Input
                          id="email"
                          name="email"
                          type="email"
                          value={user.email}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <User className="w-6 h-6 text-gray-400" />
                    <div className="flex-grow">
                      <Label htmlFor="name">Name</Label>
                      <Input
                          id="name"
                          name="name"
                          value={user.name}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              {isEditing ? (
                  <>
                    <Button onClick={() => setIsEditing(false)} variant="outline" className="mr-2">Cancel</Button>
                    <Button onClick={handleSubmit}>Save Changes</Button>
                  </>
              ) : (
                  <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      </div>
  )
}

