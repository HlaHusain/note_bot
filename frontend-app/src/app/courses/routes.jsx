import { CreateCourse } from "./create";
import { CoursesList } from "./list";

export const routes = [
  {
    path: "/courses",
    element: <CoursesList />,
  },
  {
    path: "/note",
    element: <CreateCourse />,
  },

];
