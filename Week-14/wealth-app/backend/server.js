import mongoose from "mongoose";
import app from "./app.js";

const connectDB = async () => {
	try {
		mongoose.connect(process.env.MONOGODBURL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

const start = async () => {
	try {
		await connectDB();
		app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}...`));
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

start();
