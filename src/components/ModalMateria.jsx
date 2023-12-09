import { useEffect, useState } from "react"
import { Modal, Table, Button, ModalHeader, ModalBody, Form, FormGroup, Label, Input, ModalFooter, Sele, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"

const ModalMateria = ({ mostrarModal, setMostrarModal, guardarMateria, editar, editarMateria, soloVer, profesores }) => {

    const modeloMateria = {
        id: 0
        , profesorId: 0
        , nombre: ""
        , minimoAprobatorio : '0'
        , estatus: 1
    }
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);

    const [materia, setMateria] = useState(modeloMateria)

    const actualizarDato = (e) => {
        setMateria({...materia, [e.target.name]: e.target.value})
    }

    const enviarDatos = () => {
        if (materia.id == 0) {
            guardarMateria(materia);
            cerrarModal();
        } else {
            editarMateria(materia);
            cerrarModal();
        }
    }

    const cerrarModal = () => {
        reiniciarModal();
        setMostrarModal(!mostrarModal)
    }

    const reiniciarModal = () => setMateria(modeloMateria);

    useEffect(() => {
        if (editar != null) {
            setMateria(editar);
        } else {
            setMateria(modeloMateria);
        }
    }, [editar])

    return (
        <Modal isOpen={mostrarModal}>
            <ModalHeader>{materia.id == 0? "Agregar Materia":!soloVer?"Editar Materia":"Materia"}</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input name="nombre" onChange={(e) => actualizarDato(e)} value={materia.nombre} readOnly={soloVer} ></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Profesor</Label>
                        <Input name="profesorId" type="select"  onChange={(e) => actualizarDato(e)} value={materia.profesorId } disabled={soloVer} >
                            {
                                (profesores.length < 1) ? (
                                    <option value={0}>No hay profesores</option>
                                ) : (
                                    profesores.map((item) => (
                                        <option value={item.id}> {item.nombre + ' ' + item.apellidoPaterno + ' ' + item.apellidoMaterno} </option>
                                        ))

                                )
                            }
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Minimo Aprobatorio</Label>
                        <Input name="minimoAprobatorio" onChange={(e) => actualizarDato(e)} value={materia.minimoAprobatorio } readOnly={soloVer} ></Input>
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

export default ModalMateria;