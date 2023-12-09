import { Container, Row, Col, Card, CardHeader, CardBody, CardFooter, Button } from "reactstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import TablaMaterias from "../components/TablaMaterias";
import ModalMateria from "../components/ModalMateria";

const Materias = () => {
    const [materias, setMaterias] = useState([]);
    const [profesores, setProfesores] = useState([]);
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

    const mostrarMaterias = async () => {
        const response = await fetch(`${BASE_API_URL}/materias`);
        if (response.ok) {
            const data = await response.json()
            console.log(data);
            setMaterias(data)
        }
    }

    const guardarMateria = async (materia) => {
        const response = await fetch(`${BASE_API_URL}/materias`, { method: "POST", headers: { "Content-Type": "application/json;charset=utf-8" }, body: JSON.stringify(materia) })
        if (response.ok) {
            setMostrarModal(!mostrarModal)
            mostrarMaterias()
        }
    }

    const editarMateria = async (materia) => {
        const response = await fetch(`${BASE_API_URL}/materias/`+materia.id, { method: "PUT", headers: { "Content-Type": "application/json;charset=utf-8" }, body: JSON.stringify(materia) })
        if (response.ok) {
            setMostrarModal(!mostrarModal)
            mostrarMaterias()
        }
    }

    const eliminarMateria = async (id) => {
        var respuesta = window.confirm('¿desea eliminar la mataria?');
        if (!respuesta) return;

        const response = await fetch(`${BASE_API_URL}/materias/`+id, { method: "DELETE"})
        if (response.ok) {
            mostrarMaterias()
        }
    }

    useEffect(() => {
        obtenerProfesores();
        mostrarMaterias();
    }, [])

    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <CardHeader>
                        <h5>Lista de Materias</h5>
                    </CardHeader>
                    <CardBody>
                        <Button size="sm" color="success" onClick={() => {setMostrarModal(!mostrarModal); setSoloVer(false);}} >Agregar Materia</Button>
                        <br></br>
                        <TablaMaterias data={materias} mostrarModal={mostrarModal} setMostrarModal={setMostrarModal} setEditar={setEditar} editarMateria={editarMateria} eliminarMateria={eliminarMateria} setSoloVer={setSoloVer} profesores={profesores} />
                    </CardBody>
                </Col>
            </Row>
            <ModalMateria mostrarModal={mostrarModal} setMostrarModal={setMostrarModal} guardarMateria={guardarMateria} editar={editar} editarMateria={editarMateria} soloVer={soloVer} profesores={profesores}  ></ModalMateria>        
        </Container>
    )
};

export default Materias;