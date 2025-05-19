import { NextResponse } from 'next/server';
import { auth } from '../../lib/firebase-admin';

export async function POST(request: Request) {
  try {
    const { walletAddress } = await request.json();

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Endereço da carteira é obrigatório' },
        { status: 400 }
      );
    }

    // Cria um token personalizado usando o endereço da carteira como UID
    const firebaseToken = await auth.createCustomToken(walletAddress);

    return NextResponse.json({ firebaseToken });
  } catch (error) {
    console.error('Erro ao gerar token:', error);
    return NextResponse.json(
      { error: 'Erro ao gerar token de autenticação' },
      { status: 500 }
    );
  }
} 