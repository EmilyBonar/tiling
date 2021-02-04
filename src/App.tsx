import React, { useState, useEffect } from "react";

function App() {
	const windowSize = useWindowSize();
	const [pixels, setPixels] = useState<typeof Pixel[]>([]);
	const [pixelSize, setPixelSize] = useState<number>(24);
	useEffect(() => {
		setPixels(
			Array(
				Math.floor(
					(windowSize.width * (windowSize.height + pixelSize)) /
						pixelSize /
						pixelSize,
				),
			).fill(<Pixel size={pixelSize} />),
		);
	}, [windowSize, pixelSize]);

	return (
		<div className="w-screen h-screen overflow-hidden">
			<div className="flex flex-row flex-wrap ">{pixels}</div>
			<div className="absolute p-2 pb-1 transition bg-white rounded bottom-10 hover:opacity-90 opacity-60 left-1/2 right-1/2 w-min">
				<input
					type="range"
					min="16"
					max="100"
					step="2"
					defaultValue="24"
					onChange={(e) => setPixelSize(e.target.valueAsNumber)}
				/>
			</div>
		</div>
	);
}

export default App;

interface PixelProps {
	size: number;
}

function Pixel(props: PixelProps) {
	const colorlist = [
		"gray",
		"red",
		"yellow",
		"green",
		"blue",
		"indigo",
		"purple",
		"pink",
	];
	let bgColor = `bg-${
		colorlist[Math.floor(Math.random() * colorlist.length)]
	}-500`;
	return (
		<div
			className={`${bgColor} animate-pulse`}
			style={{
				animationDelay: `${-Math.random() * 4}s`,
				width: `${props.size}px`,
				height: `${props.size}px`,
			}}
		></div>
	);
}

function useWindowSize() {
	// Initialize state with undefined width/height so server and client renders match

	// Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/

	const [windowSize, setWindowSize] = useState({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		// Handler to call on window resize
		function handleResize() {
			// Set window width/height to state

			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}

		// Add event listener
		window.addEventListener("resize", handleResize);

		// Call handler right away so state gets updated with initial window size
		handleResize();

		// Remove event listener on cleanup
		return () => window.removeEventListener("resize", handleResize);
	}, []); // Empty array ensures that effect is only run on mount

	return windowSize;
}
