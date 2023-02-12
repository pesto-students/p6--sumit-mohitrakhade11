import User from "../models/user.js";

const auth = (req, res, next) => {
	const token = req.cookies.auth;
	User.findByToken(token, (err, user) => {
		if (err) throw err;
		if (!user)
			return res.status(403).json({
				error: true,
				message: "Please login again!",
			});
		req.token = token;
		req.user = user;
		next();
	});
};

export { auth };
