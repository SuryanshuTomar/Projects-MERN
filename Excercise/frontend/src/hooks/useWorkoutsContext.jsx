// imports
import { useContext } from "react";
import { WorkoutContext } from "../context/WorkoutContext";

export const useWorkoutContext = () => {
	const workoutContext = useContext(WorkoutContext);

	if (!workoutContext)
		throw new Error(
			"useWorkoutContext must be used inside WorkoutContextProvider"
		);

	return workoutContext;
};
