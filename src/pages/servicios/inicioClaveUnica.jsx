import React, { useState, useEffect } from "react";

const MyComponent = () => {
  const [response, setResponse] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const storedCode = localStorage.getItem("code");
    const storedTimestamp = localStorage.getItem("timestamp");

    if (storedCode && storedTimestamp) {
      const currentTime = new Date().getTime();
      const timeDifference = currentTime - parseInt(storedTimestamp);

      if (timeDifference < 60000) {
        // If the stored code is valid (within 1 minute), use it
        getTokens(storedCode);
      } else {
        // Otherwise, remove the expired code from storage
        localStorage.removeItem("code");
        localStorage.removeItem("timestamp");
      }
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      getData();
    }
  }, [accessToken]);

  const getTokens = (code) => {
    const urlParams = new URLSearchParams(window.location.search);
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
        setResponse(result);
        // Once you obtain the access token, store it and the current timestamp in localStorage
        setAccessToken(result.access_token);
        localStorage.setItem("code", code);
        localStorage.setItem("timestamp", new Date().getTime().toString());
      })
      .catch(error => console.log('error', error));
  }

  const getData = () => {
    // If there's no accessToken, don't make the call to getData
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
      .then(result => setData(result))
      .catch(error => console.log('error', error));
  }

  return (
    <div className="container w-50 mt-4">
      <h1 className="mb-3">Respuesta del POST</h1>
      <pre>{JSON.stringify(response, null, 2)}</pre>
      <h1 className="mb-3">Datos de usuario</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default MyComponent;
