import IntroComponent from "../components/IntroComponent.jsx";
import RegisterForm from "../components/RegisterForm.jsx";

export default function Register() {
    return (
        <div className="grid lg:grid-cols-2">
            <div className="hidden lg:block">
                <IntroComponent />
            </div>
            <RegisterForm />
        </div>
    );
}