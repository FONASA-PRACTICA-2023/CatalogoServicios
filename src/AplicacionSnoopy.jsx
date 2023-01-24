import { BrowserRouter, Route, Routes } from "react-router-dom";

import Logout from "./pages/Logout";
import FormularioLogin from "./pages/login/FormularioLogin";

import LayoutFonasa from "./components/LayoutFonasa";
import LayoutPublico from "./components/LayoutPublico";
import { AuthProvider } from "./hooks/useAuth";

import FormularioServicioIntegracion from "./pages/servicios/FormularioServicioIntegracion";
import FormularioRequestResponse from "./pages/servicios/FormularioRequestResponse";
import ListadoServiciosIntegracion from "./pages/servicios/ListadoServiciosIntegracion";
import ListadoNuevo from "./pages/servicios/ListadoNuevo";
import VentanaRequest from "./pages/servicios/ventanaRequest";
import FormularioObservacion from "./pages/servicios/FormularioObservacion";
import TablasDeInformacion from "./pages/servicios/TablasDeInformacion";
import Graficos from "./pages/servicios/Graficos"
import Calendario from "./pages/servicios/Calendario";

import { CloudOff } from 'react-feather';

function AplicacionSnoopy() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<LayoutPublico />}>
            <Route path="/login" element={<FormularioLogin />} />

            <Route path="/logout" element={<Logout />} />
          </Route>
          <Route element={<LayoutFonasa />}>
            <Route
              path="/servicio-crear"
              element={<FormularioServicioIntegracion />}
            />
            <Route
              path="/servicio-ver/:id"
              element={<FormularioServicioIntegracion desahabilitado={true} />}
            />
            <Route
              path="/servicio-editar/:id"
              element={<FormularioServicioIntegracion desahabilitado={false} />}
            />
            <Route
              path="/add-request/:id"
              element={<FormularioRequestResponse />}
            />
            {/*  */}
            <Route
              path="/add-observacion/:id"
              element={<FormularioObservacion />}
            />
            {/*  */}
            {/*  */}
            <Route
              path="/tabla-informacion"
              element={<TablasDeInformacion />}
            />
            {/*  */}

            {/*  */}
            <Route
              path="/graficos"
              element={<Graficos />}
            />
            {/*  */}




            <Route
              path="/registros"
              element={<ListadoServiciosIntegracion />}
            />
            <Route
              path="/servicio-url"
              element={<ListadoNuevo />}
            />
            <Route
              path="/"
              element={<ListadoServiciosIntegracion />}
            />
            <Route
              path="/request-ver/:id"
              element={<VentanaRequest />}
            />
          </Route>
          {/*  */}
          <Route
            path="/calendario"
            element={<Calendario />}
          />
          {/*  */}

          {/* <Route path="*" element={() => "404 Not Found"} /> */}
          <Route path="*" element=
            {
              <div style={{ width: "90%", margin: "0 auto", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <CloudOff className="fs-1 text-primary" style={{ height: "90px", width: "90px", fontSize: "90px" }} />
                <h1 style={{ fontSize: "3rem" }}>Error 404</h1>
                <p style={{ color: "red" }}>Ruto equivocada</p>
              </div>
            }
          />
        </Routes>

      </AuthProvider>
    </BrowserRouter>
  );
}

export default AplicacionSnoopy;
