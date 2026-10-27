'use client';

import { useState } from 'react';

interface KeyConfig {
  id: string;
  provider: string;
  type: 'PAYMENT_GATEWAY' | 'COURIER_3PL' | 'HYPERLOCAL_FLEET';
  isEnabled: boolean;
  environment: 'SANDBOX' | 'PRODUCTION';
  fields: { key: string; label: string; value: string; isSecret?: boolean }[];
  lastUpdated: string;
}

const initialKeys: KeyConfig[] = [
  // 1. Payment Gateways
  {
    id: 'razorpay',
    provider: 'Razorpay Payments',
    type: 'PAYMENT_GATEWAY',
    isEnabled: true,
    environment: 'PRODUCTION',
    fields: [
      { key: 'keyId', label: 'Key ID', value: 'rzp_live_9a08f8821a9' },
      { key: 'keySecret', label: 'Key Secret', value: 'whsec_9872134098124', isSecret: true },
      { key: 'webhookSecret', label: 'Webhook Secret', value: 'rzp_hook_sec_99182', isSecret: true },
    ],
    lastUpdated: 'Oct 26, 2026',
  },
  {
    id: 'paytm',
    provider: 'Paytm PG',
    type: 'PAYMENT_GATEWAY',
    isEnabled: true,
    environment: 'PRODUCTION',
    fields: [
      { key: 'mid', label: 'Merchant ID (MID)', value: 'GOGATE_PROD_PAYTM_MID' },
      { key: 'merchantKey', label: 'Merchant Key', value: 'PTM_SEC_KEY_889911', isSecret: true },
      { key: 'website', label: 'Website Name', value: 'GogateWAP' },
    ],
    lastUpdated: 'Oct 25, 2026',
  },
  {
    id: 'cashfree',
    provider: 'Cashfree Payments',
    type: 'PAYMENT_GATEWAY',
    isEnabled: true,
    environment: 'PRODUCTION',
    fields: [
      { key: 'appId', label: 'App ID', value: 'CF_APP_GOGATE_7766' },
      { key: 'secretKey', label: 'Secret Key', value: 'cf_sec_key_live_091823', isSecret: true },
    ],
    lastUpdated: 'Oct 24, 2026',
  },
  {
    id: 'easebuzz',
    provider: 'Easebuzz',
    type: 'PAYMENT_GATEWAY',
    isEnabled: true,
    environment: 'PRODUCTION',
    fields: [
      { key: 'merchantKey', label: 'Merchant Key', value: 'EB_KEY_LIVE_882910' },
      { key: 'salt', label: 'Salt', value: 'eb_salt_live_99120938', isSecret: true },
    ],
    lastUpdated: 'Oct 23, 2026',
  },
  {
    id: 'payu',
    provider: 'PayU India',
    type: 'PAYMENT_GATEWAY',
    isEnabled: true,
    environment: 'PRODUCTION',
    fields: [
      { key: 'merchantKey', label: 'Merchant Key', value: 'PAYU_LIVE_KEY_88190' },
      { key: 'merchantSalt', label: 'Merchant Salt', value: 'payu_salt_sec_109283', isSecret: true },
    ],
    lastUpdated: 'Oct 22, 2026',
  },

  // 2. Courier 3PL Aggregators
  {
    id: 'shiprocket',
    provider: 'Shiprocket Multi-Carrier',
    type: 'COURIER_3PL',
    isEnabled: true,
    environment: 'PRODUCTION',
    fields: [
      { key: 'email', label: 'Account Email', value: 'logistics@gogateproducts.com' },
      { key: 'apiPassword', label: 'API Password / Token', value: 'sr_token_live_99882233', isSecret: true },
      { key: 'channelId', label: 'Custom Channel ID', value: 'CH_GOGATE_STORE' },
    ],
    lastUpdated: 'Oct 21, 2026',
  },
  {
    id: 'nimbuspost',
    provider: 'NimbusPost Logistics',
    type: 'COURIER_3PL',
    isEnabled: true,
    environment: 'PRODUCTION',
    fields: [
      { key: 'email', label: 'Login Email', value: 'nimbus@gogateproducts.com' },
      { key: 'apiSecret', label: 'API Secret', value: 'np_sec_live_998127391', isSecret: true },
    ],
    lastUpdated: 'Oct 20, 2026',
  },

  // 3. Hyperlocal & In-House Fleets
  {
    id: 'tookan',
    provider: 'Tookan Dispatcher (JungleWorks)',
    type: 'HYPERLOCAL_FLEET',
    isEnabled: true,
    environment: 'PRODUCTION',
    fields: [
      { key: 'apiKey', label: 'Tookan API Key', value: 'tkn_live_sec_0918239012', isSecret: true },
    ],
    lastUpdated: 'Oct 20, 2026',
  },
  {
    id: 'shipday',
    provider: 'Shipday On-Demand Delivery',
    type: 'HYPERLOCAL_FLEET',
    isEnabled: true,
    environment: 'PRODUCTION',
    fields: [
      { key: 'apiKey', label: 'Shipday API Key', value: 'sd_live_key_38472918', isSecret: true },
    ],
    lastUpdated: 'Oct 19, 2026',
  },
  {
    id: 'pidge',
    provider: 'Pidge Radius Delivery',
    type: 'HYPERLOCAL_FLEET',
    isEnabled: true,
    environment: 'PRODUCTION',
    fields: [
      { key: 'clientId', label: 'Client ID', value: 'PDG_CLI_GOGATE' },
      { key: 'apiKey', label: 'API Key', value: 'pdg_api_sec_109283019', isSecret: true },
    ],
    lastUpdated: 'Oct 18, 2026',
  },
];

export default function DeveloperKeysPage() {
  const [keys, setKeys] = useState<KeyConfig[]>(initialKeys);
  const [activeTab, setActiveTab] = useState<'ALL' | 'PAYMENT_GATEWAY' | 'COURIER_3PL' | 'HYPERLOCAL_FLEET'>('ALL');
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [globalPaymentMode, setGlobalPaymentMode] = useState<'SANDBOX' | 'PRODUCTION'>('PRODUCTION');

  const showNotice = (msg: string) => {
    setSaveMessage(msg);
    setTimeout(() => setSaveMessage(null), 3000);
  };

  const toggleStatus = (id: string) => {
    setKeys((prev) =>
      prev.map((k) => (k.id === id ? { ...k, isEnabled: !k.isEnabled } : k))
    );
    showNotice('Integration status updated.');
  };

  const toggleEnvironment = (id: string) => {
    setKeys((prev) =>
      prev.map((k) => {
        if (k.id === id) {
          const nextEnv = k.environment === 'PRODUCTION' ? 'SANDBOX' : 'PRODUCTION';
          return { ...k, environment: nextEnv };
        }
        return k;
      })
    );
    showNotice('Environment mode toggled.');
  };

  const handleGlobalPaymentModeSwitch = (mode: 'SANDBOX' | 'PRODUCTION') => {
    setGlobalPaymentMode(mode);
    setKeys((prev) =>
      prev.map((k) =>
        k.type === 'PAYMENT_GATEWAY' ? { ...k, environment: mode } : k
      )
    );
    showNotice(
      mode === 'PRODUCTION'
        ? '⚠️ All Payment Gateways switched to LIVE (Production) Mode! Real transactions active.'
        : '🧪 All Payment Gateways switched to TEST (Sandbox) Mode! Safe for test payments.'
    );
  };

  const handleFieldChange = (configId: string, fieldKey: string, newValue: string) => {
    setKeys((prev) =>
      prev.map((k) => {
        if (k.id === configId) {
          const updatedFields = k.fields.map((f) => (f.key === fieldKey ? { ...f, value: newValue } : f));
          return { ...k, fields: updatedFields };
        }
        return k;
      })
    );
  };

  const filteredKeys = activeTab === 'ALL' ? keys : keys.filter((k) => k.type === activeTab);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-stone-900 tracking-tight">Developer Keys & API Vault</h2>
          <p className="text-xs text-stone-500 mt-1">
            Centrally manage developer credentials, webhook secrets, and switch payment modes between Test and Live.
          </p>
        </div>
        {saveMessage && (
          <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs px-3.5 py-2 rounded-xl font-bold animate-fade-in shadow-xs">
            ✓ {saveMessage}
          </div>
        )}
      </div>

      {/* MASTER PAYMENT GATEWAY TEST VS. LIVE SWITCHER BANNER */}
      <div className="p-5 bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-3xl shadow-md border border-stone-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xl">💳</span>
            <h3 className="font-bold text-sm">Payment Gateway Mode Switcher</h3>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                globalPaymentMode === 'PRODUCTION'
                  ? 'bg-emerald-500 text-stone-950'
                  : 'bg-amber-400 text-stone-950 animate-pulse'
              }`}
            >
              Current: {globalPaymentMode === 'PRODUCTION' ? 'LIVE (Real Money)' : 'TEST (Sandbox)'}
            </span>
          </div>
          <p className="text-xs text-stone-300">
            Control transactions across Razorpay, Paytm PG, Cashfree, Easebuzz, and PayU with 1-click test simulation.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-stone-950/80 p-1.5 rounded-2xl border border-stone-700 shrink-0">
          <button
            type="button"
            onClick={() => handleGlobalPaymentModeSwitch('SANDBOX')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition ${
              globalPaymentMode === 'SANDBOX'
                ? 'bg-amber-400 text-stone-950 shadow-md'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            🧪 Test / Sandbox Mode
          </button>
          <button
            type="button"
            onClick={() => handleGlobalPaymentModeSwitch('PRODUCTION')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition ${
              globalPaymentMode === 'PRODUCTION'
                ? 'bg-emerald-500 text-stone-950 shadow-md'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            🟢 Live / Production Mode
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-3 overflow-x-auto">
        {[
          { id: 'ALL', label: 'All Integrations (10)' },
          { id: 'PAYMENT_GATEWAY', label: 'Payment Gateways (5)' },
          { id: 'COURIER_3PL', label: 'Courier 3PL Aggregators (2)' },
          { id: 'HYPERLOCAL_FLEET', label: 'Hyperlocal Fleet APIs (3)' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
              activeTab === tab.id
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid of Key Configurations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredKeys.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-start justify-between pb-3 border-b border-stone-100">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-stone-900 text-base">{item.provider}</h3>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 uppercase">
                      {item.type.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400 mt-0.5">Updated: {item.lastUpdated}</p>
                </div>

                <button
                  onClick={() => toggleStatus(item.id)}
                  className={`px-3 py-1 text-xs font-bold rounded-full transition ${
                    item.isEnabled
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-stone-100 text-stone-500 border border-stone-200'
                  }`}
                >
                  {item.isEnabled ? '● Active' : '○ Disabled'}
                </button>
              </div>

              {/* Form Fields */}
              <div className="mt-4 space-y-3">
                {item.fields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                      {field.label}
                    </label>
                    <input
                      type={field.isSecret ? 'password' : 'text'}
                      value={field.value}
                      onChange={(e) => handleFieldChange(item.id, field.key, e.target.value)}
                      className="w-full text-xs font-mono border border-stone-200 rounded-xl p-2.5 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions: Environment Toggle & Save */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              {/* Individual Test vs Live Mode Toggle */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-stone-400 uppercase">Mode:</span>
                <button
                  type="button"
                  onClick={() => toggleEnvironment(item.id)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold font-mono transition ${
                    item.environment === 'PRODUCTION'
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}
                >
                  {item.environment === 'PRODUCTION' ? 'LIVE (Prod)' : 'TEST (Sandbox)'} ⇄
                </button>
              </div>

              <button
                onClick={() => showNotice(`Saved credentials for ${item.provider}`)}
                className="px-3.5 py-1.5 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition shadow-xs"
              >
                Save Keys
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
