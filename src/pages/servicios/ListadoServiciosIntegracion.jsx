import React, { useState, useEffect } from "react";
import { BiEdit, BiTrash } from 'react-icons/bi';
import { BsFillEyeFill } from 'react-icons/bs';
import Swal from 'sweetalert2';
import { CgArrowsExchangeV } from 'react-icons/cg';
import { Table, TableHead, TableRow, TableCell, TableBody, Input, Button, CircularProgress, Modal, Typography, Card, CardContent } from '@material-ui/core';
import { AiOutlineCopy } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function ListadoServiciosIntegracion() {
  const [datos, setDatos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [totalFilas, setTotalFilas] = useState(0);
  const [get, setGet] = useState(0);
  const [post, setPost] = useState(0);
  const [soap, setSoap] = useState(0);
  const [rest, setRest] = useState(0);
  const [datosOrdenados, setDatosOrdenados] = useState([]);
  const [ordenAscendente, setOrdenAscendente] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = () => {
    setIsLoading(true);
    fetch("https://o5t896hzxk.execute-api.us-east-1.amazonaws.com/Prod/servicio-buscar-todos")
      .then(response => response.json())
      .then(data => {
        const datosOrdenadosPorNumerador = [...data.registros];
        datosOrdenadosPorNumerador.sort((a, b) => parseInt(a.numerador) - parseInt(b.numerador));
        setDatos(data.registros);
        setDatosOrdenados(datosOrdenadosPorNumerador);
        setTotalFilas(data.registros.length);

        const postObjects = data.registros.filter(obj => obj.metodo_http === "POST");
        const countPostObjects = postObjects.length;
        setPost(countPostObjects);

        const getObjects = data.registros.filter(obj => obj.metodo_http === "GET");
        const countGetObjects = getObjects.length;
        setGet(countGetObjects);

        const soapObjects = data.registros.filter(obj => obj.tipo_protocolo === "SOAP");
        const countSoapObjects = soapObjects.length;
        setSoap(countSoapObjects);

        const restObjects = data.registros.filter(obj => obj.tipo_protocolo === "REST");
        const countRestObjects = restObjects.length;
        setRest(countRestObjects);

        setIsLoading(false);

      })
      .catch(error => console.log('Error:', error));
  }

  const ordenarPorNumerador = () => {
    const datosOrdenadosPorNumerador = [...datosOrdenados];
    datosOrdenadosPorNumerador.sort((a, b) => {
      const orden = ordenAscendente ? 1 : -1;
      return orden * (parseInt(a.numerador) - parseInt(b.numerador));
    });
    setDatosOrdenados(datosOrdenadosPorNumerador);
    setOrdenAscendente(!ordenAscendente);
  };

  const filtrarDatos = (dato) => {
    const filtroLowerCase = filtro.toLowerCase();
    return (
      dato.nombre.toLowerCase().includes(filtroLowerCase) ||
      dato.numerador.toLowerCase().includes(filtroLowerCase) ||
      dato.metodo_http.toLowerCase().includes(filtroLowerCase)
    );
  };


  const eliminar = (idServicio) => {
    // Mostrar el swal de confirmación
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el servicio seleccionado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si se confirma la eliminación, enviar la solicitud DELETE
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          "id_servicio": idServicio
        });

        var requestOptions = {
          method: 'DELETE',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("https://o5t896hzxk.execute-api.us-east-1.amazonaws.com/Prod/servicio", requestOptions)
          .then(response => response.text())
          .then(result => {
            // console.log(result);
            // Vuelve a cargar los datos después de eliminar
            fetchData();
          })
          .catch(error => console.log('error', error));

        // Mostrar un swal de éxito después de eliminar
        Swal.fire(
          '¡Eliminado!',
          'El servicio ha sido eliminado exitosamente.',
          'success'
        );
      }
    });
  };

  const copiarURL = (url) => {
    navigator.clipboard.writeText(url);
  };
  return (
    <div>
      <Typography variant="h5" arrow>Listado de Servicios</Typography>
      <TableRow>
        <TableCell>
          <Typography variant="h5">Total de servicios({totalFilas})</Typography>
        </TableCell>
      </TableRow>
      <Input type="text" variant="outlined" className="mb-3" placeholder="Filtrar por numerador" value={filtro} onChange={(e) => setFiltro(e.target.value)} />
      {isLoading ? (
        <>
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
                    <span className="placeholder col-3 mt-5"></span>
                    <span className="placeholder col-3 mt-5"></span>
                    <span className="placeholder col-3 mt-5"></span>
                    <span className="placeholder col-1 mt-5"></span>
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>
        </>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={ordenarPorNumerador} className="order-icon">
                Numerador
                <CgArrowsExchangeV />
              </TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>url_servicio_prd</TableCell>
              <TableCell>url_backend_prd</TableCell>
              <TableCell>Fecha de Creación</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datosOrdenados.filter(filtrarDatos).map((servicio) => (
              <React.Fragment key={servicio.id_servicio}>               
                <TableRow key={servicio.id_servicio}>
                  <TableCell>{servicio.numerador}</TableCell>
                  <TableCell>
                    <div>{servicio.nombre.substring(0, 30)}...</div>
                    <Typography variant="subtitle2" color="textSecondary">
                      /{servicio.tipo_protocolo}-{servicio.metodo_http}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target={`#staticBackdrop-${servicio.id_servicio}`}>
                      {servicio.url_servicio_prd.substring(0, 30)}...
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target={`#staticBackdrop2-${servicio.id_servicio}`}>
                      {servicio.url_backend_prd.substring(0, 30)}...
                    </Button>
                  </TableCell>
                  <TableCell>{servicio.fecha_creacion}</TableCell>
                  <TableCell>
                    <Link to={`/servicio-editar/${servicio.id_servicio}`} className="btn">
                      <BiEdit />
                    </Link>
                    <Link to={`/servicio-ver/${servicio.id_servicio}`} className="btn">
                      <BsFillEyeFill />
                    </Link>
                    <Button className="btn" onClick={() => eliminar(servicio.id_servicio)}>
                      <BiTrash />
                    </Button>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
export default ListadoServiciosIntegracion;