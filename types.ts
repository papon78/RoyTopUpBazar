export interface ProductOption {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  type: 'player_id' | 'voucher'; // Does it require Player ID or is it a code?
  options: ProductOption[];
}

export interface CartItem {
  productId: string;
  productTitle: string;
  productImage: string;
  optionId: string;
  optionName: string;
  price: number;
  playerId?: string;
  server?: string;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
  paymentMethod: 'Bkash' | 'Nagad' | 'Wallet';
  paymentPhone?: string; // Optional if paid via wallet
  transactionId?: string; // Optional if paid via wallet
  userId?: string; // To link order to user
  discountApplied?: number;
}

export interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  date: string;
  description: string;
  method?: string; // Bkash, Nagad, or Order
  status: 'Completed' | 'Pending' | 'Failed';
}

export interface User {
  id?: string; // Added ID
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  walletBalance: number;
  role: 'user' | 'admin';
  isBanned?: boolean;
}

export interface PromoCode {
  code: string;
  type: 'fixed' | 'percentage';
  value: number;
  isActive: boolean;
  usageCount: number;
}

export const BKASH_NUMBER = "01712627336";
export const NAGAD_NUMBER = "01917243974";