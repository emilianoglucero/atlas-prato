import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { Images } from '../components/Images';
const ENDPOINT = "http://localhost:8080/";
const socket = socketIOClient(ENDPOINT);



const IndexPage = () => {
  const [response, setResponse] = useState();

  socket.on('connect', () => {
    console.log('Servidor conectado');
  });
  useEffect( () => {
    console.log('useffect')
    socket.on("distance", data => {
      console.log(data);
      setResponse(data);
    });
  }, []);  



  return (
    <>
    <div>
      <h1>Hola static site</h1>
      <p>
        Distance: {response}
      </p>
    </div>
    </>
  )
}

export default IndexPage
