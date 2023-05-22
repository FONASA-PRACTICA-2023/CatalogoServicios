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
  const [datosOrdenados, setDatosOrdenados] = useState([]);
  const [ordenAscendente, setOrdenAscendente] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("https://o5t896hzxk.execute-api.us-east-1.amazonaws.com/Prod/servicio-buscar-todos")
      .then(response => response.json())
      .then(data => {
        const datosOrdenadosPorNumerador = [...data.registros];
        datosOrdenadosPorNumerador.sort((a, b) => parseInt(a.numerador) - parseInt(b.numerador));
        setDatos(data.registros);
        setDatosOrdenados(datosOrdenadosPorNumerador);
        setTotalFilas(data.registros.length);
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
      dato.numerador.toLowerCase().includes(filtroLowerCase)
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
      <p>({totalFilas})</p>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Filtrar por numerador"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />
      <table className="table ">
        <thead>
          <tr>
            <th onClick={ordenarPorNumerador} className="order-icon">Numerador<CgArrowsExchangeV /></th>
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
          {datosOrdenados.filter(filtrarDatos).map((servicio) => (
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
              <div className="modal fade" id={`staticBackdrop4-${servicio.numerador}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={`staticBackdropLabel-${servicio.id_servicio}`} aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id={`staticBackdropLabel4-${servicio.numerador}`}>Status: {servicio.id_servicio}</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <p>url_backend_prd: {servicio.url_backend_prd ? '✓' : 'X'}</p>
                      <p>url_servicio_prd: {servicio.url_servicio_prd ? '✓' : 'X'}</p>
                      <p>url_backend_qa: {servicio.url_backend_qa ? '✓' : 'X'}</p>
                      <p>url_backend_dev: {servicio.url_servicio_qa ? '✓' : 'X'}</p>
                      <p>url_servicio_dev: {servicio.url_servicio_dev ? '✓' : 'X'}</p>
                      <p>pregunta: {servicio.pregunta ? '✓' : 'X'}</p>
                      <p>respuesta: {servicio.respuesta ? '✓' : 'X'}</p>
                      <p>habilita_cors: {servicio.habilita_cors ? '✓' : 'X'}</p>
                      <p>validacion_jwt: {servicio.validacion_jwt ? '✓' : 'X'}</p>
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
                <td><button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target={`#staticBackdrop4-${servicio.numerador}`}>
                  {servicio.numerador}
                </button></td>
                <td>{servicio.nombre}</td>
                <td>{servicio.autor_id}</td>
                <td>
                  <button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target={`#staticBackdrop-${servicio.id_servicio}`}>
                    {servicio.url_servicio_prd.substring(0, 20)}...
                  </button>

                </td>
                <td>
                  <button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target={`#staticBackdrop2-${servicio.id_servicio}`}>
                    {servicio.url_backend_prd.substring(0, 20)}...
                  </button>

                </td>
                <td>{servicio.fecha_creacion}</td>
                <td>{servicio.fecha_actualizacion}</td>
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
    </div>
  );
}
export default ListadoServiciosIntegracion;