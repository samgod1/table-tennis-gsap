import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(SplitText);

function App() {
	useGSAP(() => {
		const split = SplitText.create(".hero-text", { type: "chars" });

		gsap.from(split.chars, {
			y: 100,
			duration: 0.3,
			stagger: 0.1,
		});
	}, []);

	return (
		<>
			<section className="hero h-dvh">
				<div className="hero-text text-9xl text-center">TABLE TENNIS</div>
				<div className="img-container w-full relative">
					<div className="img-card w-75 h-100 absolute z-5 left-1/2 translate-x-[-50%]">
						hello
					</div>
					<div className="img-card w-75 h-100 absolute z-10 left-[50%] translate-x-[-50%]">
						hi
					</div>
					<div className="img-card w-75 h-100 absolute z-5 left-[50%] translate-x-[-50%]">
						bye
					</div>
				</div>
				<div className="text">Play & Enjoy</div>
			</section>
		</>
	);
}

export default App;
