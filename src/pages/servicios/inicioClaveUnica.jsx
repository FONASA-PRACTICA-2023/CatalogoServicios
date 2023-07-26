import { useState, useEffect } from "react";

const MyComponent = () => {
  const [response, setResponse] = useState(null);
  const [datosUsuario, setDatosUsuario] = useState([]);

  useEffect(() => {
    // Obtener los valores de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");

    // Hacer el POST con el fetch
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Cookie", "csrftoken=GNgYNAH991h5IR0qeggMXI4bFmvo28k1WvW4WDnVMVQEhOdDWhA7Nf03IfvUC7CD");

    var urlencoded = new URLSearchParams();
    urlencoded.append("client_id", "e436946334034d7c81918ca1e5520385");
    urlencoded.append("client_secret", "d882afac5a3c46a687beeb584c07d506");
    urlencoded.append("redirect_uri", "https://servicios.microservicio.cl/cue/callback");
    urlencoded.append("grant_type", "authorization_code");
    urlencoded.append("code", code);
    urlencoded.append("state", state);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch("https://accounts.claveunica.gob.cl/openid/token/", requestOptions)
      .then(response => response.json())
      .then(result => setResponse(result))
      getData()
      .catch(error => console.log('error', error));
  }, []);



  const getData = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", response.access_token);
    myHeaders.append("Cookie", "csrftoken=GNgYNAH991h5IR0qeggMXI4bFmvo28k1WvW4WDnVMVQEhOdDWhA7Nf03IfvUC7CD");

    var graphql = JSON.stringify({
      query: "",
      variables: {}
    })
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: graphql,
      redirect: 'follow'
    };

    fetch("https://accounts.claveunica.gob.cl/openid/userinfo", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .then(result => setDatosUsuario(result))
      
      .catch(error => console.log('error', error));

  }

    return (
      <div className="container w-50 mt-4">
        <h1 className="mb-3">Respuesta del POST</h1>
        <pre>{response}</pre>
        <h1 className="mb-3">Datos usuario</h1>
        <pre>{datosUsuario}</pre>
      </div>
    );
  };

  export default MyComponent;
