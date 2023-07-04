import { LayoutSelector } from "./LayoutSelector";
import Grid from "@mui/material/Unstable_Grid2";
import { WidgetSelector } from "../../../components/Layouts/WidgetSelector";
import { Widget } from "../../../components/Layouts/Widget";

export function Section({
  section,
  onChange,

  onWidgetSelect,
  onWidgetUpdate,
  widgets,
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
          {!widgets[index] && (
            <WidgetSelector
              handle={(...args) => onWidgetSelect(...args, section.id)}
              index={index}
            />
          )}
          {!!widgets[index] && (
            <Widget
              onChange={(data) => onWidgetUpdate(data, index, section.id)}
              widget={widgets[index]}
            />
          )}
        </Grid>
      ))}
    </Grid>
  );
}
