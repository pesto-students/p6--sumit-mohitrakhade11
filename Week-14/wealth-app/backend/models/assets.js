import mongoose, { Schema } from "mongoose";

const stocksSchema = new mongoose.Schema({
	stockId: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	buyDate: {
		type: Date,
		required: true,
	},
	buyPrice: {
		type: Number,
		required: true,
	},
	sellDate: {
		type: Date,
	},
	sellPrice: {
		type: Number,
	},
});
mongoose.model("Stocks", stocksSchema);

const fixedDepositSchema = new mongoose.Schema({
	fdId: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	startDate: {
		type: Date,
		required: true,
	},
	principal: {
		type: Number,
		required: true,
	},
	maturityDate: {
		type: Date,
	},
	maturityAmount: {
		type: Number,
	},
});
mongoose.model("FD", fixedDepositSchema);

const goldSchema = new mongoose.Schema({
	goldId: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	quantityInGrams: {
		type: Number,
		required: true,
	},
	buyDate: {
		type: Date,
		required: true,
	},
	buyPricePerGram: {
		type: Number,
		required: true,
	},
	sellDate: {
		type: Date,
	},
	sellPricePerGram: {
		type: Number,
	},
});
mongoose.model("Gold", goldSchema);

const mutualFundSchema = new mongoose.Schema({
	mfId: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	buyDate: {
		type: Date,
		required: true,
	},
	buyNAV: {
		type: Number,
		required: true,
	},
	sellDate: {
		type: Date,
	},
	sellNAV: {
		type: Number,
	},
});
mongoose.model("MF", mutualFundSchema);

const assetsSchema = mongoose.Schema({
	assetId: {
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
			ref: "Stocks",
		},
	],
	fixedDeposit: [
		{
			type: Schema.Types.ObjectId,
			ref: "FD",
		},
	],
	gold: [
		{
			type: Schema.Types.ObjectId,
			ref: "Gold",
		},
	],
	mutualFund: [
		{
			type: Schema.Types.ObjectId,
			ref: "MF",
		},
	],
	cash: {
		type: Number,
	},
	bankAccountBalance: {
		type: Number,
	},
});

export const stocks = mongoose.model("Stocks", stocksSchema);
export const fd = mongoose.model("FD", fixedDepositSchema);
export const gold = mongoose.model("Gold", goldSchema);
export const mf = mongoose.model("MF", mutualFundSchema);
export const assets = mongoose.model("Assets", assetsSchema);
