import React from "react";
import Chart from 'chart.js/auto';
import { useState, useEffect } from "react";
import useApiSnoopy from "../../hooks/useApiSnoopy";
import { Pie, Bar, Doughnut } from "react-chartjs-2";
import ModalTablaGrafico from "./ModalTablaGrafico";


function Graficos() {
    let apiSnoopy = useApiSnoopy();

    const [cantServicioUrlBackend_qa, setCantServicioUrlBackend_qa] = useState(true);
    const [cantServicioUrlBackend_dev, setCantServicioUrlBackend_dev] = useState(true);

    const [cantServicioUrlServicio_qa, setCantServicioUrlServicio_qa] = useState(true);
    const [cantServicioUrlServicio_dev, setCantServicioUrlServicio_dev] = useState(true);
    const [cantServicioTipoProtocolo, setCantServicioTipoProtocolo] = useState(true);

    const [lista, setLista] = useState(0);

    const [estadoModal, setEstadoModal] = useState(false);

    const [servicioURL, setServicioURL] = useState("");

    const buscarServicios = async () => {
        listasDeServicios("d")
        apiSnoopy.listarServiciosIntegracion();
        apiSnoopy.listarServicioAutores();
    };

    const cantidadServiciosMostradosBackend_qa = apiSnoopy.listadoServicios
        .filter(servicio => cantServicioUrlBackend_qa ? (servicio.url_backend_qa !== 'https://' && servicio.url_backend_qa !== 'http://') : (servicio.url_backend_qa === 'https://' || servicio.url_backend_qa === 'http://')).length;

    const cantidadServiciosMostradosServicio_qa = apiSnoopy.listadoServicios
        .filter(servicio => cantServicioUrlServicio_qa ? (servicio.url_servicio_qa !== 'https://' && servicio.url_servicio_qa !== 'http://') : (servicio.url_servicio_qa === 'https://' || servicio.url_servicio_qa === 'http://')).length;

    const cantidadServiciosMostradosBackend_dev = apiSnoopy.listadoServicios
        .filter(servicio => cantServicioUrlBackend_dev ? (servicio.url_backend_dev !== 'https://' && servicio.url_backend_dev !== 'http://') : (servicio.url_backend_dev === 'https://' || servicio.url_backend_dev === 'http://')).length;

    const cantidadServiciosMostradosServicio_dev = apiSnoopy.listadoServicios
        .filter(servicio => cantServicioUrlServicio_dev ? (servicio.url_servicio_dev !== 'https://' && servicio.url_servicio_dev !== 'http://') : (servicio.url_servicio_dev === 'https://' || servicio.url_servicio_dev === 'http://')).length;

    const cantidadServiciosProtocoloRest = apiSnoopy.listadoServicios
        .filter(servicio => cantServicioTipoProtocolo ? (servicio.tipo_protocolo === 'rest') : (servicio.tipo_protocolo !== 'rest')).length;

    const [listadoServicosConURL, setListadoServicosConURL] = useState([]);
    const [listadoServiciosinURL, setListadoServiciosinURL] = useState([]);

    const listasDeServicios = (tipoServicio) => {
        if (tipoServicio === "autores") {
            setListadoServicosConURL([]);
            setListadoServiciosinURL([]);
            setServicioURL(tipoServicio);
        }
        if (tipoServicio === "url_backend_qa") {
            const servicioConURL = apiSnoopy.listadoServicios.filter(servicio => (servicio.url_backend_qa !== 'https://' && servicio.url_backend_qa !== 'http://'));
            const servicioSinURL = apiSnoopy.listadoServicios.filter(servicio => (servicio.url_backend_qa === 'https://' || servicio.url_backend_qa === 'http://'));
            setListadoServicosConURL(servicioConURL);
            setListadoServiciosinURL(servicioSinURL);
            setServicioURL(tipoServicio)
        }
        if (tipoServicio === "url_servicio_qa") {
            const servicioConURL = apiSnoopy.listadoServicios.filter(servicio => (servicio.url_servicio_qa !== 'https://' && servicio.url_servicio_qa !== 'http://'));
            const servicioSinURL = apiSnoopy.listadoServicios.filter(servicio => (servicio.url_servicio_qa === 'https://' || servicio.url_servicio_qa === 'http://'));
            setListadoServicosConURL(servicioConURL);
            setListadoServiciosinURL(servicioSinURL);
            setServicioURL(tipoServicio);
        }
        if (tipoServicio === "url_backend_dev") {
            const servicioConURL = apiSnoopy.listadoServicios.filter(servicio => (servicio.url_backend_dev !== 'https://' && servicio.url_backend_dev !== 'http://'));
            const servicioSinURL = apiSnoopy.listadoServicios.filter(servicio => (servicio.url_backend_dev === 'https://' || servicio.url_backend_dev === 'http://'));
            setListadoServicosConURL(servicioConURL);
            setListadoServiciosinURL(servicioSinURL);
            setServicioURL(tipoServicio);
        }
        if (tipoServicio === "url_servicio_dev") {
            const servicioConURL = apiSnoopy.listadoServicios.filter(servicio => (servicio.url_servicio_dev !== 'https://' && servicio.url_servicio_dev !== 'http://'));
            const servicioSinURL = apiSnoopy.listadoServicios.filter(servicio => (servicio.url_servicio_dev === 'https://' || servicio.url_servicio_dev === 'http://'));
            setListadoServicosConURL(servicioConURL);
            setListadoServiciosinURL(servicioSinURL);
            setServicioURL(tipoServicio);
        }
        if (tipoServicio === "tipo_protocolo") {
            const servicioConURL = apiSnoopy.listadoServicios.filter(servicio => (servicio.tipo_protocolo === 'rest'));
            const servicioSinURL = apiSnoopy.listadoServicios.filter(servicio => (servicio.tipo_protocolo === 'soap'));
            setListadoServicosConURL(servicioConURL);
            setListadoServiciosinURL(servicioSinURL);
            setServicioURL(tipoServicio);
        }
    }

    useEffect(() => {
        buscarServicios();
    }, [cantServicioUrlBackend_qa, cantServicioUrlBackend_dev, cantServicioUrlServicio_qa, cantServicioUrlServicio_dev]);


    return (
        <div style={{ fontSize: "14px" }}>
            <div className="row mt-3 mb-3 graficos--segun-su-url">
                <div className="col-sm-3 mb-sm-0 grafico--backend-qa">
                    <div className="card">
                        <div className="card-header">
                            <ul className="nav nav-pills card-header-pills">
                                <li className="nav-item" onClick={() => setEstadoModal(!estadoModal)}>
                                    <button
                                        className="bg-transparent border border-0"
                                        onClick={() => listasDeServicios("url_backend_qa")}
                                    >Ver Servicios</button>
                                </li>
                            </ul>
                        </div>
                        <div className="card-body text-center">
                            <h5 className="card-title">Backend qa</h5>
                            <div>
                                <Doughnut
                                    data={{
                                        labels: ["Servicios con URL", "Servicios sin URL"],
                                        datasets: [
                                            {
                                                label: "%",
                                                data: [Math.round((cantidadServiciosMostradosBackend_qa / (apiSnoopy.listadoServicios.length)) * 100), Math.round(((apiSnoopy.listadoServicios.length - cantidadServiciosMostradosBackend_qa) / apiSnoopy.listadoServicios.length) * 100)],
                                                backgroundColor: ["#5CAB61", "#FF656F"],
                                            },
                                        ],
                                    }}
                                    height={400}
                                    width={600}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="card grafico--servicio-qa">
                        <div className="card-header">
                            <ul className="nav nav-pills card-header-pills">
                                <li className="nav-item" onClick={() => setEstadoModal(!estadoModal)}>
                                    <button
                                        className="bg-transparent border border-0"
                                        onClick={() => listasDeServicios("url_servicio_qa")}
                                    >Ver Servicios</button>
                                </li>
                            </ul>
                        </div>
                        <div className="card-body text-center">
                            <h5 className="card-title">Servicio qa</h5>
                            <div>
                                <Doughnut
                                    data={{
                                        labels: ["Servicios con URL", "Servicios sin URL"],
                                        datasets: [
                                            {
                                                label: "%",
                                                data: [Math.round((cantidadServiciosMostradosServicio_qa / (apiSnoopy.listadoServicios.length)) * 100), Math.round(((apiSnoopy.listadoServicios.length - cantidadServiciosMostradosServicio_qa) / apiSnoopy.listadoServicios.length) * 100)],
                                                backgroundColor: ["#5CAB61", "#FF656F"],
                                            },
                                        ],
                                    }}
                                    height={400}
                                    width={600}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="card grafico--backend-dev">
                        <div className="card-header">
                            <ul className="nav nav-pills card-header-pills">
                                <li className="nav-item" onClick={() => setEstadoModal(!estadoModal)}>
                                    <button
                                        className="bg-transparent border border-0"
                                        onClick={() => listasDeServicios("url_backend_dev")}
                                    >Ver Servicios</button>
                                </li>
                            </ul>
                        </div>
                        <div className="card-body text-center">
                            <h5 className="card-title">Backend dev</h5>
                            <div className="">
                                <Doughnut
                                    data={{
                                        labels: ["Servicios con URL", "Servicios sin URL"],
                                        datasets: [
                                            {
                                                label: "%",
                                                data: [Math.round((cantidadServiciosMostradosBackend_dev / (apiSnoopy.listadoServicios.length)) * 100), Math.round(((apiSnoopy.listadoServicios.length - cantidadServiciosMostradosBackend_dev) / apiSnoopy.listadoServicios.length) * 100)],
                                                backgroundColor: ["#5CAB61", "#FF656F"],
                                            },
                                        ],
                                    }}
                                    height={400}
                                    width={600}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="card grafico--servicio-dev">
                        <div className="card-header">
                            <ul className="nav nav-pills card-header-pills">
                                <li className="nav-item" onClick={() => setEstadoModal(!estadoModal)}>
                                    <button
                                        className="bg-transparent border border-0"
                                        onClick={() => listasDeServicios("url_servicio_dev")}
                                    >Ver Servicios</button>
                                </li>
                            </ul>
                        </div>
                        <div className="card-body text-center">
                            <h5 className="card-title">Servicio dev</h5>
                            <div className="">
                                <Doughnut
                                    data={{
                                        labels: ["Servicios con URL", "Servicios sin URL"],
                                        datasets: [
                                            {
                                                label: "%",
                                                data: [Math.round((cantidadServiciosMostradosServicio_dev / (apiSnoopy.listadoServicios.length)) * 100), Math.round(((apiSnoopy.listadoServicios.length - cantidadServiciosMostradosServicio_dev) / apiSnoopy.listadoServicios.length) * 100)],
                                                backgroundColor: ["#5CAB61", "#FF656F"],
                                            },
                                        ],
                                    }}
                                    height={400}
                                    width={600}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                    <div className="card grafico--cantidad-autores" style={{ width: "80%" }}>
                        <div className="card-header">
                            <ul className="nav nav-pills card-header-pills">
                                <li className="nav-item" onClick={() => setEstadoModal(!estadoModal)}>
                                    <button
                                        className="bg-transparent border border-0"
                                        onClick={() => listasDeServicios("autores")}
                                    >Ver Servicios</button>
                                </li>
                            </ul>
                        </div>
                        <div className="card-body text-center">
                            <h5 className="card-title">Autores</h5>
                            <div>
                                <Bar
                                    data={{
                                        labels: apiSnoopy.listadoServicios ? Array.from(new Set(apiSnoopy.listadoServicios.map(item => item.autor_id))) : [],

                                        datasets: [
                                            {
                                                label: "Cantidad de servicios realizados",
                                                data: apiSnoopy.listadoServicios ? Array.from(new Set(apiSnoopy.listadoServicios.map(item => item.autor_id))).map(autorId => apiSnoopy.listadoServicios.reduce((count, item) => item.autor_id === autorId ? count + 1 : count, 0)) : [],
                                                backgroundColor: ["#5CAB61", "#FF656F"],
                                            },
                                        ],
                                    }}
                                    options={{
                                        indexAxis: 'y',
                                        scales: {
                                            y: {
                                                beginAtZero: true
                                            }
                                        }
                                    }}
                                    height={400}
                                    width={600}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6" >
                    <div className="card grafico--tipo-protocolo" style={{ width: "49%" }}>
                        <div className="card-header">
                            <ul className="nav nav-pills card-header-pills">
                                <li className="nav-item" onClick={() => setEstadoModal(!estadoModal)}>
                                    <button
                                        className="bg-transparent border border-0"
                                        onClick={() => listasDeServicios("tipo_protocolo")}
                                    >Ver Servicios</button>
                                </li>
                            </ul>
                        </div>
                        <div className="card-body text-center">
                            <h5 className="card-title">Tipo protocolo</h5>
                            <div>
                                <Doughnut
                                    data={{
                                        labels: ["Rest", "Soap"],
                                        datasets: [
                                            {
                                                label: "%",
                                                data: [Math.round((cantidadServiciosProtocoloRest / (apiSnoopy.listadoServicios.length)) * 100), Math.round(((apiSnoopy.listadoServicios.length - cantidadServiciosProtocoloRest) / apiSnoopy.listadoServicios.length) * 100)],
                                                backgroundColor: ["#5CAB61", "#FF656F"],
                                            },
                                        ],
                                    }}
                                    height={400}
                                    width={600}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <ModalTablaGrafico
                estado={estadoModal}
                cambiarEstado={setEstadoModal}
                tipoURL={servicioURL}
                listaServiciosConURL={listadoServicosConURL}
                listaServiciosSinURL={listadoServiciosinURL}
            />
        </div>
    )
}

export default Graficos;