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
		<div className="progress-bar-container grow h-2 lg:h-3 2xl:h-4 rounded-full bg-gray-400">
			<div
				className="progress-bar h-full bg-stone-800 origin-left rounded-full"
				ref={progressBarRef}
			></div>
		</div>
	);
};

export default ProgressBar;
