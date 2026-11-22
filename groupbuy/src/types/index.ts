// Core entity interfaces for Group Buy Platform (TypeScript types)

export interface User {
  id: string;
  email: string;
  username: string;
  fullName?: string;
}

export interface GroupBuyTier {
  id: string;
  groupBuyId: string;
  totalKitsMin: number;
  pricePerUnit: number;
  isActive: boolean;
  createdAt: Date;
}

export interface GroupBuy {
  id: string;
  name: string;
  description?: string;
  productName: string;
  fulfillmentMode: 'direct' | 'collection';
  collectionAddress?: string;
  minKitsRequired: number;
  isActive: boolean;
  createdAt: Date;
  closedAt?: Date;
}

export interface Deposit {
  id: string;
  groupBuyId: string;
  userId: string;
  kitCount: number;
  depositAmount: number;
  totalWithShipping: number;
  stripeSessionId?: string;
  status: 'pending' | 'confirmed' | 'refunded' | 'forfeited';
  createdAt: Date;
  closedAt?: Date;
}

export interface FinalPayment {
  id: string;
  depositId: string;
  stripeSessionId?: string;
  amount: number;
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  paidAt?: Date;
  createdAt: Date;
}

export interface Shipment {
  id: string;
  depositId: string;
  shippingMethod?: string;
  trackingNumber?: string;
  status: 'pending' | 'shipped' | 'delivered';
  notes?: string;
  createdAt: Date;
}

export interface CryptoPayment {
  id: string;
  depositId?: string;
  amountUsdc: number;
  network: 'solana' | 'ethereum';
  walletAddress: string;
  txHash?: string;
  status: 'pending' | 'confirmed' | 'failed';
  createdAt: Date;
}

export interface CashPayment {
  id: string;
  depositId?: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'failed';
  notes?: string;
  createdAt: Date;
}
