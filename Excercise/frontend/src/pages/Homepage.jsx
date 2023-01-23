import React, { useState, useEffect } from "react";
import { excerciseFetch } from "../axios/ExcerciseFetch";

function Homepage() {
	const [workouts, setWorkouts] = useState(null);

	useEffect(() => {
		const fetchWorkouts = async () => {
			const response = await excerciseFetch("/workouts");
			const data = response.data;

			if (data.status === "success") {
				setWorkouts(data.data);
			}
		};
		fetchWorkouts();
	}, []);

	return (
		<div className="home">
			<div className="workouts">
				{workouts &&
					workouts.map((workout) => (
						<p key={workout._id}>{workout.title}</p>
					))}
			</div>
		</div>
	);
}

export default Homepage;
