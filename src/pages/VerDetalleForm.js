import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { buscarVectorPorId } from "./servicios";
import Layout from "./components/template/layout";

const VerDetalleForm = () => {
  const navigate = useNavigate();
  let params = useParams();
  const idVector = params.id;
  // declaracion de variables para la respuesta de la API
  const [casoSexo, setCasoSexo] = useState("");
  const [casoAntCardiacos, setCasoAntCardiacos] = useState("");
  const [casoAntDiabetes, setCasoAntDiabetes] = useState("");
  const [casoAntHT, setCasoAntHT] = useState("");
  const [casoTriage, setCasoTriage] = useState("");
  const [casoPAAlta, setCasoPAAlta] = useState("");
  const [casoPABaja, setCasoPABaja] = useState("");
  const [casoPAMedia, setCasoPAMedia] = useState("");
  const [casoTemperatura, setCasoTemperatura] = useState("");
  const [casoSatO2, setCasoSatO2] = useState("");
  const [casoFrecCardiaca, setCasoFrecCardiaca] = useState("");
  const [casoFrecRespiratoria, setCasoFrecRespiratoria] = useState("");
  const [casoEdad, setCasoEdad] = useState("");
  const [casoTipoCama, setCasoTipoCama] = useState("");
  const [casoSubtipoCama, setCasoSubtipoCama] = useState("");
  const [casoGlasgow, setCasoGlasgow] = useState("");
  const [casoFIO2, setCasoFIO2] = useState("");
  const [casoDiasEstab, setCasoDiasEstab] = useState("");
  const [casoGraveFIO2, setCasoGraveFIO2] = useState("");
  const [casoDiasPostEstab, setCasoDiasPostEstab] = useState("");
  const [casoVentilacion, setCasoVentilacion] = useState("");
  const [casoCirugia, setCasoCirugia] = useState("");
  const [casoCirugiaMD, setCasoCirugiaMD] = useState("");
  const [casoHemodialisis, setCasoHemodialisis] = useState("");
  const [casoHemodialisisMD, setCasoHemodialisisMD] = useState("");
  const [casoEndoscopia, setCasoEndoscopia] = useState("");
  const [casoEndoscopiaMD, setCasoEndoscopiaMD] = useState("");
  const [casoDialisis, setCasoDialisis] = useState("");
  const [casoTrombolisis, setCasoTrombolisis] = useState("");
  const [casoTrombolisisMD, setCasoTrombolisisMD] = useState("");
  const [casoPCR, setCasoPCR] = useState("");
  const [casoHemoglobina, setCasoHemoglobina] = useState("");
  const [casoCreatinina, setCasoCreatinina] = useState("");
  const [casoNitrogenoUreico, setCasoNitrogenoUreico] = useState("");
  const [casoSodio, setCasoSodio] = useState("");
  const [casoPotasio, setCasoPotasio] = useState("");
  const [casoPrestador, setCasoPrestador] = useState("");
  const [casoDreo, setCasoDreo] = useState("");
  const [casoTroponinas, setCasoTroponinas] = useState("");
  const [casoEgc, setCasoEgc] = useState("");
  const [casoRnm, setCasoRnm] = useState("");
  const [casoDva, setCasoDva] = useState("");
  const [casoTransfusiones, setCasoTransfusiones] = useState("");
  const [casoCompromisoConsciencia, setCasoCompromisoConsciencia] =
    useState("");
  const [casoNoPertinenciaControl, setCasoNoPertinenciaControl] = useState("");
  const [casoNoPertinencia, setCasoNoPertinencia] = useState("");

  const [casoVersionML, setCasoVersionML] = useState("");

  const loadVector = async () => {
    try {
      const resp = await buscarVectorPorId(idVector);
      const vector = resp.data;
      // mapeo del resultado de la consulta
      setCasoSexo(vector.datosVector.v1_sexo);
      setCasoAntCardiacos(vector.datosVector.v2_ant_cardio);
      setCasoAntDiabetes(vector.datosVector.v3_ant_diab);
      setCasoAntHT(vector.datosVector.v4_ant_ht);
      setCasoTriage(vector.datosVector.v6_triage);
      setCasoPAAlta(vector.datosVector.v7_pa_sist_alta);
      setCasoPABaja(vector.datosVector.v8_pa_diast_baja);
      setCasoPAMedia(vector.datosVector.v9_pa_media);
      setCasoTemperatura(vector.datosVector.v10_temperatura);
      setCasoSatO2(vector.datosVector.v11_sat_o2);
      setCasoFrecCardiaca(vector.datosVector.v12_fr_cardio);
      setCasoFrecRespiratoria(vector.datosVector.v13_fr_resp);
      setCasoEdad(vector.datosVector.v14_edad_anos);
      setCasoTipoCama(vector.datosVector.v17_tp_cama);
      setCasoSubtipoCama(vector.datosVector.v18_subclas_tipo_cama);
      setCasoGlasgow(vector.datosVector.v19_glasgow);
      setCasoFIO2(vector.datosVector.v20_fio2);
      setCasoDiasEstab(vector.datosVector.v22_dias_estab);
      setCasoGraveFIO2(vector.datosVector.v21_grave_fio2);
      setCasoDiasPostEstab(vector.datosVector.v23_dias_posestab);
      setCasoVentilacion(vector.datosVector.v24_vent_mec);
      setCasoCirugia(vector.datosVector.v25_cx_realizada);
      setCasoCirugiaMD(vector.datosVector.v26_cx_mdi);
      setCasoHemodialisis(vector.datosVector.v27_hemodx_realizada);
      setCasoHemodialisisMD(vector.datosVector.v28_hemodx_mdi);
      setCasoEndoscopia(vector.datosVector.v29_endoscopia);
      setCasoEndoscopiaMD(vector.datosVector.v30_endoscop_mdi);
      setCasoDialisis(vector.datosVector.v31_dialisis);
      setCasoTrombolisis(vector.datosVector.v35_trombolisis);
      setCasoTrombolisisMD(vector.datosVector.v36_tromboli_mdi);
      setCasoPCR(vector.datosVector.v40_pcr);
      setCasoHemoglobina(vector.datosVector.v41_hemoglobina);
      setCasoCreatinina(vector.datosVector.v42_creatinina);
      setCasoNitrogenoUreico(vector.datosVector.v43_nitrogeno_ureico);
      setCasoSodio(vector.datosVector.v44_sodio);
      setCasoPotasio(vector.datosVector.v45_potasio);
      setCasoPrestador(vector.datosVector.v46_nom_prestador_priv);
      setCasoDreo(vector.datosVector.v47_dreo);
      setCasoTroponinas(vector.datosVector.v48_troponinas);
      setCasoEgc(vector.datosVector.v49_ecg_alterado);
      setCasoRnm(vector.datosVector.v50_rnm_protocolo_stroke);
      setCasoDva(vector.datosVector.v51_dva);
      setCasoTransfusiones(vector.datosVector.v52_transfusiones);
      setCasoCompromisoConsciencia(
        vector.datosVector.v53_compromiso_conciencia
      );
      setCasoNoPertinenciaControl(vector.datosVector.no_pert_control);

      setCasoNoPertinencia(vector.v57_no_pertinencia);
      setCasoVersionML(vector.versionML);
    } catch (error) {
      alert("Error al cargar datos!");
      navigate("/buscar");
    }
  };

  useEffect(() => {
    loadVector();
  }, []);

  const handleSubmit = async () => {
    navigate("/buscar");
  };

  if (!casoNoPertinencia || !casoVersionML) {
    return (
      <Container>
        <Row>
          <Col>
            <p>Cargando datos...</p>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Layout title="" subtitle="Detalle caso clínico">
      <Container style={{ padding: 16 }}>
        <Row>
          <Col>
            <Form>
              <Form.Row className="text-left">
                <Form.Group>
                  <Form.Label>Id Caso</Form.Label>
                  <Form.Control type="text" value={idVector} readOnly />
                </Form.Group>
              </Form.Row>

              <Form.Row className="text-left">
                <Form.Group as={Col} controlId="formGridSex">
                  <Form.Label>Sexo</Form.Label>
                  <Form.Check
                    type="radio"
                    label="Desconocido"
                    name="sexo"
                    id="sexo_Desconocido"
                    value="DESCONOCIDO"
                    checked={casoSexo === "DESCONOCIDO" ? true : false}
                    //onChange={this.setSexo}
                  />
                  <Form.Check
                    type="radio"
                    label="Masculino"
                    name="sexo"
                    id="sexo_Masculino"
                    value="HOMBRE"
                    checked={casoSexo === "HOMBRE" ? true : false}
                    //onChange={this.setSexo}
                  />
                  <Form.Check
                    type="radio"
                    label="Femenino"
                    name="sexo"
                    id="sexo_Femenino"
                    value="MUJER"
                    checked={casoSexo === "MUJER" ? true : false}
                    //onChange={this.setSexo}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridAntCardiacos">
                  <Form.Label>Antecedentes Cardiacos</Form.Label>
                  <Form.Check
                    type="radio"
                    label="(sin valor)"
                    name="antCardiacos"
                    id="antCardiacos_sinValor"
                    value="NA"
                    checked={casoAntCardiacos === "NA" ? true : false}
                    //onChange={this.setAntCardiacos}
                  />
                  <Form.Check
                    type="radio"
                    label="Si"
                    name="antCardiacos"
                    id="antCardiacos_si"
                    value="SI"
                    checked={casoAntCardiacos === "SI" ? true : false}
                    //onChange={this.setAntCardiacos}
                  />
                  <Form.Check
                    type="radio"
                    label="No"
                    name="antCardiacos"
                    id="antCardiacos_no"
                    value="NO"
                    checked={casoAntCardiacos === "NO" ? true : false}
                    //onChange={this.setAntCardiacos}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridAntDiabetes">
                  <Form.Label>Antecedentes Diabetes</Form.Label>
                  <Form.Check
                    type="radio"
                    label="(sin valor)"
                    name="antDiabetes"
                    id="antDiabetes_sinValor"
                    value="NA"
                    checked={casoAntDiabetes === "NA" ? true : false}
                    //onChange={this.setAntDiabetes}
                  />
                  <Form.Check
                    type="radio"
                    label="Si"
                    name="antDiabetes"
                    id="antDiabetes_si"
                    value="SI"
                    checked={casoAntDiabetes === "SI" ? true : false}
                    //onChange={this.setAntDiabetes}
                  />
                  <Form.Check
                    type="radio"
                    label="No"
                    name="antDiabetes"
                    id="antDiabetes_no"
                    value="NO"
                    checked={casoAntDiabetes === "NO" ? true : false}
                    //onChange={this.setAntDiabetes}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridAntHT">
                  <Form.Label>Antecedentes Hipertension</Form.Label>
                  <Form.Check
                    type="radio"
                    label="(sin valor)"
                    name="antHT"
                    id="antHT_sinValor"
                    value="NA"
                    checked={casoAntHT === "NA" ? true : false}
                    //onChange={this.setAntHT}
                  />
                  <Form.Check
                    type="radio"
                    label="Si"
                    name="antHT"
                    id="antHT_si"
                    value="SI"
                    checked={casoAntHT === "SI" ? true : false}
                    //onChange={this.setAntHT}
                  />
                  <Form.Check
                    type="radio"
                    label="No"
                    name="antHT"
                    id="antHT_no"
                    value="NO"
                    checked={casoAntHT === "NO" ? true : false}
                    //onChange={this.setAntHT}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridTriage">
                  <Form.Label>Triage</Form.Label>
                  <Form.Check
                    type="radio"
                    label="(sin valor)"
                    name="triage"
                    id="triage_sinValor"
                    value="NA"
                    //checked={casoTriage === "" ? true : false}
                    //onChange={this.setTriage}
                  />
                  <Form.Check
                    type="radio"
                    label="1"
                    name="triage"
                    id="triage_1"
                    value="1"
                    checked={casoTriage === 1 ? true : false}
                    //onChange={this.setTriage}
                  />
                  <Form.Check
                    type="radio"
                    label="2"
                    name="triage"
                    id="triage_2"
                    value="2"
                    checked={casoTriage === 2 ? true : false}
                    //onChange={this.setTriage}
                  />
                  <Form.Check
                    type="radio"
                    label="3"
                    name="triage"
                    id="triage_3"
                    value="3"
                    checked={casoTriage === 3 ? true : false}
                    //onChange={this.setTriage}
                  />
                  <Form.Check
                    type="radio"
                    label="4"
                    name="triage"
                    id="triage_4"
                    value="4"
                    checked={casoTriage === 4 ? true : false}
                    //onChange={this.setTriage}
                  />
                  <Form.Check
                    type="radio"
                    label="5"
                    name="triage"
                    id="triage_5"
                    value="5"
                    checked={casoTriage === 5 ? true : false}
                    //onChange={this.setTriage}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row className="text-left dl-horizontal ">
                <Form.Group as={Col}>
                  <Form.Label>Presión Sistólica (alta)</Form.Label>
                  <InputGroup>
                    <Form.Control
                      readOnly
                      type="number"
                      maxlength="3"
                      min="0"
                      max="299"
                      value={casoPAAlta}
                      //onChange={this.setPAAlta}
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>mmHg</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Temperatura</Form.Label>
                  <InputGroup>
                    <Form.Control
                      readOnly
                      type="number"
                      maxlength="3"
                      min="0"
                      max="50"
                      step="0.1"
                      value={casoTemperatura}
                      //onChange={this.setTemperatura}
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>°C</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Frecuencia Cardiaca</Form.Label>
                  <InputGroup>
                    <Form.Control
                      readOnly
                      type="number"
                      maxlength="3"
                      min="0"
                      max="200"
                      value={casoFrecCardiaca}
                      //onChange={this.setFrecCardiaca}
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>lat/min</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>
              </Form.Row>

              <Form.Row className="text-left dl-horizontal ">
                <Form.Group as={Col}>
                  <Form.Label>Presión Diastólica (baja)</Form.Label>
                  <InputGroup>
                    <Form.Control
                      readOnly
                      type="number"
                      maxlength="3"
                      min="0"
                      max="299"
                      value={casoPABaja}
                      //onChange={this.setPABaja}
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>mmHg</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Saturacion Oxigeno</Form.Label>
                  <InputGroup>
                    <Form.Control
                      readOnly
                      type="number"
                      maxlength="3"
                      min="0"
                      max="100"
                      value={casoSatO2}
                      //onChange={this.setSatO2}
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>%</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Frecuencia Respiratoria</Form.Label>
                  <InputGroup>
                    <Form.Control
                      readOnly
                      type="number"
                      maxlength="3"
                      min="0"
                      max="100"
                      value={casoFrecRespiratoria}
                      //onChange={this.setFrecRespiratoria}
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>resp/min</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>
              </Form.Row>

              <Form.Row className="text-left dl-horizontal ">
                <Form.Group as={Col} className="col-md-4">
                  <Form.Label>Presion Arterial Media</Form.Label>
                  <InputGroup>
                    <Form.Control
                      readOnly
                      type="number"
                      maxlength="3"
                      min="0"
                      max="299"
                      step="0.1"
                      value={casoPAMedia}
                      //onChange={this.setPAMedia}
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>mmHg</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>
              </Form.Row>

              <Form.Row className="text-left dl-horizontal ">
                <Form.Group as={Col}>
                  <Form.Label>Edad</Form.Label>
                  <InputGroup>
                    <Form.Control
                      readOnly
                      type="number"
                      maxlength="3"
                      min="0"
                      max="150"
                      value={casoEdad}
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>años</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Tipo Cama</Form.Label>
                  <Form.Control as="select">
                    <option selected value={casoTipoCama}>
                      {casoTipoCama}
                    </option>
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Subtipo Cama</Form.Label>
                  <Form.Control as="select">
                    <option selected value={casoSubtipoCama}>
                      {casoSubtipoCama}
                    </option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>

              <Form.Row className="text-left">
                <Form.Group as={Col}>
                  <Form.Label>Glasgow</Form.Label>
                  <Form.Control as="select">
                    <option selected value={casoGlasgow}>
                      {casoGlasgow}
                    </option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>FIO2</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="number"
                      readOnly
                      value={casoFIO2}
                      //onChange={this.setFIO2}
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>%</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Dias Estabilizacion</Form.Label>
                  <InputGroup>
                    <Form.Control
                      readOnly
                      type="number"
                      maxlength="3"
                      min="0"
                      max="299"
                      value={casoDiasEstab}
                      //onChange={this.setDiasEstab}
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>dias</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>
              </Form.Row>

              <Form.Row className="text-left dl-horizontal ">
                <Form.Group as={Col} className="offset-md-4">
                  <Form.Label>Grave FIO2</Form.Label>
                  <Form.Check
                    type="radio"
                    label="(sin valor)"
                    name="graveFIO2"
                    id="graveFIO2_sinValor"
                    value="NA"
                    checked={casoGraveFIO2 === "NA" ? true : false}
                    //onChange={this.setGraveFIO2}
                  />
                  <Form.Check
                    type="radio"
                    label="Si"
                    name="graveFIO2"
                    id="graveFIO2_si"
                    value="SI"
                    checked={casoGraveFIO2 === "SI" ? true : false}
                    //onChange={this.setGraveFIO2}
                  />
                  <Form.Check
                    type="radio"
                    label="No"
                    name="graveFIO2"
                    id="graveFIO2_no"
                    value="NO"
                    checked={casoGraveFIO2 === "NO" ? true : false}
                    //onChange={this.setGraveFIO2}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Dias Post-Estabilizacion</Form.Label>
                  <InputGroup>
                    <Form.Control
                      readOnly
                      type="number"
                      maxlength="3"
                      min="0"
                      max="299"
                      value={casoDiasPostEstab}
                      //onChange={this.setDiasPostEstab}
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>dias</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>
              </Form.Row>

              <Form.Row className="text-left">
                <Form.Group as={Col}>
                  <Form.Label>Ventilacion Mecanica</Form.Label>
                  <Form.Check
                    type="radio"
                    label="(sin valor)"
                    name="ventilacion"
                    id="ventilacion_sinValor"
                    value="NA"
                    checked={casoVentilacion === "NA" ? true : false}
                    //onChange={this.setVentilacion}
                  />
                  <Form.Check
                    type="radio"
                    label="Si"
                    name="ventilacion"
                    id="ventilacion_si"
                    value="SI"
                    checked={casoVentilacion === "SI" ? true : false}
                    //onChange={this.setVentilacion}
                  />
                  <Form.Check
                    type="radio"
                    label="No"
                    name="ventilacion"
                    id="ventilacion_no"
                    value="NO"
                    checked={casoVentilacion === "NO" ? true : false}
                    //onChange={this.setVentilacion}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Cirugía Realizada</Form.Label>
                  <Form.Check
                    type="radio"
                    label="(sin valor)"
                    name="cirugia"
                    id="cirugia_sinValor"
                    value="NA"
                    checked={casoCirugia === "NA" ? true : false}
                    //onChange={this.setCirugia}
                  />
                  <Form.Check
                    type="radio"
                    label="Si"
                    name="cirugia"
                    id="cirugia_si"
                    value="SI"
                    checked={casoCirugia === "SI" ? true : false}
                    //onChange={this.setCirugia}
                  />
                  <Form.Check
                    type="radio"
                    label="No"
                    name="cirugia"
                    id="cirugia_no"
                    value="NO"
                    checked={casoCirugia === "NO" ? true : false}
                    //onChange={this.setCirugia}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Cirugía Realizada Mismo dia</Form.Label>
                  <Form.Check
                    type="radio"
                    label="(sin valor)"
                    name="cirugiaMD"
                    id="cirugiaMD_sinValor"
                    value="NA"
                    checked={casoCirugiaMD === "NA" ? true : false}
                    //onChange={this.setCirugiaMD}
                  />
                  <Form.Check
                    type="radio"
                    label="Si"
                    name="cirugiaMD"
                    id="cirugiaMD_si"
                    value="SI"
                    checked={casoCirugiaMD === "SI" ? true : false}
                    //onChange={this.setCirugiaMD}
                  />
                  <Form.Check
                    type="radio"
                    label="No"
                    name="cirugiaMD"
                    id="cirugiaMD_no"
                    value="NO"
                    checked={casoCirugiaMD === "NO" ? true : false}
                    //onChange={this.setCirugiaMD}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Hemodialisis Realizada</Form.Label>
                  <Form.Check
                    type="radio"
                    label="(sin valor)"
                    name="hemodialisis"
                    id="hemodialisis_sinValor"
                    value="NA"
                    checked={casoHemodialisis === "NA" ? true : false}
                    //onChange={this.setHemodialisis}
                  />
                  <Form.Check
                    type="radio"
                    label="Si"
                    name="hemodialisis"
                    id="hemodialisis_si"
                    value="SI"
                    checked={casoHemodialisis === "SI" ? true : false}
                    //onChange={this.setHemodialisis}
                  />
                  <Form.Check
                    type="radio"
                    label="No"
                    name="hemodialisis"
                    id="hemodialisis_no"
                    value="NO"
                    checked={casoHemodialisis === "NO" ? true : false}
                    //onChange={this.setHemodialisis}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Hemodialisis Realizada mismo dia</Form.Label>
                  <Form.Check
                    type="radio"
                    label="(sin valor)"
                    name="hemodialisisMD"
                    id="hemodialisisMD_sinValor"
                    value="NA"
                    checked={casoHemodialisisMD === "NA" ? true : false}
                    //onChange={this.setHemodialisisMD}
                  />
                  <Form.Check
                    type="radio"
                    label="Si"
                    name="hemodialisisMD"
                    id="hemodialisisMD_si"
                    value="SI"
                    checked={casoHemodialisisMD === "SI" ? true : false}
                    //onChange={this.setHemodialisisMD}
                  />
                  <Form.Check
                    type="radio"
                    label="No"
                    name="hemodialisisMD"
                    id="hemodialisisMD_no"
                    value="NO"
                    checked={casoHemodialisisMD === "NO" ? true : false}
                    //onChange={this.setHemodialisisMD}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row className="text-left">
                <Form.Group as={Col}>
                  <Form.Label>Endoscopia Realizada</Form.Label>
                  <Form.Check
                    type="radio"
                    label="(sin valor)"
                    name="endoscopia"
                    id="endoscopia_sinValor"
                    value="NA"
                    checked={casoEndoscopia === "NA" ? true : false}
                    //onChange={this.setEndoscopia}
                  />
                  <Form.Check
                    type="radio"
                    label="Si"
                    name="endoscopia"
                    id="endoscopia_si"
                    value="SI"
                    checked={casoEndoscopia === "SI" ? true : false}
                    //onChange={this.setEndoscopia}
                  />
                  <Form.Check
                    type="radio"
                    label="No"
                    name="endoscopia"
                    id="endoscopia_no"
                    value="NO"
                    checked={casoEndoscopia === "NO" ? true : false}
                    //onChange={this.setEndoscopia}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Endoscopia Realizada mismo dia</Form.Label>
                  <Form.Check
                    type="radio"
                    label="(sin valor)"
                    name="endoscopiaMD"
                    id="endoscopiaMD_sinValor"
                    value="NA"
                    checked={casoEndoscopiaMD === "NA" ? true : false}
                    //onChange={this.setEndoscopiaMD}
                  />
                  <Form.Check
                    type="radio"
                    label="Si"
                    name="endoscopiaMD"
                    id="endoscopiaMD_si"
                    value="SI"
                    checked={casoEndoscopiaMD === "SI" ? true : false}
                    //onChange={this.setEndoscopiaMD}
                  />
                  <Form.Check
                    type="radio"
                    label="No"
                    name="endoscopiaMD"
                    id="endoscopiaMD_no"
                    value="NO"
                    checked={casoEndoscopiaMD === "NO" ? true : false}
                    //onChange={this.setEndoscopiaMD}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Dialisis</Form.Label>
                  <Form.Check
                    type="radio"
                    label="(sin valor)"
                    name="dialisis"
                    id="dialisis_sinValor"
                    value="NA"
                    checked={casoDialisis === "NA" ? true : false}
                    //onChange={this.setDialisis}
                  />
                  <Form.Check
                    type="radio"
                    label="Si"
                    name="dialisis"
                    id="dialisis_si"
                    value="SI"
                    checked={casoDialisis === "SI" ? true : false}
                    //onChange={this.setDialisis}
                  />
                  <Form.Check
                    type="radio"
                    label="No"
                    name="dialisis"
                    id="dialisis_no"
                    value="NO"
                    checked={casoDialisis === "NO" ? true : false}
                    //onChange={this.setDialisis}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Trombolisis Realizada</Form.Label>
                  <Form.Check
                    type="radio"
                    label="(sin valor)"
                    name="trombolisis"
                    id="trombolisis_sinValor"
                    value="NA"
                    checked={casoTrombolisis === "NA" ? true : false}
                    //onChange={this.setTrombolisis}
                  />
                  <Form.Check
                    type="radio"
                    label="Si"
                    name="trombolisis"
                    id="trombolisis_si"
                    value="SI"
                    checked={casoTrombolisis === "SI" ? true : false}
                    //onChange={this.setTrombolisis}
                  />
                  <Form.Check
                    type="radio"
                    label="No"
                    name="trombolisis"
                    id="trombolisis_no"
                    value="NO"
                    checked={casoTrombolisis === "NO" ? true : false}
                    // onChange={this.setTrombolisis}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Trombolisis Realizada mismo dia</Form.Label>
                  <Form.Check
                    type="radio"
                    label="(sin valor)"
                    name="trombolisisMD"
                    id="trombolisisMD_sinValor"
                    value="NA"
                    checked={casoTrombolisisMD === "NA" ? true : false}
                    // onChange={this.setTrombolisisMD}
                  />
                  <Form.Check
                    type="radio"
                    label="Si"
                    name="trombolisisMD"
                    id="trombolisisMD_si"
                    value="SI"
                    checked={casoTrombolisisMD === "SI" ? true : false}
                    // onChange={this.setTrombolisisMD}
                  />
                  <Form.Check
                    type="radio"
                    label="No"
                    name="trombolisisMD"
                    id="trombolisisMD_no"
                    value="NO"
                    checked={casoTrombolisisMD === "NO" ? true : false}
                    // onChange={this.setTrombolisisMD}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row className="text-left">
                <Form.Group as={Col}>
                  <Form.Label>PCR</Form.Label>
                  <InputGroup>
                    <Form.Control
                      readOnly
                      type="number"
                      maxlength="5"
                      min="0"
                      max="299"
                      step="0.1"
                      value={casoPCR}
                      //   onChange={this.setPCR}
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>mg/dL</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Hemoglobina</Form.Label>
                  <InputGroup>
                    <Form.Control
                      readOnly
                      type="number"
                      maxlength="5"
                      min="0"
                      max="299"
                      step="0.1"
                      value={casoHemoglobina}
                      //onChange={this.setHemoglobina}
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>g/dL</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Creatinina</Form.Label>
                  <InputGroup>
                    <Form.Control
                      readOnly
                      type="number"
                      maxlength="5"
                      min="0"
                      max="100"
                      step="0.1"
                      value={casoCreatinina}
                      //onChange={this.setCreatinina}
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>mg/dL</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>
              </Form.Row>

              <Form.Row className="text-left">
                <Form.Group as={Col}>
                  <Form.Label>Nitrógeno Ureico</Form.Label>
                  <InputGroup>
                    <Form.Control
                      readOnly
                      type="number"
                      maxlength="5"
                      min="0"
                      max="100"
                      step="0.1"
                      value={casoNitrogenoUreico}
                      //onChange={this.setNitrogenoUreico}
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>mg/dL</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Sodio</Form.Label>
                  <InputGroup>
                    <Form.Control
                      readOnly
                      type="number"
                      maxlength="5"
                      min="0"
                      max="100"
                      step="0.1"
                      value={casoSodio}
                      //onChange={this.setSodio}
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>mEq/dL</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Potasio</Form.Label>
                  <InputGroup>
                    <Form.Control
                      readOnly
                      type="number"
                      maxlength="5"
                      min="0"
                      max="100"
                      step="0.1"
                      value={casoPotasio}
                      //onChange={this.setPotasio}
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>mEq/dL</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>
              </Form.Row>

              <Form.Row className="text-left dl-horizontal">
                <Form.Group as={Col} className="col-md-6">
                  <Form.Label>Nombre Prestador Privado</Form.Label>
                  <Form.Control as="select">
                    <option selected value={casoPrestador}>
                      {casoPrestador}
                    </option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>

              <Form.Row className="text-left">
                <Form.Group as={Col} controlId="formGridSex">
                  <Form.Label>DREO</Form.Label>
                  <Form.Check
                    type="radio"
                    label="(sin valor)"
                    name="dreo"
                    id="dreo_sinValor"
                    value="NA"
                    checked={casoDreo === "NA" ? true : false}
                    //onChange={this.setDREO}
                  />
                  <Form.Check
                    type="radio"
                    label="Si"
                    name="dreo"
                    id="dreo_si"
                    value="SI"
                    checked={casoDreo === "SI" ? true : false}
                    //onChange={this.setDREO}
                  />
                  <Form.Check
                    type="radio"
                    label="No"
                    name="dreo"
                    id="dreo_no"
                    value="NO"
                    checked={casoDreo === "NO" ? true : false}
                    //onChange={this.setDREO}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridAntCardiacos">
                  <Form.Label>Troponinas</Form.Label>
                  <Form.Check
                    type="radio"
                    label="(sin valor)"
                    name="troponinas"
                    id="troponinas_sinValor"
                    value="NA"
                    checked={casoTroponinas === "NA" ? true : false}
                    //onChange={this.setTroponinas}
                  />
                  <Form.Check
                    type="radio"
                    label="Si"
                    name="troponinas"
                    id="troponinas_si"
                    value="SI"
                    checked={casoTroponinas === "SI" ? true : false}
                    //onChange={this.setTroponinas}
                  />
                  <Form.Check
                    type="radio"
                    label="No"
                    name="troponinas"
                    id="troponinas_no"
                    value="NO"
                    checked={casoTroponinas === "NO" ? true : false}
                    //onChange={this.setTroponinas}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridAntDiabetes">
                  <Form.Label>EGC alterado</Form.Label>
                  <Form.Check
                    type="radio"
                    label="(sin valor)"
                    name="egc"
                    id="egc_sinValor"
                    value="NA"
                    checked={casoEgc === "NA" ? true : false}
                    //onChange={this.setEGC}
                  />
                  <Form.Check
                    type="radio"
                    label="Si"
                    name="egc"
                    id="egc_si"
                    value="SI"
                    checked={casoEgc === "SI" ? true : false}
                    //onChange={this.setEGC}
                  />
                  <Form.Check
                    type="radio"
                    label="No"
                    name="egc"
                    id="egc_no"
                    value="NO"
                    checked={casoEgc === "NO" ? true : false}
                    //onChange={this.setEGC}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridAntHT">
                  <Form.Label>RNM protocolo stroke</Form.Label>
                  <Form.Check
                    type="radio"
                    label="(sin valor)"
                    name="rnm"
                    id="rnm_sinValor"
                    value="NA"
                    checked={casoRnm === "NA" ? true : false}
                    //onChange={this.setRNM}
                  />
                  <Form.Check
                    type="radio"
                    label="Si"
                    name="rnm"
                    id="rnm_si"
                    value="SI"
                    checked={casoRnm === "SI" ? true : false}

                    //onChange={this.setRNM}
                  />
                  <Form.Check
                    type="radio"
                    label="No"
                    name="rnm"
                    id="rnm_no"
                    value="NO"
                    checked={casoRnm === "NO" ? true : false}
                    //onChange={this.setRNM}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridTriage">
                  <Form.Label>DVA</Form.Label>
                  <Form.Check
                    type="radio"
                    label="(sin valor)"
                    name="dva"
                    id="dva_sinValor"
                    value="NA"
                    checked={casoDva === "NA" ? true : false}
                    //onChange={this.setDVA}
                  />
                  <Form.Check
                    type="radio"
                    label="Si"
                    name="dva"
                    id="dva_si"
                    value="SI"
                    checked={casoDva === "SI" ? true : false}
                    //onChange={this.setDVA}
                  />
                  <Form.Check
                    type="radio"
                    label="No"
                    name="dva"
                    id="dva_no"
                    value="NO"
                    checked={casoDva === "NO" ? true : false}
                    //onChange={this.setDVA}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridTriage">
                  <Form.Label>Transfusiones</Form.Label>
                  <Form.Check
                    type="radio"
                    label="(sin valor)"
                    name="transfusiones"
                    id="transfusiones_sinValor"
                    value="NA"
                    checked={casoTransfusiones === "NA" ? true : false}
                    //onChange={this.setTransfusion}
                  />
                  <Form.Check
                    type="radio"
                    label="Si"
                    name="transfusiones"
                    id="transfusiones_si"
                    value="SI"
                    checked={casoTransfusiones === "SI" ? true : false}
                    //onChange={this.setTransfusion}
                  />
                  <Form.Check
                    type="radio"
                    label="No"
                    name="transfusiones"
                    id="transfusiones_no"
                    value="NO"
                    checked={casoTransfusiones === "NO" ? true : false}
                    //onChange={this.setTransfusion}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridTriage">
                  <Form.Label>Compromiso conciencia</Form.Label>
                  <Form.Check
                    type="radio"
                    label="(sin valor)"
                    name="compromisoConsciencia"
                    id="compromisoConsciencia_sinValor"
                    value="NA"
                    checked={casoCompromisoConsciencia === "NA" ? true : false}
                    //onChange={this.setCompromisoConsciencia}
                  />
                  <Form.Check
                    type="radio"
                    label="Si"
                    name="compromisoConsciencia"
                    id="compromisoConsciencia_si"
                    value="SI"
                    checked={casoCompromisoConsciencia === "SI" ? true : false}
                    //onChange={this.setCompromisoConsciencia}
                  />
                  <Form.Check
                    type="radio"
                    label="No"
                    name="compromisoConsciencia"
                    id="compromisoConsciencia_no"
                    value="NO"
                    checked={casoCompromisoConsciencia === "NO" ? true : false}
                    //onChange={this.setCompromisoConsciencia}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row className="text-left dl-horizontal">
                <Form.Group
                  as={Col}
                  controlId="formGridTriage"
                  className="offset-md-2"
                >
                  <Form.Label style={{ color: "blue" }}>
                    NO Pertinencia (segun Control)
                  </Form.Label>

                  <Form.Check
                    type="radio"
                    label="(sin valor)"
                    name="noPertinenciaControl"
                    id="noPertinenciaControl_sinValor"
                    value="NA"
                    checked={casoNoPertinenciaControl === "NA" ? true : false}
                    //onChange={this.setNoPertinencia}
                  />
                  <Form.Check
                    type="radio"
                    label="Si"
                    name="noPertinenciaControl"
                    id="noPertinenciaControl_si"
                    value="SI"
                    checked={casoNoPertinenciaControl === "SI" ? true : false}
                    //onChange={this.setNoPertinencia}
                  />
                  <Form.Check
                    type="radio"
                    label="No"
                    name="noPertinenciaControl"
                    id="noPertinenciaControl_no"
                    value="NO"
                    checked={casoNoPertinenciaControl === "NO" ? true : false}
                    //onChange={this.setNoPertinencia}
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  controlId="formGridTriage"
                  className="offset-md-1"
                >
                  <Form.Label style={{ color: "red" }}>
                    NO Pertinencia (segun Web Service)
                  </Form.Label>
                  <Form.Check
                    type="radio"
                    label="(sin valor)"
                    name="noPertinencia"
                    id="noPertinencia_sinValor"
                    value="NA"
                    checked={casoNoPertinencia === "NA" ? true : false}
                    //onChange={this.setNoPertinencia}
                  />
                  <Form.Check
                    type="radio"
                    label="Si"
                    name="noPertinencia"
                    id="noPertinencia_si"
                    value="SI"
                    checked={casoNoPertinencia === "SI" ? true : false}
                    //onChange={this.setNoPertinencia}
                  />
                  <Form.Check
                    type="radio"
                    label="No"
                    name="noPertinencia"
                    id="noPertinencia_no"
                    value="NO"
                    checked={casoNoPertinencia === "NO" ? true : false}
                    //onChange={this.setNoPertinencia}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row className="text-left">
                <Form.Group
                  as={Row}
                  controlId="formGridTriage"
                  className="offset-md-4"
                >
                  <Form.Label>Version ML</Form.Label>
                  <Form.Control
                    readOnly
                    type="text"
                    maxlength="3"
                    value={casoVersionML}
                    //onChange={this.setEdad}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Group>
                <Button variant="primary" onClick={handleSubmit}>
                  Volver
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default VerDetalleForm;
