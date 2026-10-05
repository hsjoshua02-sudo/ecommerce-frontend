'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">No hay productos para procesar</h1>
        <button
          onClick={() => router.push('/products')}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Ir a la tienda
        </button>
      </div>
    );
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulación de procesamiento de la orden
      await new Promise((resolve) => setTimeout(resolve, 1500));
      clearCart();
      alert('¡Pedido realizado con éxito!');
      router.push('/products');
    } catch {
      setError('Ocurrió un error al procesar tu compra. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Finalizar Compra</h1>

      <div className="bg-white p-6 rounded-xl shadow-md border space-y-6">
        <div>
          <h2 className="text-lg font-semibold border-b pb-2 mb-4">Resumen de la Orden</h2>
          <div className="space-y-2">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} x {item.quantity}</span>
                <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-4 mt-4">
            <span>Total a pagar:</span>
            <span className="text-blue-600">${total.toFixed(2)}</span>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-100 text-red-700 text-sm rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleCheckout} className="space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">Datos de Envío</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Dirección Completa</label>
            <input
              type="text"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
              placeholder="Calle Principal #123, Colonia..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Teléfono de Contacto</label>
            <input
              type="tel"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
              placeholder="7000-0000"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? 'Procesando Pago...' : 'Confirmar y Pagar'}
          </button>
        </form>
      </div>
    </div>
  );
}