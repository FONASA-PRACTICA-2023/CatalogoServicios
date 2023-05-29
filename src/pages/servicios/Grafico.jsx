import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function FormularioServicioIntegracion() {
  const { nombre } = useParams();
  const [formularioDeshabilitado, setFormularioDeshabilitado] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const getData = () => {
    setIsLoading(true);
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`https://o5t896hzxk.execute-api.us-east-1.amazonaws.com/Prod/servicio/Sondacertificadoprevisional`, requestOptions)
      .then(response => response.json())
      .then(result => setFormulario(result.registros))
      .catch(error => console.log('error', error))
      .finally(() => setIsLoading(false));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    var requestOptions = {
      method: 'PUT',
      body: JSON.stringify(formulario),
      headers: {
        'Content-Type': 'application/json' // Ajustar el encabezado Content-Type para enviar datos JSON
      }
    };

    try {
      const response = await fetch(`https://o5t896hzxk.execute-api.us-east-1.amazonaws.com/Prod/servicio/Sondacertificadoprevisional`, requestOptions);
      if (response.ok) {
        // console.log(await response.text());
        navigate('/');
      } else {
        throw new Error('Hubo un error al enviar el formulario.');
      }
    } catch (error) {
      console.log('error', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      });
    }
  };

  useEffect(() => {
    getData();

    if (window.location.pathname === `/servicio-ver/${nombre}`) {
      setFormularioDeshabilitado(true);
    }
  }, [nombre]);

  return (
    <div className="card mt-3" aria-hidden="true">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-10">
              <label htmlFor="nombre" className="form-label">
                Nombre del Servicio
                <span className="text-danger fw-bold fs-5">*</span>
              </label>
              <div className={`input-placeholder ${isLoading ? 'placeholder-glow' : ''}`}>
                <input
                  type="text"
                  disabled={formularioDeshabilitado || isLoading}
                  className="form-control"
                  id="nombre"
                  name="nombre"
                  value={formulario.nombre || ""}
                  onChange={handleChange}
                  required
                />
                {isLoading && <div className="placeholder col-12 mt-2"></div>}
              </div>
              <div className="invalid-feedback">Debe ingresar un valor</div>
              <div className="form-text">
                Debe ser un valor único, no se puede repetir.
              </div>
            </div>
          </div>

          <button disabled={formularioDeshabilitado} type="submit" className="btn btn-primary">Actualizar</button>
          <Link to={"/"} className="btn btn-secondary">Cancelar</Link>
        </form>
      </div>
    </div>
  );
}

export default FormularioServicioIntegracion;
