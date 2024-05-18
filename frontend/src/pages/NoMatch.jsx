import IntroComponent from "../components/IntroComponent.jsx";

//TODO: needs more work
export default function NoMatch() {
    return (
        <div className="h-4/6 w-4/6 m-auto">
            <IntroComponent img_path="../../assets/404.png" big_text="OOPS! Looks like the dog has eaten this page" small_text="Return to safety" />

        </div>
    );
}