import { pool } from "../helpers/db.js";
import axios from "axios";

const tmdb_api_key = process.env.TMDB_API_KEY;

// Get all reviews
export const getAllReviews = async () => {
    const result = await pool.query(`SELECT * FROM review;`);
    return result.rows;
};

// Get reviews by movie_id
export const getReviewsByMovieId = async (movie_id) => {
    const result = await pool.query(
        `SELECT * FROM review WHERE movie_id = $1;`,
        [movie_id]
    );
    return result.rows;
};

// Get reviews by user_id
export const getReviewsByUserId = async (user_id) => {
    const result = await pool.query(
        `SELECT * FROM review WHERE user_id = $1;`,
        [user_id]
    );
    return result.rows;
};

// Add a new review
export const addReview = async (movie_id, movie_name, user_id, user_email, description, rating) => {
    const result = await pool.query(
        `INSERT INTO review (movie_id, movie_name, user_id, user_email, description, rating)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;`,
        [movie_id, movie_name, user_id, user_email, description, rating]
    );
    return result.rows[0];
};

// Delete a review
export const deleteReview = async (review_id) => {
    const result = await pool.query(
        `DELETE FROM review WHERE review_id = $1 RETURNING *;`,
        [review_id]
    );
    return result.rows[0];
};

// Update a review
export const updateReview = async (review_id, description, rating) => {
    const result = await pool.query(
        `UPDATE review
        SET description = COALESCE($1, description),
            rating = COALESCE($2, rating)
        WHERE review_id = $3
        RETURNING *;`,
        [description, rating, review_id]
    );
    return result.rows[0];
};

// Fetch movie name from TMDB by movie_id
export const fetchMovieNameFromTMDB = async (movie_id) => {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${tmdb_api_key}`,
            {
                headers: { Authorization: `Bearer ${tmdb_api_key}` },
            }
        );
        return response.data?.title || "Unknown";
    } catch (error) {
        console.error("Failed to fetch movie data: ", error.message);
        return "Unknown";
    }
};
