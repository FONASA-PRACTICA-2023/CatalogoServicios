import React from "preact/compat";
import { useState, useEffect } from "react";
import useApiSnoopy from "../../hooks/useApiSnoopy";
import { useNavigate } from "react-router-dom";
import FilterableTable from 'react-filterable-table';
import "../../assets/estilosTablas.css"
import ModalObservaciones from "./ModalObservaciones";
import { Check, X, Eye, Edit2, MessageSquare, Code } from 'react-feather';

function ListadoServiciosIntegracion() {
  const navigate = useNavigate();
  let apiSnoopy = useApiSnoopy();
  const [isLoading, setIsLoading] = useState(false);
  const [estadoModalObservaciones, setEstadoModalObservaciones] = useState(false);
  const [idServicio, setIDServicio] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  const buscarServicios = async () => {
    setIsLoading(true);
    await apiSnoopy.listarServiciosIntegracion();
    await apiSnoopy.listarServicioAutores();
    setIsLoading(false);
  };

  const renderAccion = (props) => {
    setIDServicio(props.value)
    return (
      <>
        <button
          className="btn btn-link btn-sm fs-6"
          onClick={() => navigate(`/servicio-editar/${props.value}`)}
        >
          <Edit2 size={16} />
        </button>
        <button className="btn btn-link btn-sm fs-6"
          onClick={() => navigate(`/servicio-ver/${props.value}`)}
        >
          <Eye size={16} />
        </button>
        <button className="btn btn-link btn-sm fs-6"
          id="btnRequest"
          onClick={() => navigate(`/request-ver/${props.value}`)}
        >
          <Code size={16} />
        </button>
        <button className="btn btn-link btn-sm fs-6"
          onClick={() => setEstadoModalObservaciones(!estadoModalObservaciones)}
        >
          <MessageSquare size={16} onClick={() => setSelectedServiceId(props.value)} />
        </button>
      </>
    );
  };

  const fields = [
    { name: 'numerador', displayName: "Numerador", inputFilterable: true, sortable: true, exactFilterable: true },
    { name: 'nombre', displayName: "Servicio", inputFilterable: true, sortable: true },
    { name: 'tipo_protocolo', displayName: "Protocolo", inputFilterable: true, sortable: true },
    { name: 'categoria_servicio', displayName: "Categoría", inputFilterable: true, sortable: true },
    { name: 'criticidad_servicio', displayName: "Criticidad", inputFilterable: true, sortable: true },
    { name: 'fecha_creacion', displayName: "Fecha de Creación", inputFilterable: true, sortable: true },
    { name: 'id', displayName: "Acciones", inputFilterable: true, sortable: true, render: renderAccion }
  ];

  useEffect(() => {
    buscarServicios();
  }, []);

  if (isLoading) {
    return <div class="spinner-border m-5" role="status"><span class="visually-hidden">Loading...</span></div>;
  } else {

    return (
      <div>
        <h2>Catalogo de Servicios</h2>
        <div className="overflow-scroll text-center" style={{fontSize: "14px"}}>
          <FilterableTable
            tableClassName="table table-bordered table-hover"
            namespace="People"
            pagerTitles={{ first: 'primera', last: 'últimas' }}
            initialSort="name"
            pagerBottomClassName="pagination justify-content-center"
            topPagerVisible={false}
            recordCountName="Servicio"
            recordCountNamePlural="Servicios"
            data={apiSnoopy.listadoServicios} pageSize={15}
            fields={fields}
            noRecordsMessage="There are no people to display"
            noFilteredRecordsMessage="No people match your filters!"
          />
        </div>
        <ModalObservaciones
          estado={estadoModalObservaciones}
          cambiarEstado={setEstadoModalObservaciones}
          idSer={selectedServiceId}
        />
      </div>
    );
  }
}

export default ListadoServiciosIntegracion;