import React from 'react';
import { Box, Stack } from '@mui/material';
import { Surface } from '../Surface';
import { Text } from '../Text';
import { tokens } from '../../tokens';

export interface TileProps {
  /**
   * Small uppercase label naming the metric.
   * @example "Messiest pattern"
   */
  label: string;

  /**
   * The headline value. A number, a word, or a short phrase.
   * @example "Avoidance"
   * @example "6.2"
   */
  value: React.ReactNode;

  /**
   * Optional supporting line under the value for context.
   * @example "3 of 6 active cases"
   */
  hint?: string;

  /**
   * Optional accent. Colors the value and a top rule using status tokens.
   * Use it to signal severity of a glance metric.
   * @default undefined (neutral)
   */
  accent?: 'urgent' | 'analysis' | 'success' | 'neutral';

  /**
   * Optional leading icon (e.g. a MUI icon), tinted with the accent color.
   */
  icon?: React.ReactNode;
}

/**
 * Tile (Molecule)
 *
 * A compact "glance" stat card for dashboards: a labelled headline metric with
 * an optional hint, accent, and icon. Built on the glass Surface so it matches
 * the rest of the system. Compose several in a Grid to summarize a dataset.
 *
 * @example
 * // A row of glance tiles summarizing where a user is messiest
 * <Grid container spacing={3}>
 *   <Grid item xs={12} sm={6} md={3}>
 *     <Tile label="Messiest pattern" value="Avoidance" hint="3 of 6 cases" accent="urgent" />
 *   </Grid>
 *   <Grid item xs={12} sm={6} md={3}>
 *     <Tile label="Avg stress" value="6.2" hint="across 6 cases" accent="analysis" />
 *   </Grid>
 *   <Grid item xs={12} sm={6} md={3}>
 *     <Tile label="Active cases" value={6} />
 *   </Grid>
 *   <Grid item xs={12} sm={6} md={3}>
 *     <Tile label="Steps done" value="40%" accent="success" />
 *   </Grid>
 * </Grid>
 */
export function Tile({ label, value, hint, accent, icon }: TileProps) {
  const hasAccent = accent !== undefined && accent !== 'neutral';
  const accentColor = hasAccent
    ? tokens.color.semantic.status[accent as 'urgent' | 'analysis' | 'success']
    : tokens.color.semantic.text.secondary;

  return (
    <Surface
      variant="glass"
      elevation="raised"
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        borderTop: `${tokens.border.width.base} ${tokens.border.style.solid} ${
          hasAccent ? accentColor : tokens.color.semantic.border.highlight
        }`,
      }}
    >
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={1}>
        <Text variant="overline" color={tokens.color.semantic.text.secondary}>
          {label}
        </Text>
        {icon && (
          <Box sx={{ color: accentColor, display: 'flex', alignItems: 'center' }}>{icon}</Box>
        )}
      </Stack>

      {/* Rendered as a <p>, not an <h2>, so a row of tiles doesn't pollute the heading outline. */}
      <Text
        variant="h2"
        component="p"
        color={hasAccent ? accentColor : tokens.color.semantic.text.primary}
      >
        {value}
      </Text>

      {hint && (
        <Text variant="body2" color={tokens.color.semantic.text.secondary}>
          {hint}
        </Text>
      )}
    </Surface>
  );
}
