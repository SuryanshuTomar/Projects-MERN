import { useAuthContext } from "./useAuthContext";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";

export const useLogout = () => {
	const { dispatch: authDispatch } = useAuthContext();
	const { dispatchWorkouts: workoutDispatch } = useWorkoutContext();

	const logout = () => {
		// Remove user token from the local storage
		localStorage.removeItem("user");

		// Dispatch the LOGOUT action type to the AuthContext
		authDispatch({ type: "LOGOUT" });

		// Dispatch the SET_WORKOUTS action type and set the workouts to NULL
		workoutDispatch({ type: "SET_WORKOUTS", payload: null });
	};

	return { logout };
};
