import React from "react";
import { useLocation } from "react-router-dom";
import {Link} from 'react-router-dom';
import { db, authentication } from '../database/firebase';
import{ useState, useEffect } from 'react';
import { doc, getDoc, setDoc, collection } from "firebase/firestore";

const Home = () => {

    const [isVerificado, setVerificado] = useState(false);
    const [userName, setUserName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userPhoneNumber, setUserPhoneNumber] = useState("");
    const [userInfoVisible, setUserInfoVisible] = useState(true);
    const [userPicture, setUserPicture]= useState("");
    const [userMail, setUserMail] = useState("");

    const [props, setProps] = useState([]);

    const location = useLocation();
    const usuario_firebase = location.state


    const getUserInfo = async () => {
        try {
          const partRef = doc(db, "Usuario", usuario_firebase);
          const partSnap = await getDoc(partRef);
          const name = partSnap.data().nombre;
          const lastname = partSnap.data().apellido;
          const phoneNumber = partSnap.data().celular;
          const infoVisible = partSnap.data().infoVisible;
          const email = partSnap.data().correo;
          const fotoUrl = partSnap.data().fotoURL;
    
          setUserName(name);
          setUserLastName(lastname);
          setUserPhoneNumber(phoneNumber);
          setUserInfoVisible(infoVisible);
          setUserMail(email);
          setUserPicture(fotoUrl);
    
        } catch (error) {
          console.log(error);
        }
    };

    const getMyProperties = async () => {
        try {
          const partRef = doc(db, "Usuario", usuario_firebase);
          const partSnap = await getDoc(partRef);
          const propiedades = partSnap.data().propiedades;
          const propsAux = await Promise.all(propiedades.map(ref=> getDoc(ref)));
          setProps(propsAux);
        } catch (error) {
          console.log(error);
        }
      };

    useEffect(() => {
        getUserInfo();
        getMyProperties();
        return () => {
          console.log("uwu");
        };
    }, []);


    const listItems = props.map((d) => (
        <ul>
            <li>Titulo: "{d.data().titulo}"</li>
            <div>Descripcion: {d.data().descripcion}</div>
            <div>Precio: {d.data().precio}</div>
            <Link to="/propiedadInfo" state= {d.data()}>
            Revisar stats
            </Link>
        </ul>
        
    ));


    return (


        <div>
            <h1>Bienvenido a la Súper Plataforma Web de TuNuevoHogar !!</h1>
            <h3>Que bueno tenerte de vuelta {userName} {userLastName}.</h3>
            <div>
                <h4>Tus Propiedades:</h4>
                {listItems}
            </div>
        </div>

    )
  };
  
  export default Home;