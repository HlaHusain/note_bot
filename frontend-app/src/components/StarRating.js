import React from "react";
import Rating from "@mui/material/Rating";
import StarBorderIcon from "@mui/icons-material/StarBorder"; // Import StarBorderIcon

export const StarRating = ({ value, onRatingChange, userRating }) => {
  console.log("StarRating props:", value, onRatingChange, userRating);
  
  const handleChange = (event, newValue) => {
    // Call the provided onRatingChange function to update the rating
    onRatingChange(newValue);
  };

  return (
    <Rating
      value={value}
      precision={0.5}
      onChange={handleChange}
      emptyIcon={<StarBorderIcon fontSize="inherit" />} // Use StarBorderIcon here
    />
  );
};

