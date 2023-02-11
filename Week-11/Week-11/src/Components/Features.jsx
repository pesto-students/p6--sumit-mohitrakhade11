export default function Features() {
	return (
		<>
			<h1 className="font-bold text-center text-5xl mt-5">Features</h1>
			<section className="p-5 pt-3 mb-5 flex justify-evenly">
				<div className="rounded-lg shadow-lg p-10 flex items-center flex-col">
					<svg className="mb-5 buttonBG p-2 rounded-lg shadow-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={50} height={50}>
						<path fill="none" d="M0 0h24v24H0z" />
						<path
							fill="#f5f5f5"
							d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-3.5-8v2H11v2h2v-2h1a2.5 2.5 0 1 0 0-5h-4a.5.5 0 1 1 0-1h5.5V8H13V6h-2v2h-1a2.5 2.5 0 0 0 0 5h4a.5.5 0 1 1 0 1H8.5z"
						/>
					</svg>
					<p className="font-semibold colorBlue">Lifetime Free Access</p>
				</div>
				<div className="rounded-lg shadow-lg p-10 flex items-center flex-col">
					<svg className="mb-5 buttonBG p-2 rounded-lg shadow-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={50} height={50}>
						<path fill="none" d="M0 0h24v24H0z" />
						<path fill="#f5f5f5" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z" />
					</svg>
					<p className="font-semibold colorBlue">Short Link Info</p>
				</div>
				<div className="rounded-lg shadow-lg p-10 flex items-center flex-col">
					<svg className="mb-5 buttonBG p-2 rounded-lg shadow-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={50} height={50}>
						<path fill="none" d="M0 0h24v24H0z" />
						<path
							fill="#f5f5f5"
							d="M2 5l7-3 6 3 6.303-2.701a.5.5 0 0 1 .697.46V19l-7 3-6-3-6.303 2.701a.5.5 0 0 1-.697-.46V5zm13 14.764V7.176l-.065.028L9 4.236v12.588l.065-.028L15 19.764z"
						/>
					</svg>
					<p className="font-semibold colorBlue">Location Statistics</p>
				</div>
			</section>
		</>
	);
}
