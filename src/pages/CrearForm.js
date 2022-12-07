import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { crearVector } from "../components/servicios";
import constantes from "../components/constantes.json";
import useApiSnoopy from "../hooks/useApiSnoopy";
import {
  optionsGlasgow,
  optionsPrestador,
  optionsSubTipoCama,
  optionsTipoCama,
} from "./CrearForm.colecciones";
import InputGroup from "../components/custom/InputGroup";
import { useAuth } from "../hooks/useAuth";

const CrearForm = () => {
  const [estadoValidacionFormulario, setEstadoValidacionFormulario] =
    useState("needs-validation");

  const [loading, setLoading] = useState(false);
  let apiSnoopy = useApiSnoopy();

  const navigate = useNavigate();

  useEffect(() => {
    apiSnoopy.getPrestadores();
  }, []);

  const [idVector, setIdVector] = useState("");
  const [v1_sexo, setSexo] = useState("");
  const [v2_ant_cardio, setAntCardiacos] = useState("");
  const [v3_ant_diab, setAntDiabetes] = useState("");
  const [v4_ant_ht, setAntHT] = useState("");
  const [v6_triage, setTriage] = useState("");
  const [v7_pa_sist_alta, setPAAlta] = useState("");
  const [v8_pa_diast_baja, setPABaja] = useState("");
  const [v9_pa_media, setPAMedia] = useState("");
  const [v10_temperatura, setTemperatura] = useState("");
  const [v11_sat_o2, setSatO2] = useState("");
  const [v12_fr_cardio, setFrecCardiaca] = useState("");
  const [v13_fr_resp, setFrecRespiratoria] = useState("");
  const [v14_edad_anos, setEdad] = useState("");
  const [v17_tp_cama, setTipoCama] = useState("");
  const [v18_subclas_tipo_cama, setSubtipoCama] = useState("");
  const [v19_glasgow, setGlasgow] = useState("");
  const [v20_fio2, setFIO2] = useState("");
  const [v21_grave_fio2, setGraveFIO2] = useState("");
  const [v22_dias_estab, setDiasEstab] = useState("");
  const [v23_dias_posestab, setDiasPostEstab] = useState("");
  const [v24_vent_mec, setVentilacion] = useState("");
  const [v25_cx_realizada, setCirugia] = useState("");
  const [v26_cx_mdi, setCirugiaMD] = useState("");
  const [v27_hemodx_realizada, setHemodialisis] = useState("");
  const [v28_hemodx_mdi, setHemodialisisMD] = useState("");
  const [v29_endoscopia, setEndoscopia] = useState("");
  const [v30_endoscop_mdi, setEndoscopiaMD] = useState("");
  const [v31_dialisis, setDialisis] = useState("");
  const [v35_trombolisis, setTrombolisis] = useState("");
  const [v36_tromboli_mdi, setTrombolisisMD] = useState("");
  const [v40_pcr, setPCR] = useState("");
  const [v41_hemoglobina, setHemoglobina] = useState("");
  const [v42_creatinina, setCreatinina] = useState("");
  const [v43_nitrogeno_ureico, setNitrogenoUreico] = useState("");
  const [v44_sodio, setSodio] = useState("");
  const [v45_potasio, setPotasio] = useState("");
  const [v46_nom_prestador_priv, setPrestador] = useState("");
  const [v47_dreo, setDreo] = useState("");
  const [v48_troponinas, setTroponinas] = useState("");
  const [v49_ecg_alterado, setEgc] = useState("");
  const [v50_rnm_protocolo_stroke, setRnm] = useState("");
  const [v51_dva, setDva] = useState("");
  const [v52_transfusiones, setTransfusiones] = useState("");
  const [v53_compromiso_conciencia, setCompromisoConsciencia] = useState("");
  const [no_pert_control, setNoPertinenciaControl] = useState("");

  // eslint-disable-next-line no-unused-vars
  const [validated, setValidated] = useState(false);
  let { user } = useAuth();
  // eslint-disable-next-line no-unused-vars
  const [usuario, setUsuario] = useState(user.run);

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
          idVector,
          vector: {
            v1_sexo,
            v2_ant_cardio,
            v3_ant_diab,
            v4_ant_ht,
            v6_triage,
            v7_pa_sist_alta,
            v8_pa_diast_baja,
            v9_pa_media,
            v10_temperatura,
            v11_sat_o2,
            v12_fr_cardio,
            v13_fr_resp,
            v14_edad_anos,
            v17_tp_cama,
            v18_subclas_tipo_cama,
            v19_glasgow,
            v20_fio2,
            v21_grave_fio2,
            v22_dias_estab,
            v23_dias_posestab,
            v24_vent_mec,
            v25_cx_realizada,
            v26_cx_mdi,
            v27_hemodx_realizada,
            v28_hemodx_mdi,
            v29_endoscopia,
            v30_endoscop_mdi,
            v31_dialisis,
            v35_trombolisis,
            v36_tromboli_mdi,
            v40_pcr,
            v41_hemoglobina,
            v42_creatinina,
            v43_nitrogeno_ureico,
            v44_sodio,
            v45_potasio,
            v46_nom_prestador_priv,
            v47_dreo,
            v48_troponinas,
            v49_ecg_alterado,
            v50_rnm_protocolo_stroke,
            v51_dva,
            v52_transfusiones,
            v53_compromiso_conciencia,
            no_pert_control,
          },
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
          <h1>Ingresar Antecedentes Clínicos</h1>
          <form
            noValidate
            onSubmit={handleSubmit}
            className={estadoValidacionFormulario}
          >
            <div className="row mt-3 grupo">
              <div className="col-md-4 ">
                <label className="form-label">
                  Identificador de Caso <span className="text-danger">*</span>{" "}
                </label>

                <input
                  className="form-control"
                  type="text"
                  required
                  value={idVector}
                  onChange={(e) => setIdVector(e.target.value)}
                />

                <div className="invalid-feedback">
                  Por favor ingrese el número de caso.
                </div>
              </div>
              <div className="col-md-4 "> </div>
              <div className="col-md-4 ">
                <label className="form-label">
                  Usuario <span className="text-danger">*</span>
                </label>

                <input
                  className="form-control"
                  type="text"
                  required
                  disabled
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                />

                <div className="invalid-feedback">
                  Por favor ingrese el número de caso.
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-2">
                <label className="form-label">Sexo</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Desconocido"
                    required
                    name="sexo"
                    id="sexo_Desconocido"
                    value="DESCONOCIDO"
                    onChange={(e) => setSexo(e.target.value)}
                  />
                  <label for="sexo_Desconocido" className="form-check-label">
                    {" "}
                    Desconocido
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Masculino"
                    name="sexo"
                    id="sexo_Masculino"
                    value="HOMBRE"
                    onChange={(e) => setSexo(e.target.value)}
                  />
                  <label for="sexo_Masculino" className="form-check-label">
                    {" "}
                    Masculino
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Femenino"
                    name="sexo"
                    id="sexo_Femenino"
                    value="MUJER"
                    onChange={(e) => setSexo(e.target.value)}
                  />
                  <label for="sexo_Femenino" className="form-check-label">
                    {" "}
                    Femenino
                  </label>
                </div>
              </div>
              <div className="col-2">
                <label className="form-label">Antecedentes Cardiacos</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="antCardiacos"
                    id="antCardiacos_sinValor"
                    value="XX"
                    onChange={(e) => setAntCardiacos(e.target.value)}
                  />
                  <label
                    for="antCardiacos_sinValor"
                    className="form-check-label"
                  >
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="antCardiacos"
                    id="antCardiacos_si"
                    value="SI"
                    onChange={(e) => setAntCardiacos(e.target.value)}
                  />
                  <label for="antCardiacos_si" className="form-check-label">
                    {" "}
                    Si
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="antCardiacos"
                    id="antCardiacos_no"
                    value="NO"
                    onChange={(e) => setAntCardiacos(e.target.value)}
                  />
                  <label for="antCardiacos_no" className="form-check-label">
                    {" "}
                    No
                  </label>
                </div>
              </div>

              <div className="col-2">
                <label className="form-label">Antecedentes Diabetes</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="antDiabetes"
                    id="antDiabetes_sinValor"
                    value="XX"
                    onChange={(e) => setAntDiabetes(e.target.value)}
                  />
                  <label
                    for="antDiabetes_sinValor"
                    className="form-check-label"
                  >
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="antDiabetes"
                    id="antDiabetes_si"
                    value="SI"
                    onChange={(e) => setAntDiabetes(e.target.value)}
                  />
                  <label for="antDiabetes_si" className="form-check-label">
                    {" "}
                    Si
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="antDiabetes"
                    id="antDiabetes_no"
                    value="NO"
                    onChange={(e) => setAntDiabetes(e.target.value)}
                  />
                  <label for="antDiabetes_no" className="form-check-label">
                    {" "}
                    No
                  </label>
                </div>
              </div>

              <div className="col-2">
                <label className="form-label">Antecedentes Hipertension</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="antHT"
                    id="antHT_sinValor"
                    value="XX"
                    onChange={(e) => setAntHT(e.target.value)}
                  />
                  <label for="antHT_sinValor" className="form-check-label">
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="antHT"
                    id="antHT_si"
                    value="SI"
                    onChange={(e) => setAntHT(e.target.value)}
                  />
                  <label for="antHT_si" className="form-check-label">
                    {" "}
                    Si
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="antHT"
                    id="antHT_no"
                    value="NO"
                    onChange={(e) => setAntHT(e.target.value)}
                  />
                  <label for="antHT_no" className="form-check-label">
                    {" "}
                    No
                  </label>
                </div>
              </div>

              <div className="col-2">
                <label className="form-label">Triage</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="triage"
                    id="triage_sinValor"
                    value=""
                    onChange={(e) => setTriage(e.target.value)}
                  />
                  <label for="triage_sinValor" className="form-check-label">
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="1"
                    name="triage"
                    id="triage_1"
                    value="1"
                    onChange={(e) => setTriage(e.target.value)}
                  />
                  <label for="triage_1" className="form-check-label">
                    {" "}
                    1
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="2"
                    name="triage"
                    id="triage_2"
                    value="2"
                    onChange={(e) => setTriage(e.target.value)}
                  />
                  <label for="triage_2" className="form-check-label">
                    {" "}
                    2
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="3"
                    name="triage"
                    id="triage_3"
                    value="3"
                    onChange={(e) => setTriage(e.target.value)}
                  />
                  <label for="triage_3" className="form-check-label">
                    {" "}
                    3
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="4"
                    name="triage"
                    id="triage_4"
                    value="4"
                    onChange={(e) => setTriage(e.target.value)}
                  />
                  <label for="triage_4" className="form-check-label">
                    {" "}
                    4
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="5"
                    name="triage"
                    id="triage_5"
                    value="5"
                    onChange={(e) => setTriage(e.target.value)}
                  />
                  <label for="triage_5" className="form-check-label">
                    {" "}
                    5
                  </label>
                </div>
              </div>
            </div>
            <div className="row mt-3 grupo ">
              <div className="col-4">
                <label className="form-label">Presión Sistólica (alta)</label>
                <InputGroup>
                  <input
                    className="form-control"
                    type="number"
                    maxLength="3"
                    min="0"
                    max="299"
                    step="0.01"
                    value={v7_pa_sist_alta}
                    onChange={(e) => setPAAlta(e.target.value)}
                  />

                  <span className="input-group-text">mmHg</span>
                </InputGroup>
              </div>

              <div className="col-4">
                <label className="form-label">Temperatura</label>
                <InputGroup>
                  <input
                    className="form-control"
                    type="number"
                    maxLength="3"
                    min="0"
                    max="50"
                    step="0.01"
                    value={v10_temperatura}
                    onChange={(e) => setTemperatura(e.target.value)}
                  />

                  <span className="input-group-text">°C</span>
                </InputGroup>
              </div>

              <div className="col-4">
                <label className="form-label">Frecuencia Cardiaca</label>
                <InputGroup>
                  <input
                    className="form-control"
                    type="number"
                    maxLength="3"
                    min="0"
                    max="200"
                    step="0.01"
                    value={v12_fr_cardio}
                    onChange={(e) => setFrecCardiaca(e.target.value)}
                  />

                  <span className="input-group-text">lat/min</span>
                </InputGroup>
              </div>
            </div>

            <div className="row mt-3 grupo ">
              <div className="col-4">
                <label className="form-label">Presión Diastólica (baja)</label>
                <InputGroup>
                  <input
                    className="form-control"
                    type="number"
                    maxLength="3"
                    min="0"
                    max="299"
                    step="0.01"
                    value={v8_pa_diast_baja}
                    onChange={(e) => setPABaja(e.target.value)}
                  />

                  <span className="input-group-text">mmHg</span>
                </InputGroup>
              </div>

              <div className="col-4">
                <label className="form-label">Saturacion Oxigeno</label>
                <InputGroup>
                  <input
                    className="form-control"
                    type="number"
                    maxLength="3"
                    min="0"
                    max="100"
                    value={v11_sat_o2}
                    onChange={(e) => setSatO2(e.target.value)}
                  />

                  <span className="input-group-text">%</span>
                </InputGroup>
              </div>

              <div className="col-4">
                <label className="form-label">Frecuencia Respiratoria</label>
                <InputGroup>
                  <input
                    className="form-control"
                    type="number"
                    maxLength="3"
                    min="0"
                    max="100"
                    step="0.01"
                    value={v13_fr_resp}
                    onChange={(e) => setFrecRespiratoria(e.target.value)}
                  />

                  <span className="input-group-text">resp/min</span>
                </InputGroup>
              </div>
            </div>

            <div className="row mt-3 grupo ">
              <div className="col-md-4">
                <label className="form-label">Presion Arterial Media</label>
                <InputGroup>
                  <input
                    className="form-control"
                    type="number"
                    maxLength="3"
                    min="0"
                    max="299"
                    step="0.01"
                    value={v9_pa_media}
                    onChange={(e) => setPAMedia(e.target.value)}
                  />

                  <span className="input-group-text">mmHg</span>
                </InputGroup>
              </div>
            </div>

            <div className="row mt-3 grupo ">
              <div className="col-4">
                <label className="form-label">Edad</label>
                <InputGroup>
                  <input
                    className="form-control"
                    type="number"
                    required
                    maxLength="3"
                    min="0"
                    max="150"
                    value={v14_edad_anos}
                    onChange={(e) => setEdad(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Por favor ingrese la edad.
                  </div>

                  <span className="input-group-text">años</span>
                </InputGroup>
              </div>

              <div className="col-4">
                <label className="form-label">Tipo Cama</label>
                <select
                  className="form-select"
                  as="select"
                  value={v17_tp_cama}
                  onChange={(e) => setTipoCama(e.target.value)}
                >
                  {optionsTipoCama.map((option) => (
                    <option value={option.value} key={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-4">
                <label className="form-label">Subtipo Cama</label>
                <select
                  className="form-select"
                  as="select"
                  value={v18_subclas_tipo_cama}
                  onChange={(e) => setSubtipoCama(e.target.value)}
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
                <label className="form-label">Glasgow</label>
                <select
                  className="form-select"
                  as="select"
                  value={v19_glasgow}
                  onChange={(e) => setGlasgow(e.target.value)}
                >
                  {optionsGlasgow.map((option) => (
                    <option value={option.value} key={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-4">
                <label className="form-label">FIO2</label>
                <InputGroup>
                  <input
                    className="form-control"
                    type="number"
                    value={v20_fio2}
                    onChange={(e) => setFIO2(e.target.value)}
                  />

                  <span className="input-group-text">%</span>
                </InputGroup>
              </div>

              <div className="col-4">
                <label className="form-label">Dias Estabilización</label>
                <InputGroup>
                  <input
                    className="form-control"
                    type="number"
                    required
                    maxLength="3"
                    min="0"
                    max="299"
                    step="0.01"
                    value={v22_dias_estab}
                    onChange={(e) => setDiasEstab(e.target.value)}
                  />

                  <span className="input-group-text">dias</span>

                  <div className="invalid-feedback">
                    Por favor ingrese el número de días de estabilización.
                  </div>
                </InputGroup>
              </div>
            </div>

            <div className="row mt-3 grupo ">
              <div className="col-4"></div>
              <div className="col-4">
                <label className="form-label">Grave FIO2</label>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="graveFIO2"
                    id="graveFIO2_sinValor"
                    value="XX"
                    onChange={(e) => setGraveFIO2(e.target.value)}
                  />
                  <label for="graveFIO2_sinValor" className="form-check-label">
                    (sin valor)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="graveFIO2"
                    id="graveFIO2_si"
                    value="SI"
                    onChange={(e) => setGraveFIO2(e.target.value)}
                  />
                  <label for="graveFIO2_si" className="form-check-label">
                    Sí
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="graveFIO2"
                    id="graveFIO2_no"
                    value="NO"
                    onChange={(e) => setGraveFIO2(e.target.value)}
                  />
                  <label for="graveFIO2_no" className="form-check-label">
                    No
                  </label>
                </div>
              </div>

              <div className="col-4">
                <label className="form-label">Dias Post-Estabilizacion</label>
                <InputGroup>
                  <input
                    className="form-control"
                    type="number"
                    required
                    maxLength="3"
                    min="0"
                    max="299"
                    step="0.01"
                    value={v23_dias_posestab}
                    onChange={(e) => setDiasPostEstab(e.target.value)}
                  />
                  <span className="input-group-text">dias</span>

                  <div className="invalid-feedback">
                    Por favor ingrese el número de días de post-estabilización.
                  </div>
                </InputGroup>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-2">
                <label className="form-label">Ventilacion Mecanica</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="ventilacion"
                    id="ventilacion_sinValor"
                    value="XX"
                    onChange={(e) => setVentilacion(e.target.value)}
                  />
                  <label
                    for="ventilacion_sinValor"
                    className="form-check-label"
                  >
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="ventilacion"
                    id="ventilacion_si"
                    value="SI"
                    onChange={(e) => setVentilacion(e.target.value)}
                  />
                  <label for="ventilacion_si" className="form-check-label">
                    Sí
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="ventilacion"
                    id="ventilacion_no"
                    value="NO"
                    onChange={(e) => setVentilacion(e.target.value)}
                  />
                  <label for="ventilacion_no" className="form-check-label">
                    No
                  </label>
                </div>
              </div>

              <div className="col-2">
                <label className="form-label">Cirugía Realizada</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="cirugia"
                    id="cirugia_sinValor"
                    value="XX"
                    onChange={(e) => setCirugia(e.target.value)}
                  />
                  <label for="cirugia_sinValor" className="form-check-label">
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="cirugia"
                    id="cirugia_si"
                    value="SI"
                    onChange={(e) => setCirugia(e.target.value)}
                  />
                  <label for="cirugia_si" className="form-check-label">
                    Sí
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="cirugia"
                    id="cirugia_no"
                    value="NO"
                    onChange={(e) => setCirugia(e.target.value)}
                  />
                  <label for="cirugia_no" className="form-check-label">
                    No
                  </label>
                </div>
              </div>

              <div className="col-2">
                <label className="form-label">
                  Cirugía Realizada Mismo dia
                </label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="cirugiaMD"
                    id="cirugiaMD_sinValor"
                    value="XX"
                    onChange={(e) => setCirugiaMD(e.target.value)}
                  />
                  <label for="cirugiaMD_sinValor" className="form-check-label">
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="cirugiaMD"
                    id="cirugiaMD_si"
                    value="SI"
                    onChange={(e) => setCirugiaMD(e.target.value)}
                  />
                  <label for="cirugiaMD_si" className="form-check-label">
                    Sí
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="cirugiaMD"
                    id="cirugiaMD_no"
                    value="NO"
                    onChange={(e) => setCirugiaMD(e.target.value)}
                  />
                  <label for="cirugiaMD_no" className="form-check-label">
                    No
                  </label>
                </div>
              </div>

              <div className="col-2">
                <label className="form-label">Hemodialisis Realizada</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="hemodialisis"
                    id="hemodialisis_sinValor"
                    value="XX"
                    onChange={(e) => setHemodialisis(e.target.value)}
                  />
                  <label
                    for="hemodialisis_sinValor"
                    className="form-check-label"
                  >
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="hemodialisis"
                    id="hemodialisis_si"
                    value="SI"
                    onChange={(e) => setHemodialisis(e.target.value)}
                  />
                  <label for="hemodialisis_si" className="form-check-label">
                    Sí
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="hemodialisis"
                    id="hemodialisis_no"
                    value="NO"
                    onChange={(e) => setHemodialisis(e.target.value)}
                  />
                  <label for="hemodialisis_no" className="form-check-label">
                    No
                  </label>
                </div>
              </div>

              <div className="col-2">
                <label className="form-label">
                  Hemodialisis Realizada mismo dia
                </label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="hemodialisisMD"
                    id="hemodialisisMD_sinValor"
                    value="XX"
                    onChange={(e) => setHemodialisisMD(e.target.value)}
                  />
                  <label
                    for="hemodialisisMD_sinValor"
                    className="form-check-label"
                  >
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="hemodialisisMD"
                    id="hemodialisisMD_si"
                    value="SI"
                    onChange={(e) => setHemodialisisMD(e.target.value)}
                  />
                  <label for="hemodialisisMD_si" className="form-check-label">
                    Sí
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="hemodialisisMD"
                    id="hemodialisisMD_no"
                    value="NO"
                    onChange={(e) => setHemodialisisMD(e.target.value)}
                  />
                  <label for="hemodialisisMD_no" className="form-check-label">
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-2">
                <label className="form-label">Endoscopia Realizada</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="endoscopia"
                    id="endoscopia_sinValor"
                    value="XX"
                    onChange={(e) => setEndoscopia(e.target.value)}
                  />
                  <label for="endoscopia_sinValor" className="form-check-label">
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="endoscopia"
                    id="endoscopia_si"
                    value="SI"
                    onChange={(e) => setEndoscopia(e.target.value)}
                  />
                  <label for="endoscopia_si" className="form-check-label">
                    Sí
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="endoscopia"
                    id="endoscopia_no"
                    value="NO"
                    onChange={(e) => setEndoscopia(e.target.value)}
                  />
                  <label for="endoscopia_no" className="form-check-label">
                    No
                  </label>
                </div>
              </div>

              <div className="col-2">
                <label className="form-label">
                  Endoscopia Realizada mismo dia
                </label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="endoscopiaMD"
                    id="endoscopiaMD_sinValor"
                    value="XX"
                    onChange={(e) => setEndoscopiaMD(e.target.value)}
                  />
                  <label
                    for="endoscopiaMD_sinValor"
                    className="form-check-label"
                  >
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="endoscopiaMD"
                    id="endoscopiaMD_si"
                    value="SI"
                    onChange={(e) => setEndoscopiaMD(e.target.value)}
                  />
                  <label for="endoscopiaMD_si" className="form-check-label">
                    Sí
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="endoscopiaMD"
                    id="endoscopiaMD_no"
                    value="NO"
                    onChange={(e) => setEndoscopiaMD(e.target.value)}
                  />
                  <label for="endoscopiaMD_no" className="form-check-label">
                    No
                  </label>
                </div>
              </div>

              <div className="col-2">
                <label className="form-label">Dialisis</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="dialisis"
                    id="dialisis_sinValor"
                    value="XX"
                    onChange={(e) => setDialisis(e.target.value)}
                  />
                  <label for="dialisis_sinValor" className="form-check-label">
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="dialisis"
                    id="dialisis_si"
                    value="SI"
                    onChange={(e) => setDialisis(e.target.value)}
                  />
                  <label for="dialisis_si" className="form-check-label">
                    Sí
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="dialisis"
                    id="dialisis_no"
                    value="NO"
                    onChange={(e) => setDialisis(e.target.value)}
                  />
                  <label for="dialisis_no" className="form-check-label">
                    No
                  </label>
                </div>
              </div>

              <div className="col-2">
                <label className="form-label">Trombolisis Realizada</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="trombolisis"
                    id="trombolisis_sinValor"
                    value="XX"
                    onChange={(e) => setTrombolisis(e.target.value)}
                  />
                  <label
                    for="trombolisis_sinValor"
                    className="form-check-label"
                  >
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="trombolisis"
                    id="trombolisis_si"
                    value="SI"
                    onChange={(e) => setTrombolisis(e.target.value)}
                  />
                  <label for="trombolisis_si" className="form-check-label">
                    Sí
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="trombolisis"
                    id="trombolisis_no"
                    value="NO"
                    onChange={(e) => setTrombolisis(e.target.value)}
                  />
                  <label for="trombolisis_no" className="form-check-label">
                    No
                  </label>
                </div>
              </div>

              <div className="col-2">
                <label className="form-label">
                  Trombolisis Realizada mismo dia
                </label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="trombolisisMD"
                    id="trombolisisMD_sinValor"
                    value="XX"
                    onChange={(e) => setTrombolisisMD(e.target.value)}
                  />
                  <label
                    for="trombolisisMD_sinValor"
                    className="form-check-label"
                  >
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="trombolisisMD"
                    id="trombolisisMD_si"
                    value="SI"
                    onChange={(e) => setTrombolisisMD(e.target.value)}
                  />
                  <label for="trombolisisMD_si" className="form-check-label">
                    Sí
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="trombolisisMD"
                    id="trombolisisMD_no"
                    value="NO"
                    onChange={(e) => setTrombolisisMD(e.target.value)}
                  />
                  <label for="trombolisisMD_no" className="form-check-label">
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-2">
                <label className="form-label">PCR</label>
                <InputGroup>
                  <input
                    className="form-control"
                    type="number"
                    maxLength="5"
                    min="0.01"
                    max="299"
                    step="0.01"
                    value={v40_pcr}
                    onChange={(e) => setPCR(e.target.value)}
                  />

                  <span className="input-group-text">mg/dL</span>
                </InputGroup>
              </div>

              <div className="col-2">
                <label className="form-label">Hemoglobina</label>
                <InputGroup>
                  <input
                    className="form-control"
                    type="number"
                    maxLength="5"
                    min="0.01"
                    max="299"
                    step="0.01"
                    value={v41_hemoglobina}
                    onChange={(e) => setHemoglobina(e.target.value)}
                  />

                  <span className="input-group-text">g/dL</span>
                </InputGroup>
              </div>

              <div className="col-2">
                <label className="form-label">Creatinina</label>
                <InputGroup>
                  <input
                    className="form-control"
                    type="number"
                    maxLength="5"
                    min="0.01"
                    max="100"
                    step="0.01"
                    value={v42_creatinina}
                    onChange={(e) => setCreatinina(e.target.value)}
                  />

                  <span className="input-group-text">mg/dL</span>
                </InputGroup>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-2">
                <label className="form-label">Nitrógeno Ureico</label>
                <InputGroup>
                  <input
                    className="form-control"
                    type="number"
                    maxLength="5"
                    min="0.01"
                    max="100"
                    step="0.01"
                    value={v43_nitrogeno_ureico}
                    onChange={(e) => setNitrogenoUreico(e.target.value)}
                  />

                  <span className="input-group-text">mg/dL</span>
                </InputGroup>
              </div>

              <div className="col-2">
                <label className="form-label">Sodio</label>
                <InputGroup>
                  <input
                    className="form-control"
                    type="number"
                    maxLength="5"
                    min="0.01"
                    max="100"
                    step="0.01"
                    value={v44_sodio}
                    onChange={(e) => setSodio(e.target.value)}
                  />

                  <span className="input-group-text">mEq/dL</span>
                </InputGroup>
              </div>

              <div className="col-2">
                <label className="form-label">Potasio</label>
                <InputGroup>
                  <input
                    className="form-control"
                    type="number"
                    maxLength="5"
                    min="0.01"
                    max="100"
                    step="0.01"
                    value={v45_potasio}
                    onChange={(e) => setPotasio(e.target.value)}
                  />

                  <span className="input-group-text">mEq/dL</span>
                </InputGroup>
              </div>
            </div>

            <div className="row mt-3">
              <div className="required">
                <label className="form-label">Nombre Prestador Privado</label>
                <select
                  className="form-select"
                  as="select"
                  required
                  value={v46_nom_prestador_priv}
                  onChange={(e) => setPrestador(e.target.value)}
                >
                  {apiSnoopy.listadoPrestadores &&
                    apiSnoopy.listadoPrestadores.map((option) => (
                      <option value={option.rut} key={option.rut}>
                        {option.nombre}
                      </option>
                    ))}
                </select>
                <div className="invalid-feedback">
                  Por favor seleccione un prestador.
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-1">
                <label className="form-label">DREO</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="dreo"
                    id="dreo_sinValor"
                    value="XX"
                    onChange={(e) => setDreo(e.target.value)}
                  />
                  <label for="dreo_sinValor" className="form-check-label">
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="dreo"
                    id="dreo_si"
                    value="SI"
                    onChange={(e) => setDreo(e.target.value)}
                  />
                  <label for="dreo_si" className="form-check-label">
                    Sí
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="dreo"
                    id="dreo_no"
                    value="NO"
                    onChange={(e) => setDreo(e.target.value)}
                  />
                  <label for="dreo_no" className="form-check-label">
                    No
                  </label>
                </div>
              </div>
              <div className="col-2">
                <label className="form-label">Troponinas</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="troponinas"
                    id="troponinas_sinValor"
                    value="XX"
                    onChange={(e) => setTroponinas(e.target.value)}
                  />
                  <label for="troponinas_sinValor" className="form-check-label">
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="troponinas"
                    id="troponinas_si"
                    value="SI"
                    onChange={(e) => setTroponinas(e.target.value)}
                  />
                  <label for="troponinas_si" className="form-check-label">
                    Sí
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="troponinas"
                    id="troponinas_no"
                    value="NO"
                    onChange={(e) => setTroponinas(e.target.value)}
                  />
                  <label for="troponinas_no" className="form-check-label">
                    No
                  </label>
                </div>
              </div>

              <div className="col-2">
                <label className="form-label">EGC alterado</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="egc"
                    id="egc_sinValor"
                    value="XX"
                    onChange={(e) => setEgc(e.target.value)}
                  />
                  <label for="egc_sinValor" className="form-check-label">
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="egc"
                    id="egc_si"
                    value="SI"
                    onChange={(e) => setEgc(e.target.value)}
                  />
                  <label for="egc_si" className="form-check-label">
                    Sí
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="egc"
                    id="egc_no"
                    value="NO"
                    onChange={(e) => setEgc(e.target.value)}
                  />
                  <label for="egc_no" className="form-check-label">
                    No
                  </label>
                </div>
              </div>

              <div className="col-2">
                <label className="form-label">RNM protocolo stroke</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="rnm"
                    id="rnm_sinValor"
                    value="XX"
                    onChange={(e) => setRnm(e.target.value)}
                  />
                  <label for="rnm_sinValor" className="form-check-label">
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="rnm"
                    id="rnm_si"
                    value="SI"
                    onChange={(e) => setRnm(e.target.value)}
                  />
                  <label for="rnm_si" className="form-check-label">
                    Sí
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="rnm"
                    id="rnm_no"
                    value="NO"
                    onChange={(e) => setRnm(e.target.value)}
                  />
                  <label for="rnm_no" className="form-check-label">
                    No
                  </label>
                </div>
              </div>

              <div className="col-1">
                <label className="form-label">DVA</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="dva"
                    id="dva_sinValor"
                    value="XX"
                    onChange={(e) => setDva(e.target.value)}
                  />
                  <label for="dva_sinValor" className="form-check-label">
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="dva"
                    id="dva_si"
                    value="SI"
                    onChange={(e) => setDva(e.target.value)}
                  />
                  <label for="dva_si" className="form-check-label">
                    Sí
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="dva"
                    id="dva_no"
                    value="NO"
                    onChange={(e) => setDva(e.target.value)}
                  />
                  <label for="dva_no" className="form-check-label">
                    No
                  </label>
                </div>
              </div>

              <div className="col-2">
                <label className="form-label">Transfusiones</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="transfusiones"
                    id="transfusiones_sinValor"
                    value="XX"
                    onChange={(e) => setTransfusiones(e.target.value)}
                  />
                  <label
                    for="transfusiones_sinValor"
                    className="form-check-label"
                  >
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="transfusiones"
                    id="transfusiones_si"
                    value="SI"
                    onChange={(e) => setTransfusiones(e.target.value)}
                  />
                  <label for="transfusiones_si" className="form-check-label">
                    Sí
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="transfusiones"
                    id="transfusiones_no"
                    value="NO"
                    onChange={(e) => setTransfusiones(e.target.value)}
                  />
                  <label for="transfusiones_no" className="form-check-label">
                    No
                  </label>
                </div>
              </div>
              <div className="col-2">
                <label className="form-label">Compromiso conciencia</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="(sin valor)"
                    name="compromisoConsciencia"
                    id="compromisoConsciencia_sinValor"
                    value="XX"
                    onChange={(e) => setCompromisoConsciencia(e.target.value)}
                  />
                  <label
                    for="compromisoConsciencia_sinValor"
                    className="form-check-label"
                  >
                    (sin valor)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="Si"
                    name="compromisoConsciencia"
                    id="compromisoConsciencia_si"
                    value="SI"
                    onChange={(e) => setCompromisoConsciencia(e.target.value)}
                  />
                  <label
                    for="compromisoConsciencia_si"
                    className="form-check-label"
                  >
                    Sí
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    label="No"
                    name="compromisoConsciencia"
                    id="compromisoConsciencia_no"
                    value="NO"
                    onChange={(e) => setCompromisoConsciencia(e.target.value)}
                  />
                  <label
                    for="compromisoConsciencia_no"
                    className="form-check-label"
                  >
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-2">
                <label className="form-label">
                  NO Pertinencia (segun Control)
                </label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    inline
                    label="(sin valor)"
                    name="noPertinencia"
                    id="noPertinencia_sinValor"
                    value="XX"
                    onChange={(e) => setNoPertinenciaControl(e.target.value)}
                  />
                  <label
                    for="noPertinencia_sinValor"
                    className="form-check-label"
                  >
                    {" "}
                    (sin valor)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    inline
                    label="Si"
                    name="noPertinencia"
                    id="noPertinencia_si"
                    value="SI"
                    onChange={(e) => setNoPertinenciaControl(e.target.value)}
                  />
                  <label for="noPertinencia_si" className="form-check-label">
                    Sí
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    inline
                    label="No"
                    name="noPertinencia"
                    id="noPertinencia_no"
                    value="NO"
                    onChange={(e) => setNoPertinenciaControl(e.target.value)}
                  />
                  <label for="noPertinencia_no" className="form-check-label">
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
export default CrearForm;
