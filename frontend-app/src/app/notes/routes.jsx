import { NotesList } from "./list";
import { NoteView } from "./view";
import {CreateNote} from "./create"
import {SavedNotesList} from './saved-list'
import { CourseNotesList } from "./courseNotes";
import { ChatBot } from "../chatbot";
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
  {
    path: "/notes/coursenotes",
    element: <CourseNotesList/>,
  },
  {
    path: "/chatBot",
    element: <ChatBot/>,
  },
];
