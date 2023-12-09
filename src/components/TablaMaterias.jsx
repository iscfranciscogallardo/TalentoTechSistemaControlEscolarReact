import { useEffect } from "react";
import { Table, Button } from "reactstrap"

const TablaMaterias = ({ data, setEditar, mostrarModal, setMostrarModal, eliminarMateria, setSoloVer, profesores }) => {

    const enviarDatos = (materia, soloVer) => {
        setEditar(materia);
        setSoloVer(soloVer);
        setMostrarModal(!mostrarModal);
    }

    const obtenerNombreProfesor = (id)=> {
        var nombre = '';
        if(profesores!=null){
            var profesorFiltado=profesores.filter(profesor=>profesor.id == id)[0];
            nombre = profesorFiltado?.nombre + ' ' + profesorFiltado?.apellidoPaterno + ' ' + profesorFiltado?.apellidoMaterno;
        }
        return nombre;
    }

    return (
        <Table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Profesor</th>
                    <th>Minimo Aprobatorio</th>
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
                                <td>{item.nombre}</td>
                                <td>{obtenerNombreProfesor(item.profesorId)}</td>
                                <td>{item.minimoAprobatorio}</td>
                                <td>
                                    <Button color="success" size="sm" className="me-2" onClick={() => enviarDatos(item, true)} >Ver</Button>
                                    <Button color="primary" size="sm" className="me-2" onClick={() => enviarDatos(item, false)} >Editar</Button>
                                    <Button color="danger" size="sm" onClick={() => eliminarMateria(item.id)} >Eliminar</Button>
                                </td>
                            </tr>
                        ))

                    )
                }
            </tbody>
        </Table>
    )
}

export default TablaMaterias;
