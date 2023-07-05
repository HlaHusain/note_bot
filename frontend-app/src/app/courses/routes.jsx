import { CreateCourse } from "./create";
import { CoursesList } from "./list";
import { SearchByCourse } from "./search";


export const routes = [
  {
    path: "/courses",
    element: <CoursesList />,
  },
  {
    path: "/create-course",
    element: <CreateCourse />,
  },
  {
    path: "/course/:keyword",
    element: <SearchByCourse />,
  }
];