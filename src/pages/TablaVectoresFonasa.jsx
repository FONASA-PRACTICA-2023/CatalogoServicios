import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function TablaVectoresFonasa(props) {
  const navigate = useNavigate();
  console.log("TablaVectoresFonasa", props);
  return (
    <table className="table table-striped table-hover mt-3 text-center">
      <thead className="table-light">
        <tr>
          <th>ID</th>
          <th>Predicción No Pertinencia</th>
          <th>No Pertinencia según Control</th>
          <th>Digitado por</th>
          <th>Actualizado por</th>
          <th>Fecha de creación</th>
          <th>Fecha de actualización</th>
          <th>Versión Predicción</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {props.registros.map((vector) => (
          <tr key={vector.id_caso}>
            <td>{vector.id_caso}</td>
            <td>{vector.v57_no_pertinencia}</td>
            <td>{vector.no_pertinencia_segun_control}</td>
            <td>{vector.usuario_insert}</td>
            <td>{vector.usuario_ultimo_update}</td>
            <td>{vector.fecha_insert}</td>
            <td>{vector.fecha_ultimo_update}</td>
            <td>{vector.version_ml_prediccion}</td>
            <td>
              <OverlayTrigger
                key="top"
                placement="top"
                overlay={<Tooltip id="tooltip-top">Ver Detalle</Tooltip>}
              >
                <button
                  className="btn btn-link btn-sm"
                  onClick={() =>
                    navigate(`/vector-ver-detalle/${vector.pk_registro}`)
                  }
                >
                  <span className="material-icons ">info</span>
                </button>
              </OverlayTrigger>
              <OverlayTrigger
                key="top"
                placement="top"
                overlay={
                  <Tooltip id="tooltip-top">Ver historia del registro</Tooltip>
                }
              >
                <button
                  className="btn btn-link btn-sm"
                  onClick={() => props.verBitacora(vector.pk_registro)}
                >
                  <span class="material-icons">view_timeline</span>
                </button>
              </OverlayTrigger>
              <OverlayTrigger
                key="top"
                placement="top"
                overlay={<Tooltip id="tooltip-top">Editar Registro</Tooltip>}
              >
                <button
                  className="btn btn-link btn-sm"
                  onClick={() =>
                    navigate(`/vector-editar-registro/${vector.pk_registro}`)
                  }
                >
                  <span className="material-icons ">edit</span>
                </button>
              </OverlayTrigger>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TablaVectoresFonasa;
