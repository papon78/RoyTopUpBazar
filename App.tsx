import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ShopProvider, useShop } from './store/context';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import TrackOrder from './pages/TrackOrder';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminPanel from './pages/Admin/AdminPanel';
import { About, Contact, Privacy, Refund, Terms } from './pages/StaticPages';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

// Simple scroll to top component
const ScrollToTopEffect = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Global Notification Component
const ToastNotification = () => {
  const { notification, hideNotification } = useShop();

  if (!notification) return null;

  const bgColors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />
  };

  return (
    <div className="fixed bottom-5 right-5 z-[100] animate-fade-in-up">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg ${bgColors[notification.type]} min-w-[300px]`}>
        {icons[notification.type]}
        <span className="text-sm font-medium flex-grow">{notification.message}</span>
        <button onClick={hideNotification} className="text-gray-400 hover:text-gray-600">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Admin Protected Route
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const { user } = useShop();
   if (!user || user.role !== 'admin') {
      return <Navigate to="/admin/login" replace />;
   }
   return <>{children}</>;
};

// Layout for Public Pages
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
   <>
      <Header />
      <div className="flex-grow relative">
         {children}
      </div>
      <Footer />
   </>
);

const AppContent = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ScrollToTopEffect />
      <Routes>
          {/* Admin Routes (No Header/Footer) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminRoute><AdminPanel /></AdminRoute>} />
          
          {/* Public Routes */}
          <Route path="/*" element={
             <PublicLayout>
                <Routes>
                   <Route path="/" element={<Home />} />
                   <Route path="/product/:id" element={<ProductDetails />} />
                   <Route path="/checkout" element={<Checkout />} />
                   <Route path="/orders" element={<OrderHistory />} />
                   <Route path="/track-order" element={<TrackOrder />} />
                   <Route path="/login" element={<Login />} />
                   <Route path="/forgot-password" element={<ForgotPassword />} />
                   <Route path="/profile" element={<Profile />} />
                   
                   {/* Static Pages */}
                   <Route path="/about" element={<About />} />
                   <Route path="/terms" element={<Terms />} />
                   <Route path="/privacy" element={<Privacy />} />
                   <Route path="/refund" element={<Refund />} />
                   <Route path="/contact" element={<Contact />} />
                </Routes>
             </PublicLayout>
          } />
      </Routes>
      <ToastNotification />
    </div>
  );
}

function App() {
  return (
    <ShopProvider>
      <Router>
        <AppContent />
      </Router>
    </ShopProvider>
  );
}

export default App;