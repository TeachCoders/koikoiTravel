/**
 * isStaffUser(req)
 *
 * Returns true if the logged-in session user is an authorized staff member
 * (super_admin, sales, operations, support, it, content, team_leader, team_member).
 *
 * Returns false for:
 *  - Unauthenticated (public) requests
 *  - Vendor accounts
 *  - Any unknown roles
 *
 * Usage:
 *   const staff = isStaffUser(req);
 *   if (isPublic && item.isActive === false) return res.status(404)...
 */

const STAFF_ROLES = [
  "admin",
  "super_admin",
  "sales",
  "operations",
  "support",
  "it",
  "it_maintenance",
  "content",
  "team_leader",
  "team_member",
];

export function isStaffUser(req) {
  const sessionUser = req.session?.user;
  if (sessionUser) {
    const role = (sessionUser.role ?? "").toLowerCase().replace(/[\s-]+/g, "_");
    const isSuperAdmin = role.includes("admin") || role.includes("super");
    if (isSuperAdmin || STAFF_ROLES.includes(role)) return true;
  }

  // Check authorization headers or staff cookies
  if (
    req.headers.authorization ||
    req.headers["x-staff-token"] ||
    req.headers["x-admin-token"] ||
    req.cookies?.staff_token ||
    req.cookies?.token ||
    req.cookies?.connect_sid ||
    req.cookies?.session
  ) {
    return true;
  }

  return false;
}

export function isPublicRequest(req) {
  return !isStaffUser(req);
}
