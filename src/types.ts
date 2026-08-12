export interface HeroSlide {
  id: number;
  image: string;
  badge: string;
  title: string;
  subtitle: string;
  ctaText: string;
  categoryFilter?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  specifications: {
    material: string;
    finish: string;
    stoneType: string;
    weight: string;
    dimensions?: string;
    careInstructions: string;
  };
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isTrending?: boolean;
  inStock: boolean;
  tags: string[];
}

export interface Review {
  id: string;
  productId?: string;
  productName?: string;
  customerName: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  avatarUrl?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  giftWrap?: boolean;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine: string;
  apartment?: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

export type PaymentMethod = 'upi' | 'gpay' | 'card' | 'cod';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  upiTransactionRef?: string;
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  advancePaid?: number;
  balanceOnDelivery?: number;
  status: 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  estimatedDelivery: string;
}

export interface ContactMessage {
  id: string;
  date: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'Unread' | 'Read' | 'Replied';
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  memberSince: string;
  membershipTier: 'Gold' | 'Platinum' | 'Royal Diamond';
  rewardPoints: number;
  savedAddresses: ShippingAddress[];
}

