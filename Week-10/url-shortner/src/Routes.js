import { BrowserRouter, Route, Routes as RouterRoutes } from "react-router-dom";
import Home from "./Pages/Home";
import ShowInfo from "./Pages/ShowInfo";
import AboutUs from "./Pages/AboutUs";
import Policies from "./Pages/Policies";
import ReportABug from "./Pages/ReportABug";
import ContactUs from "./Pages/ContactUs";
import Feedback from "./Pages/Feedback";
import NotFound404 from "./Pages/NotFound404/NotFound404";

export default function Routes() {
	return (
		<BrowserRouter>
			<RouterRoutes>
				<Route exact path="/" element={<Home />} />
				<Route exact path="/showinfo" element={<ShowInfo />} />
				<Route exact path="/aboutus" element={<AboutUs />} />
				<Route exact path="/ourteam" element={<AboutUs />} />
				<Route exact path="/contactus" element={<ContactUs />} />
				<Route exact path="/policies" element={<Policies />} />
				<Route exact path="/reportabug" element={<ReportABug />} />
				<Route exact path="/feedback" element={<Feedback />} />
				<Route path="*" element={<NotFound404 />} />
			</RouterRoutes>
		</BrowserRouter>
	);
}
