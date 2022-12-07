import { BrowserRouter, Route, Routes } from "react-router-dom";

import { HomePage } from "./pages/HomePage";

import Logout from "./pages/Logout";

import LayoutFonasa from "./components/LayoutFonasa";
import LayoutPublico from "./components/LayoutPublico";
import { AuthProvider } from "./hooks/useAuth";

import FormularioServicioIntegracion from "./pages/servicios/FormularioServicioIntegracion";

function AplicacionSnoopy() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<LayoutPublico />}>
            <Route path="/" element={<FormularioServicioIntegracion />} />
          </Route>
          <Route path="/login" element={<HomePage />} />

          <Route path="/logout" element={<Logout />} />
          <Route element={<LayoutFonasa />}></Route>

          <Route path="*" element={() => "404 Not Found"} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AplicacionSnoopy;
