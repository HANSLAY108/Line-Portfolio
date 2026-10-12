/**
 * Seed script — creates the admin user for Line Morelle's CMS.
 *
 * Usage:
 *   node supabase/seed-admin.mjs
 *
 * Required environment variables (reads from .env.local automatically):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *
 * Optional (defaults shown):
 *   ADMIN_EMAIL=hello@linemorelle.com
 *   ADMIN_PASSWORD=LM-Adm1n!Tmp2026#Xk
 */

import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";

// ---------- load .env.local ----------
function loadEnv(filePath) {
  try {
    const content = readFileSync(filePath, "utf8");
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const idx = trimmed.indexOf("=");
      if (idx < 1) continue;
      const key = trimmed.slice(0, idx).trim();
      let value = trimmed.slice(idx + 1).trim();
      // strip surrounding quotes
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // no .env.local — rely on actual env
  }
}

loadEnv(".env.local");
loadEnv(".env");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey || serviceRoleKey === "your_service_role_key") {
  console.error(
    "❌  Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local",
  );
  process.exit(1);
}

const email = process.env.ADMIN_EMAIL || "morelletchouangoua@gmail.com";
const password = process.env.ADMIN_PASSWORD || "LM-Adm1n!Tmp2026#Xk";

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  console.log(`Creating admin user: ${email}`);

  // 1. Create auth user (or get existing)
  const { data: createData, error: createError } =
    await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

  let userId;

  if (createError) {
    if (
      createError.message.includes("already been registered") ||
      createError.message.includes("already exists")
    ) {
      console.log("  ℹ  User already exists, fetching by email...");
      const { data: listData } = await supabase.auth.admin.listUsers();
      const existing = listData?.users?.find((u) => u.email === email);
      if (!existing) {
        console.error("❌  Could not find the existing user.");
        process.exit(1);
      }
      userId = existing.id;

      // Update password to ensure it matches
      await supabase.auth.admin.updateUser(userId, { password });
      console.log("  ✔  Password updated.");
    } else {
      console.error("❌  Error creating user:", createError.message);
      process.exit(1);
    }
  } else {
    userId = createData.user.id;
    console.log("  ✔  Auth user created:", userId);
  }

  // 2. Insert into admin_users
  const { error: adminError } = await supabase
    .from("admin_users")
    .upsert({ user_id: userId }, { onConflict: "user_id" });

  if (adminError) {
    console.error("❌  Error inserting admin_users row:", adminError.message);
    process.exit(1);
  }

  console.log("  ✔  admin_users row ensured.");
  console.log("\n🎉  Admin ready!");
  console.log(`    Email:    ${email}`);
  console.log(`    Password: ${password}`);
  console.log("    (Change this password after first login)\n");
}

main();
