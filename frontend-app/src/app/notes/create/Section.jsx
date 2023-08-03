import { LayoutSelector } from "./LayoutSelector";
import Grid from "@mui/material/Unstable_Grid2";
import { WidgetSelector } from "../../../components/Layouts/WidgetSelector";
import { Widget } from "../../../components/Layouts/Widget";
import { Box, IconButton } from "@mui/material";
import React, { useState } from "react";
import { TextField, Typography, Button, Stack, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { useAuth } from "../../../contexts/AuthProvider";
import { deleteSection } from "./api";
export function Section({
  section,
  onChange,

  onWidgetSelect,
  onWidgetUpdate,
  widgets,
  viewMode,
  onAddAfter,
  onDuplicate,
  onDelete,
}) {
  const hasLayout = section.layout_field && section.layout_field.length > 0;
  const [refresh, setRefresh] = useState(false);
  const { token, user, saveUser, logout, isAuthorized } = useAuth();
  const handleAddSection = () => {};

  const handleDeleteSection = async () => {
    try {
      await deleteSection(token, section.id);
      setRefresh(true);
    } catch (error) {
      console.error(error);
    }
  };

  if (!hasLayout && !viewMode) {
    return (
      <LayoutSelector
        onLayoutSelect={(layout_field) =>
          onChange(section.id, {
            layout_field,
          })
        }
      />
    );
  }

  if (!hasLayout) {
    return null;
  }
  return (
    <Box>
      {!viewMode && (
        <Grid
          container
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Grid
            item
            xs={2}
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{
              borderStartStartRadius: "6px",
              borderStartEndRadius: "6px",
              border: "1px solid #ED7D31",
              borderBottom: "none",
            }}
          >
            <IconButton onClick={() => onAddAfter(section)}>
              <AddIcon style={{ color: "#ED7D31", width: "20px" }} />
            </IconButton>
            <IconButton onClick={() => onDuplicate(section)}>
              <ContentCopyIcon style={{ color: "#ED7D31", width: "20px" }} />
            </IconButton>

            <IconButton onClick={() => onDelete(section)}>
              <ClearIcon style={{ color: "#ED7D31", width: "20px" }} />
            </IconButton>
          </Grid>
        </Grid>
      )}
      <Grid
        container
        columnSpacing={2}
        sx={{ borderRadius: "6px", border: "1px solid #ED7D31", padding: 2 }}
      >
        {section.layout_field.map((column, index) => (
          <Grid item xs={column}>
            {!widgets[index] && !viewMode && (
              <WidgetSelector
                handle={(...args) => onWidgetSelect(...args, section.id)}
                index={index}
              />
            )}
            {!widgets[index] && viewMode && (
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                sx={{
                  padding: 2,
                  borderRadius: "6px",
                  border: "1px dashed #575757",
                  height: "100%",
                }}
              >
                Widget is not defined
              </Box>
            )}
            {!!widgets[index] && (
              <Widget
                viewMode={viewMode}
                onChange={(data) => onWidgetUpdate(data, index, section.id)}
                widget={widgets[index]}
              />
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
