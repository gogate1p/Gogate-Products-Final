'use client';

import { useState } from 'react';
import Image from 'next/image';

interface OrganicProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  mrp: number;
  sku: string;
  stock: number;
  fssaiNo: string;
  udyamNo?: string;
  manufacturerName: string;
  originRegion: string;
  image: string;
  weightGrams: number;
  isQuickDelivery: boolean;
}

const initialCatalog: OrganicProductItem[] = [
  {
    id: 'prod_1',
    name: 'Original Ratnagiri Alphonso Mango (Hapus) - Grade A (1 Dozen)',
    category: 'MANGOES',
    price: 1450,
    mrp: 1800,
    sku: 'GGT-MNG-ALPH-1DZ',
    stock: 120,
    fssaiNo: '11521045000123',
    udyamNo: 'UDYAM-MH-27-0012345',
    manufacturerName: 'Gogate Agro Farms Pvt Ltd',
    originRegion: 'Pawas, Ratnagiri',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=800',
    weightGrams: 3200,
    isQuickDelivery: true,
  },
  {
    id: 'prod_2',
    name: 'Konkan Jumbo Roasted & Salted Cashews - W180 King Size (500g)',
    category: 'CASHEWS',
    price: 799,
    mrp: 950,
    sku: 'GGT-CSH-W180-500G',
    stock: 350,
    fssaiNo: '11521045000123',
    udyamNo: 'UDYAM-MH-27-0012345',
    manufacturerName: 'Gogate Agro Farms Pvt Ltd',
    originRegion: 'Ratnagiri, Maharashtra',
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=800',
    weightGrams: 500,
    isQuickDelivery: true,
  },
  {
    id: 'prod_3',
    name: 'Pure Cold-Pressed Kokum Agal (Zero Sugar - 750ml)',
    category: 'KOKUM_PRODUCTS',
    price: 260,
    mrp: 320,
    sku: 'GGT-KKM-AGAL-750ML',
    stock: 200,
    fssaiNo: '11521045000123',
    udyamNo: 'UDYAM-MH-27-0012345',
    manufacturerName: 'Gogate Agro Farms Pvt Ltd',
    originRegion: 'Ratnagiri, Maharashtra',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800',
    weightGrams: 850,
    isQuickDelivery: true,
  },
  {
    id: 'prod_4',
    name: 'Stone-Pounded Konkan Malvani Special Masala (500g)',
    category: 'SPICES_AND_MASALAS',
    price: 380,
    mrp: 450,
    sku: 'GGT-SPC-MALV-500G',
    stock: 180,
    fssaiNo: '11521045000123',
    udyamNo: 'UDYAM-MH-27-0012345',
    manufacturerName: 'Gogate Agro Farms Pvt Ltd',
    originRegion: 'Konkan, Maharashtra',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800',
    weightGrams: 520,
    isQuickDelivery: false,
  },
];


export default function SellerProductsPage() {
  const [products, setProducts] = useState<OrganicProductItem[]>(initialCatalog);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProd, setNewProd] = useState({
    name: '',
    category: 'MANGOES',
    price: '',
    mrp: '',
    sku: '',
    stock: '',
    fssaiNo: '11521045000123',
    udyamNo: 'UDYAM-MH-27-0012345',
    manufacturerName: 'Gogate Agro Farms Pvt Ltd',
    manufacturerAddress: 'Gogate Wadi, Pawas, Ratnagiri 415616',
    originRegion: 'Ratnagiri, Maharashtra',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=800',
    weightGrams: '1000',
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const created: OrganicProductItem = {
      id: `prod_${Date.now()}`,
      name: newProd.name,
      category: newProd.category,
      price: parseFloat(newProd.price),
      mrp: parseFloat(newProd.mrp),
      sku: newProd.sku || `GGT-${Date.now().toString().slice(-6)}`,
      stock: parseInt(newProd.stock) || 50,
      fssaiNo: newProd.fssaiNo,
      udyamNo: newProd.udyamNo,
      manufacturerName: newProd.manufacturerName,
      originRegion: newProd.originRegion,
      image: newProd.image,
      weightGrams: parseFloat(newProd.weightGrams) || 500,
      isQuickDelivery: true,
    };
    setProducts([created, ...products]);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-stone-900 tracking-tight">Products & Organic Catalog</h2>
          <p className="text-sm text-stone-500 mt-1">
            Manage your store's agricultural produce with mandatory FSSAI, Udyam, MRP, and manufacturing compliance.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 text-white rounded-lg text-sm font-semibold hover:bg-emerald-800 shadow-sm transition"
        >
          <span>+</span> Add Organic Product
        </button>
      </div>

      {/* Catalog Table */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-stone-600">
            <thead className="bg-stone-50 text-xs uppercase font-semibold text-stone-500 border-b border-stone-200">
              <tr>
                <th className="py-3 px-5">Product & Images</th>
                <th className="py-3 px-5">Category & SKU</th>
                <th className="py-3 px-5">Pricing & MRP</th>
                <th className="py-3 px-5">Stock & Weight</th>
                <th className="py-3 px-5">FSSAI / Udyam / Mfr</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {products.map((item) => (
                <tr key={item.id} className="hover:bg-stone-50/80 transition">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-stone-900 line-clamp-1">{item.name}</p>
                        <p className="text-xs text-emerald-700 font-medium">📍 {item.originRegion}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-stone-100 text-stone-700">
                      {item.category}
                    </span>
                    <p className="text-xs text-stone-400 font-mono mt-0.5">{item.sku}</p>
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold text-stone-900 text-base">₹{item.price}</span>
                      <span className="text-xs text-stone-400 line-through">₹{item.mrp}</span>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-semibold">
                      Save {Math.round(((item.mrp - item.price) / item.mrp) * 100)}%
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <p className="font-bold text-stone-900">{item.stock} in stock</p>
                    <p className="text-xs text-stone-400">{item.weightGrams}g unit</p>
                  </td>
                  <td className="py-4 px-5">
                    <p className="text-xs font-mono text-emerald-800 font-medium">FSSAI: {item.fssaiNo}</p>
                    {item.udyamNo && (
                      <p className="text-[11px] font-mono text-amber-800">Udyam: {item.udyamNo}</p>
                    )}
                    <p className="text-[11px] text-stone-500 line-clamp-1">Mfr: {item.manufacturerName}</p>
                  </td>
                  <td className="py-4 px-5 text-right space-x-2">
                    <button className="text-xs font-semibold text-stone-700 bg-stone-100 px-2.5 py-1 rounded hover:bg-stone-200">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-stone-900 mb-1">Add Organic Farm Produce</h3>
            <p className="text-xs text-stone-500 mb-4">
              Enter product details with mandatory food authority FSSAI and MSME Udyam numbers.
            </p>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Certified Organic Devgad Alphonso Mangoes (2 Dozen)"
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  className="w-full text-sm border border-stone-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Category *</label>
                  <select
                    value={newProd.category}
                    onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                    className="w-full text-sm border border-stone-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="MANGOES">Mangoes (Hapus/Kesar)</option>
                    <option value="CASHEWS">Cashews (Kaju)</option>
                    <option value="KOKUM_PRODUCTS">Kokum Products & Agal</option>
                    <option value="SPICES_AND_MASALAS">Organic Spices & Masalas</option>
                    <option value="PICKLES_CHUTNEYS">Pickles & Chutneys</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">SKU Code</label>
                  <input
                    type="text"
                    placeholder="GGT-MNG-DEV-2DZ"
                    value={newProd.sku}
                    onChange={(e) => setNewProd({ ...newProd, sku: e.target.value })}
                    className="w-full text-sm font-mono border border-stone-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    placeholder="1450"
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                    className="w-full text-sm border border-stone-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">MRP (₹) *</label>
                  <input
                    type="number"
                    required
                    placeholder="1800"
                    value={newProd.mrp}
                    onChange={(e) => setNewProd({ ...newProd, mrp: e.target.value })}
                    className="w-full text-sm border border-stone-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Initial Stock *</label>
                  <input
                    type="number"
                    required
                    placeholder="100"
                    value={newProd.stock}
                    onChange={(e) => setNewProd({ ...newProd, stock: e.target.value })}
                    className="w-full text-sm border border-stone-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">FSSAI License No. *</label>
                  <input
                    type="text"
                    required
                    placeholder="11521045000123"
                    value={newProd.fssaiNo}
                    onChange={(e) => setNewProd({ ...newProd, fssaiNo: e.target.value })}
                    className="w-full text-sm font-mono border border-stone-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Udyam Registration</label>
                  <input
                    type="text"
                    placeholder="UDYAM-MH-27-0012345"
                    value={newProd.udyamNo}
                    onChange={(e) => setNewProd({ ...newProd, udyamNo: e.target.value })}
                    className="w-full text-sm font-mono border border-stone-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Manufacturer Name *</label>
                  <input
                    type="text"
                    required
                    value={newProd.manufacturerName}
                    onChange={(e) => setNewProd({ ...newProd, manufacturerName: e.target.value })}
                    className="w-full text-sm border border-stone-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Product Image URL *</label>
                  <input
                    type="text"
                    required
                    value={newProd.image}
                    onChange={(e) => setNewProd({ ...newProd, image: e.target.value })}
                    className="w-full text-sm border border-stone-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 shadow-sm"
                >
                  Save & Publish Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
