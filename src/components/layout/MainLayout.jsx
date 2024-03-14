import React from "react";
// import Topbar from "../../scenes/global/Topbar";
import Sidebar from "../../scenes/global/Sidebar";
import { Outlet } from "react-router-dom";
import { useApiContext } from "../../context/ApiContext";

const MainLayout = () => {
  const { generalSettings } = useApiContext();

  if (!generalSettings.isLoggedIn) {
    // Si el usuario no ha iniciado sesión, redirigir a la página de inicio de sesión
    window.location.href = "/"; // Reemplaza "/login" con la ruta de tu página de inicio de sesión
    return null; // No renderizar nada mientras se redirige
  }

  return (
    <div className="app">
      {/* sidebar */}
      <Sidebar />
      <main className="content">
        {/* <Topbar /> */}
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
