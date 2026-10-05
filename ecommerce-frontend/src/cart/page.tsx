'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, clearCart, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío</h1>
        <p className="text-gray-600 mb-6">Parece que aún no has añadido productos.</p>
        <Link
          href="/products"
          className="inline-block px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Explorar Productos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tu Carrito de Compras</h1>

      <div className="bg-white border rounded-lg shadow-sm p-6 space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
            <div>
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-sm text-gray-500">
                ${Number(item.price).toFixed(2)} x {item.quantity}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="font-bold text-gray-800">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}

        <div className="pt-4 border-t flex items-center justify-between">
          <button
            onClick={clearCart}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Vaciar Carrito
          </button>
          <div className="text-right">
            <span className="text-gray-600 mr-2 font-medium">Total:</span>
            <span className="text-2xl font-bold text-blue-600">${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Link
            href="/checkout"
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
          >
            Proceder al Pago
          </Link>
        </div>
      </div>
    </div>
  );
}