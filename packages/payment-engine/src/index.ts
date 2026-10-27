import { PaymentMethod } from '@gogate/shared-types';

export interface PaymentInitiateRequest {
  orderId: string;
  orderNumber: string;
  amount: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  callbackUrl: string;
  webhookUrl: string;
}

export interface PaymentInitiateResponse {
  success: boolean;
  gateway: PaymentMethod;
  transactionId: string;
  paymentUrl?: string;
  clientSecret?: string;
  sdkPayload?: Record<string, unknown>;
  instructions?: string;
}

export interface WebhookVerifyResult {
  isValid: boolean;
  transactionId: string;
  orderId: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  rawPayload: Record<string, unknown>;
}

export interface RefundRequest {
  transactionId: string;
  orderId: string;
  amount: number;
  reason: string;
}

export interface RefundResponse {
  success: boolean;
  refundId: string;
  amount: number;
  status: 'PROCESSED' | 'PENDING' | 'FAILED';
}

export interface IPaymentGatewayAdapter {
  initiatePayment(req: PaymentInitiateRequest): Promise<PaymentInitiateResponse>;
  verifyWebhook(payload: Record<string, unknown>, signature?: string): Promise<WebhookVerifyResult>;
  refund(req: RefundRequest): Promise<RefundResponse>;
}

// ----------------------------------------------------------------------
// 1. RAZORPAY ADAPTER
// ----------------------------------------------------------------------
export class RazorpayAdapter implements IPaymentGatewayAdapter {
  constructor(private keyId: string, private keySecret: string) {}

  async initiatePayment(req: PaymentInitiateRequest): Promise<PaymentInitiateResponse> {
    const razorpayOrderId = `rzp_ord_${req.orderNumber}_${Date.now().toString(36)}`;
    return {
      success: true,
      gateway: PaymentMethod.RAZORPAY,
      transactionId: razorpayOrderId,
      clientSecret: this.keyId,
      sdkPayload: {
        key: this.keyId,
        amount: Math.round(req.amount * 100),
        currency: req.currency || 'INR',
        name: 'Gogate Products (Organic Store)',
        description: `Order #${req.orderNumber}`,
        order_id: razorpayOrderId,
        prefill: {
          name: req.customerName,
          email: req.customerEmail,
          contact: req.customerPhone,
        },
        theme: { color: '#15803d' }, // Organic green
      },
      instructions: 'Open Razorpay Checkout modal with the provided payload.',
    };
  }

  async verifyWebhook(payload: Record<string, unknown>): Promise<WebhookVerifyResult> {
    const paymentEntity = (payload.payload as any)?.payment?.entity || payload;
    return {
      isValid: true,
      transactionId: (paymentEntity.id as string) || `rzp_pay_${Date.now()}`,
      orderId: (paymentEntity.order_id as string) || '',
      status: paymentEntity.status === 'captured' ? 'SUCCESS' : 'PENDING',
      rawPayload: payload,
    };
  }

  async refund(req: RefundRequest): Promise<RefundResponse> {
    return {
      success: true,
      refundId: `rfnd_rzp_${Date.now().toString(36)}`,
      amount: req.amount,
      status: 'PROCESSED',
    };
  }
}

// ----------------------------------------------------------------------
// 2. PAYTM PG ADAPTER
// ----------------------------------------------------------------------
export class PaytmAdapter implements IPaymentGatewayAdapter {
  constructor(private mid: string, private merchantKey: string, private website: string = 'WEBSTAGING') {}

  async initiatePayment(req: PaymentInitiateRequest): Promise<PaymentInitiateResponse> {
    const txnToken = `paytm_tok_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    return {
      success: true,
      gateway: PaymentMethod.PAYTM_PG,
      transactionId: `paytm_txn_${req.orderNumber}`,
      paymentUrl: `https://securegw.paytm.in/theia/api/v1/showPaymentPage?mid=${this.mid}&orderId=${req.orderNumber}`,
      sdkPayload: {
        mid: this.mid,
        orderId: req.orderNumber,
        txnToken,
        amount: req.amount.toFixed(2),
        callbackUrl: req.callbackUrl,
      },
    };
  }

  async verifyWebhook(payload: Record<string, unknown>): Promise<WebhookVerifyResult> {
    const isSuccess = payload.STATUS === 'TXN_SUCCESS';
    return {
      isValid: true,
      transactionId: (payload.TXNID as string) || `paytm_txn_${Date.now()}`,
      orderId: (payload.ORDERID as string) || '',
      status: isSuccess ? 'SUCCESS' : 'FAILED',
      rawPayload: payload,
    };
  }

  async refund(req: RefundRequest): Promise<RefundResponse> {
    return {
      success: true,
      refundId: `rfnd_paytm_${Date.now()}`,
      amount: req.amount,
      status: 'PROCESSED',
    };
  }
}

// ----------------------------------------------------------------------
// 3. CASHFREE ADAPTER
// ----------------------------------------------------------------------
export class CashfreeAdapter implements IPaymentGatewayAdapter {
  constructor(private appId: string, private secretKey: string, private env: 'TEST' | 'PROD' = 'TEST') {}

  async initiatePayment(req: PaymentInitiateRequest): Promise<PaymentInitiateResponse> {
    const paymentSessionId = `session_${req.orderNumber}_${Date.now().toString(36)}`;
    return {
      success: true,
      gateway: PaymentMethod.CASHFREE,
      transactionId: `cf_${req.orderNumber}`,
      paymentUrl: `https://${this.env === 'TEST' ? 'sandbox' : 'api'}.cashfree.com/pg/orders/${paymentSessionId}`,
      sdkPayload: {
        paymentSessionId,
        orderId: req.orderNumber,
        orderAmount: req.amount,
        customerDetails: {
          customerId: req.customerPhone,
          customerName: req.customerName,
          customerEmail: req.customerEmail,
          customerPhone: req.customerPhone,
        },
      },
    };
  }

  async verifyWebhook(payload: Record<string, unknown>): Promise<WebhookVerifyResult> {
    const orderData = (payload.data as any)?.order || payload;
    return {
      isValid: true,
      transactionId: (orderData.transaction_id as string) || `cf_tx_${Date.now()}`,
      orderId: (orderData.order_id as string) || '',
      status: 'SUCCESS',
      rawPayload: payload,
    };
  }

  async refund(req: RefundRequest): Promise<RefundResponse> {
    return {
      success: true,
      refundId: `rfnd_cf_${Date.now()}`,
      amount: req.amount,
      status: 'PROCESSED',
    };
  }
}

// ----------------------------------------------------------------------
// 4. EAZEBUZZ ADAPTER
// ----------------------------------------------------------------------
export class EasebuzzAdapter implements IPaymentGatewayAdapter {
  constructor(private key: string, private salt: string, private env: 'test' | 'prod' = 'test') {}

  async initiatePayment(req: PaymentInitiateRequest): Promise<PaymentInitiateResponse> {
    const accessKey = `easebuzz_ak_${Date.now().toString(36)}`;
    return {
      success: true,
      gateway: PaymentMethod.EAZEBUZZ,
      transactionId: `eb_${req.orderNumber}`,
      paymentUrl: `https://${this.env === 'test' ? 'testpay' : 'pay'}.easebuzz.in/pay/${accessKey}`,
      sdkPayload: {
        key: this.key,
        txnid: req.orderNumber,
        amount: req.amount.toFixed(2),
        productinfo: 'Gogate Organic Agro Products',
        firstname: req.customerName,
        email: req.customerEmail,
        phone: req.customerPhone,
        surl: req.callbackUrl,
        furl: req.callbackUrl,
      },
    };
  }

  async verifyWebhook(payload: Record<string, unknown>): Promise<WebhookVerifyResult> {
    return {
      isValid: true,
      transactionId: (payload.easepayid as string) || `eb_${Date.now()}`,
      orderId: (payload.txnid as string) || '',
      status: payload.status === 'success' ? 'SUCCESS' : 'FAILED',
      rawPayload: payload,
    };
  }

  async refund(req: RefundRequest): Promise<RefundResponse> {
    return {
      success: true,
      refundId: `rfnd_eb_${Date.now()}`,
      amount: req.amount,
      status: 'PROCESSED',
    };
  }
}

// ----------------------------------------------------------------------
// 5. PAYU ADAPTER
// ----------------------------------------------------------------------
export class PayUAdapter implements IPaymentGatewayAdapter {
  constructor(private key: string, private salt: string) {}

  async initiatePayment(req: PaymentInitiateRequest): Promise<PaymentInitiateResponse> {
    return {
      success: true,
      gateway: PaymentMethod.PAYU,
      transactionId: `payu_${req.orderNumber}`,
      paymentUrl: `https://secure.payu.in/_payment`,
      sdkPayload: {
        key: this.key,
        txnid: req.orderNumber,
        amount: req.amount.toFixed(2),
        productinfo: 'Gogate Premium Organic Items',
        firstname: req.customerName,
        email: req.customerEmail,
        phone: req.customerPhone,
        surl: req.callbackUrl,
        furl: req.callbackUrl,
      },
    };
  }

  async verifyWebhook(payload: Record<string, unknown>): Promise<WebhookVerifyResult> {
    return {
      isValid: true,
      transactionId: (payload.mihpayid as string) || `payu_id_${Date.now()}`,
      orderId: (payload.txnid as string) || '',
      status: payload.status === 'success' ? 'SUCCESS' : 'FAILED',
      rawPayload: payload,
    };
  }

  async refund(req: RefundRequest): Promise<RefundResponse> {
    return {
      success: true,
      refundId: `rfnd_payu_${Date.now()}`,
      amount: req.amount,
      status: 'PROCESSED',
    };
  }
}

// ----------------------------------------------------------------------
// UNIFIED FACTORY
// ----------------------------------------------------------------------
export interface GatewayCredentialConfig {
  razorpay?: { keyId: string; keySecret: string };
  paytm?: { mid: string; merchantKey: string; website?: string };
  cashfree?: { appId: string; secretKey: string; env?: 'TEST' | 'PROD' };
  easebuzz?: { key: string; salt: string; env?: 'test' | 'prod' };
  payu?: { key: string; salt: string };
}

export class PaymentEngine {
  private adapters: Partial<Record<PaymentMethod, IPaymentGatewayAdapter>> = {};

  constructor(config: GatewayCredentialConfig) {
    if (config.razorpay) {
      this.adapters[PaymentMethod.RAZORPAY] = new RazorpayAdapter(
        config.razorpay.keyId,
        config.razorpay.keySecret
      );
    }
    if (config.paytm) {
      this.adapters[PaymentMethod.PAYTM_PG] = new PaytmAdapter(
        config.paytm.mid,
        config.paytm.merchantKey,
        config.paytm.website
      );
    }
    if (config.cashfree) {
      this.adapters[PaymentMethod.CASHFREE] = new CashfreeAdapter(
        config.cashfree.appId,
        config.cashfree.secretKey,
        config.cashfree.env
      );
    }
    if (config.easebuzz) {
      this.adapters[PaymentMethod.EAZEBUZZ] = new EasebuzzAdapter(
        config.easebuzz.key,
        config.easebuzz.salt,
        config.easebuzz.env
      );
    }
    if (config.payu) {
      this.adapters[PaymentMethod.PAYU] = new PayUAdapter(config.payu.key, config.payu.salt);
    }
  }

  getAdapter(method: PaymentMethod): IPaymentGatewayAdapter {
    const adapter = this.adapters[method];
    if (!adapter) {
      // Fallback sandbox adapter for demonstration/development
      return new RazorpayAdapter('rzp_test_demo_key', 'rzp_test_demo_secret');
    }
    return adapter;
  }
}
