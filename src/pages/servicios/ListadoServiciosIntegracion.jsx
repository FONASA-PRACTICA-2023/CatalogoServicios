import { useState, useEffect } from "react";
import Cargando from "../../components/Cargando";
import MensajeError from "../../components/MensajeError";
import MensajeExito from "../../components/MensajeExito";
import { useParams, useNavigate } from "react-router-dom";
import useApiSnoopy from "../../hooks/useApiSnoopy";

function ListadoServiciosIntegracion() {
  let apiSnoopy = useApiSnoopy();
  const estructuraTablaHtml = {
    nombre: "",
    autor_id: "pcarrasco",
    descripcion: "",
    tipo_protocolo: "",
    categoria_servicio: "",
    ambiente: "",
    url_servicio_prd: "",
    canal_exposicion: "",
    criticidad_servicio: "",
    fecha_creacion: "",
    fecha_actualizacion: "",
  };

  const buscarServicios = async () => {
    apiSnoopy.listarServiciosIntegracion();
  };

  useEffect(() => {
    buscarServicios();
  }, []);

  return (
    <div>
      <h1>Listado de Servicios de Integración</h1>
      {apiSnoopy.cargando && <Cargando />}

      {apiSnoopy.error && <MensajeError mensaje={apiSnoopy.error} />}

      {apiSnoopy.listadoServicios && (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Autor</th>
              <th>Descripción</th>
              <th>Tipo de Protocolo</th>
              <th>Categoría de Servicio</th>
              <th>Canal de Exposición</th>
              <th>Criticidad de Servicio</th>
              <th>Fecha de Creación</th>
              <th>Fecha de Actualización</th>
            </tr>
          </thead>
          <tbody>
            {apiSnoopy.listadoServicios.map((servicio) => (
              <tr key={servicio.nombre}>
                <td>{servicio.nombre}</td>
                <td>{servicio.autor_id}</td>
                <td>{servicio.descripcion}</td>
                <td>{servicio.tipo_protocolo}</td>
                <td>{servicio.categoria_servicio}</td>
                <td>{servicio.canal_exposicion}</td>
                <td>{servicio.criticidad_servicio}</td>
                <td>{servicio.fecha_creacion}</td>
                <td>{servicio.fecha_actualizacion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListadoServiciosIntegracion;
