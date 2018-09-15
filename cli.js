#!/usr/bin/env node

const convert = require('./index');
const fs = require('fs');

const filepath = process.argv[2];
const precision = process.argv[3] || 5;

const route = fs.readFileSync(filepath, 'utf8');
console.log(convert(JSON.parse(route), precision));