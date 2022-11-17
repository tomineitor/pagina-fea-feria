import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import styles from '../styles/login.css';
import { useLocation, useNavigate } from "react-router-dom";
import { db, authentication } from '../database/firebase';
import { doc, getDoc, setDoc, collection, updateDoc, query, where, getDocs } from "firebase/firestore";


const Login = () => {

    const randomString = (length, chars) => {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }

    const [codigo, setCodigo] = useState("");

    const [userId, setUserID] = useState("");

    const navigate = useNavigate();

    
    const location = useLocation();
    const usuario_firebase = location.state


    const login = async () => {
    try {
        const usersRef = collection(db, "Usuario");
        const q = query(usersRef, where('webCode', "==", codigo));
        const usersSnap = await getDocs(q);
        {usersSnap.docs?.map((doc) => {
            setUserID(doc.id); 
            localStorage.setItem('userId', doc.id);
        })};
        return true
        } catch (error) {
        console.log(error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        login();
        setTimeout(() => {
            navigate('/home');
          }, 3000);
        
    }


    const generateCode = () =>{
        var WebCode = randomString(6, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ')
        console.log("Se genero el codigo")
        updateDoc(doc(db, "Usuario", userId), {
            webCode: WebCode
          });
    }


    return (
        <div>
            <div className="page-content">
            
            </div>
            <div className="login-info">

                <div>
                    <h1>Log-in</h1>
                    <h2>Se ha generado un codigo de acceso. </h2>
                    <h2>Porfavor revise su aplicacion</h2>
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

            </div>

            

        </div>  
        
    )
  };
  
  export default Login;