import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiEdit } from 'react-icons/bi';
import { BsFillEyeFill } from 'react-icons/bs';
import { AiOutlineCopy } from 'react-icons/ai';

function ListadoServiciosIntegracion() {
  const [datos, setDatos] = useState([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("https://o5t896hzxk.execute-api.us-east-1.amazonaws.com/Prod/servicio-buscar-todos")
      .then(response => response.json())
      .then(data => {
        setDatos(data.registros);
        // console.log(data.registros);
      })
      .catch(error => console.log('Error:', error));
  }

  const filtrarDatos = (dato) => {
    const filtroLowerCase = filtro.toLowerCase();
    return (
      dato.nombre.toLowerCase().includes(filtroLowerCase) ||
      dato.autor_id.toLowerCase().includes(filtroLowerCase) ||
      dato.fecha_creacion.toLowerCase().includes(filtroLowerCase)
    );
  };

  const copiarURL = (url) => {
    navigator.clipboard.writeText(url);
  };

  return (
    
    <div>
      <h2>Listado de Servicios</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Filtrar por nombre, autor o fecha de creación"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />
      <table className="table">
        <thead>
          <tr>
            <th>Numerador</th>
            <th>Nombre</th>
            <th>Autor</th>
            <th>url_servicio_prd</th>
            <th>url_backend_prd</th>
            <th>Fecha de Creación</th>
            <th>Fecha de Actualización</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.filter(filtrarDatos).map((servicio) => (
            <>
              <div className="modal fade" id={`staticBackdrop-${servicio.id_servicio}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={`staticBackdropLabel-${servicio.id_servicio}`} aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id={`staticBackdropLabel-${servicio.id_servicio}`}>URL del servicio</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      {servicio.url_servicio_prd}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal fade" id={`staticBackdrop2-${servicio.id_servicio}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={`staticBackdropLabel2-${servicio.id_servicio}`} aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id={`staticBackdropLabel2-${servicio.id_servicio}`}>URL del backend</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      Url
                      <div className="card">
                        <div className="card-body">
                          <p className="card-text">{servicio.url_backend_prd} <button type="button" className="btn btn-link" onClick={() => copiarURL(servicio.url_backend_prd)}>
                            <AiOutlineCopy />
                          </button></p>
                        </div>
                      </div>
                      Request
                      <div className="card">
                        <div className="card-body">
                          <p className="card-text">{servicio.pregunta} <button type="button" className="btn btn-link" onClick={() => copiarURL(servicio.pregunta)}>
                            <AiOutlineCopy />
                          </button> </p>
                        </div>
                      </div>
                      Response
                      <div className="card">
                        <div className="card-body">
                          <p className="card-text">{servicio.respuesta} <button type="button" className="btn btn-link" onClick={() => copiarURL(servicio.respuesta)}>
                            <AiOutlineCopy />
                          </button></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <tr key={servicio.id_servicio}>
                <td>{servicio.numerador}</td>
                <td>{servicio.nombre}</td>
                <td>{servicio.autor_id}</td>
                <td>
                  <button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target={`#staticBackdrop-${servicio.id_servicio}`}>
                    {servicio.url_servicio_prd.substring(0, 20)}...
                  </button>
                  <button type="button" className="btn btn-link" onClick={() => copiarURL(servicio.url_servicio_prd)}>
                    <AiOutlineCopy />
                  </button>
                </td>
                <td>
                  <button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target={`#staticBackdrop2-${servicio.id_servicio}`}>
                    {servicio.url_backend_prd.substring(0, 20)}...
                  </button>
                  <button type="button" className="btn btn-link" onClick={() => copiarURL(servicio.url_backend_prd)}>
                    <AiOutlineCopy />
                  </button>
                </td>
                <td>{servicio.fecha_creacion}</td>
                <td>{servicio.fecha_actualizacion}</td>
                <td>
                  <Link to={`/servicio-editar/${servicio.id_servicio}`} className="btn"><BiEdit /></Link>
                  <Link to={`/servicio-ver/${servicio.id_servicio}`} className="btn"><BsFillEyeFill /></Link>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ListadoServiciosIntegracion;
