import { buildFilePath, extractFeedbackData } from "../api/feedback";
import { Fragment, useState } from "react";

export default function FeedbackPage(props) {
	const [feedbackData, setFeedbackData] = useState();
	function loadFeedbackHandler(id) {
		fetch(`/api/${id}`)
			.then((response) => response.json())
			.then((data) => setFeedbackData(data.feedback));
	}

	return (
		<Fragment>
			{feedbackData && <p>{feedbackData.email}</p>}
			<ul>
				{props.feedbackItems.map((item) => (
					<li key={item.id}>
						{item.text}
						<button onClick={loadFeedbackHandler.bind(null, item.id)}>
							Details
						</button>
					</li>
				))}
			</ul>
		</Fragment>
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
