'use client';

import { useActionState } from 'react';
import { registerAction } from '@/actions/auth';
import Link from 'next/link';

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerAction, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Crear Cuenta</h2>

        {state?.error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 text-sm rounded">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              name="name"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              name="password"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
            <input
              type="password"
              name="password_confirmation"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm text-black"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isPending ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}