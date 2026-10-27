'use client';

import { useState } from 'react';
import OrderPipelineTracker from '../../components/OrderPipelineTracker';

interface SellerOrder {
  id: string;
  orderNumber: string; // 12-digit numeric ID
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingAddress: string;
  pincode: string;
  items: {
    productName: string;
    quantity: number;
    unitPrice: number;
    fssaiNo: string;
  }[];
  subtotal: number;
  tax: number;
  totalAmount: number;
  orderDate: string;
  deliverByDate: string;
  status: 'PLACED' | 'ACCEPTED' | 'PACKED' | 'SHIPPED' | 'DELIVERED';
  breachDate?: string; // SLA deadline
  courierPartner?: string;
  awbNumber?: string;
  eWayBillNumber?: string;
  courierPickupDate?: string;
}

const initialOrders: SellerOrder[] = [
  {
    id: 'ord_1',
    orderNumber: '202610278491',
    customerName: 'Ananya Sharma',
    customerPhone: '+919988776655',
    customerEmail: 'ananya.sharma@example.com',
    shippingAddress: 'Flat 402, Green Meadows, Koregaon Park, Pune, Maharashtra',
    pincode: '411001',
    items: [
      { productName: 'Original Ratnagiri Alphonso Mango (1 Dozen)', quantity: 1, unitPrice: 1450, fssaiNo: '11521045000123' },
      { productName: 'Konkan Jumbo Roasted Cashews W180 (500g)', quantity: 1, unitPrice: 799, fssaiNo: '11521045000123' },
    ],
    subtotal: 2249,
    tax: 112.45,
    totalAmount: 2361.45,
    orderDate: '27 Oct 2026, 09:15 AM',
    deliverByDate: '29 Oct 2026, 06:00 PM',
    status: 'PLACED',
  },
  {
    id: 'ord_2',
    orderNumber: '202610278492',
    customerName: 'Rahul Kulkarni',
    customerPhone: '+919877665544',
    customerEmail: 'rahul.kulkarni@example.com',
    shippingAddress: '15, Prabhat Road, Lane 4, Erandwane, Pune, Maharashtra',
    pincode: '411004',
    items: [
      { productName: 'Devgad Hapus Dried Mango Pulp (500g)', quantity: 2, unitPrice: 350, fssaiNo: '11521045000123' },
    ],
    subtotal: 700,
    tax: 35,
    totalAmount: 735,
    orderDate: '27 Oct 2026, 10:30 AM',
    deliverByDate: '30 Oct 2026, 05:00 PM',
    status: 'ACCEPTED',
    breachDate: '28 Oct 2026, 04:00 PM',
  },
  {
    id: 'ord_3',
    orderNumber: '202610278493',
    customerName: 'Meera Deshpande',
    customerPhone: '+919866112233',
    customerEmail: 'meera.d@example.com',
    shippingAddress: 'Plot 88, Hindu Colony, Dadar East, Mumbai, Maharashtra',
    pincode: '400014',
    items: [
      { productName: 'Pure Cold-Pressed Kokum Agal (750ml)', quantity: 3, unitPrice: 260, fssaiNo: '11521045000123' },
    ],
    subtotal: 780,
    tax: 39,
    totalAmount: 819,
    orderDate: '26 Oct 2026, 03:45 PM',
    deliverByDate: '28 Oct 2026, 07:00 PM',
    status: 'SHIPPED',
    breachDate: '27 Oct 2026, 03:00 PM',
    courierPartner: 'IN_HOUSE',
    awbNumber: 'GGT-EXP-992014',
    eWayBillNumber: 'EWB20268491902',
    courierPickupDate: '27 Oct 2026, 11:30 AM',
  },
];

export default function SellerOrdersManagementPage() {
  const [orders, setOrders] = useState<SellerOrder[]>(initialOrders);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeModalOrder, setActiveModalOrder] = useState<SellerOrder | null>(null);
  const [shippingModalOrder, setShippingModalOrder] = useState<SellerOrder | null>(null);
  const [chosenCourier, setChosenCourier] = useState('IN_HOUSE');
  const [printDocument, setPrintDocument] = useState<'INVOICE' | 'PACKAGING_SLIP' | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Select all toggler
  const toggleSelectAll = () => {
    if (selectedIds.length === orders.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(orders.map((o) => o.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Lifecycle 1: Accept Order
  const handleAcceptOrder = (orderId: string) => {
    const breach = new Date(Date.now() + 24 * 3600000).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'ACCEPTED', breachDate: breach } : o))
    );
    if (activeModalOrder?.id === orderId) {
      setActiveModalOrder({ ...activeModalOrder, status: 'ACCEPTED', breachDate: breach });
    }
    showToast('Order Accepted! Processing SLA countdown active.');
  };

  // Lifecycle 2: Pack Order
  const handlePackOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'PACKED' } : o))
    );
    if (activeModalOrder?.id === orderId) {
      setActiveModalOrder({ ...activeModalOrder, status: 'PACKED' });
    }
    showToast('Order marked as PACKED. Ready for courier assignment.');
  };

  // Lifecycle 3: Ship Order & Choose Courier
  const handleConfirmShip = () => {
    if (!shippingModalOrder) return;
    const awb =
      chosenCourier === 'IN_HOUSE'
        ? `GGT-EXP-${Date.now().toString().slice(-6)}`
        : chosenCourier === 'SHIPROCKET'
        ? `SR${Date.now().toString().slice(-8)}`
        : chosenCourier === 'NIMBUSPOST'
        ? `NP${Date.now().toString().slice(-8)}`
        : chosenCourier === 'TOOKAN'
        ? `TK${Date.now().toString().slice(-6)}`
        : chosenCourier === 'SHIPDAY'
        ? `SD${Date.now().toString().slice(-6)}`
        : `PDG${Date.now().toString().slice(-6)}`;

    const ewb = `EWB${new Date().getFullYear()}${Math.floor(1000000 + Math.random() * 9000000)}`;
    const pickupDate = new Date(Date.now() + 6 * 3600000).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });

    setOrders((prev) =>
      prev.map((o) =>
        o.id === shippingModalOrder.id
          ? {
              ...o,
              status: 'SHIPPED',
              courierPartner: chosenCourier,
              awbNumber: awb,
              eWayBillNumber: ewb,
              courierPickupDate: pickupDate,
            }
          : o
      )
    );

    if (activeModalOrder?.id === shippingModalOrder.id) {
      setActiveModalOrder({
        ...activeModalOrder,
        status: 'SHIPPED',
        courierPartner: chosenCourier,
        awbNumber: awb,
        eWayBillNumber: ewb,
        courierPickupDate: pickupDate,
      });
    }

    setShippingModalOrder(null);
    showToast(`Order Shipped! AWB ${awb} & E-Way Bill ${ewb} generated. Pickup on: ${pickupDate}`);
  };

  // Bulk update
  const handleBulkAccept = () => {
    selectedIds.forEach((id) => handleAcceptOrder(id));
    showToast(`Accepted ${selectedIds.length} orders in bulk.`);
  };

  // Download Excel / CSV
  const handleDownloadExcel = () => {
    const headers = 'Order Number,Customer Name,Phone,Address,Amount,Order Date,Status,AWB,Courier,Breach Date\n';
    const rows = orders
      .map(
        (o) =>
          `"${o.orderNumber}","${o.customerName}","${o.customerPhone}","${o.shippingAddress}",${o.totalAmount},"${o.orderDate}","${o.status}","${o.awbNumber || ''}","${o.courierPartner || ''}","${o.breachDate || ''}"`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Gogate_Seller_Orders_${Date.now()}.csv`;
    a.click();
    showToast('Orders exported to Excel (CSV) successfully.');
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-xl shadow-xl text-xs font-semibold animate-fade-in">
          {toastMsg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-stone-900 tracking-tight">Order Fulfillment Operations</h2>
          <p className="text-sm text-stone-500 mt-1">
            Accept orders, track SLA breach deadlines, pack cartons, generate E-Way Bills & AWBs, and print tax invoices.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadExcel}
            className="px-3.5 py-2 bg-white text-stone-700 border border-stone-300 rounded-lg text-xs font-semibold hover:bg-stone-50 transition shadow-2xs"
          >
            📊 Download Excel / CSV
          </button>
          <button
            onClick={() => showToast('Generated bulk PDF manifest for all orders.')}
            className="px-3.5 py-2 bg-white text-stone-700 border border-stone-300 rounded-lg text-xs font-semibold hover:bg-stone-50 transition shadow-2xs"
          >
            📄 Download All (PDF)
          </button>
        </div>
      </div>

      {/* Bulk Action Toolbar */}
      {selectedIds.length > 0 && (
        <div className="bg-emerald-900 text-white p-3.5 rounded-xl flex items-center justify-between text-xs animate-fade-in shadow-md">
          <span className="font-semibold">
            {selectedIds.length} order{selectedIds.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleBulkAccept}
              className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 rounded-lg font-bold transition"
            >
              Bulk Accept Orders
            </button>
            <button
              onClick={() => showToast(`Printed shipping labels for ${selectedIds.length} orders.`)}
              className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-lg font-bold transition"
            >
              Print Selected Labels
            </button>
            <button
              onClick={() => setSelectedIds([])}
              className="px-3 py-1.5 text-stone-300 hover:text-white"
            >
              Deselect All
            </button>
          </div>
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-stone-600">
            <thead className="bg-stone-50 text-xs uppercase font-semibold text-stone-500 border-b border-stone-200">
              <tr>
                <th className="py-3 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === orders.length && orders.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded text-emerald-800"
                  />
                </th>
                <th className="py-3 px-4">12-Digit Order ID</th>
                <th className="py-3 px-4">Customer & Location</th>
                <th className="py-3 px-4">Items & Qty</th>
                <th className="py-3 px-4">SLA Breach Date</th>
                <th className="py-3 px-4">Fulfillment Status</th>
                <th className="py-3 px-4 text-right">Workflow Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {orders.map((ord) => {
                const isSelected = selectedIds.includes(ord.id);

                return (
                  <tr key={ord.id} className={`hover:bg-stone-50/80 transition ${isSelected ? 'bg-emerald-50/40' : ''}`}>
                    <td className="py-4 px-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectOne(ord.id)}
                        className="rounded text-emerald-800"
                      />
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => setActiveModalOrder(ord)}
                        className="font-mono font-black text-sm text-emerald-900 hover:underline flex items-center gap-1.5"
                      >
                        <span>#{ord.orderNumber}</span>
                        <span className="text-[10px] text-stone-400">🔍</span>
                      </button>
                      <p className="text-[11px] text-stone-400 mt-0.5">{ord.orderDate}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-bold text-stone-900 text-xs">{ord.customerName}</p>
                      <p className="text-[11px] text-stone-500 line-clamp-1">{ord.shippingAddress}</p>
                      <span className="font-mono text-[10px] text-stone-400">{ord.customerPhone}</span>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-xs font-semibold text-stone-900">
                        {ord.items.map((i) => `${i.quantity}x ${i.productName}`).join(', ')}
                      </p>
                      <p className="text-xs font-bold text-emerald-800 mt-0.5">₹{ord.totalAmount.toFixed(2)}</p>
                    </td>
                    <td className="py-4 px-4">
                      {ord.breachDate ? (
                        <div>
                          <span className="inline-block px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-200">
                            ⏳ {ord.breachDate}
                          </span>
                          <span className="block text-[10px] text-stone-400 mt-0.5">Processing deadline</span>
                        </div>
                      ) : (
                        <span className="text-xs text-stone-400">Accept to initiate SLA</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase ${
                          ord.status === 'SHIPPED'
                            ? 'bg-blue-100 text-blue-800'
                            : ord.status === 'PACKED'
                            ? 'bg-purple-100 text-purple-800'
                            : ord.status === 'ACCEPTED'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-stone-100 text-stone-800'
                        }`}
                      >
                        {ord.status}
                      </span>
                      {ord.courierPartner && (
                        <p className="text-[10px] font-mono text-stone-500 mt-1">
                          AWB: {ord.awbNumber} ({ord.courierPartner})
                        </p>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right space-x-1.5">
                      {ord.status === 'PLACED' && (
                        <button
                          onClick={() => handleAcceptOrder(ord.id)}
                          className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold shadow-xs transition"
                        >
                          Accept Order
                        </button>
                      )}

                      {ord.status === 'ACCEPTED' && (
                        <button
                          onClick={() => handlePackOrder(ord.id)}
                          className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-bold shadow-xs transition"
                        >
                          Pack Order
                        </button>
                      )}

                      {ord.status === 'PACKED' && (
                        <button
                          onClick={() => {
                            setShippingModalOrder(ord);
                            setChosenCourier('IN_HOUSE');
                          }}
                          className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold shadow-xs transition"
                        >
                          Ship Order ➔
                        </button>
                      )}

                      {ord.status === 'SHIPPED' && (
                        <button
                          onClick={() => setActiveModalOrder(ord)}
                          className="px-2.5 py-1 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded"
                        >
                          View Details & Docs
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 12-Digit Detailed Order Modal */}
      {activeModalOrder && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between border-b border-stone-100 pb-4">
              <div>
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                  12-Digit Numeric Order ID
                </span>
                <h3 className="text-2xl font-black text-stone-900 font-mono mt-0.5">
                  #{activeModalOrder.orderNumber}
                </h3>
                <p className="text-xs text-stone-500">Order Placed: {activeModalOrder.orderDate}</p>
              </div>
              <button
                onClick={() => setActiveModalOrder(null)}
                className="w-8 h-8 rounded-full bg-stone-100 text-stone-600 text-sm flex items-center justify-center hover:bg-stone-200"
              >
                ✕
              </button>
            </div>

            {/* Timelines and SLA Breaches */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <div>
                <span className="text-stone-400 block text-[10px]">Deliver By Date</span>
                <span className="font-bold text-stone-900">{activeModalOrder.deliverByDate}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">Breach Date (SLA)</span>
                <span className="font-bold text-amber-900">{activeModalOrder.breachDate || 'Pending Accept'}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">Courier Pickup Date</span>
                <span className="font-bold text-emerald-900">{activeModalOrder.courierPickupDate || 'Pending Ship'}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">AWB Tracking</span>
                <span className="font-mono font-bold text-blue-900">{activeModalOrder.awbNumber || 'Unassigned'}</span>
              </div>
            </div>

            {/* Embedded Live Pipeline Tracker with Courier Sync */}
            <OrderPipelineTracker
              mode="STANDARD"
              currentStatus={activeModalOrder.status}
              courier={{
                partner: (activeModalOrder.courierPartner as any) || 'SHIPROCKET',
                partnerName: activeModalOrder.courierPartner ? `${activeModalOrder.courierPartner} Express Cold Network` : 'Shiprocket Surface Cold Fleet',
                awbNumber: activeModalOrder.awbNumber || 'SR-8899221100',
                trackingUrl: `https://shiprocket.co/tracking/${activeModalOrder.awbNumber || 'SR-8899221100'}`,
                courierStatus: activeModalOrder.status === 'SHIPPED' ? 'In Transit - Outward Sorting Hub' : activeModalOrder.status,
                lastSyncedAt: 'Just now',
              }}
            />

            {/* Customer Information */}
            <div className="p-4 rounded-xl border border-stone-200 space-y-1 text-xs">
              <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-2">Customer & Delivery Info</h4>
              <p><strong>Name:</strong> {activeModalOrder.customerName}</p>
              <p><strong>Phone:</strong> {activeModalOrder.customerPhone} • <strong>Email:</strong> {activeModalOrder.customerEmail}</p>
              <p><strong>Shipping Address:</strong> {activeModalOrder.shippingAddress} (PIN: {activeModalOrder.pincode})</p>
            </div>

            {/* Ordered Products */}
            <div>
              <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-3">Order Items</h4>
              <div className="divide-y divide-stone-100 border border-stone-200 rounded-xl overflow-hidden">
                {activeModalOrder.items.map((item, idx) => (
                  <div key={idx} className="p-3.5 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-stone-900">{item.productName}</p>
                      <p className="text-[11px] font-mono text-emerald-800">FSSAI: {item.fssaiNo}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-stone-700 font-bold">{item.quantity} x ₹{item.unitPrice}</p>
                      <p className="text-stone-900 font-black">₹{item.quantity * item.unitPrice}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* E-Way Bill Barcode and AWB */}
            {activeModalOrder.eWayBillNumber && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-blue-700">GST E-Way Bill Registered</span>
                  <p className="font-mono font-bold text-slate-900 text-sm">{activeModalOrder.eWayBillNumber}</p>
                  <p className="text-slate-500 text-[11px]">Courier Pickup: {activeModalOrder.courierPickupDate}</p>
                </div>
                <button
                  onClick={() => showToast(`Downloaded E-Way Bill PDF: ${activeModalOrder.eWayBillNumber}.pdf`)}
                  className="px-3 py-1.5 bg-blue-700 text-white rounded-lg font-bold hover:bg-blue-800"
                >
                  Download E-Way Bill 📥
                </button>
              </div>
            )}

            {/* Document Print Actions */}
            <div className="border-t border-stone-100 pt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-2">
                <button
                  onClick={() => setPrintDocument('INVOICE')}
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition shadow-xs"
                >
                  🖨️ Print Tax Invoice
                </button>
                <button
                  onClick={() => setPrintDocument('PACKAGING_SLIP')}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl transition"
                >
                  📦 Print Packaging Slip
                </button>
              </div>

              <a
                href={`${process.env.NEXT_PUBLIC_STOREFRONT_URL || (process.env.VERCEL ? '' : 'http://localhost:3000')}/track?awb=${activeModalOrder.awbNumber || activeModalOrder.orderNumber}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 rounded-xl hover:bg-emerald-100"
              >
                Track from Seller End ↗
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Courier Selection & E-Way Bill Generation Modal */}
      {shippingModalOrder && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <h3 className="text-lg font-bold text-stone-900">
              Ship Order #{shippingModalOrder.orderNumber}
            </h3>
            <p className="text-xs text-stone-500">
              Select shipping provider to generate AWB label, GST E-Way Bill, and lock Courier Pickup Date:
            </p>

            <div className="space-y-2">
              {[
                { id: 'IN_HOUSE', name: 'Gogate Internal Fleet (Cold Chain Spec)' },
                { id: 'SHIPROCKET', name: 'Shiprocket Air Priority' },
                { id: 'NIMBUSPOST', name: 'NimbusPost Smart Ship' },
                { id: 'TOOKAN', name: 'Tookan On-Demand Fleet' },
                { id: 'SHIPDAY', name: 'Shipday Direct Driver Dispatch' },
                { id: 'PIDGE', name: 'Pidge Radius Delivery' },
              ].map((c) => (
                <label
                  key={c.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer text-xs transition ${
                    chosenCourier === c.id
                      ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-700'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="courier"
                    checked={chosenCourier === c.id}
                    onChange={() => setChosenCourier(c.id)}
                    className="text-emerald-800"
                  />
                  <span>{c.name}</span>
                </label>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setShippingModalOrder(null)}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-800"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmShip}
                className="px-5 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-xs"
              >
                Confirm Dispatch & Generate E-Way Bill
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Printable Invoice / Packaging Slip Modal Preview */}
      {printDocument && activeModalOrder && (
        <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex justify-between items-start pb-4 border-b border-stone-200">
              <div>
                <h2 className="text-xl font-black text-stone-900">
                  {printDocument === 'INVOICE' ? 'TAX INVOICE' : 'WAREHOUSE PACKAGING SLIP'}
                </h2>
                <p className="text-xs text-stone-500">Order ID: #{activeModalOrder.orderNumber}</p>
              </div>
              <button
                onClick={() => setPrintDocument(null)}
                className="px-3 py-1 bg-stone-100 text-stone-600 rounded-lg text-xs font-bold"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="font-bold text-stone-900">Sold By (Seller):</p>
                <p>Gogate Organic Orchards (Ratnagiri Flagship)</p>
                <p className="text-stone-500">Gogate Wadi, Pawas, Ratnagiri 415616</p>
                <p className="font-mono mt-1">FSSAI: 11521045000123</p>
                <p className="font-mono">GSTIN: 27AAACG1234A1Z5</p>
              </div>
              <div>
                <p className="font-bold text-stone-900">Billed & Shipped To:</p>
                <p>{activeModalOrder.customerName}</p>
                <p className="text-stone-500">{activeModalOrder.shippingAddress}</p>
                <p>Phone: {activeModalOrder.customerPhone}</p>
              </div>
            </div>

            <table className="w-full text-left text-xs border border-stone-200">
              <thead className="bg-stone-100 font-bold">
                <tr>
                  <th className="p-2 border-b">Item</th>
                  <th className="p-2 border-b text-center">Qty</th>
                  {printDocument === 'INVOICE' && <th className="p-2 border-b text-right">Price</th>}
                  {printDocument === 'INVOICE' && <th className="p-2 border-b text-right">Total</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {activeModalOrder.items.map((i, idx) => (
                  <tr key={idx}>
                    <td className="p-2">{i.productName}</td>
                    <td className="p-2 text-center font-bold">{i.quantity}</td>
                    {printDocument === 'INVOICE' && <td className="p-2 text-right">₹{i.unitPrice}</td>}
                    {printDocument === 'INVOICE' && <td className="p-2 text-right">₹{i.quantity * i.unitPrice}</td>}
                  </tr>
                ))}
              </tbody>
            </table>

            {printDocument === 'INVOICE' && (
              <div className="text-right text-xs space-y-1">
                <p>Subtotal: ₹{activeModalOrder.subtotal.toFixed(2)}</p>
                <p>CGST + SGST (5%): ₹{activeModalOrder.tax.toFixed(2)}</p>
                <p className="text-base font-black text-stone-900 pt-2 border-t">
                  Grand Total: ₹{activeModalOrder.totalAmount.toFixed(2)}
                </p>
              </div>
            )}

            <div className="pt-4 border-t flex justify-between items-center text-xs">
              <span className="font-mono text-stone-400">Barcode: |||||||||||| {activeModalOrder.orderNumber} ||||||||||||</span>
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 bg-emerald-800 text-white font-bold rounded-xl"
              >
                🖨️ Send to Printer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
