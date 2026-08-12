import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, ShippingAddress, PaymentMethod, Review, ContactMessage, HeroSlide, UserProfile } from '../types';
import { PRODUCTS, REVIEWS } from '../data/products';
import { auth, googleProvider, db } from '../lib/firebase';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';

export type PageName =
  | 'home'
  | 'shop'
  | 'collections'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'contact'
  | 'reviews'
  | 'wishlist'
  | 'order-confirmation'
  | 'admin'
  | 'admin-login'
  | 'login'
  | 'profile';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info';
}

interface ShopContextType {
  currentPage: PageName;
  selectedProductId: string | null;
  quickViewProductId: string | null;
  selectedCategoryFilter: string | null;
  searchQuery: string;
  cart: CartItem[];
  wishlist: string[];
  reviews: Review[];
  orders: Order[];
  contactMessages: ContactMessage[];
  lastPlacedOrder: Order | null;
  toast: Toast | null;
  isAdminLoggedIn: boolean;

  // Customer User Auth & Profile
  userProfile: UserProfile | null;
  isUserLoggedIn: boolean;
  loginUser: (userData: { name: string; email: string; phone?: string; avatarUrl?: string }) => void;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string, name: string, phone?: string) => Promise<void>;
  logoutUser: () => void;
  updateUserProfile: (data: Partial<UserProfile>) => void;
  addSavedAddress: (address: ShippingAddress) => void;
  deleteSavedAddress: (index: number) => void;

  
  // Products Management
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  uploadProductImage: (productId: string, imageUrl: string | string[]) => void;

  // Custom Logo & Banner Settings
  customLogoUrl: string | null;
  imageOnlyLogo: boolean;
  updateCustomLogo: (url: string | null) => void;
  setImageOnlyLogo: (val: boolean) => void;
  heroSlides: HeroSlide[];
  updateHeroSlide: (slide: HeroSlide) => void;
  announcementText: string;
  updateAnnouncementText: (text: string) => void;

  // Navigation & Filters
  navigateTo: (page: PageName, productId?: string | null, category?: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategoryFilter: (category: string | null) => void;
  setQuickViewProductId: (productId: string | null) => void;
  
  // Cart Actions
  addToCart: (product: Product, quantity?: number, giftWrap?: boolean) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartSubtotal: () => number;
  getCartTotalItems: () => number;
  
  // Wishlist Actions
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Reviews, Contact & Orders
  addReview: (review: Omit<Review, 'id' | 'date' | 'verified'>) => void;
  placeOrder: (address: ShippingAddress, paymentMethod: PaymentMethod, promoCode?: string, upiRef?: string) => Order;
  addContactMessage: (message: Omit<ContactMessage, 'id' | 'date' | 'status'>) => void;
  
  // Admin Management Actions
  adminLogin: (username: string, pass: string) => boolean;
  adminLogout: () => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  deleteOrder: (orderId: string) => void;
  updateMessageStatus: (messageId: string, status: ContactMessage['status']) => void;
  deleteContactMessage: (messageId: string) => void;

  showToast: (message: string, type?: 'success' | 'info') => void;
  hideToast: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const SAMPLE_ORDERS: Order[] = [
  {
    id: 'SUCHI-849201',
    date: '03 Aug 2026',
    items: [
      {
        product: PRODUCTS[1],
        quantity: 1,
        giftWrap: true,
      },
    ],
    shippingAddress: {
      fullName: 'Meera Rajput',
      email: 'meera.rajput@gmail.com',
      phone: '+91 98765 43210',
      addressLine: 'Flat 402, Royal Palms Society',
      apartment: 'Phase 2',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302017',
      landmark: 'Near City Park',
    },
    paymentMethod: 'upi',
    upiTransactionRef: 'UPI9823019284',
    subtotal: 1899,
    discount: 190,
    shippingFee: 0,
    total: 1709,
    status: 'Confirmed',
    estimatedDelivery: 'Wed, 06 Aug',
  },
  {
    id: 'SUCHI-510394',
    date: '02 Aug 2026',
    items: [
      {
        product: PRODUCTS[0],
        quantity: 1,
      },
      {
        product: PRODUCTS[3],
        quantity: 1,
      },
    ],
    shippingAddress: {
      fullName: 'Ananya Sharma',
      email: 'ananya.s@yahoo.com',
      phone: '+91 98112 33445',
      addressLine: 'B-12, Sector 15, Vasundhara',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201301',
    },
    paymentMethod: 'gpay',
    upiTransactionRef: 'GPAY7710928341',
    subtotal: 2698,
    discount: 0,
    shippingFee: 0,
    total: 2698,
    status: 'Processing',
    estimatedDelivery: 'Tue, 05 Aug',
  },
];

const SAMPLE_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-101',
    date: '03 Aug 2026, 11:20 AM',
    name: 'Pooja Verma',
    email: 'pooja.verma@gmail.com',
    phone: '+91 98765 11223',
    subject: 'Daily Wear Anti-Tarnish Inquiry',
    message: 'Hi Suchi Jewellery team! I am looking for lightweight daily wear anti-tarnish earrings and pendant sets for office wear. Can you share bulk gifting options and care details?',
    status: 'Unread',
  },
  {
    id: 'msg-102',
    date: '02 Aug 2026, 04:45 PM',
    name: 'Rohan Mehta',
    email: 'rohan.m@gmail.com',
    phone: '+91 98123 45678',
    subject: 'Order Dispatch Status',
    message: 'Hello, I placed order #SUCHI-849201 yesterday for my sister. When can I expect express dispatch to Delhi?',
    status: 'Read',
  },
];

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageName>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [quickViewProductId, setQuickViewProductId] = useState<string | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Persistent Admin login session
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem('suchi_admin_logged_in') === 'true';
    } catch {
      return false;
    }
  });

  // Persistent cart, wishlist, orders, messages
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('suchi_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('suchi_wishlist');
      return saved ? JSON.parse(saved) : ['suchi-p1', 'suchi-p10'];
    } catch {
      return ['suchi-p1', 'suchi-p10'];
    }
  });

  const [reviews, setReviews] = useState<Review[]>(REVIEWS);

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('suchi_orders');
      return saved ? JSON.parse(saved) : SAMPLE_ORDERS;
    } catch {
      return SAMPLE_ORDERS;
    }
  });

  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    try {
      const saved = localStorage.getItem('suchi_contact_messages');
      return saved ? JSON.parse(saved) : SAMPLE_MESSAGES;
    } catch {
      return SAMPLE_MESSAGES;
    }
  });

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('suchi_products');
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  // Firebase Firestore Realtime Listeners
  useEffect(() => {
    const unsubProducts = onSnapshot(
      collection(db, 'products'),
      (snapshot) => {
        if (snapshot.empty) {
          // Seed default products to Firestore
          PRODUCTS.forEach((p) => {
            setDoc(doc(db, 'products', p.id), p, { merge: true }).catch(console.error);
          });
          setProducts(PRODUCTS);
        } else {
          const items = snapshot.docs.map((doc) => doc.data() as Product);
          setProducts(items);
        }
      },
      (err) => console.error('Firestore products listener error:', err)
    );

    const unsubOrders = onSnapshot(
      collection(db, 'orders'),
      (snapshot) => {
        if (!snapshot.empty) {
          const items = snapshot.docs.map((doc) => doc.data() as Order);
          setOrders(items);
        }
      },
      (err) => console.error('Firestore orders listener error:', err)
    );

    const unsubReviews = onSnapshot(
      collection(db, 'reviews'),
      (snapshot) => {
        if (!snapshot.empty) {
          const items = snapshot.docs.map((doc) => doc.data() as Review);
          setReviews(items);
        }
      },
      (err) => console.error('Firestore reviews listener error:', err)
    );

    const unsubMessages = onSnapshot(
      collection(db, 'contact_messages'),
      (snapshot) => {
        if (!snapshot.empty) {
          const items = snapshot.docs.map((doc) => doc.data() as ContactMessage);
          setContactMessages(items);
        }
      },
      (err) => console.error('Firestore messages listener error:', err)
    );

    const unsubSiteSettings = onSnapshot(
      doc(db, 'site_settings', 'config'),
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.customLogoUrl !== undefined) setCustomLogoUrlState(data.customLogoUrl);
          if (data.imageOnlyLogo !== undefined) setImageOnlyLogoState(data.imageOnlyLogo);
          if (data.heroSlides && Array.isArray(data.heroSlides)) setHeroSlides(data.heroSlides);
          if (data.announcementText) setAnnouncementTextState(data.announcementText);
        }
      },
      (err) => console.error('Firestore site_settings listener error:', err)
    );

    return () => {
      unsubProducts();
      unsubOrders();
      unsubReviews();
      unsubMessages();
      unsubSiteSettings();
    };
  }, []);

  // Sync products to localStorage fallback
  useEffect(() => {
    try {
      localStorage.setItem('suchi_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    setDoc(doc(db, 'products', newProduct.id), newProduct, { merge: true }).catch(console.error);
    showToast(`✨ Product "${newProduct.name}" added successfully!`);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setDoc(doc(db, 'products', updatedProduct.id), updatedProduct, { merge: true }).catch(console.error);
    showToast(`Updated "${updatedProduct.name}" successfully!`);
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    deleteDoc(doc(db, 'products', productId)).catch(console.error);
    showToast(`Product removed from catalog`);
  };

  const uploadProductImage = (productId: string, imageUrl: string | string[]) => {
    const newUrls = Array.isArray(imageUrl) ? imageUrl : [imageUrl];
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const current = p.images || [];
          const filteredExisting = current.filter((img) => !newUrls.includes(img));
          const updatedImages = [...newUrls, ...filteredExisting];
          const updatedProduct = { ...p, images: updatedImages };
          setDoc(doc(db, 'products', productId), updatedProduct, { merge: true }).catch(console.error);
          return updatedProduct;
        }
        return p;
      })
    );
    showToast(`📷 ${newUrls.length > 1 ? `${newUrls.length} images` : 'Image'} uploaded for product successfully!`);
  };

  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);

  const [customLogoUrl, setCustomLogoUrlState] = useState<string | null>(() => {
    try {
      return localStorage.getItem('suchi_custom_logo_url');
    } catch {
      return null;
    }
  });

  const [imageOnlyLogo, setImageOnlyLogoState] = useState<boolean>(() => {
    try {
      return localStorage.getItem('suchi_image_only_logo') === 'true';
    } catch {
      return false;
    }
  });

  const DEFAULT_SLIDES: HeroSlide[] = [
    {
      id: 1,
      image: '',
      badge: '✨ Everyday Anti-Tarnish Collection',
      title: 'Daily Wear Jewellery That Never Fades',
      subtitle: 'Explore ultra-lightweight, anti-tarnish artificial jewellery designed for work, coffee dates, and everyday elegance.',
      ctaText: 'Shop Daily Wear',
      categoryFilter: 'Pendants'
    },
    {
      id: 2,
      image: '',
      badge: '💎 Affordable Premium Quality',
      title: 'Sparkle Every Day Without Compromise',
      subtitle: 'Charming earrings, rings, and pendants engineered with skin-friendly anti-tarnish coating at budget-friendly prices.',
      ctaText: 'Explore Affordable Quality',
      categoryFilter: 'Earrings'
    },
    {
      id: 3,
      image: '',
      badge: '🛡️ 100% Skin-Friendly & Water-Resistant',
      title: 'Designed For Active, Effortless Daily Style',
      subtitle: 'Tarnish-proof artificial jewellery crafted with clear coat seal so your daily pieces stay flawless all day, every day.',
      ctaText: 'Browse Daily Must-Haves',
    }
  ];

  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => {
    try {
      const saved = localStorage.getItem('suchi_hero_slides');
      return saved ? JSON.parse(saved) : DEFAULT_SLIDES;
    } catch {
      return DEFAULT_SLIDES;
    }
  });

  const [announcementText, setAnnouncementTextState] = useState<string>(() => {
    try {
      return localStorage.getItem('suchi_announcement_text') || '✨ Free PAN-India Express Delivery on Orders Over ₹999 • Use Code SUCHI10 for Extra 10% OFF';
    } catch {
      return '✨ Free PAN-India Express Delivery on Orders Over ₹999 • Use Code SUCHI10 for Extra 10% OFF';
    }
  });

  const updateHeroSlide = (updatedSlide: HeroSlide) => {
    setHeroSlides((prev) => {
      const newSlides = prev.map((s) => (s.id === updatedSlide.id ? updatedSlide : s));
      try {
        localStorage.setItem('suchi_hero_slides', JSON.stringify(newSlides));
      } catch (e) {
        console.error(e);
      }
      setDoc(doc(db, 'site_settings', 'config'), { heroSlides: newSlides }, { merge: true }).catch(console.error);
      return newSlides;
    });
    showToast(`✨ Hero slide #${updatedSlide.id} updated!`);
  };

  const updateAnnouncementText = (text: string) => {
    setAnnouncementTextState(text);
    try {
      localStorage.setItem('suchi_announcement_text', text);
    } catch (e) {
      console.error(e);
    }
    setDoc(doc(db, 'site_settings', 'config'), { announcementText: text }, { merge: true }).catch(console.error);
    showToast('📢 Store Announcement Bar updated!');
  };

  const DEFAULT_USER: UserProfile = {
    id: 'USER-98240',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 98765 43210',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    memberSince: 'August 2024',
    membershipTier: 'Platinum',
    rewardPoints: 650,
    savedAddresses: [
      {
        fullName: 'Priya Sharma',
        email: 'priya.sharma@example.com',
        phone: '+91 98765 43210',
        addressLine: 'Flat 402, Lotus Height Apartments, MG Road',
        apartment: 'Near City Mall',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        landmark: 'Opposite Central Park'
      }
    ]
  };

  const [userProfile, setUserProfileState] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('suchi_user_profile');
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  const [isUserLoggedIn, setIsUserLoggedInState] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('suchi_user_logged_in');
      return saved !== null ? saved === 'true' : true; // default logged in for demo
    } catch {
      return true;
    }
  });

  // Listen to Firebase Auth state change and sync profile with Firestore
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        setIsUserLoggedInState(true);
        try {
          const userDocRef = doc(db, 'users', fbUser.uid);
          const snap = await getDoc(userDocRef);
          if (snap.exists()) {
            setUserProfileState(snap.data() as UserProfile);
          } else {
            const newProfile: UserProfile = {
              id: fbUser.uid,
              name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Valued Customer',
              email: fbUser.email || '',
              phone: fbUser.phoneNumber || '+91 98765 43210',
              avatarUrl: fbUser.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
              memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
              membershipTier: 'Gold',
              rewardPoints: 100,
              savedAddresses: []
            };
            await setDoc(userDocRef, newProfile, { merge: true });
            setUserProfileState(newProfile);
          }
        } catch (e) {
          console.error("Error fetching user profile from Firestore:", e);
        }
      }
    });
    return () => unsub();
  }, []);

  const loginWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const fbUser = res.user;
      showToast(`✨ Welcome ${fbUser.displayName || 'Customer'}! Logged in with Google.`);
    } catch (err: any) {
      console.error("Google Auth error:", err);
      showToast(err.message || "Failed to sign in with Google", 'info');
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      showToast(`✨ Welcome back!`);
    } catch (err: any) {
      console.error("Email login error:", err);
      showToast(err.message || "Invalid credentials", 'info');
      throw err;
    }
  };

  const registerWithEmail = async (email: string, pass: string, name: string, phone?: string) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      const fbUser = res.user;
      const newProfile: UserProfile = {
        id: fbUser.uid,
        name: name || fbUser.email?.split('@')[0] || 'Valued Customer',
        email: fbUser.email || email,
        phone: phone || '+91 98765 43210',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        membershipTier: 'Gold',
        rewardPoints: 100,
        savedAddresses: []
      };
      await setDoc(doc(db, 'users', fbUser.uid), newProfile);
      setUserProfileState(newProfile);
      setIsUserLoggedInState(true);
      showToast(`✨ Account created successfully! Welcome to Suchi VIP.`);
    } catch (err: any) {
      console.error("Registration error:", err);
      showToast(err.message || "Registration failed", 'info');
      throw err;
    }
  };

  const loginUser = (userData: { name: string; email: string; phone?: string; avatarUrl?: string }) => {
    const updated: UserProfile = userProfile ? {
      ...userProfile,
      name: userData.name || userProfile.name,
      email: userData.email || userProfile.email,
      phone: userData.phone || userProfile.phone,
      avatarUrl: userData.avatarUrl || userProfile.avatarUrl,
    } : {
      id: `USER-${Math.floor(10000 + Math.random() * 90000)}`,
      name: userData.name,
      email: userData.email,
      phone: userData.phone || '+91 98765 43210',
      avatarUrl: userData.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      memberSince: 'August 2026',
      membershipTier: 'Gold',
      rewardPoints: 100,
      savedAddresses: [],
    };

    setUserProfileState(updated);
    setIsUserLoggedInState(true);
    try {
      localStorage.setItem('suchi_user_profile', JSON.stringify(updated));
      localStorage.setItem('suchi_user_logged_in', 'true');
    } catch (e) {
      console.error(e);
    }
    showToast(`Welcome back, ${updated.name}! ✨`);
  };

  const logoutUser = () => {
    signOut(auth).catch(console.error);
    setIsUserLoggedInState(false);
    try {
      localStorage.setItem('suchi_user_logged_in', 'false');
    } catch (e) {
      console.error(e);
    }
    showToast('You have been logged out.');
  };

  const updateUserProfile = (data: Partial<UserProfile>) => {
    if (!userProfile) return;
    const updated = { ...userProfile, ...data };
    setUserProfileState(updated);
    if (auth.currentUser) {
      setDoc(doc(db, 'users', auth.currentUser.uid), updated, { merge: true }).catch(console.error);
    }
    try {
      localStorage.setItem('suchi_user_profile', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    showToast('✨ Account Profile updated successfully!');
  };

  const addSavedAddress = (address: ShippingAddress) => {
    if (!userProfile) return;
    const updatedAddresses = [...userProfile.savedAddresses, address];
    updateUserProfile({ savedAddresses: updatedAddresses });
  };

  const deleteSavedAddress = (index: number) => {
    if (!userProfile) return;
    const updatedAddresses = userProfile.savedAddresses.filter((_, i) => i !== index);
    updateUserProfile({ savedAddresses: updatedAddresses });
  };

  const updateCustomLogo = (url: string | null) => {
    try {
      if (url) {
        localStorage.setItem('suchi_custom_logo_url', url);
      } else {
        localStorage.removeItem('suchi_custom_logo_url');
      }
    } catch (e) {
      console.error(e);
    }
    setCustomLogoUrlState(url);
    setDoc(doc(db, 'site_settings', 'config'), { customLogoUrl: url }, { merge: true }).catch(console.error);
    showToast(url ? '📷 Brand logo updated successfully!' : 'Logo reset to default');
  };

  const setImageOnlyLogo = (val: boolean) => {
    try {
      localStorage.setItem('suchi_image_only_logo', String(val));
    } catch (e) {
      console.error(e);
    }
    setImageOnlyLogoState(val);
    setDoc(doc(db, 'site_settings', 'config'), { imageOnlyLogo: val }, { merge: true }).catch(console.error);
    showToast(val ? 'Logo mode set to Image Only' : 'Logo mode set to Image + Text');
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('suchi_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('suchi_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('suchi_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('suchi_contact_messages', JSON.stringify(contactMessages));
    } catch (e) {
      console.error(e);
    }
  }, [contactMessages]);

  useEffect(() => {
    try {
      localStorage.setItem('suchi_admin_logged_in', isAdminLoggedIn ? 'true' : 'false');
    } catch (e) {
      console.error(e);
    }
  }, [isAdminLoggedIn]);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ id: Date.now().toString(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const hideToast = () => setToast(null);

  const navigateTo = (page: PageName, productId?: string | null, category?: string | null) => {
    if (productId !== undefined) {
      setSelectedProductId(productId);
    }
    if (category !== undefined) {
      setSelectedCategoryFilter(category);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, quantity = 1, giftWrap = false) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity, giftWrap: giftWrap || item.giftWrap }
            : item
        );
      }
      return [...prev, { product, quantity, giftWrap }];
    });
    showToast(`✨ Added "${product.name}" to your Cart!`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const getCartSubtotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const getCartTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        const prod = PRODUCTS.find((p) => p.id === productId);
        showToast(`❤️ Added "${prod?.name || 'Jewellery'}" to Wishlist!`);
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const addReview = (newRev: Omit<Review, 'id' | 'date' | 'verified'>) => {
    const fullReview: Review = {
      ...newRev,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      verified: true,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    };
    setReviews((prev) => [fullReview, ...prev]);
    setDoc(doc(db, 'reviews', fullReview.id), fullReview, { merge: true }).catch(console.error);
    showToast('✨ Thank you! Your review has been submitted.');
  };

  const placeOrder = (
    address: ShippingAddress,
    paymentMethod: PaymentMethod,
    promoCode?: string,
    upiRef?: string
  ): Order => {
    const subtotal = getCartSubtotal();
    const isCod = paymentMethod === 'cod';
    let discount = 0;
    if (!isCod) {
      if (promoCode === 'SUCHI10') {
        discount = Math.round(subtotal * 0.1);
      } else if (promoCode === 'SPARKLE20') {
        discount = 200;
      }
    }

    const shippingFee = subtotal >= 999 ? 0 : 99;
    const total = Math.max(0, subtotal - discount + shippingFee);

    const advancePaid = isCod ? Math.min(100, total) : total;
    const balanceOnDelivery = isCod ? Math.max(0, total - advancePaid) : 0;

    const newOrder: Order = {
      id: `SUCHI-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: [...cart],
      shippingAddress: address,
      paymentMethod,
      upiTransactionRef: upiRef,
      subtotal,
      discount,
      shippingFee,
      total,
      advancePaid,
      balanceOnDelivery,
      status: 'Confirmed',
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      }),
    };

    setOrders((prev) => [newOrder, ...prev]);
    setDoc(doc(db, 'orders', newOrder.id), newOrder, { merge: true }).catch(console.error);
    setLastPlacedOrder(newOrder);
    setCart([]);
    setCurrentPage('order-confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('🎉 Order Placed Successfully! Made to make you happy!');
    return newOrder;
  };

  const addContactMessage = (newMsg: Omit<ContactMessage, 'id' | 'date' | 'status'>) => {
    const fullMsg: ContactMessage = {
      ...newMsg,
      id: `msg-${Date.now()}`,
      date: new Date().toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
      status: 'Unread',
    };
    setContactMessages((prev) => [fullMsg, ...prev]);
    setDoc(doc(db, 'contact_messages', fullMsg.id), fullMsg, { merge: true }).catch(console.error);
  };

  const adminLogin = (username: string, pass: string): boolean => {
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = pass.trim();
    if (
      (cleanUser === 'admin' || cleanUser === 'admin@suchijewellery.com' || cleanUser === 'suchiadmin') &&
      (cleanPass === 'admin' || cleanPass === 'admin123' || cleanPass === 'Suchi@2026')
    ) {
      setIsAdminLoggedIn(true);
      showToast('🔑 Welcome Admin! Logged into Admin Control Panel.');
      return true;
    } else {
      showToast('❌ Invalid Username or Password', 'info');
      return false;
    }
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    navigateTo('home');
    showToast('Logged out of Admin Panel', 'info');
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          const updated = { ...o, status };
          setDoc(doc(db, 'orders', orderId), updated, { merge: true }).catch(console.error);
          return updated;
        }
        return o;
      })
    );
    showToast(`Order #${orderId} status updated to ${status}`);
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    deleteDoc(doc(db, 'orders', orderId)).catch(console.error);
    showToast(`Order #${orderId} removed`, 'info');
  };

  const updateMessageStatus = (messageId: string, status: ContactMessage['status']) => {
    setContactMessages((prev) =>
      prev.map((m) => {
        if (m.id === messageId) {
          const updated = { ...m, status };
          setDoc(doc(db, 'contact_messages', messageId), updated, { merge: true }).catch(console.error);
          return updated;
        }
        return m;
      })
    );
    showToast(`Message marked as ${status}`);
  };

  const deleteContactMessage = (messageId: string) => {
    setContactMessages((prev) => prev.filter((m) => m.id !== messageId));
    deleteDoc(doc(db, 'contact_messages', messageId)).catch(console.error);
    showToast('Message deleted', 'info');
  };

  return (
    <ShopContext.Provider
      value={{
        currentPage,
        selectedProductId,
        quickViewProductId,
        selectedCategoryFilter,
        searchQuery,
        cart,
        wishlist,
        reviews,
        orders,
        contactMessages,
        lastPlacedOrder,
        toast,
        isAdminLoggedIn,
        userProfile,
        isUserLoggedIn,
        loginUser,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        logoutUser,
        updateUserProfile,
        addSavedAddress,
        deleteSavedAddress,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        uploadProductImage,
        customLogoUrl,
        imageOnlyLogo,
        updateCustomLogo,
        setImageOnlyLogo,
        heroSlides,
        updateHeroSlide,
        announcementText,
        updateAnnouncementText,
        navigateTo,
        setSearchQuery,
        setSelectedCategoryFilter,
        setQuickViewProductId,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        getCartSubtotal,
        getCartTotalItems,
        toggleWishlist,
        isInWishlist,
        addReview,
        placeOrder,
        addContactMessage,
        adminLogin,
        adminLogout,
        updateOrderStatus,
        deleteOrder,
        updateMessageStatus,
        deleteContactMessage,
        showToast,
        hideToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
