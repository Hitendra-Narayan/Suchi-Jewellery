import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Order, ContactMessage, Product, HeroSlide } from '../types';
import { processImageFile } from '../utils/imageUtils';
import {
  ShoppingBag,
  MessageSquare,
  Package,
  TrendingUp,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Trash2,
  LogOut,
  ShieldCheck,
  Eye,
  DollarSign,
  User,
  Sparkles,
  QrCode,
  Send,
  Printer,
  Image as ImageIcon,
  Camera,
  Upload,
  RotateCcw,
  Plus,
  Pencil,
  Sliders,
  Megaphone,
  X,
  Check,
  Tag
} from 'lucide-react';
import { Logo } from '../components/Logo';

export const AdminDashboardPage: React.FC = () => {
  const {
    orders,
    contactMessages,
    isAdminLoggedIn,
    adminLogout,
    updateOrderStatus,
    deleteOrder,
    updateMessageStatus,
    deleteContactMessage,
    customLogoUrl,
    imageOnlyLogo,
    updateCustomLogo,
    setImageOnlyLogo,
    navigateTo,
    products,
    addProduct,
    updateProduct,
    uploadProductImage,
    deleteProduct,
    heroSlides,
    updateHeroSlide,
    announcementText,
    updateAnnouncementText,
  } = useShop();

  const [activeTab, setActiveTab] = useState<'orders' | 'messages' | 'products' | 'site-settings' | 'logo'>('products');
  const [logoUrlInput, setLogoUrlInput] = useState('');
  const [isLogoUploading, setIsLogoUploading] = useState(false);
  const [logoDragActive, setLogoDragActive] = useState(false);

  const handleLogoFileUpload = async (file: File) => {
    if (!file) return;
    try {
      setIsLogoUploading(true);
      const dataUrl = await processImageFile(file, { maxWidth: 1000, maxHeight: 1000, quality: 0.92 });
      updateCustomLogo(dataUrl);
    } catch (err: any) {
      alert(err.message || 'Error processing logo image file.');
    } finally {
      setIsLogoUploading(false);
    }
  };
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('All');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);

  const [messageSearch, setMessageSearch] = useState('');
  const [messageStatusFilter, setMessageStatusFilter] = useState<string>('All');

  // Product Add / Edit Modal & Filter State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('All');

  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Earrings' as Product['category'],
    price: '',
    originalPrice: '',
    description: '',
    images: [] as string[],
    newImageUrl: '',
    material: 'Skin-Friendly Alloy with Anti-Tarnish Clear Seal',
    finish: 'Anti-Tarnish Protective Finish',
    stoneType: 'Everyday High-Shine Faceted Stone',
    weight: '30 grams',
    careInstructions: 'Store in soft pouch after use. Built durable for daily wear.',
    tags: 'Handcrafted, Anti-Tarnish, Daily Wear',
    isBestseller: false,
    isNewArrival: true,
    isTrending: false,
    inStock: true,
  });

  // Site Banners & Announcement Settings State
  const [announcementInput, setAnnouncementInput] = useState(announcementText);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      category: 'Earrings',
      price: '',
      originalPrice: '',
      description: '',
      images: [],
      newImageUrl: '',
      material: 'Skin-Friendly Alloy with Anti-Tarnish Clear Seal',
      finish: 'Anti-Tarnish Protective Finish',
      stoneType: 'Everyday High-Shine Faceted Stone',
      weight: '30 grams',
      careInstructions: 'Store in soft pouch after use. Built durable for daily wear.',
      tags: 'Handcrafted, Anti-Tarnish, Daily Wear',
      isBestseller: false,
      isNewArrival: true,
      isTrending: false,
      inStock: true,
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      category: prod.category || 'Earrings',
      price: prod.price ? prod.price.toString() : '',
      originalPrice: prod.originalPrice ? prod.originalPrice.toString() : prod.price.toString(),
      description: prod.description || '',
      images: prod.images ? [...prod.images] : [],
      newImageUrl: '',
      material: prod.specifications?.material || 'Skin-Friendly Alloy with Anti-Tarnish Clear Seal',
      finish: prod.specifications?.finish || 'Anti-Tarnish Protective Finish',
      stoneType: prod.specifications?.stoneType || 'Everyday High-Shine Faceted Stone',
      weight: prod.specifications?.weight || '30 grams',
      careInstructions: prod.specifications?.careInstructions || 'Store in soft pouch after use. Keep away from direct water and perfume.',
      tags: prod.tags && prod.tags.length > 0 ? prod.tags.join(', ') : 'Handcrafted, Anti-Tarnish',
      isBestseller: !!prod.isBestseller,
      isNewArrival: !!prod.isNewArrival,
      isTrending: !!prod.isTrending,
      inStock: prod.inStock !== false,
    });
    setIsProductModalOpen(true);
  };

  const handleAddImageUrl = () => {
    if (productForm.newImageUrl.trim()) {
      setProductForm({
        ...productForm,
        images: [...productForm.images, productForm.newImageUrl.trim()],
        newImageUrl: '',
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setProductForm({
      ...productForm,
      images: productForm.images.filter((_, idx) => idx !== index),
    });
  };

  const handleSetPrimaryImage = (index: number) => {
    if (index === 0) return;
    const updatedImages = [...productForm.images];
    const [selected] = updatedImages.splice(index, 1);
    updatedImages.unshift(selected);
    setProductForm({
      ...productForm,
      images: updatedImages,
    });
  };

  const handleUploadNewImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      try {
        const processedImages: string[] = [];
        for (let i = 0; i < files.length; i++) {
          const dataUrl = await processImageFile(files[i]);
          processedImages.push(dataUrl);
        }
        setProductForm((prev) => ({
          ...prev,
          images: [...prev.images, ...processedImages],
        }));
      } catch (err: any) {
        alert(err.message || 'Error processing product image');
      }
    }
    e.target.value = '';
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name.trim()) {
      alert('Please enter a product name');
      return;
    }

    const numPrice = parseFloat(productForm.price) || 0;
    const numOriginalPrice = parseFloat(productForm.originalPrice) || numPrice;
    const parsedTags = productForm.tags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    let currentImages = [...productForm.images];
    if (productForm.newImageUrl.trim()) {
      currentImages.push(productForm.newImageUrl.trim());
    }
    currentImages = currentImages.filter((img) => img.trim().length > 0);

    if (editingProduct) {
      const updated: Product = {
        ...editingProduct,
        name: productForm.name.trim(),
        category: productForm.category,
        price: numPrice,
        originalPrice: numOriginalPrice,
        description: productForm.description.trim() || 'Handcrafted jewellery designed to make you happy with premium anti-tarnish finish.',
        images: currentImages.length > 0 ? currentImages : (editingProduct.images || []),
        isBestseller: productForm.isBestseller,
        isNewArrival: productForm.isNewArrival,
        isTrending: productForm.isTrending,
        inStock: productForm.inStock,
        tags: parsedTags.length > 0 ? parsedTags : (editingProduct.tags || ['Handcrafted']),
        specifications: {
          material: productForm.material,
          finish: productForm.finish,
          stoneType: productForm.stoneType,
          weight: productForm.weight,
          careInstructions: productForm.careInstructions,
        },
      };
      updateProduct(updated);
    } else {
      const newProduct: Product = {
        id: `suchi-p${Date.now().toString().slice(-6)}`,
        name: productForm.name.trim(),
        category: productForm.category,
        price: numPrice,
        originalPrice: numOriginalPrice,
        rating: 5.0,
        reviewCount: 1,
        images: currentImages,
        description: productForm.description.trim() || 'Handcrafted jewellery designed to make you happy with premium anti-tarnish finish.',
        isBestseller: productForm.isBestseller,
        isNewArrival: productForm.isNewArrival,
        isTrending: productForm.isTrending,
        inStock: productForm.inStock,
        tags: parsedTags.length > 0 ? parsedTags : [productForm.category, 'Handcrafted', 'Anti-Tarnish'],
        specifications: {
          material: productForm.material,
          finish: productForm.finish,
          stoneType: productForm.stoneType,
          weight: productForm.weight,
          careInstructions: productForm.careInstructions,
        },
      };
      addProduct(newProduct);
    }

    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  // If not logged in, redirect or display login
  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-xl mx-auto my-16 px-4 text-center space-y-6">
        <div className="w-16 h-16 bg-rose-50 text-[#D42D51] rounded-2xl mx-auto flex items-center justify-center border-2 border-rose-200">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-gray-900">Admin Access Restricted</h2>
        <p className="text-xs text-gray-600">
          You must be logged in with administrator credentials to view store orders and messages.
        </p>
        <button
          onClick={() => navigateTo('admin-login')}
          className="px-8 py-3 bg-[#D42D51] text-white font-bold text-xs rounded-full shadow-md hover:bg-rose-700 transition-all"
        >
          Go to Admin Login Page
        </button>
      </div>
    );
  }

  // Calculate Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? o.total : 0), 0);
  const totalOrdersCount = orders.length;
  const unreadMessagesCount = contactMessages.filter((m) => m.status === 'Unread').length;
  const pendingShipmentsCount = orders.filter((o) => o.status === 'Confirmed' || o.status === 'Processing').length;

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.shippingAddress.fullName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.shippingAddress.phone.includes(orderSearch) ||
      (o.upiTransactionRef && o.upiTransactionRef.toLowerCase().includes(orderSearch.toLowerCase()));

    const matchesStatus = orderStatusFilter === 'All' || o.status === orderStatusFilter;

    return matchesSearch && matchesStatus;
  });

  // Filtered Messages
  const filteredMessages = contactMessages.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(messageSearch.toLowerCase()) ||
      m.email.toLowerCase().includes(messageSearch.toLowerCase()) ||
      m.phone.includes(messageSearch) ||
      m.subject.toLowerCase().includes(messageSearch.toLowerCase()) ||
      m.message.toLowerCase().includes(messageSearch.toLowerCase());

    const matchesStatus = messageStatusFilter === 'All' || m.status === messageStatusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status: Order['status']) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Processing':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Shipped':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Admin Header Bar */}
      <div className="bg-gradient-to-r from-gray-900 via-stone-900 to-black rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-[#D42D51] text-white rounded-2xl flex items-center justify-center font-serif font-bold text-2xl shadow-lg border border-rose-300/30">
            S
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-rose-500/30 text-rose-300 border border-rose-400/30 rounded-full text-[10px] font-bold uppercase tracking-wider">
                Authorized Administrator
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-0.5">
              Suchi Jewellery Control Panel
            </h1>
            <p className="text-xs text-stone-300 font-light">
              Manage product sales orders, customer inquiries & inventory in real time.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-end md:self-auto">
          <button
            onClick={handleOpenAddProduct}
            className="px-4 py-2.5 bg-[#D42D51] hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-all shadow-lg flex items-center gap-1.5 border border-rose-300/40 transform hover:scale-105 active:scale-95"
          >
            <Plus className="w-4 h-4" /> + Add New Product
          </button>
          <button
            onClick={() => navigateTo('home')}
            className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold rounded-xl transition-all border border-stone-700 flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" /> View Storefront
          </button>
          <button
            onClick={adminLogout}
            className="px-4 py-2.5 bg-rose-600/80 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout Admin
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-medium text-gray-500 block">Total Revenue</span>
            <strong className="text-xl font-bold text-gray-900">₹{totalRevenue.toLocaleString('en-IN')}</strong>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-medium text-gray-500 block">Total Orders</span>
            <strong className="text-xl font-bold text-gray-900">{totalOrdersCount}</strong>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-medium text-gray-500 block">Pending Shipments</span>
            <strong className="text-xl font-bold text-gray-900">{pendingShipmentsCount}</strong>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-[#D42D51] flex items-center justify-center shrink-0 relative">
            <MessageSquare className="w-6 h-6" />
            {unreadMessagesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {unreadMessagesCount}
              </span>
            )}
          </div>
          <div>
            <span className="text-[11px] font-medium text-gray-500 block">Customer Inquiries</span>
            <strong className="text-xl font-bold text-gray-900">{contactMessages.length} Messages</strong>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-rose-100 pb-2">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
            activeTab === 'products'
              ? 'bg-[#D42D51] text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-rose-50 border border-gray-200'
          }`}
        >
          <Package className="w-4 h-4" />
          Product Catalog ({products.length})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'bg-[#D42D51] text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-rose-50 border border-gray-200'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          Product Orders ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('messages')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 relative ${
            activeTab === 'messages'
              ? 'bg-[#D42D51] text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-rose-50 border border-gray-200'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Customer Inquiries ({contactMessages.length})
          {unreadMessagesCount > 0 && (
            <span className="ml-1 px-1.5 py-0.2 bg-amber-400 text-gray-900 text-[10px] font-black rounded-full">
              {unreadMessagesCount} New
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('site-settings')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
            activeTab === 'site-settings'
              ? 'bg-[#D42D51] text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-rose-50 border border-gray-200'
          }`}
        >
          <Sliders className="w-4 h-4" />
          Hero Banners & Announcement Bar
        </button>

        <button
          onClick={() => setActiveTab('logo')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
            activeTab === 'logo'
              ? 'bg-[#D42D51] text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-rose-50 border border-gray-200'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          Brand Logo Settings
        </button>
      </div>

      {/* TAB 1: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-rose-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by Order ID, Name, Phone, UPI Ref..."
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-rose-50/30 border border-rose-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-400"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="text-xs font-semibold text-gray-600">Status:</span>
              <select
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
                className="px-3 py-2 text-xs bg-rose-50/30 border border-rose-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-400 font-medium"
              >
                <option value="All">All Statuses</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Orders Table / Cards */}
          {filteredOrders.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-rose-100 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto" />
              <h3 className="text-lg font-bold text-gray-800">No Product Orders Found</h3>
              <p className="text-xs text-gray-500">
                {orderSearch || orderStatusFilter !== 'All'
                  ? 'Try clearing search filters.'
                  : 'Orders placed on the storefront will automatically appear here.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-rose-100 p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rose-50 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-base font-serif font-bold text-[#D42D51] bg-rose-50 px-3 py-1 rounded-xl border border-rose-200">
                        #{order.id}
                      </span>
                      <span className="text-xs text-gray-500 font-medium">{order.date}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Interactive Status Changer */}
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full border ${getStatusBadgeClass(
                          order.status
                        )} cursor-pointer focus:outline-none`}
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>

                      <button
                        onClick={() => setSelectedOrderDetails(order)}
                        className="p-1.5 text-gray-600 hover:text-[#D42D51] hover:bg-rose-50 rounded-lg transition-colors"
                        title="View Full Order Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete Order #${order.id}?`)) {
                            deleteOrder(order.id);
                          }
                        }}
                        className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Order"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Order Details Body */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Customer Info */}
                    <div className="space-y-1.5 text-xs">
                      <span className="font-bold text-gray-900 block flex items-center gap-1 text-xs uppercase tracking-wider">
                        <User className="w-3.5 h-3.5 text-[#D42D51]" /> Customer Details
                      </span>
                      <p className="font-bold text-gray-900 text-sm">{order.shippingAddress.fullName}</p>
                      <p className="text-gray-600 flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-gray-400 shrink-0" />
                        <a href={`tel:${order.shippingAddress.phone}`} className="hover:underline text-rose-600 font-semibold">
                          {order.shippingAddress.phone}
                        </a>
                      </p>
                      <p className="text-gray-600 flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-gray-400 shrink-0" />
                        {order.shippingAddress.email}
                      </p>
                      <p className="text-gray-600 flex items-start gap-1.5 pt-1">
                        <MapPin className="w-3 h-3 text-gray-400 shrink-0 mt-0.5" />
                        <span>
                          {order.shippingAddress.addressLine}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                        </span>
                      </p>
                    </div>

                    {/* Purchased Items */}
                    <div className="space-y-2 text-xs">
                      <span className="font-bold text-gray-900 block uppercase tracking-wider">
                        Items Purchased ({order.items.reduce((s, i) => s + i.quantity, 0)})
                      </span>
                      <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2.5 bg-rose-50/40 p-2 rounded-xl">
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              referrerPolicy="no-referrer"
                              className="w-10 h-10 object-cover rounded-lg shrink-0 border border-rose-200"
                            />
                            <div className="min-w-0 flex-1">
                              <p className="font-bold text-gray-800 text-[11px] truncate">{item.product.name}</p>
                              <p className="text-[10px] text-gray-500">
                                Qty: <strong>{item.quantity}</strong> × ₹{item.product.price}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Payment & Amount Summary */}
                    <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-100 flex flex-col justify-between text-xs space-y-2">
                      <div className="space-y-1">
                        <span className="font-bold text-gray-900 block uppercase tracking-wider text-[10px]">
                          Payment Details
                        </span>
                        <div className="flex items-center justify-between text-gray-700">
                          <span>Method:</span>
                          <strong className="uppercase font-bold text-rose-700">
                            {order.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : order.paymentMethod}
                          </strong>
                        </div>
                        {order.paymentMethod === 'cod' && (
                          <div className="bg-amber-100/70 p-2 rounded-lg border border-amber-200 text-[11px] space-y-1 my-1">
                            <div className="flex justify-between text-emerald-800 font-bold">
                              <span>Advance Received:</span>
                              <span className="font-mono">₹{order.advancePaid ?? 100}</span>
                            </div>
                            <div className="flex justify-between text-amber-900 font-bold border-t border-amber-200 pt-1">
                              <span>Collect Cash on Delivery:</span>
                              <span className="font-mono">₹{(order.balanceOnDelivery ?? Math.max(0, order.total - 100)).toLocaleString('en-IN')}</span>
                            </div>
                          </div>
                        )}
                        {order.upiTransactionRef && (
                          <div className="flex items-center justify-between text-[11px] text-emerald-800 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200 font-mono">
                            <span>UPI Ref ID:</span>
                            <strong className="font-bold">{order.upiTransactionRef}</strong>
                          </div>
                        )}
                      </div>

                      <div className="pt-2 border-t border-rose-200 flex items-center justify-between text-sm">
                        <span className="font-bold text-gray-800">Total Amount:</span>
                        <span className="font-bold text-[#D42D51] text-base">₹{order.total.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CUSTOMER INQUIRIES & MESSAGES */}
      {activeTab === 'messages' && (
        <div className="space-y-6">
          {/* Message Filters */}
          <div className="bg-white p-4 rounded-2xl border border-rose-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search message text, name, email..."
                value={messageSearch}
                onChange={(e) => setMessageSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-rose-50/30 border border-rose-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-400"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-semibold text-gray-600">Filter Status:</span>
              <select
                value={messageStatusFilter}
                onChange={(e) => setMessageStatusFilter(e.target.value)}
                className="px-3 py-2 text-xs bg-rose-50/30 border border-rose-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-400 font-medium"
              >
                <option value="All">All Messages</option>
                <option value="Unread">Unread</option>
                <option value="Read">Read</option>
                <option value="Replied">Replied</option>
              </select>
            </div>
          </div>

          {filteredMessages.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-rose-100 text-center space-y-3">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto" />
              <h3 className="text-lg font-bold text-gray-800">No Customer Messages Found</h3>
              <p className="text-xs text-gray-500">Inquiries submitted from the Contact page will appear here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`bg-white rounded-2xl border p-5 shadow-xs space-y-4 flex flex-col justify-between transition-all ${
                    msg.status === 'Unread'
                      ? 'border-rose-400 bg-rose-50/20 ring-2 ring-rose-100'
                      : 'border-rose-100'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 border-b border-rose-50 pb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                            msg.status === 'Unread'
                              ? 'bg-rose-500 text-white border-rose-600'
                              : msg.status === 'Replied'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-gray-100 text-gray-700 border-gray-200'
                          }`}
                        >
                          {msg.status}
                        </span>
                        <span className="text-[11px] font-semibold text-gray-700">{msg.subject}</span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-medium">{msg.date}</span>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{msg.name}</h4>
                      <p className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3 text-gray-400" /> {msg.email} | <Phone className="w-3 h-3 text-gray-400" /> {msg.phone}
                      </p>
                    </div>

                    <div className="bg-rose-50/50 p-3 rounded-xl border border-rose-100 text-xs text-gray-700 leading-relaxed font-light">
                      "{msg.message}"
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-rose-50 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <select
                        value={msg.status}
                        onChange={(e) => updateMessageStatus(msg.id, e.target.value as ContactMessage['status'])}
                        className="text-[11px] font-semibold bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 focus:outline-none"
                      >
                        <option value="Unread">Unread</option>
                        <option value="Read">Read</option>
                        <option value="Replied">Replied</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded-lg shadow-xs flex items-center gap-1"
                      >
                        <Send className="w-3 h-3" /> WhatsApp
                      </a>
                      <a
                        href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                        className="px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-[10px] rounded-lg shadow-xs flex items-center gap-1"
                      >
                        <Mail className="w-3 h-3" /> Email
                      </a>
                      <button
                        onClick={() => {
                          if (confirm('Delete this message?')) {
                            deleteContactMessage(msg.id);
                          }
                        }}
                        className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PRODUCT CATALOG MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          {/* Top Control Bar */}
          <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search products by name, category, ID..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-rose-50/40 border border-rose-200 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D42D51]"
                />
              </div>

              <select
                value={productCategoryFilter}
                onChange={(e) => setProductCategoryFilter(e.target.value)}
                className="px-3 py-2 bg-rose-50/40 border border-rose-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#D42D51]"
              >
                <option value="All">All Categories</option>
                <option value="Earrings">Earrings</option>
                <option value="Pendants">Pendants</option>
                <option value="Pendant with Earrings">Pendant with Earrings</option>
                <option value="Rings">Rings</option>
                <option value="Bangles & Handcuffs">Bangles & Handcuffs</option>
              </select>
            </div>

            <button
              onClick={handleOpenAddProduct}
              className="px-5 py-2.5 bg-[#D42D51] hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add New Product</span>
            </button>
          </div>

          {/* Product Inventory Table */}
          <div className="bg-white rounded-2xl border border-rose-100 overflow-hidden shadow-xs">
            <div className="p-4 border-b border-rose-100 bg-rose-50/30 flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="font-serif font-bold text-gray-900 text-lg">Product Inventory & Catalog</h3>
                <p className="text-xs text-gray-500">Add, edit details, change pricing, and manage photos for store products.</p>
              </div>
              <span className="bg-rose-100 text-[#D42D51] px-3 py-1 rounded-full text-xs font-extrabold shrink-0">
                {products.length} Total Items
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-600">
                <thead className="bg-rose-50/70 text-gray-700 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-4 py-3">Thumbnail</th>
                    <th className="px-4 py-3">Product Info</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Price & MRP</th>
                    <th className="px-4 py-3">Badges & Stock</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rose-50">
                  {products
                    .filter((p) => {
                      const matchesSearch =
                        p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                        p.category.toLowerCase().includes(productSearch.toLowerCase()) ||
                        p.id.toLowerCase().includes(productSearch.toLowerCase());
                      const matchesCategory = productCategoryFilter === 'All' || p.category === productCategoryFilter;
                      return matchesSearch && matchesCategory;
                    })
                    .map((prod) => {
                      const hasImg = prod.images && prod.images.length > 0 && prod.images[0].trim().length > 0;
                      return (
                        <tr key={prod.id} className="hover:bg-rose-50/20 transition-colors">
                          <td className="px-4 py-3">
                            <div className="w-14 h-14 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center overflow-hidden shrink-0 relative group shadow-2xs">
                              {hasImg ? (
                                <img
                                  src={prod.images[0]}
                                  alt={prod.name}
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <Sparkles className="w-6 h-6 text-rose-300" />
                              )}
                            </div>
                          </td>

                          <td className="px-4 py-3">
                            <div className="space-y-0.5">
                              <p className="font-bold text-gray-900 text-xs">{prod.name}</p>
                              <p className="text-[11px] text-gray-500 line-clamp-1 max-w-xs">{prod.description}</p>
                              <span className="text-[10px] text-rose-500 font-mono font-medium">ID: {prod.id}</span>
                            </div>
                          </td>

                          <td className="px-4 py-3 font-semibold text-gray-800">
                            <span className="bg-stone-100 text-stone-800 px-2.5 py-1 rounded-lg border border-stone-200">
                              {prod.category}
                            </span>
                          </td>

                          <td className="px-4 py-3">
                            <div>
                              <strong className="text-rose-600 text-sm block font-bold">₹{prod.price}</strong>
                              <span className="line-through text-gray-400 text-[10px]">₹{prod.originalPrice}</span>
                            </div>
                          </td>

                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-1">
                              {prod.isBestseller && (
                                <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[9px] font-bold rounded">
                                  Bestseller
                                </span>
                              )}
                              {prod.isNewArrival && (
                                <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-bold rounded">
                                  New
                                </span>
                              )}
                              {prod.inStock ? (
                                <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-[9px] font-bold rounded">
                                  In Stock
                                </span>
                              ) : (
                                <span className="px-1.5 py-0.5 bg-rose-100 text-rose-800 text-[9px] font-bold rounded">
                                  Out of Stock
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Edit details */}
                              <button
                                onClick={() => handleOpenEditProduct(prod)}
                                className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-[11px] rounded-lg border border-stone-200 flex items-center gap-1 transition-all"
                                title="Edit product details, name, price, description"
                              >
                                <Pencil className="w-3 h-3 text-stone-600" />
                                <span>Edit</span>
                              </button>

                              {/* Upload Photo */}
                              <label className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-[#D42D51] font-bold text-[11px] rounded-lg border border-rose-200 flex items-center gap-1 cursor-pointer transition-all">
                                <Upload className="w-3 h-3" />
                                <span>Photo</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  multiple
                                  onChange={async (e) => {
                                    const files = e.target.files;
                                    if (files && files.length > 0) {
                                      try {
                                        const newImages: string[] = [];
                                        for (let i = 0; i < files.length; i++) {
                                          const dataUrl = await processImageFile(files[i]);
                                          newImages.push(dataUrl);
                                        }
                                        uploadProductImage(prod.id, newImages);
                                      } catch (err: any) {
                                        alert(err.message || 'Error processing uploaded images');
                                      }
                                    }
                                    e.target.value = '';
                                  }}
                                  className="hidden"
                                />
                              </label>

                              {/* Preview in Store */}
                              <button
                                onClick={() => navigateTo('product-detail', prod.id)}
                                className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                                title="View product in storefront"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>

                              {/* Delete Product */}
                              <button
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete "${prod.name}" from catalog?`)) {
                                    deleteProduct(prod.id);
                                  }
                                }}
                                className="p-1.5 text-rose-400 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
                                title="Delete product from catalog"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: HERO BANNERS & ANNOUNCEMENTS */}
      {activeTab === 'site-settings' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm space-y-8">
          <div className="border-b border-rose-100 pb-4">
            <span className="text-xs font-bold text-[#D42D51] uppercase tracking-wider block">
              Website Banners & Ribbon
            </span>
            <h2 className="text-2xl font-serif font-bold text-gray-900 mt-1">
              Storefront Banners & Announcements
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Customize the top announcement bar message and edit slide texts, badges, and background imagery for the homepage hero slider.
            </p>
          </div>

          {/* Announcement Ribbon Settings */}
          <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-200 space-y-4">
            <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
              <Megaphone className="w-5 h-5 text-[#D42D51]" />
              <h3>Top Announcement Bar Text</h3>
            </div>
            <p className="text-xs text-gray-600">
              This text appears at the very top of every page on the website.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={announcementInput}
                onChange={(e) => setAnnouncementInput(e.target.value)}
                placeholder="Enter announcement text..."
                className="flex-1 px-4 py-2.5 bg-white border border-rose-200 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D42D51]"
              />
              <button
                onClick={() => updateAnnouncementText(announcementInput)}
                className="px-6 py-2.5 bg-[#D42D51] hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" /> Save Ribbon Message
              </button>
            </div>
          </div>

          {/* Hero Slider Banner Editor */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-gray-900 text-lg">Homepage Hero Slider Slides</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {heroSlides.map((slide) => (
                <div key={slide.id} className="bg-stone-900 text-white p-5 rounded-2xl space-y-4 shadow-md border border-stone-800">
                  <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                    <span className="text-xs font-bold text-amber-400">Slide #{slide.id}</span>
                    <span className="text-[10px] text-stone-400">{slide.categoryFilter || 'All Items'}</span>
                  </div>

                  {slide.image ? (
                    <div className="h-28 rounded-xl overflow-hidden border border-stone-700">
                      <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="h-20 rounded-xl bg-stone-800 border border-stone-700 flex items-center justify-center text-xs text-stone-400 italic">
                      Default Gradient Background
                    </div>
                  )}

                  <div className="space-y-2 text-xs">
                    <div>
                      <label className="text-[10px] text-stone-400 block font-semibold uppercase">Badge Text</label>
                      <input
                        type="text"
                        defaultValue={slide.badge}
                        onBlur={(e) => updateHeroSlide({ ...slide, badge: e.target.value })}
                        className="w-full px-2.5 py-1.5 bg-stone-800 border border-stone-700 rounded-lg text-amber-200 text-xs focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-stone-400 block font-semibold uppercase">Main Title</label>
                      <input
                        type="text"
                        defaultValue={slide.title}
                        onBlur={(e) => updateHeroSlide({ ...slide, title: e.target.value })}
                        className="w-full px-2.5 py-1.5 bg-stone-800 border border-stone-700 rounded-lg text-white font-serif font-bold text-xs focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-stone-400 block font-semibold uppercase">Subtitle</label>
                      <textarea
                        rows={2}
                        defaultValue={slide.subtitle}
                        onBlur={(e) => updateHeroSlide({ ...slide, subtitle: e.target.value })}
                        className="w-full px-2.5 py-1.5 bg-stone-800 border border-stone-700 rounded-lg text-stone-300 text-xs focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-stone-400 block font-semibold uppercase">Slide Image URL</label>
                      <input
                        type="text"
                        defaultValue={slide.image}
                        placeholder="https://..."
                        onBlur={(e) => updateHeroSlide({ ...slide, image: e.target.value })}
                        className="w-full px-2.5 py-1.5 bg-stone-800 border border-stone-700 rounded-lg text-stone-300 text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: LOGO MANAGEMENT */}
      {activeTab === 'logo' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm space-y-8">
          <div className="border-b border-rose-100 pb-4">
            <span className="text-xs font-bold text-[#D42D51] uppercase tracking-wider block">
              Brand Identity
            </span>
            <h2 className="text-2xl font-serif font-bold text-gray-900 mt-1">
              Custom Brand Logo Settings
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Upload your official logo image or paste an image URL. It will automatically update across the entire storefront header and footer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Upload & URL Controls */}
            <div className="space-y-6">
              {/* File Upload Box */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
                  1. Upload Logo Image File from Device
                </label>

                {/* Upload Zone */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setLogoDragActive(true);
                  }}
                  onDragLeave={() => setLogoDragActive(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setLogoDragActive(false);
                    const file = e.dataTransfer.files?.[0];
                    if (file) handleLogoFileUpload(file);
                  }}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all relative group cursor-pointer ${
                    logoDragActive
                      ? 'border-[#D42D51] bg-rose-100/80 scale-[1.01]'
                      : 'border-rose-200 hover:border-[#D42D51] bg-rose-50/40'
                  }`}
                >
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleLogoFileUpload(file);
                        e.target.value = '';
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />

                  {isLogoUploading ? (
                    <div className="flex flex-col items-center justify-center space-y-3 py-2">
                      <div className="w-10 h-10 border-3 border-[#D42D51] border-t-transparent rounded-full animate-spin mx-auto" />
                      <p className="text-xs font-bold text-gray-800">
                        Processing & Compressing Image...
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="w-12 h-12 bg-white text-[#D42D51] rounded-2xl flex items-center justify-center shadow-xs border border-rose-100 group-hover:scale-110 transition-transform">
                        <Upload className="w-6 h-6" />
                      </div>
                      <p className="text-xs font-bold text-gray-800">
                        Click or Drag & Drop image file from device
                      </p>
                      <p className="text-[10px] text-gray-500">
                        Supports PNG, JPG, WEBP, SVG (Auto-compressed for fast loading)
                      </p>
                    </div>
                  )}
                </div>

                {/* Active Custom Logo Card */}
                {customLogoUrl && (
                  <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200 flex items-center justify-between gap-3 mt-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white p-1 border border-emerald-200 flex items-center justify-center shrink-0">
                        <img
                          src={customLogoUrl}
                          alt="Uploaded Logo Preview"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                          ✓ Custom Logo Active
                        </span>
                        <p className="text-xs font-semibold text-gray-800 line-clamp-1">
                          Saved in Store Memory
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => updateCustomLogo(null)}
                      className="px-3 py-1.5 text-xs font-bold text-rose-600 hover:text-rose-800 hover:bg-rose-100 bg-white rounded-xl transition-all border border-rose-200 shrink-0 cursor-pointer"
                    >
                      Remove Logo
                    </button>
                  </div>
                )}
              </div>

              {/* Image URL Input */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
                  2. Or Enter Image Web URL
                </label>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (logoUrlInput.trim()) {
                      updateCustomLogo(logoUrlInput.trim());
                      setLogoUrlInput('');
                    }
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="url"
                    placeholder="https://example.com/my-logo.png"
                    value={logoUrlInput}
                    onChange={(e) => setLogoUrlInput(e.target.value)}
                    className="flex-1 px-4 py-2.5 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D42D51]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#D42D51] text-white text-xs font-bold rounded-xl hover:bg-rose-700 transition-all shadow-xs cursor-pointer"
                  >
                    Set URL Logo
                  </button>
                </form>
              </div>

              {/* Display Mode Toggle */}
              <div className="p-4 bg-rose-50/60 rounded-2xl border border-rose-100 space-y-3">
                <span className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
                  3. Storefront Logo Display Mode
                </span>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => setImageOnlyLogo(false)}
                    className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                      !imageOnlyLogo
                        ? 'bg-[#D42D51] text-white border-[#D42D51] shadow-xs'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-rose-100'
                    }`}
                  >
                    Image + Brand Name Text
                  </button>

                  <button
                    type="button"
                    onClick={() => setImageOnlyLogo(true)}
                    className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                      imageOnlyLogo
                        ? 'bg-[#D42D51] text-white border-[#D42D51] shadow-xs'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-rose-100'
                    }`}
                  >
                    Image Only Logo
                  </button>
                </div>
              </div>

              {/* Reset to Default */}
              {customLogoUrl && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => updateCustomLogo(null)}
                    className="px-4 py-2 text-xs font-bold text-rose-600 hover:text-rose-800 bg-rose-50 rounded-xl hover:bg-rose-100 transition-all flex items-center gap-1.5 border border-rose-200 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset to Default Official Logo
                  </button>
                </div>
              )}
            </div>

            {/* Right: Live Preview Box */}
            <div className="bg-gradient-to-br from-rose-50/50 to-pink-50/30 p-6 rounded-3xl border border-rose-100 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
                  Live Storefront Preview
                </span>
                <p className="text-[11px] text-gray-500 mb-6">
                  Here is how your custom brand logo appears on the storefront header and navigation bar:
                </p>

                <div className="bg-white p-6 rounded-2xl border border-rose-200 shadow-xs flex items-center justify-center min-h-[160px] relative">
                  <Logo size="md" allowQuickUpload={true} />
                </div>
              </div>

              <div className="p-4 bg-white/80 rounded-2xl text-[11px] text-gray-600 space-y-1 border border-rose-100">
                <span className="font-bold text-gray-900 block">💡 Direct Upload Hint:</span>
                <p>
                  Hover over the logo preview above and click the camera button to pick an image file directly from your device!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FULL ORDER DETAILS MODAL */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setSelectedOrderDetails(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-800 p-1 bg-gray-100 rounded-full"
            >
              <XCircle className="w-6 h-6" />
            </button>

            <div className="border-b border-rose-100 pb-4 space-y-1">
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Order Invoice Details</span>
              <h3 className="text-2xl font-serif font-bold text-gray-900">
                Order #{selectedOrderDetails.id}
              </h3>
              <p className="text-xs text-gray-500">Placed on {selectedOrderDetails.date}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100 space-y-1.5">
                <span className="font-bold text-gray-900 block uppercase text-[10px]">Customer Information</span>
                <p className="font-bold text-sm text-gray-900">{selectedOrderDetails.shippingAddress.fullName}</p>
                <p className="text-gray-600">Phone: {selectedOrderDetails.shippingAddress.phone}</p>
                <p className="text-gray-600">Email: {selectedOrderDetails.shippingAddress.email}</p>
              </div>

              <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100 space-y-1.5">
                <span className="font-bold text-gray-900 block uppercase text-[10px]">Shipping Address</span>
                <p className="text-gray-700 leading-relaxed">
                  {selectedOrderDetails.shippingAddress.addressLine}
                  {selectedOrderDetails.shippingAddress.apartment && `, ${selectedOrderDetails.shippingAddress.apartment}`}
                  <br />
                  {selectedOrderDetails.shippingAddress.city}, {selectedOrderDetails.shippingAddress.state} - {selectedOrderDetails.shippingAddress.pincode}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <span className="font-bold text-gray-900 text-xs uppercase tracking-wider block">Items Summary</span>
              <div className="space-y-2 divide-y divide-rose-50 border border-rose-100 rounded-2xl p-3">
                {selectedOrderDetails.items.map((item, i) => (
                  <div key={i} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-bold text-gray-900">{item.product.name}</p>
                        <span className="text-[10px] text-gray-500">Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <span className="font-bold text-gray-900">₹{item.product.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl space-y-2 text-xs border border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <strong className="text-gray-900">₹{selectedOrderDetails.subtotal}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Discount:</span>
                <strong className="text-emerald-600">-₹{selectedOrderDetails.discount}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping:</span>
                <strong className="text-gray-900">₹{selectedOrderDetails.shippingFee}</strong>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 text-sm">
                <span className="font-bold text-gray-900">Total Paid:</span>
                <strong className="font-bold text-[#D42D51] text-base">₹{selectedOrderDetails.total}</strong>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" /> Print Order Invoice
              </button>
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="px-6 py-2 bg-[#D42D51] text-white text-xs font-bold rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Add / Edit Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8 border border-rose-100 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto relative">
            <div className="flex items-center justify-between border-b border-rose-100 pb-4 sticky top-0 bg-white z-20 pt-1">
              <div>
                <span className="text-xs font-bold text-[#D42D51] uppercase tracking-wider block">
                  {editingProduct ? 'Update Product Catalog Item' : 'New Catalog Item'}
                </span>
                <h3 className="text-2xl font-serif font-bold text-gray-900">
                  {editingProduct ? `Edit "${editingProduct.name}"` : 'Add New Product'}
                </h3>
              </div>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-rose-50 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-6">
              {/* SECTION 1: TITLE & CATEGORY */}
              <div className="bg-rose-50/30 p-4.5 rounded-2xl border border-rose-100 space-y-4">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5 text-[#D42D51]">
                  <Tag className="w-4 h-4" /> 1. Product Title & Category
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-800 uppercase mb-1">
                      Product Title / Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Gulabi Daily Wear Floral Jhumka Set"
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-rose-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D42D51]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-800 uppercase mb-1">
                      Category *
                    </label>
                    <select
                      value={productForm.category}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value as any })}
                      className="w-full px-3 py-2.5 bg-white border border-rose-200 rounded-xl text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D42D51]"
                    >
                      <option value="Earrings">Earrings</option>
                      <option value="Pendants">Pendants</option>
                      <option value="Pendant with Earrings">Pendant with Earrings</option>
                      <option value="Rings">Rings</option>
                      <option value="Bangles & Handcuffs">Bangles & Handcuffs</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 2: PRICING */}
              <div className="bg-rose-50/30 p-4.5 rounded-2xl border border-rose-100 space-y-4">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5 text-[#D42D51]">
                  <DollarSign className="w-4 h-4" /> 2. Pricing & MRP
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-800 uppercase mb-1">
                      Selling Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      placeholder="1299"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-rose-200 rounded-xl text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D42D51]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-800 uppercase mb-1">
                      Original Price / MRP (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      placeholder="2499"
                      value={productForm.originalPrice}
                      onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-rose-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D42D51]"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: IMAGES MANAGEMENT */}
              <div className="bg-rose-50/30 p-4.5 rounded-2xl border border-rose-100 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5 text-[#D42D51]">
                    <ImageIcon className="w-4 h-4" /> 3. Product Gallery Images ({productForm.images.length})
                  </h4>
                  <span className="text-[10px] text-gray-500 font-medium">First image is primary thumbnail</span>
                </div>

                {/* Existing Images Thumbnails Strip */}
                {productForm.images.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {productForm.images.map((imgUrl, idx) => (
                      <div key={idx} className="relative group bg-white p-2 rounded-2xl border border-rose-200 shadow-2xs flex flex-col items-center">
                        <div className="w-full h-24 rounded-xl overflow-hidden bg-rose-50 mb-2 relative">
                          <img src={imgUrl} alt={`Product ${idx}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                          {idx === 0 && (
                            <span className="absolute top-1 left-1 bg-[#D42D51] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                              Main
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between w-full gap-1 pt-1 border-t border-rose-100">
                          {idx !== 0 && (
                            <button
                              type="button"
                              onClick={() => handleSetPrimaryImage(idx)}
                              className="text-[10px] font-bold text-amber-700 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded"
                              title="Set as Main Thumbnail"
                            >
                              Set Main
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="text-[10px] font-bold text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 px-2 py-0.5 rounded ml-auto flex items-center gap-0.5"
                          >
                            <Trash2 className="w-3 h-3" /> Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-white rounded-xl border border-dashed border-rose-200 text-center text-xs text-gray-500">
                    No images added yet. Add an image web URL or upload a photo file below.
                  </div>
                )}

                {/* Add Image Inputs */}
                <div className="space-y-2 pt-2 border-t border-rose-200">
                  <span className="text-xs font-bold text-gray-800 block">Add Image to Gallery</span>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder="Paste Image Web URL (https://...)"
                      value={productForm.newImageUrl}
                      onChange={(e) => setProductForm({ ...productForm, newImageUrl: e.target.value })}
                      className="flex-1 px-4 py-2 bg-white border border-rose-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D42D51]"
                    />
                    <button
                      type="button"
                      onClick={handleAddImageUrl}
                      className="px-4 py-2 bg-stone-800 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors shrink-0"
                    >
                      + Add URL
                    </button>
                    <label className="px-4 py-2 bg-rose-100 hover:bg-rose-200 text-[#D42D51] font-bold text-xs rounded-xl cursor-pointer flex items-center justify-center gap-1.5 shrink-0 transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload File</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleUploadNewImage}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* SECTION 4: DESCRIPTION */}
              <div className="bg-rose-50/30 p-4.5 rounded-2xl border border-rose-100 space-y-3">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5 text-[#D42D51]">
                  <Sparkles className="w-4 h-4" /> 4. Product Details & Description
                </h4>
                <textarea
                  rows={3}
                  placeholder="Describe the product design, aesthetics, inspiration, and style guide..."
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-rose-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D42D51]"
                />
              </div>

              {/* SECTION 5: HIGHLIGHTS & SPECIFICATIONS */}
              <div className="bg-rose-50/30 p-4.5 rounded-2xl border border-rose-100 space-y-4">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5 text-[#D42D51]">
                  <Sliders className="w-4 h-4" /> 5. Product Highlights & Craftsmanship Specifications
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-800 uppercase mb-1">
                      Base Metal / Material
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Skin-Friendly Brass Alloy"
                      value={productForm.material}
                      onChange={(e) => setProductForm({ ...productForm, material: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-rose-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D42D51]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-800 uppercase mb-1">
                      Polish / Finish
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Anti-Tarnish High Shine Clear Seal"
                      value={productForm.finish}
                      onChange={(e) => setProductForm({ ...productForm, finish: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-rose-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D42D51]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-800 uppercase mb-1">
                      Stone Work / Type
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. High-Shine Faceted Kundan Stone"
                      value={productForm.stoneType}
                      onChange={(e) => setProductForm({ ...productForm, stoneType: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-rose-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D42D51]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-800 uppercase mb-1">
                      Weight / Dimensions
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 25 grams"
                      value={productForm.weight}
                      onChange={(e) => setProductForm({ ...productForm, weight: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-rose-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D42D51]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase mb-1">
                    Care Instructions
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Store in soft pouch after use. Keep away from water and direct perfume."
                    value={productForm.careInstructions}
                    onChange={(e) => setProductForm({ ...productForm, careInstructions: e.target.value })}
                    className="w-full px-4 py-2 bg-white border border-rose-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D42D51]"
                  />
                </div>
              </div>

              {/* SECTION 6: TAGS & BADGES */}
              <div className="bg-rose-50/30 p-4.5 rounded-2xl border border-rose-100 space-y-4">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5 text-[#D42D51]">
                  <Megaphone className="w-4 h-4" /> 6. Store Badges & Search Tags
                </h4>

                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase mb-1">
                    Search Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Jhumka, Handcrafted, Anti-Tarnish, Daily Wear"
                    value={productForm.tags}
                    onChange={(e) => setProductForm({ ...productForm, tags: e.target.value })}
                    className="w-full px-4 py-2 bg-white border border-rose-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D42D51]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase mb-2">
                    Highlight Badges & Stock Status
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-medium text-gray-800">
                    <label className="flex items-center gap-2 cursor-pointer bg-white p-2.5 rounded-xl border border-rose-100 shadow-2xs">
                      <input
                        type="checkbox"
                        checked={productForm.isBestseller}
                        onChange={(e) => setProductForm({ ...productForm, isBestseller: e.target.checked })}
                        className="accent-[#D42D51] w-4 h-4 rounded"
                      />
                      <span>★ Bestseller</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer bg-white p-2.5 rounded-xl border border-rose-100 shadow-2xs">
                      <input
                        type="checkbox"
                        checked={productForm.isNewArrival}
                        onChange={(e) => setProductForm({ ...productForm, isNewArrival: e.target.checked })}
                        className="accent-[#D42D51] w-4 h-4 rounded"
                      />
                      <span>✨ New Arrival</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer bg-white p-2.5 rounded-xl border border-rose-100 shadow-2xs">
                      <input
                        type="checkbox"
                        checked={productForm.isTrending}
                        onChange={(e) => setProductForm({ ...productForm, isTrending: e.target.checked })}
                        className="accent-[#D42D51] w-4 h-4 rounded"
                      />
                      <span>🔥 Trending</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer bg-white p-2.5 rounded-xl border border-rose-100 shadow-2xs">
                      <input
                        type="checkbox"
                        checked={productForm.inStock}
                        onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                        className="accent-[#D42D51] w-4 h-4 rounded"
                      />
                      <span>📦 In Stock</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-rose-100 sticky bottom-0 bg-white z-20 py-2">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-2.5 bg-[#D42D51] hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-2 transition-transform active:scale-95"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingProduct ? 'Save Product Changes' : 'Add Product to Store'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
