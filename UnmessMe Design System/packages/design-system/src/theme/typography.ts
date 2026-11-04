import { TypographyOptions } from '@mui/material/styles/createTypography';
import { tokens } from '../tokens';

/**
 * UnmessMe Typography System (V3: Digital Noir)
 *
 * Every MUI variant maps 1:1 to a semantic type role in
 * tokens.typography.semantic. Nothing here invents a size, weight, line
 * height, or tracking: it all traces to a token. To change the type ramp,
 * edit the tokens, not this file.
 */
const role = tokens.typography.semantic;

interface TypeRole {
  font: string;
  size: string;
  weight: string;
  lineHeight: number;
  letterSpacing: string;
}

/** Build a variant straight from a semantic type-role token. */
const fromRole = (r: TypeRole) => ({
  fontFamily: r.font,
  fontSize: r.size,
  fontWeight: Number(r.weight),
  lineHeight: r.lineHeight,
  letterSpacing: r.letterSpacing,
});

export const typography: TypographyOptions = {
  // Base fallback for any unstyled text. UnmessMe ships only Caslon + JetBrains
  // Mono, so the default is mono (on-brand) rather than the unloaded Inter/sans.
  fontFamily: tokens.typography.primitive.fontFamily.mono,

  h1: fromRole(role.h1),
  h2: fromRole(role.h2),
  h3: fromRole(role.h3),
  h4: fromRole(role.h4),
  h5: fromRole(role.h5),
  h6: fromRole(role.h6),
  body1: fromRole(role.body1),
  body2: fromRole(role.body2),
  caption: fromRole(role.caption),

  button: {
    ...fromRole(role.button),
    textTransform: 'none',
  },
  overline: {
    ...fromRole(role.overline),
    textTransform: 'uppercase',
  },
};
