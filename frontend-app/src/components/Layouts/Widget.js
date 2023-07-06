import { Avatar, Box, Grid, Stack, Tooltip, Typography } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TitleIcon from "@mui/icons-material/Title";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Text } from "./Widgets/Text";
import { PdfWidget } from "./Widgets/PdfWidget";
import { VideoWidget } from "./Widgets/VideoWidget";
const widgetTypes = {
  TEXT: Text,
  PDF: PdfWidget,
  VIDEO: VideoWidget,
};

export const Widget = ({ widget, onChange, viewMode }) => {
  const WidgetType = widgetTypes[widget.type];
  return (
    <Box
      sx={{
        borderRadius: "6px",
        border: "1px dashed #575757",
        height: "100%",
        padding: 2,
      }}
    >
      {!!WidgetType && (
        <WidgetType viewMode={viewMode} widget={widget} onChange={onChange} />
      )}
      {!WidgetType && `Widget of type ${widget.type} is not defined`}
    </Box>
  );
};
