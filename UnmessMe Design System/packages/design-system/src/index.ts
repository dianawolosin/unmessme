/**
 * @unmessme/design-system
 * 
 * UnmessMe Design System - MUI wrapper with custom dark-mode-first theme
 * 
 * @packageDocumentation
 */

// Theme exports
export { theme as unmessTheme, theme, customAccents, spacingTokens, layout } from './theme';

// Design tokens: the single source of truth consumers should pull from
// (font families, colors, spacing, etc.) instead of hardcoding values.
export { tokens, raw as rawTokens } from './tokens';

// Component exports
export * from './library';

// Re-export commonly used MUI components for convenience
export {
  ThemeProvider,
  CssBaseline,
  Box,
  Container,
  Stack,
  Grid,
} from '@mui/material';

// Additional MUI re-exports for convenience
export type { Theme } from '@mui/material/styles';
