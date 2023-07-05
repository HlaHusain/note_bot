import { CreateCourse } from "./create";
import { CoursesList } from "./list";
import { SearchByCourse } from "./search";


const courses = [
  { id: 1, title: 'Advanced Web Tech', notes: [
    { id: 1, title: 'Note 1', content: 'Lorem ipsum dolor sit amet' },
    { id: 2, title: 'Note 2', content: 'Consectetur adipiscing elit' },
  ] },
  { id: 2, title: 'Interactive Systems', notes: [
    { id: 3, title: 'Note 3', content: 'Pellentesque ac ligula' },
    { id: 4, title: 'Note 4', content: 'Mauris aliquet rhoncus est' },
    { id: 5, title: 'Note 5', content: 'Nullam congue libero' },
  ] },
  // Add more courses as needed
];
const handleDeleteCourse = courseId => {
  // Handle the delete course logic
};


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