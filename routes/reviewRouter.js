import express from "express";
import { createReview, deleteReview, getReviews } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/", createReview);
reviewRouter.get("/:productId", getReviews);
reviewRouter.delete("/:reviewId", deleteReview);

export default reviewRouter;