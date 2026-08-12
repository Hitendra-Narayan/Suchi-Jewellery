import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  User,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  Gift,
  CheckCircle2,
  Heart,
  KeyRound,
  LogIn
} from 'lucide-react';
import { Logo } from '../components/Logo';

export const LoginPage: React.FC = () => {
  const { loginUser, loginWithGoogle, loginWithEmail, registerWithEmail, navigateTo } = useShop();

  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sign In Form State
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Register Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
      navigateTo('profile');
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInEmail.trim()) {
      alert('Please enter your email address');
      return;
    }
    setIsLoading(true);
    try {
      if (signInPassword.trim()) {
        await loginWithEmail(signInEmail.trim(), signInPassword.trim());
      } else {
        const nameFromEmail = signInEmail.split('@')[0];
        const formattedName = nameFromEmail ? nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1) : 'Valued Customer';
        loginUser({
          name: formattedName,
          email: signInEmail.trim(),
        });
      }
      navigateTo('profile');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim()) {
      alert('Please fill in your name and email');
      return;
    }
    setIsLoading(true);
    try {
      if (regPassword.trim()) {
        await registerWithEmail(regEmail.trim(), regPassword.trim(), regName.trim(), regPhone.trim());
      } else {
        loginUser({
          name: regName.trim(),
          email: regEmail.trim(),
          phone: regPhone.trim() || '+91 98765 43210',
        });
      }
      navigateTo('profile');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    loginUser({
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      phone: '+91 98765 43210',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    });
    navigateTo('profile');
  };

  return (
    <div className="min-h-[85vh] py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex items-center justify-center">
      <div className="w-full bg-white rounded-3xl border border-[#FDE7EF] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Side: Brand Benefits Showcase */}
        <div className="lg:col-span-5 bg-gradient-to-br from-stone-900 via-rose-950 to-stone-900 text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Decorative Backdrop Elements */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-[#F7AFC4]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="inline-block bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[11px] font-bold text-amber-300 tracking-wider uppercase">
              👑 Suchi VIP Privilege Club
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-white leading-tight">
                Crafted to Make You Happy
              </h2>
              <p className="text-xs text-rose-200/80 mt-2 leading-relaxed">
                Log in to track your royal jewellery orders, manage saved addresses, unlock exclusive member coupons & earn reward points.
              </p>
            </div>

            {/* Feature Highlights with Icons */}
            <div className="space-y-4 pt-4 border-t border-rose-900/40">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-400/30 flex items-center justify-center shrink-0 text-amber-300">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-stone-100">Express Insured Delivery</h4>
                  <p className="text-[11px] text-stone-400">Free PAN-India shipping with real-time tracking on all orders above ₹999.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-400/30 flex items-center justify-center shrink-0 text-amber-300">
                  <Gift className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-stone-100">Loyalty Cashback Points</h4>
                  <p className="text-[11px] text-stone-400">Earn 5% points on every purchase redeemable for instant checkout discounts.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-400/30 flex items-center justify-center shrink-0 text-amber-300">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-stone-100">100% Anti-Tarnish Guarantee</h4>
                  <p className="text-[11px] text-stone-400">Skin-friendly artificial jewellery with protective daily wear clear seal.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Testimonial Snippet */}
          <div className="relative z-10 pt-8 mt-6 border-t border-rose-900/40 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-amber-400/40 overflow-hidden shrink-0">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                alt="Customer Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-[11px] italic text-rose-100/90">"The daily wear pendant set is super lightweight and anti-tarnish! Love it."</p>
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block mt-0.5">— Priya S., Verified Buyer</span>
            </div>
          </div>
        </div>

        {/* Right Side: Login / Register Form */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
          <div className="space-y-6">
            
            {/* Header Brand & Mode Tabs */}
            <div className="flex items-center justify-between flex-wrap gap-4 border-b border-rose-100 pb-4">
              <div className="cursor-pointer" onClick={() => navigateTo('home')}>
                <Logo size="sm" />
              </div>

              {/* Mode Toggle Pills */}
              <div className="bg-rose-50 p-1 rounded-xl border border-rose-200 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    mode === 'signin'
                      ? 'bg-[#D42D51] text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5" /> Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    mode === 'register'
                      ? 'bg-[#D42D51] text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <User className="w-3.5 h-3.5" /> Create Account
                </button>
              </div>
            </div>

            {/* Sign In Form */}
            {mode === 'signin' ? (
              <form onSubmit={handleSignIn} className="space-y-5">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900">Welcome Back</h3>
                  <p className="text-xs text-gray-500 mt-1">Please enter your account details to continue.</p>
                </div>

                {/* Email Input */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-rose-50/30 border border-rose-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D42D51]"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => alert('Password reset link sent to your email!')}
                      className="text-[11px] font-semibold text-[#D42D51] hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 bg-rose-50/30 border border-rose-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D42D51]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Sign In Button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-[#D42D51] hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-[0.99]"
                >
                  <span>Sign In to Your Account</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              /* Register / Create Account Form */
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900">Create New Account</h3>
                  <p className="text-xs text-gray-500 mt-1">Join the Suchi family and get 10% off your first order!</p>
                </div>

                {/* Full Name */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya Roy"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-rose-50/30 border border-rose-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D42D51]"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="ananya@example.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-rose-50/30 border border-rose-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D42D51]"
                    />
                  </div>
                </div>

                {/* Phone & Password Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Mobile Phone
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-rose-50/30 border border-rose-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D42D51]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Create Password *
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        className="w-full pl-10 pr-10 py-2.5 bg-rose-50/30 border border-rose-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D42D51]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="accent-[#D42D51] w-4 h-4 rounded"
                  />
                  <span>I agree to Suchi Terms of Service & Privacy Policy</span>
                </label>

                {/* Submit Register Button */}
                <button
                  type="submit"
                  disabled={!agreeTerms}
                  className="w-full py-3 bg-[#D42D51] hover:bg-rose-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-[0.99]"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Register & Join VIP Club</span>
                </button>
              </form>
            )}

            {/* Quick Demo One-Click Login Button */}
            <div className="pt-4 border-t border-rose-100 space-y-3">
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <span className="relative bg-white px-3 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                  Quick Access Demo
                </span>
              </div>

              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full py-2.5 bg-amber-50 hover:bg-amber-100/80 text-amber-900 border border-amber-200/80 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-2xs"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>One-Click Login as Demo Customer (Priya Sharma)</span>
              </button>

              {/* Admin Panel Access Button */}
              <button
                type="button"
                onClick={() => navigateTo('admin-login')}
                className="w-full py-2.5 bg-stone-900 hover:bg-black text-rose-100 border border-stone-800 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-rose-400" />
                <span>Admin Panel Login</span>
              </button>
            </div>
          </div>

          <div className="pt-6 text-center text-[11px] text-gray-400">
            Protected by SSL Encryption • 100% Authentic Handcrafted Jewellery
          </div>
        </div>

      </div>
    </div>
  );
};
