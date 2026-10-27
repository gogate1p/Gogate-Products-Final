'use client';

import { useState } from 'react';
import OrderPipelineTracker, { CourierDetails } from '../../components/OrderPipelineTracker';

interface MasterOrder {
  id: string;
  orderNumber: string; // 12-digit numeric ID
  storeName: string;
  customerName: string;
  customerEmail: string;
  itemsSummary: string;
  amount: number;
  deliveryType: 'SHIPPING' | 'STORE_PICKUP';
  paymentGateway: string;
  paymentStatus: 'PAID' | 'PENDING' | 'REFUNDED';
  orderStatus: 'SHIPPED' | 'PACKED' | 'DELIVERED' | 'PLACED' | 'CANCELLED';
  cancellationReason?: string;
  awbNumber?: string;
  courierPartner?: 'SHIPROCKET' | 'NIMBUSPOST' | 'TOOKAN' | 'SHIPDAY' | 'PIDGE' | 'IN_HOUSE';
  date: string;
}

const initialOrders: MasterOrder[] = [
  {
    id: 'ord_1',
    orderNumber: '202610278491',
    storeName: 'Gogate Organic Orchards (Ratnagiri Flagship)',
    customerName: 'Ananya Sharma',
    customerEmail: 'ananya@example.com',
    itemsSummary: '1x Alphonso Mango 1 Dozen, 1x Jumbo Cashews W180',
    amount: 2261.45,
    deliveryType: 'SHIPPING',
    paymentGateway: 'RAZORPAY',
    paymentStatus: 'PAID',
    orderStatus: 'SHIPPED',
    awbNumber: 'SR-8899221100',
    courierPartner: 'SHIPROCKET',
    date: 'Oct 27, 2026',
  },
  {
    id: 'ord_2',
    orderNumber: '202610278492',
    storeName: 'Gogate Organic Orchards (Ratnagiri Flagship)',
    customerName: 'Rahul Kulkarni',
    customerEmail: 'rahul@example.com',
    itemsSummary: '2x Alphonso Mangoes Grade A (Pre-Order)',
    amount: 2900.0,
    deliveryType: 'STORE_PICKUP',
    paymentGateway: 'CASHFREE',
    paymentStatus: 'PAID',
    orderStatus: 'PACKED',
    date: 'Oct 27, 2026',
  },
  {
    id: 'ord_3',
    orderNumber: '202610278493',
    storeName: 'Devgad Cashew & Spice Guild',
    customerName: 'Pooja Mehta',
    customerEmail: 'pooja@example.com',
    itemsSummary: '2x Kokum Agal 750ml, 1x Malvani Masala',
    amount: 900.0,
    deliveryType: 'SHIPPING',
    paymentGateway: 'PAYTM_PG',
    paymentStatus: 'PAID',
    orderStatus: 'SHIPPED',
    awbNumber: 'NP-7729103',
    courierPartner: 'NIMBUSPOST',
    date: 'Oct 26, 2026',
  },
  {
    id: 'ord_4',
    orderNumber: '202610278494',
    storeName: 'Konkan Honey & Amla Cooperative',
    customerName: 'Vikas Rao',
    customerEmail: 'vikas@example.com',
    itemsSummary: '1x Wild Forest Honey 1kg',
    amount: 650.0,
    deliveryType: 'SHIPPING',
    paymentGateway: 'EAZEBUZZ',
    paymentStatus: 'PAID',
    orderStatus: 'DELIVERED',
    awbNumber: 'GGT-EXP-992014',
    courierPartner: 'IN_HOUSE',
    date: 'Oct 25, 2026',
  },
];

export default function MasterOrdersPage() {
  const [orders, setOrders] = useState<MasterOrder[]>(initialOrders);
  const [inspectingOrder, setInspectingOrder] = useState<MasterOrder | null>(null);
  const [cancellingOrder, setCancellingOrder] = useState<MasterOrder | null>(null);
  const [cancelReason, setCancelReason] = useState('Customer requested via Admin Support');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleAdminCancelOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cancellingOrder) return;

    setOrders((prev) =>
      prev.map((o) =>
        o.id === cancellingOrder.id
          ? {
              ...o,
              orderStatus: 'CANCELLED',
              paymentStatus: 'REFUNDED',
              cancellationReason: cancelReason,
            }
          : o
      )
    );

    if (inspectingOrder && inspectingOrder.id === cancellingOrder.id) {
      setInspectingOrder({
        ...inspectingOrder,
        orderStatus: 'CANCELLED',
        paymentStatus: 'REFUNDED',
        cancellationReason: cancelReason,
      });
    }

    setCancellingOrder(null);
    showToast(
      `Order #${cancellingOrder.orderNumber} successfully cancelled by Admin. 100% refund of ₹${cancellingOrder.amount} initiated to ${cancellingOrder.paymentGateway}.`
    );
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-semibold animate-fade-in flex items-center gap-2">
          <span>🥭</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-stone-900 tracking-tight">Master Platform Orders</h2>
          <p className="text-xs text-stone-500 mt-1">
            Global order book, multi-carrier live tracking sync, and exclusive admin order cancellation authority.
          </p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-600">
            <thead className="bg-stone-50 text-[10px] uppercase font-bold text-stone-400 border-b border-stone-200 tracking-wider">
              <tr>
                <th className="px-6 py-4">Order ID & Date</th>
                <th className="px-6 py-4">Store</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Items Summary</th>
                <th className="px-6 py-4">Amount & Payment</th>
                <th className="px-6 py-4">Fulfillment & Courier</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Admin Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-stone-50/50 transition">
                  <td className="px-6 py-4">
                    <span className="font-mono font-bold text-stone-900 text-xs block">
                      {order.orderNumber}
                    </span>
                    <span className="text-[11px] text-stone-400">{order.date}</span>
                  </td>
                  <td className="px-6 py-4 font-bold text-stone-900 text-xs">
                    {order.storeName}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-stone-800 block text-xs">{order.customerName}</span>
                    <span className="text-[11px] text-stone-400">{order.customerEmail}</span>
                  </td>
                  <td className="px-6 py-4 max-w-xs text-stone-600">
                    <p className="truncate text-xs">{order.itemsSummary}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono font-bold text-stone-900 block text-xs">
                      ₹{order.amount.toFixed(2)}
                    </span>
                    <span
                      className={`text-[10px] font-bold ${
                        order.paymentStatus === 'PAID'
                          ? 'text-emerald-700'
                          : order.paymentStatus === 'REFUNDED'
                          ? 'text-rose-700'
                          : 'text-amber-700'
                      }`}
                    >
                      {order.paymentGateway} • {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {order.awbNumber ? (
                      <div className="space-y-0.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-900">
                          {order.courierPartner}
                        </span>
                        <span className="font-mono text-[11px] text-stone-500 block">
                          AWB: {order.awbNumber}
                        </span>
                      </div>
                    ) : (
                      <span className="text-[11px] text-stone-400">
                        {order.deliveryType === 'STORE_PICKUP' ? 'Store Pickup' : 'Awaiting Dispatch'}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                        order.orderStatus === 'DELIVERED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.orderStatus === 'SHIPPED'
                          ? 'bg-blue-100 text-blue-800'
                          : order.orderStatus === 'CANCELLED'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* Track Pipeline Action */}
                      <button
                        onClick={() => setInspectingOrder(order)}
                        className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-[11px] font-bold transition flex items-center gap-1 shadow-2xs"
                      >
                        <span>📍</span>
                        <span>Track Pipeline</span>
                      </button>

                      {/* Admin-Only Cancel Button */}
                      {order.orderStatus !== 'CANCELLED' && order.orderStatus !== 'DELIVERED' && (
                        <button
                          onClick={() => setCancellingOrder(order)}
                          className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-[11px] font-bold transition"
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* INSPECT ORDER PIPELINE MODAL */}
      {inspectingOrder && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <span className="text-xl">🚚</span>
                <div>
                  <h3 className="font-black text-stone-900 text-base">
                    Order Tracking Inspection (#{inspectingOrder.orderNumber})
                  </h3>
                  <p className="text-xs text-stone-500">
                    Store: {inspectingOrder.storeName} • Customer: {inspectingOrder.customerName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setInspectingOrder(null)}
                className="text-stone-400 hover:text-stone-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Embedded Shared Order Pipeline Tracker */}
            <OrderPipelineTracker
              mode="STANDARD"
              currentStatus={inspectingOrder.orderStatus}
              cancellationReason={inspectingOrder.cancellationReason}
              courier={{
                partner: inspectingOrder.courierPartner || 'SHIPROCKET',
                partnerName: inspectingOrder.courierPartner ? `${inspectingOrder.courierPartner} Integrated Network` : 'In-House Cold Fleet',
                awbNumber: inspectingOrder.awbNumber || 'SR-8899221100',
                trackingUrl: `https://shiprocket.co/tracking/${inspectingOrder.awbNumber || 'SR-8899221100'}`,
                courierStatus: 'In Transit - Hadapsar Destination Sorting Deck',
                lastSyncedAt: 'Just now',
              }}
            />

            <div className="flex justify-end pt-2 border-t border-stone-100">
              <button
                onClick={() => setInspectingOrder(null)}
                className="px-5 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold"
              >
                Close Inspection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADMIN CANCEL ORDER CONFIRMATION MODAL */}
      {cancellingOrder && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center gap-2 text-rose-600">
              <span className="text-2xl">🛑</span>
              <h3 className="font-black text-stone-900 text-base">
                Superadmin Order Cancellation
              </h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              You are about to cancel Order <strong>#{cancellingOrder.orderNumber}</strong> ({cancellingOrder.customerName}).
              Customer self-cancellation is disabled; this action can only be taken by Superadmin.
            </p>

            <form onSubmit={handleAdminCancelOrder} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Reason for Cancellation
                </label>
                <select
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full text-xs border border-stone-300 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="Customer requested via Admin Support">Customer requested via Admin Support</option>
                  <option value="Cold-chain vehicle delay or harvest batch issue">Cold-chain vehicle delay or harvest batch issue</option>
                  <option value="Perishable inventory out of stock">Perishable inventory out of stock</option>
                  <option value="Fraudulent or unverified delivery address">Fraudulent or unverified delivery address</option>
                </select>
              </div>

              <div className="p-3 bg-rose-50 rounded-2xl border border-rose-200 text-xs text-rose-950 space-y-1">
                <p><strong>Automatic Refund:</strong> ₹{cancellingOrder.amount.toFixed(2)}</p>
                <p><strong>Gateway:</strong> {cancellingOrder.paymentGateway}</p>
                <p className="text-[10px] text-rose-700">Immediate reversal to source bank account.</p>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setCancellingOrder(null)}
                  className="px-4 py-2 text-xs font-bold text-stone-600"
                >
                  Keep Order
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
                >
                  Confirm Cancellation & Refund
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
