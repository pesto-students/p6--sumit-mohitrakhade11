import User from "../models/user.js";
import countryToCurrency from "country-to-currency";
import Jwt from "jsonwebtoken";
import { sendEmail } from "../utils/mail.js";
import { v4 } from "uuid";

const register = async (req, res) => {
	const newuser = new User({
		userId: v4(),
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		dob: req.body.dob,
		currency: countryToCurrency[req.body.currency],
		email: req.body.email,
		confirmationToken: Jwt.sign(req.body.email, process.env.SECRET),
	});
	User.findOne({ email: newuser.email }, function (err, user) {
		if (user) return res.status(400).json({ auth: false, message: "email exists" });
		if (!req.body.password) return res.status(400).json({ success: false, message: "password required" });
		newuser.setPassword(req.body.password);
		newuser.save((err, doc) => {
			if (err) {
				return res.status(400).json({ success: false, message: err.message });
			}
			res.status(200).json({
				success: true,
				user: doc,
			});
			sendEmail(newuser.firstName, newuser.email, newuser.confirmationToken, "verificationEmail");
		});
	});
};

const verify = async (req, res) => {
	User.findOne({
		confirmationToken: req.params.confirmationToken,
	})
		.then((user) => {
			if (!user) {
				return res.status(404).send({ message: "User Not found." });
			}
			user.status = "Active";
			user.save((err) => {
				if (err) {
					return res.status(500).send({ message: err });
				} else return res.status(200).send({ message: "user verified" });
			});
		})
		.catch((e) => console.log("error", e));
};

const logIn = async (req, res) => {
	const token = req.cookies.auth;
	User.findByToken(token, (err, user) => {
		if (err) return res(err);
		if (user)
			return res.status(400).json({
				error: true,
				message: "You are already logged in",
			});
		else {
			User.findOne({ email: req.body.email }, function (err, user) {
				if (!user) return res.json({ isAuth: false, message: " Auth failed ,email not found" });
				if (!user.validPassword(req.body.password)) {
					return res.status(400).json({
						stat: "error",
						message: "Wrong Password",
					});
				} else if (user.status !== "Active") {
					return res.status(401).send({
						stat: "error",
						message: "Pending Account. Please Verify Your Email!",
					});
				} else {
					user.generateToken((err, user) => {
						if (err) return res.status(400).send(err);
						res.cookie("auth", user.token).json({
							isAuth: true,
							id: user._id,
							email: user.email,
						});
					});
				}
			});
		}
	});
};

const logOut = (req, res) => {
	req.user.deleteToken(req.token, (err, user) => {
		if (err) return res.status(400).send(err);
		res.sendStatus(200);
	});
};

const profile = (req, res) => {
	res.status(200).json({
		isAuth: true,
		userId: req.user._doc.userId,
		firstName: req.user._doc.firstName,
		lastName: req.user._doc.lastName,
		dob: req.user._doc.dob,
		country: req.user._doc.country,
		email: req.user._doc.email,
	});
};

const isAuth = (req, res) => {
	res.status(200).json({
		success: true,
		message: "user authenticated",
	});
};

export { register, verify, logIn, logOut, profile, isAuth };
