import { buildFilePath, extractFeedbackData } from "../api/feedback";

export default function FeedbackPage(props) {
	return (
		<ul>
			{props.feedbackItems.map((item) => (
				<li key={item.id}>{item.text}</li>
			))}
		</ul>
	);
}

export function getStaticProps(context) {
	const filePath = buildFilePath();
	const data = extractFeedbackData(filePath);

	return {
		props: {
			feedbackItems: data,
		},
	};
}
