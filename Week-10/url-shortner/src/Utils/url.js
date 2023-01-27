import { apiBase } from "../APIs";
import { toast } from "react-toastify";

export const createShortURL = async (longURL, code) => {
	return await fetch(`${apiBase}&short=${longURL}&name=${code}`, {
		method: "GET",
	})
		.then((res) => {
			return res.json();
		})
		.then((res) => {
			return res;
		})
		.catch((err) => {
			toast.error("Error inside API1!");
			return console.log(err);
		});
};

export const getShortURLStats = async (shortURL) => {
	return await fetch(`${apiBase}&stats=${shortURL}`, {
		method: "GET",
	})
		.then((res) => {
			return res.json();
		})
		.then((res) => {
			return res;
		})
		.catch((err) => {
			toast.error("Error inside API2!");
			return console.log(err);
		});
};

export const getQRCode = async (shortURL) => {
	return await fetch(`http://api.qrserver.com/v1/create-qr-code/?data=${shortURL}&format=png`, {
		method: "GET",
	})
		.then((res) => {
			return res.blob();
		})
		.then((res) => {
			return URL.createObjectURL(res);
		})
		.catch((err) => {
			toast.error("Error inside API3!");
			return console.log(err);
		});
};
