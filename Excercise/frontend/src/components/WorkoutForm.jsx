// imports
// packages
import React, { useState } from "react";

// axios
import { excerciseFetch } from "../axios/ExcerciseFetch";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";

function WorkoutForm() {
	const { dispatchWorkouts } = useWorkoutContext();

	const [title, setTitle] = useState("");
	const [reps, setReps] = useState(0);
	const [load, setLoad] = useState(0);
	const [error, setError] = useState(null);

	const submitHandler = async (event) => {
		event.preventDefault();

		const workoutObj = { title, reps, load };

		try {
			const response = await excerciseFetch.post(
				"/workouts",
				JSON.stringify(workoutObj),
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			setTitle("");
			setReps(0);
			setLoad(0);
			setError(null);
			dispatchWorkouts({
				type: "CREATE_WORKOUT",
				payload: response.data.data,
			});
		} catch (error) {
			setError(error.response.data.error);
		}
	};

	return (
		<form className="create-workout" onSubmit={submitHandler}>
			<h3>Add A New Workout</h3>

			<label htmlFor="title">Excercise Title: </label>
			<input
				type="text"
				id="title"
				placeholder="Excercise name..."
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>

			<label htmlFor="reps">Excercise Reps: </label>
			<input
				type="number"
				id="reps"
				value={reps}
				onChange={(e) => setReps(e.target.value)}
			/>

			<label htmlFor="load">Excercise Load: </label>
			<input
				type="text"
				id="load"
				value={load}
				onChange={(e) => setLoad(e.target.value)}
			/>

			<button>Add Workout</button>

			{error && <div className="error">{error}</div>}
		</form>
	);
}

export default WorkoutForm;
