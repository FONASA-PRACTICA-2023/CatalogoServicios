import React from "react";
import { useState, useEffect } from "react";
import Cargando from "../../components/Cargando";
import MensajeError from "../../components/MensajeError";
import MensajeExito from "../../components/MensajeExito";
import { useParams } from "react-router-dom";
import useApiSnoopy from "../../hooks/useApiSnoopy";
import { useAuth } from "../../hooks/useAuth";

function FormularioObservacion() {

  let params = useParams();
  const observacionesURL = 'https://63b6dd861907f863aa04aa2b.mockapi.io/observacion';
  const { usuario_jwt } = useAuth();
  const [ejemplos, setEjemplos] = useState([]);
  const [valorDelRadioSeleccionado, setValorDelRadioSeleccionado] = useState('');
  const [valorTitulo, setValorTitulo] = useState('');
  const [valorDescripcion, setValorDescripcion] = useState('');
  const [estoyEditando, setEstoyEditando] = useState(false);
  const [cssFormulario, setCssFormulario] = useState(
    "row g-3 needs-validation"
  );
  const [listaDeObservacion, setListaDeObservacion] = useState({})
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Im5vbWJyZSI6Ik1pZ3VlbCBIZXJuXHUwMGUxbmRleiBHb256XHUwMGUxbGV6IiwicnVuIjoiTkEiLCJtYWlsIjoibWlndWVsLmhlcm5hbmRlekBmb25hc2EuZ292LmNsIiwidXNlcm5hbWUiOiJtaWd1ZWwuaGVybmFuZGV6IiwidGlwb191c3VhcmlvIjoiTkEiLCJydXRfcHJlc3RhZG9yIjoiIiwiaW5zdGl0dWNpb24iOiIiLCJyb2xlcyI6W119LCJpYXQiOjE2NzIzMjc0NjAsImV4cCI6MTY3MjMzMTA2MCwiaXNzIjoiRm9uZG8gTmFjaW9uYWwgZGUgU2FsdWQifQ.WKq6_MvycrMMd_I3gyvkjW0JeNV52IBEbIdaD2Kb5vA"

  let apiSnoopy = useApiSnoopy();

  const [noEditable, setNoEditable] = useState(false);

  let dataInicial = {
    id_servicio: "",
    titulo: "",
    id_observacion: "",
    fecha_creacion: "",
    fecha_actualizacion: "",
    descripcion: "",
    autor_id: usuario_jwt().username,
    estado: ""
  };

  const [valoresFormulario, setValoresFormulario] = useState(dataInicial);

  const inicializarFormulario = async () => {
    if (params.id) {
      console.log("params", params);
      let id = params.id;
      await apiSnoopy.buscarDetalleServicio(id, setValoresFormulario);
      setNoEditable(true);
      setEstoyEditando(true);
      await apiSnoopy.buscarRegistrosEjemploRequest(id, setEjemplos);
    } else {
      setValoresFormulario(dataInicial);
      const newValoresFormulario = { ...valoresFormulario };

      setValoresFormulario(newValoresFormulario);
      setEstoyEditando(false);
    }
  };

  // ENVIAR OBSERVACION

  const manejarCambioEstado = (evento) => {
    setValorDelRadioSeleccionado(evento.target.value);
  }

  const obtenerFecha = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    const day = ("0" + currentDate.getDate()).slice(-2);
    const hour = ("0" + currentDate.getHours()).slice(-2);
    const minute = ("0" + currentDate.getMinutes()).slice(-2);
    const second = ("0" + currentDate.getSeconds()).slice(-2);
    const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

    return formattedDate;
  }

  const enviarObservacion = async () => {
    const servicio = 'https://bhornw6rd7.execute-api.us-east-1.amazonaws.com/dev/gestic_crear_servicio_observacion';

    dataInicial.id_servicio = params.id;
    dataInicial.titulo = valorTitulo;
    dataInicial.id_observacion = "idObservacion test";
    dataInicial.fecha_creacion = obtenerFecha();
    dataInicial.fecha_actualizacion = obtenerFecha();
    dataInicial.descripcion = valorDescripcion;
    dataInicial.estado = valorDelRadioSeleccionado;
    try {
      const response = await fetch(servicio, {
        method: "POST",
        body: JSON.stringify(dataInicial),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });
      const data = await response.json();
      console.log("Server respond: ", data);
    } catch (e) {
      console.log(e);
      console.error("Error:", e);
    }

  };

  useEffect(() => {
    inicializarFormulario();
  }, []);

  return (
    <div className="d-flex flex-column justify-conten-center align-items-center">
      <div className="row mt-5">
        <div className="col-12 mb-3">
          <h1>Formulario Observaciones</h1>
          {apiSnoopy.loading && <Cargando />}
          {apiSnoopy.error && <MensajeError mensaje={apiSnoopy.error} />}
          {apiSnoopy.data && <MensajeExito mensaje={apiSnoopy.data.mensaje} />}
          <form
            noValidate
            className={cssFormulario}
          >
            {/* 07/12/2022 20:33:04 */}

            {/* NOMBRE */}
            <div className="col-md-10">
              <label htmlFor="nombre" className="form-label">
                Nombre del Servicio
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={params.id}
                disabled={true}
                required
              />
              <div className="invalid-feedback">Debe ingresar un valor</div>
            </div>

            {/* TITULO */}
            <div className="col-md-10">
              <label htmlFor="nombre" className="form-label">
                Titulo de la Observacion
                <span className="text-danger fw-bold fs-5">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="ObservacionTitulo"
                name="ObservacionTitulo"
                value={valorTitulo}
                onChange={(evento) => setValorTitulo(evento.target.value)}
                required
              />
              <div className="invalid-feedback">Debe ingresar un valor</div>
              <div className="form-text">
                Debe ser un valor único, no se puede repetir.
              </div>
            </div>


            {/* AUTOR_ID */}
            <div className="col-md-2">
              <label htmlFor="autor_id" className="form-label">
                Autor Id<span className="text-danger fw-bold fs-5">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="autor_id"
                name="autor_id"
                disabled={true}
                value={dataInicial.autor_id}
              />
            </div>

            {/* ESTADO */}
            <div>
              <label htmlFor="estado" className="form-label">
                Estado <span className="text-danger fw-bold fs-5">*</span>
              </label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="estado"
                  id="estado1"
                  value="estado 1"
                  onChange={manejarCambioEstado}
                />
                <label className="form-check-label" htmlFor="estado1">
                  Estado 1
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="estado"
                  id="estado2"
                  value="estado 2"
                  onChange={manejarCambioEstado}
                />
                <label className="form-check-label" htmlFor="estado2">
                  Estado 2
                </label>
              </div>
            </div>

            {/* DESCRIPCION */}
            <div className="col-md-12">
              <label htmlFor="descripcion" className="form-label">
                Descripcion
              </label>
              <textarea
                className="form-control"
                rows="3"
                id="descripcion"
                name="descripcion"
                value={valorDescripcion}
                onChange={(evento) => setValorDescripcion(evento.target.value)}
              ></textarea>
              <div className="invalid-feedback">Debe ingresar un valor</div>
            </div>

            {/* BTN ENVIAR */}
            <div className="d-flex align-items-center justify-content-center rounded">
              <a className="btn btn-primary rounded" href="#" role="button" onClick={enviarObservacion}>Esviar observacion</a>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default FormularioObservacion;
