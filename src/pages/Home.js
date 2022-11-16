import React from "react";
import { useLocation } from "react-router-dom";
import {Link} from 'react-router-dom';
import { db, authentication } from '../database/firebase';
import{ useState, useEffect } from 'react';
import { doc, getDoc, setDoc, collection } from "firebase/firestore";
import Layout from "./Layout";
import '../styles/sidebar.css'

const Home = () => {

    const [isVerificado, setVerificado] = useState(false);
    const [userName, setUserName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userPhoneNumber, setUserPhoneNumber] = useState("");
    const [userInfoVisible, setUserInfoVisible] = useState(true);
    const [userPicture, setUserPicture]= useState("");
    const [userMail, setUserMail] = useState("");

    const [news, setNews] = useState([]);


    const [props, setProps] = useState([]);

    const location = useLocation();
    const usuario_firebase = location.state

    const getNews = async () => {
      const response = await fetch(
        'https://news-scraping-api-tunuevohogar.herokuapp.com/news',
        {
          method: 'GET',
          mode: 'no-cors',
        }
        );
      const data = await response.json(); 
      console.log(data.data)
      setNews(data.data);
    }


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
        getNews();
        return () => {
          console.log("uwu");
          console.log( news );
        };
    }, []);


    const listItems = props.map((d) => (
            <Link to="/propiedadInfo" state= {d.data()} className='propiedad-card'>
              <img src={d.data().fotos[0]} alt="house-photo" width="280" height="300"/>
              <div className='propiedad-texto'>
                <h4>{d.data().titulo}</h4>
                <p>{d.data().descripcion}</p>
                <p>Precio: {d.data().precio} {d.data().tipoVenta == 'Arriendo' ? 'CLP' : 'UF'} </p>
              </div>
              
            </Link>
        
    ));

    const propsTabla = props.map((d) => (
      <tr>
        <td>{d.data().titulo}</td>
        <td>{d.data().direccion}</td>
        <td className="td-link">{d.data().tipoVenta}</td>
        <td className="td-link">{d.data().visita.length}</td>
        <td className="td-link"><Link to="/propiedadInfo" state= {d.data()}> <p> Ver más</p ></Link></td>
      </tr>
  
      ));

    // const listNews = news.map((noticia) => (
    //   <Link to={noticia.url} state= {d.data()} className='propiedad-card'>
    //     <img src={d.data().fotos[0]} alt="house-photo" width="280" height="300"/>
    //     <div className='propiedad-texto'>
    //       <h4>{d.data().titulo}"</h4>
    //       <p>{d.data().descripcion}</p>
    //       <p>Precio: {d.data().precio} {d.data().tipoVenta == 'Arriendo' ? 'CLP' : 'UF'} </p>
    //     </div>
        
    //   </Link>
    // ));


    return (

        <div className="container">

          <div className="sidebar">
            <Layout></Layout>
          </div>

          <div className="page" style={{marginTop: 40}}>
              <div>
                  <h2>Tus Propiedades</h2>
                  <div className="propiedades">
                    {listItems}
                  </div>
              </div>
              <div className='tabla'>
                <h2>Resumen de tus propiedades</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Título de la propiedad</th>
                      <th>Dirección</th>
                      <th>Venta/Arriendo</th>
                      <th>Visitas</th>
                      <th>Enlace</th>
                    </tr>
                  </thead>
                  <tbody>
                    {propsTabla}
                  </tbody>
                  
                </table>
              </div>
          </div>

        </div>
        

    )
  };
  
  export default Home;