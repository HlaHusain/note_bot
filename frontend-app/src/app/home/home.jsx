import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import { Container} from "@mui/material";
import { Image } from "../../components/Image";

export const Home = () => {
  const navigate = useNavigate();


  const [redirect,doRedirect]=useState(false);


useEffect(()=>{
  if(redirect){
    navigate("/")
  }
},[redirect])



  return (
    <Container
      sx={{
        flexGrow: 1,
      }}
    >
      <Grid container spacing={4}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  padding:2,
                  marginTop:4

                  
                }}>
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image width="420px" src="../signup.png" />
        </Grid>

      </Grid>
    </Container>
  );
};
