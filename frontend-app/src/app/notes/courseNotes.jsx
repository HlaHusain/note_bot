import * as React from "react";
import { Style } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import AddIcon from '@mui/icons-material/Add';
import { Avatar, Divider } from "@mui/material";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TitleIcon from '@mui/icons-material/Title';
import LiveTvIcon from '@mui/icons-material/LiveTv';

import {
  Container,
  Typography,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Rating,
} from "@mui/material";

export const CourseNotesList = () => {
  const notes = [
    { id: 1, by:"hadeel", title: "Topic 1: Status 33", rating: 4 },
    { id: 2, by:"Hla", title: "Note 2", rating: 3 },
    { id: 3, by:"Mohammad",title: "Note 3", rating: 5 },
    { id: 4, by:"Muath",title: "Note 4", rating: 6 },
    { id: 5,by:"Ahmad", title: "Note 5", rating: 4 },
    { id: 6, by:"Jusif",title: "Note 6", rating: 3 },
    { id: 7, by:"Tariq",title: "Note 7", rating: 5 },
    { id: 8, by:"Amer",title: "Note 8", rating: 6 },
  ];

  return (
    <Container maxWidth="md" sx={{ marginTop: 5 }}>
    <Grid container alignItems="center" justifyContent="space-between" sx={{ marginBottom: 2 }}>
      <Grid item>
        <Typography variant="h5" component="h1" sx={{ marginBottom: "0" }} gutterBottom>
          Advance Web Technologies
        </Typography>
      </Grid>
    </Grid>  
    <Divider
      component="div"
      role="presentation"
      sx={{
        marginBottom: 4,
        borderBottomWidth: "2px",
        borderBottomStyle: "solid",
        borderBottomColor: "#D9D9D9",
      }}
    />
    <Grid container spacing={2} justifyContent="center">
      <Grid item sx={{ maxWidth: 1400, width: "100%" }}>
        <Grid container spacing={2} sx={{ p: 2 }}>
          {notes.map((note) => (
            <Grid item={true} xs={12} sm={6} md={4} key={note.id}>
              <Card sx={{ bgcolor: "#E8E8E8", borderRadius: 2,maxHeight:200,width:"100%",maxWidth:160,width:160,marginBottom:2 }}>
                <CardHeader
                  action={
                    <Box sx={{ display: "flex" }}>
                      <Avatar sx={{ bgcolor: "#4472C4", width: 25, height: 25, marginRight: 1 }}>
                        <TitleIcon sx={{ fontSize: 15 }} />
                      </Avatar>
                      <Avatar sx={{ bgcolor: "#ED7D31", width: 25, height: 25 }}>
                        <PictureAsPdfIcon sx={{ fontSize: 15 }} />
                      </Avatar>
                      <Avatar sx={{ bgcolor: "#F91313", width: 25, height: 25 , marginLeft: 1}}>
                        <LiveTvIcon sx={{ fontSize: 15 }} />
                      </Avatar>
                    </Box>
                  }
                />
                <CardContent sx={{ padding: 4 , color: "#ED7D31",maxWidth:"100%", textAlign:"center" }}>
                  <Typography
                    variant="h5"
                    fontSize={18}
                    fontWeight={550}
                    sx={{
                      wordBreak: "break-word",
                      textOverflow:"ellipsis",
                      whiteSpace:"nowrap",
                      overflow: "hidden"

                    }}
                    gutterBottom
                  >
                    {note.title}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <Rating
                    value={note.rating}
                    readOnly
                    sx={{
                      color: "#323232", // Set the color of stars to black
                      marginLeft:"auto",
                      fontSize: 15,
                    }}
                  />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid> 
        </Grid>
    </Grid>
  </Container>
  );
};


