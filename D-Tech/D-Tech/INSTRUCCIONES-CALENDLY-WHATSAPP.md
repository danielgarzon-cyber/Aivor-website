# Configuración de Calendly + WhatsApp en Aivor

Esta guía te explica:
1. Cómo crear tu cuenta de Calendly gratis y sincronizarla con tu correo (Gmail o Outlook).
2. Cómo conectar el botón "Agenda tu diagnóstico gratuito" del sitio con tu Calendly real.
3. Cómo verificar que el botón de WhatsApp está funcionando con tu número.

---

## Parte 1 — Crear cuenta de Calendly y sincronizarla

### Paso 1: Crear la cuenta
1. Entra a https://calendly.com/signup
2. Regístrate con `ngarzon94@gmail.com` (tu Gmail). Calendly pedirá permisos para leer y escribir en Google Calendar — **acéptalos**, así las citas se sincronizan automáticamente.
3. Elige un nombre de URL personalizado: te recomiendo `danielgarzon-aivor` o `aivor`. Quedará tu link como `https://calendly.com/danielgarzon-aivor`.

### Paso 2: Conectar tu calendario
1. Ve a **Account → Calendar Connections**.
2. Asegúrate de que Google Calendar esté conectado (debería estarlo automáticamente).
3. Marca tu calendario principal como "Check for conflicts" — así Calendly bloquea automáticamente horarios donde ya tienes algo.
4. Marca también "Add to calendar" — para que toda cita nueva se cree como evento en tu Google Calendar.

### Paso 3: Crear el "Event Type" (tipo de cita)
1. En el dashboard, haz clic en **Create → Event Type → One-on-One**.
2. Configúralo así:
   - **Event name:** Diagnóstico Aivor (30 min)
   - **Location:** Google Meet (Calendly genera el link automáticamente)
   - **Description:** Llamada gratuita y sin compromiso para revisar tu situación tecnológica actual.
   - **Duration:** 30 min
   - **URL slug:** `diagnostico-30min`
3. En **Availability** define tus horarios disponibles (ej: Lun-Vie 9am-12pm y 2pm-5pm).
4. Activa **Confirmation emails** y **Reminder emails** (24h y 1h antes).

Al guardar tendrás tu link final, algo así:
```
https://calendly.com/danielgarzon-aivor/diagnostico-30min
```

### Paso 4 (opcional pero recomendado): Configurar campos personalizados
En el Event Type, sección **Invitee Questions**, añade:
- Nombre de la empresa (obligatorio)
- Sector / industria (obligatorio)
- ¿Qué te trae a Aivor? (texto largo, obligatorio)
- ¿Qué tecnología tienes hoy? (opcional)

Estos datos llegarán al correo y al evento en tu calendario, así llegas a la cita ya con contexto.

### Paso 5: Notificaciones a tu WhatsApp (opcional, pero útil)
- Calendly Free no manda WhatsApp nativo.
- Pero puedes conectar Calendly → **Zapier (free)** → **WhatsApp Business** para recibir un mensaje cada vez que alguien agenda. Tutorial: https://zapier.com/apps/calendly/integrations/whatsapp-notifications
- Alternativa más simple: las notificaciones por correo de Calendly llegan al instante a tu Gmail, y si tienes Gmail en el celular, llegan como push casi inmediato.

---

## Parte 2 — Conectar tu Calendly al sitio web

### Lo único que tienes que cambiar
Abre el archivo `aivor-website.html` y busca este bloque (está cerca de la línea 1955):

```javascript
const AIVOR_CONFIG = {
  CALENDLY_URL: 'https://calendly.com/danielgarzon-aivor/diagnostico-30min',
  WHATSAPP_NUMBER: '573102776800',
  WHATSAPP_MESSAGE: 'Hola Daniel, vi el sitio de Aivor y me gustaría agendar mi diagnóstico tecnológico gratuito.',
  CONTACT_EMAIL: 'danielgarzon@aivor.org',
};
```

**Reemplaza `CALENDLY_URL`** por el link real que generaste en el Paso 3 anterior. Ejemplo:
```javascript
CALENDLY_URL: 'https://calendly.com/aivor/diagnostico-30min',
```

Guarda el archivo. **Listo** — todos los botones del sitio que dicen "Agenda tu diagnóstico" ahora abren tu Calendly real en un popup elegante.

### ¿Dónde aparecen los botones de Calendly?
- Botón principal del **Hero** (arriba en la portada)
- Botón "Agenda una llamada" en el **navbar** (esquina superior derecha)
- Sección final **"¿Listo para que tu tecnología trabaje para ti?"** — aquí aparece junto con el botón de WhatsApp
- Sección **"Cuéntanos qué necesitas"** — aparece después de seleccionar chips de interés
- Asistente AI flotante — opción "📅 Agendar por Calendly"
- Menú móvil (hamburguesa)

---

## Parte 3 — WhatsApp ya está listo

El número configurado es `+57 310 277 6800`. Si quieres cambiarlo o personalizar el mensaje predefinido que aparece cuando alguien abre el chat, edita el mismo bloque `AIVOR_CONFIG`:

```javascript
WHATSAPP_NUMBER: '573102776800', // formato internacional, sin "+" ni espacios
WHATSAPP_MESSAGE: 'Hola Daniel, vi el sitio de Aivor y me gustaría agendar mi diagnóstico tecnológico gratuito.',
```

**Tip:** El número debe estar en formato internacional sin el `+` ni espacios. Para Colombia: `57` + número de 10 dígitos = `57XXXXXXXXXX`.

---

## Parte 4 — Verificación rápida

1. Abre `aivor-website.html` en tu navegador (doble-click o arrastrar al navegador).
2. Haz clic en **"Agenda una llamada"** del navbar → debería abrir un popup con tu calendario.
3. Haz clic en **"Hablemos por WhatsApp"** del CTA final → debería abrir WhatsApp Web (o app) con el mensaje predefinido.
4. En mobile (o redimensionando la ventana <600px), verifica:
   - El menú hamburguesa funciona.
   - Los dos botones del CTA se apilan en columna sin solaparse con el texto "Sin costo · Sin compromiso · Respuesta en 24 horas".
   - Los textos del hero se ven bien (no muy grandes ni cortados).

---

## ¿Qué se arregló del problema visual original?
- El texto "Sin costo · Sin compromiso · Respuesta en 24 horas" ya no se solapa con el botón. Ahora hay un wrapper `cta-buttons-row` con los dos botones, y la nota va debajo con su propio espaciado.
- El efecto magnético (que movía el botón al pasar el cursor) se desactiva en touch devices, evitando glitches.
- En mobile, los botones se vuelven verticales y al 100% del ancho disponible.

---

## Resumen rápido — qué hiciste
1. ✅ Creas Calendly con tu Gmail y sincronizas Google Calendar.
2. ✅ Copias tu link de Calendly y lo pegas en `AIVOR_CONFIG.CALENDLY_URL`.
3. ✅ Verificas que el botón abre tu calendario.
4. ✅ Las citas llegan a tu Gmail y a tu Google Calendar automáticamente.
5. ✅ Si quieres, conectas Zapier para alertas en WhatsApp.
