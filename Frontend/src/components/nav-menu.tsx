import React from "react";
import { NavLink } from "react-router-dom";

export function MenuComponent() {
  return (
    <div className="flex w-full justify-center">
      <nav className="flex space-x-4 p-2 rounded-sm">
        <NavLink
          to="/home-screen"
          className={({ isActive }) =>
            `block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors ${
              isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/markings-screen"
          className={({ isActive }) =>
            `block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors ${
              isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            }`
          }
        >
          Marcações
        </NavLink>
        <NavLink
          to="/utentes-screen"
          className={({ isActive }) =>
            `block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors ${
              isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            }`
          }
        >
          Utentes
        </NavLink>
        <NavLink
          to="/collaborators-screen"
          className={({ isActive }) =>
            `block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors ${
              isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            }`
          }
        >
          Colaboradores
        </NavLink>
        <NavLink
          to="/services-screen"
          className={({ isActive }) =>
            `block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors ${
              isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            }`
          }
        >
          Serviços
        </NavLink>
        <NavLink
          to="/statistics-screen"
          className={({ isActive }) =>
            `block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors ${
              isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            }`
          }
        >
          Estatistica
        </NavLink>
        <NavLink
          to="/vacance-screen"
          className={({ isActive }) =>
            `block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors ${
              isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            }`
          }
        >
          Definições
        </NavLink>
      </nav>
    </div>
  );
}
