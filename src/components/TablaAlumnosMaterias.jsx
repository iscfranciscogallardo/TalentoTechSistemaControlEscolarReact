import { useEffect } from "react";
import { Table, Button } from "reactstrap"

const TablaAlumnosMaterias = ({ data, setEditar, mostrarModal, setMostrarModal, eliminarAlumnoMateria, setSoloVer, alumnos, materias }) => {

    const enviarDatos = (alumnomateria, soloVer) => {
        setEditar(alumnomateria);
        setSoloVer(soloVer);
        setMostrarModal(!mostrarModal);
    }

    const obtenerNombreAlumno = (id)=> {
        var nombre = '';
        if(alumnos!=null){
            var alumnoFiltado=alumnos.filter(alumno=>alumno.id == id)[0];
            nombre = alumnoFiltado?.nombre + ' ' + alumnoFiltado?.apellidoPaterno + ' ' + alumnoFiltado?.apellidoMaterno;
        }
        return nombre;
    }

    const obtenerNombreMateria = (id)=> {
        var nombre = '';
        if(materias!=null){
            var materiaFiltada=materias.filter(materia=>materia.id == id)[0];
            nombre = materiaFiltada?.nombre;
        }
        return nombre;
    }
    const obtenerMinimoMateria = (id)=> {
        var minimo = 0;
        if(materias!=null){
            var materiaFiltada=materias.filter(materia=>materia.id == id)[0];
            minimo = materiaFiltada?.minimoAprobatorio;
        }
        return minimo;
    }

    return (
        <Table>
            <thead>
                <tr>
                    <th>Alumno</th>
                    <th>Materia</th>
                    <th>Minimo Aprobatorio</th>
                    <th>Promedio</th>
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
                                <td>{obtenerNombreAlumno(item.alumnoId)}</td>
                                <td>{obtenerNombreMateria(item.materiaId)}</td>
                                <td>{obtenerMinimoMateria(item.materiaId)}</td>
                                <td>{item.promedio}</td>
                                <td>
                                    <Button color="success" size="sm" className="me-2" onClick={() => enviarDatos(item, true)} >Ver</Button>
                                    <Button color="primary" size="sm" className="me-2" onClick={() => enviarDatos(item, false)} >Editar</Button>
                                    <Button color="danger" size="sm" onClick={() => eliminarAlumnoMateria(item.id)} >Eliminar</Button>
                                </td>
                            </tr>
                        ))

                    )
                }
            </tbody>
        </Table>
    )
}

export default TablaAlumnosMaterias;
