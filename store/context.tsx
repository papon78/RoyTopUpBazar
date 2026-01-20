import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Order, Product, User, WalletTransaction, PromoCode } from '../types';
import { products as initialProducts } from '../data/products';

interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ShopContextType {
  // Public
  products: Product[];
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, optionId: string) => void;
  clearCart: () => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  user: User | null;
  isLoggedIn: boolean;
  login: (userData: Omit<User, 'walletBalance' | 'role'>) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  notification: Notification | null;
  showNotification: (message: string, type: 'success' | 'error' | 'info') => void;
  hideNotification: () => void;
  
  // Wallet
  walletTransactions: WalletTransaction[];
  addMoneyToWallet: (amount: number, method: string, trxId: string) => void;
  processWalletPayment: (amount: number, orderId: string) => boolean;

  // Marketing (Public)
  siteNotice: string;
  verifyPromoCode: (code: string) => PromoCode | null;

  // Admin Actions
  isAdmin: boolean;
  adminLogin: (username: string, pass: string) => boolean;
  allUsers: User[];
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addProduct: (product: Product) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updateUserBalance: (email: string, amount: number, type: 'credit' | 'debit') => void;
  toggleUserBan: (email: string) => void;
  // Admin Marketing
  promoCodes: PromoCode[];
  addPromoCode: (promo: PromoCode) => void;
  deletePromoCode: (code: string) => void;
  updateSiteNotice: (notice: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Data States
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]); // Admin needs to see all users
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>([]);
  const [notification, setNotification] = useState<Notification | null>(null);
  
  // Marketing State
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [siteNotice, setSiteNotice] = useState<string>('');

  // Initial Load
  useEffect(() => {
    const loadData = () => {
       const storedProducts = localStorage.getItem('roy_products');
       if (storedProducts) setProducts(JSON.parse(storedProducts));

       const storedOrders = localStorage.getItem('roy_orders');
       if (storedOrders) setOrders(JSON.parse(storedOrders));

       const storedUser = localStorage.getItem('roy_user');
       if (storedUser) setUser(JSON.parse(storedUser));
       
       const storedAllUsers = localStorage.getItem('roy_all_users');
       if (storedAllUsers) setAllUsers(JSON.parse(storedAllUsers));

       const storedCart = localStorage.getItem('roy_cart');
       if (storedCart) setCart(JSON.parse(storedCart));

       const storedWallet = localStorage.getItem('roy_wallet_trx');
       if (storedWallet) setWalletTransactions(JSON.parse(storedWallet));

       const storedPromos = localStorage.getItem('roy_promos');
       if (storedPromos) setPromoCodes(JSON.parse(storedPromos));

       const storedNotice = localStorage.getItem('roy_notice');
       if (storedNotice) setSiteNotice(storedNotice);
    };

    loadData();

    // Listen for storage changes (Sync tabs)
    const handleStorageChange = (e: StorageEvent) => {
       if (e.key === 'roy_products') loadData();
       if (e.key === 'roy_notice') loadData();
       if (e.key === 'roy_promos') loadData();
       if (e.key === 'roy_orders') loadData();
       if (e.key === 'roy_all_users') loadData();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Sync with LocalStorage
  useEffect(() => { localStorage.setItem('roy_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('roy_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('roy_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { 
    if (user) localStorage.setItem('roy_user', JSON.stringify(user)); 
  }, [user]);
  useEffect(() => { localStorage.setItem('roy_wallet_trx', JSON.stringify(walletTransactions)); }, [walletTransactions]);
  useEffect(() => { localStorage.setItem('roy_all_users', JSON.stringify(allUsers)); }, [allUsers]);
  useEffect(() => { localStorage.setItem('roy_promos', JSON.stringify(promoCodes)); }, [promoCodes]);
  useEffect(() => { localStorage.setItem('roy_notice', siteNotice); }, [siteNotice]);


  const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
    setNotification({ id: Date.now(), message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  /* --- Public Actions --- */

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.productId === item.productId && i.optionId === item.optionId && i.playerId === item.playerId
      );
      if (existing) {
        showNotification(`${item.productTitle} quantity updated!`, 'info');
        return prev.map((i) =>
          i.productId === item.productId && i.optionId === item.optionId && i.playerId === item.playerId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      showNotification(`${item.productTitle} added to cart!`, 'success');
      return [...prev, item];
    });
  };

  const removeFromCart = (productId: string, optionId: string) => {
    setCart((prev) => prev.filter((i) => !(i.productId === productId && i.optionId === optionId)));
    showNotification('Item removed from cart', 'info');
  };

  const clearCart = () => setCart([]);

  const addOrder = (order: Order) => {
    // Attach current user email if logged in
    const orderWithUser = { ...order, userId: user?.email };
    setOrders((prev) => [orderWithUser, ...prev]);
    // No auto-processing notification here, let Admin do it.
  };

  const verifyPromoCode = (code: string): PromoCode | null => {
    const promo = promoCodes.find(p => p.code === code && p.isActive);
    return promo || null;
  };

  /* --- User Auth --- */

  const login = (userData: Omit<User, 'walletBalance' | 'role'>) => {
    // Check if user exists in allUsers, otherwise create new
    let currentUser = allUsers.find(u => u.email === userData.email);
    
    if (currentUser) {
       if (currentUser.isBanned) {
          showNotification('This account has been banned by Admin.', 'error');
          return;
       }
       setUser(currentUser);
       showNotification(`Welcome back, ${currentUser.name}!`, 'success');
    } else {
       // Register new user
       const newUser: User = { 
          ...userData, 
          walletBalance: 0, 
          role: 'user', 
          isBanned: false,
          id: `U-${Date.now()}`
       };
       setAllUsers(prev => [...prev, newUser]);
       setUser(newUser);
       showNotification(`Welcome, ${newUser.name}!`, 'success');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('roy_user');
    showNotification('Logged out successfully', 'info');
  };

  const updateUser = (userData: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...userData };
      
      // Also update in allUsers list
      setAllUsers(users => users.map(u => u.email === prev.email ? updated : u));
      
      return updated;
    });
    showNotification('Profile updated successfully', 'success');
  };

  /* --- Wallet Logic --- */
  
  const addMoneyToWallet = (amount: number, method: string, trxId: string) => {
    if (!user) return;
    // In real app, verify TrxID. Here we just request.
    
    const newBalance = (user.walletBalance || 0) + amount;
    const newTrx: WalletTransaction = {
      id: `WTX-${Date.now()}`,
      type: 'credit',
      amount,
      date: new Date().toISOString(),
      description: 'Wallet Top-up',
      method: method,
      status: 'Completed'
    };

    const updatedUser = { ...user, walletBalance: newBalance };
    setUser(updatedUser);
    
    // Update master record
    setAllUsers(users => users.map(u => u.email === user.email ? updatedUser : u));
    setWalletTransactions(prev => [newTrx, ...prev]);
    showNotification(`৳${amount} added to wallet successfully!`, 'success');
  };

  const processWalletPayment = (amount: number, orderId: string): boolean => {
    if (!user) return false;
    if (user.walletBalance < amount) {
      showNotification('Insufficient wallet balance', 'error');
      return false;
    }

    const newBalance = user.walletBalance - amount;
    const newTrx: WalletTransaction = {
      id: `WTX-${Date.now()}`,
      type: 'debit',
      amount,
      date: new Date().toISOString(),
      description: `Payment for Order #${orderId}`,
      method: 'Wallet',
      status: 'Completed'
    };

    const updatedUser = { ...user, walletBalance: newBalance };
    setUser(updatedUser);
    setAllUsers(users => users.map(u => u.email === user.email ? updatedUser : u));
    setWalletTransactions(prev => [newTrx, ...prev]);
    return true;
  };

  /* --- Admin Actions --- */

  const adminLogin = (username: string, pass: string): boolean => {
     if (username === 'RoyTopUpadmin' && pass === 'admin638') {
        const adminUser: User = {
           name: 'Admin',
           email: 'admin@roytopup.com',
           walletBalance: 0,
           role: 'admin'
        };
        setUser(adminUser);
        localStorage.setItem('roy_user', JSON.stringify(adminUser));
        return true;
     }
     return false;
  };

  const updateProduct = (updatedProduct: Product) => {
     setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
     showNotification('Product updated successfully', 'success');
  };

  const addProduct = (newProduct: Product) => {
     setProducts(prev => [...prev, newProduct]);
     showNotification('Product created successfully', 'success');
  };

  const deleteProduct = (id: string) => {
     setProducts(prev => prev.filter(p => p.id !== id));
     showNotification('Product deleted', 'info');
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
     setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
     showNotification(`Order #${orderId} marked as ${status}`, 'success');
  };

  const updateUserBalance = (email: string, amount: number, type: 'credit' | 'debit') => {
     setAllUsers(prev => prev.map(u => {
        if (u.email === email) {
           const newBalance = type === 'credit' ? u.walletBalance + amount : Math.max(0, u.walletBalance - amount);
           // If admin is modifying their own "user view" (unlikely but possible)
           if (user?.email === email) setUser({ ...u, walletBalance: newBalance });
           return { ...u, walletBalance: newBalance };
        }
        return u;
     }));
     showNotification(`User wallet ${type}ed by ৳${amount}`, 'success');
  };

  const toggleUserBan = (email: string) => {
     setAllUsers(prev => prev.map(u => {
        if (u.email === email) {
           const newStatus = !u.isBanned;
           showNotification(`User ${newStatus ? 'Banned' : 'Unbanned'}`, 'info');
           return { ...u, isBanned: newStatus };
        }
        return u;
     }));
  };

  // Marketing
  const addPromoCode = (promo: PromoCode) => {
     setPromoCodes(prev => [...prev, promo]);
     showNotification('Promo Code created', 'success');
  };

  const deletePromoCode = (code: string) => {
     setPromoCodes(prev => prev.filter(p => p.code !== code));
     showNotification('Promo Code deleted', 'info');
  };

  const updateSiteNotice = (notice: string) => {
     setSiteNotice(notice);
     showNotification('Notice Board updated', 'success');
  };

  const hideNotification = () => setNotification(null);

  return (
    <ShopContext.Provider value={{ 
      products,
      cart, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      orders, 
      addOrder, 
      user, 
      isLoggedIn: !!user, 
      isAdmin: user?.role === 'admin',
      adminLogin,
      login, 
      logout,
      updateUser,
      allUsers,
      notification,
      showNotification,
      hideNotification,
      walletTransactions,
      addMoneyToWallet,
      processWalletPayment,
      // Marketing Public
      siteNotice,
      verifyPromoCode,
      // Admin Exports
      updateProduct,
      addProduct,
      deleteProduct,
      updateOrderStatus,
      updateUserBalance,
      toggleUserBan,
      promoCodes,
      addPromoCode,
      deletePromoCode,
      updateSiteNotice
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within a ShopProvider');
  return context;
};