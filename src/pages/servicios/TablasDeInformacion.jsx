import { useState, useEffect } from "react";
import { Check, X, Eye, Edit2, MessageSquare, Code } from 'react-feather';
import ModalObservaciones from "./ModalObservaciones";
import useApiSnoopy from "../../hooks/useApiSnoopy";
import { useNavigate } from "react-router-dom";

function TablasDeInformacion() {
    const navigate = useNavigate();
    let apiSnoopy = useApiSnoopy();

    const buscarServicios = async () => {
        apiSnoopy.listarServiciosIntegracion();
        apiSnoopy.listarServicioAutores();
    };

    const [estadoModalObservaciones, setEstadoModalObservaciones] = useState(false);
    const [mostrarServiciosSinUrlBackendqa, setMostrarServiciosSinUrlBackendqa] = useState(true);
    const [mostrarServiciosSinUrlServicioqa, setMostrarServiciosSinUrlServicioqa] = useState(true);
    const [mostrarServiciosSinUrlBackenddev, setMostrarServiciosSinUrlBackenddev] = useState(false);
    const [mostrarServiciosSinServiciodev, setMostrarServiciosSinServiciodev] = useState(false);
    const [selectedServiceId, setSelectedServiceId] = useState(null);


    const comprobar = (item) => {
        if (item === "https://" || item === "http://" || item === "no") {
            return <X className="text-danger" />;
        } else {
            return <Check className="text-success" />;
        }
    }
    const manejarClickBackendqa = () => {
        setMostrarServiciosSinUrlBackendqa(!mostrarServiciosSinUrlBackendqa)
    };

    const manejarClickServicioqa = () => {
        setMostrarServiciosSinUrlServicioqa(!mostrarServiciosSinUrlServicioqa)
    };

    const manejarClickBackenddev = () => {
        setMostrarServiciosSinUrlBackenddev(!mostrarServiciosSinUrlBackenddev)
    };

    const manejarClickServiciodev = () => {
        setMostrarServiciosSinServiciodev(!mostrarServiciosSinServiciodev)
    };

    const cantidadDeServicio = apiSnoopy.listadoServicios.length;

    const cantidadServiciosMostradosBackend_qa = apiSnoopy.listadoServicios
        .filter(servicio => mostrarServiciosSinUrlBackendqa ? (servicio.url_backend_qa !== 'https://' && servicio.url_backend_qa !== 'http://') : (servicio.url_backend_qa === 'https://' || servicio.url_backend_qa === 'http://')).length;

    const cantidadServiciosMostradosServicioqa = apiSnoopy.listadoServicios
        .filter(servicio => mostrarServiciosSinUrlServicioqa ? (servicio.url_servicio_qa !== 'https://' && servicio.url_servicio_qa !== 'http://') : (servicio.url_servicio_qa === 'https://' || servicio.url_servicio_qa === 'http://')).length;

    const cantidadServiciosMostradosBackend_dev = apiSnoopy.listadoServicios
        .filter(servicio => mostrarServiciosSinUrlBackenddev ? (servicio.url_backend_dev !== 'https://' && servicio.url_backend_dev !== 'http://') : (servicio.url_backend_dev === 'https://' || servicio.url_backend_dev === 'http://')).length;

    const cantidadServiciosMostradosServicio_dev = apiSnoopy.listadoServicios
        .filter(servicio => mostrarServiciosSinServiciodev ? (servicio.url_servicio_dev !== 'https://' && servicio.url_servicio_dev !== 'http://') : (servicio.url_servicio_dev === 'https://' || servicio.url_servicio_dev === 'http://')).length;

    useEffect(() => {
        buscarServicios();
    }, []);

    return (
        <div>
            <div className="d-flex justify-content-center mb-3 mt-3">
                <h2>Todos los servicios dependiendo de la URL:</h2>
            </div>
            <div className="row row-cols-1 row-cols-md-2 g-5 text-center" style={{ fontSize: "14px" }}>
                <div className="col">
                    <div className="card servicios--backend-qa">
                        <div className="card-header">
                            <ul className="nav nav-pills card-header-pills">
                                <li className="nav-item">
                                    <button
                                        className="bg-transparent border border-0"
                                        onClick={manejarClickBackendqa}
                                    >
                                        {mostrarServiciosSinUrlBackendqa ? <Check className="text-success" /> : <X className="text-danger" />} {mostrarServiciosSinUrlBackendqa ? <span>Servicios con URL "backend qa"</span> : <span>Servicios sin URL "backend qa"</span>} ({cantidadServiciosMostradosBackend_qa}) igual al {Math.round((cantidadServiciosMostradosBackend_qa / cantidadDeServicio) * 100)}%
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className="card-body overflow-scroll" style={{ height: "700px" }}>
                            <table className="table table-hover">
                                <thead>
                                    <tr className="position-sticky top-0 bg-light">
                                        <th>Nombre</th>
                                        <th>Autor</th>
                                        <th>Url Backend Qa</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {apiSnoopy.listadoServicios.filter(servicio => mostrarServiciosSinUrlBackendqa ? (servicio.url_backend_qa !== 'https://' && servicio.url_backend_qa !== 'http://') : (servicio.url_backend_qa === 'https://' || servicio.url_backend_qa === 'http://'))
                                        .map((servicio) => (
                                            <tr key={servicio.id}>
                                                <td>{servicio.nombre}</td>
                                                <td>{servicio.autor_id}</td>
                                                <td>
                                                    {comprobar(servicio.url_backend_qa)}
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
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card servicios--servicio-qa">
                        <div className="card-header">
                            <ul className="nav nav-pills card-header-pills">
                                <li className="nav-item">
                                    <button
                                        className="bg-transparent border border-0"
                                        onClick={manejarClickServicioqa}
                                    >
                                        {mostrarServiciosSinUrlServicioqa ? <Check className="text-success" /> : <X className="text-danger" />} {mostrarServiciosSinUrlServicioqa ? <span>Servicios con URL "servicio qa"</span> : <span>Servicios sin URL "servicio qa"</span>} ({cantidadServiciosMostradosServicioqa}) igual al {Math.round((cantidadServiciosMostradosServicioqa / cantidadDeServicio) * 100)}%
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className="card-body overflow-scroll" style={{ height: "700px" }}>
                            <table className="table table-hover">
                                <thead>
                                    <tr className="position-sticky top-0 bg-light">
                                        <th>Nombre</th>
                                        <th>Autor</th>
                                        <th>Url Servicio Qa</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {apiSnoopy.listadoServicios.filter(servicio => mostrarServiciosSinUrlServicioqa ? (servicio.url_servicio_qa !== 'https://' && servicio.url_backend_qa !== 'http://') : (servicio.url_servicio_qa === 'https://' || servicio.url_servicio_qa === 'http://'))
                                        .map((servicio) => (
                                            <tr key={servicio.id}>
                                                <td>{servicio.nombre}</td>
                                                <td>{servicio.autor_id}</td>

                                                <td>
                                                    {comprobar(servicio.url_servicio_qa)}
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
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card servicios--backend-dev">
                        <div className="card-header">
                            <ul className="nav nav-pills card-header-pills">
                                <li className="nav-item">
                                    <button
                                        className="bg-transparent border border-0"
                                        onClick={manejarClickBackenddev}
                                    >
                                        {mostrarServiciosSinUrlBackenddev ? <Check className="text-success" /> : <X className="text-danger" />} {mostrarServiciosSinUrlBackenddev ? <span>Servicios con URL "backend dev"</span> : <span>Servicios sin URL "backend dev"</span>} ({cantidadServiciosMostradosBackend_dev}) igual al {Math.round((cantidadServiciosMostradosBackend_dev / cantidadDeServicio) * 100)}%
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className="card-body overflow-scroll" style={{ height: "700px" }}>
                            <table className="table table-hover">
                                <thead>
                                    <tr className="position-sticky top-0 bg-light" >
                                        <th>Nombre</th>
                                        <th>Autor</th>
                                        <th>Url Backend dev</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {apiSnoopy.listadoServicios.filter(servicio => mostrarServiciosSinUrlBackenddev ? (servicio.url_backend_dev !== 'https://' && servicio.url_backend_dev !== 'http://') : (servicio.url_backend_dev === 'https://' || servicio.url_backend_dev === 'http://'))
                                        .map((servicio) => (
                                            <tr key={servicio.id}>
                                                <td>{servicio.nombre}</td>
                                                <td>{servicio.autor_id}</td>
                                                <td>
                                                    {comprobar(servicio.url_backend_dev)}
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
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card servicios--servicio-dev">
                        <div className="card-header">
                            <ul className="nav nav-pills card-header-pills">
                                <li className="nav-item">
                                    <button
                                        className="bg-transparent border border-0"
                                        onClick={manejarClickServiciodev}
                                    >
                                        {mostrarServiciosSinServiciodev ? <Check className="text-success" /> : <X className="text-danger" />} {mostrarServiciosSinServiciodev ? <span>Servicios con URL "servicio dev"</span> : <span>Servicios sin URL "servicio dev"</span>} ({cantidadServiciosMostradosServicio_dev}) igual al {Math.round((cantidadServiciosMostradosServicio_dev / cantidadDeServicio) * 100)}%
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className="card-body overflow-scroll" style={{ height: "700px" }}>
                            <table className="table table-hover">
                                <thead>
                                    <tr className="position-sticky top-0 bg-light">
                                        <th>Nombre</th>
                                        <th>Autor</th>
                                        <th>Url servicio dev</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {apiSnoopy.listadoServicios.filter(servicio => mostrarServiciosSinServiciodev ? (servicio.url_servicio_dev !== 'https://' && servicio.url_servicio_dev !== 'http://') : (servicio.url_servicio_dev === 'https://' || servicio.url_servicio_dev === 'http://'))
                                        .map((servicio) => (
                                            <tr key={servicio.id}>
                                                <td>{servicio.nombre}</td>
                                                <td>{servicio.autor_id}</td>

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
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <ModalObservaciones
                estado={estadoModalObservaciones}
                cambiarEstado={setEstadoModalObservaciones}
                idSer={selectedServiceId}
            />
        </div>
    )
}

export default TablasDeInformacion;
