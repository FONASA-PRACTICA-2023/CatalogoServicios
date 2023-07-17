import React, { useState } from "react";
import MenuSuperior from "./MenuSuperior";
import { useOutlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import constantes from "./constantes.json";

function LayoutFonasa() {
  const [sidebar, setSidebar] = useState(false); // Nueva variable de estado

  const outlet = useOutlet();
  const { usuario_jwt } = useAuth();

  // ...

  if (!usuario_jwt()) {
    return <Navigate to={constantes.logout} />;
  }

  return (
    <>
      <MenuSuperior user={usuario_jwt()} sidebar={sidebar} setSidebar={setSidebar} />
      <main className={`container h-100 ${sidebar ? 'content-shifted' : ''}`}>{outlet}</main>
    </>
  );
}

export default LayoutFonasa;


