import * as React from "react";
import Box from "@mui/material/Box";

import Grid from "@mui/material/Unstable_Grid2";

import { Avatar } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TitleIcon from "@mui/icons-material/Title";
import { useAuth } from "../contexts/AuthProvider";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import {
  useTheme,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Rating,
} from "@mui/material";

import { toggleNoteFavorite } from "../app/notes/list/api";
import { useNavigate } from "react-router-dom";

export function NotesList({ notes, onFavorite }) {
  const { token } = useAuth();
  const toggleFav = async (noteId) => {
    toggleNoteFavorite(noteId, token);

    onFavorite && onFavorite(noteId);
  };
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Grid
      container
      spacing={1}
      sx={{
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      {notes.map((note) => (
        <Grid item xs={12} sm={6} lg={4} key={note.id}>
          <Card
            onClick={() => navigate(`/notes/${note._id}`)}
            sx={{
              bgcolor: theme.palette.shadow.main,
              borderRadius: 2,
              cursor: "pointer",
              ":hover": {
                bgcolor: theme.palette.shadow.hover,
              },
              height: "100%",
              position: "relative",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",

                padding: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "#4472C4",
                    width: 25,
                    height: 25,
                    marginRight: 1,
                  }}
                >
                  <TitleIcon sx={{ fontSize: 15 }} />
                </Avatar>
                <Avatar
                  sx={{
                    bgcolor: "#ED7D31",
                    width: 25,
                    height: 25,
                  }}
                >
                  <PictureAsPdfIcon sx={{ fontSize: 15 }} />
                </Avatar>
              </Box>

              <Box>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFav(note._id);
                  }}
                  sx={{
                    // bgcolor: '#c62828',
                    width: 25,
                    height: 25,
                  }}
                >
                  {!note.isFavorite && (
                    <FavoriteBorderIcon sx={{ fontSize: 25, color: "red" }} />
                  )}
                  {note.isFavorite && (
                    <FavoriteIcon sx={{ fontSize: 25, color: "red" }} />
                  )}
                </IconButton>
              </Box>
            </Box>

            <CardContent sx={{ padding: 4, color: "#4662A6" }}>
              <Typography
                variant="h5"
                fontSize={18}
                fontWeight={550}
                sx={{
                  wordBreak: "break-word",
                  textAlign: "center",
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
                }}
              />
            </CardActions>
          </Card>

          {/* <Box sx={{ display:'flex' , alignItems:'center' , justifyContent:'space-between'}}>
                    <Typography
                      sx={{ color: "#ED7D31", margin: 0.5 }}
                    >
                    {note.notes.length}
                    </Typography>
                     <TextSnippetIcon sx={{color: "#ED7D31" }}/>
                    </Box> */}
        </Grid>
      ))}
    </Grid>
  );
}
