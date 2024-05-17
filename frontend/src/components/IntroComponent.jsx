
export default function IntroComponent(props) {
    return (
        <div className="flex flex-col justify-center items-center w-full h-screen">
            <div id="image" className="max-w-lg">
                <img src="../../assets/Checklist.jpg" alt="" />
            </div>
            <div id="text">
                <div id="big-text" className="text-5xl font-bold">Share your secrets</div>
                <div id="small-text" className="w-full text-center mt-2 text-2xl">without worrying about it</div>
            </div>
        </div>
    );
}