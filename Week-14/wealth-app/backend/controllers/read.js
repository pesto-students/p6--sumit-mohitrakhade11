import { stocks, fd, gold, mf, assets } from "../models/assets.js";
import expenses from "../models/expenses.js";
import readAllData from "../utils/readAllData.js";

const readAsset = async (req, res) => {
	if (req.params.assetType === "savings") {
		assets.findOne({ userId: req.user._doc.userId }, async function (err, asset) {
			if (asset) {
				return res.status(200).json({
					success: true,
					data: {
						cash: asset.cash,
						bankAccountBalance: asset.bankAccountBalance,
					},
				});
			} else {
				return res.status(404).json({ success: false, message: "This user does not have assets!" });
			}
		});
	} else {
		assets.findOne({ userId: req.user._doc.userId }, async function (err, asset) {
			if (asset) {
				const type = {
					stock: {
						len: asset.stocks.length,
						data: asset.stocks,
						function: (id) => stocks.findById(id),
					},
					fd: {
						len: asset.fixedDeposit.length,
						data: asset.fixedDeposit,
						function: (id) => fd.findById(id),
					},
					gold: {
						len: asset.gold.length,
						data: asset.gold,
						function: (id) => gold.findById(id),
					},
					mf: {
						len: asset.mutualFund.length,
						data: asset.mutualFund,
						function: (id) => mf.findById(id),
					},
				};
				if (type[req.params.assetType]["len"]) {
					let returnData = [];
					for (const id of type[req.params.assetType]["data"]) {
						returnData.push(await type[req.params.assetType]["function"](id));
					}
					return res.status(200).json({
						success: true,
						data: returnData,
					});
				} else {
					return res.status(404).json({ success: false, message: `This user does not have ${req.params.assetType} in assets!` });
				}
			} else {
				return res.status(404).json({ success: false, message: "This user does not have assets!" });
			}
		});
	}
};

const readExpense = async (req, res) => {
	expenses.find({ userId: req.user._doc.userId }, async function (err, expenses) {
		if (expenses.length) {
			return res.status(200).json({
				success: true,
				data: expenses,
			});
		} else {
			return res.status(404).json({ success: false, message: `This user does not have expenses!` });
		}
	});
};

const readIncome = async (req, res) => {
	switch (req.params.timeFrame) {
		case "current":
			{
				let startDate = new Date(`${new Date().getFullYear()}-04-01`);
				let endDate = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`);
				readAllData(req, res, startDate, endDate);
			}
			break;
		case "fy":
			{
				let startDate = new Date(`${req.body.start}-04-01`);
				let endDate = new Date(`${req.body.end}-03-31`);
				readAllData(req, res, startDate, endDate);
			}
			break;
		case "month":
			{
				let startDate = new Date(req.body.start);
				let endDate = new Date(req.body.end);
				readAllData(req, res, startDate, endDate);
			}
			break;
	}
};

export { readAsset, readExpense, readIncome };
