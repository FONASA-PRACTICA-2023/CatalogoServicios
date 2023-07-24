import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiEdit, BiTrash } from 'react-icons/bi';
import { BsFillEyeFill } from 'react-icons/bs';
import { AiOutlineCopy } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { CgArrowsExchangeV } from 'react-icons/cg';


function ListadoServiciosIntegracion() {
  const [datos, setDatos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [totalFilas, setTotalFilas] = useState(0);
  const [get, setGet] = useState(0);
  const [post, setPost] = useState(0);
  const [soap, setSoap] = useState(0);
  const [rest, setRest] = useState(0);
  const [datosOrdenados, setDatosOrdenados] = useState([]);
  const [ordenAscendente, setOrdenAscendente] = useState(true);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    fetch("https://o5t896hzxk.execute-api.us-east-1.amazonaws.com/Prod/servicio-buscar-todos")
      .then(response => response.json())
      .then(data => {
        const datosOrdenadosPorNumerador = [...data.registros];
        datosOrdenadosPorNumerador.sort((a, b) => parseInt(a.numerador) - parseInt(b.numerador));
        setDatos(data.registros);
        setDatosOrdenados(datosOrdenadosPorNumerador);
        setTotalFilas(data.registros.length);

        const postObjects = data.registros.filter(obj => obj.metodo_http === "POST");
        const countPostObjects = postObjects.length;
        setPost(countPostObjects);

        const getObjects = data.registros.filter(obj => obj.metodo_http === "GET");
        const countGetObjects = getObjects.length;
        setGet(countGetObjects);

        const soapObjects = data.registros.filter(obj => obj.tipo_protocolo === "SOAP");
        const countSoapObjects = soapObjects.length;
        setSoap(countSoapObjects);

        const restObjects = data.registros.filter(obj => obj.tipo_protocolo === "REST");
        const countRestObjects = restObjects.length;
        setRest(countRestObjects);

        setIsLoading(false);

      })
      .catch(error => console.log('Error:', error));
  }

  const ordenarPorNumerador = () => {
    const datosOrdenadosPorNumerador = [...datosOrdenados];
    datosOrdenadosPorNumerador.sort((a, b) => {
      const orden = ordenAscendente ? 1 : -1;
      return orden * (parseInt(a.numerador) - parseInt(b.numerador));
    });
    setDatosOrdenados(datosOrdenadosPorNumerador);
    setOrdenAscendente(!ordenAscendente);
  };

  const filtrarDatos = (dato) => {
    const filtroLowerCase = filtro.toLowerCase();
    return (
      dato.nombre.toLowerCase().includes(filtroLowerCase) ||
      dato.numerador.toLowerCase().includes(filtroLowerCase) ||
      dato.metodo_http.toLowerCase().includes(filtroLowerCase)
    );
  };


  const eliminar = (idServicio) => {
    // Mostrar el swal de confirmación
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el servicio seleccionado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si se confirma la eliminación, enviar la solicitud DELETE
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          "id_servicio": idServicio
        });

        var requestOptions = {
          method: 'DELETE',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("https://o5t896hzxk.execute-api.us-east-1.amazonaws.com/Prod/servicio", requestOptions)
          .then(response => response.text())
          .then(result => {
            // console.log(result);
            // Vuelve a cargar los datos después de eliminar
            fetchData();
          })
          .catch(error => console.log('error', error));

        // Mostrar un swal de éxito después de eliminar
        Swal.fire(
          '¡Eliminado!',
          'El servicio ha sido eliminado exitosamente.',
          'success'
        );
      }
    });
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
              <th onClick={ordenarPorNumerador} className="order-icon">Numerador<CgArrowsExchangeV /></th>
              <th>Nombre</th>
              <th>url_backend_qa</th>
              <th>url_backend_prd</th>
              <th>Fecha de Creación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datosOrdenados.filter(filtrarDatos).map((servicio) => (
              <>
                <div className="modal fade" id={`staticBackdrop-${servicio.id_servicio}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={`staticBackdropLabel2-${servicio.id_servicio}`} aria-hidden="true">
                  <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id={`staticBackdropLabel-${servicio.id_servicio}`}>URL del servicio: {servicio.id_servicio}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        Url
                        <div className="card">
                          <div className="card-body">
                            <p className="card-text">{servicio.url_backend_qa} <button type="button" className="btn btn-link" onClick={() => copiarURL(servicio.url_backend_qa)}>
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
                <div className="modal fade" id={`staticBackdrop2-${servicio.id_servicio}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={`staticBackdropLabel2-${servicio.id_servicio}`} aria-hidden="true">
                  <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id={`staticBackdropLabel2-${servicio.id_servicio}`}>URL del backend: {servicio.id_servicio}</h5>
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
                  <td>
                    {servicio.numerador}
                  </td>
                  <td>
                    <div>
                      {servicio.nombre.substring(0, 30)}...
                    </div>
                    <h6 className="text-muted fs-6">
                      /{servicio.tipo_protocolo}-{servicio.metodo_http}
                    </h6>
                  </td>

                  <td>
                    <button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target={`#staticBackdrop-${servicio.id_servicio}`}>
                      {servicio.url_backend_qa.substring(0, 30)}...
                    </button>
                  </td>
                  <td>
                    <button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target={`#staticBackdrop2-${servicio.id_servicio}`}>
                      {servicio.url_backend_prd.substring(0, 30)}...
                    </button>
                  </td>
                  <td>{servicio.fecha_creacion}</td>
                  <td>
                    <Link to={`/servicio-editar/${servicio.id_servicio}`} className="btn"><BiEdit /></Link>
                    <Link to={`/servicio-ver/${servicio.id_servicio}`} className="btn"><BsFillEyeFill /></Link>
                    <button className="btn" onClick={() => eliminar(servicio.id_servicio)}><BiTrash /></button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default ListadoServiciosIntegracion;