import React from "react";
import{ useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { useLocation, useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc, collection } from "firebase/firestore";
import { db, authentication } from '../database/firebase';


const Login_2 = () => {

    const [codigo, setCodigo] = useState("");
    const [codigoBD, setCodigoBD] = useState("");

    const navigate = useNavigate();

    
    const location = useLocation();
    const usuario_firebase = location.state

    const check_code = async () => {
        try {
            const partRef = doc(db, "Usuario", usuario_firebase);
            const partSnap = await getDoc(partRef);
            const codigo_extraido = partSnap.data().webCode
            setCodigoBD(codigo_extraido)
        } catch (error) {
          console.log(error);
        }
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(codigo == codigoBD){
            alert(`codigo correcto`)
            navigate('/home', {state:"O3X3U5oJYEYtihwmdlLSF1bPa6J2"});

        } else{
            alert('Codigo incorrecto')
        }
    }

    /*

    useEffect(() => {
        check_code()
        console.log("ososososososos")
        return () => {
          console.log("");
        };
    }, []);

    */

    check_code()
    

    
    return (
        <div>
            <h1>Log-in</h1>
            <h2>Se ha generado un codigo de acceso. Porfavor revise su aplicacion</h2>
            <form onSubmit={handleSubmit}>
                <label>Ingrese el codigo:
                    <input 
                    type="text" 
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    />
                </label>
                <input type="submit" />
            </form>
        </div>
        
    )
  };
  
  export default Login_2;