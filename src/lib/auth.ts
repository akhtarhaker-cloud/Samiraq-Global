import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data: profile } = await supabase.from("admin_profiles").select("role").eq("id", user.id).maybeSingle();
  if (!profile || profile.role !== "admin") redirect("/admin/login?error=unauthorized");
  return { supabase, user };
}
