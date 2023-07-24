import React, { useState, useEffect } from "react";
import { AiOutlineCopy } from 'react-icons/ai';

function ListadoServiciosIntegracion() {
  const [datos, setDatos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [totalFilas, setTotalFilas] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    fetch("https://t7ljho60p7.execute-api.us-east-1.amazonaws.com/items")
      .then((response) => response.json())
      .then((data) => {
        // Ordenar los datos por el campo "id" de menor a mayor
        const datosOrdenados = data.map((dato) => ({ ...dato, id: Number(dato.id) }));
        datosOrdenados.sort((a, b) => a.id - b.id);
        setDatos(datosOrdenados);
        setTotalFilas(datosOrdenados.length);
        setIsLoading(false);
      })
      .catch((error) => console.log("Error:", error));
  };

  const filtrarDatos = (dato) => {
    const filtroLowerCase = filtro.toLowerCase();
    return (
      (dato.id && dato.id.toString().includes(filtroLowerCase)) ||
      (dato.ws && dato.ws.toLowerCase().includes(filtroLowerCase))
    );
  };
  const copiarURL = (url) => {
    navigator.clipboard.writeText(url);
  };
  return (
    <div>
      <h2>Listado de Servicios</h2>
      <tr>
        <td>
          <h5>Total de servicios({totalFilas})</h5>
        </td>
      </tr>
      <input type="text" className="form-control mb-3" placeholder="Filtrar por numerador" value={filtro} onChange={(e) => setFiltro(e.target.value)} />
      {isLoading ? (
        <div class="text-center">
          <button class="btn btn-primary" type="button" disabled>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Loading...
          </button>
        </div>
      ) : (
        <table className="table ">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>url_backend_prd</th>
              <th>url_backend_qa</th>
            </tr>
          </thead>
          <tbody>
            {datos.filter(filtrarDatos).map((dato, index) => (
              <React.Fragment key={index}>
                <div className="modal fade" id={`staticBackdrop-${dato.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={`staticBackdropLabel-${dato.id_servicio}`} aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id={`staticBackdropLabel-${dato.id}`}>Datos: {dato.ws}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        url_backend_prd
                        <div className="card">
                          <div className="card-body">
                            <p className="card-text">{dato.EndPoint_PRD} <button type="button" className="btn btn-link" onClick={() => copiarURL(dato.EndPoint_PRD)}>
                              <AiOutlineCopy />
                            </button></p>
                          </div>
                        </div>
                      </div>
                      <div className="modal-body">
                        url_backend_qa
                        <div className="card">
                          <div className="card-body">
                            <p className="card-text">{dato.EndPoint_QA} <button type="button" className="btn btn-link" onClick={() => copiarURL(dato.EndPoint_QA)}>
                              <AiOutlineCopy />
                            </button></p>
                          </div>
                        </div>
                      </div>
                      <div className="modal-body">
                        Request
                        <div className="card">
                          <div className="card-body">
                            <p className="card-text">{dato.request} <button type="button" className="btn btn-link" onClick={() => copiarURL(dato.request)}>
                              <AiOutlineCopy />
                            </button></p>
                          </div>
                        </div>
                      </div>
                      <div className="modal-body">
                        Response
                        <div className="card">
                          <div className="card-body">
                            <p className="card-text">{dato.response} <button type="button" className="btn btn-link" onClick={() => copiarURL(dato.response)}>
                              <AiOutlineCopy />
                            </button></p>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                <tr>
                  <td>{dato.id}</td>
                  <td>
                    <button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target={`#staticBackdrop-${dato.id}`}>
                      {dato.ws}
                    </button>
                    <h6>{dato.Metodo}/{dato.Tipo}</h6>
                  </td>
                  <td>{dato.EndPoint_PRD.substring(0, 30)}....</td>
                  <td>{dato.EndPoint_QA.substring(0, 30)}....</td>
                  <td></td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListadoServiciosIntegracion;
