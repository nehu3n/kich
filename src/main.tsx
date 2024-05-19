import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Toaster } from "sonner";
import "./styles.css";

import App from "./App";
import AccountsPage from "./pages/Accounts";
import KeysPage from "./pages/Keys";
import TransferPage from "./pages/Transfer";
import ConfigurationPage from "./pages/Configuration";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

import { hasMasterKey } from "./lib/keys";

const register = await hasMasterKey();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Toaster />
    <BrowserRouter>
      <Routes>
        {!register ? (
          <Route path="/" element={<RegisterPage />} />
        ) : (
          <Route path="/" element={<LoginPage />} />
        )}
        <Route path="/app" element={<App />}>
          <Route path="accounts" element={<AccountsPage />} />
          <Route path="keys" element={<KeysPage />} />
          <Route path="transfer" element={<TransferPage />} />
          <Route path="configuration" element={<ConfigurationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
