import { useState, useEffect } from "react";
import Cargando from "../../components/Cargando";
import { useParams} from "react-router-dom";
import useApiSnoopy from "../../hooks/useApiSnoopy";

function VentanaRequest() {
  let params = useParams();
  const [ejemplos, setEjemplos] = useState([]);
  let apiSnoopy = useApiSnoopy();

  const inicializarFormulario = async () => {
    if (params.id) {
      console.log("params", params);
      let id = params.id;
      await apiSnoopy.buscarRegistrosEjemploRequest(id, setEjemplos);
    }
  };

  useEffect(() => {
    inicializarFormulario();
  }, []);

  return (
    <div>
          {ejemplos.length > 0 && (
            <div className="row">
              <div className="col-md-12">
                <h3>Ejemplos de uso del Servicio</h3>

                {ejemplos.map((ejemplo) => (
                  <div className="row mt-3" key={ejemplo.id}>
                    <div className="col-md-12">
                      <h4>
                        {ejemplo.descripcion}{" "}
                      </h4>
                      {apiSnoopy.loading && <Cargando />}
                    </div>
                    <div className="col-md-6">
                      <h4>Request</h4>
                      <pre>{ejemplo.pregunta}</pre>
                    </div>
                    <div className="col-md-6">
                      <h4>Response</h4>
                      <pre>{ejemplo.respuesta}</pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
    </div>
  );
}

export default VentanaRequest;