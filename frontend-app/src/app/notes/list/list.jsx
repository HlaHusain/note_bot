import * as React from "react";
import { Style } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import AddIcon from '@mui/icons-material/Add';
import { Avatar, Divider } from "@mui/material";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TitleIcon from '@mui/icons-material/Title';
import { useNavigate } from "react-router-dom";
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




export const NotesList = () => {

  const notes = [
    { id: 1, by: "hadeel", course: "advance web technologies", title: "Topic 1: Status 33", rating: 4 },
    { id: 2, by: "Hla", course_id: "advance web technologies", title: "Note 2", rating: 3 },
    { id: 3, by: "Mohammad", course_id: "advance web technologies", title: "Note 3", rating: 5 },
    { id: 4, by: "Muath", course_id: "advance web technologies", title: "Note 4", rating: 6 },
    { id: 5, by: "Ahmad", course_id: "advance web technologies", title: "Note 5", rating: 4 },
    { id: 6, by: "Jusif", course_id: "advance web technologies", title: "Note 6", rating: 3 },
    { id: 7, by: "Tariq", course_id: "advance web technologies", title: "Note 7", rating: 5 },
    { id: 8, by: "Amer", course_id: "advance web technologies", title: "Note 8", rating: 6 },
  ];
  const notes2 = [
    { id: 9, by: "hadeel", course_id: "Network System", title: "Topic 1: Status", rating: 4 },
    { id: 10, by: "Hla", course_id: "Network System", title: "Note 2", rating: 3 },
    { id: 11, by: "Mohammad", course_id: "Network System", title: "Note 3", rating: 5 },
    { id: 12, by: "Muath", course_id: "Network System", title: "Note 4", rating: 6 },
    { id: 13, by: "Ahmad", course_id: "Network System", title: "Note 5", rating: 4 },
    { id: 14, by: "Jusif", course_id: "Network System", title: "Note 6", rating: 3 },
    { id: 15, by: "Tariq", course_id: "Network System", title: "Note 7", rating: 5 },
    { id: 16, by: "Amer", course_id: "Network System", title: "Note 8", rating: 6 },
  ];


  const navigate = useNavigate();

  const [showMore, setShowMore] = React.useState(false);
  const [showMore2, setShowMore2] = React.useState(false);
  
  const handleShowMoreClick = () => {
    setShowMore(true);
    navigate("/notes/coursenotes")

  };
  const handleShowMoreClick2 = () => {
    setShowMore2(true);
    navigate("/notes/coursenotes")

  };


  const visibleNotes = showMore  ? handleShowMoreClick : notes.slice(0, 4);
  const visibleNotes2 = showMore2  ? handleShowMoreClick : notes2.slice(0, 4);


  return (
    <Container maxWidth="md" sx={{ marginTop: 5 }}>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ marginBottom: 2 }}>
        <Grid item>
          <Typography variant="h5" component="h1" sx={{ marginBottom: "0" }} gutterBottom>
            My Notes
          </Typography>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            startIcon={<AddIcon />}
            variant="contained"
            size="small"
            sx={{
              background: "#ED7D31",
              borderRadius: 1,
              color: "#FFFFFF",
              alignItems: "left",
              paddingX: 2,
              paddingY: 0.5,
              border: "0",
              marginLeft: 2,
              "&:hover": {
                color: "#fff",
                background: "#ed955a",
                border: "0",
              },
            }}
          >
            Add Note
          </Button>
          <Button
            color="primary"
            startIcon={<AddIcon />}
            variant="contained"
            size="small"
            sx={{
              background: "#ED7D31",
              borderRadius: 1,
              color: "#FFFFFF",
              alignItems: "left",
              paddingX: 2,
              paddingY: 0.5,
              border: "0",
              marginLeft: 2,
              "&:hover": {
                color: "#fff",
                background: "#ed955a",
                border: "0",
              },
            }}
          >
            Add Course
          </Button>
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
          <Grid container sx={{ px: 2 }}>
            <Typography variant="h6" sx={{ color: "#ED7D31", marginBottom: 0 }} gutterBottom>
              Advance web Technologies
            </Typography>
          </Grid>
          <Grid container spacing={2} sx={{ p: 2 }}>
            {visibleNotes.map((note) => (
              <Grid item={true} xs={12} sm={6} md={4} key={note.id}>
                <Card sx={{ bgcolor: "#E8E8E8", borderRadius: 2,maxHeight:200,width:"100%",maxWidth:160,width:160 }}>
                  <CardHeader
                    action={
                      <Box sx={{ display: "flex" }}>
                        <Avatar sx={{ bgcolor: "#4472C4", width: 25, height: 25, marginRight: 1 }}>
                          <TitleIcon sx={{ fontSize: 15 }} />
                        </Avatar>
                        <Avatar sx={{ bgcolor: "#ED7D31", width: 25, height: 25 }}>
                          <PictureAsPdfIcon sx={{ fontSize: 15 }} />
                        </Avatar>
                      </Box>
                    }
                  />
                  <CardContent sx={{ padding: 3, color: "#4662A6",maxWidth:"100%", textAlign:"center" }}>
                    <Typography
                      variant="h5"
                      fontSize={18}
                      fontWeight={550}
                      sx={{
                        wordBreak: "break-word",
                        textOverflow:"ellipsis",
                        whiteSpace:"nowrap",
                        overflow: "hidden",
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
            {!showMore && (
              <Grid item xs={12} sm={6} md={4} display={"flex"}>
                  <Button variant="text"
                    onClick={handleShowMoreClick} // make show more true
                    sx={{ color: "#3565BA", border: "none" }}
                    aria-label="Show More"
                  >
                    show More
                  </Button>
            </Grid>
            )}
          </Grid> 
          <Divider
        component="div"
        role="presentation"
        sx={{
          marginBottom: 1,
          borderBottomWidth: "2px",
          borderBottomStyle: "solid",
          borderBottomColor: "#D9D9D9",
        }}
      />
          </Grid>
          <Grid item sx={{ maxWidth: 1400, width: "100%" }}>
          <Grid container sx={{ px: 2 }}>
            <Typography variant="h6" sx={{ color: "#ED7D31", marginBottom: 0 }} gutterBottom>
              Interactive System
            </Typography>
          </Grid>
          <Grid container spacing={2} sx={{ p: 2 }}>
            {visibleNotes2.map((note) => (
              <Grid item={true} xs={12} sm={6} md={4} key={note.id}>
                <Card sx={{ bgcolor: "#E8E8E8", borderRadius: 2,maxHeight:200,width:"100%",maxWidth:160,width:160 }}>
                  <CardHeader
                    action={
                      <Box sx={{ display: "flex" }}>
                        <Avatar sx={{ bgcolor: "#4472C4", width: 25, height: 25, marginRight: 1 }}>
                          <TitleIcon sx={{ fontSize: 15 }} />
                        </Avatar>
                        <Avatar sx={{ bgcolor: "#ED7D31", width: 25, height: 25,  }}>
                          <PictureAsPdfIcon sx={{ fontSize: 15 }} />
                        </Avatar>
                      </Box>
                    }
                  />
                  <CardContent sx={{ padding: 3, color: "#4662A6", textAlign:"center"}}>
                    <Typography
                      variant="h5"
                      fontSize={18}
                      fontWeight={550}
                      sx={{
                        wordBreak: "break-word",
                        textOverflow:"ellipsis",
                        whiteSpace:"nowrap",
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
            {!showMore2 && (
              <Grid item xs={12} sm={6} md={4} display={"flex"}>
                  <Button variant="text"
                    onClick={handleShowMoreClick2 } // make show more true
                    sx={{ color: "#3565BA", border: "none" }}
                    aria-label="Show More"
                  >
                    show More
                  </Button>
            </Grid>
            )}
          </Grid> 
          </Grid>
      </Grid>
    </Container>
  );
};



import * as React from "react";
import { Style } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import AddIcon from '@mui/icons-material/Add';
import { Avatar, Divider } from "@mui/material";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TitleIcon from '@mui/icons-material/Title';
import { useNavigate } from "react-router-dom";
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




export const NotesList = () => {

  const notes = [
    { id: 1, by: "hadeel", course: "advance web technologies", title: "Topic 1: Status 33", rating: 4 },
    { id: 2, by: "Hla", course_id: "advance web technologies", title: "Note 2", rating: 3 },
    { id: 3, by: "Mohammad", course_id: "advance web technologies", title: "Note 3", rating: 5 },
    { id: 4, by: "Muath", course_id: "advance web technologies", title: "Note 4", rating: 6 },
    { id: 5, by: "Ahmad", course_id: "advance web technologies", title: "Note 5", rating: 4 },
    { id: 6, by: "Jusif", course_id: "advance web technologies", title: "Note 6", rating: 3 },
    { id: 7, by: "Tariq", course_id: "advance web technologies", title: "Note 7", rating: 5 },
    { id: 8, by: "Amer", course_id: "advance web technologies", title: "Note 8", rating: 6 },
  ];
  const notes2 = [
    { id: 9, by: "hadeel", course_id: "Network System", title: "Topic 1: Status", rating: 4 },
    { id: 10, by: "Hla", course_id: "Network System", title: "Note 2", rating: 3 },
    { id: 11, by: "Mohammad", course_id: "Network System", title: "Note 3", rating: 5 },
    { id: 12, by: "Muath", course_id: "Network System", title: "Note 4", rating: 6 },
    { id: 13, by: "Ahmad", course_id: "Network System", title: "Note 5", rating: 4 },
    { id: 14, by: "Jusif", course_id: "Network System", title: "Note 6", rating: 3 },
    { id: 15, by: "Tariq", course_id: "Network System", title: "Note 7", rating: 5 },
    { id: 16, by: "Amer", course_id: "Network System", title: "Note 8", rating: 6 },
  ];


  const navigate = useNavigate();

  const [showMore, setShowMore] = React.useState(false);
  const [showMore2, setShowMore2] = React.useState(false);
  
  const handleShowMoreClick = () => {
    setShowMore(true);
    navigate("/notes/coursenotes")

  };
  const handleShowMoreClick2 = () => {
    setShowMore2(true);
    navigate("/notes/coursenotes")

  };


  const visibleNotes = showMore  ? handleShowMoreClick : notes.slice(0, 4);
  const visibleNotes2 = showMore2  ? handleShowMoreClick : notes2.slice(0, 4);


  return (
    <Container maxWidth="md" sx={{ marginTop: 5 }}>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ marginBottom: 2 }}>
        <Grid item>
          <Typography variant="h5" component="h1" sx={{ marginBottom: "0" }} gutterBottom>
            My Notes
          </Typography>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            startIcon={<AddIcon />}
            variant="contained"
            size="small"
            sx={{
              background: "#ED7D31",
              borderRadius: 1,
              color: "#FFFFFF",
              alignItems: "left",
              paddingX: 2,
              paddingY: 0.5,
              border: "0",
              marginLeft: 2,
              "&:hover": {
                color: "#fff",
                background: "#ed955a",
                border: "0",
              },
            }}
          >
            Add Note
          </Button>
          <Button
            color="primary"
            startIcon={<AddIcon />}
            variant="contained"
            size="small"
            sx={{
              background: "#ED7D31",
              borderRadius: 1,
              color: "#FFFFFF",
              alignItems: "left",
              paddingX: 2,
              paddingY: 0.5,
              border: "0",
              marginLeft: 2,
              "&:hover": {
                color: "#fff",
                background: "#ed955a",
                border: "0",
              },
            }}
          >
            Add Course
          </Button>
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
          <Grid container sx={{ px: 2 }}>
            <Typography variant="h6" sx={{ color: "#ED7D31", marginBottom: 0 }} gutterBottom>
              Advance web Technologies
            </Typography>
          </Grid>
          <Grid container spacing={2} sx={{ p: 2 }}>
            {visibleNotes.map((note) => (
              <Grid item={true} xs={12} sm={6} md={4} key={note.id}>
                <Card sx={{ bgcolor: "#E8E8E8", borderRadius: 2,maxHeight:200,width:"100%",maxWidth:160,width:160 }}>
                  <CardHeader
                    action={
                      <Box sx={{ display: "flex" }}>
                        <Avatar sx={{ bgcolor: "#4472C4", width: 25, height: 25, marginRight: 1 }}>
                          <TitleIcon sx={{ fontSize: 15 }} />
                        </Avatar>
                        <Avatar sx={{ bgcolor: "#ED7D31", width: 25, height: 25 }}>
                          <PictureAsPdfIcon sx={{ fontSize: 15 }} />
                        </Avatar>
                      </Box>
                    }
                  />
                  <CardContent sx={{ padding: 3, color: "#4662A6",maxWidth:"100%", textAlign:"center" }}>
                    <Typography
                      variant="h5"
                      fontSize={18}
                      fontWeight={550}
                      sx={{
                        wordBreak: "break-word",
                        textOverflow:"ellipsis",
                        whiteSpace:"nowrap",
                        overflow: "hidden",
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
            {!showMore && (
              <Grid item xs={12} sm={6} md={4} display={"flex"}>
                  <Button variant="text"
                    onClick={handleShowMoreClick} // make show more true
                    sx={{ color: "#3565BA", border: "none" }}
                    aria-label="Show More"
                  >
                    show More
                  </Button>
            </Grid>
            )}
          </Grid> 
          <Divider
        component="div"
        role="presentation"
        sx={{
          marginBottom: 1,
          borderBottomWidth: "2px",
          borderBottomStyle: "solid",
          borderBottomColor: "#D9D9D9",
        }}
      />
          </Grid>
          <Grid item sx={{ maxWidth: 1400, width: "100%" }}>
          <Grid container sx={{ px: 2 }}>
            <Typography variant="h6" sx={{ color: "#ED7D31", marginBottom: 0 }} gutterBottom>
              Interactive System
            </Typography>
          </Grid>
          <Grid container spacing={2} sx={{ p: 2 }}>
            {visibleNotes2.map((note) => (
              <Grid item={true} xs={12} sm={6} md={4} key={note.id}>
                <Card sx={{ bgcolor: "#E8E8E8", borderRadius: 2,maxHeight:200,width:"100%",maxWidth:160,width:160 }}>
                  <CardHeader
                    action={
                      <Box sx={{ display: "flex" }}>
                        <Avatar sx={{ bgcolor: "#4472C4", width: 25, height: 25, marginRight: 1 }}>
                          <TitleIcon sx={{ fontSize: 15 }} />
                        </Avatar>
                        <Avatar sx={{ bgcolor: "#ED7D31", width: 25, height: 25,  }}>
                          <PictureAsPdfIcon sx={{ fontSize: 15 }} />
                        </Avatar>
                      </Box>
                    }
                  />
                  <CardContent sx={{ padding: 3, color: "#4662A6", textAlign:"center"}}>
                    <Typography
                      variant="h5"
                      fontSize={18}
                      fontWeight={550}
                      sx={{
                        wordBreak: "break-word",
                        textOverflow:"ellipsis",
                        whiteSpace:"nowrap",
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
            {!showMore2 && (
              <Grid item xs={12} sm={6} md={4} display={"flex"}>
                  <Button variant="text"
                    onClick={handleShowMoreClick2 } // make show more true
                    sx={{ color: "#3565BA", border: "none" }}
                    aria-label="Show More"
                  >
                    show More
                  </Button>
            </Grid>
            )}
          </Grid> 
          </Grid>
      </Grid>
    </Container>
  );
};



