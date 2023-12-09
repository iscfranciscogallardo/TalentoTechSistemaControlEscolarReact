import { useEffect, useState } from "react"
import { Modal, Table, Button, ModalHeader, ModalBody, Form, FormGroup, Label, Input, ModalFooter } from "reactstrap"

const ModalAlumno = ({ mostrarModal, setMostrarModal, guardarAlumno, editar, editarAlumno, soloVer }) => {

    const modeloAlumno = {
        id: 0
        , nombre: ""
        , apellidoPaterno: ""
        , apellidoMaterno: ""
        , especialidad: ""
        , correoElectronico: ""
        , telefono: ""
        , promedioTotal: 0
        , estatus: 1
    }

    const [alumno, setAlumno] = useState(modeloAlumno)

    const actualizarDato = (e) => {
        setAlumno({...alumno, [e.target.name]: e.target.value})
    }

    const enviarDatos = () => {
        if (alumno.id == 0) {
            guardarAlumno(alumno);
            cerrarModal();
        } else {
            editarAlumno(alumno);
            cerrarModal();
        }
    }

    const cerrarModal = () => {
        reiniciarModal();
        setMostrarModal(!mostrarModal)
    }

    const reiniciarModal = () => setAlumno(modeloAlumno);

    useEffect(() => {
        if (editar != null) {
            setAlumno(editar);
        } else {
            setAlumno(modeloAlumno);
        }
    }, [editar])

    return (
        <Modal isOpen={mostrarModal}>
            <ModalHeader>{alumno.id == 0? "Agregar alumno":"Editar alumno"}</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input name="nombre" onChange={(e) => actualizarDato(e)} value={ alumno.nombre} ></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Apellido Paterno</Label>
                        <Input name="apellidoPaterno" onChange={(e) => actualizarDato(e)} value={alumno.apellidoPaterno} ></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Apellido Paterno</Label>
                        <Input name="apellidoMaterno" onChange={(e) => actualizarDato(e)} value={alumno.apellidoMaterno} ></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Especialidad</Label>
                        <Input name="especialidad" onChange={(e) => actualizarDato(e)} value={ alumno.especialidad} ></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Correo Electrónico</Label>
                        <Input name="correoElectronico" onChange={(e) => actualizarDato(e)} value={alumno.correoElectronico} ></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Telefono</Label>
                        <Input name="telefono" onChange={(e) => actualizarDato(e)} value={alumno.telefono} ></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Promedio</Label>
                        <Input name="promedioTotal" readOnly value={alumno.promedioTotal} ></Input>
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

export default ModalAlumno;