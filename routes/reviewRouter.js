import express from "express";
import { createReview, deleteReview, getAllReviews, getReviewCount, getReviews } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/", createReview);
reviewRouter.get("/count", getReviewCount);
reviewRouter.get("/", getAllReviews);
reviewRouter.get("/:productId", getReviews);
reviewRouter.delete("/:reviewId", deleteReview);


export default reviewRouter;