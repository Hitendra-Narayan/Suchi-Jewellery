import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShippingAddress, PaymentMethod } from '../types';
import { ShieldCheck, Copy, Check, QrCode, CreditCard, Banknote, Sparkles, ArrowLeft, Lock, Smartphone, Tag, AlertCircle, Info } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import upiQrImg from '../assets/images/upi_qr_code_1785776100112.jpg';

export const CheckoutPage: React.FC = () => {
  const { cart, getCartSubtotal, placeOrder, navigateTo, showToast } = useShop();

  // Address form
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: '',
    email: '',
    phone: '',
    addressLine: '',
    apartment: '',
    city: '',
    state: 'Rajasthan',
    pincode: '',
    landmark: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('gpay');
  const [upiRef, setUpiRef] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Promo code state
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>('SUCHI10');

  const subtotal = getCartSubtotal();
  const giftWrapTotal = cart.reduce(
    (acc, item) => acc + (item.giftWrap ? 49 * item.quantity : 0),
    0
  );

  // Calculate promo discount: Strictly 0 if Cash on Delivery
  let promoDiscount = 0;
  if (paymentMethod !== 'cod') {
    if (appliedPromo === 'SUCHI10') {
      promoDiscount = Math.round(subtotal * 0.1);
    } else if (appliedPromo === 'SPARKLE20') {
      promoDiscount = 200;
    }
  }

  const shippingFee = subtotal >= 999 ? 0 : 99;
  const finalTotal = Math.max(0, subtotal - promoDiscount + giftWrapTotal + shippingFee);

  // COD upfront deposit (₹100) and balance
  const isCod = paymentMethod === 'cod';
  const codAdvance = isCod ? Math.min(100, finalTotal) : finalTotal;
  const codBalance = isCod ? Math.max(0, finalTotal - codAdvance) : 0;

  const upiId = '7999599363@yescred';

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    showToast('UPI ID copied to clipboard!');
    setTimeout(() => setCopiedUpi(false), 3000);
  };

  const handleOpenGPay = (amountToPay: number) => {
    const note = isCod ? 'Suchi%20Jewellery%20COD%20Deposit' : 'Suchi%20Jewellery%20Order';
    const upiLink = `upi://pay?pa=${upiId}&pn=Suchi%20Jewellery&am=${amountToPay}&cu=INR&tn=${note}`;
    window.open(upiLink, '_blank');
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (code === 'SUCHI10' || code === 'SPARKLE20') {
      setAppliedPromo(code);
      if (isCod) {
        showToast(`🎉 Coupon "${code}" saved! Note: Coupon discounts apply to prepaid orders only.`, 'info');
      } else {
        showToast(`🎉 Coupon "${code}" applied successfully!`);
      }
      setPromoInput('');
    } else {
      showToast('Invalid Coupon Code. Try SUCHI10 for 10% off.', 'info');
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!address.fullName || !address.email || !address.phone || !address.addressLine || !address.pincode) {
      showToast('Please fill in all required contact and shipping details.', 'info');
      return;
    }

    if (address.phone.length < 10) {
      showToast('Please enter a valid 10-digit mobile phone number.', 'info');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Pass promoCode only if not COD
      placeOrder(address, paymentMethod, isCod ? undefined : (appliedPromo || undefined), upiRef);
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-rose-100 pb-4">
        <div>
          <button
            onClick={() => navigateTo('cart')}
            className="text-xs text-rose-600 font-bold hover:underline flex items-center gap-1 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Bag
          </button>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
            Secure Checkout
          </h1>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
          <Lock className="w-3.5 h-3.5" /> 256-bit Encrypted Checkout
        </div>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left 2 Cols: Customer & Delivery Address + Payment Method */}
        <div className="lg:col-span-2 space-y-8">
          {/* Step 1: Customer Contact & Shipping Address */}
          <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xs space-y-4">
            <h2 className="font-serif font-bold text-lg text-gray-900 flex items-center gap-2 border-b border-rose-50 pb-3">
              <span className="w-6 h-6 bg-rose-500 text-white rounded-full text-xs font-bold flex items-center justify-center">1</span>
              Customer & Shipping Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Sharma"
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-rose-50/30 border border-rose-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="ananya@example.com"
                  value={address.email}
                  onChange={(e) => setAddress({ ...address, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-rose-50/30 border border-rose-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Phone / WhatsApp Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value.replace(/\D/g, '') })}
                  className="w-full px-3.5 py-2.5 text-xs bg-rose-50/30 border border-rose-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Pincode <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="6-digit Pincode"
                  value={address.pincode}
                  onChange={(e) => setAddress({ ...address, pincode: e.target.value.replace(/\D/g, '') })}
                  className="w-full px-3.5 py-2.5 text-xs bg-rose-50/30 border border-rose-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-400"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Flat / House / Street Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="House No, Building, Street name"
                  value={address.addressLine}
                  onChange={(e) => setAddress({ ...address, addressLine: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-rose-50/30 border border-rose-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  required
                  placeholder="City / Town"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-rose-50/30 border border-rose-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">State</label>
                <input
                  type="text"
                  required
                  placeholder="State"
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-rose-50/30 border border-rose-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-400"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1">Landmark (Optional)</label>
                <input
                  type="text"
                  placeholder="Near Park, Temple, or Mall"
                  value={address.landmark}
                  onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-rose-50/30 border border-rose-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-400"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Payment Method Section */}
          <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xs space-y-6">
            <h2 className="font-serif font-bold text-lg text-gray-900 flex items-center gap-2 border-b border-rose-50 pb-3">
              <span className="w-6 h-6 bg-rose-500 text-white rounded-full text-xs font-bold flex items-center justify-center">2</span>
              Payment Option
            </h2>

            {/* Payment Method Selector Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('gpay')}
                className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between space-y-2 cursor-pointer ${
                  paymentMethod === 'gpay' || paymentMethod === 'upi'
                    ? 'border-rose-500 bg-rose-50/50 shadow-xs'
                    : 'border-rose-100 hover:border-rose-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Smartphone className="w-6 h-6 text-emerald-600" />
                  <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    Prepaid Discount
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Google Pay & UPI</h4>
                  <p className="text-[10px] text-gray-500">100% Online • Coupons Valid</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between space-y-2 cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'border-rose-500 bg-rose-50/50 shadow-xs'
                    : 'border-rose-100 hover:border-rose-200'
                }`}
              >
                <CreditCard className="w-6 h-6 text-blue-600" />
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Credit / Debit Card</h4>
                  <p className="text-[10px] text-gray-500">100% Online • Coupons Valid</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between space-y-2 cursor-pointer ${
                  paymentMethod === 'cod'
                    ? 'border-rose-500 bg-rose-50/50 shadow-xs'
                    : 'border-rose-100 hover:border-rose-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Banknote className="w-6 h-6 text-amber-600" />
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                    ₹100 Deposit
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Cash on Delivery</h4>
                  <p className="text-[10px] text-gray-500">Pay ₹100 Now + Rest Cash on Delivery</p>
                </div>
              </button>
            </div>

            {/* Google Pay & UPI Payment Box */}
            {(paymentMethod === 'gpay' || paymentMethod === 'upi') && (
              <div className="bg-gradient-to-br from-rose-50 via-white to-pink-50 p-5 rounded-2xl border border-rose-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-rose-600 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Suchi Official UPI Payment Portal
                  </span>
                  <span className="text-xs font-bold text-gray-900">
                    Pay Amount: <strong className="text-rose-600 text-sm">₹{finalTotal.toLocaleString('en-IN')}</strong>
                  </span>
                </div>

                {/* UPI ID & Copy Box */}
                <div className="bg-white p-3.5 rounded-xl border border-rose-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
                  <div className="text-center sm:text-left">
                    <span className="text-[10px] text-gray-400 font-bold uppercase block">Official Brand UPI ID</span>
                    <span className="font-mono text-sm font-bold text-gray-900">{upiId}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopyUpi}
                      className="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedUpi ? 'Copied!' : 'Copy UPI ID'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenGPay(finalTotal)}
                      className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Open Google Pay</span>
                    </button>
                  </div>
                </div>

                {/* Official UPI Payment Gateway QR Code & Instructions */}
                <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-5 rounded-2xl border border-rose-200 shadow-xs">
                  <div className="p-3 bg-gradient-to-b from-gray-900 to-black rounded-2xl border-2 border-rose-300 text-center shrink-0 shadow-md flex flex-col items-center">
                    <div className="p-2.5 bg-white rounded-xl shadow-inner">
                      <QRCodeSVG
                        value={`upi://pay?pa=${upiId}&pn=Suchi%20Jewellery&am=${finalTotal}&cu=INR&tn=Suchi%20Jewellery%20Order`}
                        size={170}
                        bgColor="#ffffff"
                        fgColor="#000000"
                        level="H"
                        includeMargin={false}
                      />
                    </div>
                    <div className="mt-2 text-center">
                      <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block">
                        Scan & Pay ₹{finalTotal.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[9px] text-gray-300 block font-mono">7999599363@yescred</span>
                    </div>
                  </div>

                  <div className="text-xs space-y-3 text-gray-600 flex-1">
                    <div>
                      <h5 className="font-bold text-gray-900 text-sm flex items-center gap-1.5 mb-1">
                        <QrCode className="w-4 h-4 text-[#D42D51]" />
                        Pay via Google Pay / Paytm / PhonePe / CRED
                      </h5>
                      <p className="text-[11px] text-gray-500">
                        Scan the official Suchi Jewellery QR code above using any UPI app on your smartphone to instantly pay <strong>₹{finalTotal.toLocaleString('en-IN')}</strong>.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap pt-1">
                      <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-[10px] font-bold border border-blue-100">
                        GPay
                      </span>
                      <span className="px-2.5 py-1 bg-sky-50 text-sky-700 rounded-lg text-[10px] font-bold border border-sky-100">
                        Paytm
                      </span>
                      <span className="px-2.5 py-1 bg-purple-50 text-purple-700 rounded-lg text-[10px] font-bold border border-purple-100">
                        PhonePe
                      </span>
                      <span className="px-2.5 py-1 bg-stone-100 text-stone-800 rounded-lg text-[10px] font-bold border border-stone-200">
                        CRED
                      </span>
                      <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-bold border border-emerald-100">
                        BHIM UPI
                      </span>
                    </div>

                    <ol className="list-decimal list-inside space-y-1 text-[11px] text-gray-600 pt-1 border-t border-rose-50">
                      <li>Open any payment app (Google Pay, Paytm, PhonePe, CRED).</li>
                      <li>Scan the QR code or enter UPI ID: <code className="bg-rose-50 px-1.5 py-0.5 font-mono font-bold text-[#D42D51] rounded">{upiId}</code></li>
                      <li>Confirm payment of <strong>₹{finalTotal.toLocaleString('en-IN')}</strong>.</li>
                    </ol>
                  </div>
                </div>

                {/* Optional UTR / Reference Number */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    UPI Transaction Reference / UTR Number (Optional for Instant Auto-Match)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 423456789012"
                    value={upiRef}
                    onChange={(e) => setUpiRef(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-rose-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Card Payment Box */}
            {paymentMethod === 'card' && (
              <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100 space-y-3">
                <p className="text-xs text-gray-600">
                  Enter card details to proceed with 3D Secure OTP verification for <strong>₹{finalTotal.toLocaleString('en-IN')}</strong>.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <input
                      type="text"
                      placeholder="Card Number (4532 •••• •••• 8890)"
                      className="w-full px-3 py-2 text-xs bg-white border border-rose-200 rounded-xl focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="MM / YY"
                      className="w-full px-3 py-2 text-xs bg-white border border-rose-200 rounded-xl focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      maxLength={3}
                      placeholder="CVV"
                      className="w-full px-3 py-2 text-xs bg-white border border-rose-200 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* CASH ON DELIVERY BOX (With Coupon Removal Banner & Upfront ₹100 Payment QR) */}
            {isCod && (
              <div className="bg-gradient-to-br from-amber-50 via-orange-50/30 to-amber-100/50 p-5 rounded-2xl border-2 border-amber-300 space-y-5 text-xs text-amber-950">
                {/* Notice 1: Coupon Removal Warning */}
                {appliedPromo && (
                  <div className="bg-amber-100/80 p-3.5 rounded-xl border border-amber-300 flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-amber-900 text-xs">Coupon Discount Removed for COD</h5>
                      <p className="text-[11px] text-amber-800 leading-relaxed mt-0.5">
                        Promo coupon discounts (such as <strong>"{appliedPromo}"</strong>) are valid only on prepaid orders. Coupon discount has been removed. Switch to Google Pay / Card payment to reactivate your coupon savings!
                      </p>
                    </div>
                  </div>
                )}

                {/* Notice 2: Upfront ₹100 Policy Explanation */}
                <div className="space-y-1 bg-white p-4 rounded-xl border border-amber-200 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
                      <Banknote className="w-4 h-4 text-amber-600" /> Cash on Delivery Terms
                    </h4>
                    <span className="text-[10px] font-extrabold bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full border border-amber-300">
                      ₹100 Upfront Advance
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-relaxed pt-1">
                    To place a Cash on Delivery order and ensure order confirmation, you must pay <strong>₹100 upfront</strong> right now. The remaining balance of <strong>₹{codBalance.toLocaleString('en-IN')}</strong> will be collected in cash by our delivery partner when your Suchi box arrives.
                  </p>
                </div>

                {/* Upfront Deposit Payment Breakdown */}
                <div className="bg-white p-4 rounded-xl border border-amber-200 space-y-2">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Total Order Amount:</span>
                    <span className="font-bold text-gray-900">₹{finalTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-emerald-700 bg-emerald-50/80 p-2 rounded-lg border border-emerald-200">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Pay Upfront Deposit Now (via UPI):
                    </span>
                    <span className="font-mono text-sm">₹{codAdvance}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-amber-900 bg-amber-50/80 p-2 rounded-lg border border-amber-200">
                    <span>Remaining Balance (Pay Cash on Delivery):</span>
                    <span className="font-mono text-sm">₹{codBalance.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* UPI QR Code & GPay Button for Paying the ₹100 Upfront Deposit */}
                <div className="bg-white p-4 rounded-xl border border-amber-200 space-y-4">
                  <h5 className="font-bold text-gray-900 text-xs flex items-center gap-1.5">
                    <QrCode className="w-4 h-4 text-amber-600" /> Scan or Pay ₹{codAdvance} Upfront Deposit via UPI
                  </h5>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="p-2.5 bg-black rounded-2xl border border-amber-300 shrink-0 text-center shadow-xs flex flex-col items-center">
                      <div className="p-2 bg-white rounded-xl shadow-inner">
                        <QRCodeSVG
                          value={`upi://pay?pa=${upiId}&pn=Suchi%20Jewellery&am=${codAdvance}&cu=INR&tn=Suchi%20COD%20Deposit`}
                          size={135}
                          bgColor="#ffffff"
                          fgColor="#000000"
                          level="H"
                          includeMargin={false}
                        />
                      </div>
                      <span className="text-[9px] font-bold text-amber-300 block mt-1 uppercase">
                        Pay ₹{codAdvance} Advance
                      </span>
                    </div>

                    <div className="space-y-2.5 text-xs text-gray-600 flex-1">
                      <p className="text-[11px]">
                        Scan with GPay, PhonePe, Paytm or click below to pay the <strong>₹{codAdvance} deposit</strong> to confirm your COD shipment:
                      </p>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenGPay(codAdvance)}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                        >
                          <Smartphone className="w-4 h-4" />
                          <span>Pay ₹{codAdvance} Deposit on GPay</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleCopyUpi}
                          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                        >
                          {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>Copy UPI ID</span>
                        </button>
                      </div>

                      <p className="text-[10px] text-gray-400 font-mono">
                        Brand UPI: {upiId}
                      </p>
                    </div>
                  </div>

                  {/* UTR Reference input for the ₹100 deposit */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">
                      Enter UPI Reference / UTR Number for ₹{codAdvance} Payment (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 423456789012"
                      value={upiRef}
                      onChange={(e) => setUpiRef(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Order Items Summary & Confirm CTA */}
        <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xs space-y-6">
          <h2 className="font-serif font-bold text-lg text-gray-900 border-b border-rose-50 pb-3">
            Order Review ({cart.length} items)
          </h2>

          {/* Cart items list */}
          <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-xl object-cover bg-rose-50 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-gray-900 truncate">
                    {item.product.name}
                  </h4>
                  <span className="text-[10px] text-gray-500">
                    Qty: {item.quantity} × ₹{item.product.price}
                  </span>
                </div>
                <span className="text-xs font-bold text-gray-900">
                  ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          {/* Promo Code Box */}
          <div className="border-t border-rose-100 pt-4">
            <label className="block text-xs font-bold text-gray-700 mb-1">Apply Coupon Code</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. SUCHI10"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                className="w-full uppercase text-xs px-3 py-2 bg-rose-50/40 border border-rose-200 rounded-xl font-bold focus:outline-none"
              />
              <button
                type="button"
                onClick={handleApplyPromo}
                className="px-3.5 py-2 bg-gray-900 hover:bg-rose-600 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shrink-0"
              >
                Apply
              </button>
            </div>

            {appliedPromo && (
              <div className="mt-1.5 flex items-center justify-between text-[11px]">
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <Tag className="w-3 h-3" /> Coupon "{appliedPromo}" Active
                </span>
                {isCod ? (
                  <span className="text-amber-700 font-bold bg-amber-50 px-1.5 py-0.5 rounded text-[10px]">
                    N/A on COD
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setAppliedPromo(null)}
                    className="text-gray-400 hover:text-rose-600 underline text-[10px]"
                  >
                    Remove
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Price Breakdown */}
          <div className="border-t border-rose-100 pt-4 space-y-2.5 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-bold text-gray-900">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            {/* Coupon discount line */}
            <div className="flex justify-between items-center">
              <span>Coupon Discount</span>
              {isCod ? (
                <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-[10px]">
                  ₹0 (Not Valid on COD)
                </span>
              ) : promoDiscount > 0 ? (
                <span className="font-bold text-emerald-600">- ₹{promoDiscount.toLocaleString('en-IN')}</span>
              ) : (
                <span className="text-gray-400">₹0</span>
              )}
            </div>

            {giftWrapTotal > 0 && (
              <div className="flex justify-between">
                <span>Gift Wrap</span>
                <span className="font-bold text-gray-900">₹{giftWrapTotal}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Express Delivery</span>
              <span className="font-bold text-emerald-600">{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
            </div>

            <div className="border-t border-rose-100 pt-3 flex justify-between items-baseline text-base font-extrabold text-gray-900">
              <span>Total Order Value</span>
              <span className="text-xl text-rose-600">₹{finalTotal.toLocaleString('en-IN')}</span>
            </div>

            {/* COD Upfront vs Balance Breakdown */}
            {isCod && (
              <div className="mt-3 p-3 bg-amber-50 rounded-2xl border border-amber-200 space-y-1.5 text-xs">
                <div className="flex justify-between text-emerald-800 font-bold">
                  <span>Pay Upfront Deposit (Now):</span>
                  <span className="font-mono text-sm">₹{codAdvance}</span>
                </div>
                <div className="flex justify-between text-amber-900 font-bold">
                  <span>Pay Cash on Delivery:</span>
                  <span className="font-mono text-sm">₹{codBalance.toLocaleString('en-IN')}</span>
                </div>
              </div>
            )}
          </div>

          {/* Place Order CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-[#D42D51] hover:bg-[#b02241] text-white font-bold text-xs uppercase tracking-[0.15em] rounded-2xl shadow-xl shadow-rose-200 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="animate-pulse">Processing Order...</span>
            ) : isCod ? (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Pay ₹{codAdvance} Advance & Place COD Order</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Confirm & Pay ₹{finalTotal.toLocaleString('en-IN')}</span>
              </>
            )}
          </button>

          <p className="text-[10px] text-center text-gray-400 font-medium">
            By placing this order, you agree to Suchi Jewellery's terms and 7-day return policy.
          </p>
        </div>
      </form>
    </div>
  );
};
