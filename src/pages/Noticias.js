import React from "react";
import { useLocation } from "react-router-dom";
import {Link} from 'react-router-dom';
import { db, authentication } from '../database/firebase';
import{ useState, useEffect } from 'react';
import { doc, getDoc, setDoc, collection } from "firebase/firestore";
import Layout from "./Layout";
import '../styles/sidebar.css'

const Home = () => {


    const [news, setNews] = useState([]);
    const location = useLocation();

    const getNews = async () => {
      const response = await fetch(
        'https://news-scraping-api-tunuevohogar.herokuapp.com/news',
        {
          method: 'GET',
        }
        );
      const data = await response.json(); 
      // console.log(data.data)
      setNews(data.data);
    }




    useEffect(() => {
        getNews();
        return () => {
          console.log("uwu");
          console.log( news );
        };
    }, []);

    const openInNewTab = url => {
      window.open(url, '_blank', 'noopener,noreferrer');
    };



    const listNews = news.map((noticia) => (
      <Link className='propiedad-card' onClick={() => openInNewTab(noticia.url)}>
        <img src={noticia.url_image} alt="house-photo" width="340" height="300"/>
        <div className='propiedad-texto'>
          <h4>{noticia.news_title}</h4>
          <p>{noticia.news_datetime_release}</p>
        </div>
      </Link>
    ));


    return (

        <div className="container">

          <div className="sidebar">
            <Layout></Layout>
          </div>

          <div className="page" style={{marginTop: 40}}>

              <div>
                  <h2>Noticias</h2>
                  <div className="propiedades">
                    {listNews}
                  </div>
              </div>

          </div>

        </div>
        

    )
  };
  
  export default Home;