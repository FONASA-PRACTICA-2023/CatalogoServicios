import { useState, useEffect } from "react";
import Cargando from "../../components/Cargando";
import MensajeError from "../../components/MensajeError";
import MensajeExito from "../../components/MensajeExito";
import ModalObservaciones from "./ModalObservaciones";
import useApiSnoopy from "../../hooks/useApiSnoopy";
import { useNavigate } from "react-router-dom";

//iconos 
import { FcManager } from 'react-icons/fc';
import { BsSearch } from "react-icons/bs";
import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";
import { Check, X, Eye, Edit2, MessageSquare, Code } from 'react-feather';

function ListadoServiciosIntegracion() {
    const navigate = useNavigate();
    let apiSnoopy = useApiSnoopy();

    // const [filtroPrestador, setFiltroPrestador] = useState(null);
    const [tablaData, setTablaData] = useState([]);
    const [estadoModalObservaciones, setEstadoModalObservaciones] = useState(false);
    const [selectedServiceId, setSelectedServiceId] = useState(null);
    const [titulo, setTitulo] = useState("Todos los servicios");
    const [condicion, setCondicion] = useState(true);

    // Agrega estado para almacenar el número de elementos por página
    const [itemsPerPage, setItemsPerPage] = useState(10);
    // Agrega estado para almacenar la página actual
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(0);

    const buscarServicios = async () => {
        apiSnoopy.listarServiciosIntegracion();
        apiSnoopy.listarServicioAutores();
    };

    const seleccionarIDautor = async (e) => {
        const IDautor = document.getElementById("inputIDautor").value;
        const busquedaServicio = document.getElementById("tituloBusqueda");
        let filteredData = [];
        if (IDautor === "todos") {
            // busquedaServicio.innerHTML = "Todos los servicios:";
            setTitulo("Todos los servicios")
            document.getElementById("inputIdNombre").value = "";
            filteredData = apiSnoopy.listadoServicios;
        } else {
            // busquedaServicio.innerHTML = "Autor " + IDautor;
            setTitulo("Autor " + IDautor);
            document.getElementById("inputIdNombre").value = "";
            filteredData = apiSnoopy.listadoServicios.filter(
                (servicio) => servicio.autor_id === IDautor
            );
        }
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
        // Mostramos todos los servicios si es "todos"
        if (palabraClave === "todos") {
            setTitulo('Todos los servicios');
            document.getElementById("inputIDautor").value = "";
            filteredData = apiSnoopy.listadoServicios;
        } else {
            setTitulo("Servicio por " + '"' + idNombre + '"');
            document.getElementById("inputIDautor").value = "";
            // Si la palabra clave es un valor específico, se filtran los servicios por  IDnombre
            filteredData = apiSnoopy.listadoServicios.filter((servicio) =>
                // Se convierte a minúsculas para evitar problemas con mayúsculas y minúsculas
                servicio.id.toLowerCase().includes(palabraClave)
            );
        }

        setTablaData(filteredData);
        setPages(Math.ceil(filteredData.length / itemsPerPage));
        setCurrentPage(1);
        setCondicion(false);
    };

    const comprobar = (item) => {
        if (item === "https://" || item === "http://" || item === "no") {
            return <X className="text-danger" />;
        } else {
            return <Check className="text-success" />;
        }
    }

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

    const resetPage = () => {
        setCurrentPage(1);
    }

    useEffect(() => {
        buscarServicios();
        console.log(tablaData.length);
        console.log("eeeeeeee");
    }, []);

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
                    {/* <input className="form-control" list="datalistOptionsIDautor" placeholder="Ingrese un autor" id="inputIDautor"></input> */}
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
                <label className="form-label">ID NOMBRE SERVICIO</label>
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

            <h2 id="tituloBusqueda" className='text-center mb-5'>{titulo}</h2>

            <div className="w-100 mx-auto overflow-scroll text-center" style={{ height: "650px", fontSize: "14px"}}>

                {/* Modifica la tabla para utilizar los datos del estado en lugar de apiSnoopy.listadoServicios */}
                <table className="table table-hover">
                    <thead className="table-light">
                        <tr className="position-sticky top-0">
                            <th>Nombre</th>
                            <th>Numerador</th>
                            <th>Autor</th>
                            <th>Ip consumidor</th>
                            <th>Retringir Content-Type</th>
                            <th>habilitar Cors</th>
                            <th>Validacion Jwt</th>
                            <th>Guarda Log Request Response</th>
                            <th>Incumplimiento Politico</th>
                            <th>Url Backend Prd</th>
                            <th>Url Servicio Prd</th>
                            <th>Url Backend Qa</th>
                            <th>Url Servicio Qa</th>
                            <th>Url Backend Dev</th>
                            <th>Url Servicio Dev</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tablaData.length === 0
                            ? apiSnoopy.listadoServicios &&
                            apiSnoopy.listadoServicios.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((servicio) => (
                                <tr key={servicio.id}>
                                    <td>{servicio.nombre}</td>
                                    <td>{servicio.numerador}</td>
                                    <td>{servicio.autor_id}</td>
                                    <td>
                                        {comprobar(servicio.valida_ip_consumidor)}
                                    </td>
                                    <td>
                                        {comprobar(servicio.restringir_contenttype)}
                                    </td>
                                    <td>
                                        {comprobar(servicio.habilita_cors)}
                                    </td>
                                    <td>
                                        {comprobar(servicio.validación_jwt)}
                                    </td>
                                    <td>
                                        {comprobar(servicio.guarda_log_request_response)}
                                    </td>
                                    <td>
                                        {comprobar(servicio.genera_alarma_por_incumplimiento_politica)}
                                    </td>
                                    <td>
                                        {comprobar(servicio.url_backend_prd)}
                                    </td>
                                    <td>
                                        {comprobar(servicio.url_servicio_prd)}
                                    </td>
                                    <td>
                                        {comprobar(servicio.url_backend_qa)}
                                    </td>
                                    <td>
                                        {comprobar(servicio.url_servicio_qa)}
                                    </td>
                                    <td>
                                        {comprobar(servicio.url_backend_dev)}
                                    </td>
                                    <td>
                                        {comprobar(servicio.url_servicio_dev)}
                                    </td>
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
                                    <td>
                                        {comprobar(servicio.valida_ip_consumidor)}
                                    </td>
                                    <td>
                                        {comprobar(servicio.restringir_contenttype)}
                                    </td>
                                    <td>
                                        {comprobar(servicio.habilita_cors)}
                                    </td>
                                    <td>
                                        {comprobar(servicio.validación_jwt)}
                                    </td>
                                    <td>
                                        {comprobar(servicio.guarda_log_request_response)}
                                    </td>
                                    <td>
                                        {comprobar(servicio.genera_alarma_por_incumplimiento_politica)}
                                    </td>
                                    <td>
                                        {/* {servicio.url_backend_prd} */}
                                        {comprobar(servicio.url_backend_prd)}
                                    </td>
                                    <td>
                                        {/* {servicio.url_servicio_prd} */}
                                        {comprobar(servicio.url_servicio_prd)}
                                    </td>
                                    <td>
                                        {/* {servicio.url_backend_qa} */}
                                        {comprobar(servicio.url_backend_qa)}
                                    </td>
                                    <td>
                                        {/* {servicio.url_servicio_qa} */}
                                        {comprobar(servicio.url_servicio_qa)}
                                    </td>
                                    <td>
                                        {/* {servicio.url_backend_dev} */}
                                        {comprobar(servicio.url_backend_dev)}
                                    </td>
                                    <td>
                                        {/* {servicio.url_servicio_dev} */}
                                        {comprobar(servicio.url_servicio_dev)}
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-link btn-sm fs-6"
                                            onClick={() => navigate(`/servicio-editar/${servicio.id}`)}
                                        >
                                            {/* <span className="material-icons">edit</span> */}
                                            <Edit2 size={12} />
                                        </button>
                                        <button className="btn btn-link btn-sm fs-6"
                                            onClick={() => navigate(`/servicio-ver/${servicio.id}`)}
                                        >
                                            {/* <i className="size-18" data-feather="archive"></i> */}
                                            <Eye size={12} />
                                        </button>
                                        <button className="btn btn-link btn-sm fs-6"
                                            id="btnRequest"
                                            onClick={() => navigate(`/request-ver/${servicio.id}`)}
                                        >
                                            <Code size={12} />
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
