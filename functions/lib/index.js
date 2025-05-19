"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onUserCreated = exports.helloWorld = exports.getData = exports.stake = exports.login = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors");
admin.initializeApp();
const corsHandler = cors({ origin: true });
// Função de login
exports.login = functions.https.onRequest((req, res) => {
    return corsHandler(req, res, async () => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ error: 'Email e senha são obrigatórios' });
            }
            let userRecord;
            try {
                // Tentar criar novo usuário
                userRecord = await admin.auth().createUser({
                    email,
                    password,
                    emailVerified: false,
                });
                // Criar documento do usuário no Firestore
                await admin.firestore().collection('users').doc(userRecord.uid).set({
                    email: userRecord.email,
                    createdAt: admin.firestore.FieldValue.serverTimestamp(),
                    balance: 1000, // Saldo inicial para testes
                    stakedAmount: 0
                });
            }
            catch (error) {
                // Se o erro for de email já existente, buscar o usuário
                if (error.code === 'auth/email-already-exists') {
                    userRecord = await admin.auth().getUserByEmail(email);
                    // Verificar se o documento do usuário existe
                    const userDoc = await admin.firestore()
                        .collection('users')
                        .doc(userRecord.uid)
                        .get();
                    // Se não existir, criar o documento
                    if (!userDoc.exists) {
                        await admin.firestore().collection('users').doc(userRecord.uid).set({
                            email: userRecord.email,
                            createdAt: admin.firestore.FieldValue.serverTimestamp(),
                            balance: 1000,
                            stakedAmount: 0
                        });
                    }
                }
                else {
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
        }
        catch (error) {
            console.error('Erro no login:', error);
            const errorMessage = error instanceof Error ? error.message : 'Erro interno do servidor';
            return res.status(500).json({ error: errorMessage });
        }
    });
});
// Função de staking
exports.stake = functions.https.onRequest((req, res) => {
    return corsHandler(req, res, async () => {
        try {
            const { uid, amount } = req.body;
            if (!uid) {
                return res.status(401).json({ error: 'UID não fornecido' });
            }
            if (!amount || amount <= 0) {
                return res.status(400).json({ error: 'Quantidade inválida' });
            }
            const userRef = admin.firestore().collection('users').doc(uid);
            // Usar transação para garantir consistência
            await admin.firestore().runTransaction(async (transaction) => {
                const userDoc = await transaction.get(userRef);
                if (!userDoc.exists) {
                    throw new Error('Usuário não encontrado');
                }
                const userData = userDoc.data();
                const currentBalance = (userData === null || userData === void 0 ? void 0 : userData.balance) || 0;
                if (currentBalance < amount) {
                    throw new Error('Saldo insuficiente');
                }
                transaction.update(userRef, {
                    balance: currentBalance - amount,
                    stakedAmount: ((userData === null || userData === void 0 ? void 0 : userData.stakedAmount) || 0) + amount,
                    lastStake: admin.firestore.FieldValue.serverTimestamp()
                });
            });
            return res.status(200).json({
                success: true,
                message: 'Stake realizado com sucesso'
            });
        }
        catch (error) {
            console.error('Erro no stake:', error);
            const errorMessage = error instanceof Error ? error.message : 'Erro interno do servidor';
            return res.status(500).json({ error: errorMessage });
        }
    });
});
// Função para obter dados do Firestore
exports.getData = functions.https.onRequest((req, res) => {
    return corsHandler(req, res, async () => {
        try {
            const { uid } = req.query;
            if (!uid) {
                return res.status(401).json({ error: 'UID não fornecido' });
            }
            const userDoc = await admin.firestore()
                .collection('users')
                .doc(uid)
                .get();
            if (!userDoc.exists) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            return res.status(200).json({
                success: true,
                data: userDoc.data()
            });
        }
        catch (error) {
            console.error('Erro ao obter dados:', error);
            const errorMessage = error instanceof Error ? error.message : 'Erro interno do servidor';
            return res.status(500).json({ error: errorMessage });
        }
    });
});
// Exemplo de função HTTP
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.json({ message: "Hello from Firebase!" });
});
// Exemplo de função de autenticação
exports.onUserCreated = functions.auth.user().onCreate((user) => {
    // Lógica para quando um usuário é criado
    console.log('Novo usuário criado:', user.uid);
    return null;
});
//# sourceMappingURL=index.js.map