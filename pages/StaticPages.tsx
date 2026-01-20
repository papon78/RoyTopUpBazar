import React from 'react';
import { useParams } from 'react-router-dom';
import { Shield, FileText, Phone, RotateCcw } from 'lucide-react';
import { BKASH_NUMBER, NAGAD_NUMBER } from '../types';

const PageLayout: React.FC<{ title: string, icon: React.ReactNode, children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="container mx-auto px-4 py-12 md:py-16">
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border p-8">
      <div className="flex items-center gap-3 mb-6 pb-6 border-b">
        <div className="p-3 bg-orange-50 rounded-lg text-primary">{icon}</div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h1>
      </div>
      <div className="prose prose-orange text-gray-600 leading-relaxed">
        {children}
      </div>
    </div>
  </div>
);

export const About: React.FC = () => (
  <PageLayout title="About Us" icon={<Shield className="w-8 h-8"/>}>
    <p>Welcome to <strong>RoyTopUp Bazar</strong>, the leading digital services platform in Bangladesh. Established with the vision of empowering gamers, we provide a seamless, secure, and instant top-up experience for your favorite games.</p>
    <p>We connect you directly to the games you love like Free Fire, PUBG Mobile, Mobile Legends, and more. Our platform is built on trust, speed, and reliability.</p>
    <h3 className="text-lg font-bold text-gray-800 mt-4">Why Choose Us?</h3>
    <ul className="list-disc pl-5 space-y-2 mt-2">
      <li><strong>Instant Delivery:</strong> Our automated systems ensure your account is credited within seconds.</li>
      <li><strong>Secure Payments:</strong> We use official local payment methods like Bkash and Nagad securely.</li>
      <li><strong>24/7 Support:</strong> Our dedicated team is always ready to assist you.</li>
    </ul>
  </PageLayout>
);

export const Terms: React.FC = () => (
  <PageLayout title="Terms & Conditions" icon={<FileText className="w-8 h-8"/>}>
    <p>By using RoyTopUp Bazar, you agree to the following terms:</p>
    <ol className="list-decimal pl-5 space-y-2 mt-4">
      <li><strong>Account Responsibility:</strong> You are responsible for providing the correct Player ID. We are not liable for top-ups sent to wrong IDs due to user error.</li>
      <li><strong>Payment:</strong> All payments must be completed before the order is processed. Fraudulent transactions will be reported.</li>
      <li><strong>Pricing:</strong> Prices are subject to change without notice based on currency fluctuations and supplier costs.</li>
      <li><strong>Delivery Time:</strong> While most orders are instant, some may take up to 30 minutes during server maintenance.</li>
    </ol>
  </PageLayout>
);

export const Privacy: React.FC = () => (
  <PageLayout title="Privacy Policy" icon={<Shield className="w-8 h-8"/>}>
    <p>Your privacy is important to us. This policy outlines how we handle your data:</p>
    <p className="mt-4"><strong>Data Collection:</strong> We collect only necessary information such as your Email (optional), Phone Number (for order tracking), and Game ID to process your orders.</p>
    <p><strong>Data Usage:</strong> We do not share your personal information with third parties. Your data is used solely for processing orders and improving our service.</p>
  </PageLayout>
);

export const Refund: React.FC = () => (
  <PageLayout title="Refund Policy" icon={<RotateCcw className="w-8 h-8"/>}>
    <p>We strive for 100% customer satisfaction. However, due to the nature of digital goods, refunds are limited:</p>
    <ul className="list-disc pl-5 space-y-2 mt-4">
      <li><strong>Eligible Refunds:</strong> If we fail to deliver the product within 24 hours of payment verification.</li>
      <li><strong>Non-Eligible Refunds:</strong> If you provided the wrong Player ID or Region. Once a digital code is sent or ID is topped up, it cannot be reversed.</li>
      <li><strong>Processing:</strong> Refunds are processed to the original payment method within 3-5 business days.</li>
    </ul>
  </PageLayout>
);

export const Contact: React.FC = () => (
  <PageLayout title="Contact Support" icon={<Phone className="w-8 h-8"/>}>
    <p>Need help? Our support team is available from 10:00 AM to 11:00 PM everyday.</p>
    
    <div className="grid md:grid-cols-2 gap-6 mt-8">
      <div className="bg-gray-50 p-6 rounded-xl border">
        <h3 className="font-bold text-gray-800 mb-2">Phone Support</h3>
        <p className="text-primary font-bold text-xl">+88{BKASH_NUMBER}</p>
        <p className="text-sm text-gray-500 mt-1">Call for urgent issues.</p>
      </div>
      <div className="bg-gray-50 p-6 rounded-xl border">
        <h3 className="font-bold text-gray-800 mb-2">WhatsApp / Telegram</h3>
        <p className="text-primary font-bold text-xl">+88{NAGAD_NUMBER}</p>
        <p className="text-sm text-gray-500 mt-1">Message us for order screenshots.</p>
      </div>
    </div>

    <div className="mt-8">
       <h3 className="font-bold text-gray-800 mb-4">Send us a message</h3>
       <form className="space-y-4">
         <div className="grid grid-cols-2 gap-4">
           <input type="text" placeholder="Your Name" className="w-full p-3 border rounded-lg" />
           <input type="email" placeholder="Your Email" className="w-full p-3 border rounded-lg" />
         </div>
         <textarea placeholder="How can we help?" rows={4} className="w-full p-3 border rounded-lg"></textarea>
         <button className="px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-orange-600 transition">Send Message</button>
       </form>
    </div>
  </PageLayout>
);
