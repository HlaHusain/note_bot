import * as React from "react";
import { Style } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import AddIcon from "@mui/icons-material/Add";
import { Divider, TextField } from "@mui/material";
import { Typography, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Stack from '@mui/material/Stack';

export const PageHeader = ({ label, actions = [] }) => {

  const [title,setTitle] =React.useState(label)

  const changeTitle =()=>{

  }

  const handleChange =(e)=>{
    setTitle(e.target.value)
  }
  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{ marginBottom: 2 }}
      >
        <Stack spacing={1} direction='row' alignItems='flex-end' >

          <TextField
          value={title}
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
          onChange={handleChange}
          label="New note title"

          />
            <EditIcon />
        </Stack>
        <Stack spacing={1} direction='row' >
          {actions.map(({label,...action}) => (
            <Button
              color="primary"
              startIcon={<AddIcon />}
              variant="contained"
              size="small"
              {...action}
            >
              {label}
            </Button>
          ))}
        </Stack>
      </Grid>
      <Divider
        component="div"
        role="presentation"
      />
    </>
  );
};
