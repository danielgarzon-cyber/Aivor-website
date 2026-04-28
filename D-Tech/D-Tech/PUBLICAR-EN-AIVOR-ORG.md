# Cómo publicar los cambios en aivor.org

> **Estado actual:** El archivo `aivor-website.html` ya tiene **todos** los cambios aplicados (Calendly + WhatsApp, fix del overlap visual, menú hamburguesa móvil, optimización mobile). Lo único que falta es **subirlo a Vercel** para que quede visible en `aivor.org`.

---

## Opción A — Drag & Drop en Vercel (lo más rápido, 2 min)

1. Entra a https://vercel.com/dashboard e inicia sesión con tu cuenta.
2. Localiza el proyecto que está conectado al dominio `aivor.org` (probablemente se llame `aivor`, `d-tech` o similar). Haz clic en él.
3. Arriba a la derecha, clic en **Deployments** → botón **"Deploy"** (o **"Redeploy"** si ya hay despliegues anteriores).
4. Si te pide subir archivos: arrastra **toda la carpeta `D-Tech`** a la zona de drop. Vercel detectará automáticamente el `vercel.json` y servirá `aivor-website.html` como página principal.
5. Espera el "Ready" (30–60 seg) y abre `https://aivor.org` en una ventana de incógnito (para evitar caché). Los cambios deben verse.

> Si no usas incógnito, fuerza recarga con **Cmd+Shift+R** (Mac) o **Ctrl+F5** (Windows) para saltar caché.

---

## Opción B — Vercel CLI (si prefieres comandos)

Solo aplica si ya tienes Vercel CLI instalado y el proyecto vinculado:

```bash
cd "/Users/APPLE/Documents/Claude/Projects/D-Tech"
vercel --prod
```

La primera vez te pedirá vincular el folder al proyecto correcto en Vercel. Sigue las preguntas (escoge el proyecto que ya apunta a `aivor.org`).

Si nunca has instalado Vercel CLI:
```bash
npm install -g vercel
vercel login
```

---

## Opción C — Si tu proyecto está conectado a GitHub

Si Vercel está sincronizado con un repo de GitHub:

1. Copia el archivo `aivor-website.html` actualizado al repo local.
2. Haz `git add aivor-website.html vercel.json`
3. `git commit -m "Update: Calendly, WhatsApp, mobile fixes"`
4. `git push origin main`
5. Vercel desplegará automáticamente en 30–60 seg.

> Si no estás seguro de cuál opción usar, prueba primero la **Opción A** (drag & drop). Es la más simple y no requiere setup previo.

---

## Después de publicar — checklist de verificación

Abre `https://aivor.org` en **incógnito** y revisa:

- [ ] El botón **"Agenda una llamada"** del navbar abre el popup de Calendly.
- [ ] El botón verde **"Hablemos por WhatsApp"** abre WhatsApp con tu número.
- [ ] En **mobile** (ancho < 600px), el menú hamburguesa funciona y los botones se apilan vertical.
- [ ] El texto **"Sin costo · Sin compromiso · Respuesta en 24 horas"** ya **no se solapa** con el botón.
- [ ] El asistente AI flotante muestra opciones de Calendly/WhatsApp.

---

## ⚠️ Antes de publicar (importante)

**Revisa una sola línea en `aivor-website.html`** — busca `AIVOR_CONFIG` (línea ~1955):

```javascript
const AIVOR_CONFIG = {
  CALENDLY_URL: 'https://calendly.com/danielgarzon-aivor/diagnostico-30min',
  ...
};
```

Si **todavía no creaste tu cuenta de Calendly real**, ese link NO funciona. Tienes dos opciones:

1. **Crear Calendly primero** (10 min, ver `INSTRUCCIONES-CALENDLY-WHATSAPP.md` que te dejé en la misma carpeta) y reemplazar el link antes de publicar.
2. **Publicar igual** y arreglar después: el botón abrirá una página de Calendly que dirá "Calendly Page Not Found", lo cual es mala UX para los primeros visitantes.

**Recomendación:** Crea Calendly primero (es gratis, 10 min) y publica con el link real. Vale la pena.

---

## Si algo sale mal

- **Vercel no encuentra el proyecto:** Probablemente `aivor.org` está hospedado en otro lado (Cloudflare Pages, Netlify, hosting tradicional). Avísame y te ayudo con esa plataforma.
- **El dominio aivor.org no resuelve:** Verifica que el DNS aún apunta a Vercel (Vercel dashboard → tu proyecto → Settings → Domains).
- **Veo cambios pero no todos:** Es caché del navegador. Cmd+Shift+R o ventana incógnita.
