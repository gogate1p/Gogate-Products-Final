# 🥭 Gogate Products - Enterprise Multi-Tenant E-Commerce & Logistics Platform

Full-stack, multi-tenant marketplace, middle-mile refrigerated cold chain, and last-mile delivery ecosystem for **Gogate Products** — specializing in authentic GI-tagged Ratnagiri & Devgad Alphonso Mangoes (Hapus), King Size W180 Cashews, Wild Kokum, and Konkan Spices.

---

## 🏗️ Monorepo Architecture

```
d:/Gogatr/
├── apps/
│   ├── web-storefront/          # Next.js 15 Swiggy/Zomato-style Storefront (Quick vs Standard, Pre-Orders, Live Tracking, Reviews)
│   ├── admin-portal/            # Next.js Superadmin Tower (Store Onboarding & Logo Branding, KYC Audit, Key Vault, CMS, Maintenance)
│   ├── seller-portal/           # Next.js Vendor Studio (12-digit numeric IDs, SLA countdown, Accept/Pack/Ship, AWB, E-Way Bill)
│   ├── hub-courier-portal/      # Next.js Logistics Hub (Inward dock scanner, cold-room bays, outward sorting, linehaul trips, runsheets)
│   ├── mobile-logistics/        # React Native / Expo (Delivery Executive OTP mode & Linehaul Truck Driver telematics mode)
│   └── nuxt-storefront/         # Nuxt 3 SSR regional storefront for Devgad Cashew & Spice Guild
└── packages/
    ├── database/                # Prisma ORM schema & seeders for multi-tenant stores, products, orders, and key vault
    ├── shared-types/            # Shared TypeScript definitions, Zod schemas, SLA breach, and Order Pipeline models
    ├── payment-engine/          # Pluggable adapters: Razorpay, Paytm PG, Cashfree, Easebuzz, PayU
    ├── logistics-engine/        # Pluggable 3PL adapters: Shiprocket, Nimbuspost, Tookan, Shipday, Pidge, In-House fleet + EDD
    └── ui-kit/                  # Shared Tailwind CSS design system, organic badges, and timeline widgets
```

---

## 🚀 Key Feature Highlights

### 1. Consumer Storefront (`web-storefront`)
- **Swiggy / Zomato UX**: 
  - ⚡ **Quick Delivery (15-30 Mins)** vs. 🚚 **Standard Delivery (1-2 Days)** toggle.
  - Interactive `+ ADD` button transforming into `[ - 1 + ]` counter, with a sticky bottom cart bar.
  - Native product share via Web Share API & clipboard copy.
- **Harvest Pre-Order System**: Lock in fresh May harvest tree-ripened Alphonso batches with deposit freeze.
- **Estimated Delivery Date (EDD)**: Real-time serviceability calculator computing SLAs from Pawas Orchards (PIN: 415616) to customer destination.
- **Promotional Banners & Ticker**: Auto-scrolling coupon marquee (`HAPUS200`), hero slideshow, and season launch Lightbox poster modal.
- **Product Reviews & Seller Reputation**: Customer reviews breakdown and 1-click Seller SLA modal displaying on-time delivery (4.9/5) and freshness score (4.95/5).
- **Passwordless Email OTP**: Secure 6-digit OTP verification across buyer, seller, and admin portals.

### 2. Animated Order Pipeline Tracker & Integrated Courier Sync
- **Multi-Mode Visual Tracker**:
  - **Standard Delivery Pipeline**: `Ordered` ➔ `Packed` ➔ `Shipped` ➔ `Out for Delivery` ➔ `Delivered`
  - **Return Pipeline**: `Return Requested` ➔ `Pickup from Doorstep` ➔ `Refund Processed`
  - **Replacement Pipeline**: `Replacement Initiated` ➔ `Packed & Certified` ➔ `Shipped (Re-Dispatch)` ➔ `Out for Delivery` ➔ `Replacement Delivered`
- **Animated Glowing Progress Bar**: Smooth CSS gradient line connecting pipeline nodes with glowing pulse effects.
- **Integrated Courier Banner under 'Shipped'**: Prominently displays the courier partner (Shiprocket, Nimbuspost, Tookan, Shipday, Pidge, In-House) along with live AWB tracking link and a 1-click **"Sync Courier API"** refresh button.
- **Nested Micro-Updates**: Expandable checkpoints displaying timestamps, refrigerated container temperatures (`17.2°C`), delivery vehicle numbers, and hub scans.

### 3. Return & Replacement Eligibility Rules
- **Eligibility Engine**: Only eligible harvest items (e.g. unopened King W180 cashews, whole graded mango cartons) permit returns or replacements.
- **FSSAI Food Safety Protection**: Perishable cut fruits or opened spices are clearly badged as **"Non-Returnable for Food Safety"**.

### 4. Admin-Only Order Cancellation
- **Self-Cancellation Disabled**: To safeguard delicate cold-chain truck reservations and prevent produce spoilage, customer self-cancellation on the storefront is removed.
- **Superadmin Exclusive Cancellation**: Superadmin can cancel orders with structured audit reasons, automatically processing instant 100% refunds to the customer's original payment gateway.

### 5. Superadmin Store Branding & Payment Mode Switcher
- **Store Identity & Logo Editor**: Superadmin can configure store logos, banner images, brand taglines, custom subdomains, and customer cancellation policies.
- **Test vs. Live Payment Mode**: Global and per-gateway toggle between `TEST (Sandbox)` and `LIVE (Production)` mode across Razorpay, Paytm PG, Cashfree, Easebuzz, and PayU.

### 6. Vendor / Seller Studio (`seller-portal`)
- **12-Digit Numeric Order IDs**: Clean numerical identifiers (e.g. `202610278491`).
- **SLA Countdown & Lifecycle**: Accept ➔ Pack ➔ Ship workflow with SLA breach countdown.
- **Documentation**: 1-click generation of GST Tax Invoices, Warehouse Packaging Slips, and E-Way Bills.
- **Bulk Actions & Excel Export**: Bulk accept orders, export to Excel/CSV, and batch print shipping labels.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js >= 20
- pnpm >= 10

### Installation
```bash
# Clone the repository
git clone https://github.com/gogate1p/Gogate-Products-Final.git
cd Gogate-Products-Final

# Install all workspace dependencies
pnpm install
```

### Running the Applications
```bash
# Web Storefront (Port 3000)
pnpm --filter web-storefront dev

# Superadmin Command Tower (Port 3001)
pnpm --filter admin-portal dev

# Seller Vendor Studio (Port 3002)
pnpm --filter seller-portal dev

# Logistics Hub & Courier Portal (Port 3003)
pnpm --filter hub-courier-portal dev

# Nuxt 3 Franchise Storefront (Port 3004)
pnpm --filter nuxt-storefront dev

# Mobile Logistics App (Expo)
pnpm --filter mobile-logistics start
```

---

## 📜 Regulatory & Organic Provenance Compliance
- **FSSAI 14-Digit Mandatory Traceability**
- **MSME Udyam Registration**
- **GI-Tagged Alphonso Mango Provenance (Ratnagiri & Devgad)**
- **Cold-Chain Refrigerated Telematics (16°C - 18°C)**
