import { Outlet, Link } from "react-router-dom";
import styles from '../styles/sidebar.css'

const Layout = () => {
  return (
    <div className="sidebar-container">
        <a>
            <Link to="/home" state= {"O3X3U5oJYEYtihwmdlLSF1bPa6J2"}>Home</Link>
        </a>
        <a>
            <Link to="/noticias">Noticias</Link>
        </a>
        <a>
            <Link to="/contact">Contact</Link>
        </a>
        <a>
            <Link to="/">LOGIN</Link>
        </a>
      <Outlet />
    </div>
  )
};

export default Layout;