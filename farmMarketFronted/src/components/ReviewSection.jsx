import { useEffect, useState } from "react";
import { getReviews, addReview } from "../api/reviewApi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNotification } from "../context/NotificationContext";

function ReviewSection() {

  const { id } = useParams();

  const [reviews, setReviews] = useState([]);

  const [rating, setRating] = useState(5);

  const [comment, setComment] = useState("");

  const { addNotification } = useNotification();

  useEffect(() => {

    loadReviews();

  }, [id]);

  const loadReviews = async () => {

    try {

      const res = await getReviews(id);

      setReviews(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const submitReview = async () => {

    if (!comment.trim()) {

      toast.success("Write a review");

      return;

    }

    try {

      const user = JSON.parse(localStorage.getItem("user"));

      await addReview({

        user: user.id,

        product: id,

        rating,

        comment,

      });

      toast.success("Review Added");
      addNotification("New review submitted");

      setComment("");

      setRating(5);

      loadReviews();

    } catch (err) {

      console.log(err);

      toast.error("Unable to submit review");

    }

  };

  return (

    <div className="container mt-5 mb-5">

      <div className="card shadow">

        <div className="card-header bg-success text-white">

          <h3>Customer Reviews</h3>

        </div>

        <div className="card-body">

          {reviews.length === 0 ? (

            <h5>No Reviews Yet</h5>

          ) : (

            reviews.map((review) => (

              <div
                key={review._id}
                className="border-bottom mb-3 pb-3"
              >

                <h5>

                  {review.user?.name}

                </h5>

                <div className="text-warning fs-5">

                  {"⭐".repeat(review.rating)}

                </div>

                <p>

                  {review.comment}

                </p>

              </div>

            ))

          )}

          <hr />

          <h4>Add Review</h4>

          <select
            className="form-select mb-3"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >

            <option value={5}>★★★★★</option>

            <option value={4}>★★★★☆</option>

            <option value={3}>★★★☆☆</option>

            <option value={2}>★★☆☆☆</option>

            <option value={1}>★☆☆☆☆</option>

          </select>

          <textarea
            className="form-control mb-3"
            rows="3"
            placeholder="Write review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button
            className="btn btn-success"
            onClick={submitReview}
          >
            Submit Review
          </button>

        </div>

      </div>

    </div>

  );

}

export default ReviewSection;