import { useSelector } from "react-redux";
import URLs from "./URLs";

export default function DisplayURLs() {
	const data = useSelector((state) => state);
	return (
		Object.entries(data).length > 1 && (
			<section className="flex flex-col">
				<h1 className="font-bold text-center text-5xl my-5">URLs</h1>
				{Object.entries(data).map((item, index) => {
					return index !== Object.entries(data).length - 1 && <URLs key={index} index={index} data={item} />;
				})}
			</section>
		)
	);
}
