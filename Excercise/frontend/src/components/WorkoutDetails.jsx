// imports
// packages
import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

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
			<p>
				{formatDistanceToNow(new Date(workout.createdAt), {
					addSuffix: true,
				})}
			</p>
			<span className="material-symbols-rounded" onClick={clickHandler}>
				Delete
			</span>
		</div>
	);
}

export default WorkoutDetails;
