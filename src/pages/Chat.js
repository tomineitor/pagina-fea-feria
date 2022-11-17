import React from "react";
import { useLocation } from "react-router-dom";
import {Link} from 'react-router-dom';
import { db, authentication } from '../database/firebase';
import{ useState, useEffect } from 'react';
import { doc, getDoc, setDoc, collection, query, getDocs, collectionGroup, orderBy, onSnapshot } from "firebase/firestore";
import Layout from "./Layout";
import '../styles/sidebar.css';


const Chat = () => {

    const location = useLocation();
    const user_id = location.state

    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState([]);
    const obtenerChats = async () =>{
        try {
        const collectionRef = collectionGroup(db, 'Chat');
        const q = query(collectionRef);
        const querySnapshot = await getDocs(q);
        const auxArray = [];
        querySnapshot.docs.map((doc) => {
            if(doc.ref.parent.parent.id != undefined ){
            const val = doc.ref.parent.parent.id;
            if(!auxArray.includes(val)){
                auxArray.push(val);
            }
            }
        });

        const infoUsuarios = await Promise.all(auxArray.map(async (chat) =>{
            console.log('Chat ', chat)
            const chatRef = doc(db, "Chats", chat);
            const chatSnap = await getDoc(chatRef);
            if(chat.split('-')[1] !== undefined){
                const docRef = doc(db, 'Usuario', chat.split('-')[1]);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists() && chatSnap.exists() && (chatSnap.data().idPropietario == user_id || chat.split('-')[1] == user_id)) {
                    const docRef2 = doc(db, 'Usuario', chatSnap.data().idPropietario);
                    const docSnap2 = await getDoc(docRef2);
                    const propRef = doc(db, "Propiedad", chat.split('-')[0]);
                    const propSnap = await getDoc(propRef);
                    console.log(propSnap.data())
                    if(propSnap.exists()){
                        return {key: chat,
                            idPropiedad: chat.split('-')[0],
                            idUser: chat.split('-')[1],
                            nombre: docSnap.data().nombre,      //Nombre del usuario
                            fotoURL: docSnap.data().fotoURL,    //Foto del usuario
                            lastMensaje: chatSnap.data().ultimoMensajeDate.toDate().getHours() +":" +  chatSnap.data().ultimoMensajeDate.toDate().getMinutes(),
                            esLeido: chatSnap.data().esLeido,
                            idPropietario: chatSnap.data().idPropietario,
                            nombreProp: docSnap2.data().nombre,
                            fotoURLProp: docSnap2.data().fotoURL,
                            direccion: propSnap.data().direccion,
                            titulo: propSnap.data().titulo,
                        }
                    } else{
                        const thisUserID = chat.split('-')[0] == user_id ? chat.split('-')[1] : chat.split('-')[0];
                        const otherUserID = chat.split('-')[0];
                        const tinderRef = doc(db, 'Usuario', thisUserID);
                        const tinderSnap = await getDoc(tinderRef);
                        return {key: chat,
                            idPropiedad: chat.split('-')[0],
                            idUser: chat.split('-')[1],
                            nombre: tinderSnap.data().nombre,      //Nombre del usuario
                            fotoURL: tinderSnap.data().fotoURL,    //Foto del usuario
                            lastMensaje: chatSnap.data().ultimoMensajeDate.toDate().getHours() +":" +  chatSnap.data().ultimoMensajeDate.toDate().getMinutes(),
                            esLeido: chatSnap.data().esLeido,
                            idPropietario: chatSnap.data().idPropietario,
                            nombreProp: tinderSnap.data().nombre,
                            fotoURLProp: '',
                            direccion: '',
                            titulo: 'Busca compañero de cuarto.',
                        }
                }
                }
            }
            
            }));
            const auxChats = infoUsuarios.filter(item => item != undefined)
            console.log(auxChats)
            setChats(auxChats);
            } catch(error){
            console.log(error);
            }
        };

        

    useEffect(() => {
        obtenerChats()
        return () => {
          console.log("uwu");
          console.log( chats );
        };
    }, []);

    const [messages, setMessages] = useState([]);

    const loadChat = async ( idPropiedad, idUser, idPropietario) => {
        const collectionRef = collection(db, 'Chats/'+idPropiedad+"-"+idUser+'/Chat');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));
        console.log(idPropiedad+idUser);
        const unsubscribe = onSnapshot(q, snapshot => {
          console.log('snapshot', idUser);
          console.log('idPropietario', idPropietario);
          setMessages(
            snapshot.docs.map(doc => ({
              _id: doc.id,
              createdAt: doc.data().createdAt.toDate(),
              text: doc.data().text,
              user: doc.data().user,
            }))
          )})
    };


    const handleClick = (chat) => {
        loadChat(chat.idPropiedad, chat.idUser, chat.idUser, chat.idPropietario);
        setCurrentChat(chat);
    };



    const listaChats = chats.map((chat) => (
        <div className="chat" onClick={event => handleClick(chat)}> 
            <img src={chat.fotoURL !== undefined ? chat.fotoURL : require('../images/profilepic.jpg')} alt="profilepic" width="100" height="100"/>
            <div className="chat-texto">
                <div className="chat-hora">
                    <h3> {chat.nombre}</h3>
                    <h5> {chat.lastMensaje}</h5>
                </div>
                <h4> {chat.titulo}</h4>
            </div>
        </div>
    
    ));

    const listaMensajes = messages.map((mensaje) => (
        <div className={user_id === mensaje.user._id? 'mensaje-miUsuario' : 'mensaje-otroUsuario'}>
            <p> {mensaje.text}</p>
        </div>
    
    ));


    


    return (
        <div className="container">

            <div className="sidebar">
                <Layout></Layout>
            </div>

            <div className="page">
                
                <div className="chats">
                    <h2>Tus conversaciones </h2>
                    {listaChats}
                </div>
            </div>

            <div className="chat-mensajes">
                <div className="chat-userInfo">
                    <h2>{currentChat.nombre}</h2>
                </div>
                <div className="chat-allMessages">
                    {listaMensajes}
                </div>
                
            </div>

        </div>
        
    )
  };
  
  export default Chat;