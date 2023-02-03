import { buildFilePath, extractFeedbackData } from "./feedback";

export default function handler(req, res) {
	const feedbackId = req.query.feedbackId;
	const filePath = buildFilePath();
	const feedbackData = extractFeedbackData(filePath);

	const feedback = feedbackData.find((feedback) => feedback.id === feedbackId);

	res.status(200).json({ success: true, feedback: feedback });
}
