import { Container, Row, Col, Card, CardHeader, CardBody, CardFooter, Button } from "reactstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import TablaCalificaciones from "../components/TablaCalificaciones";
import ModalCalificacion from "../components/ModalCalificacion";

const Calificaciones = () => {
    const [calificaciones, setCalificaciones] = useState([]);
    const [profesores, setProfesores] = useState([]);
    const [alumnos, setAlumnos] = useState([]);
    const [materias, setMaterias] = useState([]);
    const [alumnosMaterias, setAlumnosMaterias] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [editar, setEditar] = useState(null);
    const [soloVer, setSoloVer] = useState(false);

    const BASE_API_URL = 'http://localhost:5007/api';

    /*
    Servicios API
    */
    const obtenerProfesores = async () => {
        const response = await fetch(`${BASE_API_URL}/profesores`);
        if (response.ok) {
            const data = await response.json()
            console.log(data);
            setProfesores(data)
        }
    }

    const obtenerMaterias = async () => {
        const response = await fetch(`${BASE_API_URL}/materias`);
        if (response.ok) {
            const data = await response.json()
            console.log(data);
            setMaterias(data)
        }
    }

    const obtenerAlumnos = async () => {
        const response = await fetch(`${BASE_API_URL}/alumnos`);
        if (response.ok) {
            const data = await response.json()
            console.log(data);
            setAlumnos(data)
        }
    }

    const obtenerAlumnosMaterias = async () => {
        const response = await fetch(`${BASE_API_URL}/alumnosmaterias`);
        if (response.ok) {
            const data = await response.json()
            console.log(data);
            setAlumnosMaterias(data)
        }
    }

    const mostrarCalificaciones = async () => {
        const response = await fetch(`${BASE_API_URL}/calificaciones`);
        if (response.ok) {
            const data = await response.json()
            console.log(data);
            setCalificaciones(data)
        }
    }

    const guardarCalificacion = async (calificacion) => {
        const response = await fetch(`${BASE_API_URL}/calificaciones`, { method: "POST", headers: { "Content-Type": "application/json;charset=utf-8" }, body: JSON.stringify(calificacion) })
        if (response.ok) {
            setMostrarModal(!mostrarModal)
            mostrarCalificaciones()
        }
    }

    const editarCalificacion = async (calificacion) => {
        const response = await fetch(`${BASE_API_URL}/calificaciones/`+calificacion.id, { method: "PUT", headers: { "Content-Type": "application/json;charset=utf-8" }, body: JSON.stringify(calificacion) })
        if (response.ok) {
            setMostrarModal(!mostrarModal)
            mostrarCalificaciones()
        }
    }

    const eliminarCalificacion = async (id) => {
        var respuesta = window.confirm('¿desea eliminar la calificacion?');
        if (!respuesta) return;

        const response = await fetch(`${BASE_API_URL}/calificaciones/`+id, { method: "DELETE"})
        if (response.ok) {
            mostrarCalificaciones()
        }
    }

    useEffect(() => {
        obtenerProfesores();
        obtenerAlumnos();
        obtenerAlumnosMaterias();
        obtenerMaterias();
        mostrarCalificaciones();
    }, [])

    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <CardHeader>
                        <h5>Lista de Calificaciones</h5>
                    </CardHeader>
                    <CardBody>
                        <Button size="sm" color="success" onClick={() => {setMostrarModal(!mostrarModal); setSoloVer(false);}} >Agregar Calificación</Button>
                        <br></br>
                        <TablaCalificaciones data={calificaciones} mostrarModal={mostrarModal} setMostrarModal={setMostrarModal} setEditar={setEditar} editarCalificacion={editarCalificacion} eliminarCalificacion={eliminarCalificacion} setSoloVer={setSoloVer} profesores={profesores} alumnos={alumnos} materias={materias} alumnosMaterias={alumnosMaterias} />
                    </CardBody>
                </Col>
            </Row>
            <ModalCalificacion mostrarModal={mostrarModal} setMostrarModal={setMostrarModal} guardarCalificacion={guardarCalificacion} editar={editar} editarCalificacion={editarCalificacion} soloVer={soloVer}  profesores={profesores} alumnos={alumnos} materias={materias} alumnosMaterias={alumnosMaterias} ></ModalCalificacion>        
        </Container>
    )
};

export default Calificaciones;