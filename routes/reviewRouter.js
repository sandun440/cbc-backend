import express from "express";
import { createReview, deleteReview, getAllReviews, getReviews } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/", createReview);
reviewRouter.get("/", getAllReviews);
reviewRouter.get("/:productId", getReviews);
reviewRouter.delete("/:reviewId", deleteReview);

export default reviewRouter;