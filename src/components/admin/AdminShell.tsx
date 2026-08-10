import Link from "next/link";
import { signOut } from "@/app/admin/actions";

const links = [["Overview", "/admin"], ["Products", "/admin/products"], ["Website Content", "/admin/content"], ["Contact & Social", "/admin/settings"], ["Enquiries", "/admin/enquiries"], ["Media Library", "/admin/media"]];
export function AdminShell({ children }: { children: React.ReactNode }) { return <div className="admin-shell"><aside className="admin-sidebar"><Link href="/admin" className="admin-brand">SAMIRAQ <span>ADMIN</span></Link><nav>{links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</nav><form action={signOut}><button type="submit">Sign out</button></form></aside><main className="admin-main">{children}</main></div>; }
