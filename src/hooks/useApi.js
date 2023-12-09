import axios from "axios";

const useApi = () =>{
    const BASE_API_URL = 'http://localhost:5007/api';

    const getProfesores = async() =>{
        const response = await axios.get(`${BASE_API_URL}/profesores`);
        return response.data;
    };
    
    const addProfesor = async(profesor) =>{
        const response = await axios.get(`${BASE_API_URL}/profesores`,{
            "nombre":"francisco",
            "apellidopaterno":"gallardo",
            "apellidomaterno":"castañeda",
            "especialidad":"programacion",
            "correoelectronico":"francisco.gallardo@talentotech.com",
            "telefono":"125478",
            "estatus":1
            });
        return response.data;
    };
    
    return {
        getProfesores,addProfesor
    };

};

export default useApi;