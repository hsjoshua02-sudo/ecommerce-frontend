'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { logoutAction } from '@/actions/auth';

export default function Navbar() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/products" className="text-xl font-bold text-blue-600 tracking-tight">
          MiTienda
        </Link>

        <div className="flex items-center space-x-6">
          <Link href="/products" className="text-gray-600 hover:text-blue-600 font-medium transition">
            Productos
          </Link>

          <Link href="/cart" className="relative text-gray-600 hover:text-blue-600 font-medium transition flex items-center gap-1">
            <span>Carrito</span>
            {totalItems > 0 && (
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          <form action={logoutAction}>
            <button
              type="submit"
              className="text-sm px-3 py-1.5 border border-red-500 text-red-600 hover:bg-red-50 rounded-md transition"
            >
              Cerrar Sesión
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}