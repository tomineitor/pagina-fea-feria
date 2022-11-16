import React from "react";
import {Link} from 'react-router-dom';
import { db, authentication } from '../database/firebase';
import { doc, getDoc, setDoc, collection, updateDoc } from "firebase/firestore";


const Home = () => {

    const randomString = (length, chars) => {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }
    

    const generateCode = () =>{
        var WebCode = randomString(12, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ')
        console.log("Se genero el codigo")
        updateDoc(doc(db, "Usuario", "O3X3U5oJYEYtihwmdlLSF1bPa6J2"), {
            webCode: WebCode
          });
    }

    return (
        <div>
            <h1>Log-in</h1>
            <Link to="/login" state= {"O3X3U5oJYEYtihwmdlLSF1bPa6J2"}>
                <button onClick={ () => generateCode()}>Login</button>
            </Link>
            <Link to="/home" state= {"O3X3U5oJYEYtihwmdlLSF1bPa6J2"}>
                <button>Logueo Mágico hardcodeado</button>
            </Link>
        </div>
        
    )
  };
  
  export default Home;