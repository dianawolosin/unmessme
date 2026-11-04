/**
 * Runtime token export. Single source of truth:
 * packages/design-system/tokens/tokens.json (W3C, served by the MCP).
 *
 * Do not add a second token tree. Edit tokens/tokens.json only.
 */
import tokensJson from '../../tokens/tokens.json';

type StripToken<T> = T extends { $value: infer V }
  ? V
  : { [K in keyof T]: StripToken<T[K]> };

function resolveReferences(value: string, allTokens: unknown): string {
  if (!value || typeof value !== 'string' || !value.includes('{')) {
    return value;
  }

  return value.replace(/\{([^}]+)\}/g, (_, path: string) => {
    const parts = path.split('.');
    let current: any = allTokens;

    for (const part of parts) {
      current = current?.[part];
    }

    if (current?.$value) {
      return resolveReferences(current.$value, allTokens);
    }

    console.warn(`Could not resolve token reference: ${path}`);
    return value;
  });
}

function processTokens(obj: any, allTokens: any): any {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if ('$value' in obj) {
    return resolveReferences(obj.$value, allTokens);
  }

  const result: any = {};
  for (const key in obj) {
    if (key === '$schema' || key === '$type' || key === '_note' || key === '$description') continue;
    result[key] = processTokens(obj[key], allTokens);
  }
  return result;
}

const rawTokens = {
  color: tokensJson.color,
  elevation: tokensJson.elevation,
  radius: tokensJson.radius,
  spacing: tokensJson.spacing,
  typography: tokensJson.typography,
  border: tokensJson.border,
  effect: tokensJson.effect,
};

export const tokens = processTokens(rawTokens, rawTokens) as StripToken<typeof rawTokens>;
export const raw = rawTokens;
