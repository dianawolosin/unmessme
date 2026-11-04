#!/usr/bin/env node
/**
 * UnmessMe MCP server (course demo).
 * Serves live design tokens + component contracts from the design-system package.
 * Does NOT serve framing/taste (those are prose docs in the Prototype unit).
 */
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DS_ROOT = path.resolve(__dirname, '../../design-system');
const TOKENS_PATH = path.join(DS_ROOT, 'tokens/tokens.json');
const LIBRARY_PATH = path.join(DS_ROOT, 'src/library');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function listContracts() {
  const names = fs.readdirSync(LIBRARY_PATH, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('_'))
    .map((d) => d.name);
  const contracts = [];
  for (const name of names) {
    const file = path.join(LIBRARY_PATH, name, `${name}.contract.json`);
    if (fs.existsSync(file)) {
      contracts.push({ name, file });
    }
  }
  return contracts;
}

const server = new Server(
  { name: 'unmessme', version: '0.1.0' },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'get_tokens',
      description:
        'Return the UnmessMe W3C design tokens (tokens.json). Use for exact color, type, space, radius, elevation values. Never invent hex or magic numbers.',
      inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    },
    {
      name: 'list_components',
      description:
        'List UnmessMe components that have a machine-readable contract JSON.',
      inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    },
    {
      name: 'get_component_contract',
      description:
        'Return the contract JSON for one UnmessMe component (props, variants, tokensUsed, a11y).',
      inputSchema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Component name, e.g. Button, ProblemCard, Tag',
          },
        },
        required: ['name'],
        additionalProperties: false,
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === 'get_tokens') {
    const tokens = readJson(TOKENS_PATH);
    return {
      content: [{ type: 'text', text: JSON.stringify(tokens, null, 2) }],
    };
  }

  if (name === 'list_components') {
    const list = listContracts().map((c) => c.name).sort();
    return {
      content: [{ type: 'text', text: JSON.stringify(list, null, 2) }],
    };
  }

  if (name === 'get_component_contract') {
    const componentName = args?.name;
    if (!componentName || typeof componentName !== 'string') {
      throw new Error('name is required');
    }
    const file = path.join(
      LIBRARY_PATH,
      componentName,
      `${componentName}.contract.json`
    );
    if (!fs.existsSync(file)) {
      const available = listContracts().map((c) => c.name).sort().join(', ');
      throw new Error(
        `No contract for "${componentName}". Available: ${available}`
      );
    }
    const contract = readJson(file);
    return {
      content: [{ type: 'text', text: JSON.stringify(contract, null, 2) }],
    };
  }

  throw new Error(`Unknown tool: ${name}`);
});

const transport = new StdioServerTransport();
await server.connect(transport);
