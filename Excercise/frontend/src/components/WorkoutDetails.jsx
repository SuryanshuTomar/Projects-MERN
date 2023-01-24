// imports
// packages
import React from "react";

// axios
import { excerciseFetch } from "../axios/ExcerciseFetch";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";

// component
function WorkoutDetails({ workout }) {
	const { dispatchWorkouts } = useWorkoutContext();

	const clickHandler = async (event) => {
		const response = await excerciseFetch.delete(`/workouts/${workout._id}`);

		dispatchWorkouts({ type: "DELETE_WORKOUT", payload: response.data.data });
	};

	return (
		<div className="workout-details">
			<h4>{workout.title}</h4>
			<p>
				<strong>Load (kg): </strong> {workout.load}
			</p>
			<p>
				<strong>Reps: </strong> {workout.reps}
			</p>
			<p>{workout.createdAt}</p>
			<span onClick={clickHandler}>Delete</span>
		</div>
	);
}

export default WorkoutDetails;
