import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Container, Stack } from "@mui/material";
import { PageHeader } from "../../../components/PageHeader";
import { useEffect } from "react";

import { useAuth } from "../../../contexts/AuthProvider";

import { Section } from "../create/Section";
import { getWidgets } from "./api";
import { useParams } from "react-router-dom";

export const NoteView = ({}) => {
  const params = useParams();

  const [note, setNote] = React.useState(null);
  const [sections, setSections] = React.useState([]);
  const [widgets, setWidgets] = React.useState({});
  const { token } = useAuth();
  useEffect(() => {
    getWidgets(token, params.id).then((res) => {
      const widgets = {};

      res.widgets.map((widget) => {
        if (!widgets[widget.section_id]) {
          widgets[widget.section_id] = {};
        }

        widgets[widget.section_id][widget.layout_index] = {
          ...widget,
          data: widget.data || {},
        };
      });
      setNote(res.note);
      setSections(
        res.sections.map((section) => ({
          ...section,
          layout: section.layout_field,
        }))
      );
      setWidgets(widgets);
    });
  }, [params.id, token]);

  return (
    <Container sx={{ flexGrow: 1, padding: 2 }}>
      <PageHeader title={note?.title} isEditable={false} actions={[]} />
      <Stack direction="column" spacing={6}>
        {sections.map((section, index) => (
          <>
            {index > 0 && <Box sx={{ height: 16, width: "100%" }} />}
            <Section
              key={section._id}
              section={section}
              widgets={widgets[section._id] || {}}
              viewMode={true}
            />
          </>
        ))}
      </Stack>
    </Container>
  );
};
