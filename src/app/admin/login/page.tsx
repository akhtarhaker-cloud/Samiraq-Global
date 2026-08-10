"use client";
import { FormEvent, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function AdminLogin() {
  const [message, setMessage] = useState(""); const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setLoading(true); setMessage(""); const data = new FormData(event.currentTarget); try { const supabase = createSupabaseBrowserClient(); const { error } = await supabase.auth.signInWithPassword({ email: String(data.get("email")), password: String(data.get("password")) }); if (error) throw error; window.location.href = "/admin"; } catch { setMessage("Sign-in could not be completed. Check your credentials and Supabase configuration."); setLoading(false); } }
  return <main className="admin-login"><section className="admin-login-card"><p className="eyebrow">SAMIRAQ GLOBAL</p><h1>Administrator sign in</h1><p>Use an authorised Supabase administrator account. Public sign-up is intentionally unavailable.</p><form className="admin-form" onSubmit={submit}><label>Email<input name="email" type="email" required autoComplete="email" /></label><label>Password<input name="password" type="password" required autoComplete="current-password" /></label>{message && <p className="admin-note">{message}</p>}<button type="submit" disabled={loading}>{loading ? "Signing in…" : "Sign in securely"}</button></form></section></main>;
}
