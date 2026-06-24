import crypto from 'crypto';
import fs from 'fs';

const HASH_FILE = '.husky-password.sha256';

if (fs.existsSync(HASH_FILE)) {
  console.error('❌ Password hash already exists! Cannot regenerate.');
  process.exit(1);
}

if (!process.argv[2]) {
  console.error('❌ Usage: node scripts/generate-password-hash.js <password>');
  process.exit(1);
}

const hash = crypto.createHash('sha256').update(process.argv[2]).digest('hex');
fs.writeFileSync(HASH_FILE, hash);
console.log('✅ Password hash stored in', HASH_FILE);