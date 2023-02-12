import { stocks, fd, gold, mf, assets } from "../models/assets.js";
import { incomeStocks, incomeFd, incomeGold, incomeMf, income } from "../models/income.js";
import expenses from "../models/expenses.js";
import errorChecker from "../utils/errorChecker.js";

const deleteAsset = async (req, res) => {
	switch (req.params.assetType) {
		case "stock":
			{
				let deleteData1 = await stocks.findOne({ stockId: req.body.stockId });
				let deleteData2 = await incomeStocks.findOne({ stockId: req.body.stockId });
				stocks.deleteOne({ stockId: req.body.stockId }, (err, doc) => errorChecker(err, doc, res, "Could not delete stock!", 0));
				incomeStocks.deleteOne({ stockId: req.body.stockId }, (err, doc) => errorChecker(err, doc, res, "Could not delete stock!", 0));
				income.updateOne(
					{ userId: req.user._doc.userId },
					{
						$pull: { stocks: deleteData2._id },
					},
					(err, doc) => errorChecker(err, doc, res, "Could not delete stock!", 0)
				);
				assets.updateOne(
					{ userId: req.user._doc.userId },
					{
						$pull: { stocks: deleteData1._id },
					},
					(err, doc) => errorChecker(err, doc, res, "Could not delete stock!", 1)
				);
			}
			break;
		case "fd":
			{
				let deleteData1 = await fd.findOne({ fdId: req.body.fdId });
				let deleteData2 = await incomeFd.findOne({ fdId: req.body.fdId });
				fd.deleteOne({ fdId: req.body.fdId }, (err, doc) => errorChecker(err, doc, res, "Could not delete fd!", 0));
				incomeFd.deleteOne({ fdId: req.body.fdId }, (err, doc) => errorChecker(err, doc, res, "Could not delete fd!", 0));
				income.updateOne(
					{ userId: req.user._doc.userId },
					{
						$pull: { fixedDeposit: deleteData2._id },
					},
					(err, doc) => errorChecker(err, doc, res, "Could not delete fd!", 0)
				);
				assets.updateOne(
					{ userId: req.user._doc.userId },
					{
						$pull: { fixedDeposit: deleteData1._id },
					},
					(err, doc) => errorChecker(err, doc, res, "Could not delete fd!", 1)
				);
			}
			break;
		case "gold":
			{
				let deleteData1 = await gold.findOne({ goldId: req.body.goldId });
				let deleteData2 = await incomeGold.findOne({ goldId: req.body.goldId });
				gold.deleteOne({ goldId: req.body.goldId }, (err, doc) => errorChecker(err, doc, res, "Could not delete gold!", 0));
				incomeGold.deleteOne({ goldId: req.body.goldId }, (err, doc) => errorChecker(err, doc, res, "Could not delete gold!", 0));
				income.updateOne(
					{ userId: req.user._doc.userId },
					{
						$pull: { gold: deleteData2._id },
					},
					(err, doc) => errorChecker(err, doc, res, "Could not delete gold!", 0)
				);
				assets.updateOne(
					{ userId: req.user._doc.userId },
					{
						$pull: { gold: deleteData1._id },
					},
					(err, doc) => errorChecker(err, doc, res, "Could not delete gold!", 1)
				);
			}
			break;
		case "mf":
			{
				let deleteData1 = await mf.findOne({ mfId: req.body.mfId });
				let deleteData2 = await incomeMf.findOne({ mfId: req.body.mfId });
				mf.deleteOne({ mfId: req.body.mfId }, (err, doc) => errorChecker(err, doc, res, "Could not delete mutual fund!", 0));
				incomeMf.deleteOne({ mfId: req.body.mfId }, (err, doc) => errorChecker(err, doc, res, "Could not delete mutual fund!", 0));
				income.updateOne(
					{ userId: req.user._doc.userId },
					{
						$pull: { mutualFund: deleteData2._id },
					},
					(err, doc) => errorChecker(err, doc, res, "Could not delete mutual fund!", 0)
				);
				assets.updateOne(
					{ userId: req.user._doc.userId },
					{
						$pull: { mutualFund: deleteData1._id },
					},
					(err, doc) => errorChecker(err, doc, res, "Could not delete mutual fund!", 1)
				);
			}
			break;
		case "savings":
			assets.updateOne(
				{ userId: req.user._doc.userId },
				{
					$set: {
						cash: 0,
						bankAccountBalance: 0,
					},
				},
				(err, doc) => errorChecker(err, doc, res, "Could not delete from assets!", 0)
			);
			income.updateOne(
				{ userId: req.user._doc.userId },
				{
					$set: {
						cash: 0,
						bankAccountBalance: 0,
					},
				},
				(err, doc) => errorChecker(err, doc, res, "Could not delete from income!", 1)
			);
			break;
	}
};

const deleteExpense = async (req, res) => {
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
		(err, doc) => errorChecker(err, doc, res, "Expense not found!", 1)
	);
};

export { deleteAsset, deleteExpense };
