import React from "react"
import { Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Noticias from "./pages/Noticias";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Home from "./pages/Home";
import PropiedadInfo from "./pages/PropiedadInfo"

import styles from '../styles/sidebar.css'

function App() {

  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route path="home" element={<Home />} />
        <Route path="noticias" element={<Noticias />} />
        <Route path="contact" element={<Contact />} />
        <Route path="propiedadinfo" element={<PropiedadInfo />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  );
}

export default App;
