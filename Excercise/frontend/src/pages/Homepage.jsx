// imports
// packages
import React, { useEffect } from "react";

// pages and componenets
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { excerciseFetch } from "../axios/ExcerciseFetch";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// component
function Homepage() {
	const { workouts, dispatchWorkouts } = useWorkoutContext();
	const { user } = useAuthContext();

	useEffect(() => {
		const fetchWorkouts = async () => {
			const response = await excerciseFetch.get("/workouts", {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			});
			const dataObj = response.data;

			if (response.statusText === "OK") {
				dispatchWorkouts({ type: "SET_WORKOUTS", payload: dataObj.data });
			}
		};

		if (user) {
			fetchWorkouts();
		}
	}, [user]);

	return (
		<div className="home">
			<div className="workouts">
				{workouts &&
					workouts.map((workout) => (
						<WorkoutDetails key={workout._id} workout={workout} />
					))}
				{workouts?.length === 0 && <h2>No Workouts Present...</h2>}
			</div>
			<WorkoutForm />
		</div>
	);
}

export default Homepage;
