// imports
// packages
import React, { useState, useEffect } from "react";

// pages and componenets
import { excerciseFetch } from "../axios/ExcerciseFetch";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

// component
function Homepage() {
	const [workouts, setWorkouts] = useState(null);

	useEffect(() => {
		const fetchWorkouts = async () => {
			const response = await excerciseFetch.get("/workouts");
			const dataObj = response.data;

			if (dataObj.status === "success") {
				setWorkouts(dataObj.data);
			}
		};
		fetchWorkouts();
	}, []);

	return (
		<div className="home">
			<div className="workouts">
				{workouts &&
					workouts.map((workout) => (
						<WorkoutDetails key={workout._id} workout={workout} />
					))}
			</div>
         <WorkoutForm />
		</div>
	);
}

export default Homepage;
