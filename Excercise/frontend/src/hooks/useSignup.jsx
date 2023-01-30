import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { excerciseFetch } from "../axios/ExcerciseFetch";

export const useSignup = () => {
	const { dispatch } = useAuthContext();

	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);

	const signup = async (email, password) => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await excerciseFetch.post(
				"/user/signup",
				{ email, password },
				{
					headers: { "Content-Type": "application/json" },
				}
			);
			const data = response.data;

			// save the user to the local storage
			localStorage.setItem("user", JSON.stringify(data));

			// update the authContext
			dispatch({ type: "LOGIN", payload: data });
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			setError(error.response.data.error);
		}
	};

	return { signup, isLoading, error };
};
