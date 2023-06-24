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
    path: "/note/:id",
    element: <NoteView />,
  },
  {
    path: "/note",
    element: <CreateNote />,
  },
  {
    path: "/notes/saved",
    element: <SavedNotesList />,
  },
];
