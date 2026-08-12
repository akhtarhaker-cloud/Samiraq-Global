import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { enquirySchema } from "@/lib/validations";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Please check the required enquiry fields." }, { status: 400 });
  try {
    const input = parsed.data;
    const admin = createSupabaseAdminClient();
    const { error } = await admin.from("enquiries").insert({
      enquiry_type: input.enquiryType, name: input.name, company_name: input.companyName || null, email: input.email, phone: input.phone, country: input.country,
      product_name: input.productName, required_quantity: input.requiredQuantity, packaging_requirement: input.packagingRequirement || null, message: input.message || null,
    });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("ENQUIRY ERROR:",error);
    return NextResponse.json({ error: "Enquiries are not configured yet. Please contact us by WhatsApp." }, { status: 503 });
  }
}
