import Review from "../model/review.js";

export async function createReview(req, res) {
  try {
    const lastRiview = await Review.find().sort({ reviewId: -1 }).limit(1);

    if (lastRiview.length == 0) {
      req.body.reviewId = "RIV0001";
    } else {
      const currentReviewId = lastRiview[0].reviewId;
      const numberString = currentReviewId.replace("RIV", "");
      const number = parseInt(numberString, 10);
      const newNumber = (number + 1).toString().padStart(4, "0");
      req.body.reviewId = "RIV" + newNumber;
    }
    req.body.email = req.user.email;
    const newReview = new Review(req.body);
    console.log("Creating review with data:", req.body);
    await newReview.save();
    res.json(
      { 
        message: "Review created" 
      }
  );
  } catch (error) {
    res.status(500).json(
      { 
        message: error.message
      }
    );
  }
}

export async function getReviews(req, res) {
  try {
    const reviews = await Review.find({ productId: req.params.productId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json(
      { 
        message: error.message
      }
    );
  }
}

export async function deleteReview(req, res) {
  const reviewId = req.params.reviewId;
  try {
    await Review.deleteOne({ reviewId: reviewId });
    res.json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getAllReviews(req, res) {
  try {
    const reviews = await Review.find({});
    res.json(reviews);
  } catch (error) {
    res.status(500).json(
      { 
        message: error.message 
      }
    );
  }
}