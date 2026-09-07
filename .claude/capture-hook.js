#!/usr/bin/env node
// Claude Code hook script for capturing prompts and responses
// Fires on UserPromptSubmit and Stop events
// Reads JSON from stdin, appends to session log in .agent-logs/

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, "..");
const LOG_DIR = path.join(REPO_ROOT, '.agent-logs');

if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });

const INPUT = fs.readFileSync(0, 'utf8').trim();
let data;
try {
  data = JSON.parse(INPUT);
} catch {
  process.exit(0);
}

const EVENT = data.hook_event_name || 'unknown';
const SESSION_ID = data.session_id || 'unknown';
const SHORT_SESSION = SESSION_ID.slice(0, 8);
const TIMESTAMP = new Date().toISOString();
const DATE_PART = TIMESTAMP.slice(0, 10);
const TIME_PART = TIMESTAMP.slice(11, 19).replace(/:/g, '-');
const MODEL = process.env.CLAUDE_MODEL || 'jk';

let LOG_FILE = null;
const files = fs.readdirSync(LOG_DIR);
for (const f of files) {
  if (f.endsWith(`_${SESSION_ID}.md`)) {
    LOG_FILE = path.join(LOG_DIR, f);
    break;
  }
}
if (!LOG_FILE) {
  LOG_FILE = path.join(LOG_DIR, `${DATE_PART}_${TIME_PART}_${SESSION_ID}.md`);
}

if (!fs.existsSync(LOG_FILE)) {
  const header = `---
session_id: ${SESSION_ID}
date: ${DATE_PART}
author: assignment-author
model: ${MODEL}
tool: claude-code
project: videos-and-image-generation
total_exchanges: 0
first_prompt_time: ${TIMESTAMP}
last_prompt_time: ${TIMESTAMP}
---

# Session Log - ${DATE_PART}

Session: \`${SHORT_SESSION}\` | Project: \`videos-and-image-generation\` | Author: \`assignment-author\`

---

`;
  fs.writeFileSync(LOG_FILE, header, 'utf8');
}

let content = fs.readFileSync(LOG_FILE, 'utf8');

if (EVENT === 'UserPromptSubmit') {
  const PROMPT_TEXT = data.text || data.prompt || '[prompt not captured]';
  const PROMPT_COUNT = (content.match(/type=PROMPT/g) || []).length;
  const ENTRY_NUM = PROMPT_COUNT + 1;
  content += `\n[LOG_ENTRY type=PROMPT num=${ENTRY_NUM} session=${SHORT_SESSION}]\ntimestamp: ${TIMESTAMP}\nmodel: ${MODEL}\n\n${PROMPT_TEXT}\n`;

} else if (EVENT === 'Stop') {
  const RESPONSE_TEXT = data.last_assistant_message || '[response not captured]';
  const PROMPT_COUNT = (content.match(/type=PROMPT/g) || []).length || 1;
  content += `\n[LOG_ENTRY type=RESPONSE num=${PROMPT_COUNT} session=${SHORT_SESSION}]\ntimestamp: ${TIMESTAMP}\nmodel: ${MODEL}\n\n${RESPONSE_TEXT}\n`;
  content = content.replace(/^total_exchanges:.*/m, `total_exchanges: ${PROMPT_COUNT}`);
  content = content.replace(/^last_prompt_time:.*/m, `last_prompt_time: ${TIMESTAMP}`);
}

fs.writeFileSync(LOG_FILE, content, 'utf8');
process.exit(0);