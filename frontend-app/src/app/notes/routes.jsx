import { NotesList } from "./list";
import { NoteView } from "./view";
import { CreateNote } from "./create";
import { NoteEdit } from "./edit";
import { SavedNotesList } from "./saved-list";
export const routes = [
  {
    path: "/notes",
    element: <NotesList />,
  },
  {
    path: "/notes/:id",
    element: <NoteView />,
  },
  {
    path: "/notes/:id/edit",
    element: <NoteEdit />,
  },
  {
    path: "/notes/create",
    element: <CreateNote />,
  },
  {
    path: "/notes/saved",
    element: <SavedNotesList />,
  },
];
