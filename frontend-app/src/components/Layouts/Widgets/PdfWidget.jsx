import React, { useState } from "react";
import { Pdf } from "../../Pdf";
import { TextField, Box, Stack, Button } from "@mui/material";
import { Palette } from "@mui/icons-material";
import { url as URL } from "../../../config";
import axios from "axios";

export function PdfWidget({ widget, onChange, viewMode }) {
  const [url, setUrl] = useState("");

  const handleChange = async (e) => {
    const pdf = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUrl(reader.result);
    };
    reader.readAsDataURL(pdf);

    const fd = new FormData();
    fd.append("file", pdf);

    const data = await upload(fd);

    onChange({
      data: {
        ...widget.data,
        url: data.url,
      },
    });
  };

  const upload = async (formData) => {
    const response = await fetch(`${URL}/users/upload`, {
      method: "post",
      body: formData,
    });

    const data = await response.json();

    if (!response) {
      let error = new Error("Http status code" + response.status);
      error.status = response.status;
      error.message = response.message;
      // throw error
    }

    return data.pdf;
  };

  return (
    <Stack sx={{ height: "100%" }} spacing={2}>
      {!viewMode && (
        <Button variant="contained" component="label" color="primary">
          Upload
          <input type="file" hidden multiple onChange={handleChange} />
        </Button>
      )}

      {!!url && <iframe height={"100%"} width={"100%"} src={url} />}
    </Stack>
  );
}
