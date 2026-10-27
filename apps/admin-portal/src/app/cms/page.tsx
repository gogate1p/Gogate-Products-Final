'use client';

import { useState } from 'react';

interface CMSPage {
  id: string;
  slug: string;
  title: string;
  category: 'LEGAL' | 'INSTRUCTION' | 'POLICY';
  isPublished: boolean;
  lastUpdated: string;
  content: string;
}

const defaultPages: CMSPage[] = [
  {
    id: 'page_terms',
    slug: 'terms',
    title: 'Terms and Conditions',
    category: 'LEGAL',
    isPublished: true,
    lastUpdated: 'Oct 27, 2026',
    content: `# Terms and Conditions for Gogate Products Agro Ecosystem

Welcome to Gogate Products. By accessing our multi-storefront platform, you agree to these terms:

1. **Direct Farm Produce Quality**: All Alphonso mangoes, cashews, and wild kokum products sold on our platform are authentic, GI-tagged (Geographical Indication) and chemical-free.
2. **Seasonal Agricultural Harvests**: Pre-orders for mangoes depend on tree maturity and harvest dates. Dispatch schedules may adjust by +/- 3 days depending on Konkan coastal weather conditions.
3. **Multi-Storefronts & Vendors**: Individual regional producer stores operate under Gogate Products marketplace compliance and are audited under FSSAI regulations.
4. **Governing Law**: Subject to jurisdiction of Ratnagiri / Mumbai courts.`,
  },
  {
    id: 'page_privacy',
    slug: 'privacy',
    title: 'Privacy Policy',
    category: 'LEGAL',
    isPublished: true,
    lastUpdated: 'Oct 27, 2026',
    content: `# Privacy Policy & Data Protection

Gogate Products respects customer data integrity and digital confidentiality.

1. **Information Collected**: Name, delivery address, contact mobile number (for OTP delivery verification), and payment confirmation.
2. **Payment Security**: We do not store raw credit/debit card numbers. All transactions are tokenized via PCI-DSS certified gateways (Razorpay, Paytm PG, Cashfree, Easebuzz, PayU).
3. **Account Deletion & Data Erasure**: Customers can permanently delete their account and associated data directly from their Account Settings page.`,
  },
  {
    id: 'page_shipping',
    slug: 'shipping-policy',
    title: 'Cold-Chain Shipping Policy',
    category: 'POLICY',
    isPublished: true,
    lastUpdated: 'Oct 27, 2026',
    content: `# Shipping & Delivery Policy

1. **Refrigerated Cold-Chain Transit**: All perishable Alphonso Mangoes are transported using temperature-monitored refrigerated linehaul containers (15°C - 19°C) to prevent fruit spoiling.
2. **Estimated Delivery Date (EDD)**: Intra-state shipments (Maharashtra, Goa) take 24 to 48 hours. National shipments take 2 to 4 days via air priority.
3. **Store Pickup**: Customers selecting 'Store Pickup' can collect their orders from the designated farm counter (e.g. Pawas, Ratnagiri) without shipping charges.
4. **Carrier Integrations**: Shipments are fulfilled by Gogate Express In-House fleet or integrated partners (Shiprocket, NimbusPost, Tookan, Shipday, Pidge).`,
  },
  {
    id: 'page_returns',
    slug: 'return-policy',
    title: 'Return & Replacement Policy',
    category: 'POLICY',
    isPublished: true,
    lastUpdated: 'Oct 27, 2026',
    content: `# Return and Replacement Policy for Fresh Organic Produce

1. **Fresh Harvest Guarantee**: If mangoes arrive damaged, bruised, or spoiled during transit, customers may report within 24 hours of delivery.
2. **Photo Evidence**: Upload a clear photograph showing the damaged batch and outer carton barcode.
3. **Instant Replacement**: An approved replacement box is dispatched on priority via our reverse courier logistics, or full refund credited to original payment source.`,
  },
  {
    id: 'page_cancellation',
    slug: 'cancellation-policy',
    title: 'Cancellation Policy',
    category: 'POLICY',
    isPublished: true,
    lastUpdated: 'Oct 27, 2026',
    content: `# Order Cancellation Guidelines

1. **Before Dispatch**: Orders can be cancelled from the customer portal anytime before the status changes to 'MANIFESTED' or 'SHIPPED'.
2. **Pre-Orders**: Seasonal Mango pre-orders can be modified or cancelled up to 48 hours before the declared harvest packing date.
3. **Refund Timeline**: Processed within 3-5 business days via the payment gateway used (Razorpay, Paytm, Cashfree, Easebuzz, PayU) or instant Store Credit wallet.`,
  },
];

export default function CMSManagerPage() {
  const [pages, setPages] = useState<CMSPage[]>(defaultPages);
  const [selectedPage, setSelectedPage] = useState<CMSPage>(defaultPages[0]);
  const [saveAlert, setSaveAlert] = useState<string | null>(null);

  const handleSave = () => {
    setPages((prev) =>
      prev.map((p) => (p.id === selectedPage.id ? { ...selectedPage, lastUpdated: 'Just now' } : p))
    );
    setSaveAlert(`Successfully published "${selectedPage.title}"`);
    setTimeout(() => setSaveAlert(null), 3000);
  };

  const handleAddNewPage = () => {
    const newP: CMSPage = {
      id: `page_${Date.now()}`,
      slug: `custom-page-${Date.now().toString().slice(-4)}`,
      title: 'New Instruction / Policy Page',
      category: 'INSTRUCTION',
      isPublished: true,
      lastUpdated: 'Just now',
      content: `# New Instructions & Guidelines\n\nWrite customized instructions or compliance policy text here...`,
    };
    setPages([newP, ...pages]);
    setSelectedPage(newP);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">CMS & Policy Instructions Editor</h2>
          <p className="text-sm text-slate-500 mt-1">
            Superadmin can create, customize, and edit all customer policy pages (Terms, Privacy, Shipping, Returns, Cancellation) and customer guidelines.
          </p>
        </div>
        <button
          onClick={handleAddNewPage}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 shadow-sm transition"
        >
          <span>+</span> Create New Page / Instruction
        </button>
      </div>

      {saveAlert && (
        <div className="bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs px-4 py-2 rounded-lg font-medium">
          ✓ {saveAlert}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Pages List */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 bg-slate-50 border-b border-slate-200 font-semibold text-xs text-slate-700 uppercase tracking-wider">
            All Content Pages ({pages.length})
          </div>
          <div className="divide-y divide-slate-100">
            {pages.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPage(p)}
                className={`w-full text-left p-4 transition flex flex-col gap-1 ${
                  selectedPage.id === p.id ? 'bg-emerald-50/60 border-l-4 border-emerald-600' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">{p.title}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {p.category}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono mt-0.5">
                  <span>/{p.slug}</span>
                  <span>{p.lastUpdated}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Markdown Editor */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Page Title *</label>
              <input
                type="text"
                value={selectedPage.title}
                onChange={(e) => setSelectedPage({ ...selectedPage, title: e.target.value })}
                className="w-full text-sm font-bold border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Page URL Slug *</label>
              <input
                type="text"
                value={selectedPage.slug}
                onChange={(e) => setSelectedPage({ ...selectedPage, slug: e.target.value })}
                className="w-full text-sm font-mono border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Page Content & Policy Instructions (Markdown Supported) *
            </label>
            <textarea
              rows={14}
              value={selectedPage.content}
              onChange={(e) => setSelectedPage({ ...selectedPage, content: e.target.value })}
              className="w-full text-xs font-mono border border-slate-300 rounded-lg p-3 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <span className="text-xs text-slate-400">
              Live preview rendered on customer storefront at: <code>/{selectedPage.slug}</code>
            </span>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-emerald-600 text-white font-semibold text-xs rounded-lg hover:bg-emerald-700 shadow-sm transition"
            >
              Save & Publish Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
