import Navbar from "./Components/Navbar";
import ScrollButton from "./Components/ScrollButton";
import Footer from "./Components/Footer";

export default function Base({ children }) {
	return (
		<>
			<Navbar />
			{children}
			<ScrollButton />
			<Footer />
		</>
	);
}
