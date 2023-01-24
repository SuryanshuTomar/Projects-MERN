// imports
// packages
import React, { useEffect } from "react";

// pages and componenets
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { excerciseFetch } from "../axios/ExcerciseFetch";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";

// component
function Homepage() {
	const { workouts, dispatchWorkouts } = useWorkoutContext();

	useEffect(() => {
		const fetchWorkouts = async () => {
			const response = await excerciseFetch.get("/workouts");
			const dataObj = response.data;

			if (response.statusText === "OK") {
				dispatchWorkouts({ type: "SET_WORKOUTS", payload: dataObj.data });
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
