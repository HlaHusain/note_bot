import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Avatar, Box, Container, Typography, useTheme } from "@mui/material";
import { Rating } from "@mui/material";
import { styled } from "@mui/system";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TitleIcon from "@mui/icons-material/Title";
import VideoIcon from "@mui/icons-material/VideoLibrary";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { PHeader } from "../../../components/PHeader";
import { MenuComponent } from "../../../components/Menu";
import { getNotesByCourseTitle } from "./api";
import { useAuth } from "../../../contexts/AuthProvider";

const useStyles = styled(Card)(({ theme }) => ({
  backgroundColor: "#E8E8E8",
  borderRadius: 2,
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: "#fbf9f9",
    cursor: "pointer",
  },
}));

export const SearchByCourse = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const { keyword: initialKeyword } = useParams();
  const [keyword, setKeyword] = useState(initialKeyword);

  // Listen for changes in the URL and update the keyword state accordingly
  useEffect(() => {
    setKeyword(initialKeyword);
  }, [initialKeyword]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedNotes = await getNotesByCourseTitle(keyword, token);
        setNotes(fetchedNotes);
      } catch (error) {
        console.error("Error fetching notes:", error);
        setError("Error fetching notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [keyword]);

  const handleCardClick = (note) => {
    // Handle card click event and navigate to NoteView page
    navigate(`/notes/${note._id}`);
  };

  // Memoize the handleCardClick function to prevent unnecessary re-renders
  const memoizedHandleCardClick = useMemo(() => handleCardClick, []);
  const theme = useTheme();
  return (
    <Container maxWidth="md" sx={{ marginTop: 5 }}>
      <PHeader title={`Search for: ${keyword}`} />
      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography>{error}</Typography>
      ) : (
        <div>
          <Grid container spacing={2} >
            {notes.map((note) => (
              <Grid item key={note.id} xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    background: theme.palette.shadow.main,
                    borderRadius: 3,
                  }}
                  component={useStyles}
                  onClick={() => memoizedHandleCardClick(note)}
                >
                  <CardHeader />
                  <CardContent
                    sx={{
                      padding: 2,
                      color: "#4662A6",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        // marginBottom: 1,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        sx={{ fontSize: 14, color: "gray"}}
                      >
                        {note.user_id.user_name}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          sx={{
                            bgcolor: "#ED7D31",
                            width: 25,
                            height: 25,
                            marginRight: 1,
                          }}
                        >
                          <PictureAsPdfIcon sx={{ fontSize: 15 }} />
                        </Avatar>
                        <Avatar
                          sx={{
                            bgcolor: "#ED7D31",
                            width: 25,
                            height: 25,
                            marginRight: 1,
                          }}
                        >
                          <TitleIcon sx={{ fontSize: 15 }} />
                        </Avatar>
                        <Avatar
                          sx={{ bgcolor: "#ED7D31", width: 25, height: 25 }}
                        >
                          <VideoIcon sx={{ fontSize: 15 }} />
                        </Avatar>
                      </Box>
                    </Box>
                    <Typography
                      variant="h6"
                      fontSize={16}
                      fontWeight={500}
                      sx={{
                        marginBottom: 4,
                        marginTop: 4,
                        textAlign: "center",
                        // fontSize: 32,
                        fontWeight: "bold",
                      }}
                    >
                      {note.title}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Rating
                          value={note.rating}
                          readOnly
                          sx={{ marginRight: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {note.rating}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                  <CardActions disableSpacing>{/* ... */}</CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </Container>
  );
};
