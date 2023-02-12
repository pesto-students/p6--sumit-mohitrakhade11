import { stocks, fd, gold, mf, assets } from "../models/assets.js";
import expenses from "../models/expenses.js";
import { incomeStocks, incomeFd, incomeGold, incomeMf, income } from "../models/income.js";
import { sendEmail } from "../utils/mail.js";
import { v4 } from "uuid";
import addAsset from "../utils/addAsset.js";
import addIncome from "../utils/addIncome.js";

const createAsset = async (req, res) => {
	switch (req.params.assetType) {
		case "stock":
			assets.findOne({ userId: req.user._doc.userId }, function (err, asset) {
				const newStock = new stocks({
					stockId: v4(),
					name: req.body.name,
					quantity: req.body.quantity,
					buyDate: req.body.buyDate,
					buyPrice: req.body.buyPrice,
					sellDate: req.body?.sellDate,
					sellPrice: req.body?.sellPrice,
				});
				newStock.save((err, doc) => {
					if (err) {
						return res.status(400).json({ success: false, message: err.message });
					}
				});
				if (newStock.sellDate && newStock.sellPrice) {
					const newIncomeStock = new incomeStocks({
						stockId: newStock.stockId,
						profitOrLoss: (newStock.sellPrice - newStock.buyPrice) * newStock.quantity,
						date: newStock.sellDate,
					});
					newIncomeStock.save((err, doc) => {
						if (err) {
							return res.status(400).json({ success: false, message: err.message });
						}
					});
					income.findOne({ userId: req.user._doc.userId }, function (err, income) {
						addIncome(income, req.params.assetType, newIncomeStock, req, res);
					});
				}
				addAsset(asset, req.params.assetType, newStock, req, res);
			});
			break;
		case "fd":
			assets.findOne({ userId: req.user._doc.userId }, function (err, asset) {
				const newFd = new fd({
					fdId: v4(),
					name: req.body.name,
					startDate: req.body.startDate,
					principal: req.body.principal,
					maturityDate: req.body?.maturityDate,
					maturityAmount: req.body?.maturityAmount,
				});
				newFd.save((err, doc) => {
					if (err) {
						return res.status(400).json({ success: false, message: err.message });
					}
				});
				if (newFd.maturityDate && newFd.maturityAmount) {
					const newIncomeFD = new incomeFd({
						fdId: newFd.fdId,
						profit: newFd.maturityAmount - newFd.principal,
						date: newFd.maturityDate,
					});
					newIncomeFD.save((err, doc) => {
						if (err) {
							return res.status(400).json({ success: false, message: err.message });
						}
					});
					income.findOne({ userId: req.user._doc.userId }, function (err, income) {
						addIncome(income, req.params.assetType, newIncomeFD, req, res);
					});
				}
				addAsset(asset, req.params.assetType, newFd, req, res);
			});
			break;
		case "gold":
			assets.findOne({ userId: req.user._doc.userId }, function (err, asset) {
				const newGold = new gold({
					goldId: v4(),
					name: "Gold",
					quantityInGrams: req.body.quantityInGrams,
					buyDate: req.body.buyDate,
					buyPricePerGram: req.body.buyPricePerGram,
					sellDate: req.body?.sellDate,
					sellPricePerGram: req.body?.sellPricePerGram,
				});
				newGold.save((err, doc) => {
					if (err) {
						return res.status(400).json({ success: false, message: err.message });
					}
				});
				if (newGold.sellDate && newGold.sellPricePerGram) {
					const newIncomeGold = new incomeGold({
						goldId: newGold.goldId,
						profitOrLoss: (newGold.sellPricePerGram - newGold.buyPricePerGram) * newGold.quantityInGrams,
						date: newGold.sellDate,
					});
					newIncomeGold.save((err, doc) => {
						if (err) {
							return res.status(400).json({ success: false, message: err.message });
						}
					});
					income.findOne({ userId: req.user._doc.userId }, function (err, income) {
						addIncome(income, req.params.assetType, newIncomeGold, req, res);
					});
				}
				addAsset(asset, req.params.assetType, newGold, req, res);
			});
			break;
		case "mf":
			assets.findOne({ userId: req.user._doc.userId }, function (err, asset) {
				const newMF = new mf({
					mfId: v4(),
					name: req.body.name,
					quantity: req.body.quantity,
					buyDate: req.body.buyDate,
					buyNAV: req.body.buyNAV,
					sellDate: req.body?.sellDate,
					sellNAV: req.body?.sellNAV,
				});
				newMF.save((err, doc) => {
					if (err) {
						return res.status(400).json({ success: false, message: err.message });
					}
				});
				if (newMF.sellDate && newMF.sellNAV) {
					const newIncomeMF = new incomeMf({
						mfId: newMF.mfId,
						profitOrLoss: (newMF.sellNAV - newMF.buyNAV) * newMF.quantity,
						date: newMF.sellDate,
					});
					newIncomeMF.save((err, doc) => {
						if (err) {
							return res.status(400).json({ success: false, message: err.message });
						}
					});
					income.findOne({ userId: req.user._doc.userId }, function (err, income) {
						addIncome(income, req.params.assetType, newIncomeMF, req, res);
					});
				}
				addAsset(asset, req.params.assetType, newMF, req, res);
			});
			break;
		case "savings":
			income.findOne({ userId: req.user._doc.userId }, function (err, income) {
				if (income) {
					income.cash = req.body?.cash;
					income.bankAccountBalance = req.body?.bankAccountBalance;
					income.save((err, doc) => {
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
					newIncome.cash = req.body?.cash;
					newIncome.bankAccountBalance = req.body?.bankAccountBalance;
					newIncome.save((err, income) => {
						if (err) {
							return res.status(400).json({ success: false, message: err.message });
						}
						sendEmail(req.user._doc.firstName, req.user._doc.email, income, "income");
					});
				}
			});
			assets.findOne({ userId: req.user._doc.userId }, function (err, asset) {
				if (asset) {
					asset.cash = req.body?.cash;
					asset.bankAccountBalance = req.body?.bankAccountBalance;
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
					newAsset.cash = req.body?.cash;
					newAsset.bankAccountBalance = req.body?.bankAccountBalance;
					newAsset.save((err, asset) => {
						if (err) {
							return res.status(400).json({ success: false, message: err.message });
						}
						sendEmail(req.user._doc.firstName, req.user._doc.email, asset, "asset");
						return res.status(200).json({
							success: true,
							data: asset,
						});
					});
				}
			});
			break;
	}
};

const createExpense = async (req, res) => {
	const newExpense = new expenses({
		expenseId: v4(),
		userId: req.user._doc.userId,
		description: req.body.description,
		amount: req.body.amount,
		category: req.body.category,
		date: req.body.date,
	});
	newExpense.save((err, doc) => {
		if (err) {
			return res.status(400).json({ success: false, message: err.message });
		} else {
			sendEmail(req.user._doc.firstName, req.user._doc.email, doc, "expense");
			return res.status(200).json({
				success: true,
				data: doc,
			});
		}
	});
};

export { createAsset, createExpense };
