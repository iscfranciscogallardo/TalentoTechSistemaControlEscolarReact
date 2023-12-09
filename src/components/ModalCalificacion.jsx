import { useEffect, useState } from "react"
import { Modal, Table, Button, ModalHeader, ModalBody, Form, FormGroup, Label, Input, ModalFooter, Sele, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"

const ModalCalificacion = ({ mostrarModal, setMostrarModal, guardarCalificacion, editar, editarCalificacion, soloVer, profesores, alumnos, materias, alumnosMaterias }) => {

    const modeloCalificacion = {
        id:0
        , alumnoMateriaId:0
        , calificacion :0
        , observaciones :""
    }
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);

    const [calificacion, setCalificacion] = useState(modeloCalificacion)

    const actualizarDato = (e) => {
        setCalificacion({...calificacion, [e.target.name]: e.target.value})
    }

    const obtenerTextoAlumnoMateria = (id)=> {
        var nombre = '';
        if(profesores!=null && alumnosMaterias!=null && materias!=null && alumnos!=null){
            var alumnoMateriaFiltada=alumnosMaterias.filter(alumnomateria=>alumnomateria?.id == id)[0];
            var materiaFiltada = materias.filter(materia=>materia.id == alumnoMateriaFiltada?.materiaId)[0];
            var profesorFiltado=profesores.filter(profesor=>profesor.id == materiaFiltada?.profesorId)[0];
            var alumnoFiltrado = alumnos.filter(alumno=>alumno.id == alumnoMateriaFiltada?.alumnoId)[0];
            nombre = materiaFiltada?.nombre + '[' + profesorFiltado?.nombre + ' ' + profesorFiltado?.apellidoPaterno + ' ' + profesorFiltado?.apellidoMaterno + '] ' + alumnoFiltrado?.nombre + ' ' + alumnoFiltrado?.apellidoPaterno + ' ' + alumnoFiltrado?.apellidoMaterno;
        }
        return nombre;
    }

    const enviarDatos = () => {
        if (calificacion.id == 0) {
            guardarCalificacion(calificacion);
            cerrarModal();
        } else {
            editarCalificacion(calificacion);
            cerrarModal();
        }
    }

    const cerrarModal = () => {
        reiniciarModal();
        setMostrarModal(!mostrarModal)
    }

    const reiniciarModal = () => setCalificacion(modeloCalificacion);

    useEffect(() => {
        if (editar != null) {
            setCalificacion(editar);
        } else {
            setCalificacion(modeloCalificacion);
        }
    }, [editar])

    return (
        <Modal isOpen={mostrarModal}>
            <ModalHeader>{calificacion.id == 0? "Agregar Calificacion":!soloVer?"Editar Calificacion":"Calificacion"}</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Alumno - Materia</Label>
                        <Input name="alumnoMateriaId" type="select"  onChange={(e) => actualizarDato(e)} value={calificacion.alumnoMateriaId} disabled={soloVer} >
                            {
                                (alumnosMaterias.length < 1) ? (
                                    <option value={0}>No hay alumnos - materias</option>
                                ) : (
                                    alumnosMaterias.map((item) => (
                                        <option value={item.id}> {obtenerTextoAlumnoMateria(item.id)} </option>
                                        ))

                                )
                            }
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Calificación</Label>
                        <Input name="calificacion" onChange={(e) => actualizarDato(e)} value={calificacion.calificacion} readOnly={soloVer} ></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Observaciones</Label>
                        <Input name="observaciones" onChange={(e) => actualizarDato(e)} value={calificacion.observaciones } disabled={soloVer} >
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

export default ModalCalificacion;