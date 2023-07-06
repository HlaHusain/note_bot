import React from "react";
import { TextField, Box } from "@mui/material";

import ReactPlayer from "react-player";

export function VideoWidget({ widget, onChange }) {
  console.log(widget);

  const handleChange = (e) => {
   const  video = e.target.value
    onChange({
      data:{
       ...widget.data , 
       video
    }
  });
  };
  return (

    <Box>
      <TextField
        type="url"
        label="Video URL"
        id="outlined-required"
        value={widget.data.video}
        onChange={handleChange}
        name="url"
        fullWidth
        sx={{
          background: "#FEFEFE",
          borderRadius: 2,
          marginY: 1,
        }}
      />

      {!!widget.data.video && widget.data.video.length !== 0 && (
        <ReactPlayer
          width={"100%"}
          // height={"100%"}
          url={widget.data.video}
          playing={true}
          muted={true}
          controls={true}
        />
      )}
    </Box>
  );
}
