module.exports = {
	purge: {
		content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
		options: {
			safelist: [
				"bg-gray-500",
				"bg-red-500",
				"bg-yellow-500",
				"bg-green-500",
				"bg-blue-500",
				"bg-indigo-500",
				"bg-purple-500",
				"bg-pink-500",
			],
		},
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
