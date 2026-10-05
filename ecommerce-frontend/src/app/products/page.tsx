import { apiFetch } from '@/lib/api';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  image_url?: string;
}

export default async function ProductsPage() {
  let products: Product[] = [];
  let errorMsg = '';

  try {
    const data = await apiFetch('/products');
    products = Array.isArray(data) ? data : data?.data || [];
  } catch (err: any) {
    errorMsg = err?.message || 'Error al cargar los productos de la API';
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Catálogo de Productos</h1>

      {errorMsg && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md mb-6">
          {errorMsg}
        </div>
      )}

      {products.length === 0 && !errorMsg ? (
        <p className="text-gray-500">No hay productos disponibles por el momento.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white border rounded-lg shadow hover:shadow-md transition p-4 flex flex-col justify-between">
              <div>
                <div className="w-full h-48 bg-gray-100 rounded-md mb-4 flex items-center justify-center overflow-hidden">
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} className="object-cover h-full w-full" />
                  ) : (
                    <span className="text-gray-400 text-sm">Sin Imagen</span>
                  )}
                </div>
                <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
              </div>

              <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <span className="text-xl font-bold text-blue-600">${Number(product.price).toFixed(2)}</span>
                <Link
                  href={`/products/${product.id}`}
                  className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                >
                  Ver Detalle
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}