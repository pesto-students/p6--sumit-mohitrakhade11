import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getShortURLStats } from "../Utils/url";
import { useState } from "react";
import { updateURLStats } from "../redux/storingData";
import ClipLoader from "react-spinners/ClipLoader";

export default function URLsInfo({ index, data }) {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const refreshStats = async (e, shortURL) => {
		e.preventDefault();
		if (shortURL) {
			await getShortURLStats(shortURL)
				.then((res) => {
					dispatch(updateURLStats([data[0], res.stats]));
					setLoading(false);
					toast.success("Short URL Stats Updated successfully!");
				})
				.catch((err) => {
					toast.error("Error inside getShortURLStats!");
					console.log(err);
				});
		} else {
			setLoading(false);
			return toast.error("Short URL empty!");
		}
	};
	return (
		<div className="shadow-xl rounded-md mx-16 p-10 mb-5">
			<div className="flex justify-between items-center">
				<h2 className="font-bold uppercase">
					{index + 1}. {data[1].url.title}
				</h2>
				<button
					onClick={(e) => {
						setLoading(true);
						refreshStats(e, data[1].url.shortURL);
					}}
					className="flex justify-center items-center w-44 h-12 font-medium text-sm uppercase rounded-md tracking-wide text-white buttonBG"
				>
					<ClipLoader color="#f5f5f5" loading={loading} size={15} />
					{!loading && "Refresh Info"}
				</button>
			</div>
			<table className="ml-5 mt-5">
				<thead>
					<tr>
						<th>Field</th>
						<th>Value</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<b>Clicks</b>
						</td>
						<td>{data[1].stats.clicks}</td>
					</tr>
					<tr>
						<td>
							<b>Facebook</b>
						</td>
						<td>{data[1].stats.facebook}</td>
					</tr>
					<tr>
						<td>
							<b>Twitter</b>
						</td>
						<td>{data[1].stats.twitter}</td>
					</tr>
					<tr>
						<td>
							<b>Pinterest</b>
						</td>
						<td>{data[1].stats.pinterest}</td>
					</tr>
					<tr>
						<td>
							<b>Instagram</b>
						</td>
						<td>{data[1].stats.instagram}</td>
					</tr>
					<tr>
						<td>
							<b>Google+</b>
						</td>
						<td>{data[1].stats.googlePlus}</td>
					</tr>
					<tr>
						<td>
							<b>LinkedIn</b>
						</td>
						<td>{data[1].stats.linkedin}</td>
					</tr>
					<tr>
						<td>
							<b>Rest</b>
						</td>
						<td>{data[1].stats.rest}</td>
					</tr>
					<tr>
						<td>
							<b>Bots</b>
						</td>
						<td>{data[1].stats.bots}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
