import React from 'react';
import { Facebook, Instagram, Phone, Mail, Youtube, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BKASH_NUMBER, NAGAD_NUMBER } from '../types';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-gray-300 pt-16 border-t-4 border-primary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & About */}
          <div>
             <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-primary rounded flex items-center justify-center text-white font-bold text-xl">R</div>
                <div>
                  <span className="block text-xl font-bold text-white leading-none">RoyTopUp</span>
                  <span className="text-xs text-primary font-bold tracking-widest">BAZAR</span>
                </div>
             </div>
             <p className="text-sm leading-relaxed text-gray-400 mb-6">
               Bangladesh's most trusted gateway for gamers. We provide instant top-up for Free Fire, PUBG, and premium gift cards with 100% security guarantee.
             </p>
             <div className="flex gap-3">
               <a href="#" className="w-8 h-8 rounded bg-gray-700 flex items-center justify-center hover:bg-[#1877F2] transition text-white"><Facebook className="w-4 h-4" /></a>
               <a href="#" className="w-8 h-8 rounded bg-gray-700 flex items-center justify-center hover:bg-[#E4405F] transition text-white"><Instagram className="w-4 h-4" /></a>
               <a href="#" className="w-8 h-8 rounded bg-gray-700 flex items-center justify-center hover:bg-[#FF0000] transition text-white"><Youtube className="w-4 h-4" /></a>
             </div>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg border-l-4 border-primary pl-3">Support</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-primary transition flex items-center gap-2"><span className="w-1 h-1 bg-gray-500 rounded-full"></span>About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition flex items-center gap-2"><span className="w-1 h-1 bg-gray-500 rounded-full"></span>Contact Us</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition flex items-center gap-2"><span className="w-1 h-1 bg-gray-500 rounded-full"></span>Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition flex items-center gap-2"><span className="w-1 h-1 bg-gray-500 rounded-full"></span>Privacy Policy</Link></li>
              <li><Link to="/refund" className="hover:text-primary transition flex items-center gap-2"><span className="w-1 h-1 bg-gray-500 rounded-full"></span>Refund Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold mb-6 text-lg border-l-4 border-primary pl-3">Contact Information</h3>
            <div className="grid sm:grid-cols-2 gap-6 text-sm">
              <div className="space-y-4">
                 <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                       <span className="block text-white font-semibold">Head Office:</span>
                       <span className="text-gray-400">Dhaka, Bangladesh</span>
                    </div>
                 </div>
                 <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                       <span className="block text-white font-semibold">Email Us:</span>
                       <a href="mailto:support@roytopupbazar.com" className="text-gray-400 hover:text-primary">support@roytopupbazar.com</a>
                    </div>
                 </div>
                 <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                       <span className="block text-white font-semibold">Helpline (10AM - 11PM):</span>
                       <span className="text-gray-400">+88{BKASH_NUMBER}</span>
                    </div>
                 </div>
              </div>

              <div className="bg-accent/50 p-4 rounded-xl border border-gray-700">
                <h4 className="text-white font-semibold mb-3">Official Payment Numbers</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-secondary rounded border border-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-pink-600 text-white text-[10px] font-bold flex items-center justify-center rounded">bk</div>
                      <span className="text-gray-300">Bkash</span>
                    </div>
                    <span className="font-mono text-primary font-bold">{BKASH_NUMBER}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-secondary rounded border border-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-orange-600 text-white text-[10px] font-bold flex items-center justify-center rounded">ng</div>
                      <span className="text-gray-300">Nagad</span>
                    </div>
                    <span className="font-mono text-primary font-bold">{NAGAD_NUMBER}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 bg-[#121221] -mx-4 px-4 py-6">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
             <p className="text-xs text-gray-500 text-center md:text-left">
               &copy; {new Date().getFullYear()} RoyTopUp Bazar. All rights reserved. | Developed by RoyDev
             </p>
             <div className="flex items-center gap-2">
               <span className="text-xs text-gray-500 mr-2">We Accept:</span>
               <div className="flex gap-2 opacity-70">
                 <div className="h-6 w-10 bg-pink-600 rounded"></div>
                 <div className="h-6 w-10 bg-orange-600 rounded"></div>
                 <div className="h-6 w-10 bg-purple-600 rounded"></div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
