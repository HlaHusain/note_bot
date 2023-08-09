import React from "react";
import Rating from "@mui/material/Rating";
import StarBorderIcon from "@mui/icons-material/StarBorder"; // Import StarBorderIcon

  
  export const StarRating = ({ value, onRatingChange, readOnly }) => {
   
    const handleChange = (event, newValue) => {
        // Call the provided onRatingChange function to update the rating
        onRatingChange(newValue);
      };

    return (
      <Rating
        value={value}
        precision={1}
        onChange={readOnly ? undefined : handleChange} // Use onChange only if not readOnly
        emptyIcon={<StarBorderIcon fontSize="inherit" />} // Use StarBorderIcon here
        readOnly={readOnly} // Set the readOnly prop based on the prop value
      />
    );

};

