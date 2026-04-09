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
import Loading from "./components/Loading.jsx";

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

		let mm = gsap.matchMedia();
		mm.add(
			{
				isDesktop: "(min-width: 1024px)",
				isTablet: "(min-width: 768px) and (max-width: 1023px)",
				isMobile: "(max-width: 767px)",
			},
			(context) => {
				let { isDesktop, isTablet, isMobile } = context.conditions;

				let popSpreadX = isDesktop ? 250 : isTablet ? 170 : 100;
				let fullCardWidth = isMobile ? "100%" : "50%";
				let cardOpacity = isMobile ? 0.25 : 1;

				const middleCard =
					document.querySelector(".img-card.middle") ||
					document.querySelector(".img-card");
				const leftCard = document.querySelector(".img-card.left");

				let midCardWidthPx = middleCard
					? middleCard.getBoundingClientRect().width
					: isMobile
						? 200
						: 300;
				let sideCardWidthPx = leftCard
					? leftCard.getBoundingClientRect().width
					: isMobile
						? 180
						: 250;

				let spreadX = midCardWidthPx / 2 + sideCardWidthPx * 0.3;

				let smallCardWidth = midCardWidthPx + "px";
				let smallCardHeight = middleCard
					? middleCard.getBoundingClientRect().height + "px"
					: "auto";

				let scrollEnd = isMobile ? 1200 : 2000;
				let hofSpread = isDesktop ? 350 : isTablet ? 350 : 240;
				const split = SplitText.create(".hero-text", { type: "words" });
				const firstWord = SplitText.create(split.words[0], { type: "chars" });
				const secondWord = SplitText.create(split.words[1], { type: "chars" });
				gsap.set(document.body, { overflow: "hidden" });

				gsap.set([".left", ".right"], {
					autoAlpha: 0,
				});
				gsap.set(".img-card", {
					xPercent: -50,
					yPercent: -50,
				});
				gsap.set([".hof-img-container"], {
					yPercent: -50,
				});
				gsap.set(".img-container", {
					xPercent: -50,
					yPercent: -50,
				});

				const introTl = gsap.timeline({
					paused: true,
					onComplete: () => {
						gsap.set(document.body, { overflow: "" });
						lenis?.start();
						ScrollTrigger.refresh();
					},
				});

				introTl
					.to(".loading-container", {
						autoAlpha: 0,
						duration: 0.5,
						ease: "power2.inOut",
					})
					.from(firstWord.chars, {
						y: 100,
						stagger: 0.075,
						ease: "power1.out",
						autoAlpha: 0,
						delay: 0.2,
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
					.to(".left", {
						x: -spreadX,
						rotate: -3,
						duration: 0.75,
						autoAlpha: 1,
					})
					.to(
						".right",
						{
							x: spreadX,
							rotate: 3,
							duration: 0.75,
							autoAlpha: 1,
						},
						"<",
					)
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
					autoAlpha: 0,
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
						x: popSpreadX,
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
						ease: "power2.out",
						scrollTrigger: {
							trigger: ".first-section",
							start: "center bottom",
							toggleActions: "play none none reverse",
							onLeaveBack: () => {
								gsap.set(".first-pop", {
									x: 0,
									rotateY: 0,
									height: "",
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
						fastScrollEnd: true,
						preventOverlaps: true,
					},
				});

				//Card animation
				firstSectionTl.fromTo(
					".img-container",
					{ height: "60vh" },
					{ height: "100%", immediateRender: false },
				);
				firstSectionTl.fromTo(
					".img-container .middle, .img-container .pop-card",
					{
						left: "50%",
						width: smallCardWidth,
						height: "100%",
						xPercent: -50,
						borderRadius: "24px",
						opacity: 1,
					},
					{
						width: fullCardWidth,
						height: "100%",
						left: "0",
						xPercent: 0,
						borderRadius: 0,
						opacity: cardOpacity,
						immediateRender: false,
					},
					"<",
				);

				//TEXT ANIMATION
				firstSectionTl.from(".first-name", {
					yPercent: 200,
				});

				firstSectionTl.from(".first-info-title", {
					yPercent: 200,
				});

				firstSectionTl.from(
					[
						".first-nationality",
						".first-height",
						".first-nickname",
						".first-playing-style",
					],
					{
						autoAlpha: 0,
						stagger: 0.5,
					},
				);

				firstSectionTl.from(".first-ranking", {
					yPercent: 200,
				});

				firstSectionTl.from(".first-ranking-no", {
					autoAlpha: 0,
				});

				firstSectionTl.from(".first-stats-title", {
					yPercent: 200,
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
					".img-container .middle, .img-container .pop-card",
					{
						left: "50%",
						width: smallCardWidth,
						height: "100%",
						xPercent: -50,
						borderRadius: "24px",
						opacity: 1,
					},
					"<",
				);

				gsap.fromTo(
					".second-pop",
					{
						x: -popSpreadX,
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
						scrollTrigger: {
							trigger: ".second-section",
							start: "center bottom",
							toggleActions: "play none none reverse",
							onLeaveBack: () => {
								gsap.set(".second-pop", {
									x: 0,
									rotateY: 0,
									height: "",
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
						fastScrollEnd: true,
						preventOverlaps: true,
					},
				});

				secondSectionTl.fromTo(
					".img-container",
					{ height: "60vh" },
					{ height: "100%", immediateRender: false },
				);

				secondSectionTl.fromTo(
					".img-container .middle, .img-container .pop-card",
					{
						left: "50%",
						width: smallCardWidth,
						height: "100%",
						xPercent: -50,
						borderRadius: "24px",
						opacity: 1,
					},
					{
						width: fullCardWidth,
						height: "100%",
						left: "0",
						xPercent: 0,
						borderRadius: 0,
						opacity: cardOpacity,
						immediateRender: false,
					},
					"<",
				);

				secondSectionTl.from(".second-name", {
					yPercent: 200,
				});

				secondSectionTl.from(".second-info-title", {
					yPercent: 200,
				});

				secondSectionTl.from(
					[
						".second-nationality",
						".second-height",
						".second-nickname",
						".second-playing-style",
					],
					{
						autoAlpha: 0,
						stagger: 0.5,
					},
				);

				secondSectionTl.from(".second-ranking", {
					yPercent: 200,
				});

				secondSectionTl.from(".second-ranking-no", {
					autoAlpha: 0,
				});

				secondSectionTl.from(".second-stats-title", {
					yPercent: 200,
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
					".img-container .middle, .img-container .pop-card",
					{
						left: "50%",
						width: smallCardWidth,
						height: "100%",
						xPercent: -50,
						borderRadius: "24px",
						opacity: 1,
					},
					"<",
				);

				gsap.fromTo(
					".third-pop",
					{
						x: popSpreadX,
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
						visibility: "visible",
						scrollTrigger: {
							trigger: ".third-section",
							start: "center bottom",
							toggleActions: "play none none reverse",
							onLeaveBack: () => {
								gsap.set(".third-pop", {
									x: 0,
									rotateY: 0,
									height: "",
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
						fastScrollEnd: true,
						preventOverlaps: true,
					},
				});

				thirdSectionTl.fromTo(
					".img-container",
					{ height: "60vh" },
					{ height: "100%", immediateRender: false },
				);

				thirdSectionTl.fromTo(
					".img-container .middle, .img-container .pop-card",
					{
						left: "50%",
						width: smallCardWidth,
						height: "100%",
						xPercent: -50,
						borderRadius: "24px",
						opacity: 1,
					},
					{
						width: fullCardWidth,
						height: "100%",
						left: "0",
						xPercent: 0,
						borderRadius: 0,
						opacity: cardOpacity,
						immediateRender: false,
					},
					"<",
				);

				thirdSectionTl.from(".third-name", {
					yPercent: 200,
				});

				thirdSectionTl.from(".third-info-title", {
					yPercent: 200,
				});

				thirdSectionTl.from(
					[
						".third-nationality",
						".third-height",
						".third-nickname",
						".third-playing-style",
					],
					{
						autoAlpha: 0,
						stagger: 0.5,
					},
				);

				thirdSectionTl.from(".third-ranking", {
					yPercent: 200,
				});

				thirdSectionTl.from(".third-ranking-no", {
					autoAlpha: 0,
				});

				thirdSectionTl.from(".third-stats-title", {
					yPercent: 200,
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
					".img-container .middle, .img-container .pop-card",
					{
						left: "50%",
						width: smallCardWidth,
						height: "100%",
						xPercent: -50,
						borderRadius: "24px",
						opacity: 1,
					},
					"<",
				);

				// Hall of fame horizontal scroll animation
				const cards = gsap.utils.toArray(".hof-card");
				gsap.set(cards, {
					x: (i) => i * hofSpread,
				});

				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: ".hall-of-fame",
						start: "top top",
						end: "+=" + scrollEnd,
						scrub: 0.5,
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

				const playIntro = () => {
					setTimeout(() => {
						if (!introTl.isActive() && introTl.paused()) {
							introTl.play();
						}
					}, 200);
				};

				if (document.readyState === "complete") {
					playIntro();
				} else {
					window.addEventListener("load", playIntro, { once: true });
				}
			},
		);
	}, [lenis]);

	return (
		<>
			<div className="loading-container fixed inset-0 z-100 bg-olive-100 flex justify-center items-center pointer-events-none">
				<Loading />
			</div>
			<div className="img-container w-full fixed h-[60vh] max-[900px]:h-[40vh] top-[50%] left-[50%] perspective-midrange z-2">
				{/* Intro cards */}
				<div className="img-card left aspect-[2/3] w-auto rounded-3xl h-[80%] absolute z-5 left-[50%] top-[50%] overflow-hidden">
					<img
						src="images/simon-gauzy.avif"
						alt="simon-gauzy"
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="img-card middle aspect-[2/3] w-auto rounded-3xl h-full absolute z-10 left-[50%] top-[50%] overflow-hidden">
					<img
						src="images/ma-long.webp"
						alt="ma-long"
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="img-card right aspect-[2/3] w-auto rounded-3xl h-[80%] absolute z-5 left-[50%] top-[50%] overflow-hidden">
					<img
						src="images/truls-moregardh.webp"
						alt="truls-moregardh"
						className="w-full h-full object-cover"
					/>
				</div>

				{/* Popping img card */}
				<div className="img-card pop-card first-pop aspect-[2/3] w-auto rounded-3xl h-full absolute z-5 left-[50%] top-[50%] overflow-hidden invisible">
					<img
						src="images/ma-long.jpg"
						alt="ma-long"
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="img-card pop-card second-pop aspect-[2/3] w-auto rounded-3xl h-full absolute z-5 left-[50%] top-[50%] overflow-hidden invisible">
					<img
						src="images/simon-gauzy.avif"
						alt="simon-gauzy"
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="img-card pop-card third-pop aspect-[2/3] w-auto rounded-3xl h-full absolute z-5 left-[50%] top-[50%] overflow-hidden invisible">
					<img
						src="images/truls-moregardh-1.webp"
						alt="truls moregardh"
						className="w-full h-full object-cover"
					/>
				</div>
			</div>
			<div className="hof-img-container fixed top-[50%] h-[60vh] z-50 w-full perspective-midrange">
				{/* Hall of fame cards */}
				{imagesForHof.map((image) => {
					return (
						<div
							key={image} // Adding key here just in case!
							className={`img-card hof-card aspect-[2/3] w-auto rounded-3xl h-full absolute z-5 left-[50%] top-[50%] overflow-hidden`}
						>
							<img
								src={`images/${image}`}
								alt={image}
								className="w-full h-full object-cover"
							/>
						</div>
					);
				})}
			</div>

			{/* Hero section */}
			<section className="hero h-dvh px-5 md:px-10 flex flex-col justify-between relative bg-olive-100 text-emerald-700">
				<div className="hero-text text-5xl md:text-7xl lg:text-9xl text-center anton-regular absolute left-0 z-1 w-full top-[50%] translate-y-[-50%]">
					LEGENDARY PLAYERS
				</div>

				<div className="wrapper text text-4xl md:text-5xl lg:text-7xl font-bold absolute bottom-10 anton-regular flex flex-col">
					<span className="text-mask overflow-hidden shrink-0">
						<p className="hero-secondary-text">BEST OF</p>
					</span>
					<span className="text-mask overflow-hidden shrink-0">
						<p className="hero-secondary-text">THE BEST</p>
					</span>
				</div>
			</section>

			{/* First section */}
			<section className="first-section h-dvh flex items-center w-full inter-regular text-stone-700">
				<div className="first-player w-full md:w-[50%] h-full ml-auto px-4 sm:px-6 md:px-8 border-box overflow-y-auto flex flex-col">
					<div className="flex flex-col min-h-full justify-center py-4 sm:py-6 md:py-8">
						<div className="text-mask overflow-hidden shrink-0 mb-2 md:mb-4 [@media(max-height:800px)]:mb-2">
							<h1 className="anton-regular first-name text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl [@media(max-height:800px)]:text-5xl [@media(max-height:600px)]:text-4xl font-bold text-stone-800 leading-none lg:leading-tight">
								MA LONG
							</h1>
						</div>
						<div className="wrapper display flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 h-auto sm:my-2 md:my-4 [@media(max-height:800px)]:gap-3 [@media(max-height:600px)]:gap-2">
							<div className="info flex flex-col justify-center h-auto">
								<ul className="first-info gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-5 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl [@media(max-height:800px)]:text-base [@media(max-height:600px)]:text-sm grid grid-rows-3 h-auto lg:mb-2 xl:mb-4">
									<li className="flex flex-col md:flex-row md:gap-2 lg:gap-4">
										<div className="first-nationality flex-1 bg-gray-200 rounded-lg py-1 px-2 sm:py-1.5 sm:px-3 md:py-2 md:px-4 lg:py-3 xl:py-4 flex gap-1.5 lg:gap-3 items-center [@media(max-height:800px)]:py-1.5 [@media(max-height:800px)]:px-3">
											<img
												src="/images/china-flag.jpg"
												alt="china flag"
												className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 rounded-full shrink-0"
											/>
											<span className="leading-tight">
												<span className="font-semibold whitespace-nowrap">
													Nationality:
												</span>{" "}
												China
											</span>
										</div>
										<div className="first-height bg-gray-200 flex-1 rounded-lg py-1 px-2 sm:py-1.5 sm:px-3 md:py-2 md:px-4 lg:py-3 xl:py-4 flex items-center gap-1.5 lg:gap-3 [@media(max-height:800px)]:py-1.5 [@media(max-height:800px)]:px-3">
											<img
												src="/images/height.png"
												alt="height"
												className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 shrink-0"
											/>
											<span className="leading-tight">
												<span className="font-semibold whitespace-nowrap">
													Height:
												</span>{" "}
												5'9
											</span>
										</div>
									</li>
									<li className="first-nickname bg-gray-200 rounded-lg py-1 px-2 sm:py-1.5 sm:px-3 md:py-2 md:px-4 lg:py-3 xl:py-4 flex gap-1.5 lg:gap-3 items-center [@media(max-height:800px)]:py-1.5 [@media(max-height:800px)]:px-3">
										<img
											src="/images/dragon-logo.png"
											alt="china flag"
											className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 rounded-full shrink-0"
										/>
										<span className="leading-tight">
											<span className="font-semibold whitespace-nowrap">
												Nickname:
											</span>{" "}
											The Dragon
										</span>
									</li>
									<li className="first-playing-style bg-gray-200 rounded-lg py-1 px-2 sm:py-1.5 sm:px-3 md:py-2 md:px-4 lg:py-3 xl:py-4 flex items-center gap-1.5 lg:gap-3 [@media(max-height:800px)]:py-1.5 [@media(max-height:800px)]:px-3">
										<img
											src="/images/racket.png"
											alt="china flag"
											className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 shrink-0"
										/>
										<span className="leading-tight">
											<span className="font-semibold whitespace-nowrap">
												Playing style:
											</span>{" "}
											Right-handed, shakehand grip
										</span>
									</li>
								</ul>
							</div>
							<div className="flex flex-col h-auto shrink-0 justify-center mt-1 lg:mt-4 [@media(max-height:800px)]:mt-1">
								<div className="text-mask overflow-hidden shrink-0">
									<div className="first-ranking border-l-4 px-2 py-0 border-stone-700 text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl [@media(max-height:800px)]:text-lg anton-regular mb-1 sm:mb-2 md:mb-3 font-semibold">
										Highest WR
									</div>
								</div>
								<div className="first-ranking-no font-semibold text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl [@media(max-height:800px)]:text-4xl [@media(max-height:600px)]:text-3xl">
									# 1
								</div>
							</div>
							<div className="first-stats flex flex-col justify-center h-auto shrink-0 mt-3 sm:mt-5 lg:mt-8 [@media(max-height:800px)]:mt-3">
								<div className="text-mask overflow-hidden shrink-0 mb-2 sm:mb-3 md:mb-4 lg:mb-6 [@media(max-height:800px)]:mb-2">
									<h2 className="first-stats-title border-l-4 px-2 py-0 border-stone-700 text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl [@media(max-height:800px)]:text-lg anton-regular font-semibold">
										STATS
									</h2>
								</div>
								<ul className="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 h-auto [@media(max-height:800px)]:gap-2">
									{maLongStats.map((stats, i) => (
										<li
											key={i}
											className="flex items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl [@media(max-height:800px)]:text-sm shrink-0"
										>
											<span className="w-16 sm:w-20 md:w-24 lg:w-32 xl:w-40 flex items-center gap-1 sm:gap-2 shrink-0">
												<img
													src={stats.image}
													alt="china flag"
													className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 shrink-0"
												/>
												<span className="font-semibold">{stats.title}</span>
											</span>
											<ProgressBar score={stats.score} />
											<span className="w-12 sm:w-14 md:w-16 lg:w-20 xl:w-24 text-right">
												{stats.score}/10
											</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Second section */}
			<section className="second-section h-dvh flex items-center w-full inter-regular text-stone-700">
				<div className="second-player w-full md:w-[50%] h-full ml-auto px-4 sm:px-6 md:px-8 border-box overflow-y-auto flex flex-col">
					<div className="flex flex-col min-h-full justify-center py-4 sm:py-6 md:py-8">
						<div className="text-mask overflow-hidden shrink-0 mb-2 md:mb-4 [@media(max-height:800px)]:mb-2">
							<h1 className="anton-regular second-name text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl [@media(max-height:800px)]:text-5xl [@media(max-height:600px)]:text-4xl font-bold text-stone-800 leading-none lg:leading-tight">
								SIMON GAUZY
							</h1>
						</div>
						<div className="wrapper display flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 h-auto sm:my-2 md:my-4 [@media(max-height:800px)]:gap-3 [@media(max-height:600px)]:gap-2">
							<div className="info flex flex-col justify-center h-auto">
								<ul className="second-info gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-5 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl [@media(max-height:800px)]:text-base [@media(max-height:600px)]:text-sm grid grid-rows-3 h-auto lg:mb-2 xl:mb-4">
									<li className="flex flex-col md:flex-row md:gap-2 lg:gap-4">
										<div className="second-nationality flex-1 bg-gray-200 rounded-lg py-1 px-2 sm:py-1.5 sm:px-3 md:py-2 md:px-4 lg:py-3 xl:py-4 flex gap-1.5 lg:gap-3 items-center [@media(max-height:800px)]:py-1.5 [@media(max-height:800px)]:px-3">
											<img
												src="/images/france-flag.png"
												alt="france flag"
												className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 rounded-full shrink-0"
											/>
											<span className="leading-tight">
												<span className="font-semibold whitespace-nowrap">
													Nationality:
												</span>{" "}
												France
											</span>
										</div>
										<div className="second-height bg-gray-200 flex-1 rounded-lg py-1 px-2 sm:py-1.5 sm:px-3 md:py-2 md:px-4 lg:py-3 xl:py-4 flex items-center gap-1.5 lg:gap-3 [@media(max-height:800px)]:py-1.5 [@media(max-height:800px)]:px-3">
											<img
												src="/images/height.png"
												alt="height"
												className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 shrink-0"
											/>
											<span className="leading-tight">
												<span className="font-semibold whitespace-nowrap">
													Height:
												</span>{" "}
												6'0
											</span>
										</div>
									</li>
									<li className="second-nickname bg-gray-200 rounded-lg py-1 px-2 sm:py-1.5 sm:px-3 md:py-2 md:px-4 lg:py-3 xl:py-4 flex gap-1.5 lg:gap-3 items-center [@media(max-height:800px)]:py-1.5 [@media(max-height:800px)]:px-3">
										<img
											src="/images/magician.png"
											alt="magician icon"
											className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 rounded-full shrink-0"
										/>
										<span className="leading-tight">
											<span className="font-semibold whitespace-nowrap">
												Nickname:
											</span>{" "}
											Magician
										</span>
									</li>
									<li className="second-playing-style bg-gray-200 rounded-lg py-1 px-2 sm:py-1.5 sm:px-3 md:py-2 md:px-4 lg:py-3 xl:py-4 flex items-center gap-1.5 lg:gap-3 [@media(max-height:800px)]:py-1.5 [@media(max-height:800px)]:px-3">
										<img
											src="/images/racket.png"
											alt="racket"
											className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 shrink-0"
										/>
										<span className="leading-tight">
											<span className="font-semibold whitespace-nowrap">
												Playing style:
											</span>{" "}
											Right-handed, shakehand grip
										</span>
									</li>
								</ul>
							</div>
							<div className="flex flex-col h-auto shrink-0 justify-center mt-1 lg:mt-4 [@media(max-height:800px)]:mt-1">
								<div className="text-mask overflow-hidden shrink-0">
									<div className="second-ranking border-l-4 px-2 py-0 border-stone-700 text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl [@media(max-height:800px)]:text-lg anton-regular mb-1 sm:mb-2 md:mb-3 font-semibold">
										Highest WR
									</div>
								</div>
								<div className="second-ranking-no font-semibold text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl [@media(max-height:800px)]:text-4xl [@media(max-height:600px)]:text-3xl">
									# 1
								</div>
							</div>
							<div className="second-stats flex flex-col justify-center h-auto shrink-0 mt-3 sm:mt-5 lg:mt-8 [@media(max-height:800px)]:mt-3">
								<div className="text-mask overflow-hidden shrink-0 mb-2 sm:mb-3 md:mb-4 lg:mb-6 [@media(max-height:800px)]:mb-2">
									<h2 className="second-stats-title border-l-4 px-2 py-0 border-stone-700 text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl [@media(max-height:800px)]:text-lg anton-regular font-semibold">
										STATS
									</h2>
								</div>
								<ul className="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 h-auto [@media(max-height:800px)]:gap-2">
									{simonGauzyStats.map((stats, i) => (
										<li
											key={i}
											className="flex items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl [@media(max-height:800px)]:text-sm shrink-0"
										>
											<span className="w-16 sm:w-20 md:w-24 lg:w-32 xl:w-40 flex items-center gap-1 sm:gap-2 shrink-0">
												<img
													src={stats.image}
													alt="stat icon"
													className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 shrink-0"
												/>
												<span className="font-semibold">{stats.title}</span>
											</span>
											<ProgressBar score={stats.score} />
											<span className="w-12 sm:w-14 md:w-16 lg:w-20 xl:w-24 text-right">
												{stats.score}/10
											</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Third section */}
			<section className="third-section h-dvh flex items-center w-full inter-regular text-stone-700">
				<div className="third-player w-full md:w-[50%] h-full ml-auto px-4 sm:px-6 md:px-8 border-box overflow-y-auto flex flex-col">
					<div className="flex flex-col min-h-full justify-center py-4 sm:py-6 md:py-8">
						<div className="text-mask overflow-hidden shrink-0 mb-2 md:mb-4 [@media(max-height:800px)]:mb-2">
							<h1 className="anton-regular third-name text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl [@media(max-height:800px)]:text-5xl [@media(max-height:600px)]:text-4xl font-bold text-stone-800 leading-none lg:leading-tight">
								TRULS MOREGARDH
							</h1>
						</div>
						<div className="wrapper display flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 h-auto sm:my-2 md:my-4 [@media(max-height:800px)]:gap-3 [@media(max-height:600px)]:gap-2">
							<div className="info flex flex-col justify-center h-auto">
								<ul className="third-info gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-5 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl [@media(max-height:800px)]:text-base [@media(max-height:600px)]:text-sm grid grid-rows-3 h-auto lg:mb-2 xl:mb-4">
									<li className="flex flex-col md:flex-row md:gap-2 lg:gap-4">
										<div className="third-nationality flex-1 bg-gray-200 rounded-lg py-1 px-2 sm:py-1.5 sm:px-3 md:py-2 md:px-4 lg:py-3 xl:py-4 flex gap-1.5 lg:gap-3 items-center [@media(max-height:800px)]:py-1.5 [@media(max-height:800px)]:px-3">
											<img
												src="/images/sweden-flag.png"
												alt="sweden flag"
												className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 rounded-full shrink-0"
											/>
											<span className="leading-tight">
												<span className="font-semibold whitespace-nowrap">
													Nationality:
												</span>{" "}
												Sweden
											</span>
										</div>
										<div className="third-height bg-gray-200 flex-1 rounded-lg py-1 px-2 sm:py-1.5 sm:px-3 md:py-2 md:px-4 lg:py-3 xl:py-4 flex items-center gap-1.5 lg:gap-3 [@media(max-height:800px)]:py-1.5 [@media(max-height:800px)]:px-3">
											<img
												src="/images/height.png"
												alt="height"
												className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 shrink-0"
											/>
											<span className="leading-tight">
												<span className="font-semibold whitespace-nowrap">
													Height:
												</span>{" "}
												5'11
											</span>
										</div>
									</li>
									<li className="third-nickname bg-gray-200 rounded-lg py-1 px-2 sm:py-1.5 sm:px-3 md:py-2 md:px-4 lg:py-3 xl:py-4 flex gap-1.5 lg:gap-3 items-center [@media(max-height:800px)]:py-1.5 [@media(max-height:800px)]:px-3">
										<img
											src="/images/wizard.png"
											alt="wizard icon"
											className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 rounded-full shrink-0"
										/>
										<span className="leading-tight">
											<span className="font-semibold whitespace-nowrap">
												Nickname:
											</span>{" "}
											Swedish Wizard
										</span>
									</li>
									<li className="third-playing-style bg-gray-200 rounded-lg py-1 px-2 sm:py-1.5 sm:px-3 md:py-2 md:px-4 lg:py-3 xl:py-4 flex items-center gap-1.5 lg:gap-3 [@media(max-height:800px)]:py-1.5 [@media(max-height:800px)]:px-3">
										<img
											src="/images/racket.png"
											alt="racket"
											className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 shrink-0"
										/>
										<span className="leading-tight">
											<span className="font-semibold whitespace-nowrap">
												Playing style:
											</span>{" "}
											Right-handed, shakehand grip
										</span>
									</li>
								</ul>
							</div>
							<div className="flex flex-col h-auto shrink-0 justify-center mt-1 lg:mt-4 [@media(max-height:800px)]:mt-1">
								<div className="text-mask overflow-hidden shrink-0">
									<div className="third-ranking border-l-4 px-2 py-0 border-stone-700 text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl [@media(max-height:800px)]:text-lg anton-regular mb-1 sm:mb-2 md:mb-3 font-semibold">
										Highest WR
									</div>
								</div>
								<div className="third-ranking-no font-semibold text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl [@media(max-height:800px)]:text-4xl [@media(max-height:600px)]:text-3xl">
									# 1
								</div>
							</div>
							<div className="third-stats flex flex-col justify-center h-auto shrink-0 mt-3 sm:mt-5 lg:mt-8 [@media(max-height:800px)]:mt-3">
								<div className="text-mask overflow-hidden shrink-0 mb-2 sm:mb-3 md:mb-4 lg:mb-6 [@media(max-height:800px)]:mb-2">
									<h2 className="third-stats-title border-l-4 px-2 py-0 border-stone-700 text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl [@media(max-height:800px)]:text-lg anton-regular font-semibold">
										STATS
									</h2>
								</div>
								<ul className="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 h-auto [@media(max-height:800px)]:gap-2">
									{trulsMoregardhStats.map((stats, i) => (
										<li
											key={i}
											className="flex items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl [@media(max-height:800px)]:text-sm shrink-0"
										>
											<span className="w-16 sm:w-20 md:w-24 lg:w-32 xl:w-40 flex items-center gap-1 sm:gap-2 shrink-0">
												<img
													src={stats.image}
													alt="stat icon"
													className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 shrink-0"
												/>
												<span className="font-semibold">{stats.title}</span>
											</span>
											<ProgressBar score={stats.score} />
											<span className="w-12 sm:w-14 md:w-16 lg:w-20 xl:w-24 text-right">
												{stats.score}/10
											</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Hall of fame section */}
			<section className="hall-of-fame h-dvh flex flex-col md:flex-row items-center justify-center md:justify-center relative">
				<div className="flex-1 flex justify-center items-center text-center px-4 md:px-8 z-10 absolute top-[15%] md:relative md:top-auto w-full md:w-auto overflow-hidden shrink-0">
					<h1 className="achievement-title text-3xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-stone-800 leading-normal">
						ACHIEVEMENTS
					</h1>
				</div>
				<div className="hidden md:block w-16 md:w-75"></div>
				<div className="hidden md:block flex-1"></div>
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
