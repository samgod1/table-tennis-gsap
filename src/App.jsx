import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

function App() {
	history.scrollRestoration = "manual";

	useGSAP(() => {
		const split = SplitText.create(".hero-text", { type: "chars, words" });
		gsap.set(split.words[1], {
			color: "red",
		});
		gsap.set(document.body, { overflow: "hidden" });

		const introTl = gsap.timeline({
			onComplete: () => {
				gsap.set(document.body, { overflow: "" });
				ScrollTrigger.refresh();
			},
		});

		introTl
			.from(split.chars, {
				y: 100,
				duration: 0.3,
				stagger: 0.025,
				ease: "none",
				autoAlpha: 0,
			})
			.from(".middle", {
				y: 300,
				autoAlpha: 0,
				duration: 0.5,
				ease: "none",
			})
			.to(".left", { x: -250, rotate: -3, visibility: "visible" })
			.to(".right", { x: 250, rotate: 3, visibility: "visible" }, "<");

		//scroll image collapse animation
		gsap.to([".left", ".right"], {
			x: 0,
			rotate: 0,
			immediateRender: false,
			scrollTrigger: {
				trigger: ".hero",
				start: "top top",
				end: "bottom top",
				scrub: 1,
			},
		});

		//color animation
		gsap.to([".hero", ".xu-xin", ".simon-gauzy", ".koki-niwa"], {
			backgroundColor: "red",
			scrollTrigger: {
				trigger: ".xu-xin",
				start: "center bottom",
				toggleActions: "play none none reverse",
			},
		});

		gsap.fromTo(
			[".hero", ".xu-xin", ".simon-gauzy", ".koki-niwa"],
			{ backgroundColor: "red" },
			{
				backgroundColor: "green",
				immediateRender: false,
				scrollTrigger: {
					trigger: ".simon-gauzy",
					start: "center bottom",
					toggleActions: "play none none reverse",
				},
			},
		);

		//Card Popping animation
		const tlLeft = gsap.timeline({
			scrollTrigger: {
				trigger: ".simon-gauzy",
				start: "center bottom",
				toggleActions: "play none none none",
				immediateRender: false,
			},
		});

		tlLeft.to(".left", {
			x: -200,
			duration: 0.5,
		});

		tlLeft.to(".left", {
			rotateY: -50,
			transformStyle: "preserve-3d",
			zIndex: 20,
			duration: 0.5,
		});

		tlLeft.to(".left", {
			rotateY: 0,
			x: 0,
			height: "100%",
			duration: 0.5,
		});
	}, []);

	return (
		<>
			<div className="img-container w-full fixed h-100 top-[50%] translate-y-[-50%] mt-10 perspective-midrange">
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
			<section className="xu-xin h-dvh flex items-center">
				<div className="text-container text-5xl font-bold w-full text-center text-white">
					XU XIN
				</div>
				{/* Same width as the img container */}
				<div className="w-75"></div>
				<div className="text-5xl font-bold w-full text-center text-white">
					XUPERMAN
				</div>
			</section>
			<section className="simon-gauzy h-dvh"></section>
			<section className="koki-niwa"></section>
		</>
	);
}

export default App;
