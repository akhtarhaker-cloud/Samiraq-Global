import { business as fallbackBusiness, products as fallbackProducts, quantityOptions } from "@/lib/site";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type PublicProduct = { id?: string; slug: string; name: string; hindiName: string; description: string; image: string; rate?: number | null; unit?: string | null };
export type PublicSiteData = {
  business: typeof fallbackBusiness;
  content: { heroEyebrow: string; heroHeading: string; heroHighlight: string; heroLead: string; heroSubline: string; aboutIntro: string; aboutDetail: string; mission: string; vision: string; mapsUrl?: string | null };
  products: PublicProduct[]; whyChooseUs: string[]; qualityClaims: string[]; quantityOptions: readonly string[];
};

const fallback: PublicSiteData = {
  business: fallbackBusiness,
  content: {
    heroEyebrow: "FROM INDIA TO THE WORLD", heroHeading: "Premium Indian Spices", heroHighlight: "for Every Kitchen", heroLead: "Pure Taste. Premium Quality. Global Trust.", heroSubline: "From India's Finest Spices to the World's Kitchens",
    aboutIntro: "SAMIRAQ GLOBAL is an Indian spice company dedicated to delivering premium-quality spices with purity, freshness and authentic Indian taste.",
    aboutDetail: "We carefully source products from trusted suppliers and focus on quality, hygiene, customer satisfaction and reliable service for domestic and international buyers.",
    mission: "To provide pure, hygienic and premium-quality Indian spices while building a trusted global brand.", vision: "To become a globally recognized Indian spice brand known for quality, trust and customer satisfaction.",
  },
  products: fallbackProducts.map((product) => ({ ...product })),
  whyChooseUs: ["Premium Quality Spices", "Hygienic Packaging", "Fresh & Authentic Products", "Competitive Prices", "Domestic & Export Supply", "Customer Satisfaction"],
  qualityClaims: ["100% Natural & Pure", "Zero additives", "Hygienic processing", "Maximum freshness", "Careful sourcing", "Professional packaging", "International shipping standards"], quantityOptions,
};

export async function getPublicSiteData(): Promise<PublicSiteData> {
  if (!isSupabaseConfigured) return fallback;
  try {
    const supabase = await createSupabaseServerClient();
    const [{ data: settings }, { data: databaseProducts }, { data: listItems }] = await Promise.all([
      supabase.from("site_settings").select("*").eq("id", true).maybeSingle(),
      supabase.from("products").select("*").eq("is_active", true).order("position"),
      supabase.from("site_list_items").select("*").order("position"),
    ]);
    if (!settings) return fallback;
    const business = { ...fallback.business, name: settings.brand_name, tagline: settings.tagline, owner: settings.owner_name, businessType: settings.business_type, email: settings.email, phones: [settings.phone_primary, settings.phone_secondary], whatsapp: settings.whatsapp_number, location: settings.location, pin: settings.pin, registrations: { gst: settings.gst_number || "", udyam: settings.udyam_number || "", iec: settings.iec_number || "" }, social: { facebook: settings.facebook_url || "", instagram: settings.instagram_url || "", linkedin: settings.linkedin_url || "", youtube: settings.youtube_url || "" }, assets: { logo: settings.logo_url, hero: settings.hero_image_url } } as typeof fallbackBusiness;
    return {
      business,
      content: { heroEyebrow: settings.hero_eyebrow, heroHeading: settings.hero_heading, heroHighlight: settings.hero_highlight, heroLead: settings.hero_lead, heroSubline: settings.hero_subline, aboutIntro: settings.about_intro, aboutDetail: settings.about_detail, mission: settings.mission, vision: settings.vision, mapsUrl: settings.maps_url },
      products: (databaseProducts || []).map((product) => ({ id: product.id, slug: product.slug, name: product.name, hindiName: product.local_name, description: product.description, image: product.image_url, rate: product.rate, unit: product.unit })),
      whyChooseUs: (listItems || []).filter((item) => item.list_type === "why_choose_us").map((item) => item.content), qualityClaims: (listItems || []).filter((item) => item.list_type === "quality_claim").map((item) => item.content), quantityOptions,
    };
  } catch { return fallback; }
}
