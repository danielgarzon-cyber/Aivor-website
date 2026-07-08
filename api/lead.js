// Vercel Serverless Function ‚Äî /api/lead
// Recibe el formulario de captura de aivor.org y crea un prospecto en el CRM de Aivor.
// La llave del CRM vive en la variable de entorno CRM_KEY (nunca en el c√≥digo p√∫blico).

const CRM_URL = 'https://aivor-crm-danielgarzon.netlify.app/api/prospects';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const nombre   = (b.nombre   || '').toString().trim();
    const empresa  = (b.empresa  || '').toString().trim();
    const telefono = (b.telefono || '').toString().trim();
    const reto     = (b.reto     || '').toString().trim();
    const origen   = (b.source   || 'landing aivor.org').toString().trim();

    if (!nombre && !telefono) {
      return res.status(400).json({ ok: false, error: 'Faltan datos m√≠nimos' });
    }

    // Mapeo a los campos del CRM (tabla prospects)
    const prospect = {
      full_name:     nombre || 'Sin nombre',
      company_name:  empresa || null,
      phone:         telefono || null,
      whatsapp:      telefono || null,
      source:        'web',
      source_detail: origen,
      pain_point:    reto || null,
      notes:         reto || null,
      status:        'nuevo'
    };

    const KEY = process.env.CRM_KEY;
    if (!KEY) {
      // Sin llave a√∫n: no perdemos el lead, queda en los logs de Vercel.
      console.log('[lead] CRM_KEY no configurada. Lead recibido:', prospect);
      return res.status(200).json({ ok: true, crm: false, note: 'CRM_KEY no configurada' });
    }

    const r = await fetch(CRM_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-crm-key': KEY },
      body: JSON.stringify(prospect)
    });

    if (!r.ok) {
      const txt = await r.text().catch(() => '');
      console.error('[lead] el CRM respondi√≥', r.status, txt);
      return res.status(200).json({ ok: true, crm: false, status: r.status });
    }

    return res.status(200).json({ ok: true, crm: true });
  } catch (e) {
    console.error('[lead] error', e);
    // Devolvemos 200 para no romper el flujo del formulario (WhatsApp igual abre).
    return res.status(200).json({ ok: true, crm: false, error: 'exception' });
  }
}
