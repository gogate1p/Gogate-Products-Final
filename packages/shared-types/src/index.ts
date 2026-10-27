import { z } from 'zod';

// ==========================================
// USER & RBAC ROLES
// ==========================================
export const UserRole = {
  SUPERADMIN: 'SUPERADMIN',
  STAFF: 'STAFF',
  STORE_ADMIN: 'STORE_ADMIN',
  HUB_OPERATOR: 'HUB_OPERATOR',
  COURIER_MANAGER: 'COURIER_MANAGER',
  DELIVERY_EXECUTIVE: 'DELIVERY_EXECUTIVE',
  TRUCK_DRIVER: 'TRUCK_DRIVER',
  CUSTOMER: 'CUSTOMER',
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

// ==========================================
// STORE & KYC
// ==========================================
export const StoreStatus = {
  PENDING_KYC: 'PENDING_KYC',
  UNDER_REVIEW: 'UNDER_REVIEW',
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  DISABLED: 'DISABLED',
} as const;
export type StoreStatus = (typeof StoreStatus)[keyof typeof StoreStatus];

export const KycStatus = {
  NOT_SUBMITTED: 'NOT_SUBMITTED',
  SUBMITTED: 'SUBMITTED',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const;
export type KycStatus = (typeof KycStatus)[keyof typeof KycStatus];

export const StoreKycSchema = z.object({
  fssaiNumber: z.string().regex(/^[0-9]{14}$/, 'FSSAI number must be exactly 14 numeric digits'),
  fssaiCertificateUrl: z.string().url().optional(),
  udyamNumber: z.string().regex(/^UDYAM-[A-Z]{2}-[0-9]{2}-[0-9]{7}$/, 'Valid Udyam format: UDYAM-XX-00-0000000'),
  udyamCertificateUrl: z.string().url().optional(),
  gstin: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Invalid GSTIN format').optional(),
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format'),
  bankAccountNumber: z.string().min(8).max(20),
  bankIfscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code format'),
  bankAccountHolder: z.string().min(2),
  bankCancelledChequeUrl: z.string().url().optional(),
});
export type StoreKyc = z.infer<typeof StoreKycSchema>;

export interface Store {
  id: string;
  name: string;
  slug: string;
  domain?: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
  tagline?: string;
  brandColor?: string;
  ownerId: string;
  status: StoreStatus;
  kycStatus: KycStatus;
  fssaiNumber?: string;
  udyamNumber?: string;
  gstin?: string;
  pickupEnabled: boolean;
  allowCustomerCancellation: boolean;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  contactEmail: string;
  contactPhone: string;
  rating: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// ==========================================
// PRODUCT CATALOG (ORGANIC EMPHASIS)
// ==========================================
export const ProductCategory = {
  MANGOES: 'MANGOES',
  CASHEWS: 'CASHEWS',
  KOKUM_PRODUCTS: 'KOKUM_PRODUCTS',
  SPICES_AND_MASALAS: 'SPICES_AND_MASALAS',
  ORGANIC_GRAINS: 'ORGANIC_GRAINS',
  PICKLES_CHUTNEYS: 'PICKLES_CHUTNEYS',
  NATURAL_SWEETENERS: 'NATURAL_SWEETENERS',
} as const;
export type ProductCategory = (typeof ProductCategory)[keyof typeof ProductCategory];

export const ProductSchema = z.object({
  name: z.string().min(2, 'Product name is required'),
  slug: z.string().min(2),
  description: z.string().min(10),
  category: z.nativeEnum(ProductCategory),
  images: z.array(z.string().url()).min(1, 'At least 1 product image is required'),
  mrp: z.number().positive('MRP must be greater than 0'),
  price: z.number().positive('Selling price must be greater than 0'),
  sku: z.string().min(3),
  stock: z.number().int().nonnegative(),
  manufacturerName: z.string().min(2, 'Manufacturer name is required'),
  manufacturerAddress: z.string().min(5),
  fssaiNo: z.string().regex(/^[0-9]{14}$/, 'FSSAI License must be 14 digits'),
  udyamNo: z.string().optional(),
  organicCertificationNumber: z.string().optional(),
  originRegion: z.string().default('Ratnagiri / Sindhudurg, Maharashtra'),
  harvestBatch: z.string().optional(),
  harvestDate: z.string().optional(),
  shelfLifeDays: z.number().int().positive().optional(),
  weightGrams: z.number().positive(),
  isPreOrder: z.boolean().default(false),
  isActive: z.boolean().default(true),
  isReturnable: z.boolean().default(false),
  isReplaceable: z.boolean().default(true),
  returnWindowDays: z.number().int().default(2),
  returnPolicyText: z.string().optional(),
});
export type ProductInput = z.infer<typeof ProductSchema>;

export interface Product extends ProductInput {
  id: string;
  storeId: string;
  storeName?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// ==========================================
// ORDERS & CHECKOUT
// ==========================================
export const DeliveryType = {
  SHIPPING: 'SHIPPING',
  STORE_PICKUP: 'STORE_PICKUP',
} as const;
export type DeliveryType = (typeof DeliveryType)[keyof typeof DeliveryType];

export const PaymentMethod = {
  RAZORPAY: 'RAZORPAY',
  PAYTM_PG: 'PAYTM_PG',
  CASHFREE: 'CASHFREE',
  EAZEBUZZ: 'EAZEBUZZ',
  PAYU: 'PAYU',
  STORE_CREDIT: 'STORE_CREDIT',
  GIFT_CARD: 'GIFT_CARD',
  CASH_ON_DELIVERY: 'CASH_ON_DELIVERY',
} as const;
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];

export const PaymentStatus = {
  PENDING: 'PENDING',
  AUTHORIZED: 'AUTHORIZED',
  PAID: 'PAID',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED',
} as const;
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

export const OrderStatus = {
  PLACED: 'PLACED',
  ACCEPTED: 'ACCEPTED',
  PACKED: 'PACKED',
  READY_FOR_PICKUP: 'READY_FOR_PICKUP',
  MANIFESTED: 'MANIFESTED',
  SHIPPED: 'SHIPPED',
  OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
  RETURN_REQUESTED: 'RETURN_REQUESTED',
  RETURNED: 'RETURNED',
} as const;
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  fssaiNo?: string;
  manufacturerName?: string;
}

export interface Address {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

export interface Order {
  id: string;
  orderNumber: string; // 12-digit numeric ID (e.g. 202610278491)
  storeId: string;
  storeName?: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  items: OrderItem[];
  subtotal: number;
  taxAmount: number;
  shippingFee: number;
  discountAmount: number;
  storeCreditApplied?: number;
  giftCardApplied?: number;
  totalAmount: number;
  deliveryType: DeliveryType;
  shippingAddress?: Address;
  pickupStoreId?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentTransactionId?: string;
  orderStatus: OrderStatus;
  orderDate: string;
  acceptedAt?: string;
  breachDate?: string; // Seller must process by this timestamp
  packedAt?: string;
  shippedAt?: string;
  courierPickupDate?: string;
  eWayBillNumber?: string;
  eWayBillUrl?: string;
  estimatedDeliveryDate?: string;
  trackingNumber?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// ==========================================
// CMS & POLICY PAGES
// ==========================================
export interface PolicyPage {
  id: string;
  slug: string;
  title: string;
  content: string;
  category: 'POLICY' | 'INSTRUCTION' | 'HELP' | 'CUSTOM';
  isPublished: boolean;
  updatedAt: string;
  updatedBy: string;
}

export interface GiftCard {
  id: string;
  code: string;
  balance: number;
  initialAmount: number;
  expiryDate: string;
  isActive: boolean;
}


// ==========================================
// LOGISTICS & 3PL COURIER INTEGRATION
// ==========================================
export const CourierPartner = {
  IN_HOUSE: 'IN_HOUSE',
  SHIPROCKET: 'SHIPROCKET',
  NIMBUSPOST: 'NIMBUSPOST',
  TOOKAN: 'TOOKAN',
  SHIPDAY: 'SHIPDAY',
  PIDGE: 'PIDGE',
} as const;
export type CourierPartner = (typeof CourierPartner)[keyof typeof CourierPartner];

export const ShipmentStatus = {
  CREATED: 'CREATED',
  PICKED_UP: 'PICKED_UP',
  INWARD_HUB: 'INWARD_HUB',
  IN_TRANSIT: 'IN_TRANSIT',
  OUTWARD_HUB: 'OUTWARD_HUB',
  OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY',
  DELIVERED: 'DELIVERED',
  RTO_REQUESTED: 'RTO_REQUESTED',
  RTO_DELIVERED: 'RTO_DELIVERED',
} as const;
export type ShipmentStatus = (typeof ShipmentStatus)[keyof typeof ShipmentStatus];

export interface TrackingCheckpoint {
  id: string;
  status: ShipmentStatus;
  location: string;
  description: string;
  timestamp: Date | string;
  hubId?: string;
  actorName?: string;
}

export interface Shipment {
  id: string;
  orderId: string;
  awbNumber: string;
  courierPartner: CourierPartner;
  status: ShipmentStatus;
  pickupPincode: string;
  deliveryPincode: string;
  currentHubId?: string;
  assignedDeliveryExecutiveId?: string;
  assignedTruckDriverId?: string;
  tripSheetId?: string;
  estimatedDeliveryDate: string;
  checkpoints: TrackingCheckpoint[];
  proofOfDelivery?: {
    otpVerified: boolean;
    signatureUrl?: string;
    photoUrl?: string;
    deliveredAt: Date | string;
    receivedBy: string;
  };
  createdAt: Date | string;
  updatedAt: Date | string;
}

// ==========================================
// RETURNS & REPLACEMENTS
// ==========================================
export const ReturnType = {
  RETURN: 'RETURN',
  REPLACEMENT: 'REPLACEMENT',
} as const;
export type ReturnType = (typeof ReturnType)[keyof typeof ReturnType];

export const ReturnStatus = {
  REQUESTED: 'REQUESTED',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  PICKUP_QUEUED: 'PICKUP_QUEUED',
  ITEM_RECEIVED: 'ITEM_RECEIVED',
  REFUND_PROCESSED: 'REFUND_PROCESSED',
  REPLACEMENT_DISPATCHED: 'REPLACEMENT_DISPATCHED',
  COMPLETED: 'COMPLETED',
} as const;
export type ReturnStatus = (typeof ReturnStatus)[keyof typeof ReturnStatus];

export interface ReturnRequest {
  id: string;
  orderId: string;
  orderItemId: string;
  storeId: string;
  type: ReturnType;
  reason: string;
  customerRemarks?: string;
  evidenceImages: string[];
  status: ReturnStatus;
  adminRemarks?: string;
  refundAmount?: number;
  reverseAwb?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// ==========================================
// HUBS & LINEHAUL TRIPS
// ==========================================
export interface LogisticsHub {
  id: string;
  hubCode: string;
  name: string;
  hubType: 'ORIGIN_SORTING' | 'INTERMEDIATE_HUB' | 'DELIVERY_BRANCH';
  city: string;
  state: string;
  pincode: string;
  contactNumber: string;
  activeShipmentCount: number;
}

export interface TripSheet {
  id: string;
  tripCode: string;
  driverId: string;
  driverName: string;
  vehicleNumber: string;
  vehicleType: string;
  originHubId: string;
  destinationHubId: string;
  totalConsignments: number;
  status: 'SCHEDULED' | 'DEPARTED' | 'IN_TRANSIT' | 'ARRIVED' | 'UNLOADED';
  departureTime?: Date | string;
  estimatedArrival?: Date | string;
  actualArrival?: Date | string;
  shipmentIds: string[];
}

// ==========================================
// PAYMENT ENVIRONMENT MODE
// ==========================================
export const PaymentEnvironmentMode = {
  TEST: 'TEST',
  LIVE: 'LIVE',
} as const;
export type PaymentEnvironmentMode = (typeof PaymentEnvironmentMode)[keyof typeof PaymentEnvironmentMode];

// ==========================================
// ORDER PIPELINE TRACKING & COURIER SYNC
// ==========================================
export const StandardPipelineStage = {
  ORDERED: 'ORDERED',
  PACKED: 'PACKED',
  SHIPPED: 'SHIPPED',
  OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
} as const;
export type StandardPipelineStage = (typeof StandardPipelineStage)[keyof typeof StandardPipelineStage];

export const ReturnPipelineStage = {
  RETURN_REQUESTED: 'RETURN_REQUESTED',
  PICKUP: 'PICKUP',
  REFUND: 'REFUND',
} as const;
export type ReturnPipelineStage = (typeof ReturnPipelineStage)[keyof typeof ReturnPipelineStage];

export const ReplacementPipelineStage = {
  REPLACEMENT_ORDERED: 'REPLACEMENT_ORDERED',
  PACKED: 'PACKED',
  SHIPPED: 'SHIPPED',
  OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY',
  DELIVERED: 'DELIVERED',
} as const;
export type ReplacementPipelineStage = (typeof ReplacementPipelineStage)[keyof typeof ReplacementPipelineStage];

export interface PipelineSubUpdate {
  id: string;
  stage: string;
  title: string;
  description: string;
  timestamp: string;
  location?: string;
  courierCheckpointCode?: string;
  temperatureCelsius?: number;
  isCompleted: boolean;
  isCurrent?: boolean;
}

export interface CourierTrackingSyncInfo {
  partner: 'SHIPROCKET' | 'NIMBUSPOST' | 'TOOKAN' | 'SHIPDAY' | 'PIDGE' | 'IN_HOUSE';
  partnerName: string;
  awbNumber: string;
  trackingUrl?: string;
  courierStatus: string;
  lastSyncedAt: string;
  estimatedDeliveryDate?: string;
  subUpdates: PipelineSubUpdate[];
}
