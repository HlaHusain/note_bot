import { CreateCourseDialog } from "./create";
import { CoursesList } from "./list";
import { SearchByCourse } from "./search";

export const routes = [
  {
    path: "/courses",
    element: <CoursesList />,
  },
  {
    path: "/create-course",
    element: <CreateCourseDialog />,
  },
  {
    path: "/search/:keyword",
    element: <SearchByCourse />,
  },
];