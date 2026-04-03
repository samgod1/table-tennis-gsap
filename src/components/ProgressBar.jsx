import { useEffect, useRef } from "react";

const ProgressBar = ({ score }) => {
	const progressBarRef = useRef();
	useEffect(() => {
		calculateProgressBarSize();
	}, []);

	function calculateProgressBarSize() {
		const widthPercent = (score / 10) * 100;
		progressBarRef.current.style.width = `${widthPercent}%`;
	}
	return (
		<div className="progress-bar-container grow h-2">
			<div
				className="progress-bar h-full bg-stone-800 origin-left rounded-2xl"
				ref={progressBarRef}
			></div>
		</div>
	);
};

export default ProgressBar;
