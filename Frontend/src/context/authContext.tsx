import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const navigate = useNavigate();

  // Carregar o token do localStorage ao inicializar
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("authToken", token);
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);