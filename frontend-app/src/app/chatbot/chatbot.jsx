import React, { useState, useEffect, useRef } from "react";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { chatCompletion } from "./api";
import { toast } from "react-toastify";
import TypeWriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  Box,
  Typography,
  IconButton,
  FormControl,
  OutlinedInput,
  CircularProgress,
} from "@mui/material";

const messageType = {
  answer: "answer",
  question: "question",
};

export const ChatBot = () => {
  const navigate = useNavigate();
  const inputRef = useRef();
  const chatWrapperRef = useRef();

  const [onRequest, setOnRequest] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const getAnswer = async () => {
    if (onRequest) return;

    const newMessages = [
      ...messages,
      {
        type: messageType.question,
        content: question,
      },
    ];

    setMessages(newMessages);
    setQuestion("");
    setOnRequest(true);

    const { response, err } = await chatCompletion({ prompt: question });

    if (response) {
      setMessages([
        ...newMessages,
        {
          type: messageType.answer,
          content: response.text,
        },
      ]);
    }

    if (err) {
      toast.error(err.message);
      setOnRequest(false);
    }
  };

  const onEnterPress = (e) => {
    if (e.keyCode === 13) getAnswer();
  };

  const onSignOut = () => {
    localStorage.removeItem("tkn");
    navigate("/");
  };

  //Scroll to the bottom of the chat
  useEffect(() => {
    setTimeout(() => {
      chatWrapperRef.current.addEventListener("DOMNodeInserted", (e) => {
        e.currentTarget.scroll({
          top: e.currentTarget.scrollHeight,
          behavior: "smooth",
        });
      });
    }, 200);
  }, []);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ color: "#F76D16", marginLeft: "20px" }}
        >
          ChatGPT
        </Typography>
        <IconButton onClick={onSignOut} sx={{ color: "#F76D16" }}>
          <LogoutOutlinedIcon />
        </IconButton>
      </Box>
      <Box
        ref={chatWrapperRef}
        sx={{
          height: "calc(100vh - 180px)",
          overflowY: "auto",
          paddingTop: "10px",
          paddingBottom: "10px",
          backgroundColor: "#F5F5F5",
          borderRadius: "8px",
        }}
      >
        <Stack
          spacing={1}
          sx={{ padding: "20px", maxWidth: "800px", margin: "auto" }}
        >
          {messages.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: item.type === messageType.answer ? "flex-end" : "flex-start",
              }}
            >
              <Box
                sx={{
                  maxWidth: "80%",
                  backgroundColor:
                    item.type === messageType.answer ? "#F76D16" : "#FFFFFF",
                  color: item.type === messageType.answer ? "#FFFFFF" : "#000000",
                  padding: "10px 15px",
                  borderRadius: "4px",
                }}
              >
                {item.type === messageType.answer ? (
                  <TypeWriter
                    onInit={(writer) => {
                      writer
                        .typeString(item.content)
                        .callFunction(() => {
                          document.querySelector(
                            ".Typewriter__cursor"
                          ).style.display = "none";
                          setOnRequest(false);
                          setTimeout(() => {
                            inputRef.current.focus();
                          }, 200);
                        })
                        .changeDelay(50)
                        .start();
                    }}
                  />
                ) : (
                  item.content
                )}
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
      <Stack
        direction="row"
        alignItems="center"
        paddingX="20px"
        paddingBottom="20px"
        position="sticky"
        bottom="0"
        backgroundColor="#FFFFFF"
        zIndex={1}
        sx={{ boxShadow: "0px -4px 4px rgba(0, 0, 0, 0.05)" }}
      >
        <FormControl fullWidth variant="outlined">
          <OutlinedInput
            inputRef={inputRef}
            id="question-input"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
            endAdornment={
              onRequest ? (
                <CircularProgress size="1.5rem" />
              ) : (
                <IconButton onClick={getAnswer} disabled={!question}>
                  <SendOutlinedIcon />
                </IconButton>
              )
            }
            autoFocus
            disabled={onRequest}
            onKeyUp={onEnterPress}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask something..."
          />
        </FormControl>
      </Stack>
    </div>
  );
};
