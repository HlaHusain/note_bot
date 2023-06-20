import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Archive from "./pages/Archive";
import Error from "./pages/Error";
import SharedLayout from "./pages/SharedLayout";
import SingleArchive from "./pages/SingleArchive";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import ProtectedRoute from "./pages/ProtectedRoute";
import Archives from "./data";
function App() {
  const [user,setUser]=useState(null);
  return (
    <>
    <BrowserRouter>
     {/*هيكل او بناء الراوتس*/}
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path='Courses' element={<Courses />} />
            <Route path='/Archive' element={<Archive/>} />
            <Route path=':archiveid' element={<SingleArchive />} /> {/*this should be the same name
          which is in the data.js*/}
          <Route path='/Signup' element={<Signup setUser={setUser} />} />
          <Route path='/Dashboard' element={
            <ProtectedRoute user={user}>
              <Dashboard user={user} />
            </ProtectedRoute>
          }
            />
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
