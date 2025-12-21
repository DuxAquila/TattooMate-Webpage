import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import bcrypt from "bcryptjs";

const dbUrl = process.env.DATABASE_URL?.trim();
if (!dbUrl) throw new Error("DATABASE_URL fehlt in .env");

// Adapter (Prisma 7)
const adapter = new PrismaMariaDb(dbUrl);

// Client MUSS mit adapter gebaut werden
const prisma = new PrismaClient({ adapter });

const PERMISSIONS = [
  // ===== Admin =====
  { key: "canAccessAdmin", label: "Admin Zugriff", category: "Admin", sort: 10 },
  { key: "canManageAdmins", label: "Admins verwalten", category: "Admin", sort: 20 },

  // ===== News =====
  { key: "canReadNewsAdmin", label: "News im Admin lesen", category: "News", sort: 10 },
  { key: "canCreateNews", label: "News erstellen", category: "News", sort: 20 },
  { key: "canEditNews", label: "News bearbeiten", category: "News", sort: 30 },
  { key: "canPublishNews", label: "News veröffentlichen", category: "News", sort: 40 },
  { key: "canDeleteNews", label: "News löschen", category: "News", sort: 50 },

  // ===== Inbox =====
  { key: "canReadInbox", label: "Inbox lesen", category: "Inbox", sort: 10 },
  { key: "canUpdateInbox", label: "Inbox bearbeiten", category: "Inbox", sort: 20 },
  { key: "canDeleteInbox", label: "Inbox löschen", category: "Inbox", sort: 30 },

  // ===== Social (später) =====
  { key: "canQueueSocialPosts", label: "Social Posts einplanen", category: "Social", sort: 10 },
  { key: "canManageSocialAccounts", label: "Social Accounts verwalten", category: "Social", sort: 20 },
] as const;

const ROLES = [
  { key: "ROOT", label: "Root" },
  { key: "EDITOR", label: "Editor" },
  { key: "SUPPORT", label: "Support" },
  { key: "VIEWER", label: "Viewer" },
] as const;

// Deine Entscheidung: EDITOR hat keine Inbox-Rechte (A)
const ROLE_DEFAULTS: Record<string, string[]> = {
  ROOT: PERMISSIONS.map((p) => p.key),

  EDITOR: [
    "canAccessAdmin",
    "canReadNewsAdmin",
    "canCreateNews",
    "canEditNews",
    "canPublishNews",
    // delete bleibt default false
  ],

  SUPPORT: [
    "canAccessAdmin",
    "canReadInbox",
    "canUpdateInbox",
    // keine News-Rechte default
  ],

  VIEWER: [
    "canAccessAdmin",
    "canReadNewsAdmin",
    "canReadInbox", // read-only
  ],
};

async function main() {
  // 1) Permissions upsert
  for (const p of PERMISSIONS) {
    await prisma.permission.upsert({
      where: { key: p.key },
      update: {
        label: p.label,
        category: p.category,
        sort: p.sort,
      },
      create: {
        key: p.key,
        label: p.label,
        category: p.category,
        sort: p.sort,
      },
    });
  }

  // 2) Roles upsert
  for (const r of ROLES) {
    await prisma.adminRole.upsert({
      where: { key: r.key },
      update: { label: r.label },
      create: { key: r.key, label: r.label },
    });
  }

  // 3) RolePermission defaults setzen
  const perms = await prisma.permission.findMany({ select: { id: true, key: true } });

  const roles: Array<{ id: number; key: string }> = await prisma.adminRole.findMany({ select: { id: true, key: true } });
  const roleIdByKey = new Map<string, number>(roles.map((r: { key: string; id: number }) => [r.key, r.id]));
  const allowedSetByRole = new Map(
    Object.entries(ROLE_DEFAULTS).map(([roleKey, keys]) => [roleKey, new Set(keys)])
  );

  for (const role of roles) {
    const allowedKeys = allowedSetByRole.get(role.key) ?? new Set<string>();

    for (const perm of perms) {
      await prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId: role.id, permissionId: perm.id } },
        update: { allowed: allowedKeys.has(perm.key) },
        create: { roleId: role.id, permissionId: perm.id, allowed: allowedKeys.has(perm.key) },
      });
    }
  }

  // 4) ROOT AdminUser anlegen (bcrypt hash)
  const seedUser = (process.env.SEED_ADMIN_USER ?? "admin").trim();
  const seedPass = (process.env.SEED_ADMIN_PASSWORD ?? "").trim();

  if (!seedPass) {
    throw new Error("SEED_ADMIN_PASSWORD fehlt. (Nur fürs Seeding in .env setzen, danach wieder raus.)");
  }

  const rootRoleId = roleIdByKey.get("ROOT");
  if (!rootRoleId) throw new Error("ROOT role missing");

  const passwordHash = await bcrypt.hash(seedPass, 12);

  await prisma.adminUser.upsert({
    where: { username: seedUser },
    update: {
      passwordHash,
      active: true,
      roleId: rootRoleId,
    },
    create: {
      username: seedUser,
      passwordHash,
      active: true,
      roleId: rootRoleId,
    },
  });

  console.log(`Seed OK: AdminUser '${seedUser}' (ROOT)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

