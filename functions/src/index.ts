import * as functions from 'firebase-functions';
import cors from 'cors';
import { generateENSContentHash } from './ipfs';
import { auth, firestore, FieldValue } from './firebase-admin';

const corsHandler = cors({ origin: true });

// Função de login
export const login = functions.https.onRequest((req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
      }

      let userRecord;
      try {
        // Tentar criar novo usuário
        userRecord = await auth.createUser({
          email,
          password,
          emailVerified: false,
        });

        // Criar documento do usuário no Firestore
        await firestore.collection('users').doc(userRecord.uid).set({
          email: userRecord.email,
          createdAt: FieldValue.serverTimestamp(),
          balance: 1000, // Saldo inicial para testes
          stakedAmount: 0
        });
      } catch (error: any) {
        // Se o erro for de email já existente, buscar o usuário
        if (error.code === 'auth/email-already-exists') {
          userRecord = await auth.getUserByEmail(email);
          
          // Verificar se o documento do usuário existe
          const userDoc = await firestore
            .collection('users')
            .doc(userRecord.uid)
            .get();

          // Se não existir, criar o documento
          if (!userDoc.exists) {
            await firestore.collection('users').doc(userRecord.uid).set({
              email: userRecord.email,
              createdAt: FieldValue.serverTimestamp(),
              balance: 1000,
              stakedAmount: 0
            });
          }
        } else {
          throw error;
        }
      }

      return res.status(200).json({ 
        success: true, 
        uid: userRecord.uid,
        user: {
          uid: userRecord.uid,
          email: userRecord.email
        }
      });
    } catch (error: unknown) {
      console.error('Erro no login:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro interno do servidor';
      return res.status(500).json({ error: errorMessage });
    }
  });
});

// Função de staking
export const stake = functions.https.onRequest((req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const { uid, amount } = req.body;
      
      if (!uid) {
        return res.status(401).json({ error: 'UID não fornecido' });
      }

      if (!amount || amount <= 0) {
        return res.status(400).json({ error: 'Quantidade inválida' });
      }

      const userRef = firestore.collection('users').doc(uid);
      
      // Usar transação para garantir consistência
      await firestore.runTransaction(async (transaction) => {
        const userDoc = await transaction.get(userRef);
        
        if (!userDoc.exists) {
          throw new Error('Usuário não encontrado');
        }

        const userData = userDoc.data();
        const currentBalance = userData?.balance || 0;
        
        if (currentBalance < amount) {
          throw new Error('Saldo insuficiente');
        }

        const newStakedAmount = (userData?.stakedAmount || 0) + amount;
        const newBalance = currentBalance - amount;

        // Criar registro de stake para IPFS
        const stakeRecord = {
          userId: uid,
          amount,
          timestamp: new Date().toISOString(),
          type: 'stake',
          previousBalance: currentBalance,
          newBalance,
          previousStakedAmount: userData?.stakedAmount || 0,
          newStakedAmount
        };

        // Gerar Content Hash do ENS
        const { cid, ensContentHash, contentHash } = await generateENSContentHash(stakeRecord);

        transaction.update(userRef, {
          balance: newBalance,
          stakedAmount: newStakedAmount,
          lastStake: FieldValue.serverTimestamp(),
          lastStakeHash: contentHash,
          lastStakeCid: cid,
          lastStakeEnsHash: ensContentHash
        });
      });

      return res.status(200).json({ 
        success: true,
        message: 'Stake realizado com sucesso'
      });
    } catch (error: unknown) {
      console.error('Erro no stake:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro interno do servidor';
      return res.status(500).json({ error: errorMessage });
    }
  });
});

// Função para obter dados do Firestore
export const getData = functions.https.onRequest((req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const { uid } = req.query;
      
      if (!uid) {
        return res.status(401).json({ error: 'UID não fornecido' });
      }

      const userDoc = await firestore
        .collection('users')
        .doc(uid as string)
        .get();

      if (!userDoc.exists) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      return res.status(200).json({
        success: true,
        data: userDoc.data()
      });
    } catch (error: unknown) {
      console.error('Erro ao obter dados:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro interno do servidor';
      return res.status(500).json({ error: errorMessage });
    }
  });
});

// Exemplo de função HTTP
export const helloWorld = functions.https.onRequest((request, response) => {
  response.json({ message: "Hello from Firebase!" });
});

// Exemplo de função de autenticação
export const onUserCreated = functions.auth.user().onCreate((user) => {
  // Lógica para quando um usuário é criado
  console.log('Novo usuário criado:', user.uid);
  return null;
});

// Função para atualizar o Content Hash do ENS
export const updateENSContent = functions.https.onRequest((req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const { uid, content } = req.body;
      
      if (!uid) {
        return res.status(401).json({ error: 'UID não fornecido' });
      }

      if (!content) {
        return res.status(400).json({ error: 'Conteúdo não fornecido' });
      }

      // Gerar Content Hash do ENS
      const { cid, ensContentHash, contentHash } = await generateENSContentHash(content);

      // Atualizar no Firestore
      await firestore.collection('users').doc(uid).update({
        ensContent: {
          cid,
          ensContentHash,
          contentHash,
          updatedAt: FieldValue.serverTimestamp()
        }
      });

      return res.status(200).json({ 
        success: true,
        data: {
          cid,
          ensContentHash,
          contentHash
        }
      });
    } catch (error: unknown) {
      console.error('Erro ao atualizar Content Hash do ENS:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro interno do servidor';
      return res.status(500).json({ error: errorMessage });
    }
  });
}); 