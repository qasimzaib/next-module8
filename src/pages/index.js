import { useRef } from "react";

export default function Home() {
	const emailInputRef = useRef();
	const feedbackInputRef = useRef();

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
		</div>
	);
}
