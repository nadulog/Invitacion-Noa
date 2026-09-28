# Invitación de Noa

Invitación web para los XV de Noa, el 27 de noviembre de 2026.

## Desarrollo local

```bash
npm install
npm run dev
```

La versión estática utilizada por Netlify se genera con:

```bash
node scripts/build-netlify.mjs
```

## Publicación

La configuración de Netlify está definida en `netlify.toml` y publica el contenido generado en `netlify-dist`.
