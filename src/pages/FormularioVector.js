import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { crearVector } from "../components/servicios";
import constantes from "../components/constantes.json";

import {
  optionsGlasgow,
  optionsPrestador,
  optionsSubTipoCama,
  optionsTipoCama,
} from "./CrearForm.colecciones";
import InputGroup from "../components/custom/InputGroup";
import useApiSnoopy from "../hooks/useApiSnoopy";

const FormularioVector = (props) => {
  let apiSnoopy = useApiSnoopy();
  let params = useParams();

  const [estadoValidacionFormulario, setEstadoValidacionFormulario] =
    useState("needs-validation");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const buscarVector = async (id) => {
    await apiSnoopy.getUnVectorByID(id);
    await setValoresFormulario(apiSnoopy.data);
  };

  useEffect(() => {
    console.log(params.id);
    if (params.id) {
      buscarVector(params.id);
    }
  }, []);

  let nuevoVector = {
    id_caso: "",
    fecha_ingreso: "",
    v1_sexo: "",
    v2_antecedentes_cardiacos: "",
    v3_antecedentes_diabeticos: "",
    v4_antecedentes_de_hipertensio: "",
    v6_triage: "",
    v7_presion_arterial_sisto_alta: "",
    v8_presion_arterial_diast_baja: "",
    v9_presion_arterial_media: "",
    v10_temperatura: "",
    v11_saturacion_oxigeno: "",
    v12_frecuencia_cardiaca: "",
    v13_frecuencia_respiratoria: "",
    v14_edad_anos: "",
    v17_tipo_cama_ingreso: "",
    v18_tipo_paciente: "",
    v19_glasgow: "",
    v20_fio2: "",
    v21_grave_fio2: "",
    v22_dias_estabilizacionilizacion: "",
    v23_dias_posestabilizacionilizacion: "",
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
    v41_hemoglobina: "",
    v42_creatinina: "",
    v43_nitrogeno_ureico: "",
    v44_sodio: "",
    v45_potasio: "",
    v46_nombre_prestador_privado: "",
    v47_dreo: "",
    v48_troponinas: "",
    v49_ecg_alterado: "",
    v50_rnm_protocolo_stroke: "",
    v51_dva: "",
    v52_transfusiones: "",
    v53_compromiso_conciencia: "",
    v57_no_pertinencia: "",
    version_ml_prediccion: "",
    out_error_ws: "",
    no_pertinencia_segun_control: "",
    digitado_por_control: "",
    usuario_insert: "",
    usuario_ultimo_update: "",
    fecha_insert: "",
    fecha_ultimo_update: "",
  };

  // eslint-disable-next-line no-unused-vars
  const [usuario, setUsuario] = useState("16184826-3");

  const [validated, setValidated] = useState(false);

  const [valoresFormulario, setValoresFormulario] = useState(nuevoVector);

  const gestionarCambioValor = async (evt) => {
    const { target } = evt;
    const { name, value } = target;
    const newValoresFormulario = { ...valoresFormulario, [name]: value };
    setValoresFormulario(newValoresFormulario);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setLoading(true);

    try {
      const isValid = form.checkValidity();
      console.log("Validez formulario: ", isValid);

      if (form.checkValidity() === false) {
        event.stopPropagation();
        setValidated(true);
        setEstadoValidacionFormulario("was-validated needs-validation");
      } else {
        const miVector = {
          id_caso: props.valoresFormulario.id_caso,
          vector: props.valoresFormulario,
          traza: {
            digitadoControl: "NO",
            usuario,
          },
        };
        const resp = await crearVector(miVector);
        console.log(resp);

        const result = resp.data;
        if (result.codigoRespuesta === 0) {
          alert(
            `Resultado prediccion es: ${result.prediccion.mensajeRespuesta}\nLa version de la ML es: ${result.prediccion.versionML}`
          );

          setEstadoValidacionFormulario("needs-validation");

          navigate(constantes.inicial);
        }
      }
    } catch (error) {
      console.log("ESTO ES UN ERROOOOOOOOR!!!!");
      console.log(error);
      alert("Fallo al guardar caso!");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-12">
          <form
            noValidate
            onSubmit={handleSubmit}
            className={estadoValidacionFormulario}
          >
            <div className="row mt-3 grupo">
              <div className="col-md-4 ">
                <label class="form-label">
                  Identificador de Caso <span className="text-danger">*</span>{" "}
                </label>

                <input
                  className="form-control"
                  type="text"
                  required
                  value={valoresFormulario.id_caso}
                  onChange={gestionarCambioValor}
                />

                <div class="invalid-feedback">
                  Por favor ingrese el número de caso.
                </div>
              </div>
              <div className="col-md-4 "> </div>
              <div className="col-md-4 ">
                <label class="form-label">
                  Usuario <span className="text-danger">*</span>
                </label>

                <input
                  className="form-control"
                  type="text"
                  required
                  disabled
                  value={valoresFormulario.usuario}
                  onChange={gestionarCambioValor}
                />

                <div class="invalid-feedback">
                  Por favor ingrese el número de caso.
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-2">
                <label class="form-label">Sexo</label>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Desconocido"
                    required
                    name="sexo"
                    id="sexo_Desconocido"
                    value="DESCONOCIDO"
                    onChange={gestionarCambioValor}
                  />
                  <label for="sexo_Desconocido" class="form-check-label">
                    {" "}
                    Desconocido
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Masculino"
                    name="sexo"
                    id="sexo_Masculino"
                    value="HOMBRE"
                    onChange={gestionarCambioValor}
                  />
                  <label for="sexo_Masculino" class="form-check-label">
                    {" "}
                    Masculino
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Femenino"
                    name="sexo"
                    id="sexo_Femenino"
                    value="MUJER"
                    onChange={gestionarCambioValor}
                  />
                  <label for="sexo_Femenino" class="form-check-label">
                    {" "}
                    Femenino
                  </label>
                </div>
              </div>
              <div className="col-2">
                <label class="form-label">Antecedentes Cardiacos</label>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="antCardiacos"
                    id="antCardiacos_sinValor"
                    value="XX"
                    onChange={gestionarCambioValor}
                  />
                  <label for="antCardiacos_sinValor" class="form-check-label">
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="antCardiacos"
                    id="antCardiacos_si"
                    value="SI"
                    onChange={gestionarCambioValor}
                  />
                  <label for="antCardiacos_si" class="form-check-label">
                    {" "}
                    Si
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="antCardiacos"
                    id="antCardiacos_no"
                    value="NO"
                    onChange={gestionarCambioValor}
                  />
                  <label for="antCardiacos_no" class="form-check-label">
                    {" "}
                    No
                  </label>
                </div>
              </div>

              <div className="col-2">
                <label class="form-label">Antecedentes Diabetes</label>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="antDiabetes"
                    id="antDiabetes_sinValor"
                    value="XX"
                    onChange={gestionarCambioValor}
                  />
                  <label for="antDiabetes_sinValor" class="form-check-label">
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="antDiabetes"
                    id="antDiabetes_si"
                    value="SI"
                    onChange={gestionarCambioValor}
                  />
                  <label for="antDiabetes_si" class="form-check-label">
                    {" "}
                    Si
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="antDiabetes"
                    id="antDiabetes_no"
                    value="NO"
                    onChange={gestionarCambioValor}
                  />
                  <label for="antDiabetes_no" class="form-check-label">
                    {" "}
                    No
                  </label>
                </div>
              </div>

              <div className="col-2">
                <label class="form-label">Antecedentes Hipertension</label>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="antHT"
                    id="antHT_sinValor"
                    value="XX"
                    onChange={gestionarCambioValor}
                  />
                  <label for="antHT_sinValor" class="form-check-label">
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="antHT"
                    id="antHT_si"
                    value="SI"
                    onChange={gestionarCambioValor}
                  />
                  <label for="antHT_si" class="form-check-label">
                    {" "}
                    Si
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="antHT"
                    id="antHT_no"
                    value="NO"
                    onChange={gestionarCambioValor}
                  />
                  <label for="antHT_no" class="form-check-label">
                    {" "}
                    No
                  </label>
                </div>
              </div>

              <div className="col-2">
                <label class="form-label">Triage</label>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="triage"
                    id="triage_sinValor"
                    value=""
                    onChange={gestionarCambioValor}
                  />
                  <label for="triage_sinValor" class="form-check-label">
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="1"
                    name="triage"
                    id="triage_1"
                    value="1"
                    onChange={gestionarCambioValor}
                  />
                  <label for="triage_1" class="form-check-label">
                    {" "}
                    1
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="2"
                    name="triage"
                    id="triage_2"
                    value="2"
                    onChange={gestionarCambioValor}
                  />
                  <label for="triage_2" class="form-check-label">
                    {" "}
                    2
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="3"
                    name="triage"
                    id="triage_3"
                    value="3"
                    onChange={gestionarCambioValor}
                  />
                  <label for="triage_3" class="form-check-label">
                    {" "}
                    3
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="4"
                    name="triage"
                    id="triage_4"
                    value="4"
                    onChange={gestionarCambioValor}
                  />
                  <label for="triage_4" class="form-check-label">
                    {" "}
                    4
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="5"
                    name="triage"
                    id="triage_5"
                    value="5"
                    onChange={gestionarCambioValor}
                  />
                  <label for="triage_5" class="form-check-label">
                    {" "}
                    5
                  </label>
                </div>
              </div>
            </div>
            <div className="row mt-3 grupo ">
              <div className="col-4">
                <label class="form-label">Presión Sistólica (alta)</label>
                <InputGroup>
                  <input
                    className="form-control"
                    type="number"
                    maxLength="3"
                    min="0"
                    max="299"
                    step="0.01"
                    value={valoresFormulario.v7_presion_arterial_sisto_alta}
                    onChange={gestionarCambioValor}
                  />

                  <span class="input-group-text">mmHg</span>
                </InputGroup>
              </div>

              <div className="col-4">
                <label class="form-label">Temperatura</label>
                <InputGroup>
                  <input
                    className="form-control"
                    type="number"
                    maxLength="3"
                    min="0"
                    max="50"
                    step="0.01"
                    value={valoresFormulario.v10_temperatura}
                    onChange={gestionarCambioValor}
                  />

                  <span class="input-group-text">°C</span>
                </InputGroup>
              </div>

              <div className="col-4">
                <label class="form-label">Frecuencia Cardiaca</label>
                <InputGroup>
                  <input
                    className="form-control"
                    type="number"
                    maxLength="3"
                    min="0"
                    max="200"
                    step="0.01"
                    value={valoresFormulario.v12_frecuencia_cardiaca}
                    onChange={gestionarCambioValor}
                  />

                  <span class="input-group-text">lat/min</span>
                </InputGroup>
              </div>
            </div>

            <div className="row mt-3 grupo ">
              <div className="col-4">
                <label class="form-label">Presión Diastólica (baja)</label>
                <InputGroup>
                  <input
                    className="form-control"
                    type="number"
                    maxLength="3"
                    min="0"
                    max="299"
                    step="0.01"
                    value={valoresFormulario.v8_presion_arterial_diast_baja}
                    onChange={gestionarCambioValor}
                  />

                  <span class="input-group-text">mmHg</span>
                </InputGroup>
              </div>

              <div className="col-4">
                <label class="form-label">Saturacion Oxigeno</label>
                <InputGroup>
                  <input
                    className="form-control"
                    type="number"
                    maxLength="3"
                    min="0"
                    max="100"
                    value={valoresFormulario.v11_saturacion_oxigeno}
                    onChange={gestionarCambioValor}
                  />

                  <span class="input-group-text">%</span>
                </InputGroup>
              </div>

              <div className="col-4">
                <label class="form-label">Frecuencia Respiratoria</label>
                <InputGroup>
                  <input
                    className="form-control"
                    type="number"
                    maxLength="3"
                    min="0"
                    max="100"
                    step="0.01"
                    value={valoresFormulario.v13_frecuencia_respiratoria}
                    onChange={gestionarCambioValor}
                  />

                  <span class="input-group-text">resp/min</span>
                </InputGroup>
              </div>
            </div>

            <div className="row mt-3 grupo ">
              <div className="col-md-4">
                <label class="form-label">Presion Arterial Media</label>
                <InputGroup>
                  <input
                    className="form-control"
                    type="number"
                    maxLength="3"
                    min="0"
                    max="299"
                    step="0.01"
                    value={valoresFormulario.v9_pa_media}
                    onChange={gestionarCambioValor}
                  />

                  <span class="input-group-text">mmHg</span>
                </InputGroup>
              </div>
            </div>

            <div className="row mt-3 grupo ">
              <div className="col-4">
                <label class="form-label">Edad</label>
                <InputGroup>
                  <input
                    className="form-control"
                    type="number"
                    required
                    maxLength="3"
                    min="0"
                    max="150"
                    value={valoresFormulario.v14_edad_anos}
                    onChange={gestionarCambioValor}
                  />
                  <div class="invalid-feedback">Por favor ingrese la edad.</div>

                  <span class="input-group-text">años</span>
                </InputGroup>
              </div>

              <div className="col-4">
                <label class="form-label">Tipo Cama</label>
                <select
                  className="form-select"
                  as="select"
                  value={valoresFormulario.v17_tipo_cama_ingreso}
                  onChange={gestionarCambioValor}
                >
                  {optionsTipoCama.map((option) => (
                    <option value={option.value} key={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-4">
                <label class="form-label">Subtipo Cama</label>
                <select
                  className="form-select"
                  as="select"
                  value={valoresFormulario.v18_tipo_paciente}
                  onChange={gestionarCambioValor}
                >
                  {optionsSubTipoCama.map((option) => (
                    <option value={option.value} key={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-4">
                <label class="form-label">Glasgow</label>
                <select
                  className="form-select"
                  as="select"
                  value={valoresFormulario.v19_glasgow}
                  onChange={gestionarCambioValor}
                >
                  {optionsGlasgow.map((option) => (
                    <option value={option.value} key={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-4">
                <label class="form-label">FIO2</label>
                <InputGroup>
                  <input
                    className="form-control"
                    type="number"
                    value={valoresFormulario.v20_fio2}
                    onChange={gestionarCambioValor}
                  />

                  <span class="input-group-text">%</span>
                </InputGroup>
              </div>

              <div className="col-4">
                <label class="form-label">Dias Estabilización</label>
                <InputGroup>
                  <input
                    className="form-control"
                    type="number"
                    required
                    maxLength="3"
                    min="0"
                    max="299"
                    step="0.01"
                    value={valoresFormulario.v22_dias_estabilizacion}
                    onChange={gestionarCambioValor}
                  />

                  <span class="input-group-text">dias</span>

                  <div class="invalid-feedback">
                    Por favor ingrese el número de días de estabilización.
                  </div>
                </InputGroup>
              </div>
            </div>

            <div className="row mt-3 grupo ">
              <div className="col-4"></div>
              <div className="col-4">
                <label class="form-label">Grave FIO2</label>

                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="graveFIO2"
                    id="graveFIO2_sinValor"
                    value="XX"
                    onChange={gestionarCambioValor}
                  />
                  <label for="graveFIO2_sinValor" class="form-check-label">
                    (sin valor)
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="graveFIO2"
                    id="graveFIO2_si"
                    value="SI"
                    onChange={gestionarCambioValor}
                  />
                  <label for="graveFIO2_si" class="form-check-label">
                    Sí
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="graveFIO2"
                    id="graveFIO2_no"
                    value="NO"
                    onChange={gestionarCambioValor}
                  />
                  <label for="graveFIO2_no" class="form-check-label">
                    No
                  </label>
                </div>
              </div>

              <div className="col-4">
                <label class="form-label">Dias Post-Estabilizacion</label>
                <InputGroup>
                  <input
                    className="form-control"
                    type="number"
                    required
                    maxLength="3"
                    min="0"
                    max="299"
                    step="0.01"
                    value={valoresFormulario.v23_dias_posestabilizacion}
                    onChange={gestionarCambioValor}
                  />
                  <span class="input-group-text">dias</span>

                  <div class="invalid-feedback">
                    Por favor ingrese el número de días de post-estabilización.
                  </div>
                </InputGroup>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-2">
                <label class="form-label">Ventilacion Mecanica</label>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="ventilacion"
                    id="ventilacion_sinValor"
                    value="XX"
                    onChange={gestionarCambioValor}
                  />
                  <label for="ventilacion_sinValor" class="form-check-label">
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="ventilacion"
                    id="ventilacion_si"
                    value="SI"
                    onChange={gestionarCambioValor}
                  />
                  <label for="ventilacion_si" class="form-check-label">
                    Sí
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="ventilacion"
                    id="ventilacion_no"
                    value="NO"
                    onChange={gestionarCambioValor}
                  />
                  <label for="ventilacion_no" class="form-check-label">
                    No
                  </label>
                </div>
              </div>

              <div className="col-2">
                <label class="form-label">Cirugía Realizada</label>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="cirugia"
                    id="cirugia_sinValor"
                    value="XX"
                    onChange={gestionarCambioValor}
                  />
                  <label for="cirugia_sinValor" class="form-check-label">
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="cirugia"
                    id="cirugia_si"
                    value="SI"
                    onChange={gestionarCambioValor}
                  />
                  <label for="cirugia_si" class="form-check-label">
                    Sí
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="cirugia"
                    id="cirugia_no"
                    value="NO"
                    onChange={gestionarCambioValor}
                  />
                  <label for="cirugia_no" class="form-check-label">
                    No
                  </label>
                </div>
              </div>

              <div className="col-2">
                <label class="form-label">Cirugía Realizada Mismo dia</label>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="cirugiaMD"
                    id="cirugiaMD_sinValor"
                    value="XX"
                    onChange={gestionarCambioValor}
                  />
                  <label for="cirugiaMD_sinValor" class="form-check-label">
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="cirugiaMD"
                    id="cirugiaMD_si"
                    value="SI"
                    onChange={gestionarCambioValor}
                  />
                  <label for="cirugiaMD_si" class="form-check-label">
                    Sí
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="cirugiaMD"
                    id="cirugiaMD_no"
                    value="NO"
                    onChange={gestionarCambioValor}
                  />
                  <label for="cirugiaMD_no" class="form-check-label">
                    No
                  </label>
                </div>
              </div>

              <div className="col-2">
                <label class="form-label">Hemodialisis Realizada</label>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="hemodialisis"
                    id="hemodialisis_sinValor"
                    value="XX"
                    onChange={gestionarCambioValor}
                  />
                  <label for="hemodialisis_sinValor" class="form-check-label">
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="hemodialisis"
                    id="hemodialisis_si"
                    value="SI"
                    onChange={gestionarCambioValor}
                  />
                  <label for="hemodialisis_si" class="form-check-label">
                    Sí
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="hemodialisis"
                    id="hemodialisis_no"
                    value="NO"
                    onChange={gestionarCambioValor}
                  />
                  <label for="hemodialisis_no" class="form-check-label">
                    No
                  </label>
                </div>
              </div>

              <div className="col-2">
                <label class="form-label">
                  Hemodialisis Realizada mismo dia
                </label>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="hemodialisisMD"
                    id="hemodialisisMD_sinValor"
                    value="XX"
                    onChange={gestionarCambioValor}
                  />
                  <label for="hemodialisisMD_sinValor" class="form-check-label">
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="hemodialisisMD"
                    id="hemodialisisMD_si"
                    value="SI"
                    onChange={gestionarCambioValor}
                  />
                  <label for="hemodialisisMD_si" class="form-check-label">
                    Sí
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="hemodialisisMD"
                    id="hemodialisisMD_no"
                    value="NO"
                    onChange={gestionarCambioValor}
                  />
                  <label for="hemodialisisMD_no" class="form-check-label">
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-2">
                <label class="form-label">Endoscopia Realizada</label>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="endoscopia"
                    id="endoscopia_sinValor"
                    value="XX"
                    onChange={gestionarCambioValor}
                  />
                  <label for="endoscopia_sinValor" class="form-check-label">
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="endoscopia"
                    id="endoscopia_si"
                    value="SI"
                    onChange={gestionarCambioValor}
                  />
                  <label for="endoscopia_si" class="form-check-label">
                    Sí
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="endoscopia"
                    id="endoscopia_no"
                    value="NO"
                    onChange={gestionarCambioValor}
                  />
                  <label for="endoscopia_no" class="form-check-label">
                    No
                  </label>
                </div>
              </div>

              <div className="col-2">
                <label class="form-label">Endoscopia Realizada mismo dia</label>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="endoscopiaMD"
                    id="endoscopiaMD_sinValor"
                    value="XX"
                    onChange={gestionarCambioValor}
                  />
                  <label for="endoscopiaMD_sinValor" class="form-check-label">
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="endoscopiaMD"
                    id="endoscopiaMD_si"
                    value="SI"
                    onChange={gestionarCambioValor}
                  />
                  <label for="endoscopiaMD_si" class="form-check-label">
                    Sí
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="endoscopiaMD"
                    id="endoscopiaMD_no"
                    value="NO"
                    onChange={gestionarCambioValor}
                  />
                  <label for="endoscopiaMD_no" class="form-check-label">
                    No
                  </label>
                </div>
              </div>

              <div className="col-2">
                <label class="form-label">Dialisis</label>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="dialisis"
                    id="dialisis_sinValor"
                    value="XX"
                    onChange={gestionarCambioValor}
                  />
                  <label for="dialisis_sinValor" class="form-check-label">
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="dialisis"
                    id="dialisis_si"
                    value="SI"
                    onChange={gestionarCambioValor}
                  />
                  <label for="dialisis_si" class="form-check-label">
                    Sí
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="dialisis"
                    id="dialisis_no"
                    value="NO"
                    onChange={gestionarCambioValor}
                  />
                  <label for="dialisis_no" class="form-check-label">
                    No
                  </label>
                </div>
              </div>

              <div className="col-2">
                <label class="form-label">Trombolisis Realizada</label>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="trombolisis"
                    id="trombolisis_sinValor"
                    value="XX"
                    onChange={gestionarCambioValor}
                  />
                  <label for="trombolisis_sinValor" class="form-check-label">
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="trombolisis"
                    id="trombolisis_si"
                    value="SI"
                    onChange={gestionarCambioValor}
                  />
                  <label for="trombolisis_si" class="form-check-label">
                    Sí
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="trombolisis"
                    id="trombolisis_no"
                    value="NO"
                    onChange={gestionarCambioValor}
                  />
                  <label for="trombolisis_no" class="form-check-label">
                    No
                  </label>
                </div>
              </div>

              <div className="col-2">
                <label class="form-label">
                  Trombolisis Realizada mismo dia
                </label>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="trombolisisMD"
                    id="trombolisisMD_sinValor"
                    value="XX"
                    onChange={gestionarCambioValor}
                  />
                  <label for="trombolisisMD_sinValor" class="form-check-label">
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="trombolisisMD"
                    id="trombolisisMD_si"
                    value="SI"
                    onChange={gestionarCambioValor}
                  />
                  <label for="trombolisisMD_si" class="form-check-label">
                    Sí
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="trombolisisMD"
                    id="trombolisisMD_no"
                    value="NO"
                    onChange={gestionarCambioValor}
                  />
                  <label for="trombolisisMD_no" class="form-check-label">
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-2">
                <label class="form-label">PCR</label>
                <InputGroup>
                  <input
                    className="form-control"
                    type="number"
                    maxLength="5"
                    min="0.01"
                    max="299"
                    step="0.01"
                    value={valoresFormulario.v40_pcr}
                    onChange={gestionarCambioValor}
                  />

                  <span class="input-group-text">mg/dL</span>
                </InputGroup>
              </div>

              <div className="col-2">
                <label class="form-label">Hemoglobina</label>
                <InputGroup>
                  <input
                    className="form-control"
                    type="number"
                    maxLength="5"
                    min="0.01"
                    max="299"
                    step="0.01"
                    value={valoresFormulario.v41_hemoglobina}
                    onChange={gestionarCambioValor}
                  />

                  <span class="input-group-text">g/dL</span>
                </InputGroup>
              </div>

              <div className="col-2">
                <label class="form-label">Creatinina</label>
                <InputGroup>
                  <input
                    className="form-control"
                    type="number"
                    maxLength="5"
                    min="0.01"
                    max="100"
                    step="0.01"
                    value={valoresFormulario.v42_creatinina}
                    onChange={gestionarCambioValor}
                  />

                  <span class="input-group-text">mg/dL</span>
                </InputGroup>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-2">
                <label class="form-label">Nitrógeno Ureico</label>
                <InputGroup>
                  <input
                    className="form-control"
                    type="number"
                    maxLength="5"
                    min="0.01"
                    max="100"
                    step="0.01"
                    value={valoresFormulario.v43_nitrogeno_ureico}
                    onChange={gestionarCambioValor}
                  />

                  <span class="input-group-text">mg/dL</span>
                </InputGroup>
              </div>

              <div className="col-2">
                <label class="form-label">Sodio</label>
                <InputGroup>
                  <input
                    className="form-control"
                    type="number"
                    maxLength="5"
                    min="0.01"
                    max="100"
                    step="0.01"
                    value={valoresFormulario.v44_sodio}
                    onChange={gestionarCambioValor}
                  />

                  <span class="input-group-text">mEq/dL</span>
                </InputGroup>
              </div>

              <div className="col-2">
                <label class="form-label">Potasio</label>
                <InputGroup>
                  <input
                    className="form-control"
                    type="number"
                    maxLength="5"
                    min="0.01"
                    max="100"
                    step="0.01"
                    value={valoresFormulario.v45_potasio}
                    onChange={gestionarCambioValor}
                  />

                  <span class="input-group-text">mEq/dL</span>
                </InputGroup>
              </div>
            </div>

            <div className="row mt-3">
              <div className="required">
                <label class="form-label">Nombre Prestador Privado</label>
                <select
                  className="form-select"
                  as="select"
                  required
                  value={valoresFormulario.v46_nombre_prestador_privado}
                  onChange={gestionarCambioValor}
                >
                  {optionsPrestador.map((option) => (
                    <option value={option.value} key={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div class="invalid-feedback">
                  Por favor seleccione un prestador.
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-1">
                <label class="form-label">DREO</label>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="dreo"
                    id="dreo_sinValor"
                    value="XX"
                    onChange={gestionarCambioValor}
                  />
                  <label for="dreo_sinValor" class="form-check-label">
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="dreo"
                    id="dreo_si"
                    value="SI"
                    onChange={gestionarCambioValor}
                  />
                  <label for="dreo_si" class="form-check-label">
                    Sí
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="dreo"
                    id="dreo_no"
                    value="NO"
                    onChange={gestionarCambioValor}
                  />
                  <label for="dreo_no" class="form-check-label">
                    No
                  </label>
                </div>
              </div>
              <div className="col-2">
                <label class="form-label">Troponinas</label>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="troponinas"
                    id="troponinas_sinValor"
                    value="XX"
                    onChange={gestionarCambioValor}
                  />
                  <label for="troponinas_sinValor" class="form-check-label">
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="troponinas"
                    id="troponinas_si"
                    value="SI"
                    onChange={gestionarCambioValor}
                  />
                  <label for="troponinas_si" class="form-check-label">
                    Sí
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="troponinas"
                    id="troponinas_no"
                    value="NO"
                    onChange={gestionarCambioValor}
                  />
                  <label for="troponinas_no" class="form-check-label">
                    No
                  </label>
                </div>
              </div>

              <div className="col-2">
                <label class="form-label">EGC alterado</label>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="egc"
                    id="egc_sinValor"
                    value="XX"
                    onChange={gestionarCambioValor}
                  />
                  <label for="egc_sinValor" class="form-check-label">
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="egc"
                    id="egc_si"
                    value="SI"
                    onChange={gestionarCambioValor}
                  />
                  <label for="egc_si" class="form-check-label">
                    Sí
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="egc"
                    id="egc_no"
                    value="NO"
                    onChange={gestionarCambioValor}
                  />
                  <label for="egc_no" class="form-check-label">
                    No
                  </label>
                </div>
              </div>

              <div className="col-2">
                <label class="form-label">RNM protocolo stroke</label>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="rnm"
                    id="rnm_sinValor"
                    value="XX"
                    onChange={gestionarCambioValor}
                  />
                  <label for="rnm_sinValor" class="form-check-label">
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="rnm"
                    id="rnm_si"
                    value="SI"
                    onChange={gestionarCambioValor}
                  />
                  <label for="rnm_si" class="form-check-label">
                    Sí
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="rnm"
                    id="rnm_no"
                    value="NO"
                    onChange={gestionarCambioValor}
                  />
                  <label for="rnm_no" class="form-check-label">
                    No
                  </label>
                </div>
              </div>

              <div className="col-1">
                <label class="form-label">DVA</label>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="dva"
                    id="dva_sinValor"
                    value="XX"
                    onChange={gestionarCambioValor}
                  />
                  <label for="dva_sinValor" class="form-check-label">
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="dva"
                    id="dva_si"
                    value="SI"
                    onChange={gestionarCambioValor}
                  />
                  <label for="dva_si" class="form-check-label">
                    Sí
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="dva"
                    id="dva_no"
                    value="NO"
                    onChange={gestionarCambioValor}
                  />
                  <label for="dva_no" class="form-check-label">
                    No
                  </label>
                </div>
              </div>

              <div className="col-2">
                <label class="form-label">Transfusiones</label>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="transfusiones"
                    id="transfusiones_sinValor"
                    value="XX"
                    onChange={gestionarCambioValor}
                  />
                  <label for="transfusiones_sinValor" class="form-check-label">
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="transfusiones"
                    id="transfusiones_si"
                    value="SI"
                    onChange={gestionarCambioValor}
                  />
                  <label for="transfusiones_si" class="form-check-label">
                    Sí
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="transfusiones"
                    id="transfusiones_no"
                    value="NO"
                    onChange={gestionarCambioValor}
                  />
                  <label for="transfusiones_no" class="form-check-label">
                    No
                  </label>
                </div>
              </div>
              <div className="col-2">
                <label class="form-label">Compromiso conciencia</label>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="compromisoConsciencia"
                    id="compromisoConsciencia_sinValor"
                    value="XX"
                    onChange={gestionarCambioValor}
                  />
                  <label
                    for="compromisoConsciencia_sinValor"
                    class="form-check-label"
                  >
                    (sin valor)
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="compromisoConsciencia"
                    id="compromisoConsciencia_si"
                    value="SI"
                    onChange={gestionarCambioValor}
                  />
                  <label
                    for="compromisoConsciencia_si"
                    class="form-check-label"
                  >
                    Sí
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="compromisoConsciencia"
                    id="compromisoConsciencia_no"
                    value="NO"
                    onChange={gestionarCambioValor}
                  />
                  <label
                    for="compromisoConsciencia_no"
                    class="form-check-label"
                  >
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-2">
                <label class="form-label">NO Pertinencia (segun Control)</label>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    inline
                    label="(sin valor)"
                    name="noPertinencia"
                    id="noPertinencia_sinValor"
                    value="XX"
                    onChange={gestionarCambioValor}
                  />
                  <label for="noPertinencia_sinValor" class="form-check-label">
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    inline
                    label="Si"
                    name="noPertinencia"
                    id="noPertinencia_si"
                    value="SI"
                    onChange={gestionarCambioValor}
                  />
                  <label for="noPertinencia_si" class="form-check-label">
                    Sí
                  </label>
                </div>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    inline
                    label="No"
                    name="noPertinencia"
                    id="noPertinencia_no"
                    value="NO"
                    onChange={gestionarCambioValor}
                  />
                  <label for="noPertinencia_no" class="form-check-label">
                    No
                  </label>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              {loading && (
                <div className="d-flex">
                  <div
                    className="spinner-border text-warning"
                    role="status"
                  ></div>
                  <button className="btn btn-warning btn-sm" disabled>
                    {" "}
                    Procesando...
                  </button>
                </div>
              )}
            </div>

            <div className="row mt-4 ">
              <div className="col-2">
                <button
                  type="submit"
                  className="btn btn-primary d-flex align-items-center"
                >
                  <em className="material-icons md-18">save</em>
                  Enviar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default FormularioVector;
