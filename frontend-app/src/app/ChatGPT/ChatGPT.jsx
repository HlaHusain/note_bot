import React, { useState, useEffect, useRef } from "react";
import { Avatar, Box, Grid, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import bot from "../../../src/bot.png";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import axios from "axios";

export const ChatGPT = () => {
  const [messages, setMessages] = useState([]);
  const [isBotReply, setIsBotReply] = useState(true);
  const [botResponsesCount, setBotResponsesCount] = useState(0);
  const messagesEndRef = useRef(null);

  const handleUserMessageSend = async (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: message },
    ]);
    setIsBotReply(false);

    try {
      // Send user message to the server
      const response = await axios.post("http://localhost:3000/chat", {
        message: message,
      });

      // Add ChatGPT's response to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "bot", content: response.data.response },
      ]);

      setIsBotReply(true);
      setBotResponsesCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    // Scroll to the bottom after a new bot response is received
    scrollToBottom();
  }, [botResponsesCount]); // Trigger effect when botResponsesCount changes

  const handleCopyMessage = (content) => {
    navigator.clipboard.writeText(content);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: 500,
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
          maxHeight: "600px",
          height: "100%",
        }}
      >
        {messages.map((message, index) => (
          <Grid item key={index}>
            {message.role === "user" ? (
              <Grid
                container
                spacing={2}
                alignItems="center"
                display="flex"
                flexWrap="wrap-reverse"
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
                      maxWidth: "80%",
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
                      maxWidth: "80%",
                    }}
                  >
                    <Typography variant="body1">{message.content}</Typography>
                  </Box>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  sx={{ justifyContent: "flex-end", marginTop: "0", maxWidth: "90%"}}
                >
                  <Grid item sx={{ display: "flex" }}>
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
        <div ref={messagesEndRef} />
      </Box>
      {/* send button */}
      <Grid container spacing={2} alignItems="center" sx={{ padding: 2 }}>
        <Grid item sx={{ flex: 1 }}>
          <TextField
            variant="outlined"
            placeholder="Type your message..."
            fullWidth
            disabled={!isBotReply}
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
