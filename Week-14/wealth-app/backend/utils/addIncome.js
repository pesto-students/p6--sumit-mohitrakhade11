import { income } from "../models/income.js";
import { sendEmail } from "./mail.js";
import { v4 } from "uuid";

export default function addIncome(oldIncome, assetType, data, req, res) {
	if (oldIncome) {
		const type = {
			stock: oldIncome.stocks,
			fd: oldIncome.fixedDeposit,
			gold: oldIncome.gold,
			mf: oldIncome.mutualFund,
		};
		type[assetType].push(data._id);
		oldIncome.save((err, doc) => {
			if (err) {
				return res.status(400).json({ success: false, message: err.message });
			}
			sendEmail(req.user._doc.firstName, req.user._doc.email, oldIncome, "income");
		});
	} else {
		const newIncome = new income({
			incomeId: v4(),
			userId: req.user._doc.userId,
		});
		const type = {
			stock: newIncome.stocks,
			fd: newIncome.fixedDeposit,
			gold: newIncome.gold,
			mf: newIncome.mutualFund,
		};
		type[assetType].push(data._id);
		newIncome.save((err, income1) => {
			if (err) {
				return res.status(400).json({ success: false, message: err.message });
			}
			sendEmail(req.user._doc.firstName, req.user._doc.email, income1, "income");
		});
	}
}
