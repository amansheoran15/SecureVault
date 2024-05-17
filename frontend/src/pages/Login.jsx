import IntroComponent from "../components/IntroComponent.jsx";
import LoginForm from "../components/LoginForm.jsx";


export default function Login() {
    return (
        <div className="grid grid-cols-2">
            <IntroComponent/>
            <LoginForm />
        </div>
    );

}