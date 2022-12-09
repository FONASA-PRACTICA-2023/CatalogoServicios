import { useState } from "react";
import axios from "axios";

import { useAuth } from "./useAuth";
import { useCookies } from "react-cookie";

const useApiSnoopy = () => {
  const { token } = useAuth();

  const header_autenticado = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  const [data, setData] = useState(null);
  const [listadoPrestadores, setListadoPrestadores] = useState([]);
  const [listadoServicios, setListadoServicios] = useState([]);
  const [bitacoraVector, setBitacoraVector] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getGenerico = async (url) => {
    console.log("getGenerico >> " + url);
    setLoading(true);
    try {
      let res = await axios.get(url, { headers: header_autenticado });
      setData(res.data);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.log("error", error);
    }
    setLoading(false);
    console.log(data);
    return data;
  };

  const deleteGenerico = async (url, formulario) => {
    console.log("deleteGenerico >> " + url);
    setLoading(true);
    console.log(header_autenticado);
    try {
      await axios
        .delete(url, { headers: header_autenticado, data: formulario })
        .then((res) => {
          setData(res.data);
          setLoading(false);
          setError(null);
        });
    } catch (error) {
      setError(error);
      setLoading(false);
      console.log(error);
    }
  };

  const postGenerico = async (url, formulario) => {
    console.log("postGenerico >> " + url);
    setLoading(true);
    try {
      await axios
        .post(url, formulario, { headers: header_autenticado })
        .then((res) => {
          setData(res.data);
          setLoading(false);
          setError(null);
        });
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const getRegistrosPrestador = async (rut, pagina) => {
    await getGenerico(
      process.env.REACT_APP_WS_REGISTROS_BY_PRESTADOR + rut + "/" + pagina
    );
  };

  const getPrestadores = async () => {
    setLoading(true);
    try {
      let res = await axios.get(process.env.REACT_APP_WS_PRESTADORES, {
        headers: header_autenticado,
      });
      setListadoPrestadores(res.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
    setLoading(false);
    console.log(data);
    console.log(error);
    return data;
  };

  const validarUsuarioSnoopy = async (setUsuario) => {
    let url = process.env.REACT_APP_WS_VALIDAR_USUARIO;
    console.log("validarUsuarioSnoopy >> " + url);
    setLoading(true);
    try {
      let usuarioLogeado = await axios.get(
        process.env.REACT_APP_WS_USER_LOGEADO,
        { headers: header_autenticado }
      );
      let res = await axios.post(url, usuarioLogeado.data, {
        headers: header_autenticado,
      });
      setError(null);
      setUsuario(res.data);
    } catch (error) {
      setUsuario(null);
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getUnVectorByID = async (idCaso, setValoresFormulario) => {
    let url = process.env.REACT_APP_WS_UN_VECTOR + idCaso;

    console.log("getUnVectorByID >> " + url);
    setLoading(true);
    try {
      let res = await axios.get(url, { headers: header_autenticado });
      setValoresFormulario(res.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
    setLoading(false);
    return data;
  };

  const getPrestadoresByRutUsuario = async (rutUsuario) => {
    await getGenerico(
      process.env.REACT_APP_WS_PRESTADORES_DEL_USUARIO + rutUsuario
    );
  };

  const getBitacoraVector = async (pk_registro) => {
    let url = process.env.REACT_APP_WS_BITACORA_VECTOR + pk_registro;
    setLoading(true);
    try {
      let res = await axios.get(url, { headers: header_autenticado });
      setBitacoraVector(res.data.registros);
      setLoading(false);
      setError(null);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
    setLoading(false);
    console.log(bitacoraVector);
    return bitacoraVector;
  };

  const getPrestadoresConRegistros = async () => {
    setLoading(true);
    try {
      let res = await axios.get(
        process.env.REACT_APP_WS_PRESTADORES_CON_REGISTROS,
        { headers: header_autenticado }
      );
      setListadoPrestadores(res.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
    setLoading(false);
    console.log(data);
    return data;
  };

  const crearRegistro = async (
    formulario,
    finalizarFormulario,
    recibirError
  ) => {
    let url = process.env.REACT_APP_WS_CREAR_REGISTRO;

    console.log("crearRegistro >> " + url);
    setLoading(true);
    try {
      await axios
        .post(url, formulario, { headers: header_autenticado })
        .then((res) => {
          setData(res.data);
          setLoading(false);
          setError(null);
          finalizarFormulario();
        });
    } catch (error) {
      recibirError(error);
      setLoading(false);
    }
  };

  const eliminarAntecedenteClinico = async (pk_registro, motivo, usuario) => {
    let request = {
      pk_registro: pk_registro,
      usuario: usuario,
      motivo: motivo,
    };
    await deleteGenerico(process.env.REACT_APP_WS_ELIMINAR_REGISTRO, request);
    console.log(error);
  };

  const loginUsuarioExterno = async (usuario, password, login) => {
    let url = process.env.REACT_APP_WS_LOGIN_EXTERNO;

    const formData = new FormData();
    formData.append("user", usuario);
    formData.append("password", password);

    console.log("loginUsuarioExterno >> " + url);
    setLoading(true);
    try {
      await axios.post(url, formData).then((res) => {
        setData(res.data);
        setLoading(false);
        setError(null);
        login(res.data.user_info);
      });
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data.mensaje);
      setLoading(false);
    }
  };

  const loginUsuarioFonasa = async (usuario, password, login) => {
    let url = process.env.REACT_APP_WS_LOGIN_INTERNO;

    const formData = new FormData();
    formData.append("user", usuario);
    formData.append("password", password);

    console.log("loginUsuarioExterno >> " + url);
    setLoading(true);
    try {
      await axios.post(url, formData).then((res) => {
        setData(res.data);
        setLoading(false);
        setError(null);
        login(res.data.user_info);
      });
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data.mensaje);
      setLoading(false);
    }
  };

  const crearRegistroServicioIntegracion = async (formulario) => {
    let url =
      "https://bhornw6rd7.execute-api.us-east-1.amazonaws.com/dev/servicio";

    console.log("crearRegistroServicioIntegracion >> " + url);
    setLoading(true);
    try {
      await axios
        .post(url, formulario, { headers: header_autenticado })
        .then((res) => {
          setData(res.data);
          setLoading(false);
          setError(null);
        });
    } catch (error) {
      setLoading(false);
    }
  };

  const listarServiciosIntegracion = async () => {
    let url = "https://api.fonasa.cl/ApiGESTIC/gestic-getServicios";
    console.log("listarServiciosIntegracion >> " + url);
    setLoading(true);
    try {
      await axios.get(url, { headers: header_autenticado }).then((res) => {
        setListadoServicios(res.data.registros);
        setLoading(false);
        setError(null);
      });
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    listadoPrestadores,
    bitacoraVector,
    loginUsuarioFonasa,
    loginUsuarioExterno,
    getPrestadoresConRegistros,
    getRegistrosPrestador,
    getUnVectorByID,
    getPrestadoresByRutUsuario,
    validarUsuarioSnoopy,
    getPrestadores,
    crearRegistro,
    eliminarAntecedenteClinico,
    getBitacoraVector,
    crearRegistroServicioIntegracion,
    listadoServicios,
    listarServiciosIntegracion,
  };
};

export default useApiSnoopy;
