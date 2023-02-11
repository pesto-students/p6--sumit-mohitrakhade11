import { Link, useLocation } from "react-router-dom";
import Logo from "../Assets/Logo.svg";

export default function Navbar() {
	const pageName1 = useLocation();
	return (
		<header className="shadow-lg flex justify-around items-center p-5">
			<Link to="/">
				<img src={Logo} alt="App Logo" width={"350px"} />
			</Link>
			<nav>
				<ul className="flex justify-between">
					<li>
						<Link
							to="/"
							className={
								pageName1.pathname === "/"
									? "mr-5 font-medium text-sm uppercase rounded-md px-3 py-2 tracking-wide text-white buttonBG active"
									: "mr-5 font-medium text-sm uppercase rounded-md px-3 py-2 tracking-wide text-white buttonBG"
							}
						>
							Home
						</Link>
					</li>
					<li>
						<Link
							to="/showinfo"
							className={
								pageName1.pathname === "/showinfo"
									? "ml-5 font-medium text-sm uppercase rounded-md px-3 py-2 tracking-wide text-white buttonBG active"
									: "ml-5 font-medium text-sm uppercase rounded-md px-3 py-2 tracking-wide text-white buttonBG"
							}
						>
							Show Info
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}
