import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASSWORD,
	},
});

const sendEmail = (name, email, info, key) => {
	switch (key) {
		case "verificationEmail":
			transport
				.sendMail({
					from: process.env.EMAIL,
					to: email,
					subject: "Please confirm your account",
					html: `<h1>Email Confirmation</h1>
		  <h2>Hello ${name}</h2>
		  <p>Thank you for registering. Please confirm your email by clicking on the following link</p>
		  <a href=http://localhost:8080/api/auth/register/verify/${info}> Click here</a>`,
				})
				.catch((err) => console.log(err));
			break;
		case "asset":
			transport
				.sendMail({
					from: process.env.EMAIL,
					to: email,
					subject: "You added an asset",
					html: `<h1>Asset Added</h1>
		  <h2>Hello ${name}</h2>
		  <p>Thank you for adding an asset.</p>`,
				})
				.catch((err) => console.log(err));
			break;
		case "expense":
			transport
				.sendMail({
					from: process.env.EMAIL,
					to: email,
					subject: "You added an expense",
					html: `<h1>Expense Added</h1>
		  <h2>Hello ${name}</h2>
		  <p>Thank you for adding an expense.</p>`,
				})
				.catch((err) => console.log(err));
			break;
		case "income":
			transport
				.sendMail({
					from: process.env.EMAIL,
					to: email,
					subject: "An income has been added!",
					html: `<h1>Income Added</h1>
		  <h2>Hello ${name}</h2>
		  <p>Thank you for adding an income.</p>`,
				})
				.catch((err) => console.log(err));
			break;
	}
};

export { sendEmail };
