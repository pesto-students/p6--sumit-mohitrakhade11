import mongoose from "mongoose";

const expensesSchema = mongoose.Schema({
	expenseId: {
		type: String,
		required: true,
		unique: true,
	},
	userId: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	category: {
		type: String,
		enum: ["Rent", "Transportation", "Groceries", "Home & Utilities", "Insurance", "Bills", "Education", "Health", "Food", "Travel", "Shopping", "Misc"],
		required: true,
		default: "Misc",
	},
	date: {
		type: Date,
		required: true,
	},
});

export default mongoose.model("Expenses", expensesSchema);
