import { motion } from "framer-motion"
import { Shield, Lock, Key } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden"
      >
        <div className="bg-primary p-8 text-primary-foreground">
          <motion.h1
            className="text-4xl font-bold mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            SecureVault
          </motion.h1>
          <motion.h2
            className="text-2xl font-semibold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Your Digital Fortress for Sensitive Information
          </motion.h2>
        </div>
        <div className="p-8">
          <motion.p
            className="text-lg mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            SecureVault is a cutting-edge platform designed to safeguard your most sensitive information. 
            With state-of-the-art encryption and a user-friendly interface, we provide a secure environment 
            for storing and managing your critical data.
          </motion.p>
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="flex flex-col items-center text-center">
              <Shield className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Unbreakable Security</h3>
              <p>Your data is protected by military-grade encryption algorithms.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Lock className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
              <p>We prioritize your privacy and never share your information with third parties.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Key className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Access</h3>
              <p>Access your sensitive information securely from anywhere, anytime.</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

