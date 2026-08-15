import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validations";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = enquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the required enquiry fields." },
      { status: 400 }
    );
  }

  try {
    const input = parsed.data;

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.ENQUIRY_TO_EMAIL;

    if (!apiKey || !toEmail) {
      throw new Error("Resend environment variables are missing.");
    }

    const emailText = `
New Samiraq Global Enquiry

Name: ${input.name}
Company: ${input.companyName || "-"}
Email: ${input.email}
Phone: ${input.phone}
Country: ${input.country}
Product: ${input.productName}
Required Quantity: ${input.requiredQuantity}
Packaging Requirement: ${input.packagingRequirement || "-"}
Message: ${input.message || "-"}
    `.trim();

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Samiraq Global <onboarding@resend.dev>",
        to: [toEmail],
        reply_to: input.email,
        subject: `New Enquiry: ${input.enquiryType || "General"} - ${input.name}`,
        text: emailText,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("RESEND ERROR:", result);
      throw new Error("Failed to send enquiry email.");
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("ENQUIRY EMAIL ERROR:", error);

    return NextResponse.json(
      {
        error:
          "Enquiry could not be sent right now. Please contact us by WhatsApp.",
      },
      { status: 503 }
    );
  }
}
