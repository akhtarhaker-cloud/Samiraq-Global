"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { productSchema, settingsSchema } from "@/lib/validations";

function field(formData: FormData, name: string) { return String(formData.get(name) ?? ""); }
async function audit(action: string, entityType: string, entityId?: string) {
  const { supabase, user } = await requireAdmin();
  await supabase.from("admin_audit_log").insert({ actor_id: user.id, action, entity_type: entityType, entity_id: entityId || null });
}

export async function saveProduct(formData: FormData) {
  const raw = { id: field(formData, "id") || undefined, slug: field(formData, "slug"), name: field(formData, "name"), localName: field(formData, "localName"), description: field(formData, "description"), imageUrl: field(formData, "imageUrl"), rate: field(formData, "rate") || null, unit: field(formData, "unit") || null, isActive: formData.get("isActive") === "on", position: field(formData, "position") || "0" };
  const parsed = productSchema.safeParse(raw); if (!parsed.success) throw new Error("Invalid product information.");
  const { supabase } = await requireAdmin(); const item = parsed.data;
  const record = { slug: item.slug, name: item.name, local_name: item.localName, description: item.description, image_url: item.imageUrl, rate: item.rate ?? null, unit: item.unit ?? null, is_active: item.isActive, position: item.position };
  const response = item.id ? await supabase.from("products").update(record).eq("id", item.id) : await supabase.from("products").insert(record);
  if (response.error) throw new Error(response.error.message); await audit(item.id ? "update" : "create", "product", item.id); revalidatePath("/"); revalidatePath("/admin/products");
}

export async function deleteProduct(formData: FormData) {
  const id = field(formData, "id"); const { supabase } = await requireAdmin(); const { error } = await supabase.from("products").delete().eq("id", id); if (error) throw new Error(error.message); await audit("delete", "product", id); revalidatePath("/"); revalidatePath("/admin/products");
}

export async function saveSettings(formData: FormData) {
  const raw = Object.fromEntries(["brandName", "tagline", "ownerName", "businessType", "heroEyebrow", "heroHeading", "heroHighlight", "heroLead", "heroSubline", "aboutIntro", "aboutDetail", "mission", "vision", "email", "phonePrimary", "phoneSecondary", "whatsappNumber", "location", "pin", "mapsUrl", "gstNumber", "udyamNumber", "iecNumber", "logoUrl", "heroImageUrl", "facebookUrl", "instagramUrl", "linkedinUrl", "youtubeUrl"].map((key) => [key, field(formData, key)]));
  const parsed = settingsSchema.safeParse(raw); if (!parsed.success) throw new Error("Invalid website settings."); const v = parsed.data; const { supabase } = await requireAdmin();
  const { error } = await supabase.from("site_settings").update({ brand_name: v.brandName, tagline: v.tagline, owner_name: v.ownerName, business_type: v.businessType, hero_eyebrow: v.heroEyebrow, hero_heading: v.heroHeading, hero_highlight: v.heroHighlight, hero_lead: v.heroLead, hero_subline: v.heroSubline, about_intro: v.aboutIntro, about_detail: v.aboutDetail, mission: v.mission, vision: v.vision, email: v.email, phone_primary: v.phonePrimary, phone_secondary: v.phoneSecondary, whatsapp_number: v.whatsappNumber, location: v.location, pin: v.pin, maps_url: v.mapsUrl || null, gst_number: v.gstNumber || null, udyam_number: v.udyamNumber || null, iec_number: v.iecNumber || null, logo_url: v.logoUrl, hero_image_url: v.heroImageUrl, facebook_url: v.facebookUrl || null, instagram_url: v.instagramUrl || null, linkedin_url: v.linkedinUrl || null, youtube_url: v.youtubeUrl || null }).eq("id", true);
  if (error) throw new Error(error.message); await audit("update", "site_settings"); revalidatePath("/"); revalidatePath("/admin/content"); revalidatePath("/admin/settings");
}

export async function saveList(formData: FormData) {
  const listType = field(formData, "listType"); if (listType !== "why_choose_us" && listType !== "quality_claim") throw new Error("Invalid list.");
  const items = field(formData, "items").split("\n").map((value) => value.trim()).filter(Boolean); const { supabase } = await requireAdmin();
  const { error: removeError } = await supabase.from("site_list_items").delete().eq("list_type", listType); if (removeError) throw new Error(removeError.message);
  if (items.length) { const { error } = await supabase.from("site_list_items").insert(items.map((content, index) => ({ list_type: listType, content, position: index + 1 }))); if (error) throw new Error(error.message); }
  await audit("update", listType); revalidatePath("/"); revalidatePath("/admin/content");
}

export async function markEnquiryRead(formData: FormData) { const id = field(formData, "id"); const { supabase } = await requireAdmin(); await supabase.from("enquiries").update({ status: "read" }).eq("id", id); await audit("mark_read", "enquiry", id); revalidatePath("/admin/enquiries"); revalidatePath("/admin"); }
export async function signOut() { const { supabase } = await requireAdmin(); await supabase.auth.signOut(); redirect("/admin/login"); }
