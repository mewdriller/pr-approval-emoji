#!/usr/bin/env node

const clipboardy = require('clipboardy');
const prApprovalEmoji = require('../lib/index.js');

const emoji = prApprovalEmoji(Date.now());

console.log('PR Approval Emoji\n');
console.log(`${emoji}\n`);
console.log('Copied to clipboard!');

clipboardy.writeSync(emoji);
