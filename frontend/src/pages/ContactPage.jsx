import { Github, Linkedin } from 'lucide-react'
import { motion } from 'framer-motion'

import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"

function CreatorCard({ name, role, image, github, linkedin }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-md mx-auto text-center overflow-hidden">
        <CardHeader className="relative h-48">
          <img src={image} alt={name} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <CardTitle className="text-2xl text-white">{name}</CardTitle>
            <CardDescription className="text-lg text-white/80">{role}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-sm text-muted-foreground">
            Passionate about creating secure and user-friendly applications.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button variant="outline" size="icon" asChild>
            <a href={github} target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a href={linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

function ContactCard({ name, role, image, github, linkedin }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full overflow-hidden">
        <CardHeader className="relative h-32">
          <img src={image} alt={name} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </CardHeader>
        <CardContent className="pt-4">
          <CardTitle>{name}</CardTitle>
          <CardDescription>{role}</CardDescription>
          <p className="text-sm text-muted-foreground mt-2">
            Contributing to the success of SecureVault.
          </p>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <a href={github} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href={linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-4 w-4" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default function ContactPage() {
  const creator = {
    name: "John Doe",
    role: "Lead Developer",
    image: "/placeholder.svg?height=400&width=400",
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe"
  }

  const contributors = [
    {
      name: "Jane Smith",
      role: "UI/UX Designer",
      image: "/placeholder.svg?height=200&width=200",
      github: "https://github.com/janesmith",
      linkedin: "https://linkedin.com/in/janesmith"
    },
    {
      name: "Bob Johnson",
      role: "Backend Developer",
      image: "/placeholder.svg?height=200&width=200",
      github: "https://github.com/bobjohnson",
      linkedin: "https://linkedin.com/in/bobjohnson"
    }
  ]

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Creator</h2>
          <CreatorCard {...creator} />
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Contributors</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {contributors.map((contributor) => (
              <ContactCard key={contributor.name} {...contributor} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

