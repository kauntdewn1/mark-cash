import * as admin from 'firebase-admin';

// Log temporário para debug
console.log("🔥 Firebase ENV:", {
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
  PRIVATE_KEY_START: process.env.FIREBASE_PRIVATE_KEY?.slice(0, 30) + '...'
});

// Inicialização do Firebase Admin para Next.js
if (!admin.apps.length) {
  console.log('Inicializando Firebase Admin...');
  console.log("🔥 Firebase env check:", {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.slice(0, 30) + '...',
  });

  if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
    throw new Error('Credenciais do Firebase não encontradas nas variáveis de ambiente');
  }

  // Limpa a chave privada de possíveis problemas de formatação
  const privateKey = process.env.FIREBASE_PRIVATE_KEY
    .replace(/\\n/g, '\n')
    .replace(/"/g, '')
    .trim();

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey,
    }),
  });
}

export const auth = admin.auth();
export const firestore = admin.firestore();
export const storage = admin.storage();
export const FieldValue = admin.firestore.FieldValue; 