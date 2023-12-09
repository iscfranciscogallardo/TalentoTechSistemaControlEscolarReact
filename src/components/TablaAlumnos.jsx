import { useEffect } from "react";
import { Table, Button } from "reactstrap"

const TablaAlumnos = ({ data, setEditar, mostrarModal, setMostrarModal, eliminarAlumno, setSoloVer }) => {

    const enviarDatos = (alumno, soloVer) => {
        setEditar(alumno);
        setSoloVer(soloVer);
        setMostrarModal(!mostrarModal);
    }

    return (
        <Table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido Paterno</th>
                    <th>Apellido Materno</th>
                    <th>Especialidad</th>
                    <th>Correo</th>
                    <th>Telefono</th>
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
                                <td>{item.apellidoPaterno}</td>
                                <td>{item.apellidoMaterno}</td>
                                <td>{item.especialidad}</td>
                                <td>{item.correoElectronico}</td>
                                <td>{item.telefono}</td>
                                <td>
                                    <Button color="success" size="sm" className="me-2" onClick={() => enviarDatos(item, true)} >Ver</Button>
                                    <Button color="primary" size="sm" className="me-2" onClick={() => enviarDatos(item, false)} >Editar</Button>
                                    <Button color="danger" size="sm" onClick={() => eliminarAlumno(item.id)} >Eliminar</Button>
                                </td>
                            </tr>
                        ))

                    )
                }
            </tbody>
        </Table>
    )
}

export default TablaAlumnos;
