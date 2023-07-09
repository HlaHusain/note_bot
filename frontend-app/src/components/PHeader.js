import React, { useState } from "react";
import { TextField, Typography, Button, Stack, Grid, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

export const PHeader = ({ title, actions = [] }) => {
  const [pageTitle, setPageTitle] = useState(title);

  const handleChange = (e) => {
    setPageTitle(e.target.value);
  };

  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{
          marginBottom: 4,
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: 4,
          paddingRight: 4,
          paddingTop: 4,
        }}
      >
        <Stack spacing={1} direction="row" alignItems="flex-end">
          <Typography variant="h2" component="h1" sx={{ fontSize: 24, fontFamily: "Poppins, sans-serif", fontWeight: 400 }}>
            {pageTitle}
          </Typography>
        </Stack>
        <Stack spacing={2} direction="row">
          {actions.map(({ label, ...action }, index) => (
            <Button
              key={index}
              color="secondary"
              startIcon={<AddIcon />}
              variant="contained"
              size="large"
              sx={{
                fontSize: 20,
                bgcolor: "#F76D16",
                "&:hover": {
                  bgcolor: "#FF8533",
                },
              }}
              {...action}
            >
              {label}
            </Button>
          ))}
        </Stack>
      </Grid>
      <Divider component="div" role="presentation" sx={{ marginBottom: 4, marginLeft: 4, marginRight:4 }} />
    </>
  );
};