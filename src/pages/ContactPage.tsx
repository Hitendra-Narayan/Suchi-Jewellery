import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useShop } from '../context/ShopContext';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2, ChevronDown, Sparkles } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast, addContactMessage } = useShop();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      showToast('Please fill in all required contact fields.', 'info');
      return;
    }

    addContactMessage({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
    });

    setSubmitted(true);
    showToast('✨ Thank you! Your message has been sent to Suchi Jewellery Support.');
  };

  const FAQS = [
    {
      q: 'Does Suchi Jewellery artificial jewellery tarnish or turn black?',
      a: 'No! All Suchi Jewellery pieces are crafted using high-grade brass alloy with 18K Rose Gold or 22K Micro Gold plating and treated with an advanced clear lacquer seal to ensure anti-tarnish longevity.'
    },
    {
      q: 'How long does delivery take across India?',
      a: 'Orders are dispatched within 24 hours from Jaipur, Rajasthan. Standard express delivery takes 3 to 5 business days.'
    },
    {
      q: 'How do I pay using Google Pay or UPI ID?',
      a: 'During checkout, select "Google Pay & UPI", scan our QR Code or copy our official UPI ID (7999599363@yescred) or click "Open Google Pay" to pay directly!'
    },
    {
      q: 'What is your 7-day return and exchange policy?',
      a: 'If you receive a damaged or incorrect piece, simply reach out to us on WhatsApp or email within 7 days of delivery for a 100% free replacement or refund.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12"
    >
      {/* Page Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 rounded-3xl p-8 sm:p-12 text-white text-center space-y-3 shadow-md"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-amber-200 bg-white/20 px-3 py-1 rounded-full border border-white/30 inline-flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> Made to Make You Happy
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold">Contact & Support</h1>
        <p className="text-xs sm:text-sm text-rose-100 font-light max-w-xl mx-auto">
          We’re here to assist you with order status, daily wear recommendations, anti-tarnish care tips, or payment assistance.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-white p-6 sm:p-8 rounded-3xl border border-rose-100 shadow-xs space-y-6"
        >
          <h2 className="text-2xl font-serif font-bold text-gray-900 flex items-center gap-2 border-b border-rose-50 pb-4">
            <MessageSquare className="w-6 h-6 text-rose-500" />
            Send Us a Message
          </h2>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-rose-50 border border-rose-200 p-8 rounded-2xl text-center space-y-3"
            >
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="text-xl font-serif font-bold text-gray-900">Message Received!</h3>
              <p className="text-xs text-gray-600 max-w-sm mx-auto">
                Thank you for reaching out, <strong>{formData.name}</strong>. Our customer delight team will get back to your email ({formData.email}) within 2-4 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-full shadow-xs mt-2 cursor-pointer transition-colors"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Meera Rajput"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-rose-50/30 border border-rose-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="meera@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-rose-50/30 border border-rose-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                    className="w-full px-3.5 py-2.5 text-xs bg-rose-50/30 border border-rose-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-rose-50/30 border border-rose-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-400 cursor-pointer"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Order Tracking">Order Tracking & Delivery</option>
                  <option value="UPI Payment Help">UPI / GPay Payment Support</option>
                  <option value="Daily Wear Styling">Daily Wear & Bulk Styling Request</option>
                  <option value="Returns & Exchange">Returns & Exchange</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Your Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can Suchi Jewellery help make you happy today?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-rose-50/30 border border-rose-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Message Now</span>
              </button>
            </form>
          )}
        </motion.div>

        {/* Brand Contact Information & Hours */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-rose-100 shadow-xs space-y-6">
            <h2 className="text-2xl font-serif font-bold text-gray-900 border-b border-rose-50 pb-4">
              Studio & Customer Support
            </h2>

            <div className="space-y-4 text-xs text-gray-700">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-rose-100 text-rose-600 rounded-2xl shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Suchi Jewellery Studio</h4>
                  <p className="text-gray-500 mt-0.5">
                    Plot 42, Pink City Galleria, M.I. Road, Jaipur, Rajasthan - 302001
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-2xl shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Phone & WhatsApp Direct</h4>
                  <p className="text-gray-500 mt-0.5">+91 79995 99363 (Mon - Sat, 10 AM - 7 PM)</p>
                  <a
                    href="https://wa.me/917999599363"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-1 text-emerald-600 font-bold hover:underline"
                  >
                    💬 Chat on WhatsApp Instant Support →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-rose-100 text-rose-600 rounded-2xl shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Email Support</h4>
                  <p className="text-gray-500 mt-0.5">support@suchijewellery.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-amber-100 text-amber-700 rounded-2xl shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Operating Hours</h4>
                  <p className="text-gray-500 mt-0.5">Monday to Saturday: 10:00 AM – 7:00 PM IST</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-rose-100 shadow-xs space-y-4">
            <h3 className="text-lg font-serif font-bold text-gray-900 border-b border-rose-50 pb-3">
              Frequently Asked Questions
            </h3>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="border border-rose-100 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full text-left p-3.5 bg-rose-50/40 hover:bg-rose-50 font-bold text-xs text-gray-800 flex items-center justify-between gap-2 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-rose-500 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {activeFaq === idx && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="p-3.5 text-xs text-gray-600 bg-white border-t border-rose-50 leading-relaxed overflow-hidden"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
