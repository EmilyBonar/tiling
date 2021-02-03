import React, { useState, useEffect } from "react";

function App() {
	const size = useWindowSize();
	const [pixels, setPixels] = useState([<Pixel />]);
	useEffect(() => {
		setPixels(
			Array(Math.floor((size.width * size.height) / 24 / 24)).fill(<Pixel />),
		);
	}, [size]);
	console.log(pixels);
	return (
		<div className="flex flex-row flex-wrap overflow-hidden">{pixels}</div>
	);
}

export default App;

function Pixel() {
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
			className={`w-6 h-6 ${bgColor} animate-pulse`}
			style={{ animationDelay: `${-Math.random() * 4}s` }}
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
