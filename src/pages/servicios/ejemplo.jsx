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
            <div class="card mt-3 rounded shadow" aria-hidden="true" id="carga">
                <div class="card-body">
                    <h5 class="card-title placeholder-glow">
                        <span class="placeholder col-6"></span>
                    </h5>
                    <p class="card-text placeholder-glow">
                        <span class="placeholder col-7"></span>
                        <span class="placeholder col-4"></span>
                        <span class="placeholder col-4"></span>
                        <span class="placeholder col-6"></span>
                        <span class="placeholder col-8"></span>
                    </p>
                    <a href="#" tabindex="-1" class="btn btn-primary disabled placeholder col-1"></a>
                </div>
            </div>
        </>

    );
}

export default Ejemplo;