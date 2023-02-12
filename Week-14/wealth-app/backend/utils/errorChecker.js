export default function errorChecker(err, doc, res, message, flag) {
	if (!doc) {
		return res.status(404).json({ success: false, message: message });
	} else if (flag) {
		return res.status(200).json({
			success: true,
		});
	}
}
