import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Profesores from "./pages/Profesores";
import Materias from "./pages/Materias";
import Alumnos from "./pages/Alumnos";
import AlumnosMaterias from "./pages/AlumnosMaterias";
import Calificaciones from "./pages/Calificaciones";


function App() {
  return (
      <BrowserRouter>
        <main className="h-screen flex flex-col">
            <NavBar />
            <Routes>
              <Route path="/" exact element={<Home/>}></Route>
              <Route path="/profesores" exact element={<Profesores/>}></Route>
              <Route path="/materias" exact element={<Materias/>}></Route>
              <Route path="/alumnos" exact element={<Alumnos/>}></Route>
              <Route path="/alumnosmaterias" exact element={<AlumnosMaterias/>}></Route>
              <Route path="/calificaciones" exact element={<Calificaciones/>}></Route>
            </Routes>
        </main>
      </BrowserRouter>
  )
};

export default App;

