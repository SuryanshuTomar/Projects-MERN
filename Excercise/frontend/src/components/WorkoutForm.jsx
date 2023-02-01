// imports
// packages
import React, { useState } from "react";

// axios
import { excerciseFetch } from "../axios/ExcerciseFetch";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";

function WorkoutForm() {
	const { dispatchWorkouts } = useWorkoutContext();
	const { user } = useAuthContext();

	const [title, setTitle] = useState("");
	const [reps, setReps] = useState("");
	const [load, setLoad] = useState("");
	const [error, setError] = useState(null);
	const [emptyFields, setEmptyFields] = useState([]);

	const submitHandler = async (event) => {
		event.preventDefault();

		if (!user) {
			setError("You Must be Logged In!!");
			return;
		}

		const workoutObj = { title, reps, load };

		try {
			const response = await excerciseFetch.post(
				"/workouts",
				JSON.stringify(workoutObj),
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${user.token}`,
					},
				}
			);

			setTitle("");
			setReps("");
			setLoad("");
			setError(null);
			setEmptyFields([]);
			dispatchWorkouts({
				type: "CREATE_WORKOUT",
				payload: response.data.data,
			});
		} catch (error) {
			setError(error.response.data.message);

			let fields = error.response.data.message.split(":")[1].split(",");
			fields = fields.map((field) => field.trim());
			setEmptyFields(fields);
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
				className={emptyFields.includes("title") ? "error" : ""}
			/>

			<label htmlFor="reps">Excercise Reps: </label>
			<input
				type="number"
				id="reps"
				placeholder="No. of reps..."
				value={reps}
				onChange={(e) => setReps(e.target.value)}
				className={emptyFields.includes("reps") ? "error" : ""}
			/>

			<label htmlFor="load">Excercise Load: </label>
			<input
				type="text"
				id="load"
				placeholder="Load (in kg)..."
				value={load}
				onChange={(e) => setLoad(e.target.value)}
				className={emptyFields.includes("load") ? "error" : ""}
			/>

			<button>Add Workout</button>

			{error && <div className="error">{error}</div>}
		</form>
	);
}

export default WorkoutForm;
