import { Link } from "react-router-dom";
import '../styles/sidebar.css'
import { IoChevronForwardOutline, IoLogOutOutline } from "react-icons/io5";


const Layout = () => {
  const userId = (localStorage.getItem('userId'));
  console.log(userId)

  return (
    <div>
        <div style={{overflow: "hidden", alignItems: "center"}}>
          <div style={{marginTop: 40}}>
              <Link to="/home" state= {userId}><img src={require('../images/Icono.png')} alt="profilepic" width="120" height="125"/></Link>
          </div>

          
          <div style={{marginTop: 40, display: "flex", flexDirection: "row", alignItems: "center"}}>
              <Link to="/home" state= {userId}> Inicio</Link>
              <IoChevronForwardOutline color="white" size={20}/>
          </div>
          <div style={{marginTop: 10, display: "flex", flexDirection: "row", alignItems: "center"}}>
              <Link to="/chat" state= {userId} >Chat</Link>
              <IoChevronForwardOutline color="white" size={20}/>
          </div>
          <div style={{marginTop: 10, display: "flex", flexDirection: "row", alignItems: "center"}}>
              <Link to="/noticias">Noticias</Link>
              <IoChevronForwardOutline color="white" size={20}/>
          </div>
          <div style={{marginTop: 10, display: "flex", flexDirection: "row", alignItems: "center"}}>
              <Link to="/perfil" state= {userId}>Perfil</Link>
              <IoChevronForwardOutline color="white" size={20}/>
          </div>
          <div style={{marginTop: 525, display: "flex", flexDirection: "row", alignItems: "center"}}>
            
            <Link to="/"> Cerrar Sesión</Link>
            <IoLogOutOutline color="white" size={20}/>
          </div>
        </div>
      
    </div>
  )
};

export default Layout;