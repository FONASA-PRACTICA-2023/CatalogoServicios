import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import useApiSnoopy from "../../hooks/useApiSnoopy";
import Cargando from "../../components/Cargando";
import MensajeError from "../../components/MensajeError";
import MensajeExito from "../../components/MensajeExito";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

export const FormularioLogin = () => {
  const { login } = useAuth();
  const client_id = "e436946334034d7c81918ca1e5520385";
  let apiSnoopy = useApiSnoopy();
  const [cssFormulario, setCssFormulario] = useState("row g-3 needs-validation");
  const iniciarSesion = async (usuarioLogeado) => {
    try {
      // console.log("FormularioLogin::iniciarSesion", usuarioLogeado);
      await login(usuarioLogeado);
    } catch (error) {
      console.log(error);
    }
  };

  const [valoresFormulario, setValoresFormulario] = useState({
    rut_externo: "",
    usuario_interno: "",
    password: "",
  });
  const gestionarCambioValor = async (evt) => {
    const { target } = evt;
    const { name, value } = target;
    const newValoresFormulario = { ...valoresFormulario, [name]: value };
    setValoresFormulario(newValoresFormulario);
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setCssFormulario("was-validated needs-validation row g-3 ");
    } else {
      apiSnoopy.loginUsuarioFonasa(
        valoresFormulario.rut_externo,
        valoresFormulario.password,
        iniciarSesion
      );
    }

    setCssFormulario("needs-validation row g-3 ");
  };

  const handleClaveUnicaClick = () => {

    window.location.href = `https://accounts.claveunica.gob.cl/openid/authorize/?client_id=${client_id}&response_type=code&scope=openid%20run%20name&redirect_uri=https://servicios.microservicio.cl/cue/callback&state=dcerv3543rs4324`;
  };

  return (
    <div className="container w-50 mt-4">
      <h1 className="mb-3">Formulario de Acceso</h1>
      {apiSnoopy.loading && <Cargando />}
      {apiSnoopy.error && <MensajeError mensaje={apiSnoopy.error} />}
      {apiSnoopy.data && <MensajeExito mensaje={apiSnoopy.data.nombre} />}
      <form onSubmit={handleSubmit} className={cssFormulario} noValidate>
        {/* rut_externo */}
        <div className="col-md-12 mb-3">
          <label htmlFor="rut_externo" className="form-label">
            Usuario Fonasa
          </label>
          <input
            type="text"
            className="form-control"
            id="rut_externo"
            name="rut_externo"
            value={valoresFormulario.rut_externo}
            onChange={gestionarCambioValor}
            required
          />
          <div className="invalid-feedback">Debe ingresar un valor</div>
        </div>

        {/* password */}
        <div className="col-md-12 mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={valoresFormulario.password}
            onChange={gestionarCambioValor}
            required
          />
          <div className="invalid-feedback">Debe ingresar un valor</div>
        </div>

        <div className="col-md-6 mb-3">
          <button
            className="btn btn-sm btn-primary d-flex align-items-center"
            type="submit"
          >
            <em className="material-icons md-18">login</em> Ingresar
          </button>
        </div>
        <div className="col-md-6 mb-3">
          <button
            className="btn btn-sm btn-primary d-flex align-items-center"
            type="button" // Change to "button" type
            onClick={handleClaveUnicaClick} // Handle Clave Unica click
          >
            <em className="material-icons md-18"></em> clave unica
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioLogin;
