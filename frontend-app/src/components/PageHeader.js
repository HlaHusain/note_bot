import * as React from "react";
import { Style } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import AddIcon from "@mui/icons-material/Add";
import { Divider, TextField } from "@mui/material";
import { Typography, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Stack from '@mui/material/Stack';

export const PageHeader = ({ title,isEditable, actions = [] ,onChange , label}) => {

  const handleChange =(e)=>{
    onChange(e.target.value)
  }
  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"

      >
        <Stack spacing={1} direction='row' alignItems='flex-end' >

          <TextField
          value={title}
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
          disabled={!isEditable}
          onChange={handleChange}
          label={label}

          />
          {!!isEditable &&
                      <EditIcon />
          } 
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
        sx={{marginY:2}}
      />
    </>
  );
};
