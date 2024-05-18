import IntroComponent from "../components/IntroComponent.jsx";
import LoginForm from "../components/LoginForm.jsx";


export default function Login() {
    return (
        <div className="grid grid-cols-2">
            <IntroComponent img_path = "../../assets/Checklist.jpg" big_text="Share your secrets" small_text="without worrying about it." />
            <LoginForm />
        </div>
    );

}