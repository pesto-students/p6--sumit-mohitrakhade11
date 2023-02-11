import "./style.css";
import BG from "../../Assets/404Error/404BG.png";
import Stars from "../../Assets/404Error/Stars.svg";
import SVG404 from "../../Assets/404Error/404.svg";
import Rocket from "../../Assets/404Error/Rocket.svg";
import Earth from "../../Assets/404Error/Earth.svg";
import Moon from "../../Assets/404Error/Moon.svg";
import Astronaut from "../../Assets/404Error/Astronaut.svg";

export default function NotFound404() {
	return (
		<div className="fakediv">
			<div className="bg-purple" style={{ backgroundImage: `url(${BG})` }}>
				<div className="stars" style={{ backgroundImage: `url(${Stars})` }}>
					<div className="central-body">
						<img className="image-404" src={SVG404} width="300px" alt="404_Image" />
					</div>
					<div className="objects">
						<img className="object_rocket" src={Rocket} width="40px" alt="404_Image" />
						<div className="earth-moon">
							<img className="object_earth" src={Earth} width="100px" alt="404_Image" />
							<img className="object_moon" src={Moon} width="80px" alt="404_Image" />
						</div>
						<div className="box_astronaut">
							<img className="object_astronaut" src={Astronaut} width="140px" alt="404_Image" />
						</div>
					</div>
					<div className="glowing_stars">
						<div className="star" />
						<div className="star" />
						<div className="star" />
						<div className="star" />
						<div className="star" />
					</div>
				</div>
			</div>
		</div>
	);
}
