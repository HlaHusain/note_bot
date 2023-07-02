import React from "react";
import { Avatar, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";


export const ChatBot = () => {
const ChatContainer = styled(Paper)(({ isMyChat }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: isMyChat ? "flex-end" : "flex-start",
  maxWidth: 400,
  marginBottom: 10,
  padding: 10,
  backgroundColor: isMyChat ? "#2196f3" : "#e0e0e0",
  color: isMyChat ? "#fff" : "#000",
  borderRadius: isMyChat ? "10px 10px 0 10px" : "10px 10px 10px 0",
}));

const Chat = ({ message, isMyChat }) => {
  return (
    <ChatContainer isMyChat={isMyChat}>
      <Typography variant="body1">{message}</Typography>
      <Avatar>{isMyChat ? "You" : "Other"}</Avatar>
    </ChatContainer>
  );
};
};