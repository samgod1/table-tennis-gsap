import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

function App() {
	useGSAP(() => {
		const split = SplitText.create(".hero-text", { type: "chars, words" });
		gsap.set(split.words[1], {
			color: "red",
		});
		const tl = gsap.timeline({
			onComplete: () => {
				gsap.fromTo(
					".right",
					{
						x: 250,
						rotate: 3,
					},
					{
						x: 0,
						rotate: 0,
						scrollTrigger: {
							trigger: ".hero",
							scrub: 1,
							start: "top top",
							end: "bottom top",
						},
					},
				);
				gsap.fromTo(
					".left",
					{ x: -250, rotate: -3 },
					{
						x: 0,
						rotate: 0,
						scrollTrigger: {
							trigger: ".hero",
							scrub: 1,
							start: "top top",
							end: "bottom top",
						},
					},
				);
			},
		});
		tl.from(split.chars, {
			y: 100,
			duration: 0.3,
			stagger: 0.025,
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
			<div className="img-container w-full fixed h-100 top-[50%] translate-y-[-50%] mt-10">
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
			<section className="hero h-dvh p-10 flex flex-col justify-between">
				<div className="hero-text text-9xl text-center anton-regular">
					TABLE TENNIS
				</div>

				<div className="text text-4xl">Play & Enjoy</div>
			</section>
			<section className="xuxin h-dvh flex items-center">
				<div className="text-5xl font-bold w-[50%] text-center ">XU XIN</div>
				<div className="text-5xl font-bold w-[50%] text-center ">
					CLOUD WALKER
				</div>
			</section>
			<section className="simon-gauzy"></section>
			<section className="koki-niwa"></section>
		</>
	);
}

export default App;
