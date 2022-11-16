import React from "react";
import {Link} from 'react-router-dom';


const Home = () => {



    return (
        <div>
            <h1>Log-in</h1>
            <Link>
                <button>Login</button>
            </Link>
            <Link to="/home" state= {"O3X3U5oJYEYtihwmdlLSF1bPa6J2"}>
                <button>Logueo Mágico hardcodeado</button>
            </Link>
        </div>
        
    )
  };
  
  export default Home;