import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
	const { dispatch } = useAuthContext();

	const logout = () => {
		// Remove user token from the local storage
		localStorage.removeItem("user");

		// Dispatch the LOGOUT action type to the AuthContext
		dispatch({ type: "LOGOUT" });
	};

	return { logout };
};
