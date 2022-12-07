import { useEffect, useState } from "react";
import Cargando from "../components/Cargando";
import MensajeError from "../components/MensajeError";
import useApiSnoopy from "../hooks/useApiSnoopy";

import { useAuth } from "../hooks/useAuth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import TablaVectoresFonasa from "./TablaVectoresFonasa";
import TablaVectoresPrestador from "./TablaVectoresPrestador";
import Modal from "react-bootstrap/Modal";

const RegistrosProcesados = () => {
  let apiSnoopy = useApiSnoopy();

  let { usuario_jwt } = useAuth();

  const [mostrarPopUp, setMostrarPopUp] = useState(false);

  const verBitacora = (id) => {
    setMostrarPopUp(true);
    apiSnoopy.getBitacoraVector(id);
  };

  const cerrarPopUp = () => {
    setMostrarPopUp(false);
    console.log("cerrarPopUp, ir a casos");
  };

  const [filtroPrestador, setFiltroPrestador] = useLocalStorage(
    "filtroPrestador",
    null
  );

  const inicializar = async () => {
    await apiSnoopy.getPrestadoresConRegistros();
    if (filtroPrestador) {
      buscarRegistrosPorPrestador(filtroPrestador, 1);
    }
  };

  useEffect(() => {
    console.log("RegistrosProcesados, useEffect");

    console.log(usuario_jwt());

    if (usuario_jwt().tipo_usuario === "PRESTADOR") {
      setFiltroPrestador(usuario_jwt().rut_prestador);
      buscarRegistrosPorPrestador(usuario_jwt().rut_prestador, 1);
    } else {
      inicializar();
    }
  }, []);

  const seleccionarPrestador = async (e) => {
    setFiltroPrestador(e.target.value);
    await buscarRegistrosPorPrestador(e.target.value, 1);
  };

  const buscarRegistrosPorPrestador = async (rut, nroPagina) => {
    await apiSnoopy.getRegistrosPrestador(rut, nroPagina);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 card">
          <h1>Listado de Casos Clínicos</h1>
          {usuario_jwt().tipo_usuario === "FONASA" && (
            <div className="input-group">
              <span class="input-group-text" id="basic-addon1">
                Filtro por Prestador
              </span>
              <select
                className="form-select"
                onChange={seleccionarPrestador}
                value={filtroPrestador}
              >
                <option select>Seleccionar Prestador</option>
                {apiSnoopy.listadoPrestadores &&
                  apiSnoopy.listadoPrestadores.map((prestador) => (
                    <option key={prestador.rut} value={prestador.rut}>
                      {prestador.nombre} ({prestador.cantidad_registros}{" "}
                      registros)
                    </option>
                  ))}
              </select>
            </div>
          )}
          <hr />
          {apiSnoopy.loading && <Cargando />}
          {apiSnoopy.error && <MensajeError mensaje={apiSnoopy.error} />}
          {apiSnoopy.data && (
            <div className="text-dark fw-bold ">
              {" "}
              {apiSnoopy.data.registros.length} Registros encontrados
            </div>
          )}
          {apiSnoopy.data && usuario_jwt().tipo_usuario === "FONASA" && (
            <TablaVectoresFonasa
              registros={apiSnoopy.data.registros}
              verBitacora={verBitacora}
            />
          )}

          {apiSnoopy.data && usuario_jwt().tipo_usuario === "PRESTADOR" && (
            <TablaVectoresPrestador
              registros={apiSnoopy.data.registros}
              verBitacora={verBitacora}
            />
          )}

          {apiSnoopy.data && (
            <nav aria-label="Paginacion de los registros">
              <ul className="pagination justify-content-center">
                {apiSnoopy.data.paginacion.map((pagina) => (
                  <li className="page-item" key={pagina.click_actual}>
                    <button
                      className={pagina.click_css}
                      onClick={() =>
                        buscarRegistrosPorPrestador(
                          pagina.rut,
                          pagina.click_actual
                        )
                      }
                    >
                      {pagina.click_actual}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>

      <Modal show={mostrarPopUp} onHide={cerrarPopUp} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Bitacora del Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-striped table-hover mt-3">
            <thead className="table-light">
              <tr>
                <th>Fecha</th>
                <th>Operación</th>
                <th>Parrafo</th>
                <th>Usuario</th>
              </tr>
            </thead>
            <tbody>
              {apiSnoopy.bitacoraVector.map((vector) => (
                <tr key={vector.pk_bitacora}>
                  <td>{vector.fecha_insert}</td>
                  <td>{vector.tipo}</td>
                  <td>{vector.parrafo}</td>
                  <td>{vector.usuario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={cerrarPopUp}>
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RegistrosProcesados;
