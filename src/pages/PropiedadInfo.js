import React from "react";
//import {Link} from 'react-router-dom';
import { useLocation } from "react-router-dom";
import Chart from "react-apexcharts";
import Layout from "./Layout";
import '../styles/sidebar.css'



const PropiedadInfo = () => {

    const location = useLocation();
    const propiedad = location.state

    console.log(propiedad)

    if(!propiedad.visita){
        propiedad.visita= [];
      }

    console.log("Formato timestamp", propiedad.visita)


    // Con esto obtengo cuantas veces aparece cada fecha
    let fechas = propiedad.visita.reduce(function(result, current) {
        let currentDate = new Date(current.fecha.seconds * 1000 + current.fecha.nanoseconds/1000000)
        const aux = currentDate.toLocaleDateString()
        if (!result[aux]) {
            result[aux] = 0;
        }
        result[aux]++;
        return result;
    }, {});

    console.log(fechas)

    const imagenesPropiedad = propiedad.fotos.map((d) => (
        <div className="imagen-card">
            <img src={d} alt="house-photo" width="300" height="350" />
        </div>
    ));

    let lineData = [];
    Object.entries(fechas).forEach( item => lineData.push({ x: item[0], y: item[1]}));

    const grafico = {
        options: {
            chart: {
                id: "line"
            }
        },
        series: [{
            name: "Visitas",
            data: lineData
        }]
    };

    return (
        <div className="container">

        <div className="sidebar">
        <Layout></Layout>
        </div>

        <div className="page" style={{marginTop: 40}}>
            <div>
                <h1>{propiedad.titulo}</h1>
                <h3>Descripción:</h3>
                <p>{propiedad.descripcion}</p>

                <h3 style={{marginTop: 20}}>Información de la propiedad</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Dirección</th>
                      <th>Arriendo/Venta</th>
                      <th>Precio</th>
                      <th>Número de Habitaciones</th>
                      <th>Número de baños</th>
                      <th>Superficie </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                        <td>{propiedad.direccion}</td>
                        <td className="td-link">{propiedad.tipoVenta}</td>
                        <td className="td-link">{propiedad.precio} {propiedad.tipoVenta == 'Arriendo' ? 'CLP' : 'UF'} </td>
                        <td className="td-link">{propiedad.habitaciones}</td>
                        <td className="td-link">{propiedad.banos}</td>
                        <td className="td-link">{propiedad.superficie} m<sup>2</sup></td>
                    </tr>
                  </tbody>
                  
                </table>

                <h3 style={{marginTop: 20}}>Imágenes de la propiedad</h3>
                <div className="propiedades">
                    {imagenesPropiedad}
                </div>

                
                
                <div style={{marginTop: 20}}>
                    <h3>Visitas por dia</h3>
                    <Chart
                        options={grafico.options}
                        series={grafico.series}
                        type="line"
                        width="1500"
                        height="700"
                    />
                </div>
            </div>
        </div>

        </div>
        
    )
  };
  
  export default PropiedadInfo;