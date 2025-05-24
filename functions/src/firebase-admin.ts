import * as admin from 'firebase-admin';

// Inicialização robusta do Firebase Admin
const adminConfig: admin.AppOptions = {};

if (process.env.FIREBASE_PROJECT_ID) {
  // Produção: usar variáveis de ambiente
  adminConfig.credential = admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  });
} else {
  // Desenvolvimento: usar arquivo local
  const serviceAccount = require('./serviceAccountKey.json');
  adminConfig.credential = admin.credential.cert(serviceAccount);
}

// Inicializa apenas se ainda não foi inicializado
if (!admin.apps.length) {
  admin.initializeApp(adminConfig);
}

export const auth = admin.auth();
export const firestore = admin.firestore();
export const storage = admin.storage();
export const FieldValue = admin.firestore.FieldValue; 