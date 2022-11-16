import React from "react";
//import {Link} from 'react-router-dom';
import { useLocation } from "react-router-dom";
import Chart from "react-apexcharts";



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
        <div>
            <h1>Aqui habran stats de la propiedad</h1>
            <h3>Titulo: {propiedad.titulo}</h3>
            <h3>Precio: {propiedad.precio}</h3>
            <h3>Comuna: {propiedad.comuna}</h3>
            <h3>Direccion: {propiedad.direccion}</h3>
            <h3>Descripcion: {propiedad.descripcion}</h3>
            <h3>Numero de Habitaciones: {propiedad.habitaciones}</h3>
            <h3>Numero de Banos: {propiedad.banos}</h3>
            <h3>Metros cuadrados: {propiedad.superficie}</h3>
            <div>
                <h2>Visitas por dia</h2>
                <Chart
                    options={grafico.options}
                    series={grafico.series}
                    type="line"
                    width="500"
                />
            </div>
        </div>
        
    )
  };
  
  export default PropiedadInfo;