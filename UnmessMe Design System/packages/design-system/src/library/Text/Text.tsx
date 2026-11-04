import type { ElementType } from 'react';
import { Typography as MuiTypography, TypographyProps as MuiTypographyProps } from '@mui/material';
import { tokens } from '../../tokens';

/**
 * Semantic type role. Named 1:1 with tokens.typography.semantic and the MUI
 * variant ramp, so the whole system speaks one typographic vocabulary.
 */
export type TextRole =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body1'
  | 'body2'
  | 'button'
  | 'caption'
  | 'overline'
  | 'tag';

export interface TextProps extends Omit<MuiTypographyProps, 'variant' | 'color'> {
  /**
   * Semantic type role. Every role resolves its font, size, weight, line
   * height, and tracking from the token ramp.
   * @default 'body1'
   */
  variant?: TextRole;

  /**
   * Optional weight override. Defaults to the role's own weight.
   */
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';

  /**
   * Optional color override. Defaults to primary text.
   */
  color?: string;
}

/** Default HTML element per role, so headings stay semantic. */
const roleToTag: Record<TextRole, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body1: 'p',
  body2: 'p',
  button: 'span',
  caption: 'span',
  overline: 'span',
  tag: 'span',
};

/**
 * Text (Atom)
 *
 * The one typography primitive. Each role reads its font, size, weight, line
 * height, and tracking straight from tokens.typography.semantic, the same
 * source the MUI variants use. Text, the variants, and the tokens cannot drift.
 */
export function Text({
  variant = 'body1',
  weight,
  color,
  component,
  sx,
  children,
  ...props
}: TextProps) {
  const role = tokens.typography.semantic[variant];
  const fontWeight = Number(
    weight ? tokens.typography.primitive.fontWeight[weight] : role.weight
  );

  return (
    <MuiTypography
      component={component ?? roleToTag[variant]}
      sx={{
        fontFamily: role.font,
        fontSize: role.size,
        fontWeight,
        lineHeight: role.lineHeight,
        letterSpacing: role.letterSpacing,
        textTransform: variant === 'overline' ? 'uppercase' : undefined,
        color: color ?? tokens.color.semantic.text.primary,
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiTypography>
  );
}
