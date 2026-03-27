import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import ReactLenis from "lenis/react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

function MainContent() {
	history.scrollRestoration = "manual";
	const lenis = useLenis();

	useGSAP(() => {
		//This is for the scroll lock to work
		if (!lenis) return;
		lenis?.stop();

		const split = SplitText.create(".hero-text", { type: "words" });
		const firstWord = SplitText.create(split.words[0], { type: "chars" });
		const secondWord = SplitText.create(split.words[1], { type: "chars" });
		gsap.set(document.body, { overflow: "hidden" });

		gsap.set([".left", ".right"], {
			autoAlpha: 0,
		});

		const introTl = gsap.timeline({
			onComplete: () => {
				gsap.set(document.body, { overflow: "" });
				lenis?.start();
				ScrollTrigger.refresh();
			},
		});

		introTl
			.from(firstWord.chars, {
				y: 100,
				stagger: 0.075,
				ease: "power1.out",
				autoAlpha: 0,
				delay: 0.5,
			})
			.from(secondWord.chars, {
				y: 100,
				stagger: 0.075,
				ease: "power1.out",
				autoAlpha: 0,
			})

			.to(".hero-text", {
				top: "40px",
				transform: "translateY(0)",
			})
			.from(".middle", {
				y: 300,
				autoAlpha: 0,
				duration: 1,
				ease: "power2.out",
			})
			.to(".left", { x: -250, rotate: -3, duration: 0.75, autoAlpha: 1 })
			.to(".right", { x: 250, rotate: 3, duration: 0.75, autoAlpha: 1 }, "<");

		//scroll image collapse animation
		gsap.to([".left", ".right"], {
			x: 0,
			rotate: 0,
			immediateRender: false,
			scrollTrigger: {
				trigger: ".hero",
				start: "top top",
				end: "center top",
				scrub: 1.5,
			},
		});

		//color animation
		// gsap.to([".hero", ".xu-xin", ".simon-gauzy", ".koki-niwa"], {
		// 	backgroundColor: "red",
		// 	scrollTrigger: {
		// 		trigger: ".xu-xin",
		// 		start: "center bottom",
		// 		toggleActions: "play none none reverse",
		// 	},
		// });

		// gsap.fromTo(
		// 	[".hero", ".xu-xin", ".simon-gauzy", ".koki-niwa"],
		// 	{ backgroundColor: "red" },
		// 	{
		// 		backgroundColor: "green",
		// 		immediateRender: false,
		// 		scrollTrigger: {
		// 			trigger: ".simon-gauzy",
		// 			start: "center bottom",
		// 			toggleActions: "play none none reverse",
		// 			preventOverlaps: true,
		// 		},
		// 	},
		// );

		// gsap.fromTo(
		// 	[".hero", ".xu-xin", ".simon-gauzy", ".koki-niwa"],
		// 	{ backgroundColor: "green" },
		// 	{
		// 		backgroundColor: "blue",
		// 		immediateRender: false,
		// 		scrollTrigger: {
		// 			trigger: ".koki-niwa",
		// 			start: "center bottom",
		// 			toggleActions: "play none none reverse",
		// 		},
		// 	},
		// );

		//Card popping animaitions
		gsap.fromTo(
			".first-pop",
			{
				x: 250,
				rotateY: 70,
				autoAlpha: 0,
			},
			{
				zIndex: 20,
				rotateY: 0,
				x: 0,
				duration: 0.5,
				transformStyle: "preserve-3d",
				height: "100%",
				immediateRender: false,
				autoAlpha: 1,
				overwrite: "auto",
				ease: "power2.out",
				scrollTrigger: {
					trigger: ".xu-xin",
					start: "center bottom",
					toggleActions: "play none none reverse",
					onLeaveBack: () => {
						gsap.set(".first-pop", {
							x: 0,
							rotateY: 0,
							height: "80%",
							zIndex: 5,
						});
					},
				},
			},
		);
		gsap.fromTo(
			".second-pop",
			{
				x: -250,
				rotateY: -50,
				visibility: "hidden",
			},
			{
				zIndex: 20,
				rotateY: 0,
				x: 0,
				duration: 0.2,
				transformStyle: "preserve-3d",
				height: "100%",
				immediateRender: false,
				visibility: "visible",
				overwrite: "auto",
				scrollTrigger: {
					trigger: ".simon-gauzy",
					start: "center bottom",
					toggleActions: "play none none reverse",
					onLeaveBack: () => {
						gsap.set(".second-pop", {
							x: 0,
							rotateY: 0,
							height: "80%",
							zIndex: 5,
						});
					},
				},
			},
		);

		gsap.fromTo(
			".third-pop",
			{
				x: 250,
				rotateY: 50,
			},
			{
				x: 0,
				rotateY: 0,
				zIndex: 30,
				duration: 0.2,
				transformStyle: "preserve-3d",
				height: "100%",
				immediateRender: false,
				overwrite: "auto",
				visibility: "visible",
				scrollTrigger: {
					trigger: ".koki-niwa",
					start: "center bottom",
					toggleActions: "play none none reverse",
					onLeaveBack: () => {
						gsap.set(".third-pop", {
							x: 0,
							rotateY: 0,
							height: "80%",
							zIndex: 5,
						});
					},
				},
			},
		);

		// Hall of fame horizontal scroll animation
		const cards = gsap.utils.toArray(".hof-card");
		gsap.set(cards, {
			x: (i) => i * 350,
		});

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: ".hall-of-fame",
				start: "top top",
				end: "+=2000",
				scrub: true,
				pin: true,
				anticipatePin: 1,
			},
		});

		cards.forEach((card, i) => {
			if (i > 0) {
				gsap.set(card, { zIndex: 60 + i });
				tl.to(
					card,
					{
						x: 0,
						ease: "none",
						duration: i,
					},
					0,
				);
			}
		});

		gsap.fromTo(
			".hof-card",
			{
				autoAlpha: 0,
				rotateY: 15,
			},
			{
				autoAlpha: 1,
				rotateY: 0,
				duration: 0.2,
				scrollTrigger: {
					trigger: ".hall-of-fame",
					start: "center bottom",
					toggleActions: "play none none reverse",
				},
			},
		);
	}, [lenis]);

	const imagesForHof = [
		"china.jpg",
		"abc.jpg",
		"abc.jpg",
		"abc.jpg",
		"abc.jpg",
	];

	return (
		<>
			<div className="img-container w-full fixed h-100 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] perspective-midrange">
				{/* Intro cards */}
				<div className="img-card left rounded-3xl w-75 h-[80%] absolute z-5 left-[50%] top-[50%] bottom-0 translate-x-[-50%] translate-y-[-50%] overflow-hidden">
					<img
						src="images/simon-gauzy.avif"
						alt="simon-gauzy"
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="img-card middle rounded-3xl w-75 h-full absolute z-10 left-[50%] bottom-0 translate-x-[-50%] overflow-hidden">
					<img
						src="images/xuxin.jpg"
						alt="xuxin"
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="img-card right rounded-3xl w-75 h-[80%] absolute z-5 left-[50%] top-[50%] bottom-0 translate-x-[-50%] translate-y-[-50%] overflow-hidden ">
					<img
						src="images/koki-niwa.jpg"
						alt="koki-niwa"
						className="w-full h-full object-cover"
					/>
				</div>

				{/* Popping img card */}
				<div className="img-card first-pop rounded-3xl w-75 h-[80%] absolute z-5 left-[50%] top-[50%] bottom-0 translate-x-[-50%] translate-y-[-50%] overflow-hidden invisible">
					<img
						src="images/china.jpg"
						alt="simon-gauzy"
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="img-card second-pop rounded-3xl w-75 h-[80%] absolute z-5 left-[50%] top-[50%] bottom-0 translate-x-[-50%] translate-y-[-50%] overflow-hidden invisible">
					<img
						src="images/simon-gauzy.avif"
						alt="simon-gauzy"
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="img-card third-pop rounded-3xl w-75 h-[80%] absolute z-5 left-[50%] top-[50%] bottom-0 translate-x-[-50%] translate-y-[-50%] overflow-hidden invisible">
					<img
						src="images/koki-niwa.jpg"
						alt="koki-niwa"
						className="w-full h-full object-cover"
					/>
				</div>
			</div>
			<div className="hof-img-container fixed top-[50%] translate-y-[-50%] h-100 w-full perspective-midrange">
				{/* Hall of fame cards */}
				{imagesForHof.map((image) => {
					return (
						<div
							className={`img-card hof-card rounded-3xl w-75 h-full absolute z-40 left-[50%] translate-x-[-50%] overflow-hidden`}
						>
							<img
								src={`images/${image}`}
								alt="hof1"
								className="w-full h-full object-cover"
							/>
						</div>
					);
				})}
			</div>

			{/* Hero section */}
			<section className="hero h-dvh px-10 flex flex-col justify-between relative">
				<div className="hero-text text-9xl text-center anton-regular absolute z-[-1] w-full top-[50%] translate-y-[-50%]">
					LEGENDARY PLAYERS
				</div>
				{/* 
				<div className="text text-4xl">Best of the best</div> */}
			</section>

			{/* Xuxin section */}
			<section className="xu-xin h-dvh flex items-center w-full">
				<div className="text-container text-5xl font-bold flex-1 text-center text-white">
					XU XIN
				</div>
				{/* Same width as the img container */}
				<div className="w-75 h-full"></div>
				<div className="text-5xl font-bold flex-1 text-center text-white">
					XUPERMAN
				</div>
			</section>

			{/* Simon Gauzy section */}
			<section className="simon-gauzy h-dvh flex items-center">
				<div className="text-container text-5xl font-bold flex-1 text-center text-white">
					SIMON GAUZY
				</div>
				{/* Same width as the img container */}
				<div className="w-75 h-full"></div>
				<div className="text-5xl font-bold flex-1 text-center text-white">
					MAGICIAN
				</div>
			</section>

			{/* Koki Niwa section */}
			<section className="koki-niwa h-dvh flex items-center">
				<div className="text-container text-5xl font-bold flex-1 text-center text-white">
					KOKI NIWA
				</div>
				{/* Same width as the img container */}
				<div className="w-75 h-full"></div>
				<div className="text-5xl font-bold flex-1 text-center text-white">
					GENIUS
				</div>
			</section>

			{/* Hall of fame section */}
			<section className="hall-of-fame h-dvh flex items-center">
				<div className="flex-1 text-center text-5xl font-bold">
					ACHIEVEMENTS
				</div>
				<div className="w-75"></div>
				<div className="flex-1"></div>
			</section>
		</>
	);
}

const App = () => {
	return (
		<ReactLenis root>
			<MainContent />
		</ReactLenis>
	);
};

export default App;
