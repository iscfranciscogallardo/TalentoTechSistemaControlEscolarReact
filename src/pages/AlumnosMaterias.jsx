import { Container, Row, Col, Card, CardHeader, CardBody, CardFooter, Button } from "reactstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import TablaAlumnosMaterias from "../components/TablaAlumnosMaterias";
import ModalAlumnoMateria from "../components/ModalAlumnoMateria";

const AlumnosMaterias = () => {
    const [materias, setMaterias] = useState([]);
    const [alumnos, setAlumnos] = useState([]);
    const [alumnosmaterias, setAlumnosMaterias] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [editar, setEditar] = useState(null);
    const [soloVer, setSoloVer] = useState(false);

    const BASE_API_URL = 'http://localhost:5007/api';

    /*
    Servicios API
    */
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

    const mostrarAlumnosMaterias = async () => {
        const response = await fetch(`${BASE_API_URL}/alumnosmaterias`);
        if (response.ok) {
            const data = await response.json()
            console.log(data);
            setAlumnosMaterias(data)
        }
    }

    const guardarAlumnoMateria = async (alumnomateria) => {
        const response = await fetch(`${BASE_API_URL}/alumnosmaterias`, { method: "POST", headers: { "Content-Type": "application/json;charset=utf-8" }, body: JSON.stringify(alumnomateria) })
        if (response.ok) {
            setMostrarModal(!mostrarModal)
            mostrarAlumnosMaterias()
        }
    }

    const editarAlumnoMateria = async (alumnomateria) => {
        const response = await fetch(`${BASE_API_URL}/alumnosmaterias/`+alumnomateria.id, { method: "PUT", headers: { "Content-Type": "application/json;charset=utf-8" }, body: JSON.stringify(alumnomateria) })
        if (response.ok) {
            setMostrarModal(!mostrarModal)
            mostrarAlumnosMaterias()
        }
    }

    const eliminarAlumnoMateria = async (id) => {
        var respuesta = window.confirm('¿desea eliminar la materia para el alumno?');
        if (!respuesta) return;

        const response = await fetch(`${BASE_API_URL}/alumnosmaterias/`+id, { method: "DELETE"})
        if (response.ok) {
            mostrarAlumnosMaterias()
        }
    }

    useEffect(() => {
        obtenerAlumnos();
        obtenerMaterias();
        mostrarAlumnosMaterias();
    }, [])

    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <CardHeader>
                        <h5>Lista de Alumnos-Materias</h5>
                    </CardHeader>
                    <CardBody>
                        <Button size="sm" color="success" onClick={() => {setMostrarModal(!mostrarModal); setSoloVer(false);}} >Agregar Alumno - Materia</Button>
                        <br></br>
                        <TablaAlumnosMaterias data={alumnosmaterias} mostrarModal={mostrarModal} setMostrarModal={setMostrarModal} setEditar={setEditar} editar={editar} eliminarAlumnoMateria={eliminarAlumnoMateria} setSoloVer={setSoloVer} alumnos={alumnos} materias={materias} />
                    </CardBody>
                </Col>
            </Row>
            <ModalAlumnoMateria mostrarModal={mostrarModal} setMostrarModal={setMostrarModal} guardarAlumnoMateria={guardarAlumnoMateria} editar={editar} editarAlumnoMateria={editarAlumnoMateria} soloVer={soloVer} alumnos={alumnos} materias={materias} ></ModalAlumnoMateria>        
        </Container>
    )
};

export default AlumnosMaterias;