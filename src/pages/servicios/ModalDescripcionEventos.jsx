import React, { useState, useEffect } from 'react';
import { FcCalendar } from "react-icons/fc";
import { X } from 'react-feather';

function ModalDescripcionEventos({ estado, cambiarEstado, tituloEvento, detallesEvento }) {
    const [events, setEvents] = useState([])

    const clickEventos = () => {
        cambiarEstado(false);
    }

    const handleKeyDown = (event) => {
        if (event.keyCode === 27) {
            clickEventos();
        }
    };

    const leerDetallesEvento = () => {
        fetch('https://api.fonasa.cl/cmdb-api/status-proyecto/' + detallesEvento.proyectoID)
            .then(response => response.json())
            .then(data => {
                // los objetos lo guardo en la lista
                setEvents(data);
            })
    }

    function formatDate(date) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return new Date(date).toLocaleDateString('es-CL', options)
    }
    
    useEffect(() => {
        leerDetallesEvento();
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [detallesEvento]);

    return (
        <>
            {estado && (
                <div className="position-fixed top-0 start-0 d-flex align-items-center justify-content-center " style={{ width: "100vw", height: "100vh", background: "rgba(0, 0, 0, .5)", zIndex: "1000" }}>
                    <div className="w-75 p-4 mx-auto bg-white h-75 position-relative rounded-3" style={{ fontSize: "14px" }}>
                        <div className="border-bottom pb-2" style={{ marginBottom: "20px" }}>
                            <h3 className='fs-6 text-primary fw-semibold'>{tituloEvento}</h3>
                        </div>
                        <button
                            className="position-absolute border border-0 bg-transparent"
                            style={{ top: "25px", right: "20px" }}
                            onClick={clickEventos}
                        >
                            <X className="text-danger" />
                        </button>
                        <div className='mb-2'>
                            <span>
                            Fecha ejecucion: {detallesEvento.fechaTermino}
                        </span>
                        </div>
                        <h3>Estado del proyecto</h3>
                        
                        <div className="w-100 mx-auto overflow-scroll text-center" style={{ height: "530px", fontSize: "12px" }}>

                            {/* Modifica la tabla para utilizar los datos del estado en lugar de apiSnoopy.listadoServicios */}
                            <table className="table table-hover table-bordered ">
                                <thead className="table-light">
                                    <tr className="position-sticky top-0">
                                        <th>Fecha</th>
                                        <th>Descripcion</th>
                                        <th>Autor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.map((evento) => (
                                            <tr>
                                                <td>{formatDate(evento.fecha_status)}</td>
                                                <td>{evento.descripcion}</td>
                                                <td>{evento.autor_id}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ModalDescripcionEventos;
