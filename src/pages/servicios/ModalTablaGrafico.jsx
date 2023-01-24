import React, { useState, useEffect } from 'react';
import useApiSnoopy from "../../hooks/useApiSnoopy";
import { Eye, Edit2, MessageSquare, Code, Check, X } from 'react-feather';
import { useNavigate } from "react-router-dom";

import ModalObservaciones from "./ModalObservaciones";
import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";

function ModalTablaGrafico({ estado, cambiarEstado, tipoURL, listaServiciosConURL, listaServiciosSinURL }) {
    const navigate = useNavigate();
    let apiSnoopy = useApiSnoopy();

    const [estadoModalObservaciones, setEstadoModalObservaciones] = useState(false);
    const [selectedServiceId, setSelectedServiceId] = useState(null);

    const [mostrarServicios, setMostrarServicios] = useState(true);

    // paginacion
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [cantserviciosPorAutor, setCantserviciosPorAutor] = useState(null);


    const [activeAuthor, setActiveAuthor] = useState('');
    const [selectedAuthor, setSelectedAuthor] = useState('');

    function handleAuthorSelection(author) {
        setCurrentPage(1)
        setSelectedAuthor(author);
        setActiveAuthor(author);
    }

    const buscarServicios = async () => {
        apiSnoopy.listarServiciosIntegracion();
        apiSnoopy.listarServicioAutores();
    };

    const clickEventos = () => {
        cambiarEstado(false);
        resetPage();
    }

    const manejarClick = () => {
        setCurrentPage(1)
        setMostrarServicios(!mostrarServicios)
    };

    const comprobar = (item) => {
        if (item === "rest") {
            return <span>rest</span>
        }
        if (item === "soap") {
            return <span>soap</span>
        }
        if (item === "https://" || item === "http://") {
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
        if (mostrarServicios && tipoURL !== 'autores') {
            setPages(Math.ceil(listaServiciosConURL.length / itemsPerPage));
        } else {
            setPages(Math.ceil(listaServiciosSinURL.length / itemsPerPage));
        }
        if (tipoURL === 'autores') {
            setPages(Math.ceil(apiSnoopy.listadoServicios.filter(service => service.autor_id === selectedAuthor).length / itemsPerPage))
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

    const handleKeyDown = (event) => {
        if (event.keyCode === 27) {
            clickEventos();
        }
    };

    useEffect(() => {
        buscarServicios();
        let lista = apiSnoopy.listadoServicios.filter(service => service.autor_id === "juan.placencia").length;
        console.log("77777777");
        console.log(lista);
        console.log("777777777");

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [itemsPerPage]);

    return (
        <>
            {estado &&
                <div className="position-fixed top-0 start-0 d-flex align-items-center justify-content-center " style={{ width: "100vw", height: "100vh", background: "rgba(0, 0, 0, .5)", zIndex: "1000" }}>
                    <div className="w-75 p-4 mx-auto bg-white h-75 position-relative rounded-5" style={{ fontSize: "14px" }}>
                        <div className="mb-2 pb-2 text-primary f-1 border-bottom">
                            {tipoURL}
                        </div>
                        <button
                            className="modal__btn-cerrar position-absolute border border-0 bg-transparent"
                            style={{ top: "25px", right: "20px" }}
                            onClick={clickEventos}
                        >
                            <X className="text-danger" />
                        </button>

                        <div>
                            {tipoURL !== "autores" ? (
                                <div onClick={manejarClick}>
                                    {tipoURL !== "tipo_protocolo" ? (
                                        <>
                                            {mostrarServicios ? (
                                                <div>
                                                    <Check className="text-success" /> Servicios con " {tipoURL} " ({listaServiciosConURL.length})
                                                </div>
                                            ) : (
                                                <div>
                                                    <X className="text-danger" /> Servicios sin " {tipoURL} " ({listaServiciosSinURL.length})
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            {mostrarServicios ? (
                                                <div>
                                                    protocolo rest ({listaServiciosConURL.length})
                                                </div>
                                            ) : (
                                                <div>
                                                    protocolo soap ({listaServiciosSinURL.length})
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            ) : null}
                        </div>


                        <div className="card mb-4 border border border-0" style={{ height: "500px" }}>
                            <div className="card-body overflow-auto text-center">
                                {tipoURL !== "autores" ?
                                    <table className="table table-hover">
                                        <thead>
                                            <tr className="position-sticky top-0 bg-light">
                                                <th scope="col">Nombre</th>
                                                <th scope="col">Autor</th>
                                                <th scope="col">{tipoURL}</th>
                                                <th scope="col">Acciones</th>
                                            </tr>
                                        </thead>
                                        {listaServiciosConURL.length !== 0 || listaServiciosSinURL.length !== 0 ?
                                            <tbody className="table-group-divider">
                                                {(mostrarServicios ? listaServiciosConURL : listaServiciosSinURL)
                                                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                                                    .map((servicio) => (
                                                        <tr key={servicio.id}>
                                                            <td>{servicio.nombre}</td>
                                                            <td>{servicio.autor_id}</td>
                                                            <td>{comprobar(servicio[tipoURL])}</td>
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
                                            :
                                            <div>NO HAY DATOS</div>
                                        }
                                    </table>
                                    :
                                    <div className="card text-center">
                                        <div className="card-header">
                                            <ul className="nav nav-tabs card-header-tabs">
                                                {apiSnoopy.listadoServicios &&
                                                    Array.from(new Set(apiSnoopy.listadoServicios.map(item => item.autor_id)))
                                                        .map((item, index) =>
                                                            <li className="nav-item">
                                                                <a className={`nav-link ${item === activeAuthor ? 'active' : ''}`} href="#" onClick={() => handleAuthorSelection(item)}>{item}</a>
                                                            </li>
                                                        )
                                                }
                                            </ul>
                                        </div>
                                        <div className="card-body listaDeServiciosPorAutor">
                                            <div className="card">
                                                <div className="card-body text-center">
                                                    <table className='table table-hover'>
                                                        <thead>
                                                            <tr>
                                                                <th>Servicio</th>
                                                                <th>Autor</th>
                                                                <th>Fecha de Creación</th>
                                                                <th>Fecha de Actualización</th>
                                                                <th>Acciones</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="table-group-divider">
                                                            {apiSnoopy.listadoServicios && apiSnoopy.listadoServicios.filter(service => service.autor_id === selectedAuthor).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                                                                .map(service =>
                                                                    <tr>
                                                                        <td>{service.nombre}</td>
                                                                        <td>{service.autor_id}</td>
                                                                        <td>{service.fecha_creacion}</td>
                                                                        <td>{service.fecha_actualizacion}</td>
                                                                        <td>
                                                                            <button
                                                                                className="btn btn-link btn-sm fs-6"
                                                                                onClick={() => navigate(`/servicio-editar/${service.id}`)}
                                                                            >
                                                                                {/* <span className="material-icons">edit</span> */}
                                                                                <Edit2 size={16} />
                                                                            </button>
                                                                            <button className="btn btn-link btn-sm fs-6"
                                                                                onClick={() => navigate(`/servicio-ver/${service.id}`)}
                                                                            >
                                                                                {/* <i className="size-18" data-feather="archive"></i> */}
                                                                                <Eye size={16} />
                                                                            </button>
                                                                            <button className="btn btn-link btn-sm fs-6"
                                                                                id="btnRequest"
                                                                                onClick={() => navigate(`/request-ver/${service.id}`)}
                                                                            >
                                                                                <Code size={16} />
                                                                            </button>
                                                                            <button className="btn btn-link btn-sm fs-6"
                                                                                onClick={() => setEstadoModalObservaciones(!estadoModalObservaciones)}
                                                                            >
                                                                                <MessageSquare size={16} onClick={() => setSelectedServiceId(service.id)} />
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }

                            </div>
                        </div>

                        <div className="tabla-servicos-url__pagination d-flex justify-content-center">
                            {listaServiciosConURL.length !== 0 || listaServiciosSinURL.length !== 0 || tipoURL === 'autores' ?
                                <>
                                    <button onClick={prevPage} className='btn btn-primary'><TfiArrowCircleLeft size={20} /></button>
                                    <input type="number" value={currentPage} onChange={e => goToPage(e.target.value)} />
                                    <button onClick={nextPage} className='btn btn-primary'><TfiArrowCircleRight size={20} /></button>
                                </>
                                : <></>}
                        </div>
                    </div>
                </div>
            }
            <ModalObservaciones
                estado={estadoModalObservaciones}
                cambiarEstado={setEstadoModalObservaciones}
                idSer={selectedServiceId}
            />
        </>
    );
}

export default ModalTablaGrafico;