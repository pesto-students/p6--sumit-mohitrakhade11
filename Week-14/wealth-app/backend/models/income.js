import mongoose, { Schema } from "mongoose";

const stockIncomeSchema = new mongoose.Schema({
	stockId: {
		type: String,
		required: true,
		unique: true,
	},
	profitOrLoss: {
		type: Number,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
});
mongoose.model("IncomeStocks", stockIncomeSchema);

const fixedDepositIncomeSchema = new mongoose.Schema({
	fdId: {
		type: String,
		required: true,
		unique: true,
	},
	profit: {
		type: Number,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
});
mongoose.model("IncomeFD", fixedDepositIncomeSchema);

const goldIncomeSchema = new mongoose.Schema({
	goldId: {
		type: String,
		required: true,
		unique: true,
	},
	profitOrLoss: {
		type: Number,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
});
mongoose.model("IncomeGold", goldIncomeSchema);

const mutualFundIncomeSchema = new mongoose.Schema({
	mfId: {
		type: String,
		required: true,
		unique: true,
	},
	profitOrLoss: {
		type: Number,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
});
mongoose.model("IncomeMF", mutualFundIncomeSchema);

const incomeSchema = mongoose.Schema({
	incomeId: {
		type: String,
		required: true,
		unique: true,
	},
	userId: {
		type: String,
		required: true,
		unique: true,
	},
	stocks: [
		{
			type: Schema.Types.ObjectId,
			ref: "IncomeStocks",
		},
	],
	fixedDeposit: [
		{
			type: Schema.Types.ObjectId,
			ref: "IncomeFD",
		},
	],
	gold: [
		{
			type: Schema.Types.ObjectId,
			ref: "IncomeGold",
		},
	],
	mutualFund: [
		{
			type: Schema.Types.ObjectId,
			ref: "IncomeMF",
		},
	],
	cash: {
		type: Number,
	},
	bankAccountBalance: {
		type: Number,
	},
});

export const incomeStocks = mongoose.model("IncomeStocks", stockIncomeSchema);
export const incomeFd = mongoose.model("IncomeFD", fixedDepositIncomeSchema);
export const incomeGold = mongoose.model("IncomeGold", goldIncomeSchema);
export const incomeMf = mongoose.model("IncomeMF", mutualFundIncomeSchema);
export const income = mongoose.model("Income", incomeSchema);
