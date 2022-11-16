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


    // Con esto obtengo cuantas veces aparece cada fecha
    let fechas = propiedad.visita.reduce(function(result, current) {
        let currentDate = current.fecha
        console.log(currentDate)
        if (!result[currentDate]) {
            result[currentDate] = 0;
        }
        result[currentDate]++;
        return result;
    }, {});


    /*
    // Con esto ordeno las fechas
    const orderedDates = {};
    Object.keys(fechas).sort(function(a, b) {
        return a.split('/').reverse().join('').localeCompare(b.split('/').reverse().join(''));
    }).forEach(function(key) {
        orderedDates[key] = fechas[key];
    })

    // Con esto lo transformo al formato de lineData
    let lineData = [];
    Object.entries(orderedDates).forEach( item => lineData.push({ label: item[0], value: item[1]}));

    */


    const grafico = {
        options: {
            chart: {
                id: "line"
            },
            xaxis: {
                type: 'category'
            }
        },
        series: [{
            name: "Visitas",
            data: [{x: 'luneh', y: 10}, {x: 'marteh', y: 20}]
        }]
      };

    return (
        <div>
            <h1>Aqui habran stats de la propiedad</h1>
            <h2>Titulo: {propiedad.titulo}</h2>
            <h2>Precio: {propiedad.precio}</h2>
            <h2>Comuna: {propiedad.comuna}</h2>
            <h2>Direccion: {propiedad.direccion}</h2>
            <h2>Descripcion: {propiedad.descripcion}</h2>
            <h3>Numero de Habitaciones: {propiedad.habitaciones}</h3>
            <h3>Numero de Banos: {propiedad.banos}</h3>
            <h3>Metros cuadrados: {propiedad.superficie}</h3>
            <div>
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