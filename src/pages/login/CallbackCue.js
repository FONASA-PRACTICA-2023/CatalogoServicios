import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const CallbackCue = () => {
  const location = useLocation();
  const history = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    // Realizar la solicitud POST para obtener el token
    axios
      .post("https://accounts.claveunica.gob.cl/openid/token/", {
        client_id: "e436946334034d7c81918ca1e5520385",
        client_secret: "d882afac5a3c46a687beeb584c07d506", // Reemplaza con tu cliente secreto real
        code,
        state,
        grant_type: "authorization_code",
        redirect_uri: "https://servicios.microservicio.cl/cue/callback",
      })
      .then((response) => {
        const token = response.data.access_token;
        localStorage.setItem("token", token);

        history.push("/registros");
      })
      .catch((error) => {
        console.error("Error al obtener el token:", error);
        history.push("/error");
      });
  }, [location, history]);

  return <div>Realizando inicio de sesión...</div>;
};

export default CallbackCue;
