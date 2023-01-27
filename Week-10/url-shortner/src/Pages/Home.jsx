import Base from "../Base";
import Hero from "../Components/Hero";
import URLShortner from "../Components/URLShortner";
import Features from "../Components/Features";
import DisplayURLs from "../Components/DisplayURLs";

export default function Home() {
	return (
		<Base>
			<main>
				<Hero />
				<URLShortner />
				<DisplayURLs />
				<Features />
			</main>
		</Base>
	);
}
