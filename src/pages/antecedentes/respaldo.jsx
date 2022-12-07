import { useState, useEffect } from "react";
import Cargando from "../../components/Cargando";
import MensajeError from "../../components/MensajeError";
import MensajeExito from "../../components/MensajeExito";
import { useParams, useNavigate } from "react-router-dom";
import useApiSnoopy from "../../hooks/useApiSnoopy";

import Modal from "react-bootstrap/Modal";

import {
  optionsGlasgow,
  optionsSubTipoCama,
  optionsTipoCama,
} from "../CrearForm.colecciones";
import { useAuth } from "../../hooks/useAuth";

function FormularioAntecedenteClinico(props) {
  const navigate = useNavigate();
  let params = useParams();
  let apiSnoopy = useApiSnoopy();
  let { usuario_jwt } = useAuth();
  const [mensaje, setMensaje] = useState(null);

  const [estoyEditando, setEstoyEditando] = useState(false);

  const [cssFormulario, setCssFormulario] = useState(
    "row g-3 needs-validation"
  );

  const [noEditable, setNoEditable] = useState(false);

  const dataInicial = {
    pk_registro: "",
    id_caso: "",
    fecha_ingreso: "",
    v1_sexo: "",
    v2_antecedentes_cardiacos: "",
    v3_antecedentes_diabeticos: "",
    v4_antecedentes_de_hipertensio: "",
    v6_triage: null,
    v7_presion_arterial_sisto_alta: null,
    v8_presion_arterial_diast_baja: null,
    v9_presion_arterial_media: null,
    v10_temperatura: null,
    v11_saturacion_oxigeno: null,
    v12_frecuencia_cardiaca: null,
    v13_frecuencia_respiratoria: null,
    v14_edad_anos: "",
    v17_tipo_cama_ingreso: "",
    v18_tipo_paciente: "",
    v19_glasgow: null,
    v20_fio2: null,
    v21_grave_fio2: "",
    v22_dias_estabilizacion: null,
    v23_dias_posestabilizacion: null,
    v24_ventilacion_mecanica: "",
    v25_cirugia_realizada: "",
    v26_cirugia_mismo_dia_ingreso: "",
    v27_hemodinamia_realizada: "",
    v28_hemodina_mismo_dia_ingreso: "",
    v29_endoscopia: "",
    v30_endoscop_mismo_dia_ingreso: "",
    v31_dialisis: "",
    v35_trombolisis: "",
    v36_tromboli_mismo_dia_ingreso: "",
    v40_pcr: "",
    v41_hemoglobina: null,
    v42_creatinina: null,
    v43_nitrogeno_ureico: null,
    v44_sodio: null,
    v45_potasio: null,
    v46_rut_prestador: null,
    v47_dreo: null,
    v48_troponinas: null,
    v49_ecg_alterado: null,
    v50_rnm_protocolo_stroke: "",
    v51_dva: null,
    v52_transfusiones: null,
    v53_compromiso_conciencia: "",
    v57_no_pertinencia: "PEND",
    version_ml_prediccion: "-1",
    out_error_ws: "-1",
    no_pertinencia_segun_control: "PEND",
    digitado_por_control: "NO",
    usuario_insert: usuario_jwt().run,
    usuario_ultimo_update: usuario_jwt().run,
    fecha_insert: "",
    fecha_ultimo_update: "",
    motivo_modificacion: "",
  };

  const [valoresFormulario, setValoresFormulario] = useState(dataInicial);

  const [formularioDesahabilitado, setFormularioDesahabilitado] = useState(
    props.desahabilitado
  );

  const [motivoConfirmacion, setMotivoConfirmacion] = useState(null);

  const eliminarRegistro = async () => {
    if (motivoConfirmacion == null || motivoConfirmacion === "") {
      setMensaje({
        tipo: "error",
        mensaje: "Debe ingresar un motivo de eliminación",
      });
      return;
    } else {
      await apiSnoopy.eliminarAntecedenteClinico(
        params.id,
        motivoConfirmacion,
        usuario_jwt().run
      );

      cerrarPopUp();
      navigate("/registros");
    }
  };

  const [mostrarPopUpConfirmacionEdicion, setMostrarPopUpConfirmacionEdicion] =
    useState(false);

  const [mostrarPopUpConfirmacion, setMostrarPopUpConfirmacion] =
    useState(false);

  const cerrarPopUp = () => {
    setMostrarPopUpConfirmacion(false);
    setMostrarPopUpConfirmacionEdicion(false);
    setMensaje(null);
    setMotivoConfirmacion(null);
    console.log("cerrarPopUp, ir a casos");
  };

  const inicializarFormulario = async () => {
    if (params.id) {
      console.log("params", params);
      await apiSnoopy.getUnVectorByID(params.id, setValoresFormulario);
      setNoEditable(true);
      setEstoyEditando(true);
    } else {
      setValoresFormulario(dataInicial);
      const newValoresFormulario = { ...valoresFormulario };
      newValoresFormulario.v46_rut_prestador = usuario_jwt().rut_prestador;
      setValoresFormulario(newValoresFormulario);
      setEstoyEditando(false);
    }
  };

  useEffect(() => {
    inicializarFormulario();
    apiSnoopy.getPrestadores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const gestionarCambioValor = async (evt) => {
    const { target } = evt;
    const { name, value } = target;
    const newValoresFormulario = { ...valoresFormulario, [name]: value };
    setValoresFormulario(newValoresFormulario);
  };

  const gestionarEnvioFormulario = async (evt) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    console.log("gestionarEnvioFormulario");

    if (form.checkValidity() === false) {
      evt.stopPropagation();
      setCssFormulario("was-validated needs-validation row g-3 ");
      setMensaje({
        mensaje: "Debe revisar el formulario",
        tipo: "error",
      });
    } else {
      setMensaje(null);
      console.log("valoresFormulario", valoresFormulario);
      const newValoresFormulario = {
        ...valoresFormulario,
        usuario_ultimo_update: usuario_jwt().run,
      };
      setValoresFormulario(newValoresFormulario);

      try {
        if (estoyEditando) {
          setMostrarPopUpConfirmacionEdicion(true);
        } else {
          await apiSnoopy.crearRegistro(
            valoresFormulario,
            finalizar_formulario,
            recibirError
          );
        }
      } catch (error) {
        console.log("error", apiSnoopy.error);
      }
    }
  };

  const confirmarModificacion = async () => {
    await apiSnoopy.crearRegistro(
      valoresFormulario,
      finalizar_formulario,
      recibirError
    );
  };

  const finalizar_formulario = () => {
    console.log("finalizar_formulario");
    setFormularioDesahabilitado(true);
    setCssFormulario("needs-validation row g-3 ");
    navigate("/registros");
    setValoresFormulario(dataInicial);
  };

  const recibirError = (error) => {
    console.log("error", error.response.data.mensaje);
    setMensaje({
      mensaje: error.response.data.mensaje,
      tipo: "error",
    });
  };

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-12 mb-3">
          <h1>Ingresar Antecedentes Clínicos</h1>
          {apiSnoopy.loading && <Cargando />}
          {apiSnoopy.error && <MensajeError mensaje={apiSnoopy.error} />}
          {apiSnoopy.data && <MensajeExito mensaje={apiSnoopy.data.mensaje} />}
          <form
            noValidate
            className={cssFormulario}
            onSubmit={gestionarEnvioFormulario}
          >
            {/* 26/09/2022 10:45:35 */}

            {/* ID_CASO */}
            <div className="col-md-4">
              <label htmlFor="id_caso" className="form-label">
                Folio Caso
                <span className="text-danger fw-bold fs-5">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="id_caso"
                name="id_caso"
                disabled={noEditable}
                value={valoresFormulario.id_caso}
                onChange={gestionarCambioValor}
                required
              />
              <div className="invalid-feedback">Debe ingresar un valor</div>
            </div>

            {/*  */}
            <div className="col-md-4"></div>
            {/* USUARIO_INSERT */}
            <div className="col-md-4">
              <label htmlFor="usuario_insert" className="form-label">
                Usuario que Ingresa el registro
              </label>
              <input
                type="text"
                className="form-control"
                id="usuario_insert"
                name="usuario_insert"
                disabled={true}
                value={valoresFormulario.usuario_insert}
                onChange={gestionarCambioValor}
              />
              <div className="invalid-feedback">Debe ingresar un valor</div>
            </div>

            {/* V1_SEXO */}
            <div className="col-md-2">
              <label className="form-label">
                Sexo<span className="text-danger fw-bold fs-5">*</span>
              </label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v1_sexo"
                  id="v1_sexo_desconocido"
                  required
                  onChange={gestionarCambioValor}
                  value="DESCONOCIDO"
                  checked={valoresFormulario.v1_sexo === "DESCONOCIDO"}
                />
                <label
                  htmlFor="v1_sexo_desconocido"
                  className="form-check-label"
                >
                  Desconocido
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v1_sexo"
                  id="v1_sexo_hombre"
                  onChange={gestionarCambioValor}
                  value="HOMBRE"
                  checked={valoresFormulario.v1_sexo === "HOMBRE"}
                />
                <label htmlFor="v1_sexo_hombre" className="form-check-label">
                  Hombre
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v1_sexo"
                  id="v1_sexo_mujer"
                  onChange={gestionarCambioValor}
                  value="MUJER"
                  checked={valoresFormulario.v1_sexo === "MUJER"}
                />
                <label htmlFor="v1_sexo_mujer" className="form-check-label">
                  Mujer
                </label>
              </div>
            </div>

            {/* V2_ANTECEDENTES_CARDIACOS */}
            <div className="col-md-2">
              <label className="form-label">Antecedentes Cardiacos</label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v2_antecedentes_cardiacos"
                  id="v2_antecedentes_cardiacos_"
                  onChange={gestionarCambioValor}
                  value=""
                  checked={valoresFormulario.v2_antecedentes_cardiacos === ""}
                />
                <label
                  htmlFor="v2_antecedentes_cardiacos_"
                  className="form-check-label"
                >
                  (Sin Valor)
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v2_antecedentes_cardiacos"
                  id="v2_antecedentes_cardiacos_si"
                  onChange={gestionarCambioValor}
                  value="SI"
                  checked={valoresFormulario.v2_antecedentes_cardiacos === "SI"}
                />
                <label
                  htmlFor="v2_antecedentes_cardiacos_si"
                  className="form-check-label"
                >
                  Si
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v2_antecedentes_cardiacos"
                  id="v2_antecedentes_cardiacos_no"
                  onChange={gestionarCambioValor}
                  value="NO"
                  checked={valoresFormulario.v2_antecedentes_cardiacos === "NO"}
                />
                <label
                  htmlFor="v2_antecedentes_cardiacos_no"
                  className="form-check-label"
                >
                  No
                </label>
              </div>
            </div>

            {/* V3_ANTECEDENTES_DIABETICOS */}
            <div className="col-md-2">
              <label className="form-label">Antecedentes Diabeticos</label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v3_antecedentes_diabeticos"
                  id="v3_antecedentes_diabeticos_"
                  onChange={gestionarCambioValor}
                  value=""
                  checked={valoresFormulario.v3_antecedentes_diabeticos === ""}
                />
                <label
                  htmlFor="v3_antecedentes_diabeticos_"
                  className="form-check-label"
                >
                  (Sin Valor)
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v3_antecedentes_diabeticos"
                  id="v3_antecedentes_diabeticos_si"
                  onChange={gestionarCambioValor}
                  value="SI"
                  checked={
                    valoresFormulario.v3_antecedentes_diabeticos === "SI"
                  }
                />
                <label
                  htmlFor="v3_antecedentes_diabeticos_si"
                  className="form-check-label"
                >
                  Si
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v3_antecedentes_diabeticos"
                  id="v3_antecedentes_diabeticos_no"
                  onChange={gestionarCambioValor}
                  value="NO"
                  checked={
                    valoresFormulario.v3_antecedentes_diabeticos === "NO"
                  }
                />
                <label
                  htmlFor="v3_antecedentes_diabeticos_no"
                  className="form-check-label"
                >
                  No
                </label>
              </div>
            </div>

            {/* V4_ANTECEDENTES_DE_HIPERTENSIO */}
            <div className="col-md-2">
              <label className="form-label">Antecedentes De Hipertensio</label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v4_antecedentes_de_hipertensio"
                  id="v4_antecedentes_de_hipertensio_"
                  onChange={gestionarCambioValor}
                  value=""
                  checked={
                    valoresFormulario.v4_antecedentes_de_hipertensio === ""
                  }
                />
                <label
                  htmlFor="v4_antecedentes_de_hipertensio_"
                  className="form-check-label"
                >
                  (Sin Valor)
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v4_antecedentes_de_hipertensio"
                  id="v4_antecedentes_de_hipertensio_si"
                  onChange={gestionarCambioValor}
                  value="SI"
                  checked={
                    valoresFormulario.v4_antecedentes_de_hipertensio === "SI"
                  }
                />
                <label
                  htmlFor="v4_antecedentes_de_hipertensio_si"
                  className="form-check-label"
                >
                  Si
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v4_antecedentes_de_hipertensio"
                  id="v4_antecedentes_de_hipertensio_no"
                  onChange={gestionarCambioValor}
                  value="NO"
                  checked={
                    valoresFormulario.v4_antecedentes_de_hipertensio === "NO"
                  }
                />
                <label
                  htmlFor="v4_antecedentes_de_hipertensio_no"
                  className="form-check-label"
                >
                  No
                </label>
              </div>
            </div>

            {/* V6_TRIAGE */}
            <div className="col-md-2">
              <label className="form-label">
                Triage<span className="text-danger fw-bold fs-5">*</span>
              </label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v6_triage"
                  id="v6_triage_"
                  required
                  onChange={gestionarCambioValor}
                  value=""
                  checked={valoresFormulario.v6_triage === ""}
                />
                <label htmlFor="v6_triage_" className="form-check-label">
                  (Sin Valor)
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v6_triage"
                  id="v6_triage_1"
                  onChange={gestionarCambioValor}
                  value="1"
                  checked={valoresFormulario.v6_triage === "1"}
                />
                <label htmlFor="v6_triage_1" className="form-check-label">
                  1
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v6_triage"
                  id="v6_triage_2"
                  onChange={gestionarCambioValor}
                  value="2"
                  checked={valoresFormulario.v6_triage === "2"}
                />
                <label htmlFor="v6_triage_2" className="form-check-label">
                  2
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v6_triage"
                  id="v6_triage_3"
                  onChange={gestionarCambioValor}
                  value="3"
                  checked={valoresFormulario.v6_triage === "3"}
                />
                <label htmlFor="v6_triage_3" className="form-check-label">
                  3
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v6_triage"
                  id="v6_triage_4"
                  onChange={gestionarCambioValor}
                  value="4"
                  checked={valoresFormulario.v6_triage === "4"}
                />
                <label htmlFor="v6_triage_4" className="form-check-label">
                  4
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v6_triage"
                  id="v6_triage_5"
                  onChange={gestionarCambioValor}
                  value="5"
                  checked={valoresFormulario.v6_triage === "5"}
                />
                <label htmlFor="v6_triage_5" className="form-check-label">
                  5
                </label>
              </div>
            </div>

            {/* V7_PRESION_ARTERIAL_SISTO_ALTA */}
            <div className="col-md-4">
              <label className="form-label">
                Presion Arterial Sisto Alta{" "}
                <span className="text-danger fw-bold fs-5">*</span>
              </label>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  required
                  name="v7_presion_arterial_sisto_alta"
                  id="v7_presion_arterial_sisto_alta"
                  type="number"
                  maxLength="3"
                  min="0"
                  max="300"
                  step="0.01"
                  disabled={formularioDesahabilitado}
                  value={valoresFormulario.v7_presion_arterial_sisto_alta}
                  onChange={gestionarCambioValor}
                />
                <span className="input-group-text">mmHg</span>
                <div className="invalid-feedback">Debe ingresar un valor</div>
              </div>
            </div>

            {/* V8_PRESION_ARTERIAL_DIAST_BAJA */}
            <div className="col-md-4">
              <label className="form-label">
                Presion Arterial Diast Baja{" "}
                <span className="text-danger fw-bold fs-5">*</span>
              </label>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  required
                  name="v8_presion_arterial_diast_baja"
                  id="v8_presion_arterial_diast_baja"
                  type="number"
                  maxLength="3"
                  min="0"
                  max="300"
                  step="0.01"
                  disabled={formularioDesahabilitado}
                  value={valoresFormulario.v8_presion_arterial_diast_baja}
                  onChange={gestionarCambioValor}
                />
                <span className="input-group-text">mmHg</span>
                <div className="invalid-feedback">Debe ingresar un valor</div>
              </div>
            </div>

            {/* V9_PRESION_ARTERIAL_MEDIA */}
            <div className="col-md-4">
              <label className="form-label">
                Presion Arterial Media
                <span className="text-danger fw-bold fs-5">*</span>
              </label>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  required
                  name="v9_presion_arterial_media"
                  id="v9_presion_arterial_media"
                  type="number"
                  maxLength="3"
                  min="0"
                  max="300"
                  step="0.01"
                  disabled={formularioDesahabilitado}
                  value={valoresFormulario.v9_presion_arterial_media}
                  onChange={gestionarCambioValor}
                />
                <span className="input-group-text">mmHg</span>
                <div className="invalid-feedback">Debe ingresar un valor</div>
              </div>
            </div>

            {/* V10_TEMPERATURA */}
            <div className="col-md-4">
              <label className="form-label">
                Temperatura<span className="text-danger fw-bold fs-5">*</span>
              </label>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  required
                  name="v10_temperatura"
                  id="v10_temperatura"
                  type="number"
                  maxLength="3"
                  min="0"
                  max="50"
                  step="0.1"
                  disabled={formularioDesahabilitado}
                  value={valoresFormulario.v10_temperatura}
                  onChange={gestionarCambioValor}
                />
                <span className="input-group-text">ºC</span>
                <div className="invalid-feedback">Debe ingresar un valor</div>
              </div>
            </div>

            {/* V11_SATURACION_OXIGENO */}
            <div className="col-md-4">
              <label className="form-label">
                Saturacion Oxigeno
                <span className="text-danger fw-bold fs-5">*</span>
              </label>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  required
                  name="v11_saturacion_oxigeno"
                  id="v11_saturacion_oxigeno"
                  type="number"
                  maxLength="3"
                  min="0"
                  max="100"
                  step="1"
                  disabled={formularioDesahabilitado}
                  value={valoresFormulario.v11_saturacion_oxigeno}
                  onChange={gestionarCambioValor}
                />
                <span className="input-group-text">%</span>
                <div className="invalid-feedback">Debe ingresar un valor</div>
              </div>
            </div>

            {/* V12_FRECUENCIA_CARDIACA */}
            <div className="col-md-4">
              <label className="form-label">
                Frecuencia Cardiaca
                <span className="text-danger fw-bold fs-5">*</span>
              </label>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  required
                  name="v12_frecuencia_cardiaca"
                  id="v12_frecuencia_cardiaca"
                  type="number"
                  maxLength="3"
                  min="0"
                  max="200"
                  step="1"
                  disabled={formularioDesahabilitado}
                  value={valoresFormulario.v12_frecuencia_cardiaca}
                  onChange={gestionarCambioValor}
                />
                <span className="input-group-text">lat/min</span>
                <div className="invalid-feedback">Debe ingresar un valor</div>
              </div>
            </div>

            {/* V13_FRECUENCIA_RESPIRATORIA */}
            <div className="col-md-4">
              <label className="form-label">
                Frecuencia Respiratoria
                <span className="text-danger fw-bold fs-5">*</span>
              </label>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  required
                  name="v13_frecuencia_respiratoria"
                  id="v13_frecuencia_respiratoria"
                  type="number"
                  maxLength="3"
                  min="0"
                  max="100"
                  step="1"
                  disabled={formularioDesahabilitado}
                  value={valoresFormulario.v13_frecuencia_respiratoria}
                  onChange={gestionarCambioValor}
                />
                <span className="input-group-text">resp/min</span>
                <div className="invalid-feedback">Debe ingresar un valor</div>
              </div>
            </div>

            {/* V14_EDAD_ANOS */}
            <div className="col-md-4">
              <label className="form-label">
                Edad<span className="text-danger fw-bold fs-5">*</span>
              </label>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  name="v14_edad_anos"
                  id="v14_edad_anos"
                  type="number"
                  maxLength="3"
                  min="0"
                  max="150"
                  step="1"
                  required
                  disabled={formularioDesahabilitado}
                  value={valoresFormulario.v14_edad_anos}
                  onChange={gestionarCambioValor}
                />
                <span className="input-group-text">años</span>
                <div className="invalid-feedback">Debe ingresar un valor</div>
              </div>
            </div>

            {/* V17_TIPO_CAMA_INGRESO */}
            <div className="col-md-4">
              <label className="form-label">Tipo Cama Ingreso</label>
              <select
                disabled={formularioDesahabilitado}
                className="form-select"
                name="v17_tipo_cama_ingreso"
                id="v17_tipo_cama_ingreso"
                value={valoresFormulario.v17_tipo_cama_ingreso}
                onChange={gestionarCambioValor}
              >
                <option value="">Seleccionar...</option>
                {optionsTipoCama.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* v18_tipo_paciente */}
            <div className="col-md-4">
              <label className="form-label">Subclasificacion Tipo Cama</label>
              <select
                disabled={formularioDesahabilitado}
                className="form-select"
                name="v18_tipo_paciente"
                id="v18_tipo_paciente"
                value={valoresFormulario.v18_tipo_paciente}
                onChange={gestionarCambioValor}
              >
                <option value="">Seleccionar...</option>
                {optionsSubTipoCama.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* V19_GLASGOW */}
            <div className="col-md-4">
              <label className="form-label">Glasgow</label>
              <select
                disabled={formularioDesahabilitado}
                className="form-select"
                name="v19_glasgow"
                id="v19_glasgow"
                value={valoresFormulario.v19_glasgow}
                onChange={gestionarCambioValor}
              >
                <option value="">Seleccionar...</option>
                {optionsGlasgow.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* V20_FIO2 */}
            <div className="col-md-4">
              <label className="form-label">Fio2</label>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  name="v20_fio2"
                  id="v20_fio2"
                  type="number"
                  maxLength="3"
                  min="0"
                  max="100"
                  step="1"
                  disabled={formularioDesahabilitado}
                  value={valoresFormulario.v20_fio2}
                  onChange={gestionarCambioValor}
                />
                <span className="input-group-text">%</span>
              </div>
            </div>

            {/* V21_GRAVE_FIO2 */}
            <div className="col-md-4">
              <label className="form-label">Grave FIO2</label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v21_grave_fio2"
                  id="v21_grave_fio2_"
                  onChange={gestionarCambioValor}
                  value=""
                  checked={valoresFormulario.v21_grave_fio2 === ""}
                />
                <label htmlFor="v21_grave_fio2_" className="form-check-label">
                  (Sin Valor)
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v21_grave_fio2"
                  id="v21_grave_fio2_si"
                  onChange={gestionarCambioValor}
                  value="SI"
                  checked={valoresFormulario.v21_grave_fio2 === "SI"}
                />
                <label htmlFor="v21_grave_fio2_si" className="form-check-label">
                  Si
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v21_grave_fio2"
                  id="v21_grave_fio2_no"
                  onChange={gestionarCambioValor}
                  value="NO"
                  checked={valoresFormulario.v21_grave_fio2 === "NO"}
                />
                <label htmlFor="v21_grave_fio2_no" className="form-check-label">
                  No
                </label>
              </div>
            </div>

            {/* V22_DIAS_ESTABILIZACION */}
            <div className="col-md-4">
              <label className="form-label">
                Días Estabilizacion{" "}
                <span className="text-danger fw-bold fs-5">*</span>
              </label>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  name="v22_dias_estabilizacion"
                  id="v22_dias_estabilizacion"
                  type="number"
                  maxLength="3"
                  min="0"
                  max="300"
                  step="0.1"
                  required
                  disabled={formularioDesahabilitado}
                  value={valoresFormulario.v22_dias_estabilizacion}
                  onChange={gestionarCambioValor}
                />
                <span className="input-group-text">días</span>
                <div className="invalid-feedback">Debe ingresar un valor</div>
              </div>
            </div>

            {/* V23_DIAS_POSESTABILIZACION */}
            <div className="col-md-4">
              <label className="form-label">
                Días Post Estabilizacion{" "}
                <span className="text-danger fw-bold fs-5">*</span>
              </label>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  name="v23_dias_posestabilizacion"
                  id="v23_dias_posestabilizacion"
                  type="number"
                  maxLength="3"
                  min="0"
                  max="30"
                  step="0.1"
                  required
                  disabled={formularioDesahabilitado}
                  value={valoresFormulario.v23_dias_posestabilizacion}
                  onChange={gestionarCambioValor}
                />
                <span className="input-group-text">días</span>
                <div className="invalid-feedback">Debe ingresar un valor</div>
              </div>
            </div>

            {/* V24_VENTILACION_MECANICA */}
            <div className="col-md-2">
              <label className="form-label">Ventilación Mecanica</label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v24_ventilacion_mecanica"
                  id="v24_ventilacion_mecanica_"
                  onChange={gestionarCambioValor}
                  value=""
                  checked={valoresFormulario.v24_ventilacion_mecanica === ""}
                />
                <label
                  htmlFor="v24_ventilacion_mecanica_"
                  className="form-check-label"
                >
                  (Sin Valor)
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v24_ventilacion_mecanica"
                  id="v24_ventilacion_mecanica_si"
                  onChange={gestionarCambioValor}
                  value="SI"
                  checked={valoresFormulario.v24_ventilacion_mecanica === "SI"}
                />
                <label
                  htmlFor="v24_ventilacion_mecanica_si"
                  className="form-check-label"
                >
                  Si
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v24_ventilacion_mecanica"
                  id="v24_ventilacion_mecanica_no"
                  onChange={gestionarCambioValor}
                  value="NO"
                  checked={valoresFormulario.v24_ventilacion_mecanica === "NO"}
                />
                <label
                  htmlFor="v24_ventilacion_mecanica_no"
                  className="form-check-label"
                >
                  No
                </label>
              </div>
            </div>

            {/* V25_CIRUGIA_REALIZADA */}
            <div className="col-md-2">
              <label className="form-label">Cirugia Realizada</label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v25_cirugia_realizada"
                  id="v25_cirugia_realizada_"
                  onChange={gestionarCambioValor}
                  value=""
                  checked={valoresFormulario.v25_cirugia_realizada === ""}
                />
                <label
                  htmlFor="v25_cirugia_realizada_"
                  className="form-check-label"
                >
                  (Sin Valor)
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v25_cirugia_realizada"
                  id="v25_cirugia_realizada_si"
                  onChange={gestionarCambioValor}
                  value="SI"
                  checked={valoresFormulario.v25_cirugia_realizada === "SI"}
                />
                <label
                  htmlFor="v25_cirugia_realizada_si"
                  className="form-check-label"
                >
                  Si
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v25_cirugia_realizada"
                  id="v25_cirugia_realizada_no"
                  onChange={gestionarCambioValor}
                  value="NO"
                  checked={valoresFormulario.v25_cirugia_realizada === "NO"}
                />
                <label
                  htmlFor="v25_cirugia_realizada_no"
                  className="form-check-label"
                >
                  No
                </label>
              </div>
            </div>

            {/* V26_CIRUGIA_MISMO_DIA_INGRESO */}
            <div className="col-md-2">
              <label className="form-label">Cirugia Mismo Dia Ingreso</label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v26_cirugia_mismo_dia_ingreso"
                  id="v26_cirugia_mismo_dia_ingreso_"
                  onChange={gestionarCambioValor}
                  value=""
                  checked={
                    valoresFormulario.v26_cirugia_mismo_dia_ingreso === ""
                  }
                />
                <label
                  htmlFor="v26_cirugia_mismo_dia_ingreso_"
                  className="form-check-label"
                >
                  (Sin Valor)
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v26_cirugia_mismo_dia_ingreso"
                  id="v26_cirugia_mismo_dia_ingreso_si"
                  onChange={gestionarCambioValor}
                  value="SI"
                  checked={
                    valoresFormulario.v26_cirugia_mismo_dia_ingreso === "SI"
                  }
                />
                <label
                  htmlFor="v26_cirugia_mismo_dia_ingreso_si"
                  className="form-check-label"
                >
                  Si
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v26_cirugia_mismo_dia_ingreso"
                  id="v26_cirugia_mismo_dia_ingreso_no"
                  onChange={gestionarCambioValor}
                  value="NO"
                  checked={
                    valoresFormulario.v26_cirugia_mismo_dia_ingreso === "NO"
                  }
                />
                <label
                  htmlFor="v26_cirugia_mismo_dia_ingreso_no"
                  className="form-check-label"
                >
                  No
                </label>
              </div>
            </div>

            {/* V27_HEMODINAMIA_REALIZADA */}
            <div className="col-md-2">
              <label className="form-label">Hemodinamia Realizada</label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v27_hemodinamia_realizada"
                  id="v27_hemodinamia_realizada_"
                  onChange={gestionarCambioValor}
                  value=""
                  checked={valoresFormulario.v27_hemodinamia_realizada === ""}
                />
                <label
                  htmlFor="v27_hemodinamia_realizada_"
                  className="form-check-label"
                >
                  (Sin Valor)
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v27_hemodinamia_realizada"
                  id="v27_hemodinamia_realizada_si"
                  onChange={gestionarCambioValor}
                  value="SI"
                  checked={valoresFormulario.v27_hemodinamia_realizada === "SI"}
                />
                <label
                  htmlFor="v27_hemodinamia_realizada_si"
                  className="form-check-label"
                >
                  Si
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v27_hemodinamia_realizada"
                  id="v27_hemodinamia_realizada_no"
                  onChange={gestionarCambioValor}
                  value="NO"
                  checked={valoresFormulario.v27_hemodinamia_realizada === "NO"}
                />
                <label
                  htmlFor="v27_hemodinamia_realizada_no"
                  className="form-check-label"
                >
                  No
                </label>
              </div>
            </div>

            {/* V28_HEMODINA_MISMO_DIA_INGRESO */}
            <div className="col-md-2">
              <label className="form-label">Hemodina Mismo Dia Ingreso</label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v28_hemodina_mismo_dia_ingreso"
                  id="v28_hemodina_mismo_dia_ingreso_"
                  onChange={gestionarCambioValor}
                  value=""
                  checked={
                    valoresFormulario.v28_hemodina_mismo_dia_ingreso === ""
                  }
                />
                <label
                  htmlFor="v28_hemodina_mismo_dia_ingreso_"
                  className="form-check-label"
                >
                  (Sin Valor)
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v28_hemodina_mismo_dia_ingreso"
                  id="v28_hemodina_mismo_dia_ingreso_si"
                  onChange={gestionarCambioValor}
                  value="SI"
                  checked={
                    valoresFormulario.v28_hemodina_mismo_dia_ingreso === "SI"
                  }
                />
                <label
                  htmlFor="v28_hemodina_mismo_dia_ingreso_si"
                  className="form-check-label"
                >
                  Si
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v28_hemodina_mismo_dia_ingreso"
                  id="v28_hemodina_mismo_dia_ingreso_no"
                  onChange={gestionarCambioValor}
                  value="NO"
                  checked={
                    valoresFormulario.v28_hemodina_mismo_dia_ingreso === "NO"
                  }
                />
                <label
                  htmlFor="v28_hemodina_mismo_dia_ingreso_no"
                  className="form-check-label"
                >
                  No
                </label>
              </div>
            </div>

            {/* V29_ENDOSCOPIA */}
            <div className="col-md-2">
              <label className="form-label">Endoscopia</label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v29_endoscopia"
                  id="v29_endoscopia_"
                  onChange={gestionarCambioValor}
                  value=""
                  checked={valoresFormulario.v29_endoscopia === ""}
                />
                <label htmlFor="v29_endoscopia_" className="form-check-label">
                  (Sin Valor)
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v29_endoscopia"
                  id="v29_endoscopia_si"
                  onChange={gestionarCambioValor}
                  value="SI"
                  checked={valoresFormulario.v29_endoscopia === "SI"}
                />
                <label htmlFor="v29_endoscopia_si" className="form-check-label">
                  Si
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v29_endoscopia"
                  id="v29_endoscopia_no"
                  onChange={gestionarCambioValor}
                  value="NO"
                  checked={valoresFormulario.v29_endoscopia === "NO"}
                />
                <label htmlFor="v29_endoscopia_no" className="form-check-label">
                  No
                </label>
              </div>
            </div>

            {/* V30_ENDOSCOP_MISMO_DIA_INGRESO */}
            <div className="col-md-2">
              <label className="form-label">Endoscop Mismo Dia Ingreso</label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v30_endoscop_mismo_dia_ingreso"
                  id="v30_endoscop_mismo_dia_ingreso_"
                  onChange={gestionarCambioValor}
                  value=""
                  checked={
                    valoresFormulario.v30_endoscop_mismo_dia_ingreso === ""
                  }
                />
                <label
                  htmlFor="v30_endoscop_mismo_dia_ingreso_"
                  className="form-check-label"
                >
                  (Sin Valor)
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v30_endoscop_mismo_dia_ingreso"
                  id="v30_endoscop_mismo_dia_ingreso_si"
                  onChange={gestionarCambioValor}
                  value="SI"
                  checked={
                    valoresFormulario.v30_endoscop_mismo_dia_ingreso === "SI"
                  }
                />
                <label
                  htmlFor="v30_endoscop_mismo_dia_ingreso_si"
                  className="form-check-label"
                >
                  Si
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v30_endoscop_mismo_dia_ingreso"
                  id="v30_endoscop_mismo_dia_ingreso_no"
                  onChange={gestionarCambioValor}
                  value="NO"
                  checked={
                    valoresFormulario.v30_endoscop_mismo_dia_ingreso === "NO"
                  }
                />
                <label
                  htmlFor="v30_endoscop_mismo_dia_ingreso_no"
                  className="form-check-label"
                >
                  No
                </label>
              </div>
            </div>

            {/* V31_DIALISIS */}
            <div className="col-md-2">
              <label className="form-label">Dialisis</label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v31_dialisis"
                  id="v31_dialisis_"
                  onChange={gestionarCambioValor}
                  value=""
                  checked={valoresFormulario.v31_dialisis === ""}
                />
                <label htmlFor="v31_dialisis_" className="form-check-label">
                  (Sin Valor)
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v31_dialisis"
                  id="v31_dialisis_si"
                  onChange={gestionarCambioValor}
                  value="SI"
                  checked={valoresFormulario.v31_dialisis === "SI"}
                />
                <label htmlFor="v31_dialisis_si" className="form-check-label">
                  Si
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v31_dialisis"
                  id="v31_dialisis_no"
                  onChange={gestionarCambioValor}
                  value="NO"
                  checked={valoresFormulario.v31_dialisis === "NO"}
                />
                <label htmlFor="v31_dialisis_no" className="form-check-label">
                  No
                </label>
              </div>
            </div>

            {/* V35_TROMBOLISIS */}
            <div className="col-md-2">
              <label className="form-label">Trombolisis</label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v35_trombolisis"
                  id="v35_trombolisis_"
                  onChange={gestionarCambioValor}
                  value=""
                  checked={valoresFormulario.v35_trombolisis === ""}
                />
                <label htmlFor="v35_trombolisis_" className="form-check-label">
                  (Sin Valor)
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v35_trombolisis"
                  id="v35_trombolisis_si"
                  onChange={gestionarCambioValor}
                  value="SI"
                  checked={valoresFormulario.v35_trombolisis === "SI"}
                />
                <label
                  htmlFor="v35_trombolisis_si"
                  className="form-check-label"
                >
                  Si
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v35_trombolisis"
                  id="v35_trombolisis_no"
                  onChange={gestionarCambioValor}
                  value="NO"
                  checked={valoresFormulario.v35_trombolisis === "NO"}
                />
                <label
                  htmlFor="v35_trombolisis_no"
                  className="form-check-label"
                >
                  No
                </label>
              </div>
            </div>

            {/* V36_TROMBOLI_MISMO_DIA_INGRESO */}
            <div className="col-md-2">
              <label className="form-label">Tromboli Mismo Dia Ingreso</label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v36_tromboli_mismo_dia_ingreso"
                  id="v36_tromboli_mismo_dia_ingreso_"
                  onChange={gestionarCambioValor}
                  value=""
                  checked={
                    valoresFormulario.v36_tromboli_mismo_dia_ingreso === ""
                  }
                />
                <label
                  htmlFor="v36_tromboli_mismo_dia_ingreso_"
                  className="form-check-label"
                >
                  (Sin Valor)
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v36_tromboli_mismo_dia_ingreso"
                  id="v36_tromboli_mismo_dia_ingreso_si"
                  onChange={gestionarCambioValor}
                  value="SI"
                  checked={
                    valoresFormulario.v36_tromboli_mismo_dia_ingreso === "SI"
                  }
                />
                <label
                  htmlFor="v36_tromboli_mismo_dia_ingreso_si"
                  className="form-check-label"
                >
                  Si
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v36_tromboli_mismo_dia_ingreso"
                  id="v36_tromboli_mismo_dia_ingreso_no"
                  onChange={gestionarCambioValor}
                  value="NO"
                  checked={
                    valoresFormulario.v36_tromboli_mismo_dia_ingreso === "NO"
                  }
                />
                <label
                  htmlFor="v36_tromboli_mismo_dia_ingreso_no"
                  className="form-check-label"
                >
                  No
                </label>
              </div>
            </div>
            <div className="col-md-3"> </div>

            {/* V40_PCR */}
            <div className="col-md-3">
              <label className="form-label">PCR</label>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  name="v40_pcr"
                  id="v40_pcr"
                  type="number"
                  maxLength="3"
                  min="0"
                  max="300"
                  step="0.01"
                  disabled={formularioDesahabilitado}
                  value={valoresFormulario.v40_pcr}
                  onChange={gestionarCambioValor}
                />
                <span className="input-group-text">mg/dl</span>
              </div>
            </div>

            {/* V41_HEMOGLOBINA */}
            <div className="col-md-3">
              <label className="form-label">Hemoglobina</label>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  name="v41_hemoglobina"
                  id="v41_hemoglobina"
                  type="number"
                  maxLength="3"
                  min="0"
                  max="300"
                  step="0.01"
                  disabled={formularioDesahabilitado}
                  value={valoresFormulario.v41_hemoglobina}
                  onChange={gestionarCambioValor}
                />
                <span className="input-group-text">g/dl</span>
              </div>
            </div>

            {/* V42_CREATININA */}
            <div className="col-md-3">
              <label className="form-label">
                Creatinina<span className="text-danger fw-bold fs-5">*</span>
              </label>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  required
                  name="v42_creatinina"
                  id="v42_creatinina"
                  type="number"
                  maxLength="3"
                  min="0"
                  max="100"
                  step="0.01"
                  disabled={formularioDesahabilitado}
                  value={valoresFormulario.v42_creatinina}
                  onChange={gestionarCambioValor}
                />
                <span className="input-group-text">mg/dl</span>
                <div className="invalid-feedback">Debe ingresar un valor</div>
              </div>
            </div>

            {/* V43_NITROGENO_UREICO */}
            <div className="col-md-3">
              <label className="form-label">
                Nitrogeno Ureico
                <span className="text-danger fw-bold fs-5">*</span>
              </label>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  required
                  name="v43_nitrogeno_ureico"
                  id="v43_nitrogeno_ureico"
                  type="number"
                  maxLength="3"
                  min="0"
                  max="100"
                  step="0.01"
                  disabled={formularioDesahabilitado}
                  value={valoresFormulario.v43_nitrogeno_ureico}
                  onChange={gestionarCambioValor}
                />
                <span className="input-group-text">mg/dl</span>
                <div className="invalid-feedback">Debe ingresar un valor</div>
              </div>
            </div>

            {/* V44_SODIO */}
            <div className="col-md-3">
              <label className="form-label">
                Sodio<span className="text-danger fw-bold fs-5">*</span>
              </label>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  required
                  name="v44_sodio"
                  id="v44_sodio"
                  type="number"
                  maxLength="3"
                  min="100"
                  max="180"
                  step="1.0"
                  disabled={formularioDesahabilitado}
                  value={valoresFormulario.v44_sodio}
                  onChange={gestionarCambioValor}
                />
                <span className="input-group-text">mEq/dl</span>
                <div className="invalid-feedback">Debe ingresar un valor</div>
              </div>
            </div>

            {/* V45_POTASIO */}
            <div className="col-md-3">
              <label className="form-label">
                Potasio<span className="text-danger fw-bold fs-5">*</span>
              </label>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  required
                  name="v45_potasio"
                  id="v45_potasio"
                  type="number"
                  maxLength="3"
                  min="0"
                  max="100"
                  step="0.01"
                  disabled={formularioDesahabilitado}
                  value={valoresFormulario.v45_potasio}
                  onChange={gestionarCambioValor}
                />
                <span className="input-group-text">mEq/dl</span>
                <div className="invalid-feedback">Debe ingresar un valor</div>
              </div>
            </div>

            {/* v46rut_prestador */}
            <div className="col-md-12">
              <label className="form-label">
                Prestador Médico{" "}
                <span className="text-danger fw-bold fs-5">*</span>
              </label>
              <select
                disabled={
                  formularioDesahabilitado ||
                  usuario_jwt().tipo_usuario === "PRESTADOR"
                }
                className="form-select"
                name="v46_rut_prestador"
                id="v46_rut_prestador"
                value={valoresFormulario.v46_rut_prestador}
                onChange={gestionarCambioValor}
                required
              >
                <option value="">Seleccionar...</option>
                {apiSnoopy.listadoPrestadores &&
                  apiSnoopy.listadoPrestadores.map((option) => (
                    <option value={option.rut} key={option.nombre}>
                      {option.nombre}
                    </option>
                  ))}
              </select>
              <div className="invalid-feedback">Debe ingresar un valor</div>
            </div>

            {/* V47_DREO */}
            <div className="col-md-2">
              <label className="form-label">DREO</label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v47_dreo"
                  id="v47_dreo_"
                  onChange={gestionarCambioValor}
                  value=""
                  checked={valoresFormulario.v47_dreo === ""}
                />
                <label htmlFor="v47_dreo_" className="form-check-label">
                  (Sin Valor)
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v47_dreo"
                  id="v47_dreo_si"
                  onChange={gestionarCambioValor}
                  value="SI"
                  checked={valoresFormulario.v47_dreo === "SI"}
                />
                <label htmlFor="v47_dreo_si" className="form-check-label">
                  Si
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v47_dreo"
                  id="v47_dreo_no"
                  onChange={gestionarCambioValor}
                  value="NO"
                  checked={valoresFormulario.v47_dreo === "NO"}
                />
                <label htmlFor="v47_dreo_no" className="form-check-label">
                  No
                </label>
              </div>
            </div>

            {/* V48_TROPONINAS */}
            <div className="col-md-2">
              <label className="form-label">
                Troponinas<span className="text-danger fw-bold fs-5">*</span>
              </label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  required
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v48_troponinas"
                  id="v48_troponinas_"
                  onChange={gestionarCambioValor}
                  value=""
                  checked={valoresFormulario.v48_troponinas === ""}
                />
                <label htmlFor="v48_troponinas_" className="form-check-label">
                  (Sin Valor)
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v48_troponinas"
                  id="v48_troponinas_si"
                  onChange={gestionarCambioValor}
                  value="SI"
                  checked={valoresFormulario.v48_troponinas === "SI"}
                />
                <label htmlFor="v48_troponinas_si" className="form-check-label">
                  Si
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v48_troponinas"
                  id="v48_troponinas_no"
                  onChange={gestionarCambioValor}
                  value="NO"
                  checked={valoresFormulario.v48_troponinas === "NO"}
                />
                <label htmlFor="v48_troponinas_no" className="form-check-label">
                  No
                </label>
              </div>
            </div>

            {/* V49_ECG_ALTERADO */}
            <div className="col-md-2">
              <label className="form-label">
                ECG Alterado<span className="text-danger fw-bold fs-5">*</span>
              </label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  required
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v49_ecg_alterado"
                  id="v49_ecg_alterado_"
                  onChange={gestionarCambioValor}
                  value=""
                  checked={valoresFormulario.v49_ecg_alterado === ""}
                />
                <label htmlFor="v49_ecg_alterado_" className="form-check-label">
                  (Sin Valor)
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v49_ecg_alterado"
                  id="v49_ecg_alterado_si"
                  onChange={gestionarCambioValor}
                  value="SI"
                  checked={valoresFormulario.v49_ecg_alterado === "SI"}
                />
                <label
                  htmlFor="v49_ecg_alterado_si"
                  className="form-check-label"
                >
                  Si
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v49_ecg_alterado"
                  id="v49_ecg_alterado_no"
                  onChange={gestionarCambioValor}
                  value="NO"
                  checked={valoresFormulario.v49_ecg_alterado === "NO"}
                />
                <label
                  htmlFor="v49_ecg_alterado_no"
                  className="form-check-label"
                >
                  No
                </label>
              </div>
            </div>

            {/* V50_RNM_PROTOCOLO_STROKE */}
            <div className="col-md-2">
              <label className="form-label">RNM Protocolo Stroke</label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v50_rnm_protocolo_stroke"
                  id="v50_rnm_protocolo_stroke_"
                  onChange={gestionarCambioValor}
                  value=""
                  checked={valoresFormulario.v50_rnm_protocolo_stroke === ""}
                />
                <label
                  htmlFor="v50_rnm_protocolo_stroke_"
                  className="form-check-label"
                >
                  (Sin Valor)
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v50_rnm_protocolo_stroke"
                  id="v50_rnm_protocolo_stroke_si"
                  onChange={gestionarCambioValor}
                  value="SI"
                  checked={valoresFormulario.v50_rnm_protocolo_stroke === "SI"}
                />
                <label
                  htmlFor="v50_rnm_protocolo_stroke_si"
                  className="form-check-label"
                >
                  Si
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v50_rnm_protocolo_stroke"
                  id="v50_rnm_protocolo_stroke_no"
                  onChange={gestionarCambioValor}
                  value="NO"
                  checked={valoresFormulario.v50_rnm_protocolo_stroke === "NO"}
                />
                <label
                  htmlFor="v50_rnm_protocolo_stroke_no"
                  className="form-check-label"
                >
                  No
                </label>
              </div>
            </div>

            {/* V51_DVA */}
            <div className="col-md-2">
              <label className="form-label">
                DVA<span className="text-danger fw-bold fs-5">*</span>
              </label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  required
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v51_dva"
                  id="v51_dva_"
                  onChange={gestionarCambioValor}
                  value=""
                  checked={valoresFormulario.v51_dva === ""}
                />
                <label htmlFor="v51_dva_" className="form-check-label">
                  (Sin Valor)
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v51_dva"
                  id="v51_dva_si"
                  onChange={gestionarCambioValor}
                  value="SI"
                  checked={valoresFormulario.v51_dva === "SI"}
                />
                <label htmlFor="v51_dva_si" className="form-check-label">
                  Si
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v51_dva"
                  id="v51_dva_no"
                  onChange={gestionarCambioValor}
                  value="NO"
                  checked={valoresFormulario.v51_dva === "NO"}
                />
                <label htmlFor="v51_dva_no" className="form-check-label">
                  No
                </label>
              </div>
            </div>

            {/* V52_TRANSFUSIONES */}
            <div className="col-md-2">
              <label className="form-label">
                Transfusiones<span className="text-danger fw-bold fs-5">*</span>
              </label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  required
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v52_transfusiones"
                  id="v52_transfusiones_"
                  onChange={gestionarCambioValor}
                  value=""
                  checked={valoresFormulario.v52_transfusiones === ""}
                />
                <label
                  htmlFor="v52_transfusiones_"
                  className="form-check-label"
                >
                  (Sin Valor)
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v52_transfusiones"
                  id="v52_transfusiones_si"
                  onChange={gestionarCambioValor}
                  value="SI"
                  checked={valoresFormulario.v52_transfusiones === "SI"}
                />
                <label
                  htmlFor="v52_transfusiones_si"
                  className="form-check-label"
                >
                  Si
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v52_transfusiones"
                  id="v52_transfusiones_no"
                  onChange={gestionarCambioValor}
                  value="NO"
                  checked={valoresFormulario.v52_transfusiones === "NO"}
                />
                <label
                  htmlFor="v52_transfusiones_no"
                  className="form-check-label"
                >
                  No
                </label>
              </div>
            </div>

            {/* V53_COMPROMISO_CONCIENCIA */}
            <div className="col-md-2">
              <label className="form-label">Compromiso Conciencia</label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v53_compromiso_conciencia"
                  id="v53_compromiso_conciencia_"
                  onChange={gestionarCambioValor}
                  value=""
                  checked={valoresFormulario.v53_compromiso_conciencia === ""}
                />
                <label
                  htmlFor="v53_compromiso_conciencia_"
                  className="form-check-label"
                >
                  (Sin Valor)
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v53_compromiso_conciencia"
                  id="v53_compromiso_conciencia_si"
                  onChange={gestionarCambioValor}
                  value="SI"
                  checked={valoresFormulario.v53_compromiso_conciencia === "SI"}
                />
                <label
                  htmlFor="v53_compromiso_conciencia_si"
                  className="form-check-label"
                >
                  Si
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  disabled={formularioDesahabilitado}
                  type="radio"
                  name="v53_compromiso_conciencia"
                  id="v53_compromiso_conciencia_no"
                  onChange={gestionarCambioValor}
                  value="NO"
                  checked={valoresFormulario.v53_compromiso_conciencia === "NO"}
                />
                <label
                  htmlFor="v53_compromiso_conciencia_no"
                  className="form-check-label"
                >
                  No
                </label>
              </div>
            </div>

            {/* USUARIO_ULTIMO_UPDATE */}
            <input
              type="hidden"
              value="{valoresFormulario.usuario_ultimo_update}"
              name="usuario_ultimo_update"
            />
            {/* FECHA_INSERT */}
            <input
              type="hidden"
              value="{valoresFormulario.fecha_insert}"
              name="fecha_insert"
            />
            {/* FECHA_ULTIMO_UPDATE */}
            <input
              type="hidden"
              value="{valoresFormulario.fecha_ultimo_update}"
              name="fecha_ultimo_update"
            />
            {/* FECHA_INGRESO */}
            <input
              type="hidden"
              value="{valoresFormulario.fecha_ingreso}"
              name="fecha_ingreso"
            />
            {/* V57_NO_PERTINENCIA */}
            <input
              type="hidden"
              value="{valoresFormulario.v57_no_pertinencia}"
              name="v57_no_pertinencia"
            />
            {/* VERSION_ML_PREDICCION */}
            <input
              type="hidden"
              value="{valoresFormulario.version_ml_prediccion}"
              name="version_ml_prediccion"
            />
            {/* OUT_ERROR_WS */}
            <input
              type="hidden"
              value="{valoresFormulario.out_error_ws}"
              name="out_error_ws"
            />
            {/* NO_PERTINENCIA_SEGUN_CONTROL */}
            <input
              type="hidden"
              value="{valoresFormulario.no_pertinencia_segun_control}"
              name="no_pertinencia_segun_control"
            />
            {/* DIGITADO_POR_CONTROL */}
            <input
              type="hidden"
              value="{valoresFormulario.digitado_por_control}"
              name="digitado_por_control"
            />
            {/* pk_registro */}
            <input
              type="hidden"
              value="{valoresFormulario.pk_registro}"
              name="pk_registro"
            />

            {/* FIN DE LOS CAMPOS */}

            <div className="col-12">
              {mensaje && (
                <div className="alert alert-danger" role="alert">
                  {mensaje.mensaje}
                </div>
              )}
            </div>

            <div className="row mt-4 ">
              <div className="col-6 d-flex justify-content-between">
                {formularioDesahabilitado === false && (
                  <button
                    type="submit"
                    className="btn btn-primary d-flex align-items-center  mr-2"
                  >
                    <em className="material-icons md-18">save</em>
                    Guardar Registro
                  </button>
                )}{" "}
                {usuario_jwt().tipo_usuario === "FONASA" && params.id && (
                  <>
                    <button
                      type="button"
                      className="btn btn-danger d-flex align-items-center  mr-2"
                      onClick={() => {
                        setMostrarPopUpConfirmacion(true);
                      }}
                    >
                      <span className="material-icons md-18">delete</span>{" "}
                      ELIMINAR
                    </button>
                  </>
                )}
                <button
                  type="button"
                  className="btn btn-outline-primary d-flex align-items-center  mr-2"
                  onClick={() => {
                    navigate("/registros");
                  }}
                >
                  <span className="material-icons md-18">clear</span> Volver
                </button>
              </div>

              {apiSnoopy.loading && <Cargando />}
              {apiSnoopy.error && <MensajeError mensaje={apiSnoopy.error} />}
              {apiSnoopy.data && (
                <MensajeExito mensaje={apiSnoopy.data.mensaje} />
              )}
            </div>
          </form>
        </div>
      </div>
      <Modal show={mostrarPopUpConfirmacion} onHide={cerrarPopUp} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p class="fs-3 text-center text-danger">
            ¿Está seguro que desea eliminar el folio #
            {valoresFormulario.id_caso}?
          </p>
          <p>Ingrese el motivo de la eliminación</p>
          <div className="d-flex">
            <textarea
              className="form-control"
              rows="3"
              name="motivoConfirmacion"
              onChange={(e) => {
                setMotivoConfirmacion(e.target.value);
              }}
            />

            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                eliminarRegistro();
              }}
            >
              Confirmar Eliminación
            </button>
          </div>
          {mensaje && (
            <div className="alert alert-danger" role="alert">
              {mensaje.mensaje}{" "}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={cerrarPopUp}>
            Cancelar
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={mostrarPopUpConfirmacionEdicion}
        onHide={cerrarPopUp}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmación de Edición</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p class="fs-3 text-center text-danger">
            ¿Está seguro que desea modificar el folio #
            {valoresFormulario.id_caso}?
          </p>
          <p>Ingrese el motivo de la edición del registro</p>
          <div className="d-flex">
            <textarea
              className="form-control"
              rows="3"
              name="motivo_modificacion"
              id="motivo_modificacion"
              value={valoresFormulario.motivo_modificacion}
              onChange={gestionarCambioValor}
            />

            <button
              className="btn btn-warning btn-sm"
              onClick={() => {
                confirmarModificacion();
              }}
            >
              Confirmar Modificación
            </button>
          </div>
          {mensaje && (
            <div className="alert alert-danger" role="alert">
              {mensaje.mensaje}{" "}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={cerrarPopUp}>
            Cancelar
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FormularioAntecedenteClinico;
