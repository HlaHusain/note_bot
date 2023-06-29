import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import { Container} from "@mui/material";
import { Image } from "../../components/Image";
import { Typography, Button } from "@mui/material";




export const Home = () => {
  const navigate = useNavigate();


  const [redirect,doRedirect]=useState(false);



useEffect(()=>{
  if(redirect){
    navigate("/")
  }
},[redirect])


const click = () =>{
  navigate("/login")
}



  return (
    <Container  spacing={4} sx={{marginTop:5}}>
      <Grid container spacing={4}  sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  padding:2,
                  width: "100%"
                }}>
        <Grid   xs={12}
          md={5}>
          <Typography variant="h4" fontSize="40px" fontWeight={500} 
          sx={{ color: "#228B8D", textAlign: "left"}}
          gutterBottom>
            The Note - Taking Platform You Really Want
          </Typography>
          <Typography variant="body1" fontSize="20px" fontWeight={500} 
          sx={{color:"#E3782F" , marginBottom:"1em"}} paragraph>
                Take and Organise your notes with AI assistance
          </Typography>
          <Button
          onClick={click}
              size="large"
              variant="outlined"
              sx={{
                background: "#4C8FCC",
                borderRadius: 4,
                color: "#FFFFFF",
                alignItems: "left",
                paddingX: 3,
                border: "0",
                textTransform: "none",
                "&:hover": {
                  color: "#FFFFFF",
                  background: "#5ba0e1",
                  border: "0",
                },
              }}>
            Get Started
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Image
            width="100%" height="auto"
            src='./home.png'
            alt="start button"
          />
        </Grid>
      </Grid>
    </Container>
  );
};