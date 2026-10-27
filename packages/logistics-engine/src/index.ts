import {
  CourierPartner,
  ShipmentStatus,
  TrackingCheckpoint,
} from '@gogate/shared-types';

export interface ConsignmentBookingRequest {
  orderId: string;
  orderNumber: string;
  sellerStoreId: string;
  pickupPincode: string;
  deliveryPincode: string;
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
  weightGrams: number;
  lengthCm?: number;
  widthCm?: number;
  heightCm?: number;
  isPerishableOrganic?: boolean; // special packing requirement for mangoes
  declaredValue: number;
  paymentMode: 'PREPAID' | 'COD';
  codAmount?: number;
}

export interface ConsignmentBookingResponse {
  success: boolean;
  courierPartner: CourierPartner;
  awbNumber: string;
  courierName: string;
  shippingLabelUrl: string;
  manifestId?: string;
  estimatedDeliveryDate: string;
  status: ShipmentStatus;
}

export interface ReversePickupRequest {
  returnId: string;
  orderNumber: string;
  customerPincode: string;
  storeWarehousePincode: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  reason: string;
  weightGrams: number;
}

export interface ReversePickupResponse {
  success: boolean;
  reverseAwb: string;
  courierPartner: CourierPartner;
  pickupScheduledDate: string;
}

export interface EDDCalculationResult {
  pincode: string;
  serviceable: boolean;
  estimatedDaysMin: number;
  estimatedDaysMax: number;
  formattedDeliveryDate: string;
  courierOptions: {
    partner: CourierPartner;
    name: string;
    rate: number;
    estimatedDeliveryDays: number;
    supportsCod: boolean;
  }[];
  isColdChainOrPerishableAvailable: boolean;
}

// ----------------------------------------------------------------------
// ESTIMATED DELIVERY DATE (EDD) CALCULATOR
// ----------------------------------------------------------------------
export function calculateEdd(originPincode: string, destPincode: string, isPerishable: boolean = false): EDDCalculationResult {
  const originPrefix = originPincode.substring(0, 2);
  const destPrefix = destPincode.substring(0, 2);

  let minDays = 3;
  let maxDays = 5;

  if (originPincode === destPincode) {
    minDays = 1;
    maxDays = 1;
  } else if (originPrefix === destPrefix) {
    // Intra-state / Regional (e.g. Maharashtra 41xxx - Ratnagiri to Mumbai/Pune)
    minDays = isPerishable ? 1 : 2;
    maxDays = isPerishable ? 2 : 3;
  } else {
    // Inter-state / National
    minDays = isPerishable ? 2 : 4;
    maxDays = isPerishable ? 3 : 6;
  }

  const now = new Date();
  const deliveryDate = new Date(now.getTime() + maxDays * 24 * 60 * 60 * 1000);
  const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return {
    pincode: destPincode,
    serviceable: true,
    estimatedDaysMin: minDays,
    estimatedDaysMax: maxDays,
    formattedDeliveryDate,
    courierOptions: [
      {
        partner: CourierPartner.IN_HOUSE,
        name: 'Gogate Express Direct (Perishables Spec)',
        rate: isPerishable ? 120 : 80,
        estimatedDeliveryDays: minDays,
        supportsCod: true,
      },
      {
        partner: CourierPartner.SHIPROCKET,
        name: 'Shiprocket Air Priority',
        rate: 110,
        estimatedDeliveryDays: minDays + 1,
        supportsCod: true,
      },
      {
        partner: CourierPartner.NIMBUSPOST,
        name: 'NimbusPost Smart Ship',
        rate: 95,
        estimatedDeliveryDays: maxDays,
        supportsCod: true,
      },
      {
        partner: CourierPartner.PIDGE,
        name: 'Pidge Radius Courier',
        rate: 130,
        estimatedDeliveryDays: 1,
        supportsCod: false,
      },
    ],
    isColdChainOrPerishableAvailable: true,
  };
}

// ----------------------------------------------------------------------
// 3PL ADAPTERS
// ----------------------------------------------------------------------
export class ShiprocketAdapter {
  constructor(private token: string) {}

  async createShipment(req: ConsignmentBookingRequest): Promise<ConsignmentBookingResponse> {
    const awb = `SR${Date.now().toString().slice(-8)}${Math.floor(100 + Math.random() * 900)}`;
    const edd = calculateEdd(req.pickupPincode, req.deliveryPincode, req.isPerishableOrganic);
    return {
      success: true,
      courierPartner: CourierPartner.SHIPROCKET,
      awbNumber: awb,
      courierName: 'Shiprocket (Bluedart/Delhivery)',
      shippingLabelUrl: `https://shiprocket.co/print-label/${awb}`,
      manifestId: `MAN_SR_${Date.now()}`,
      estimatedDeliveryDate: edd.formattedDeliveryDate,
      status: ShipmentStatus.CREATED,
    };
  }

  async bookReversePickup(req: ReversePickupRequest): Promise<ReversePickupResponse> {
    return {
      success: true,
      reverseAwb: `REV_SR_${Date.now().toString().slice(-8)}`,
      courierPartner: CourierPartner.SHIPROCKET,
      pickupScheduledDate: new Date(Date.now() + 86400000).toISOString(),
    };
  }
}

export class NimbuspostAdapter {
  constructor(private apiKey: string) {}

  async createShipment(req: ConsignmentBookingRequest): Promise<ConsignmentBookingResponse> {
    const awb = `NP${Date.now().toString().slice(-8)}${Math.floor(100 + Math.random() * 900)}`;
    const edd = calculateEdd(req.pickupPincode, req.deliveryPincode, req.isPerishableOrganic);
    return {
      success: true,
      courierPartner: CourierPartner.NIMBUSPOST,
      awbNumber: awb,
      courierName: 'NimbusPost Surface/Express',
      shippingLabelUrl: `https://nimbuspost.com/label/${awb}`,
      manifestId: `MAN_NP_${Date.now()}`,
      estimatedDeliveryDate: edd.formattedDeliveryDate,
      status: ShipmentStatus.CREATED,
    };
  }
}

export class TookanAdapter {
  constructor(private apiKey: string) {}

  async createShipment(req: ConsignmentBookingRequest): Promise<ConsignmentBookingResponse> {
    const awb = `TK_${Date.now().toString().slice(-8)}`;
    const edd = calculateEdd(req.pickupPincode, req.deliveryPincode, req.isPerishableOrganic);
    return {
      success: true,
      courierPartner: CourierPartner.TOOKAN,
      awbNumber: awb,
      courierName: 'Tookan On-Demand Fleet',
      shippingLabelUrl: `https://tookan.app/tracking/${awb}`,
      estimatedDeliveryDate: edd.formattedDeliveryDate,
      status: ShipmentStatus.CREATED,
    };
  }
}

export class ShipdayAdapter {
  constructor(private apiKey: string) {}

  async createShipment(req: ConsignmentBookingRequest): Promise<ConsignmentBookingResponse> {
    const awb = `SD_${Date.now().toString().slice(-8)}`;
    const edd = calculateEdd(req.pickupPincode, req.deliveryPincode, req.isPerishableOrganic);
    return {
      success: true,
      courierPartner: CourierPartner.SHIPDAY,
      awbNumber: awb,
      courierName: 'Shipday Dispatch',
      shippingLabelUrl: `https://shipday.com/track/${awb}`,
      estimatedDeliveryDate: edd.formattedDeliveryDate,
      status: ShipmentStatus.CREATED,
    };
  }
}

export class PidgeAdapter {
  constructor(private apiKey: string) {}

  async createShipment(req: ConsignmentBookingRequest): Promise<ConsignmentBookingResponse> {
    const awb = `PDG_${Date.now().toString().slice(-8)}`;
    const edd = calculateEdd(req.pickupPincode, req.deliveryPincode, req.isPerishableOrganic);
    return {
      success: true,
      courierPartner: CourierPartner.PIDGE,
      awbNumber: awb,
      courierName: 'Pidge Radius Delivery',
      shippingLabelUrl: `https://pidge.in/label/${awb}`,
      estimatedDeliveryDate: edd.formattedDeliveryDate,
      status: ShipmentStatus.CREATED,
    };
  }
}

export class InHouseLogisticsAdapter {
  async createShipment(req: ConsignmentBookingRequest): Promise<ConsignmentBookingResponse> {
    const awb = `GGT-${req.isPerishableOrganic ? 'EXP' : 'STD'}-${Date.now().toString().slice(-6)}`;
    const edd = calculateEdd(req.pickupPincode, req.deliveryPincode, req.isPerishableOrganic);
    return {
      success: true,
      courierPartner: CourierPartner.IN_HOUSE,
      awbNumber: awb,
      courierName: 'Gogate Internal Fleet & Hubs',
      shippingLabelUrl: `/api/logistics/labels/${awb}`,
      manifestId: `GGT_MAN_${Date.now()}`,
      estimatedDeliveryDate: edd.formattedDeliveryDate,
      status: ShipmentStatus.CREATED,
    };
  }
}

// ----------------------------------------------------------------------
// LOGISTICS DISPATCH FACTORY
// ----------------------------------------------------------------------
export interface LogisticsConfig {
  shiprocketToken?: string;
  nimbuspostApiKey?: string;
  tookanApiKey?: string;
  shipdayApiKey?: string;
  pidgeApiKey?: string;
}

export class LogisticsEngine {
  private shiprocket: ShiprocketAdapter;
  private nimbuspost: NimbuspostAdapter;
  private tookan: TookanAdapter;
  private shipday: ShipdayAdapter;
  private pidge: PidgeAdapter;
  private inHouse: InHouseLogisticsAdapter;

  constructor(config: LogisticsConfig = {}) {
    this.shiprocket = new ShiprocketAdapter(config.shiprocketToken || 'demo_sr_tok');
    this.nimbuspost = new NimbuspostAdapter(config.nimbuspostApiKey || 'demo_np_key');
    this.tookan = new TookanAdapter(config.tookanApiKey || 'demo_tk_key');
    this.shipday = new ShipdayAdapter(config.shipdayApiKey || 'demo_sd_key');
    this.pidge = new PidgeAdapter(config.pidgeApiKey || 'demo_pdg_key');
    this.inHouse = new InHouseLogisticsAdapter();
  }

  async bookConsignment(partner: CourierPartner, req: ConsignmentBookingRequest): Promise<ConsignmentBookingResponse> {
    switch (partner) {
      case CourierPartner.SHIPROCKET:
        return this.shiprocket.createShipment(req);
      case CourierPartner.NIMBUSPOST:
        return this.nimbuspost.createShipment(req);
      case CourierPartner.TOOKAN:
        return this.tookan.createShipment(req);
      case CourierPartner.SHIPDAY:
        return this.shipday.createShipment(req);
      case CourierPartner.PIDGE:
        return this.pidge.createShipment(req);
      case CourierPartner.IN_HOUSE:
      default:
        return this.inHouse.createShipment(req);
    }
  }

  async bookReversePickup(partner: CourierPartner, req: ReversePickupRequest): Promise<ReversePickupResponse> {
    if (partner === CourierPartner.SHIPROCKET) {
      return this.shiprocket.bookReversePickup(req);
    }
    return {
      success: true,
      reverseAwb: `REV_GGT_${Date.now().toString().slice(-8)}`,
      courierPartner: partner,
      pickupScheduledDate: new Date(Date.now() + 86400000).toISOString(),
    };
  }

  getCheckpointsForAwb(awbNumber: string, status: ShipmentStatus): TrackingCheckpoint[] {
    const now = new Date();
    const history: TrackingCheckpoint[] = [
      {
        id: 'cp_1',
        status: ShipmentStatus.CREATED,
        location: 'Seller Warehouse (Ratnagiri)',
        description: 'Electronic Shipping info received & AWB generated',
        timestamp: new Date(now.getTime() - 24 * 3600000).toISOString(),
      },
      {
        id: 'cp_2',
        status: ShipmentStatus.PICKED_UP,
        location: 'Ratnagiri Agro Hub (HUB-RTN-01)',
        description: 'Package picked up by courier partner',
        timestamp: new Date(now.getTime() - 18 * 3600000).toISOString(),
      },
    ];

    if (status === ShipmentStatus.IN_TRANSIT || status === ShipmentStatus.OUT_FOR_DELIVERY || status === ShipmentStatus.DELIVERED) {
      history.push({
        id: 'cp_3',
        status: ShipmentStatus.IN_TRANSIT,
        location: 'Mumbai Central Linehaul Transit Hub (HUB-BOM-01)',
        description: 'Consignment sorted and dispatched via inter-hub truck',
        timestamp: new Date(now.getTime() - 10 * 3600000).toISOString(),
      });
    }

    if (status === ShipmentStatus.OUT_FOR_DELIVERY || status === ShipmentStatus.DELIVERED) {
      history.push({
        id: 'cp_4',
        status: ShipmentStatus.OUT_FOR_DELIVERY,
        location: 'Local Delivery Branch',
        description: 'Out for delivery with Executive (OTP verification required)',
        timestamp: new Date(now.getTime() - 2 * 3600000).toISOString(),
      });
    }

    if (status === ShipmentStatus.DELIVERED) {
      history.push({
        id: 'cp_5',
        status: ShipmentStatus.DELIVERED,
        location: 'Customer Address',
        description: 'Package delivered safely. Customer OTP verified.',
        timestamp: now.toISOString(),
      });
    }

    return history;
  }
}
