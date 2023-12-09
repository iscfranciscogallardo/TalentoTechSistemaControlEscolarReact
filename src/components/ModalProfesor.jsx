import { useEffect, useState } from "react"
import { Modal, Table, Button, ModalHeader, ModalBody, Form, FormGroup, Label, Input, ModalFooter } from "reactstrap"

const ModalProfesor = ({ mostrarModal, setMostrarModal, guardarProfesor, editar, editarProfesor, soloVer }) => {

    const modeloProfesor = {
        id: 0
        , nombre: ""
        , apellidoPaterno: ""
        , apellidoMaterno: ""
        , especialidad: ""
        , correoElectronico: ""
        , telefono: ""
        , estatus: 1
    }

    const [profesor, setProfesor] = useState(modeloProfesor)

    const actualizarDato = (e) => {
        setProfesor({...profesor, [e.target.name]: e.target.value})
    }

    const enviarDatos = () => {
        if (profesor.id == 0) {
            guardarProfesor(profesor);
            cerrarModal();
        } else {
            editarProfesor(profesor);
            cerrarModal();
        }
    }

    const cerrarModal = () => {
        reiniciarModal();
        setMostrarModal(!mostrarModal)
    }

    const reiniciarModal = () => setProfesor(modeloProfesor);

    useEffect(() => {
        if (editar != null) {
            setProfesor(editar);
        } else {
            setProfesor(modeloProfesor);
        }
    }, [editar])

    return (
        <Modal isOpen={mostrarModal}>
            <ModalHeader>{profesor.id == 0? "Agregar profesor": !soloVer?"Editar profesor":"Profesor"}</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input name="nombre" onChange={(e) => actualizarDato(e)} value={ profesor.nombre} readOnly={soloVer} ></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Apellido Paterno</Label>
                        <Input name="apellidoPaterno" onChange={(e) => actualizarDato(e)} value={profesor.apellidoPaterno} readOnly={soloVer} ></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Apellido Paterno</Label>
                        <Input name="apellidoMaterno" onChange={(e) => actualizarDato(e)} value={profesor.apellidoMaterno} readOnly={soloVer}  ></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Especialidad</Label>
                        <Input name="especialidad" onChange={(e) => actualizarDato(e)} value={ profesor.especialidad} readOnly={soloVer} ></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Correo Electrónico</Label>
                        <Input name="correoElectronico" onChange={(e) => actualizarDato(e)} value={profesor.correoElectronico} readOnly={soloVer} ></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Telefono</Label>
                        <Input name="telefono" onChange={(e) => actualizarDato(e)} value={profesor.telefono} readOnly={soloVer} ></Input>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                {!soloVer && <Button color="success" size="sm" className="me-2" onClick={ enviarDatos} >Guardar</Button>}
                <Button color="default" size="sm" onClick={ cerrarModal} >{soloVer?"Cerrar":"Cancelar"}</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalProfesor;