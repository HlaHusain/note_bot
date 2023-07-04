import { CardMedia, TextField, Box } from "@mui/material";
import { useState } from "react";
export const Pdf = ({ value, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <Box>
      <TextField
        type="url"
        label="PDF upload"
        id="outlined-required"
        value={value}
        name="url"
        onChange={handleChange}
        fullWidth
        sx={{
          background: "#FEFEFE",
          borderRadius: 2,
          marginY: 1,
        }}
      />
    </Box>
  );
};
