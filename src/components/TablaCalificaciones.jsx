import { useEffect } from "react";
import { Table, Button } from "reactstrap"

const TablaCalificaciones = ({ data, setEditar, mostrarModal, setMostrarModal, eliminarCalificacion, setSoloVer, profesores, alumnos, materias, alumnosMaterias }) => {

    const enviarDatos = (materia, soloVer) => {
        setEditar(materia);
        setSoloVer(soloVer);
        setMostrarModal(!mostrarModal);
    }

    const obtenerNombreProfesor = (id)=> {
        var nombre = '';
        if(profesores!=null && alumnosMaterias!=null && materias!=null){
            var alumnoMateriaFiltada=alumnosMaterias.filter(alumnomateria=>alumnomateria?.id == id)[0];
            var materiaFiltada = materias.filter(materia=>materia.id == alumnoMateriaFiltada?.materiaId)[0];
            var profesorFiltado=profesores.filter(profesor=>profesor.id == materiaFiltada?.profesorId)[0];
            nombre = profesorFiltado?.nombre + ' ' + profesorFiltado?.apellidoPaterno + ' ' + profesorFiltado?.apellidoMaterno;
        }
        return nombre;
    }

    const obtenerNombreAlumno = (id)=> {
        var nombre = '';
        if(alumnosMaterias!=null && alumnos!=null){
            var alumnoMateriaFiltada=alumnosMaterias.filter(alumnomateria=>alumnomateria?.id == id)[0];
            var alumnoFiltrado = alumnos.filter(alumno=>alumno.id == alumnoMateriaFiltada?.alumnoId)[0];
            nombre = alumnoFiltrado?.nombre + ' ' + alumnoFiltrado?.apellidoPaterno + ' ' + alumnoFiltrado?.apellidoMaterno;
        }
        return nombre;
    }

    const obtenerNombreMateria = (id)=> {
        var nombre = '';
        if(alumnosMaterias!=null && materias!=null){
            var alumnoMateriaFiltada=alumnosMaterias.filter(alumnomateria=>alumnomateria?.id == id)[0];
            var materiaFiltada = materias.filter(materia=>materia.id == alumnoMateriaFiltada?.materiaId)[0];
            nombre = materiaFiltada?.nombre;
        }
        return nombre;
    }

    return (
        <Table>
            <thead>
                <tr>
                    <th>Alumno</th>
                    <th>Materia</th>
                    <th>Profesor</th>
                    <th>Calificacion</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    (data.length < 1) ? (
                        <tr><td>Sin registros</td></tr>
                    ) : (
                        data.map((item) => (
                            <tr key={item.id} >
                                <td>{obtenerNombreAlumno(item.alumnoMateriaId)}</td>
                                <td>{obtenerNombreMateria(item.alumnoMateriaId)}</td>
                                <td>{obtenerNombreProfesor(item.alumnoMateriaId)}</td>
                                <td>{item.calificacion}</td>
                                <td>
                                    <Button color="success" size="sm" className="me-2" onClick={() => enviarDatos(item, true)} >Ver</Button>
                                    <Button color="primary" size="sm" className="me-2" onClick={() => enviarDatos(item, false)} >Editar</Button>
                                    <Button color="danger" size="sm" onClick={() => eliminarCalificacion(item.id)} >Eliminar</Button>
                                </td>
                            </tr>
                        ))

                    )
                }
            </tbody>
        </Table>
    )
}

export default TablaCalificaciones;
