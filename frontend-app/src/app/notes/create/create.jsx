import * as React from "react";
import { Style } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Button, Container } from "@mui/material";
import { PageHeader } from "../../../components/PageHeader";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import { LayoutItem } from "../../../components/Layouts/LayoutItem";
import { Widget } from "../../../components/Layouts/Widget";
import { useState } from "react";
import { TextEditor } from "../../../components/TextEditor";
import { WidgetSelector } from "../../../components/Layouts/WidgetSelector";
export const CreateNote = () => {
  const [step, setStep] = React.useState("INITIAL");
  const [widgets,setWidgets] = useState({})

  const [columns, setColumns] = React.useState([]);

  const onLayoutSelect = (columns) => {
    setColumns(columns);
    setStep("WIDGET");
  };
  const arrayWidget = {}
  const onWidgetSelect =(type , index)=>{

    setWidgets((widgets)=> ({
      ...widgets,
      [index] : {type}
    }) )

  }

  console.log('widgets' ,widgets )

  const onTextEditorChange =()=>{

  }

  return (
    <Container sx={{ flexGrow: 1, padding: 6 }}>
      <PageHeader
        title="New note title"
        actions={[
          {
            label: "download as pdf",
            startIcon: <FileDownloadIcon />,
            onClick: () => {},
            color: "primary",
            variant: "outlined",
            disabled: true,
          },
          {
            label: "Save NOTE",
            startIcon: <SaveIcon />,
            onClick: () => {},
            disableElevation: true,
            disabled: true,
          },
        ]}
      />

      {step === "INITIAL" && (
        <Grid
          item
          xs={10}
          md={10}
          sx={{
            padding: 5,
            height: 150,
            borderRadius: "5px",
            border: "1px dashed #000",
            background: "#FFF",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Button
            color="primary"
            onClick={() => setStep("LAYOUT")}
            variant="contained"
            sx={{
              borderRadius: "50%",
              width: 70,
              height: 70,
              alignContent: "center",
              justifyContent: "center",
              ":hover": {
                background: "#ed955a",
                color: "#FFFFFF",
              },
            }}
          >
            <AddIcon />
          </Button>
        </Grid>
      )}

      {step === "LAYOUT" && (
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
            <LayoutItem
              columns={[4, 4, 4]}
              handle={onLayoutSelect}
            ></LayoutItem>
            <LayoutItem
              columns={[3, 3, 3, 3]}
              handle={onLayoutSelect}
            ></LayoutItem>
            <LayoutItem columns={[4, 8]} handle={onLayoutSelect}></LayoutItem>
            <LayoutItem columns={[8, 4]} handle={onLayoutSelect}></LayoutItem>
          </Grid>
          <Grid container>
            <LayoutItem
              columns={[3, 3, 6]}
              handle={onLayoutSelect}
            ></LayoutItem>
            <LayoutItem
              columns={[6, 3, 3]}
              handle={onLayoutSelect}
            ></LayoutItem>
            <LayoutItem
              columns={[3, 6, 3]}
              handle={onLayoutSelect}
            ></LayoutItem>
            <LayoutItem
              columns={[2.4, 2.4, 2.4, 2.4, 2.4]}
              handle={onLayoutSelect}
            ></LayoutItem>
            <LayoutItem
              columns={[2, 8, 2]}
              handle={onLayoutSelect}
            ></LayoutItem>
            <LayoutItem
              columns={[2, 2, 2, 2, 2, 2]}
              handle={onLayoutSelect}
            ></LayoutItem>
          </Grid>
        </Box>
      )}

      {step === "WIDGET" && (
        <Grid container minHeight="100%" height="50vh" pt={2}>
          {columns.map((column, index) => (
            <Grid item xs={column}>
              <WidgetSelector handle={onWidgetSelect} index={index} />

            </Grid>
          ))}
        </Grid>
      )}

      {/* {step === 'NOTE' && (
        <Grid container minHeight="100%" height="50vh" pt={2}>
          {
            columns.map((column,index) => (
             <Grid item xs={column}>
              {note === 'TEXT' && <Tiptap handle={onTextEditorChange} />}
              {note === 'PDF' && <Widget handle={onWidgetClick} />}
              {note === 'YOUTUBE' && <Widget handle={onWidgetClick} />}
              </Grid>
            ))
          }


        </Grid>
      )} */}
    </Container>
  );
};
