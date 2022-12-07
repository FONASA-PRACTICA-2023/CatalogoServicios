import { useState, useEffect } from "react";

import { useAuth } from "../../hooks/useAuth";
import useApiSnoopy from "../../hooks/useApiSnoopy";
import Cargando from "../../components/Cargando";
import MensajeError from "../../components/MensajeError";
import MensajeExito from "../../components/MensajeExito";
import { useNavigate } from "react-router-dom";

export const FormularioLogin = () => {
  const { login } = useAuth();

  let apiSnoopy = useApiSnoopy();
  const [cssFormulario, setCssFormulario] = useState(
    "row g-3 needs-validation"
  );
  const iniciarSesion = async (usuarioLogeado) => {
    try {
      console.log("FormularioLogin::iniciarSesion", usuarioLogeado);
      await login(usuarioLogeado);
    } catch (error) {
      console.log(error);
    }
  };

  const [valoresFormulario, setValoresFormulario] = useState({
    tipo_usuario: "PRESTADOR",
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
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setCssFormulario("was-validated needs-validation row g-3 ");
    } else {
      if (valoresFormulario.tipo_usuario === "PRESTADOR") {
        apiSnoopy.loginUsuarioExterno(
          valoresFormulario.rut_externo,
          valoresFormulario.password,
          iniciarSesion
        );
      } else if (valoresFormulario.tipo_usuario === "FONASA") {
        apiSnoopy.loginUsuarioFonasa(
          valoresFormulario.rut_externo,
          valoresFormulario.password,
          iniciarSesion
        );
      }
    }

    setCssFormulario("needs-validation row g-3 ");
  };

  return (
    <div className="container w-50 mt-4">
      <h1 className="mb-3">Formulario de Acceso</h1>
      {apiSnoopy.loading && <Cargando />}
      {apiSnoopy.error && <MensajeError mensaje={apiSnoopy.error} />}
      {apiSnoopy.data && <MensajeExito mensaje={apiSnoopy.data.mensaje} />}
      <form onSubmit={handleSubmit} className={cssFormulario} noValidate>
        {/* tipo_usuario */}
        <div className="col-md-12">
          <label htmlFor="tipo_usuario" className="form-label">
            Tipo de Credencial
          </label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="tipo_usuario"
              id="tipo_usuario_prestador"
              onChange={gestionarCambioValor}
              value="PRESTADOR"
              checked={valoresFormulario.tipo_usuario === "PRESTADOR"}
            />
            <label
              htmlFor="tipo_usuario_prestador"
              className="form-check-label"
            >
              PRESTADOR
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="tipo_usuario"
              id="tipo_usuario_fonasa"
              onChange={gestionarCambioValor}
              value="FONASA"
              checked={valoresFormulario.tipo_usuario === "FONASA"}
            />
            <label htmlFor="tipo_usuario_fonasa" className="form-check-label">
              FONASA
            </label>
          </div>
        </div>
        <hr />
        {/* rut_externo */}
        <div className="col-md-12 mb-3">
          <label htmlFor="rut_externo" className="form-label">
            RUT Usuario Externo / Alias Usuario Fonasa
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
      </form>
    </div>
  );
};

export default FormularioLogin;
