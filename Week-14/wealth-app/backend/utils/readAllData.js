import { stocks, fd, gold, mf, assets } from "../models/assets.js";
import expenses from "../models/expenses.js";
import { incomeStocks, incomeFd, incomeGold, incomeMf, income } from "../models/income.js";

export default async function readAllData(req, res, startDate, endDate) {
	let userId = req.user._doc.userId;
	let userCash = (await income.findOne({ userId: userId })).cash || 0;
	let userBankBalance = (await income.findOne({ userId: userId })).bankAccountBalance || 0;
	let userExpenses = await expenses.find({
		userId: userId,
		date: {
			$gte: startDate,
			$lte: endDate,
		},
	});
	let userAssets = await assets.findOne({ userId: userId });
	let userStocks = await Promise.all(
		userAssets.stocks.map(async (_id) => {
			return await stocks.findById(_id);
		})
	);
	userStocks = userStocks.filter((stock) => stock.sellDate >= startDate && stock.sellDate <= endDate);
	let userFDs = await Promise.all(
		userAssets.fixedDeposit.map(async (_id) => {
			return await fd.findById(_id);
		})
	);
	userFDs = userFDs.filter((fd) => fd.maturityDate >= startDate && fd.maturityDate <= endDate);
	let userGold = await Promise.all(
		userAssets.gold.map(async (_id) => {
			return await gold.findById(_id);
		})
	);
	userGold = userGold.filter((gold) => gold.sellDate >= startDate && gold.sellDate <= endDate);
	let userMF = await Promise.all(
		userAssets.mutualFund.map(async (_id) => {
			return await mf.findById(_id);
		})
	);
	userMF = userMF.filter((mf) => mf.sellDate >= startDate && mf.sellDate <= endDate);
	let userIncomeStocks = await Promise.all(
		userStocks.map(async (data) => {
			return await incomeStocks.findOne({ stockId: data.stockId });
		})
	);
	let userIncomeFDs = await Promise.all(
		userFDs.map(async (data) => {
			return await incomeFd.findOne({ fdId: data.fdId });
		})
	);
	let userIncomeGold = await Promise.all(
		userGold.map(async (data) => {
			return await incomeGold.findOne({ goldId: data.goldId });
		})
	);
	let userIncomeMF = await Promise.all(
		userMF.map(async (data) => {
			return await incomeMf.findOne({ mfId: data.mfId });
		})
	);
	return res.status(200).json({
		error: false,
		data: {
			savings: {
				cash: userCash,
				bankAccountBalance: userBankBalance,
			},
			expenses: userExpenses,
			assets: {
				stocks: userStocks,
				fds: userFDs,
				gold: userGold,
				mfs: userMF,
			},
			income: {
				stocks: userIncomeStocks,
				fds: userIncomeFDs,
				gold: userIncomeGold,
				mfs: userIncomeMF,
			},
		},
	});
}
