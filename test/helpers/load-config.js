import * as fs from 'fs';
import * as yaml from 'js-yaml';

const file = 'config.yml';
export const conf = yaml.load(fs.readFileSync(file, 'utf8'));