import React from 'react';
import { useShop } from '../store/context';
import ProductCard from '../components/ProductCard';
import { ShieldCheck, Zap, Headphones, Gift, Megaphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { products, siteNotice } = useShop();

  return (
    <main>
      {/* Notice Board Banner */}
      {siteNotice && (
         <div className="bg-secondary text-white py-2 overflow-hidden relative">
            <div className="container mx-auto px-4 flex items-center gap-3">
               <Megaphone className="w-5 h-5 text-primary shrink-0 animate-pulse" />
               <div className="whitespace-nowrap overflow-hidden w-full">
                  <span className="inline-block animate-marquee">{siteNotice}</span>
               </div>
            </div>
            <style>{`
               @keyframes marquee {
                  0% { transform: translateX(100%); }
                  100% { transform: translateX(-100%); }
               }
               .animate-marquee {
                  animation: marquee 20s linear infinite;
                  padding-left: 100%;
               }
            `}</style>
         </div>
      )}

      {/* Professional Hero Section */}
      <section className="bg-gradient-to-br from-secondary via-[#242442] to-primary/20 text-white py-16 md:py-24 relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="md:w-1/2 space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-primary font-semibold text-sm tracking-wide shadow-lg">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              TRUSTED BY 100K+ GAMERS
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.15] tracking-tight">
              Level Up Your Game <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-300">Instantly</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-lg leading-relaxed">
              The fastest way to buy game credits, vouchers, and gift cards. 
              Secure automated delivery via Bkash and Nagad.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a href="#featured" className="px-8 py-3.5 bg-primary hover:bg-orange-600 rounded-lg font-bold text-white transition shadow-lg shadow-orange-500/30 transform hover:-translate-y-1">
                Start Top Up
              </a>
              <Link to="/orders" className="px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-sm rounded-lg font-bold text-white transition transform hover:-translate-y-1">
                Track Order
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center relative">
             <div className="relative z-10 bg-gradient-to-b from-gray-800 to-gray-900 p-2 rounded-2xl shadow-2xl border border-gray-700 transform rotate-1 hover:rotate-0 transition duration-500">
               <img 
                 src="https://placehold.co/600x400/1a1a2e/FFF/png?text=RoyTopUp+Bazar&font=montserrat" 
                 alt="Hero Banner" 
                 className="rounded-xl shadow-inner w-full max-w-md object-cover"
               />
             </div>
             {/* Decorative element behind image */}
             <div className="absolute -inset-4 bg-primary/30 rounded-full blur-xl -z-10"></div>
          </div>
        </div>
      </section>

      {/* Feature Strip */}
      <section className="bg-white py-10 shadow-sm border-b relative z-20 -mt-8 mx-4 md:mx-auto max-w-6xl rounded-xl">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-6 text-center">
            <div className="flex flex-col items-center gap-2 group">
               <div className="w-12 h-12 bg-orange-50 text-primary rounded-full flex items-center justify-center group-hover:scale-110 transition">
                  <Zap className="w-6 h-6" />
               </div>
               <div>
                 <h4 className="font-bold text-gray-800">Instant Delivery</h4>
                 <p className="text-xs text-gray-500">Automated system</p>
               </div>
            </div>
            <div className="flex flex-col items-center gap-2 group">
               <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                  <ShieldCheck className="w-6 h-6" />
               </div>
               <div>
                 <h4 className="font-bold text-gray-800">100% Secure</h4>
                 <p className="text-xs text-gray-500">Official Channels</p>
               </div>
            </div>
             <div className="flex flex-col items-center gap-2 group">
               <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                  <Headphones className="w-6 h-6" />
               </div>
               <div>
                 <h4 className="font-bold text-gray-800">24/7 Support</h4>
                 <p className="text-xs text-gray-500">Live Chat Help</p>
               </div>
            </div>
             <div className="flex flex-col items-center gap-2 group">
               <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                  <Gift className="w-6 h-6" />
               </div>
               <div>
                 <h4 className="font-bold text-gray-800">Best Prices</h4>
                 <p className="text-xs text-gray-500">Cheap Rates</p>
               </div>
            </div>
         </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="py-20 container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <span className="text-primary font-bold tracking-wider text-sm uppercase">Choose your game</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mt-1">Popular Top-Ups</h2>
          </div>
          <a href="#" className="text-primary font-medium hover:text-orange-700 transition">View All Games &rarr;</a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {products.filter(p => p.category === 'Game Topup').map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

       {/* Gift Cards Section */}
       <section className="py-16 bg-gray-100/50 border-t">
         <div className="container mx-auto px-4">
           <div className="mb-10 text-center">
              <span className="text-primary font-bold tracking-wider text-sm uppercase">Digital Vouchers</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mt-1">Gift Cards & Vouchers</h2>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {products.filter(p => p.category === 'Gift Cards').map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
           </div>
         </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-secondary text-white text-center">
        <div className="container mx-auto px-4">
           <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Help with your Order?</h2>
           <p className="text-gray-400 mb-8 max-w-xl mx-auto">Our support team is available from 10AM to 11PM to assist you with any issues regarding top-ups or payments.</p>
           <Link to="/contact" className="px-8 py-3 bg-white text-secondary font-bold rounded-lg hover:bg-gray-200 transition">Contact Support</Link>
        </div>
      </section>
    </main>
  );
};

export default Home;