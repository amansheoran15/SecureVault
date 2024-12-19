import { motion } from "framer-motion"
import LoginForm from "../components/LoginForm"
import SecureIllustration from "../components/SecureIllustration"
import Checklist from "../../assets/Checklist.jpg";

export default function Login() {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            <motion.div
                className="lg:flex-1 bg-gradient-to-br from-primary/10 via-secondary/10 pt-4 to-background flex items-center justify-center"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="max-w-md text-center lg:text-left flex flex-col items-center justify-center p-2">
                    <h1 className="text-4xl text-center font-bold mb-4">Welcome to SecureVault</h1>
                    <p className="text-xl text-center mb-8">Your digital fortress for sensitive information.</p>
                    {/*<SecureIllustration className="w-64 h-64 mx-auto lg:mx-0" />*/}
                    <img
                        src={Checklist}
                        alt="Data Protection"
                        className="mx-auto lg:mx-0 rounded-lg shadow-lg"
                    />
                </div>
            </motion.div>
            <motion.div
                className="flex-1 flex items-center justify-center"
                initial={{opacity: 0, x: 50}}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <LoginForm />
            </motion.div>
        </div>
    )
}

