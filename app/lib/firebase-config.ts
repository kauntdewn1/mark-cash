import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // Adicione outras configurações públicas necessárias
};

// Inicializa o Firebase apenas se não estiver em modo de exportação estática
let app: FirebaseApp | undefined;
if (!process.env.NEXT_PUBLIC_STATIC_EXPORT) {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
}

// Exporta serviços apenas se o app estiver inicializado
export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export default app; 