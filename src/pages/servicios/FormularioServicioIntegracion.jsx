import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function FormularioServicioIntegracion(props) {
  const { usuario_jwt } = useAuth();

  const [formulario, setFormulario] = useState({
    tipo_autenticacion: '',
    ambiente: '',
    canal_exposicion: '',
    url_backend_dev: '',
    max_size_payload: '',
    genera_alarma_por_incumplimiento_politica: '',
    url_servicio_qa: '',
    tipo_protocolo: '',
    timeout: '',
    tps_estimadas: '',
    id_servicio: '',
    habilita_cors: '',
    url_servicio_prd: '',
    restringir_contenttype: '',
    descripcion: '',
    valida_ip_consumidor: '',
    guarda_log_request_response: '',
    metodo_http: '',
    categoria_servicio: '',
    nombre: '',
    max_peticiones_diarias: '',
    url_servicio_dev: '',
    promedio_uso_mensual: '',
    fecha_creacion: '',
    autor_id: usuario_jwt().username,
    validacion_jwt: '',
    fecha_actualizacion: '',
    numerador: '',
    criticidad_servicio: '',
    url_backend_prd: '',
    url_backend_qa: '',
    pregunta: '',
    respuesta: ''
  });

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
    var requestOptions = {
      method: 'POST',
      body: JSON.stringify(formulario),
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const response = await fetch("https://o5t896hzxk.execute-api.us-east-1.amazonaws.com/Prod/servicio", requestOptions);
      if (response.ok) {
        // console.log(await response.text());
        // Navegar a la página deseada después de enviar el formulario
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
    // console.log(formulario);
  };

  return (
    <div className="card mt-3 rounded shadow">
      <div className="card-body">
        <form noValidate onSubmit={handleSubmit}>
          <div className="row">
            {/* NOMBRE */}
            <div className="col-md-10">
              <label htmlFor="nombre" className="form-label">
                Nombre del Servicio
                <span className="text-danger fw-bold fs-5">*</span>
              </label>
              <input type="text" className="form-control" id="nombre" name="nombre" value={formulario.nombre} onChange={handleChange} required />
              <div className="invalid-feedback">Debe ingresar un valor</div>
              <div className="form-text">
                Debe ser un valor único, no se puede repetir.
              </div>
            </div>
            {/* AUTOR_ID */}
            <div className="col-md-2">
              <label htmlFor="autor_id" className="form-label">
                Autor Id<span className="text-danger fw-bold fs-5">*</span>
              </label>
              <input type="text" className="form-control" id="autor_id" value={formulario.autor_id} name="autor_id" required />
              <div className="invalid-feedback">Debe ingresar un valor</div>
            </div>
          </div>

          {/* NUMERADOR */}
          <div className="col-md-5">
            <label htmlFor="numerador_servicio" className="form-label">Numerador del servicio</label>
            <input type="text" className="form-control" id="numerador" name="numerador" value={formulario.numerador} onChange={handleChange} />
            <div className="form-text">Si cambia el número del nombre del servico, este campo tambien cambia</div>
          </div>
          {/* DESCRIPCION */}
          <div className="col-md-12">
            <label htmlFor="descripcion" className="form-label">
              Descripcion
            </label>
            <textarea className="form-control" rows="3" id="descripcion" name="descripcion" value={formulario.descripcion} onChange={handleChange}></textarea>
            <div className="invalid-feedback">Debe ingresar un valor</div>
          </div>
          <div className="row">
            {/* TPS_ESTIMADAS */}
            <div className="col-md-4">
              <label className="form-label">Tps Estimadas</label>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  name="tps_estimadas"
                  id="tps_estimadas"
                  type="number"
                  maxLength="3"
                  min="0"
                  max="10"
                  step="1"
                  value={formulario.tps_estimadas} onChange={handleChange}
                />
                <span className="input-group-text">TPS</span>
              </div>
            </div>
            {/* PROMEDIO_USO_MENSUAL */}
            <div className="col-md-4">
              <label className="form-label">Promedio Uso Mensual</label>
              <div className="input-group mb-3">
                <input className="form-control" value={formulario.promedio_uso_mensual} onChange={handleChange} name="promedio_uso_mensual" id="promedio_uso_mensual" type="number" maxLength="3" min="0" max="10000000" step="1" />
                <span className="input-group-text">Peticiones</span>
              </div>
            </div>
          </div>
          <div className="row">
            {/* METODO_HTTP */}
            <div className="col-md-3">
              <label className="form-label">
                Metodo Http<span className="text-danger fw-bold fs-5">*</span>
              </label>
              {["GET", "POST", "PUT", "DELETE", "OTRO"].map((value) => (
                <div className="form-check" key={value}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="metodo_http"
                    id={`metodo_http_${value}`}
                    value={value}
                    checked={formulario.metodo_http === value}
                    onChange={handleChange}
                  />
                  <label htmlFor={`metodo_http_${value}`} className="form-check-label">
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </label>
                </div>
              ))}
            </div>

            {/* TIPO_PROTOCOLO */}
            <div className="col-md-3">
              <label className="form-label">
                Tipo Protocolo<span className="text-danger fw-bold fs-5">*</span>
              </label>
              {["REST", "SOAP"].map((value) => (
                <div className="form-check" key={value}>
                  <input className="form-check-input" value={value}
                    checked={formulario.tipo_protocolo === value}
                    onChange={handleChange} type="radio" name="tipo_protocolo" id={`tipo_protocolo_${value}`} />
                  <label htmlFor={`tipo_protocolo_${value}`} className="form-check-label">
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </label>
                </div>
              ))}
            </div>
            {/* CATEGORIA_SERVICIO */}
            <div className="col-md-3">
              <label className="form-label">Categoria Servicio</label>
              {["consulta_informacion", "transaccional"].map((value) => (
                <div className="form-check" key={value}>
                  <input className="form-check-input" value={value}
                    checked={formulario.categoria_servicio === value}
                    onChange={handleChange} type="radio" name="categoria_servicio" id={`categoria_servicio_${value}`} />
                  <label htmlFor={`categoria_servicio_${value}`} className="form-check-label">
                    {value.replace("_", " ").toUpperCase()}
                  </label>
                </div>
              ))}
            </div>
            {/* AMBIENTE */}
            <div className="col-md-3">
              <label className="form-label">Desplegado en Ambiente</label>
              {[
                { value: "qa", label: "Solo QA" },
                { value: "qa+prd", label: "QA y PRD" },
                { value: "prd", label: "Solo PRD" }
              ].map(({ value, label }) => (
                <div className="form-check" key={value}>
                  <input className="form-check-input" value={value}
                    checked={formulario.ambiente === value}
                    onChange={handleChange} type="radio" name="ambiente" id={`ambiente_${value}`} />
                  <label htmlFor={`ambiente_${value}`} className="form-check-label">
                    {label}
                  </label>
                </div>
              ))}
              <span className="form-text">Indicar donde ya está desplegado.</span>
            </div>
          </div>
          <div className="row">
            {/* TIPO_AUTENTICACION */}
            <div className="col-md-3">
              <label className="form-label">
                Tipo Autenticacion
                <span className="text-danger fw-bold fs-5">*</span>
              </label>
              {[
                { value: "basic", label: "Basic" },
                { value: "jwt", label: "Jwt" },
                { value: "oauth2", label: "Oauth2" },
                { value: "api-key", label: "Api-Key" },
                { value: "credencial", label: "Credencial" },
                { value: "ssl", label: "Mediante Certificado SSL" },
                { value: "filtro_ip", label: "Filtro Ip" },
                { value: "no_autenticacion", label: "Sin Autenticacion" }
              ].map(({ value, label }) => (
                <div className="form-check" key={value}>
                  <input className="form-check-input" value={value}
                    checked={formulario.tipo_autenticacion === value}
                    onChange={handleChange} type="radio" name="tipo_autenticacion" id={`tipo_autenticacion_${value}`} required={value === "basic"}
                  />
                  <label htmlFor={`tipo_autenticacion_${value}`} className="form-check-label">
                    {label}
                  </label>
                </div>
              ))}
            </div>
            {/* CANAL_EXPOSICION */}
            <div className="col-md-3">
              <label className="form-label">
                Canal Exposicion<span className="text-danger fw-bold fs-5">*</span>
              </label>
              {[
                { value: "http", label: "Http" },
                { value: "https", label: "Https" },
                { value: "https+ssl", label: "Https+Ssl" }
              ].map(({ value, label }) => (
                <div className="form-check" key={value}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="canal_exposicion"
                    id={`canal_exposicion_${value}`}
                    required={value === "http"}
                    value={value}
                    checked={formulario.canal_exposicion === value}
                    onChange={handleChange}
                  />
                  <label htmlFor={`canal_exposicion_${value}`} className="form-check-label">
                    {label}
                  </label>
                </div>
              ))}
              <div className="form-text">¿Por cuál canal se expondrá el servicio? (80, 8080, 443, 8443)</div>
            </div>
            {/* CRITICIDAD_SERVICIO */}
            <div className="col-md-3">
              <label className="form-label">Cantidad Personas Afectadas en 1 minuto</label>
              {[
                { value: "100", label: "100" },
                { value: "500", label: "500" },
                { value: "1000", label: "1000" },
                { value: "9999", label: "+9999" }
              ].map(({ value, label }) => (
                <div className="form-check" key={value}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="criticidad_servicio"
                    id={`criticidad_servicio_${value}`}
                    value={formulario.criticidad_servicio}
                    onChange={handleChange}
                  />
                  <label htmlFor={`criticidad_servicio_${value}`} className="form-check-label">
                    {label}
                  </label>
                </div>
              ))}
              <div className="form-text">
                Determinar la criticidad del servicio en base a la cantidad de personas que pueden verse afectadas en un minuto.
              </div>
            </div>
            <hr className="my-4" />
          </div>

          <div className="row">
            {/* TIMEOUT */}
            <div className="col-md-4">
              <label className="form-label">Timeout</label>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  name="timeout"
                  id="timeout"
                  type="number"
                  maxLength="3"
                  min="0"
                  max="30"
                  step="1"
                  value={formulario.timeout}
                  onChange={handleChange}
                />
                <span className="input-group-text">segundos</span>
              </div>
              <div className="form-text">
                Tiempo que se espera al backend para responder.
              </div>
            </div>
            {/* MAX_SIZE_PAYLOAD */}
            <div className="col-md-4">
              <label className="form-label">Peso Máximo del Request</label>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  name="max_size_payload"
                  id="max_size_payload"
                  type="number"
                  maxLength="3"
                  min="0"
                  max="900"
                  step="1"
                  value={formulario.max_size_payload}
                  onChange={handleChange}
                />
                <span className="input-group-text">KB</span>
              </div>
              <div className="form-text">
                Tamaño máximo del request que se puede enviar al backend.
              </div>
            </div>
            {/* MAX_PETICIONES_DIARIAS */}
            <div className="col-md-4">
              <label className="form-label">Max Peticiones Diarias</label>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  name="max_peticiones_diarias"
                  id="max_peticiones_diarias"
                  type="number"
                  maxLength="3"
                  min="0"
                  max="2000000"
                  step="1"
                  value={formulario.max_peticiones_diarias}
                  onChange={handleChange}
                />
                <span className="input-group-text">Peticiones</span>
              </div>
              <div className="form-text">
                Dejar en 0 para que no se limite la cantidad de peticiones.
              </div>
            </div>
            <hr className="my-4" />
          </div>
          <div className="row">
            {/* URL_BACKEND_PRD */}
            <div className="col-md-6">
              <label htmlFor="url_backend_prd" className="form-label">
                Url Backend Prd
              </label>
              <input
                type="text"
                className="form-control"
                id="url_backend_prd"
                name="url_backend_prd"
                value={formulario.url_backend_prd}
                onChange={handleChange}
              />
              <div className="invalid-feedback">Debe ingresar un valor</div>
            </div>
            {/* URL_SERVICIO_PRD */}
            <div className="col-md-6">
              <label htmlFor="url_servicio_prd" className="form-label">
                Url Servicio Prd
              </label>
              <input
                type="text"
                className="form-control"
                id="url_servicio_prd"
                name="url_servicio_prd"
                value={formulario.url_servicio_prd}
                onChange={handleChange}
              />
              <div className="invalid-feedback">Debe ingresar un valor</div>
            </div>
          </div>
          <div className="row">
            {/* URL_BACKEND_QA */}
            <div className="col-md-6">
              <label htmlFor="url_backend_qa" className="form-label">
                Url Backend Qa
              </label>
              <input
                type="text"
                className="form-control"
                id="url_backend_qa"
                name="url_backend_qa"
                value={formulario.url_backend_qa}
                onChange={handleChange}
              />
              <div className="invalid-feedback">Debe ingresar un valor</div>
            </div>
            {/* URL_SERVICIO_QA */}
            <div className="col-md-6">
              <label htmlFor="url_servicio_qa" className="form-label">
                Url Servicio Qa
              </label>
              <input
                type="text"
                className="form-control"
                id="url_servicio_qa"
                name="url_servicio_qa"
                value={formulario.url_servicio_qa}
                onChange={handleChange}
              />
              <div className="invalid-feedback">Debe ingresar un valor</div>
            </div>
          </div>
          <div className="row">
            {/* URL_BACKEND_DEV */}
            <div className="col-md-6">
              <label htmlFor="url_backend_dev" className="form-label">
                Url Backend Dev
              </label>
              <input
                type="text"
                className="form-control"
                id="url_backend_dev"
                name="url_backend_dev"
                value={formulario.url_backend_dev}
                onChange={handleChange}
              />
              <div className="invalid-feedback">Debe ingresar un valor</div>
            </div>
            {/* URL_SERVICIO_DEV */}
            <div className="col-md-6">
              <label htmlFor="url_servicio_dev" className="form-label">
                Url Servicio Dev
              </label>
              <input
                type="text"
                className="form-control"
                id="url_servicio_dev"
                name="url_servicio_dev"
                value={formulario.url_servicio_dev}
                onChange={handleChange}
              />
              <div className="invalid-feedback">Debe ingresar un valor</div>
            </div>
            <div className="row">
              {/* REQUEST */}
              <div className="col-md-6">
                <label htmlFor="pregunta" className="form-label">
                  Request
                </label>
                <textarea className="form-control" rows="3" id="pregunta" name="pregunta" value={formulario.pregunta} onChange={handleChange}></textarea>
                <div className="invalid-feedback">Debe ingresar un valor</div>
              </div>
              {/* RESPONSE */}
              <div className="col-md-6">
                <label htmlFor="respuesta" className="form-label">
                  Response
                </label>
                <textarea className="form-control" rows="3" id="respuesta" name="respuesta" value={formulario.respuesta} onChange={handleChange}></textarea>
                <div className="invalid-feedback">Debe ingresar un valor</div>
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <div className="row mt-5">
            {/* VALIDA_IP_CONSUMIDOR */}
            <div className="col-md-3">
              <label className="form-label">Valida Ip Consumidor</label>
              {["si", "no"].map((value) => (
                <div className="form-check" key={value}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="valida_ip_consumidor"
                    id={`valida_ip_consumidor_${value}`}
                    value={value}
                    checked={formulario.valida_ip_consumidor === value}
                    onChange={handleChange}
                  />
                  <label htmlFor={`valida_ip_consumidor_${value}`} className="form-check-label">
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </label>
                </div>
              ))}
              <div className="form-text">
                ¿El servicio valida la IP del consumidor para responder?
              </div>
            </div>
            {/* RESTRINGIR_CONTENTTYPE */}
            <div className="col-md-3">
              <label className="form-label">Restringir Content-Type</label>
              {["si", "no"].map((value) => (
                <div className="form-check" key={value}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="restringir_contenttype"
                    id={`restringir_contenttype_${value}`}
                    value={value}
                    checked={formulario.restringir_contenttype === value}
                    onChange={handleChange}
                  />
                  <label htmlFor={`restringir_contenttype_${value}`} className="form-check-label">
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </label>
                </div>
              ))}
              <div className="form-text">
                ¿El servicio valida el Content-Type?
              </div>
            </div>
            {/* HABILITA_CORS */}
            <div className="col-md-3">
              <label className="form-label">Habilita Cors</label>
              {["si", "no"].map((value) => (
                <div className="form-check" key={value}>
                  <input className="form-check-input" type="radio" name="habilita_cors" id={`habilita_cors_${value}`} checked={formulario.habilita_cors === value}
                    onChange={handleChange} value={value} />
                  <label htmlFor={`habilita_cors_${value}`} className="form-check-label">
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </label>
                </div>
              ))}
              <div className="form-text">
                ¿Permitir al servicio interactuar con otros dominios?
              </div>
            </div>
            {/* VALIDACIÓN_JWT */}
            <div className="col-md-3">
              <label className="form-label">Validación Jwt</label>
              {["si", "no"].map((value) => (
                <div className="form-check" key={value}>
                  <input className="form-check-input" type="radio" name="validacion_jwt" id={`validacion_jwt${value}`} checked={formulario.validacion_jwt === value}
                    onChange={handleChange} value={value} />
                  <label htmlFor={`habilita_cors_${value}`} className="form-check-label">
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </label>
                </div>
              ))}
              <div className="form-text">
                ¿El servicio valida el token jwt (presencia y vigencia)?
              </div>
            </div>
          </div>
          <div className="row">
            {/* GUARDA_LOG_REQUEST_RESPONSE */}
            <div className="col-md-3">
              <label className="form-label">Guarda Log Request Response</label>
              {["si", "no"].map((value) => (
                <div className="form-check" key={value}>
                  <input className="form-check-input" type="radio" checked={formulario.guarda_log_request_response === value}
                    onChange={handleChange} name="guarda_log_request_response" id={`guarda_log_request_response_${value}`} value={value} />
                  <label htmlFor={`guarda_log_request_response_${value}`} className="form-check-label">
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </label>
                </div>
              ))}
              <div className="form-text">
                ¿El servicio almacena el request y response?
              </div>
            </div>
            {/* GENERA_ALARMA_POR_INCUMPLIMIENTO_POLITICA */}
            <div className="col-md-3">
              <label className="form-label">Genera Alarma Por Incumplimiento Politica</label>
              {["si", "no"].map((value) => (
                <div className="form-check" key={value}>
                  <input className="form-check-input" type="radio" checked={formulario.genera_alarma_por_incumplimiento_politica === value}
                    onChange={handleChange} name="genera_alarma_por_incumplimiento_politica" id={`genera_alarma_por_incumplimiento_politica_${value}`} value={value} />
                  <label htmlFor={`genera_alarma_por_incumplimiento_politica_${value}`} className="form-check-label">
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </label>
                </div>
              ))}
              <div className="form-text">
                En caso de incumplir la política de seguridad, ¿la plataforma notifica al equipo de monitoreo?
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary">Enviar</button>
            <Link to={"/"} class="btn btn-secondary">Cancelar</Link>
          </div>
        </form>
        <hr />
      </div>
    </div>
  );
}

export default FormularioServicioIntegracion;