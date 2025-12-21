import type { PermissionKey } from "./permissions";

export type AdminUser = {
  username: string;
  passwordHash: string; // z.B. scrypt hash, wie du es eh machst
  perms: PermissionKey[];
};

function must(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

/**
 * Erwartet JSON in ADMIN_USERS, z.B.:
 * [
 *  {"username":"admin","passwordHash":"...","perms":["canManageNews","canEditSettings","canViewContactRequests","canViewDemoRequests","canManageRequests"]}
 * ]
 */
export function loadAdminUsers(): AdminUser[] {
  const raw = must("ADMIN_USERS");
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) throw new Error("ADMIN_USERS must be an array");
  return parsed as AdminUser[];
}

