import React from "react";
import { useEffect } from "react";


function Ejemplo() {

    useEffect(() => {
        cargar();
    }, []);

    const mostrar = () => {
        document.getElementById("original").style.display = "block";
        document.getElementById("carga").style.display = "none";
    }

    const cargar = () => {
        document.getElementById("original").style.display = "none";
        document.getElementById("carga").style.display = "block";
    }

    return (
        <>
            <button className="btn btn-primary col-6" onClick={mostrar}>Mostrar</button>
            <button className="btn btn-primary col-6" onClick={cargar}>Cargar</button>

            {/* ORIGINAL TEXTUAL */}
            <div class="card mt-3 rounded shadow" id="original">
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
            {/* VERSION DE CARGA */}
            <div class="d-flex justify-content-center mt-3">
                <div class="spinner-border text-secondary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <div className="mt-3" aria-hidden="true" id="carga">
                <div className="card-body">
                    <h5 className="card-title placeholder-glow">
                        <span className="placeholder col-1"></span>
                        <span className="placeholder col-3"></span>
                        <span className="placeholder col-3"></span>
                        <span className="placeholder col-3"></span>
                        <span className="placeholder col-1"></span>
                    </h5>
                    <p className="card-text placeholder-glow">
                        {Array.from({ length: 50 }).map((_, index) => (
                            <React.Fragment key={index}>
                                <span className="placeholder col-1 mt-5"></span>
                                <span className="placeholder col-2 mt-5"></span>
                                <span className="placeholder col-4 mt-5"></span>
                                <span className="placeholder col-3 mt-5"></span>
                                <span className="placeholder col-1 mt-5"></span>
                            </React.Fragment>
                        ))}
                    </p>
                </div>
            </div>


        </>

    );
}

export default Ejemplo;