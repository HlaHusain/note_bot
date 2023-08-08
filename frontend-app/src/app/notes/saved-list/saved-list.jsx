import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { getSavedNotesByUserId } from "./api";
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

export const SavedNotesList = () => {
  const [savedNotes, setSavedNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedNotes = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedSavedNotes = await getSavedNotesByUserId(token, user._id);
        setSavedNotes(fetchedSavedNotes);
      } catch (error) {
        console.error("Error fetching saved notes:", error);
        setError("Error fetching saved notes");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedNotes();
  }, [token, user._id]);

  const handleCardClick = (note) => {
    navigate(`/notes/${note._id}`);
  };

  const theme = useTheme();

  return (
    <Container maxWidth="md" sx={{ marginTop: 5 }}>
      <PHeader title={`Saved Notes`} />
      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography>{error}</Typography>
      ) : (
        <Grid container spacing={2}>
          {savedNotes.map((note) => (
            <Grid item key={note._id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  background: theme.palette.shadow.main,
                  borderRadius: 3,
                }}
                component={useStyles}
                onClick={() => handleCardClick(note)}
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
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      sx={{ fontSize: 14, color: "gray" }}
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
      )}
    </Container>
  );
};
