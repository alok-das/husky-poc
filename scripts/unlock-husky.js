import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const HASH_FILE = '.husky-password.sha256';
const PROTECTED_DIR = '.husky';

// Always fetch hash from remote — never trust local
let storedHash;
try {
  storedHash = execSync(`git show origin/main:${HASH_FILE}`).toString().trim();
} catch {
  console.error('❌ Cannot reach remote. Unlock requires internet connection.');
  console.error('   This is intentional — offline unlock is not permitted.');
  process.exit(1);
}

process.stdout.write('🔑 Enter password to unlock .husky/ directory: ');
process.stdin.setRawMode(true);
process.stdin.resume();

let input = '';
process.stdin.on('data', (char) => {
  char = char.toString();
  if (char === '\n' || char === '\r') {
    process.stdin.setRawMode(false);
    process.stdin.pause();
    console.log('');
    verifyAndUnlock(input);
  } else if (char === '\u0003') {
    process.exit();
  } else {
    input += char;
  }
});

function verifyAndUnlock(password) {
  const inputHash = crypto.createHash('sha256').update(password).digest('hex');

  if (inputHash !== storedHash) {
    console.error('❌ Wrong password! Access denied.');
    process.exit(1);
  }

  console.log('✅ Password correct! Unlocking .husky/ directory...');

  try {
    const files = fs.readdirSync(PROTECTED_DIR).map(f => path.join(PROTECTED_DIR, f));
    const platform = process.platform;

    files.forEach(file => {
      if (!fs.statSync(file).isFile()) return;
      if (platform === 'linux') execSync(`sudo chattr -i ${file}`);
      else if (platform === 'darwin') execSync(`chflags nouchg ${file}`);
      else if (platform === 'win32') execSync(`icacls ${file} /grant Everyone:W`);
    });

    console.log('✅ .husky/ is unlocked. Make your changes, then run lock-husky.');
  } catch (err) {
    console.error('❌ Failed to unlock:', err.message);
    process.exit(1);
  }
}