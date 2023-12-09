import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const Home = () => {
    
    const [loading, setLoading] = useState(true);

    useEffect (()=>{setLoading(false);}, [])

    return (
        <div className="w-screen h-screen">
            {loading && <Loading></Loading>}
            {(!loading) && (
                <div className="w-screen">
                    <div className="w-screen flex justify-center ...">
                     <h1> SISTEMA DE CONTROL ESCOLAR </h1>
                    </div>
                    <div className="w-screen flex justify-center ...">
                     <h2> Francisco Antonio Gallardo Castañeda </h2>
                    </div>
                    <div className="w-screen flex justify-center ...">
                     <h2> Talento Tech - Desarrollo Web con .Net Core </h2>
                    </div>
                </div>)}
        </div>        
    );
};

export default Home;