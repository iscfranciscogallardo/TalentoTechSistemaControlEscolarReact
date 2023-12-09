import { Container, Row, Col, Card, CardHeader, CardBody, CardFooter, Button } from "reactstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import TablaAlumnos from "../components/TablaAlumnos";
import ModalAlumno from "../components/ModalAlumno";

const Alumnos = () => {
    const [alumnos, setAlumnos] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [editar, setEditar] = useState(null);
    const [soloVer, setSoloVer] = useState(false);

    const BASE_API_URL = 'http://localhost:5007/api';

    /*
    Servicios API
    */

    const mostrarAlumnos = async () => {
        const response = await fetch(`${BASE_API_URL}/alumnos`);
        if (response.ok) {
            const data = await response.json()
            console.log(data);
            setAlumnos(data)
        }
    }

    const guardarAlumno = async (alumno) => {
        const response = await fetch(`${BASE_API_URL}/alumnos`, { method: "POST", headers: { "Content-Type": "application/json;charset=utf-8" }, body: JSON.stringify(alumno) })
        if (response.ok) {
            setMostrarModal(!mostrarModal)
            mostrarAlumnos()
        }
    }

    const editarAlumno = async (alumno) => {
        const response = await fetch(`${BASE_API_URL}/alumnos/`+alumno.id, { method: "PUT", headers: { "Content-Type": "application/json;charset=utf-8" }, body: JSON.stringify(alumno) })
        if (response.ok) {
            setMostrarModal(!mostrarModal)
            mostrarAlumnos()
        }
    }

    const eliminarAlumno = async (id) => {
        var respuesta = window.confirm('¿desea eliminar al alumno?');
        if (!respuesta) return;

        const response = await fetch(`${BASE_API_URL}/alumnos/`+id, { method: "DELETE"})
        if (response.ok) {
            mostrarAlumnos()
        }
    }

    useEffect(() => {
        mostrarAlumnos()
    }, [])

    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <CardHeader>
                        <h5>Lista de Alumnos</h5>
                    </CardHeader>
                    <CardBody>
                        <Button size="sm" color="success" onClick={() => {setMostrarModal(!mostrarModal); setSoloVer(false);}} >Agregar Alumno</Button>
                        <br></br>
                        <TablaAlumnos data={alumnos} mostrarModal={mostrarModal} setMostrarModal={setMostrarModal} setEditar={setEditar} editarAlumno={editarAlumno} eliminarAlumno={eliminarAlumno} setSoloVer={setSoloVer} />
                    </CardBody>
                </Col>
            </Row>
            <ModalAlumno mostrarModal={mostrarModal} setMostrarModal={setMostrarModal} guardarAlumno={guardarAlumno} editar={editar} editarAlumno={editarAlumno} soloVer={soloVer} ></ModalAlumno>
        </Container>
    )
};

export default Alumnos;