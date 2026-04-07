import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Loading = () => {
	useGSAP(() => {
		gsap.to(".dot", {
			keyframes: {
				"0%": { y: 0, ease: "sine.inOut" },
				"50%": { y: -25, ease: "sine.inOut" },
				"100%": { y: 0, ease: "sine.inOut" },
			},
			duration: 1,
			repeat: -1,
			stagger: 0.15,
		});
	});
	return (
		<div className="loading fixed inset-0 flex bg-olive-100 z-100 justify-center items-center text-7xl">
			<div className="dot">•</div>
			<div className="dot">•</div>
			<div className="dot">•</div>
		</div>
	);
};

export default Loading;
