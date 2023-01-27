import { Link, useLocation } from "react-router-dom";

export default function Footer() {
	const pageName2 = useLocation();
	return (
		<footer className="p-5">
			<nav className="flex justify-evenly mt-2">
				<ul className="">
					<li className="pb-2">
						<h1 className="uppercase font-extrabold text-2xl">Explore</h1>
					</li>
					<li className="pb-2">
						<Link className={pageName2.pathname === "/aboutus" ? "active font-medium" : "font-medium"} to="/aboutus">
							About Us
						</Link>
					</li>
					<li className="pb-2">
						<Link className={pageName2.pathname === "/ourteam" ? "active font-medium" : "font-medium"} to="/ourteam">
							Our Team
						</Link>
					</li>
				</ul>
				<ul className="">
					<li className="pb-2">
						<h1 className="uppercase font-extrabold text-2xl">Need Help</h1>
					</li>
					<li className="pb-2">
						<Link className={pageName2.pathname === "/contactus" ? "active font-medium" : "font-medium"} to="/contactus">
							Contact Us
						</Link>
					</li>
					<li className="pb-2">
						<Link className={pageName2.pathname === "/policies" ? "active font-medium" : "font-medium"} to="/policies">
							Policies &amp; FAQs
						</Link>
					</li>
					<li className="pb-2">
						<Link className={pageName2.pathname === "/reportabug" ? "active font-medium" : "font-medium"} to="/reportabug">
							Report A Bug
						</Link>
					</li>
					<li className="pb-2">
						<Link className={pageName2.pathname === "/feedback" ? "active font-medium" : "font-medium"} to="/feedback">
							Feedback
						</Link>
					</li>
				</ul>
			</nav>
			<h1 className="text-center font-semibold mt-5 mb-2">
				&copy; 2022&nbsp;
				<a className="underline" href="https://www.linkedin.com/in/devanshdalmia1/" rel="noreferrer" target={"_blank"}>
					Devansh Dalmia
				</a>
				&nbsp;| All Rights Reserved
			</h1>
		</footer>
	);
}
