import { LayoutSelector } from "./LayoutSelector";
import Grid from "@mui/material/Unstable_Grid2";
import { WidgetSelector } from "../../../components/Layouts/WidgetSelector";
import { Widget } from "../../../components/Layouts/Widget";
import { Box } from "@mui/material";

export function Section({
  section,
  onChange,

  onWidgetSelect,
  onWidgetUpdate,
  widgets,
  viewMode,
}) {
  if (!section.layout) {
    return (
      <LayoutSelector
        onLayoutSelect={(layout) =>
          onChange(section.id, {
            layout: layout,
          })
        }
      />
    );
  }
  return (
    <Grid container minHeight="100%" height="50vh" spacing={2}>
      {section.layout.map((column, index) => (
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
  );
}
