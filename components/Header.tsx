import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, LogOut, Phone, Clock } from 'lucide-react';
import { useShop } from '../store/context';
import { BKASH_NUMBER, NAGAD_NUMBER } from '../types';

const Header: React.FC = () => {
  const { cart, isLoggedIn, user, logout } = useShop();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleUserClick = () => {
    if (isLoggedIn) {
       navigate('/profile');
    } else {
       navigate('/login');
    }
  }

  const handleSearchClick = () => {
    navigate('/track-order');
  }

  return (
    <>
      {/* Top Bar - Professional Touch */}
      <div className="bg-secondary text-gray-300 text-xs py-2 border-b border-gray-700">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-primary" />
              <span>Helpline: +88{BKASH_NUMBER}</span>
            </div>
            <div className="hidden sm:flex items-center gap-1">
              <Clock className="w-3 h-3 text-primary" />
              <span>Support: 10AM - 11PM</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <Link to="/about" className="hover:text-white transition">About Us</Link>
             <Link to="/contact" className="hover:text-white transition">Contact</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:bg-orange-600 transition">R</div>
              <div>
                <h1 className="text-xl font-bold text-secondary leading-none">RoyTopUp</h1>
                <span className="text-xs text-primary font-medium tracking-wider">BAZAR</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8 font-medium text-gray-700">
              <Link to="/" className="hover:text-primary transition">Home</Link>
              <Link to="/" className="hover:text-primary transition">Top Up</Link>
              <Link to="/" className="hover:text-primary transition">Gift Cards</Link>
              <Link to="/track-order" className="hover:text-primary transition">Track Order</Link>
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex relative">
                <input 
                  type="text" 
                  placeholder="Track Order ID..." 
                  className="pl-3 pr-8 py-1.5 rounded-full border border-gray-300 text-sm focus:outline-none focus:border-primary w-48 cursor-pointer"
                  onClick={handleSearchClick}
                  readOnly
                />
                <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <Link to="/checkout" className="relative p-2 hover:bg-gray-100 rounded-full transition">
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button onClick={handleUserClick} className="p-2 hover:bg-gray-100 rounded-full transition relative group">
                <User className="w-6 h-6 text-gray-700" />
                {!isLoggedIn && <span className="absolute -bottom-8 right-0 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10 hidden md:block">Login</span>}
              </button>
              
              {isLoggedIn && (
                 <button onClick={logout} className="p-2 hover:bg-red-50 text-red-500 rounded-full transition" title="Logout">
                    <LogOut className="w-5 h-5" />
                 </button>
              )}

              <button onClick={toggleMenu} className="md:hidden p-2">
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t p-4 flex flex-col gap-4 shadow-lg animate-fade-in-down">
             {isLoggedIn && <div className="text-sm text-gray-500 pb-2">Welcome, <span className="font-bold text-gray-800">{user?.name}</span></div>}
            <Link to="/" onClick={toggleMenu} className="font-medium text-gray-700 hover:text-primary">Home</Link>
            <Link to="/" onClick={toggleMenu} className="font-medium text-gray-700 hover:text-primary">Top Up</Link>
            <Link to="/" onClick={toggleMenu} className="font-medium text-gray-700 hover:text-primary">Gift Cards</Link>
            <Link to="/track-order" onClick={toggleMenu} className="font-medium text-gray-700 hover:text-primary">Track Order</Link>
            <Link to="/profile" onClick={toggleMenu} className="font-medium text-gray-700 hover:text-primary">My Account</Link>
            <hr />
            <Link to="/about" onClick={toggleMenu} className="text-sm text-gray-500 hover:text-primary">About Us</Link>
            <Link to="/contact" onClick={toggleMenu} className="text-sm text-gray-500 hover:text-primary">Contact Support</Link>
            {isLoggedIn ? (
               <button onClick={() => {logout(); toggleMenu();}} className="text-left font-medium text-red-500">Logout</button>
            ) : (
               <Link to="/login" onClick={toggleMenu} className="text-left font-medium text-primary">Login / Register</Link>
            )}
          </div>
        )}
      </header>
    </>
  );
};

export default Header;