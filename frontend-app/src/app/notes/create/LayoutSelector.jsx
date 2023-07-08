import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { LayoutItem } from "../../../components/Layouts/LayoutItem";
import { useTheme } from "@mui/material/styles";

export function LayoutSelector({ onLayoutSelect }) {
  const theme = useTheme();
  return (
    <Box
      padding={2}
      sx={{
        backgroundColor: theme.palette.grey[100],
        borderRadius: 2,
      }}
    >
      <Box
        margin={2}
        display={"flex"}
        justifyContent={"center"}
        alignContent={"center"}
      >
        CHOOSE LAYOUT
      </Box>
      <Grid container justifyContent={"center"} alignContent={"center"}>
        <LayoutItem columns={[12]} handle={onLayoutSelect}></LayoutItem>
        <LayoutItem columns={[6, 6]} handle={onLayoutSelect}></LayoutItem>
        <LayoutItem columns={[4, 4, 4]} handle={onLayoutSelect}></LayoutItem>
        <LayoutItem columns={[3, 3, 3, 3]} handle={onLayoutSelect}></LayoutItem>
        <LayoutItem columns={[4, 8]} handle={onLayoutSelect}></LayoutItem>
        <LayoutItem columns={[8, 4]} handle={onLayoutSelect}></LayoutItem>
      </Grid>
      <Grid container justifyContent={"center"} alignContent={"center"}>
        <LayoutItem columns={[3, 3, 6]} handle={onLayoutSelect}></LayoutItem>
        <LayoutItem columns={[6, 3, 3]} handle={onLayoutSelect}></LayoutItem>
        <LayoutItem columns={[3, 6, 3]} handle={onLayoutSelect}></LayoutItem>
        <LayoutItem
          columns={[2.4, 2.4, 2.4, 2.4, 2.4]}
          handle={onLayoutSelect}
        ></LayoutItem>
        <LayoutItem columns={[2, 8, 2]} handle={onLayoutSelect}></LayoutItem>
        <LayoutItem
          columns={[2, 2, 2, 2, 2, 2]}
          handle={onLayoutSelect}
        ></LayoutItem>
      </Grid>
    </Box>
  );
}
