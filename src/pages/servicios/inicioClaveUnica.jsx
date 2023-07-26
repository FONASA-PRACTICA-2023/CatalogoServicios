import React, { useState, useEffect } from "react";

const MyComponent = () => {
  const [response, setResponse] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Cuando se monta el componente, obtén los tokens
    getTokens();
  }, []);

  useEffect(() => {
    // Cuando el estado accessToken cambia, llama a la función getData
    if (accessToken) {
      getData();
    }
  }, [accessToken]);

  const getTokens = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");

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
      .then(result => {
        console.log(result);
        // Una vez que obtienes el access token, guárdalo en el estado
        setAccessToken(result.access_token);
      })
      .catch(error => console.log('error', error));
  }

  const getData = () => {
    // Si no existe el accessToken, no hagas la llamada a getData
    if (!accessToken) return;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    myHeaders.append("Cookie", "csrftoken=GNgYNAH991h5IR0qeggMXI4bFmvo28k1WvW4WDnVMVQEhOdDWhA7Nf03IfvUC7CD");

    var graphql = JSON.stringify({
      query: "",
      variables: {}
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: graphql,
      redirect: 'follow'
    };

    fetch("https://accounts.claveunica.gob.cl/openid/userinfo", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  return (
    <div className="container w-50 mt-4">
      
    </div>

  );
};

export default MyComponent;
