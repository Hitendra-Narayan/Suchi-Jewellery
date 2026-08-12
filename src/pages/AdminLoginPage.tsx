import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Lock, User, Key, ShieldCheck, ArrowLeft, Eye, EyeOff } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { adminLogin, navigateTo } = useShop();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username || !password) {
      setErrorMsg('Please enter both username and password.');
      return;
    }

    const success = adminLogin(username, password);
    if (success) {
      navigateTo('admin');
    } else {
      setErrorMsg('Invalid Administrator credentials. Please check username & password.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-rose-50/50 via-white to-amber-50/30">
      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl border border-rose-100 shadow-xl space-y-6 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-rose-200/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-amber-200/30 rounded-full blur-2xl pointer-events-none" />

        {/* Back button */}
        <button
          onClick={() => navigateTo('home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#D42D51] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-rose-50 text-[#D42D51] border-2 border-rose-200 rounded-2xl mx-auto flex items-center justify-center shadow-xs">
            <ShieldCheck className="w-9 h-9" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-gray-900">Admin Control Panel</h2>
          <p className="text-xs text-gray-500">
            Sign in to manage product orders, customer queries & store settings.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold text-rose-700 text-center animate-shake">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Admin Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D42D51]/30 focus:border-[#D42D51] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full pl-10 pr-10 py-2.5 text-xs bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D42D51]/30 focus:border-[#D42D51] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#D42D51] hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" /> Sign In to Admin Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};
