export default function ScrollButton() {
	return (
		<button
			className="flex justify-center items-center fixed z-50 bottom-6 right-6 h-16 w-16 border-0 p-0 rounded-full scrollUp"
			onClick={() => {
				window.scrollTo({
					top: 0,
					behavior: "smooth",
				});
			}}
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={35} height={35}>
				<path fill="none" d="M0 0h24v24H0z" />
				<path d="M13 12v8h-2v-8H4l8-8 8 8z" fill="#f5f5f5" />
			</svg>
		</button>
	);
}
