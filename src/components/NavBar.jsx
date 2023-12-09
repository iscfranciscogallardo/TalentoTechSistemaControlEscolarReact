import { Link } from "react-router-dom";

const NavBar = () => {

    return (
        <nav class="navbar navbar-dark bg-primary px-5">
            <Link to="/" className="navbar-brand mr-0 mr-md-2"><img src="/schoolicon32.png" alt="Sistema de Control Escolar"/></Link>
            <Link to="/profesores"><span class="navbar-brand">Profesores</span></Link>
            <Link to="/materias"><span class="navbar-brand">Materias</span></Link>
            <Link to="/alumnos"><span class="navbar-brand">Alumnos</span></Link>
            <Link to="/alumnosmaterias"><span class="navbar-brand">Alumnos-Materias</span></Link>
            <Link to="/calificaciones"><span class="navbar-brand">Calificaciones</span></Link>
        </nav>
    );
};

export default NavBar;