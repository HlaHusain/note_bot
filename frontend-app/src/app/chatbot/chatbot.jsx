import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import bot from "../../../src/bot.png";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";


export const ChatBot = () => {
  const [messages, setMessages] = useState([
    { content: "what is state and Props?", sender: "user" },
    { content: "In React, state and props are two fundamental concepts used to manage and pass data within components.", sender: "bot" },
  ]);

  const handleUserMessageSend = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: message, sender: "user" },
    ]);
  
    const botResponse = "This is the bot's response.";
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: botResponse, sender: "bot" },
    ]);
  };
  const handleCopyMessage = (content) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: 360,
        border: "1px solid #C1C1C1",
        borderRadius: 4,
        margin: "0 auto",
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          maxHeight: "400px",
          height: "100%",
        }}
      >
        {messages.map((message, index) => (
            <Grid item>
              {message.sender === "user" ? (
                <Grid
                container
                spacing={2}
                alignItems="center"
                display="flex"
                flexWrap="wrap-reverse"

                key={index}
                sx={{
                  justifyContent: "flex-end",
                  mb: 2,
                }}
              >
                <Grid item>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      backgroundColor: "#ED7D31",
                      color: "#fff",
                    }}
                  >
                    <Typography variant="body1">{message.content}</Typography>
                  </Box>
                </Grid>
                <Grid item>
                <Avatar sx={{ bgcolor: "#4472C4" }}>YA</Avatar>
                </Grid>
              </Grid>
              
              
              ) : (
                <Grid
                container
                spacing={2}
                alignItems="center"
                key={index}
                sx={{
                  justifyContent: "flex-start",
                  mb: 2,
                }}
              >
                <Grid item>
                  <Avatar alt="Bot" src={bot} />
                </Grid>
                <Grid item>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      backgroundColor: "#4472C4",
                      color: "#fff",
                    }}
                  >
                    <Typography variant="body1">{message.content}</Typography>
                  </Box>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  sx={{ justifyContent: "flex-end", marginTop: "0" }}
                >
          <Grid item sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <ContentCopyIcon
                    fontSize="13"
                    onClick={() => handleCopyMessage(message.content)}
                    style={{ cursor: "pointer" }}
                  />
                  <Typography variant="body1" fontSize={13}>
                    COPY ANSWER
                  </Typography>
                </Grid>
                </Grid>
              </Grid>
              )}
            </Grid>

        ))}
        
      </Box>
      {/* send button */}
      <Grid container spacing={2} alignItems="center" sx={{ padding: 2 }}>
        <Grid item sx={{ flex: 1 }}>
          <TextField
            variant="outlined"
            placeholder="Type your message..."
            fullWidth
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleUserMessageSend(event.target.value);
                event.target.value = "";
              }
            }}
          />
        </Grid>
        <Grid item>
          <SendIcon style={{ color: "#ED7D31" }} />
        </Grid>
      </Grid>
    </Box>
  );
};