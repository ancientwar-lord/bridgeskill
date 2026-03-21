#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const [, , filePath] = process.argv;
if (!filePath) {
  console.error(
    'Usage: node scripts/validate-agent-yaml.js <path-to-agent-file>',
  );
  process.exit(1);
}
const absolutePath = path.resolve(process.cwd(), filePath);
if (!fs.existsSync(absolutePath)) {
  console.error(`File not found: ${absolutePath}`);
  process.exit(1);
}
const content = fs.readFileSync(absolutePath, 'utf8');
if (!content.startsWith('---')) {
  console.error('Invalid agent file: missing YAML frontmatter start (---)');
  process.exit(1);
}
const secondDelimiterIndex = content.indexOf('\n---', 3);
if (secondDelimiterIndex < 0) {
  console.error('Invalid agent file: missing YAML frontmatter end (---)');
  process.exit(1);
}

const yamlText = content.slice(3, secondDelimiterIndex);
let parsed = null;
try {
  const yaml = require('js-yaml');
  parsed = yaml.load(yamlText);
} catch (e) {
  console.warn(
    'Warning: js-yaml is not installed or failed to parse. Falling back to minimal validation.',
  );
}

if (parsed) {
  if (!parsed.description) {
    console.error(
      'Invalid agent file: YAML frontmatter must include `description`.',
    );
    process.exit(1);
  }
  console.log(
    `SUCCESS: ${filePath} YAML parsed with js-yaml. description=${parsed.description}`,
  );
  process.exit(0);
}

// Minimal fallback validation
if (!/description\s*:\s*"?[\w\s\-\.,!']+"?/.test(yamlText)) {
  console.error(
    'Invalid agent file: YAML frontmatter appears to be missing a description field.',
  );
  process.exit(1);
}

console.log(
  `SUCCESS: ${filePath} has valid YAML frontmatter delimiters and minimal description check.`,
);
process.exit(0);
