import React, { createContext, useContext } from "react";
import { ROLES } from "./roles";

type PermissionContextType = {
  role: string;
  hasPermission: (permission: string) => boolean;
};

export const PermissionContext = createContext<PermissionContextType>({
  role: "ADMIN",
  hasPermission: () => false,
});

export const PermissionProvider: React.FC<{ role: string; children: React.ReactNode }> = ({ role, children }) => {
  const hasPermission = (permission: string) => ROLES[role]?.includes(permission);

  return (
    <PermissionContext.Provider value={{ role, hasPermission }}>
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermissionContext = () => useContext(PermissionContext);