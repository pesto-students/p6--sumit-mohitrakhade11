import Tagline from "../Assets/TagLine.svg";
import URLImage from "../Assets/URLImage.svg";

export default function Hero() {
	return (
		<section className="flex justify-center my-8">
			<img className="mr-14" src={Tagline} width="550px" alt="Tag_line" />
			<img className="ml-14" src={URLImage} width="325px" alt="Tag_line" />
		</section>
	);
}
