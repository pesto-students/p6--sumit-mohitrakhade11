import { useDispatch } from "react-redux";
import { addURL } from "../redux/storingData";
import { createShortURL, getShortURLStats, getQRCode } from "../Utils/url";
import { toast } from "react-toastify";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function URLShortner() {
	const [loading, setLoading] = useState(false);
	const [values, setValues] = useState({
		longURLInput: "",
		codeInput: "",
	});
	const { longURLInput, codeInput } = values;
	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};
	const dispatch = useDispatch();
	const addLink = async (e, longURL, code) => {
		e.preventDefault();
		if (longURL) {
			const resAPI1 = await createShortURL(longURL, code);
			if (resAPI1.url.status === 1) {
				toast.error("Link already shortened!");
				setValues({
					longURLInput: "",
					codeInput: "",
				});
				setLoading(false);
				return;
			} else if (resAPI1.url.status === 2) {
				toast.error("The long URL is not a link!");
				setValues({
					longURLInput: "",
					codeInput: "",
				});
				setLoading(false);
				return;
			} else if (resAPI1.url.status === 3) {
				toast.error("The code is already taken!");
				setValues({
					longURLInput: "",
					codeInput: "",
				});
				setLoading(false);
				return;
			} else if (resAPI1.url.status === 4) {
				toast.error("Invalid API Key!");
				setValues({
					longURLInput: "",
					codeInput: "",
				});
				setLoading(false);
				return;
			} else if (resAPI1.url.status === 5) {
				toast.error("The long URL has invalid characters!");
				setValues({
					longURLInput: "",
					codeInput: "",
				});
				setLoading(false);
				return;
			} else if (resAPI1.url.status === 6) {
				toast.error("The domain of long URL is blocked!");
				setValues({
					longURLInput: "",
					codeInput: "",
				});
				setLoading(false);
				return;
			} else if (resAPI1.url.status === 7) {
				let tempData = {};
				const resAPI2 = await getShortURLStats(resAPI1.url.shortLink);
				await getQRCode(resAPI1.url.shortLink)
					.then((resAPI3) => {
						tempData["url"] = {
							title: resAPI1.url.title,
							longURL: resAPI1.url.fullLink,
							shortURL: resAPI1.url.shortLink,
							code: resAPI1.url.shortLink.slice(16),
						};
						tempData["stats"] = resAPI2.stats;
						tempData["qrCode"] = resAPI3;
						dispatch(addURL(tempData));
						setValues({
							longURLInput: "",
							codeInput: "",
						});
						setLoading(false);
						toast.success("Short URL successfully created!");
					})
					.catch((err) => {
						toast.error("Error inside getQRCode!");
						console.log(err);
					});
			}
		} else {
			setLoading(false);
			return toast.error("Long URL empty!");
		}
	};
	return (
		<section className="text-center mx-40 mb-10">
			<form className="flex justify-between">
				<input
					className="mr-5 font-medium text-sm rounded-md px-8 py-5 shadow flex-grow"
					type="text"
					placeholder="Enter the Long URL"
					required
					name="longURLInput"
					value={longURLInput}
					onChange={handleChange("longURLInput")}
				/>
				<input
					className="mr-5 font-medium text-sm rounded-md px-8 py-5 shadow"
					type="text"
					placeholder="Enter the custom code"
					required
					name="codeInput"
					value={codeInput}
					onChange={handleChange("codeInput")}
				/>
				<button
					onClick={(e) => {
						setLoading(true);
						addLink(e, longURLInput, codeInput);
					}}
					className="flex justify-center items-center ml-5 w-36 font-medium text-sm uppercase rounded-md px-8 py-5 tracking-wide text-white buttonBG"
					type="submit"
				>
					<ClipLoader color="#f5f5f5" loading={loading} size={15} />
					{!loading && "Short It!"}
				</button>
			</form>
		</section>
	);
}
