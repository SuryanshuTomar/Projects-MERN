import axios from "axios";

export const expenseFetch = axios.create({
	baseURL: "http://localhost:8000/api",
});
