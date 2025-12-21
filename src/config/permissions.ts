export const PERMISSIONS = [
  "canViewContactRequests",
  "canViewDemoRequests",
  "canManageRequests",
  "canManageNews",
  "canEditSettings",
  "canManageUsers",
] as const;

export type PermissionKey = typeof PERMISSIONS[number];

