import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { LayoutItem } from "../../../components/Layouts/LayoutItem";
export function LayoutSelector({ onLayoutSelect }) {
  return (
    <Box padding={1}>
      <Box
        margin={1}
        display={"flex"}
        justifyContent={"center"}
        alignContent={"center"}
      >
        CHOOSE LAYOUT
      </Box>
      <Grid container>
        <LayoutItem columns={[12]} handle={onLayoutSelect}></LayoutItem>
        <LayoutItem columns={[6, 6]} handle={onLayoutSelect}></LayoutItem>
        <LayoutItem columns={[4, 4, 4]} handle={onLayoutSelect}></LayoutItem>
        <LayoutItem columns={[3, 3, 3, 3]} handle={onLayoutSelect}></LayoutItem>
        <LayoutItem columns={[4, 8]} handle={onLayoutSelect}></LayoutItem>
        <LayoutItem columns={[8, 4]} handle={onLayoutSelect}></LayoutItem>
      </Grid>
      <Grid container>
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
