import { usePermissionContext } from "./PermissionContext";

export function usePermission(permission: string) {
  const { hasPermission } = usePermissionContext();
  return hasPermission(permission);
}