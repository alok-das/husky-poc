import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const PROTECTED_DIR = '.husky';

try {
  const files = fs.readdirSync(PROTECTED_DIR).map(f => path.join(PROTECTED_DIR, f));
  const platform = process.platform;

  files.forEach(file => {
    if (!fs.statSync(file).isFile()) return;
    if (platform === 'linux') execSync(`sudo chattr +i ${file}`);
    else if (platform === 'darwin') execSync(`chflags uchg ${file}`);
    else if (platform === 'win32') execSync(`icacls ${file} /deny Everyone:W`);
  });

  console.log('🔒 .husky/ directory is now locked.');
} catch (err) {
  console.error('❌ Failed to lock .husky/ directory:', err.message);
  process.exit(1);
}