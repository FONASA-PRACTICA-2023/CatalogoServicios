import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function TablaVectoresPrestador(props) {
  const navigate = useNavigate();
  console.log("TablaVectoresPrestador", props);
  return (
    <table className="table table-striped table-hover mt-3 text-center">
      <thead className="table-light">
        <tr>
          <th>ID</th>
          <th>Digitado por</th>
          <th>Actualizado por</th>
          <th>Fecha de creación</th>
          <th>Fecha de actualización</th>
          <th>Accion</th>
        </tr>
      </thead>
      <tbody>
        {props.registros.map((vector) => (
          <tr key={vector.id_caso}>
            <td>{vector.id_caso}</td>
            <td>{vector.usuario_insert}</td>
            <td>{vector.usuario_ultimo_update}</td>
            <td>{vector.fecha_insert}</td>
            <td>{vector.fecha_ultimo_update}</td>
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
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TablaVectoresPrestador;
