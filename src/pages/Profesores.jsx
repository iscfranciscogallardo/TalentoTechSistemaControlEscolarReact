import { Container, Row, Col, Card, CardHeader, CardBody, CardFooter, Button } from "reactstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import TablaProfesores from "../components/TablaProfesores";
import ModalProfesor from "../components/ModalProfesor";

const Profesores = () => {
    const [profesores, setProfesores] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [editar, setEditar] = useState(null);
    const [soloVer, setSoloVer] = useState(false);

    const BASE_API_URL = 'http://localhost:5007/api';

    /*
    Servicios API
    */

    const mostrarProfesores = async () => {
        const response = await fetch(`${BASE_API_URL}/profesores`);
        if (response.ok) {
            const data = await response.json()
            console.log(data);
            setProfesores(data)
        }
    }

    const guardarProfesor = async (profesor) => {
        const response = await fetch(`${BASE_API_URL}/profesores`, { method: "POST", headers: { "Content-Type": "application/json;charset=utf-8" }, body: JSON.stringify(profesor) })
        if (response.ok) {
            setMostrarModal(!mostrarModal)
            mostrarProfesores()
        }
    }

    const editarProfesor = async (profesor) => {
        const response = await fetch(`${BASE_API_URL}/profesores/`+profesor.id, { method: "PUT", headers: { "Content-Type": "application/json;charset=utf-8" }, body: JSON.stringify(profesor) })
        if (response.ok) {
            setMostrarModal(!mostrarModal)
            mostrarProfesores()
        }
    }

    const eliminarProfesor = async (id) => {
        var respuesta = window.confirm('¿desea eliminar al profesor?');
        if (!respuesta) return;

        const response = await fetch(`${BASE_API_URL}/profesores/`+id, { method: "DELETE"})
        if (response.ok) {
            mostrarProfesores()
        }
    }

    useEffect(() => {
        mostrarProfesores()
    }, [])

    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <CardHeader>
                        <h5>Lista de Profesores</h5>
                    </CardHeader>
                    <CardBody>
                        <Button size="sm" color="success" onClick={() => {setMostrarModal(!mostrarModal); setSoloVer(false);}} >Agregar Profesor</Button>
                        <br></br>
                        <TablaProfesores data={profesores} mostrarModal={mostrarModal} setMostrarModal={setMostrarModal} setEditar={setEditar} editarProfesor={editarProfesor} eliminarProfesor={eliminarProfesor} setSoloVer={setSoloVer} />
                    </CardBody>
                </Col>
            </Row>
            <ModalProfesor mostrarModal={mostrarModal} setMostrarModal={setMostrarModal} guardarProfesor={guardarProfesor} editar={editar} editarProfesor={editarProfesor} soloVer={soloVer} ></ModalProfesor>
        </Container>
    )
};

export default Profesores;