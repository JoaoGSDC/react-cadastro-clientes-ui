import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Breadcrumb from "./components/Breadcrumb";
import ClientForm from "./pages/ClientForm";

import Clients from "./pages/Clients";

const RoutesApp: React.FC = () => {
  return (
    <BrowserRouter>
      <Breadcrumb />

      <Routes>
        <Route path="/clientes" element={<Clients />} />
        <Route path="/clientes/cadastrar-cliente" element={<ClientForm />} />
        <Route
          path="/clientes/cadastrar-cliente/:id"
          element={<ClientForm />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;
