import fs from "fs";
import path from "path";

export function buildFilePath() {
	return path.join(process.cwd(), "data", "feedback.json");
}

export function extractFeedbackData(filePath) {
	const fileData = fs.readFileSync(filePath);
	const data = JSON.parse(fileData);
	return data;
}

export default function handler(req, res) {
	if (req.method === "POST") {
		const { email, text } = req.body;
		const newFeedback = {
			id: new Date().toISOString(),
			email: email,
			text: text,
		};

		const filePath = buildFilePath();
		const data = extractFeedbackData(filePath);
		data.push(newFeedback);
		fs.writeFileSync(filePath, JSON.stringify(data));

		res.status(201).json({ success: true, feedback: newFeedback });
	} else {
		const filePath = buildFilePath();
		const data = extractFeedbackData(filePath);

		res.status(200).json({ success: true, feedback: data });
	} 
}
