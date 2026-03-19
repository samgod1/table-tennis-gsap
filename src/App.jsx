import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(SplitText);

function App() {
	useGSAP(() => {
		const split = SplitText.create(".hero-text", { type: "chars" });
		const tl = gsap.timeline();
		tl.from(split.chars, {
			y: 100,
			duration: 0.3,
			stagger: 0.05,
			ease: "none",
			autoAlpha: 0,
		});
		tl.from(".middle", {
			y: 300,
			autoAlpha: 0,
			duration: 0.5,
			ease: "none",
		});
		tl.to(".left", { x: -250, rotate: -3, visibility: "visible" });
		tl.to(".right", { x: 250, rotate: 3, visibility: "visible" }, "<");
	}, []);

	return (
		<>
			<section className="hero h-dvh">
				<div className="hero-text text-9xl text-center">TABLE TENNIS</div>
				<div className="img-container w-full relative h-100">
					<div className="img-card left rounded-3xl w-75 h-[80%] absolute z-5 left-[50%] top-[50%] bottom-0 translate-x-[-50%] translate-y-[-50%] bg-lime-600 overflow-hidden invisible">
						<img
							src="images/simon-gauzy.avif"
							alt="simon-gauzy"
							className="w-full h-full object-cover"
						/>
					</div>
					<div className="img-card middle rounded-3xl w-75 h-full absolute z-10 left-[50%] bottom-0 translate-x-[-50%] bg-lime-600 overflow-hidden">
						<img
							src="images/xuxin.jpg"
							alt="xuxin"
							className="w-full h-full object-cover"
						/>
					</div>
					<div className="img-card right rounded-3xl w-75 h-[80%] absolute z-5 left-[50%] top-[50%] bottom-0 translate-x-[-50%] translate-y-[-50%] bg-lime-600 overflow-hidden invisible">
						<img
							src="images/koki-niwa.jpg"
							alt="koki-niwa"
							className="w-full h-full object-cover"
						/>
					</div>
				</div>
				<div className="text">Play & Enjoy</div>
			</section>
		</>
	);
}

export default App;
