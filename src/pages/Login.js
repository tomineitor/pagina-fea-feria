import React from "react";
import {Link} from 'react-router-dom';
import styles from '../styles/login.css'


const Home = () => {

    return (
        <div>
            <div className="page-content">
              
            </div>
            <div className="login-info">
                  <h1 className="login-titulo">Inicio de sesion de TuNuevoHogar</h1>
                  <Link>
                      <a className="login-button" >Login</a>
                  </Link>
                  <Link to="/home" state= {"O3X3U5oJYEYtihwmdlLSF1bPa6J2"}>
                      <a className="login-button" >Logueo Mágico hardcodeado</a>
                  </Link>
            </div>
        </div>  
        
    )
  };
  
  export default Home;