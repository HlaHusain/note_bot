import React from "react";
import { Avatar, Box, Grid, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";


export const ChatBot = () => {
    const messages = [
        { id: 1, content: "Hello", sender: "me", avatar: "/my-avatar.jpg" },
        { id: 2, content: "Hi there!", sender: "other", avatar: "/other-avatar.jpg" },
        // Add more messages here
      ];
    
      return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
              <Grid
                container
                spacing={2}
                alignItems="center"
                sx={{
                  justifyContent:"flex-end",
                  mb: 2,
                }}
              >
                <Grid item>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 10,
                      backgroundColor:"#ED7D31",
                      color: "#fff",
                    }}
                  >
                    <Typography variant="body1">Hello !</Typography>
                  </Box>
                </Grid>
                <Grid item>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                alignItems="center"
                sx={{
                  justifyContent:"flex-start",
                  mb: 2,
                }}
              >
                <Grid item>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </Grid>
                <Grid item>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 10,
                      backgroundColor:"#4472C4",
                      color: "#fff",
                    }}
                  >
                    <Typography variant="body1">Hey How are you</Typography>
                  </Box>
                </Grid>
              </Grid>
          </Box>
          {/* send button */}
          <Box sx={{ p: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item sx={{ flex: 1 }}>
                <TextField
                  variant="outlined"
                  placeholder="Type your message..."
                  fullWidth
                />
              </Grid>
              <Grid item>
                <SendIcon color="primary" />
              </Grid>
            </Grid>
          </Box>
        </Box>
      );
    };