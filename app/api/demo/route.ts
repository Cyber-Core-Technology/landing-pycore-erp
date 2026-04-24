import { NextRequest, NextResponse } from "next/server";

export interface DemoFormData {
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  plan: string;
  usuarios: string;
  mensaje?: string;
}

async function sendEmailViaResend(data: DemoFormData): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.includes("xxxx")) return false;

  const html = `
    <h2>Nueva solicitud de demo — PyCore ERP</h2>
    <table style="border-collapse:collapse;width:100%;max-width:560px">
      <tr><td style="padding:8px;font-weight:bold;background:#f2f8f6">Nombre</td><td style="padding:8px">${data.nombre}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;background:#f2f8f6">Empresa</td><td style="padding:8px">${data.empresa}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;background:#f2f8f6">Email</td><td style="padding:8px">${data.email}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;background:#f2f8f6">Teléfono</td><td style="padding:8px">${data.telefono}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;background:#f2f8f6">Plan interés</td><td style="padding:8px">${data.plan}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;background:#f2f8f6">Usuarios</td><td style="padding:8px">${data.usuarios}</td></tr>
      ${data.mensaje ? `<tr><td style="padding:8px;font-weight:bold;background:#f2f8f6">Mensaje</td><td style="padding:8px">${data.mensaje}</td></tr>` : ""}
    </table>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from:    process.env.EMAIL_FROM    ?? "noreply@pycore.app",
      to:      [process.env.EMAIL_TO     ?? "ventas@pycore.app"],
      subject: `[Demo] ${data.nombre} — ${data.empresa}`,
      html,
    }),
  });

  return res.ok;
}

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as DemoFormData;

    // Validación básica
    if (!data.nombre || !data.email || !data.empresa) {
      return NextResponse.json({ error: "Campos requeridos faltantes" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    // Intentar enviar email
    const sent = await sendEmailViaResend(data);

    if (!sent) {
      // Modo sin email configurado: solo loguea (desarrollo)
      console.log("[Demo request]", JSON.stringify(data, null, 2));
    }

    return NextResponse.json({ ok: true, emailSent: sent });
  } catch (err) {
    console.error("[API /demo]", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
