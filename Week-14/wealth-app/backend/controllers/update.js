import { stocks, fd, gold, mf, assets } from "../models/assets.js";
import { incomeStocks, incomeFd, incomeGold, incomeMf, income } from "../models/income.js";
import expenses from "../models/expenses.js";
import errorChecker from "../utils/errorChecker.js";

const updateAsset = async (req, res) => {
	switch (req.params.assetType) {
		case "stock":
			stocks.updateOne(
				{ stockId: req.body.stockId },
				{
					$set: {
						name: req.body?.name,
						quantity: req.body?.quantity,
						buyDate: req.body?.buyDate,
						buyPrice: req.body?.buyPrice,
						sellDate: req.body?.sellDate,
						sellPrice: req.body?.sellPrice,
					},
				}
			);
			let newStock = await stocks.findOne({ stockId: req.body.stockId });
			incomeStocks.updateOne(
				{ stockId: req.body.stockId },
				{
					$set: {
						profitOrLoss: (newStock?.sellPrice - newStock?.buyPrice) * newStock?.quantity,
						date: newStock?.sellDate,
					},
				},
				(err, doc) => errorChecker(err, doc, res, "Stock not found!")
			);
			break;
		case "fd":
			fd.updateOne(
				{ fdId: req.body.fdId },
				{
					$set: {
						name: req.body?.name,
						startDate: req.body?.startDate,
						principal: req.body?.principal,
						maturityDate: req.body?.maturityDate,
						maturityAmount: req.body?.maturityAmount,
					},
				}
			);
			let newFD = await fd.findOne({ fdId: req.body.fdId });
			incomeFd.updateOne(
				{ fdId: req.body.fdId },
				{
					$set: {
						profit: newFD?.maturityAmount - newFD?.principal,
						date: newFD?.maturityDate,
					},
				},
				(err, doc) => errorChecker(err, doc, res, "FD not found!")
			);
			break;
		case "gold":
			gold.updateOne(
				{ goldId: req.body.goldId },
				{
					$set: {
						name: req.body?.name,
						quantityInGrams: req.body?.quantityInGrams,
						buyDate: req.body?.buyDate,
						buyPricePerGram: req.body?.buyPricePerGram,
						sellDate: req.body?.sellDate,
						sellPricePerGram: req.body?.sellPricePerGram,
					},
				}
			);
			let newGold = await gold.findOne({ goldId: req.body.goldId });
			incomeGold.updateOne(
				{ goldId: req.body.goldId },
				{
					$set: {
						profitOrLoss: (newGold?.sellPricePerGram - newGold?.buyPricePerGram) * newGold?.quantityInGrams,
						date: newGold?.sellDate,
					},
				},
				(err, doc) => errorChecker(err, doc, res, "gold not found!")
			);
			break;
		case "mf":
			mf.updateOne(
				{ mfId: req.body.mfId },
				{
					$set: {
						name: req.body?.name,
						quantity: req.body?.quantity,
						buyDate: req.body?.buyDate,
						buyNAV: req.body?.buyNAV,
						sellDate: req.body?.sellDate,
						sellNAV: req.body?.sellNAV,
					},
				}
			);
			let newMF = await mf.findOne({ mfId: req.body.mfId });
			incomeMf.updateOne(
				{ mfId: req.body.mfId },
				{
					$set: {
						profitOrLoss: (newMF?.sellNAV - newMF?.buyNAV) * newMF?.quantity,
						date: newMF?.sellDate,
					},
				},
				(err, doc) => errorChecker(err, doc, res, "mf not found!")
			);
			break;
		case "savings":
			assets.updateOne(
				{ userId: req.user._doc.userId },
				{
					$set: {
						cash: req.body?.cash,
						bankAccountBalance: req.body?.bankAccountBalance,
					},
				}
			);
			income.updateOne(
				{ userId: req.user._doc.userId },
				{
					$set: {
						cash: req.body?.cash,
						bankAccountBalance: req.body?.bankAccountBalance,
					},
				},
				(err, doc) => errorChecker(err, doc, res, "asset not found!")
			);
			break;
	}
};

const updateExpense = async (req, res) => {
	expenses.updateOne(
		{ _id: req.body._id },
		{
			$set: {
				description: req.body?.description,
				amount: req.body?.amount,
				category: req.body?.category,
				date: req.body?.date,
			},
		},
		(err, doc) => errorChecker(err, doc, res, "Expense not found!")
	);
};

export { updateAsset, updateExpense };
