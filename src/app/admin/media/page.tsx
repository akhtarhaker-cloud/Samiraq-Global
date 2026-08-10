import { AdminShell } from "@/components/admin/AdminShell";
import { MediaManager } from "@/components/admin/MediaManager";
import { requireAdmin } from "@/lib/auth";
export default async function MediaAdmin() { await requireAdmin(); return <AdminShell><div className="admin-title"><div><h1>Media library</h1><p>Upload approved website imagery. Existing supplied local assets remain preserved.</p></div></div><section className="admin-panel"><h2>Upload image</h2><MediaManager /></section></AdminShell>; }
