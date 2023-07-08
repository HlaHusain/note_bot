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
  const hasLayout = section.layout_field && section.layout_field.length > 0;
  if (!hasLayout) {
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
  return (
    <Grid container spacing={2}>
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
  );
}
