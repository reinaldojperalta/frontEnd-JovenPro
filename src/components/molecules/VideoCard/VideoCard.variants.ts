// ============================================================================
// VIDEO CARD VARIANTS — Molécula de tarjeta de video
// ============================================================================
// REFACTOR V3:
// - Archivo creado (no existía). Extrae todo el CSS inline del .tsx.
// - Tokens validados:
//   • rounded-clay, shadow-clay: existen
//   • bg-foreground/5: placeholder sutil para contenedor de video. Aceptable
//     como opacidad sobre foreground para estado de carga/placeholder de media.
//   • bg-foreground/80, text-background: badge de duración sobre video.
//     Contraste alto, legible sobre cualquier thumbnail.
//   • backdrop-blur-sm: utilitario core.
// - EXCEPCIÓN DOCUMENTADA: bg-foreground/5 y bg-foreground/80 usan opacidad
//   sobre foreground. Son estados de media (placeholder y badge overlay) donde
//   un token sólido no tendría sentido semántico.
// - Tipos derivados del CVA.
// ============================================================================

import { cva } from "class-variance-authority";

/** Wrapper principal del video card. */
export const videoCardVariants = cva("flex flex-col");

/** Contenedor del reproductor de video. */
export const videoCardPlayerVariants = cva(
    "relative rounded-clay overflow-hidden shadow-clay bg-foreground/5 aspect-video"
);

/** Badge de duración del video. */
export const videoCardDurationVariants = cva(
    "absolute bottom-3 right-3 z-10 bg-foreground/80 text-background text-xs font-semibold px-2 py-1 rounded-md backdrop-blur-sm"
);

/** Contenedor de metadatos (título + emprendedor). */
export const videoCardMetaVariants = cva("mt-4 space-y-1");

