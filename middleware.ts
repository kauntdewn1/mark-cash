import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Lista de endereços autorizados (seus endereços)
const ADMIN_ADDRESSES = [
  '0x58edcf4b0ae4591b873664734fd6731ae1aae962', // Substitua pelo seu endereço
]

export function middleware(request: NextRequest) {
  // Verifica se é uma rota admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const walletAddress = request.cookies.get('wallet_address')?.value

    // Se não tiver wallet conectada ou não for admin, redireciona
    if (!walletAddress || !ADMIN_ADDRESSES.includes(walletAddress.toLowerCase())) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
} 