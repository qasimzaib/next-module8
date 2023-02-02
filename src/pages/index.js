import { useRef, useState } from "react";

export default function Home() {
	const [feedbackItems, setFeedbackItems] = useState([]);
	const emailInputRef = useRef();
	const feedbackInputRef = useRef();

	function loadFeedbackHandler(event) {
		event.preventDefault();

		fetch("/api/feedback", {})
			.then((response) => response.json())
			.then((data) => setFeedbackItems(data.feedback));
	}

	function submitHandler(event) {
		event.preventDefault();
		const email = emailInputRef.current.value;
		const feedback = feedbackInputRef.current.value;

		const requestBody = {
			email: email,
			text: feedback,
		};

		fetch("/api/feedback", {
			method: "POST",
			body: JSON.stringify(requestBody),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => console.log(data));
	}

	return (
		<div>
			<h1>Home</h1>
			<form onSubmit={submitHandler}>
				<div>
					<label htmlFor="email">Your Email Address</label>
					<input type="email" id="email" ref={emailInputRef}></input>
				</div>
				<div>
					<label htmlFor="feedback">Your Feedback</label>
					<textarea rows="5" id="feedback" ref={feedbackInputRef}></textarea>
				</div>
				<button>Send Feedback</button>
			</form>
			<hr />
			<button onClick={loadFeedbackHandler}>Get Feedback</button>
			<ul>
				{feedbackItems.map((item) => (
					<li key={item.id}>{item.text}</li>
				))}
			</ul>
		</div>
	);
}
