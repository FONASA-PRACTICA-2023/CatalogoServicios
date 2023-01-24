import { useState, useEffect } from "react";
import Cargando from "../../components/Cargando";
import MensajeError from "../../components/MensajeError";
import MensajeExito from "../../components/MensajeExito";

import ModalObservaciones from "./ModalObservaciones";

import useApiSnoopy from "../../hooks/useApiSnoopy";
import { useNavigate } from "react-router-dom";
import { FcManager } from 'react-icons/fc';
import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";
import { BsSearch } from "react-icons/bs";
import { Eye, Edit2, MessageSquare, Code } from 'react-feather';
import axios from "axios";


function ListadoServiciosIntegracion() {
  const navigate = useNavigate();
  let apiSnoopy = useApiSnoopy();

  const buscarServicios = async () => {
    apiSnoopy.listarServiciosIntegracion();
    apiSnoopy.listarServicioAutores();
  };

  const [estadoModalObservaciones, setEstadoModalObservaciones] = useState(false);
  const [tablaData, setTablaData] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [condicion, setCondicion] = useState(true);

  // Agrega estado para almacenar el número de elementos por página
  const [itemsPerPage, setItemsPerPage] = useState(10);
  // Agrega estado para almacenar la página actual
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);

  const seleccionarIDautor = async (e) => {
    const IDautor = document.getElementById("inputIDautor").value;
    const busquedaServicio = document.getElementById("tituloBusqueda");
    let filteredData = [];
    if (IDautor === "todos") {
      busquedaServicio.innerHTML = "Todos los servicios:";
      document.getElementById("inputIdNombre").value = "";
      filteredData = apiSnoopy.listadoServicios;
    } else {
      busquedaServicio.innerHTML = "Autor " + IDautor;
      document.getElementById("inputIdNombre").value = "";
      filteredData = apiSnoopy.listadoServicios.filter(
        (servicio) => servicio.autor_id === IDautor
      );
    }

    document.getElementById("inputIdNombre").value = "";
    setTablaData(filteredData);
    setPages(Math.ceil(filteredData.length / itemsPerPage));
    setCurrentPage(1);
    setCondicion(false);
  };


  const seleccionarIDnombre = async () => {
    // Guardar las palabras claves
    const idNombre = document.getElementById("inputIdNombre").value;
    const busquedaServicio = document.getElementById("tituloBusqueda");
    const palabraClave = document.getElementById("inputIdNombre").value.toLowerCase();
    // Array donde se guardarán los servicios filtrados
    let filteredData = [];

    // Mostramos todos los servicios
    if (palabraClave === "todos") {
      busquedaServicio.innerHTML = "Todos los servicios";
      document.getElementById("inputIDautor").value = "";
      filteredData = apiSnoopy.listadoServicios;
    } else {
      busquedaServicio.innerHTML = "Servicio por " + '"' + idNombre + '"';
      document.getElementById("inputIDautor").value = "";

      // Si la palabra clave es un valor específico, se filtran los servicios por  IDnombre
      filteredData = apiSnoopy.listadoServicios.filter((servicio) =>
        // Se convierte a minúsculas para evitar problemas con mayúsculas y minúsculas
        servicio.id.toLowerCase().includes(palabraClave)
      );
    }
    document.getElementById("inputIDautor").value = "";
    setTablaData(filteredData);
    setPages(Math.ceil(filteredData.length / itemsPerPage));
    setCurrentPage(1);
    setCondicion(false);
  };

  // función para retroceder en una página
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // función para avanzar en una página
  const nextPage = () => {
    if (condicion) {
      setPages(Math.ceil(apiSnoopy.listadoServicios.length / itemsPerPage));
    }
    if (currentPage < pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // función para saltar a una página específica
  const goToPage = (page) => {
    if (page >= 1 && page <= pages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    buscarServicios();
  }, [pages]);

  return (
    <div className="w-100">
      <div className="w-75 mx-auto">
        <div className="d-flex justify-content-center mt-2">
          <h1>Listado de Servicios de Integración</h1>
        </div>

        {apiSnoopy.loading && <Cargando />}
        {apiSnoopy.error && <MensajeError mensaje={apiSnoopy.error} />}
        {apiSnoopy.data && <MensajeExito mensaje={apiSnoopy.data.mensaje} />}

        {/* implementar una busqueda por ID AUTORES */}
        <label className="form-label"><FcManager size={25} /> ID AUTOR</label>
        <div className="input-group mb-3">
          <input
            className="form-control"
            list="datalistOptionsIDautor"
            placeholder="Ingrese un autor"
            id="inputIDautor"
            onKeyDown={(e) => e.keyCode === 13 ? seleccionarIDautor(e) : null}
          ></input>
          <datalist id="datalistOptionsIDautor">
            {apiSnoopy.listadoServicios &&
              [
                // Array.from --> el conjunto lo convertimos en un arreglo
                <option>todos</option>,
                Array.from(new Set(apiSnoopy.listadoServicios.map(item => item.autor_id)))
                  .map(item => <option>{item}</option>)
              ]
            }
          </datalist>
          <button className="btn btn-outline-primary" type="button" id="button-addon1" onClick={seleccionarIDautor}><BsSearch /></button>
        </div>

        <br></br>

        {/* implementacion de una busque del nombre del servicio por su id */}
        <label className="form-label">ID NOMBRES</label>
        <div className="input-group mb-3">
          <input
            className="form-control"
            list="datalistOptions"
            placeholder="Ingrese un IDnombre"
            id="inputIdNombre"
            onKeyDown={(e) => e.keyCode === 13 ? seleccionarIDnombre(e) : null}
          ></input>
          <datalist id="datalistOptions">
            {apiSnoopy.listadoServicios &&
              [
                <option>todos</option>,
                apiSnoopy.listadoServicios.map((servicio) => (
                  <option>{servicio.id}</option>
                ))
              ]

            }
          </datalist>
          <button className="btn btn-outline-primary" type="button" id="button-addon2" onClick={seleccionarIDnombre}><BsSearch /></button>
        </div>
      </div>

      <h2 id="tituloBusqueda" className='text-center mb-5'>Todos los servicios:</h2>

      <div className="w-75 mx-auto overflow-scroll text-center" style={{ height: "450px", fontSize: "14px" }}>


        {/* Modifica la tabla para utilizar los datos del estado en lugar de apiSnoopy.listadoServicios */}
        <table className="table table-hover">
          <thead className="table-light">
            <tr className="position-sticky top-0">
              <th>Nombre</th>
              <th>Numerador</th>
              <th>Autor</th>
              <th>Descripción</th>
              <th>Tipo de Protocolo</th>
              <th>Categoría de Servicio</th>
              <th>Canal de Exposición</th>
              <th>Criticidad de Servicio</th>
              <th>Fecha de Creación</th>
              <th>Fecha de Actualización</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Muestra la lista de servicios completa si no se ha utilizado ningún filtro, 
                  de lo contrario muestra la lista filtrada */}
            {tablaData.length === 0
              ? apiSnoopy.listadoServicios &&
              apiSnoopy.listadoServicios.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((servicio) => (
                <tr key={servicio.id}>
                  <td>{servicio.nombre}</td>
                  <td>{servicio.numerador}</td>
                  <td>{servicio.autor_id}</td>
                  <td>{servicio.descripcion}</td>
                  <td>{servicio.tipo_protocolo}</td>
                  <td>{servicio.categoria_servicio}</td>
                  <td>{servicio.canal_exposicion}</td>
                  <td>{servicio.criticidad_servicio}</td>
                  <td>{servicio.fecha_creacion}</td>
                  <td>{servicio.fecha_actualizacion}</td>
                  <td>
                    <button
                      className="btn btn-link btn-sm fs-6"
                      onClick={() => navigate(`/servicio-editar/${servicio.id}`)}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button className="btn btn-link btn-sm fs-6"
                      onClick={() => navigate(`/servicio-ver/${servicio.id}`)}
                    >
                      <Eye size={16} />
                    </button>
                    <button className="btn btn-link btn-sm fs-6"
                      id="btnRequest"
                      onClick={() => navigate(`/request-ver/${servicio.id}`)}
                    >
                      <Code size={16} />
                    </button>
                    <button className="btn btn-link btn-sm fs-6"
                      onClick={() => setEstadoModalObservaciones(!estadoModalObservaciones)}
                    >
                      <MessageSquare size={16} onClick={() => setSelectedServiceId(servicio.id)} />
                    </button>
                  </td>
                </tr>
              ))
              : tablaData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((servicio) => (
                <tr key={servicio.id}>
                  <td>{servicio.nombre}</td>
                  <td>{servicio.numerador}</td>
                  <td>{servicio.autor_id}</td>
                  <td>{servicio.descripcion}</td>
                  <td>{servicio.tipo_protocolo}</td>
                  <td>{servicio.categoria_servicio}</td>
                  <td>{servicio.canal_exposicion}</td>
                  <td>{servicio.criticidad_servicio}</td>
                  <td>{servicio.fecha_creacion}</td>
                  <td>{servicio.fecha_actualizacion}</td>
                  <td>
                    <button
                      className="btn btn-link btn-sm fs-6"
                      onClick={() => navigate(`/servicio-editar/${servicio.id}`)}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button className="btn btn-link btn-sm fs-6"
                      onClick={() => navigate(`/servicio-ver/${servicio.id}`)}
                    >
                      <Eye size={16} />
                    </button>
                    <button className="btn btn-link btn-sm fs-6"
                      id="btnRequest"
                      onClick={() => navigate(`/request-ver/${servicio.id}`)}
                    >
                      <Code size={16} />
                    </button>
                    <button className="btn btn-link btn-sm fs-6"
                      onClick={() => setEstadoModalObservaciones(!estadoModalObservaciones)}
                    >
                      <MessageSquare size={16} onClick={() => setSelectedServiceId(servicio.id)} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="tabla-servicos-url__pagination d-flex justify-content-center">
        <button onClick={prevPage} className='btn btn-primary'><TfiArrowCircleLeft size={20} /></button>
        <input type="number" value={currentPage} onChange={e => goToPage(e.target.value)} />
        <button onClick={nextPage} className='btn btn-primary'><TfiArrowCircleRight size={20} /></button>
      </div>
      <ModalObservaciones
        estado={estadoModalObservaciones}
        cambiarEstado={setEstadoModalObservaciones}
        idSer={selectedServiceId}
      />
    </div>
  )
}

export default ListadoServiciosIntegracion;
