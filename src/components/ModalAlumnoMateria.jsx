import { useEffect, useState } from "react"
import { Modal, Table, Button, ModalHeader, ModalBody, Form, FormGroup, Label, Input, ModalFooter, Sele, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"

const ModalAlumnoMateria = ({ mostrarModal, setMostrarModal, guardarAlumnoMateria, editar, editarAlumnoMateria, soloVer, alumnos, materias }) => {

    const modeloAlumnoMateria = {
        id: 0
        , alumnoId: 0
        , materiaId: 1
        , promedio :0
        , resultado: ""
    }
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);

    const [alumnoMateria, setAlumnoMateria] = useState(modeloAlumnoMateria)

    const actualizarDato = (e) => {
        setAlumnoMateria({...alumnoMateria, [e.target.name]: e.target.value})
    }

    const enviarDatos = () => {
        if (alumnoMateria.id == 0) {
            guardarAlumnoMateria(alumnoMateria);
            cerrarModal();
        } else {
            editarAlumnoMateria(alumnoMateria);
            cerrarModal();
        }
    }

    const cerrarModal = () => {
        reiniciarModal();
        setMostrarModal(!mostrarModal)
    }

    const reiniciarModal = () => setAlumnoMateria(modeloAlumnoMateria);

    useEffect(() => {
        if (editar != null) {
            setAlumnoMateria(editar);
        } else {
            setAlumnoMateria(modeloAlumnoMateria);
        }
    }, [editar])

    return (
        <Modal isOpen={mostrarModal}>
            <ModalHeader>{alumnoMateria.id == 0? "Agregar Alumno-Materia":!soloVer?"Editar Alumno-Materia":"Alunno-Materia"}</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input name="alumnoId" type="select"  onChange={(e) => actualizarDato(e)} value={alumnoMateria.alumnoId } disabled={soloVer} >
                            {
                                (alumnos.length < 1) ? (
                                    <option value={0}>No hay alumnos</option>
                                ) : (
                                    alumnos.map((item) => (
                                        <option value={item.id}> {item.nombre + ' ' + item.apellidoPaterno + ' ' + item.apellidoMaterno} </option>
                                        ))

                                )
                            }
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Materia</Label>
                        <Input name="materiaId" type="select"  onChange={(e) => actualizarDato(e)} value={alumnoMateria.materiaId } disabled={soloVer} >
                            {
                                (materias.length < 1) ? (
                                    <option value={0}>No hay materias</option>
                                ) : (
                                    materias.map((item) => (
                                        <option value={item.id}> {item.nombre} </option>
                                        ))

                                )
                            }
                        </Input>
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

export default ModalAlumnoMateria;