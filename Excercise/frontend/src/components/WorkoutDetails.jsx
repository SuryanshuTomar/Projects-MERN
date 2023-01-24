// imports
// packages
import React from "react";

// component
function WorkoutDetails({ workout }) {
	return (
		<div className="workout-details">
			<h1>{workout.title}</h1>
			<p>
				<strong>Load (kg): </strong> {workout.load}
			</p>
			<p>
				<strong>Reps: </strong> {workout.reps}
			</p>
			<p>{workout.createdAt}</p>
		</div>
	);
}

export default WorkoutDetails;
