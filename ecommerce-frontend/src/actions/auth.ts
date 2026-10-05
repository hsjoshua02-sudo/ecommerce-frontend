'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || !password) {
    return { error: 'Por favor ingresa tu correo y contraseña.' };
  }

  let token = null;

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      cache: 'no-store',
    });

    // Leemos el texto plano primero para evitar el SyntaxError si Laravel devuelve HTML/PHP error
    const textResponse = await res.text();
    let data;
    
    try {
      data = JSON.parse(textResponse);
    } catch {
      console.error('LARAVEL DEVOLVIÓ ESTE ERROR DE PHP EN LUGAR DE JSON:', textResponse);
      return { error: 'Error interno en el servidor backend (Laravel).' };
    }

    if (!res.ok) {
      return { error: data.message || 'Credenciales incorrectas' };
    }

    token = data.token || data.access_token || data.plainTextToken;

    if (!token) {
      return { error: 'El servidor no devolvió un token válido.' };
    }

    const cookieStore = await cookies();
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
  } catch (err) {
    console.error('Error en loginAction:', err);
    return { error: 'No se pudo conectar con el servidor de autenticación' };
  }

  redirect('/products');
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
  redirect('/login');
}