import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div>
        <h4>super navbar 2.0</h4>
        <li>
            <Link to="/home" state= {"O3X3U5oJYEYtihwmdlLSF1bPa6J2"}>Home</Link>
        </li>
        <li>
            <Link to="/noticias">Noticias</Link>
        </li>
        <li>
            <Link to="/contact">Contact</Link>
        </li>
        <li>
            <Link to="/">LOGIN</Link>
        </li>
      <Outlet />
    </div>
  )
};

export default Layout;