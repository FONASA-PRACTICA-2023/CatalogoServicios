import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { X } from 'react-feather';
import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";

function ModalObservaciones({ estado, cambiarEstado, idSer }) {
  const navigate = useNavigate();
  const [listaDeObservacion, setListaDeObservacion] = useState({});
  // Agrega estado para almacenar el número de elementos por página
  const [itemsPerPage, setItemsPerPage] = useState(5);
  // Agrega estado para almacenar la página actual
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState(0);

  const listadoDeObservaciones = async () => {
    var raw = JSON.stringify({
      "id_servicio": idSer
    });

    await fetch("https://bhornw6rd7.execute-api.us-east-1.amazonaws.com/dev/gestic-buscar-observaciones-servicios", {
      method: "POST",
      body: raw,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("HTTP error " + res.status);
        }
        return res.json();
      })
      .then((response) => {
        setListaDeObservacion(response.registros)
      })
      .catch((error) => {
        console.error("Error while fetching: " + error);
        setListaDeObservacion([])
      });
  };

  const clickEventos = () => {
    cambiarEstado(false);
    idSer = "";
    resetPage();
  }

  useEffect(() => {
    listadoDeObservaciones();
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };

  }, [idSer]);

  const handleKeyDown = (event) => {
    if (event.keyCode === 27) {
      clickEventos();
    }
  };

  // función para retroceder en una página
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // función para avanzar en una página
  const nextPage = () => {
    setPages(Math.ceil(listaDeObservacion.length / itemsPerPage));
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

  return (
    <>
      {estado && (
        <div className="position-fixed top-0 start-0 d-flex align-items-center justify-content-center " style={{ width: "100vw", height: "100vh", background: "rgba(0, 0, 0, .5)", zIndex: "1000" }}
        >
          <div className="w-75 p-4 mx-auto bg-white h-75 position-relative rounded-5" style={{ fontSize: "14px" }}>
            <div className="mb-2 pb-2 text-primary f-1 border-bottom">
              {idSer}
            </div>
            <button
              className="position-absolute border border-0 bg-transparent"
              style={{ top: "25px", right: "20px" }}
              onClick={clickEventos}
            >
              <X className="text-danger" />
            </button>
            <div className="d-flex justify-content-evenly flex-wrap overflow-auto" style={{ height: "450px" }}>
              {listaDeObservacion.length !== 0 ?
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr className="position-sticky top-0">
                      <th>Titulo</th>
                      <th>Id Servicio</th>
                      <th>Autor</th>
                      <th>Descripcion</th>
                      <th>Estado</th>
                      <th>Fecha Creacion</th>
                      <th>Fecha Actualizacion</th>
                    </tr>
                  </thead>

                  <tbody>
                    {listaDeObservacion &&
                      listaDeObservacion
                        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                        .map((item) =>
                          <tr>
                            <td>{item.titulo}</td>
                            <td>{item.id_servicio}</td>
                            <td>{item.autor_id}</td>
                            <td>{item.descripcion}</td>
                            <td>{item.estado}</td>
                            <td>{item.fecha_creacion}</td>
                            <td>{item.fecha_actualizacion}</td>
                          </tr>
                        )}
                  </tbody>
                </table> : <div>No hay registro de observaciones para este servicios</div>}
            </div>
            <div className="tabla-servicos-url__pagination d-flex justify-content-center">
              {listaDeObservacion.length !== 0 ?
                <>
                  <button onClick={prevPage} className='btn btn-primary'><TfiArrowCircleLeft size={20} /></button>
                  <input type="number" value={currentPage} onChange={e => goToPage(e.target.value)} disabled/>
                  <button onClick={nextPage} className='btn btn-primary'><TfiArrowCircleRight size={20} /></button>
                </>
                : <></>}
            </div>
            <div className='w-auto p-3 d-flex justify-content-center'>
              <button className="btn btn-outline-success rounded"
                onClick={() => navigate(`/add-observacion/${idSer}`)}
              >Agregar Observacion</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalObservaciones;
