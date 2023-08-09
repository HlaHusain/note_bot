import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import { PHeader } from "../../../components/PHeader";
import { getNotesByCourseTitle, updateNoteRating } from "./api";
import { useAuth } from "../../../contexts/AuthProvider";
import { NotesList } from "../../../components/NotestList";

export const SearchByCourse = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
        setError("Error fetching notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [keyword, token]);

  const onFavorite = async (noteId) => {
    setNotes((notes) =>
      notes.map((note) => {
        if (note._id !== noteId) {
          return note;
        }

        return {
          ...note,
          isFavorite: !note.isFavorite,
        };
      })
    );
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 5 }}>
      <PHeader title={`Search for: ${keyword}`} />
      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography>{error}</Typography>
      ) : (
        <NotesList notes={notes} onFavorite={onFavorite} />
      )}
    </Container>
  );
};
