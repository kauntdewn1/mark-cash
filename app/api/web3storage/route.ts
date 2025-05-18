import { NextResponse } from 'next/server';
import { Web3Storage } from 'web3.storage';
import { firestore, FieldValue } from '../../lib/firebase-admin';

// Inicializa o cliente Web3.Storage
const client = new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN || '' });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Payload recebido:", body);
    
    const { uid, content } = body;

    if (!uid) {
      return NextResponse.json(
        { error: 'UID não fornecido' },
        { status: 400 }
      );
    }

    if (!content) {
      return NextResponse.json(
        { error: 'Conteúdo não fornecido' },
        { status: 400 }
      );
    }

    // Converte o conteúdo para File
    const file = new File([JSON.stringify(content, null, 2)], `markcash-${Date.now()}.json`, {
      type: 'application/json',
    });

    // Faz upload para o Web3.Storage
    const cid = await client.put([file]);

    // Atualiza o Firestore com o CID
    await firestore.collection('users').doc(uid).update({
      web3Storage: {
        cid,
        content,
        updatedAt: FieldValue.serverTimestamp()
      }
    });

    return NextResponse.json({ 
      success: true,
      cid,
      url: `https://${cid}.ipfs.w3s.link`
    });
  } catch (error) {
    console.error('Erro ao exportar para Web3.Storage:', error);
    return NextResponse.json(
      { error: 'Erro ao exportar para Web3.Storage' },
      { status: 500 }
    );
  }
} 