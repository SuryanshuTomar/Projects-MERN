import axios from "axios";

const excerciseFetch = axios.create({
	baseURL: "http://localhost:8000/api",
});

export { excerciseFetch };
