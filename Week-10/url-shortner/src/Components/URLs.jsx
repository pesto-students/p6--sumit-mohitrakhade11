import { deleteURL } from "../redux/storingData";
import { useDispatch } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";

export default function URLs({ index, data }) {
	const dispatch = useDispatch();
	return (
		<>
			<h2 className="mx-16 font-bold uppercase">
				{index + 1}. {data[1].url.title}
			</h2>
			<div className="flex mx-16 justify-between items-center mb-5">
				<CopyToClipboard text={data[1].url.longURL} onCopy={() => toast.success("Copied")}>
					<input value={data[1].url.longURL} className="cursor-pointer mr-5 font-medium text-sm rounded-md px-4 py-2 shadow h-12 w-full" type="text" placeholder="Long URL" readOnly />
				</CopyToClipboard>
				<CopyToClipboard text={data[1].url.shortURL} onCopy={() => toast.success("Copied")}>
					<input value={data[1].url.shortURL} className="cursor-pointer mr-5 font-medium text-sm rounded-md px-4 py-2 shadow h-12 w-2/5" type="text" placeholder="Short URL" readOnly />
				</CopyToClipboard>
				<img src={data[1].qrCode} alt="qr_code" width={"75px"} height={"75px"} />
				<button className="m-0 ml-5 p-2 rounded-md buttonBG border-0 text-white" type="submit" onClick={() => dispatch(deleteURL(data[0]))}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20}>
						<path fill="none" d="M0 0h24v24H0z" />
						<path d="M7 4V2h10v2h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4h5zM6 6v14h12V6H6zm3 3h2v8H9V9zm4 0h2v8h-2V9z" fill="#fff" />
					</svg>
				</button>
			</div>
		</>
	);
}
