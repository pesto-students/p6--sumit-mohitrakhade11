import mongoose from "mongoose";
import crypto from "crypto";
import Jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const userSchema = mongoose.Schema({
	userId: {
		type: String,
		required: true,
		unique: true,
	},
	firstName: {
		type: String,
		required: true,
		maxlength: 100,
		trim: true,
	},
	lastName: {
		type: String,
		required: false,
		maxlength: 100,
		trim: true,
	},
	dob: {
		type: Date,
		required: true,
		validate: {
			validator: function (dob) {
				const a = new Date(dob),
					b = new Date();
				const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
				const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
				const difference = Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24)) / 365;
				if (difference > 18) {
					return true;
				} else {
					return false;
				}
			},
			message: (props) => `Age should be greater than 18`,
		},
	},
	currency: {
		type: String,
		required: true,
		maxlength: 10,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	hash: {
		type: String,
		default: "",
		required: true,
	},
	salt: {
		type: String,
		default: "",
		required: true,
	},
	status: {
		type: String,
		enum: ["Pending", "Active"],
		required: true,
		default: "Pending",
	},
	confirmationToken: {
		type: String,
		unique: true,
	},
	token: {
		type: String,
	},
});

userSchema.methods.setPassword = function (password) {
	this.salt = crypto.randomBytes(16).toString("hex");
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
};

userSchema.methods.validPassword = function (password) {
	const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
	return this.hash === hash;
};

userSchema.methods.generateToken = function (cb) {
	const user = this;
	const token = Jwt.sign(user._id.toHexString(), process.env.SECRET);
	user.token = token;
	user.save(function (err, user) {
		if (err) return cb(err);
		cb(null, user);
	});
};

userSchema.statics.findByToken = function (token, cb) {
	const user = this;
	Jwt.verify(token, process.env.SECRET, function (err, decode) {
		user.findOne({ _id: decode, token: token }, function (err, user) {
			if (err) return cb(err);
			cb(null, user);
		});
	});
};

userSchema.methods.deleteToken = function (token, cb) {
	const user = this;
	user.update({ $unset: { token: 1 } }, function (err, user) {
		if (err) return cb(err);
		cb(null, user);
	});
};

export default mongoose.model("User", userSchema);
