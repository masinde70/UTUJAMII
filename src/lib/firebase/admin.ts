import 'server-only';
import { cert, getApps, initializeApp, type ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

function loadCredentials(): ServiceAccount {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
  }
  const filePath = process.env.FIREBASE_ADMIN_KEY_PATH;
  if (!filePath) {
    throw new Error(
      'Firebase Admin credentials missing. Set FIREBASE_SERVICE_ACCOUNT_KEY (JSON, for production) or FIREBASE_ADMIN_KEY_PATH (file path, for local dev).',
    );
  }
  return JSON.parse(readFileSync(resolve(process.cwd(), filePath), 'utf-8'));
}

const isFirstInit = getApps().length === 0;
const app = isFirstInit
  ? initializeApp({ credential: cert(loadCredentials()) })
  : getApps()[0];

export const adminDb = getFirestore(app);
if (isFirstInit) {
  adminDb.settings({ ignoreUndefinedProperties: true });
}
export const adminAuth = getAuth(app);
