import React, { useState, useEffect, useRef } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import axios from "axios";
import { useAuth } from "../../contexts/AuthProvider";
import chatCompletion from "./api";
import TextareaAutosize from "@mui/base/TextareaAutosize";

const Root = styled("div")(() => ({
  position: "fixed",
  bottom: 60,
  right: 80,
  height: "min(400px, calc(100vh - 50px))",
  display: "flex",
  flexDirection: "column",
  background: "#fff",
  border: "1px solid #C1C1C1",
  borderRadius: 4,
  width: 300,
}));

const MessagesContainer = styled(Stack)(({ theme }) => ({
  flex: 1,
  overflowY: "auto",
  padding: theme.spacing(3),
}));

const StyledTextareaAutosize = styled(TextareaAutosize)(({ theme }) => ({
  width: "100%",
  border: "none",
  padding: theme.spacing(1, 4, 1, 2),
  background: theme.palette.grey[100],
  borderRadius: 15,
}));
export const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [isBotReply, setIsBotReply] = useState(true);
  const [botResponsesCount, setBotResponsesCount] = useState(0);
  const messagesEndRef = useRef(null);
  const { token, user } = useAuth();

  const handleUserMessageSend = async (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: message },
    ]);
    setIsBotReply(false);

    try {
      const res = await chatCompletion(message, token);

      // Add ChatGPT's response to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "bot", content: res.response },
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Root>
      <MessagesContainer spacing={2}>
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </MessagesContainer>
      {/* send button */}

      <Box sx={{ position: "relative", p: 1 }}>
        <StyledTextareaAutosize
          placeholder={isBotReply ? "Type your message..." : "Please wait..."}
          disabled={!isBotReply}
          onKeyDown={(event) => {
            if (
              event.key === "Enter" &&
              !event.shiftKey &&
              event.target.value.trim()
            ) {
              handleUserMessageSend(event.target.value);
              event.target.value = "";
            }
          }}
        />

        <IconButton
          size="small"
          sx={{
            position: "absolute",
            right: 11,
            top: 11,
          }}
          disabled={!isBotReply}
        >
          {isBotReply && (
            <SendIcon style={{ color: "#ED7D31", fontSize: 16 }} />
          )}
          {!isBotReply && <CircularProgress size={14} />}
        </IconButton>
      </Box>
    </Root>
  );
};

const Message = ({ message }) => {
  const role = (
    <Avatar
      sx={{
        width: 32,
        height: 32,
        bgcolor: "#4472C4",
      }}
      src={message.role !== "user" ? "/chatBot.png" : undefined}
    ></Avatar>
  );

  const handleCopyMessage = (content) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div>
      <Stack
        sx={{
          display: "flex",
          justifyContent: message.role === "user" ? "flex-end" : undefined,
        }}
        direction={"row"}
        spacing={1}
      >
        {message.role !== "user" && role}
        <Box sx={{ width: "fit-content" }}>
          <Box
            sx={{
              p: 1,
              borderRadius: 4,
              backgroundColor: message.role !== "user" ? "#4472C4" : "#ED7D31",
              color: "#fff",
              fontSize: 16,
            }}
          >
            {message.content}
          </Box>
          {message.role !== "user" && (
            <Box display="flex" justifyContent="flex-end">
              <Button
                startIcon={<ContentCopyIcon />}
                color="neutral"
                onClick={() => handleCopyMessage(message.content)}
                size="small"
              >
                COPY ANSWER
              </Button>
            </Box>
          )}
        </Box>

        {message.role === "user" && role}
      </Stack>
    </div>
  );
};
