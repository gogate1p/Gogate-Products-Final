'use client';

import { useState } from 'react';

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  stock: number;
  reserved: number;
  lowStockThreshold: number;
  status: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
}

const initialStock: InventoryItem[] = [
  { id: '1', name: 'Original Ratnagiri Alphonso Mango - 1 Dozen', sku: 'GGT-MNG-ALPH-1DZ', stock: 120, reserved: 15, lowStockThreshold: 20, status: 'IN_STOCK' },
  { id: '2', name: 'Konkan Jumbo Roasted Cashews W180 (500g)', sku: 'GGT-CSH-W180-500G', stock: 350, reserved: 40, lowStockThreshold: 50, status: 'IN_STOCK' },
  { id: '3', name: 'Pure Cold-Pressed Kokum Agal (750ml)', sku: 'GGT-KKM-AGAL-750ML', stock: 200, reserved: 8, lowStockThreshold: 25, status: 'IN_STOCK' },
  { id: '4', name: 'Stone-Pounded Konkan Malvani Special Masala (500g)', sku: 'GGT-SPC-MALV-500G', stock: 18, reserved: 5, lowStockThreshold: 30, status: 'LOW_STOCK' },
];

export default function InventoryManagementPage() {
  const [items, setItems] = useState<InventoryItem[]>(initialStock);

  const updateStock = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStock = Math.max(0, item.stock + delta);
          let newStatus: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK' = 'IN_STOCK';
          if (newStock === 0) newStatus = 'OUT_OF_STOCK';
          else if (newStock <= item.lowStockThreshold) newStatus = 'LOW_STOCK';
          return { ...item, stock: newStock, status: newStatus };
        }
        return item;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-stone-900 tracking-tight">Inventory & Stock Tracking</h2>
        <p className="text-sm text-stone-500 mt-1">
          Monitor farm stock levels, reserved allocations for orders, and trigger restock thresholds.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
        <table className="w-full text-left text-sm text-stone-600">
          <thead className="bg-stone-50 text-xs uppercase font-semibold text-stone-500 border-b border-stone-200">
            <tr>
              <th className="py-3 px-5">Product Name & SKU</th>
              <th className="py-3 px-5">Available Stock</th>
              <th className="py-3 px-5">Allocated / In-Cart</th>
              <th className="py-3 px-5">Reorder Alert</th>
              <th className="py-3 px-5">Status</th>
              <th className="py-3 px-5 text-right">Quick Stock Adjustment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-stone-50/80 transition">
                <td className="py-4 px-5">
                  <p className="font-bold text-stone-900">{item.name}</p>
                  <p className="text-xs text-stone-400 font-mono">{item.sku}</p>
                </td>
                <td className="py-4 px-5">
                  <span className="font-bold text-stone-900 text-base">{item.stock}</span>
                </td>
                <td className="py-4 px-5">
                  <span className="text-xs text-stone-500">{item.reserved} units</span>
                </td>
                <td className="py-4 px-5">
                  <span className="text-xs text-stone-500">&lt; {item.lowStockThreshold} units</span>
                </td>
                <td className="py-4 px-5">
                  <span
                    className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      item.status === 'IN_STOCK'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.status === 'LOW_STOCK'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {item.status.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="py-4 px-5 text-right space-x-2">
                  <button
                    onClick={() => updateStock(item.id, -10)}
                    className="px-2.5 py-1 text-xs font-bold text-stone-700 bg-stone-100 rounded hover:bg-stone-200"
                  >
                    -10
                  </button>
                  <button
                    onClick={() => updateStock(item.id, +10)}
                    className="px-2.5 py-1 text-xs font-bold text-white bg-emerald-700 rounded hover:bg-emerald-800"
                  >
                    +10
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
