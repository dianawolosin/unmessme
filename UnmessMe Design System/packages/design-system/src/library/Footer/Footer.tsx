import React from 'react';
import { Box, Stack, Typography, IconButton } from '@mui/material';
import { tokens } from '../../tokens';

export interface FooterLinkColumn {
  title: string;
  links: string[];
}

export interface FooterSocialLink {
  label: string;
  icon: React.ReactNode;
  href?: string;
}

export interface FooterProps {
  /** Product / brand name. */
  brand?: string;
  /** Small line under the brand. */
  tagline?: string;
  /** Columns of navigation links. */
  columns?: FooterLinkColumn[];
  /** Social links (icons supplied by the consumer). */
  socials?: FooterSocialLink[];
  /** A single line of address / location text. */
  address?: string;
  /** Copyright line. */
  copyright?: string;
  /** A closing note or disclaimer. */
  note?: string;
}

/**
 * Footer Component (Layout)
 *
 * A structural site footer. It carries no product content of its own: brand,
 * links, socials, and legal copy are all passed in, so the design system stays
 * content-free and the consuming app supplies its own voice.
 */
export function Footer({
  brand = 'UnmessMe',
  tagline,
  columns = [],
  socials = [],
  address,
  copyright,
  note,
}: FooterProps) {
  const mono = tokens.typography.primitive.fontFamily.mono;

  return (
    <Box
      component="footer"
      sx={{
        borderTop: `${tokens.border.width.base} ${tokens.border.style.solid} ${tokens.color.semantic.border.subtle}`,
        mt: 8,
        pt: 8,
        pb: 6,
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={6}
        justifyContent="space-between"
      >
        {/* Brand */}
        <Box sx={{ maxWidth: 320 }}>
          <Typography
            sx={{
              fontFamily: tokens.typography.primitive.fontFamily.serif,
              fontStyle: 'italic',
              fontWeight: Number(tokens.typography.primitive.fontWeight.bold),
              fontSize: tokens.typography.primitive.fontSize.xl,
              color: tokens.color.semantic.text.primary,
            }}
          >
            {brand}
          </Typography>
          {tagline && (
            <Typography
              sx={{
                fontFamily: mono,
                fontSize: tokens.typography.primitive.fontSize.sm,
                color: tokens.color.semantic.text.secondary,
                mt: 1,
              }}
            >
              {tagline}
            </Typography>
          )}
          {socials.length > 0 && (
            <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
              {socials.map((s) => (
                <IconButton
                  key={s.label}
                  aria-label={s.label}
                  href={s.href || '#'}
                  size="small"
                  sx={{
                    color: tokens.color.semantic.text.secondary,
                    border: `${tokens.border.width.base} ${tokens.border.style.solid} ${tokens.color.semantic.border.subtle}`,
                    borderRadius: tokens.radius.semantic.sm,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: tokens.color.semantic.action.primary,
                      borderColor: tokens.color.semantic.action.primary,
                      transform: 'translateY(-1px)',
                    },
                  }}
                >
                  {s.icon}
                </IconButton>
              ))}
            </Stack>
          )}
        </Box>

        {/* Link columns */}
        <Stack direction="row" spacing={6} flexWrap="wrap" useFlexGap>
          {columns.map((col) => (
            <Stack key={col.title} spacing={1.5} sx={{ minWidth: 120 }}>
              <Typography
                sx={{
                  fontFamily: mono,
                  fontSize: tokens.typography.primitive.fontSize.xs,
                  fontWeight: Number(tokens.typography.primitive.fontWeight.medium),
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: tokens.color.semantic.text.secondary,
                }}
              >
                {col.title}
              </Typography>
              {col.links.map((link) => (
                <Typography
                  key={link}
                  component="a"
                  href="#"
                  sx={{
                    fontFamily: mono,
                    fontSize: tokens.typography.primitive.fontSize.sm,
                    color: tokens.color.semantic.text.primary,
                    textDecoration: 'none',
                    opacity: 0.8,
                    transition: 'all 0.2s ease',
                    '&:hover': { opacity: 1, color: tokens.color.semantic.action.primary },
                  }}
                >
                  {link}
                </Typography>
              ))}
            </Stack>
          ))}
        </Stack>
      </Stack>

      {/* Bottom bar */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ md: 'center' }}
        sx={{
          mt: 8,
          pt: 4,
          borderTop: `${tokens.border.width.base} ${tokens.border.style.solid} ${tokens.color.semantic.border.subtle}`,
        }}
      >
        <Typography sx={{ fontFamily: mono, fontSize: tokens.typography.primitive.fontSize.xs, color: tokens.color.semantic.text.secondary }}>
          {copyright}
          {address && <Box component="span" sx={{ opacity: 0.7 }}>{`  ·  ${address}`}</Box>}
        </Typography>
        {note && (
          <Typography sx={{ fontFamily: mono, fontSize: tokens.typography.primitive.fontSize.xs, color: tokens.color.semantic.text.secondary, opacity: 0.7 }}>
            {note}
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
