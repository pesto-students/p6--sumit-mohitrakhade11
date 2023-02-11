import { useSelector } from "react-redux";
import URLsInfo from "./URLsInfo";

export default function DisplayURLsInfo() {
	const data = useSelector((state) => state);
	return Object.entries(data).length > 1 ? (
		<section className="flex flex-col my-10">
			<h1 className="font-bold text-center text-5xl my-5">URL's Info</h1>
			{Object.entries(data).map((item, index) => {
				return index !== Object.entries(data).length - 1 && <URLsInfo key={index} index={index} data={item} />;
			})}
		</section>
	) : (
		<h1 className="font-bold text-center text-5xl my-10">No URLs To Display</h1>
	);
}
