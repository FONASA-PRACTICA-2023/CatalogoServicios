import { BrowserRouter, Route, Routes } from "react-router-dom";
import Logout from "./pages/Logout";
import FormularioLogin from "./pages/login/FormularioLogin";
import LayoutFonasa from "./components/LayoutFonasa";
import LayoutPublico from "./components/LayoutPublico";
import { AuthProvider } from "./hooks/useAuth";
import FormularioServicioIntegracion from "./pages/servicios/FormularioServicioIntegracion";
import ListadoServiciosIntegracion from "./pages/servicios/ListadoServiciosIntegracion";
import Calendario from "./pages/servicios/Calendario";
import Editar from "./pages/servicios/Servicioeditar";
import Monitor from "./pages/servicios/MonitorLogin";
import Grafico from "./pages/servicios/Grafico";
import Ejemplo from "./pages/servicios/ejemplo";
import { CloudOff } from 'react-feather';
import ClaveUnica from "./pages/servicios/inicioClaveUnica";

function AplicacionSnoopy() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<LayoutPublico />}>
            <Route path="/login" element={<FormularioLogin />} />
            <Route path="/login" element={<FormularioLogin />} />
            <Route path="#/cue/callback" element={<ClaveUnica/>} />

            <Route path="/logout" element={<Logout />} />
          </Route>
          <Route element={<LayoutFonasa/>}>
            <Route
              path="/servicio-crear"
              element={<FormularioServicioIntegracion  />}
            />
            <Route
              path="/servicio-ver/:nombre"
              element={<Editar formularioDeshabilitado={true} />}
            />
            <Route
              path="/ejemplo"
              element={<Ejemplo />}
            />
            <Route
              path="/prueba"
              element={<Monitor />}
            />
            <Route
              path="/servicio-editar/:nombre"
              element={<Editar formularioDeshabilitado={false} />}
            />
            <Route
              path="/registros"
              element={<ListadoServiciosIntegracion />}
            />
            <Route
              path="/"
              element={<ListadoServiciosIntegracion />}
            />
            <Route
              path="/calendario"
              element={<Calendario />}
            />
            <Route
              path="/graficos"
              element={<Grafico />}
            />
          </Route>
          <Route path="*" element=
            {
              <div style={{ width: "90%", margin: "0 auto", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <CloudOff className="fs-1 text-primary" style={{ height: "90px", width: "90px", fontSize: "90px" }} />
                <h1 style={{ fontSize: "3rem" }}>Error 404</h1>
                <p style={{ color: "red" }}>Ruta equivocada</p>
              </div>
            }
          />
        </Routes>

      </AuthProvider>
    </BrowserRouter>
  );
}

export default AplicacionSnoopy;
