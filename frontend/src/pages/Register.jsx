import IntroComponent from "../components/IntroComponent.jsx";
import RegisterForm from "../components/RegisterForm.jsx";

export default function Register() {
    return (
        <div className="grid lg:grid-cols-2">
            <div className="hidden lg:block">
                <IntroComponent img_path = "../../assets/Checklist.jpg" big_text="Share your secrets" small_text="without worrying about it."/>
            </div>
            <RegisterForm />
        </div>
    );
}