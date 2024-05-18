
export default function IntroComponent(props) {
    return (
        <div className="flex flex-col justify-center items-center w-full h-screen">
            <div id="image" className="max-w-lg">
                <img src={props.img_path} alt="" />
            </div>
            <div id="text">
                <div id="big-text" className="text-5xl font-bold">{props.big_text}</div>
                <div id="small-text" className="w-full text-center mt-2 text-2xl">{props.small_text}</div>
            </div>
        </div>
    );
}