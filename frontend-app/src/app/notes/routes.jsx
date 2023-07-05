import { NotesList } from "./list";
import { NoteView } from "./view";
import {CreateNote} from "./create"
import {SavedNotesList} from './saved-list'
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
    path: "/notes/create",
    element: <CreateNote />,
  },
  {
    path: "/notes/saved",
    element: <SavedNotesList />,
  },
];
