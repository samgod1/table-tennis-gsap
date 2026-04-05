import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import ReactLenis from "lenis/react";
import ProgressBar from "./components/ProgressBar";
import {
	maLongStats,
	imagesForHof,
	simonGauzyStats,
	trulsMoregardhStats,
} from "./constants.js";

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
			.to(".right", { x: 250, rotate: 3, duration: 0.75, autoAlpha: 1 }, "<")
			.from(
				".hero-secondary-text",
				{
					yPercent: 100,
					stagger: 0.5,
				},
				"-=.5",
			);

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
					trigger: ".first-section",
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

		// Background color change of first section
		gsap.fromTo(
			[".hero", ".first-section"],
			{ backgroundColor: "#f4f4f0" },
			{
				backgroundColor: "#ffffff",
				scrollTrigger: {
					trigger: ".first-section",
					start: "center bottom",
					toggleActions: "play none none reverse",
				},
			},
		);

		//FIRST SECTION
		// Expanding animation for first section
		const firstSectionTl = gsap.timeline({
			scrollTrigger: {
				trigger: ".first-section",
				start: "top top",
				end: "+=3000px",
				pin: true,
				scrub: 1,
				anticipatePin: 1,
				immediateRender: false,
			},
		});

		//Card animation
		firstSectionTl.to(".img-container", {
			height: "100%",
		});
		firstSectionTl.to(
			".img-card",
			{
				width: "50%",
				left: "0",
				xPercent: 0,
				borderRadius: 0,
			},
			"<",
		);

		//TEXT ANIMATION
		firstSectionTl.from(".first-name", {
			yPercent: 103,
		});

		firstSectionTl.from(".first-info-title", {
			yPercent: 105,
		});

		firstSectionTl.from(
			[
				".first-nickname",
				".first-height",
				".first-nationality",
				".first-playing-style",
			],
			{
				autoAlpha: 0,
				stagger: 0.5,
			},
		);

		firstSectionTl.from(".first-stats-title", {
			yPercent: 103,
		});

		firstSectionTl.from(
			".first-stats ul li",
			{
				y: 30,
				autoAlpha: 0,
				stagger: 0.2,
				duration: 0.8,
				ease: "power2.out",
			},
			"-=0.2",
		);

		firstSectionTl.from(
			".first-stats ul .progress-bar",
			{
				scaleX: 0,
				stagger: 0.1,
				ease: "power2.out",
				duration: 1,
			},
			"<",
		);

		firstSectionTl.to(".first-player", {
			autoAlpha: 0,
		});

		firstSectionTl.to(".img-container", {
			height: "60vh",
		});
		firstSectionTl.to(
			".img-card",
			{
				left: "50%",
				width: "300px",
				xPercent: -50,
				borderRadius: "24px",
			},
			"<",
		);

		gsap.fromTo(
			".second-pop",
			{
				x: -250,
				rotateY: -70,
				autoAlpha: 0,
			},
			{
				zIndex: 30,
				rotateY: 0,
				x: 0,
				duration: 0.5,
				transformStyle: "preserve-3d",
				height: "100%",
				immediateRender: false,
				autoAlpha: 1,
				overwrite: "auto",
				scrollTrigger: {
					trigger: ".second-section",
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

		// SECOND SECTION
		const secondSectionTl = gsap.timeline({
			scrollTrigger: {
				trigger: ".second-section",
				start: "top top",
				end: "+=3000px",
				pin: true,
				scrub: 1,
				anticipatePin: 1,
				immediateRender: false,
			},
		});

		secondSectionTl.to(".img-container", {
			height: "100%",
		});

		secondSectionTl.to(
			".img-card",
			{
				width: "50%",
				left: "0",
				xPercent: 0,
				borderRadius: 0,
			},
			"<",
		);

		secondSectionTl.from(".second-name", {
			yPercent: 103,
		});

		secondSectionTl.from(".second-info-title", {
			yPercent: 105,
		});

		secondSectionTl.from(
			[
				".second-nickname",
				".second-height",
				".second-nationality",
				".second-playing-style",
			],
			{
				autoAlpha: 0,
				stagger: 0.5,
			},
		);

		secondSectionTl.from(".second-stats-title", {
			yPercent: 103,
		});

		secondSectionTl.from(
			".second-stats ul li",
			{
				y: 30,
				autoAlpha: 0,
				stagger: 0.2,
				duration: 0.8,
				ease: "power2.out",
			},
			"-=0.2",
		);

		secondSectionTl.from(
			".second-stats ul .progress-bar",
			{
				scaleX: 0,
				stagger: 0.1,
				ease: "power2.out",
				duration: 1,
			},
			"<",
		);

		secondSectionTl.to(".second-player", {
			autoAlpha: 0,
		});

		secondSectionTl.to(".img-container", {
			height: "60vh",
		});
		secondSectionTl.to(
			".img-card",
			{
				left: "50%",
				width: "300px",
				xPercent: -50,
				borderRadius: "24px",
			},
			"<",
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
				zIndex: 40,
				duration: 0.2,
				transformStyle: "preserve-3d",
				height: "100%",
				immediateRender: false,
				overwrite: "auto",
				visibility: "visible",
				scrollTrigger: {
					trigger: ".third-section",
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

		// THIRD SECTION
		const thirdSectionTl = gsap.timeline({
			scrollTrigger: {
				trigger: ".third-section",
				start: "top top",
				end: "+=3000px",
				pin: true,
				scrub: 1,
				anticipatePin: 1,
				immediateRender: false,
			},
		});

		thirdSectionTl.to(".img-container", {
			height: "100%",
		});

		thirdSectionTl.to(
			".img-card",
			{
				width: "50%",
				left: "0",
				xPercent: 0,
				borderRadius: 0,
			},
			"<",
		);

		thirdSectionTl.from(".third-name", {
			yPercent: 103,
		});

		thirdSectionTl.from(".third-info-title", {
			yPercent: 105,
		});

		thirdSectionTl.from(
			[
				".third-nickname",
				".third-height",
				".third-nationality",
				".third-playing-style",
			],
			{
				autoAlpha: 0,
				stagger: 0.5,
			},
		);

		thirdSectionTl.from(".third-stats-title", {
			yPercent: 103,
		});

		thirdSectionTl.from(
			".third-stats ul li",
			{
				y: 30,
				autoAlpha: 0,
				stagger: 0.2,
				duration: 0.8,
				ease: "power2.out",
			},
			"-=0.2",
		);

		thirdSectionTl.from(
			".third-stats ul .progress-bar",
			{
				scaleX: 0,
				stagger: 0.1,
				ease: "power2.out",
				duration: 1,
			},
			"<",
		);

		thirdSectionTl.to(".third-player", {
			autoAlpha: 0,
		});

		thirdSectionTl.to(".img-container", {
			height: "60vh",
		});
		thirdSectionTl.to(
			".img-card",
			{
				left: "50%",
				width: "300px",
				xPercent: -50,
				borderRadius: "24px",
			},
			"<",
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

	return (
		<>
			<div className="img-container w-full fixed h-[60vh] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] perspective-midrange z-2">
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
				<div className="img-card pop-card first-pop rounded-3xl w-75 h-[80%] absolute z-5 left-[50%] top-[50%] bottom-0 translate-x-[-50%] translate-y-[-50%] overflow-hidden invisible">
					<img
						src="images/china.jpg"
						alt="simon-gauzy"
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="img-card pop-card second-pop rounded-3xl w-75 h-[80%] absolute z-5 left-[50%] top-[50%] bottom-0 translate-x-[-50%] translate-y-[-50%] overflow-hidden invisible">
					<img
						src="images/simon-gauzy.avif"
						alt="simon-gauzy"
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="img-card pop-card third-pop rounded-3xl w-75 h-[80%] absolute z-5 left-[50%] top-[50%] bottom-0 translate-x-[-50%] translate-y-[-50%] overflow-hidden invisible">
					<img
						src="images/truls-moregardh.webp"
						alt="truls moregardh"
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
			<section className="hero h-dvh px-10 flex flex-col justify-between relative bg-olive-100 text-emerald-700">
				<div className="hero-text text-9xl text-center anton-regular absolute left-0 z-1 w-full top-[50%] translate-y-[-50%]">
					LEGENDARY PLAYERS
				</div>

				<div className="wrapper text text-7xl font-bold absolute bottom-10 anton-regular flex flex-col">
					<span className="text-mask overflow-hidden">
						<p className="hero-secondary-text">BEST OF</p>
					</span>
					<span className="text-mask overflow-hidden">
						<p className="hero-secondary-text">THE BEST</p>
					</span>
				</div>
			</section>

			{/* First section */}
			<section className="first-section h-dvh flex items-center w-full inter-regular text-stone-700">
				<div className="first-player w-[50%] h-full ml-auto p-15 flex flex-col">
					<div className="text-mask overflow-hidden mb-5">
						<h1 className="first-name text-5xl font-bold text-stone-800">
							MA LONG
						</h1>
					</div>
					<div className="info flex-1">
						<div className="text-mask overflow-hidden">
							<h2 className="first-info-title text-3xl mb-2 font-semibold">
								Info
							</h2>
						</div>
						<ul className="first-info flex gap-2 flex-col">
							<li className="first-nickname flex gap-2">
								<div className="bg-gray-200 flex-1 rounded-sm p-3 flex gap-2">
									<img
										src="/images/dragon-logo.png"
										alt="china flag"
										className="w-6 h-6 rounded-full"
									/>
									<span>
										<span className="font-semibold">Nickname</span>: The Dragon
									</span>
								</div>
								<div className="first-height bg-gray-200 flex-1 rounded-sm p-3 flex items-center gap-2">
									<img
										src="/images/height.png"
										alt="height"
										className="w-6 h-6"
									/>
									<span>
										<span className="font-semibold">Height</span>: 5'9
									</span>
								</div>
							</li>
							<li className="first-nationality bg-gray-200 rounded-sm p-3 flex gap-2 items-center">
								<img
									src="/images/china-flag.jpg"
									alt="china flag"
									className="w-6 h-6 rounded-full"
								/>
								<span>
									<span className="font-semibold">Nationality</span>: China
								</span>
							</li>
							<li className="first-playing-style bg-gray-200 rounded-sm p-3 flex items-center gap-2">
								<img
									src="/images/racket.png"
									alt="china flag"
									className="w-6 h-6"
								/>
								<span>
									<span className="font-semibold">Playing style</span>:
									Right-handed, shakehand grip
								</span>
							</li>
						</ul>
					</div>
					<div className="first-stats flex-1 flex flex-col">
						<div className="text-mask overflow-hidden">
							<h2 className="first-stats-title text-3xl mb-2 font-semibold">
								Stats
							</h2>
						</div>
						<ul className="flex flex-col justify-between grow">
							{maLongStats.map((stats, i) => (
								<li key={i} className="flex items-center gap-2 text-xl">
									<span className="w-25 flex items-center gap-2">
										<img
											src={stats.image}
											alt="china flag"
											className="w-6 h-6"
										/>
										<span>{stats.title}</span>
									</span>
									<ProgressBar score={stats.score} />
									<span>{stats.score}/10</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</section>

			{/*Second section */}
			<section className="second-section h-dvh flex items-center ">
				<div className="second-player w-[50%] h-full ml-auto p-15 flex flex-col">
					<div className="text-mask overflow-hidden mb-5">
						<h1 className="second-name text-5xl font-bold text-stone-800">
							SIMON GAUZY
						</h1>
					</div>
					<div className="info flex-1">
						<div className="second-mask overflow-hidden">
							<h2 className="second-info-title text-3xl mb-2 font-semibold">
								Info
							</h2>
						</div>
						<ul className="second-info flex gap-2 flex-col">
							<li className="second-nickname flex gap-2">
								<div className="bg-gray-200 flex-1 rounded-sm p-3 flex gap-2">
									<img
										src="/images/magician.png"
										alt="china flag"
										className="w-6 h-6 rounded-full"
									/>
									<span>
										<span className="font-semibold">Nickname</span>: Magician
									</span>
								</div>
								<div className="second-height bg-gray-200 flex-1 rounded-sm p-3 flex items-center gap-2">
									<img
										src="/images/height.png"
										alt="height"
										className="w-6 h-6"
									/>
									<span>
										<span className="font-semibold">Height</span>: 6'0
									</span>
								</div>
							</li>
							<li className="second-nationality bg-gray-200 rounded-sm p-3 flex gap-2 items-center">
								<img
									src="/images/france-flag.png"
									alt="france flag"
									className="w-6 h-6 rounded-full"
								/>
								<span>
									<span className="font-semibold">Nationality</span>: France
								</span>
							</li>
							<li className="second-playing-style bg-gray-200 rounded-sm p-3 flex items-center gap-2">
								<img
									src="/images/racket.png"
									alt="china flag"
									className="w-6 h-6"
								/>
								<span>
									<span className="font-semibold">Playing style</span>:
									Right-handed, shakehand grip
								</span>
							</li>
						</ul>
					</div>
					<div className="second-stats flex-1 flex flex-col">
						<div className="text-mask overflow-hidden">
							<h2 className="second-stats-title text-3xl mb-2 font-semibold">
								Stats
							</h2>
						</div>
						<ul className="flex flex-col justify-between grow">
							{simonGauzyStats.map((stats, i) => (
								<li key={i} className="flex items-center gap-2 text-xl">
									<span className="w-25 flex items-center gap-2">
										<img
											src={stats.image}
											alt="china flag"
											className="w-6 h-6"
										/>
										<span>{stats.title}</span>
									</span>
									<ProgressBar score={stats.score} />
									<span>{stats.score}/10</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</section>

			{/* Third section */}
			<section className="third-section h-dvh flex items-center">
				<div className="third-player w-[50%] h-full ml-auto p-15 flex flex-col">
					<div className="text-mask overflow-hidden mb-5">
						<h1 className="third-name text-5xl font-bold text-stone-800">
							TRULS MOREGARDH
						</h1>
					</div>
					<div className="info flex-1">
						<div className="text-mask overflow-hidden">
							<h2 className="third-info-title text-3xl mb-2 font-semibold">
								Info
							</h2>
						</div>
						<ul className="third-info flex gap-2 flex-col">
							<li className="third-nickname flex gap-2">
								<div className="bg-gray-200 flex-1 rounded-sm p-3 flex gap-2">
									<img
										src="/images/wizard.png"
										alt="china flag"
										className="w-6 h-6"
									/>
									<span>
										<span className="font-semibold">Nickname</span>: Swedish
										Wizard
									</span>
								</div>
								<div className="third-height bg-gray-200 flex-1 rounded-sm p-3 flex items-center gap-2">
									<img
										src="/images/height.png"
										alt="height"
										className="w-6 h-6"
									/>
									<span>
										<span className="font-semibold">Height</span>: 5'11
									</span>
								</div>
							</li>
							<li className="third-nationality bg-gray-200 rounded-sm p-3 flex gap-2 items-center">
								<img
									src="/images/sweden-flag.png"
									alt="china flag"
									className="w-6 h-6 rounded-full"
								/>
								<span>
									<span className="font-semibold">Nationality</span>: Sweden
								</span>
							</li>
							<li className="third-playing-style bg-gray-200 rounded-sm p-3 flex items-center gap-2">
								<img
									src="/images/racket.png"
									alt="china flag"
									className="w-6 h-6"
								/>
								<span>
									<span className="font-semibold">Playing style</span>:
									Right-handed, shakehand grip
								</span>
							</li>
						</ul>
					</div>
					<div className="third-stats flex-1 flex flex-col">
						<div className="text-mask overflow-hidden">
							<h2 className="third-stats-title text-3xl mb-2 font-semibold">
								Stats
							</h2>
						</div>
						<ul className="flex flex-col justify-between grow">
							{trulsMoregardhStats.map((stats, i) => (
								<li key={i} className="flex items-center gap-2 text-xl">
									<span className="w-25 flex items-center gap-2">
										<img
											src={stats.image}
											alt="china flag"
											className="w-6 h-6"
										/>
										<span>{stats.title}</span>
									</span>
									<ProgressBar score={stats.score} />
									<span>{stats.score}/10</span>
								</li>
							))}
						</ul>
					</div>
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
