import React, { useState, useEffect } from 'react';
import { FcCalendar } from "react-icons/fc";

import { X } from 'react-feather';


function ModalDescripcionEventos({ estado, cambiarEstado, tituloEvento, contenidoDelEvento }) {

    const clickEventos = () => {
        cambiarEstado(false);
    }

    const handleKeyDown = (event) => {
        if (event.keyCode === 27) {
            clickEventos();
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <>
            {estado && (
                <div className="position-fixed top-0 start-0 d-flex align-items-center justify-content-center " style={{ width: "100vw", height: "100vh", background: "rgba(0, 0, 0, .5)", zIndex: "1000" }}>
                    <div className="w-75 p-4 mx-auto bg-white h-75 position-relative rounded-5" style={{ fontSize: "14px" }}>
                        <div className="border-bottom pb-2" style={{ marginBottom: "50px" }}>
                            <h3 className='fs-6 text-primary fw-semibold'>{tituloEvento}</h3>
                        </div>
                        <button
                            className="position-absolute border border-0 bg-transparent"
                            style={{ top: "25px", right: "20px" }}
                            onClick={clickEventos}
                        >
                            <X className="text-danger" />
                        </button>
                        <div>
                            <table className="table">
                                <tbody className='border border-secondary fs-6'>
                                    <tr>
                                        <td className="fw-bold bg-success bg-opacity-10">Titulo</td>
                                        <td>{contenidoDelEvento.titulo}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold bg-success bg-opacity-10">Id</td>
                                        <td>{contenidoDelEvento.id}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold bg-success bg-opacity-10">Fecha de Inicio</td>
                                        <td>{contenidoDelEvento.fechaInicio}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold bg-success bg-opacity-10">Fecha de Termino</td>
                                        <td>{contenidoDelEvento.fechaTermino}</td>
                                    </tr>
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
