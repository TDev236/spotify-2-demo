import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
    const token = await getToken({ req, secret:process.env.JWT_SECRET });
    
    const { pathname } = req.nextUrl

    // permitir solicitudes si lo siguiente es verdad....
    // 1) Es una solicitud de una sesion de next-auth y un fetch del provider
    // 2) el token existe

    if(pathname.includes('/api/auth') || token) {
        return NextResponse.next();
    }

    // Redirige a la pagina de login sino tinene token y estan solicitando una ruta protegida
    if ( !token && pathname != '/login'){
        return NextResponse.redirect('/login');
    }
}