const router = require("express").Router();
const MovieModel = require("../models/Movie");
const moviesData = require("../config/movies.json");

router.get("/movies", async (req, res) => {
	try {
		const page = parseInt(req.query.page) - 1 || 0;
		const limit = parseInt(req.query.limit) || 5;
		const search = req.query.search || "";

		let sort = req.query.search || "rating";
		let genre = req.query.genre || "All";

		const genreOptions = [
			"Action",
			"Romance",
			"Fantasy",
			"Drama",
			"Crime",
			"Adventure",
			"Thriller",
			"Sci-Fi",
			"Music",
			"Family",
		];

		genre === "All"
			? (genre = [...genreOptions])
			: (genre = req.query.genre.split(","));

		req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

		let sortBy = {};
		if (sort[1]) {
			sortBy[(sort[0] = sort[1])];
		} else {
			sortBy[sort[0]] = "asc";
		}

		const movies = await MovieModel.find({
			name: { $regex: search, $options: "i" },
		})
			.where("genre")
			.in([...genre])
			.sort(sortBy)
			.skip(page * limit);

		const total = await MovieModel.countDocuments({
			genre: { $in: [...genre] },
			name: { $regex: search, $options: "i" },
		});

		const response = {
			error: false,
			total,
			page: page + 1,
			limit,
			movies,
			genres: genreOptions,
		};

		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: true, message: "Internal Server Error !" });
	}
});

// For Inserting the movies.json data into MongoDB database.
// const insertMovies = async () => {
// 	try {
// 		const docs = await MovieModel.insertMany(moviesData);
// 		return Promise.resolve(docs);
// 	} catch (err) {
// 		return Promise.reject(err);
// 	}
// };

// insertMovies()
// 	.then((docs) => console.log(docs))
// 	.catch((err) => console.log(err));

module.exports = router;
