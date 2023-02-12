import { assets } from "../models/assets.js";
import { sendEmail } from "./mail.js";
import { v4 } from "uuid";

export default function addAsset(asset, assetType, data, req, res) {
	if (asset) {
		const type = {
			stock: asset.stocks,
			fd: asset.fixedDeposit,
			gold: asset.gold,
			mf: asset.mutualFund,
		};
		type[assetType].push(data._id);
		asset.save((err, doc) => {
			sendEmail(req.user._doc.firstName, req.user._doc.email, asset, "asset");
			return res.status(200).json({
				success: true,
				data: asset,
			});
		});
	} else {
		const newAsset = new assets({
			assetId: v4(),
			userId: req.user._doc.userId,
		});
		const type = {
			stock: newAsset.stocks,
			fd: newAsset.fixedDeposit,
			gold: newAsset.gold,
			mf: newAsset.mutualFund,
		};
		type[assetType].push(data._id);
		newAsset.save((err, asset1) => {
			if (err) {
				return res.status(400).json({ success: false, message: err.message });
			}
			sendEmail(req.user._doc.firstName, req.user._doc.email, asset1, "asset");
			return res.status(200).json({
				success: true,
				data: asset1,
			});
		});
	}
}
