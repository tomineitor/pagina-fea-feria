import React from "react";
//import {Link} from 'react-router-dom';
import { useLocation } from "react-router-dom";
import Chart from "react-apexcharts";
import Layout from "./Layout";
import '../styles/sidebar.css'
import{ useState, useEffect } from 'react';
import { doc, getDoc, setDoc, collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db, authentication } from '../database/firebase';





const Perfil = () => {

    const location = useLocation();
    const userid= location.state;

    const [userName, setUserName] = useState("");
    const [isVerificado, setisVerificado] = useState();
    const [fotoURL, setFotoURL] = useState("");
    const [promocionado, setPromocionado] = useState(false);
    const [fechaExpiracion, setFechaExpiracion] = useState();
    const [propsPromocionadas, setPropsPromocionadas] = useState([])
    const [currentExpiraton, setCurrentExpiration] = useState("");

    const [showGrafico, setShowGrafico] = useState(false);
    const [graficoV, setGrafico] = useState({
        options: {
            chart: {
                id: "line"
            }
        },
        series: [{
            name: "Visitas",
            data: []
        }]
    });

    const getUserInfo = async () => {
      try {
        const partRef = doc(db, "Usuario", userid);
        const partSnap = await getDoc(partRef);

        setUserName(partSnap.data().nombre + ' ' +partSnap.data().apellido);
        setisVerificado(partSnap.data().verificado);
        setFotoURL(partSnap.data().fotoURL);
  
      } catch (error) {
        console.log(error);
      }
    };

    const getPromoUser = async () => {
      try {
          const usersRef = collection(db, "Promocion");
          const q = query(usersRef, where('idUsuario', "==", userid), where("tipoPromo", "==", "Usuario"));
          const usersSnap = await getDocs(q);
          {usersSnap.docs?.map((doc) => {
              console.log(doc.data()); 
              setPromocionado(true); 
              const endFecha = (new Date(doc.data().endPromo.seconds * 1000 +doc.data().endPromo.nanoseconds/1000000));
              setFechaExpiracion( endFecha.toLocaleDateString().toString())
          })};
        } catch (error) {
          console.log(error);
        }
    };

    const getExpirationDate = async ( propId ) => {
      try {
          const usersRef = collection(db, "Promocion");
          const q = query(usersRef, where('idPropiedad', "==", propId), where("tipoPromo", "==", "Propiedad"));
          const usersSnap = await getDocs(q);
          {usersSnap.docs?.map((doc) => {
              const endFecha = (new Date(doc.data().endPromo.seconds * 1000 +doc.data().endPromo.nanoseconds/1000000));
              setCurrentExpiration( endFecha.toLocaleDateString().toString())
          })};
        } catch (error) {
          console.log(error);
        }
    };

    const getPromoProps = async () => {
      try {
        const usersRef = collection(db, "Usuario");
        const q2 = query(usersRef, orderBy("calificacionProm", "desc"));
        const usersSnap = await getDocs(q2);
        
        const propsAux = await Promise.all(usersSnap.docs.map(async (user) => {
          let propsAux2 = await Promise.all(user.data().propiedades.map(ref=> getDoc(ref)));
          return propsAux2.filter(prop => prop.data().idPropietario == userid && prop.data().tierPromo !== 0 && prop.data().tierPromo !== undefined);
        }));
        
        setPropsPromocionadas(propsAux.flat());

      } catch (error) {
        console.log(error);
      }
    };


    const visitasGraph = async () => {
      try {
        const partRef = doc(db, "Usuario", userid);
        const partSnap = await getDoc(partRef);
        const visitas = partSnap.data().visitaPerfil
        console.log(visitas)
        let visitas_aux = visitas.reduce(function(result, current) {
          let currentDate = new Date(current.fecha.seconds * 1000 + current.fecha.nanoseconds/1000000)
          const aux = currentDate.toLocaleDateString()
          if (!result[aux]) {
              result[aux] = 0;
          }
          result[aux]++;
          return result;
        }, {});

        console.log(visitas_aux)

        let lineData = [];
        Object.entries(visitas_aux).reverse().forEach( item => lineData.push({ x: item[0], y: item[1]}));

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

        setGrafico(grafico)

      } catch (error) {
        console.log(error);
      }
    };

    const propsTabla = propsPromocionadas.map((d) => (
      <tr>
        <td>{d.data().titulo}</td>
        <td>{d.data().direccion}</td>
        <td className="td-link">{d.data().tipoVenta}</td>
        <td className="td-link">{d.data().visita.length}</td>
        {d.data().tierPromo == 1 || d.data().tierPromo == 3  ? <td className="td-link">Si</td> : <td className="td-link">No</td>}
        {d.data().tierPromo == 2 || d.data().tierPromo == 3? <td className="td-link">Si</td> : <td className="td-link">No</td>}
        <td> { getExpirationDate(d.id) && (<p> {currentExpiraton}</p>)} </td>
      </tr>
  
    ));
  

    useEffect(() => {
        getUserInfo();
        getPromoUser();
        getPromoProps();
        visitasGraph();
        return () => {
          console.log( 'a' );
          console.log(propsPromocionadas)
        };
    }, []);

    useEffect(() => {
      if(graficoV){
        setShowGrafico(true);
      }
      return () => {
      };
    }, [graficoV]);


    return (
      <div className="container">

        <div className="sidebar">
          <Layout></Layout>
        </div>

        <div className="page" style={{marginTop: 40}}>
          <div className="perfilInfo" >
            <img src={fotoURL !== undefined ? fotoURL : require('../images/profilepic.jpg')} alt="profilepic" width="150" height="150" style={{borderRadius:100}}/>
            <div className="perfilInfo-Text">
              <h2 style={{marginLeft: 40}}> {userName} </h2>
              { isVerificado ? <h4 style={{marginLeft: 40, color: "#49B1FC"}}> Usuario verificado </h4> : <h4 style={{marginLeft: 40, color: "#FF564F"}} > Usuario no verificado </h4>}
              <h3 style={{marginLeft: 40, marginTop: 20}}> {promocionado ? 'Usuario promocionado hasta el ' + fechaExpiracion : 'Usuario no promocionado'} </h3>
            </div>
          </div>

          <div className='tabla2' style={{marginLeft: 40, marginTop: 40}}>
            <h2>Resumen de tus propiedades destacadas</h2>
            <table>
              <thead>
                <tr>
                  <th>Título de la propiedad</th>
                  <th>Dirección</th>
                  <th>Venta/Arriendo</th>
                  <th>Visitas</th>
                  <th>Promocionada en búsquedas</th>
                  <th>Promocionada en página principal</th>
                  <th>Fecha de expiración</th>
                </tr>
              </thead>
              <tbody>
                {propsTabla}
              </tbody>
              
            </table>
          </div>

          {showGrafico && 
           <div style={{marginTop: 20}}>
            <h3>Visitas por dia de tu perfil</h3>
            <Chart
              options={graficoV.options}
              series={graficoV.series}
              type="line"
              width="1500"
              height="700"
            />
          </div>
          }
         

        </div>

      </div>
        
    )
  };
  
  export default Perfil;