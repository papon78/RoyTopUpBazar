import React, { useState } from 'react';
import { useShop } from '../../store/context';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, ShoppingBag, Users, Package as Box, LogOut, 
  DollarSign, TrendingUp, Search, CheckCircle, XCircle, Clock, 
  Trash2, Edit2, Plus, Ban, Wallet, ChevronRight, Menu, X, Megaphone, Tag 
} from 'lucide-react';
import { Order, Product, User, PromoCode } from '../../types';

// --- Sub-Component: Dashboard Overview ---
const DashboardOverview = () => {
  const { orders, allUsers } = useShop();
  
  const totalSales = orders
    .filter(o => o.status === 'Completed')
    .reduce((acc, curr) => acc + curr.total, 0);
  
  const pendingOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Processing').length;
  const totalUsers = allUsers.length;
  // Estimated profit (assuming 10% margin for demo)
  const estProfit = totalSales * 0.10; 

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <div className="flex justify-between items-start">
              <div>
                 <p className="text-gray-500 text-sm">Total Sales</p>
                 <h3 className="text-2xl font-bold text-gray-800 mt-1">৳ {totalSales.toLocaleString()}</h3>
              </div>
              <div className="p-2 bg-green-50 text-green-600 rounded-lg"><TrendingUp className="w-6 h-6" /></div>
           </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <div className="flex justify-between items-start">
              <div>
                 <p className="text-gray-500 text-sm">Pending Orders</p>
                 <h3 className="text-2xl font-bold text-orange-600 mt-1">{pendingOrders}</h3>
              </div>
              <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Clock className="w-6 h-6" /></div>
           </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <div className="flex justify-between items-start">
              <div>
                 <p className="text-gray-500 text-sm">Total Users</p>
                 <h3 className="text-2xl font-bold text-gray-800 mt-1">{totalUsers}</h3>
              </div>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Users className="w-6 h-6" /></div>
           </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <div className="flex justify-between items-start">
              <div>
                 <p className="text-gray-500 text-sm">Est. Profit</p>
                 <h3 className="text-2xl font-bold text-green-600 mt-1">৳ {estProfit.toLocaleString()}</h3>
              </div>
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><DollarSign className="w-6 h-6" /></div>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-Component: Order Manager ---
const OrderManager = () => {
  const { orders, updateOrderStatus } = useShop();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredOrders = orders.filter(order => {
     const matchesFilter = filter === 'All' || order.status === filter;
     const matchesSearch = order.id.toLowerCase().includes(search.toLowerCase()) || 
                           order.transactionId?.toLowerCase().includes(search.toLowerCase());
     return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
       <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>
          <div className="flex gap-2">
             <input 
               type="text" 
               placeholder="Search Order ID / TrxID" 
               className="px-4 py-2 border rounded-lg text-sm"
               value={search}
               onChange={e => setSearch(e.target.value)}
             />
             <select 
               className="px-4 py-2 border rounded-lg text-sm bg-white"
               value={filter}
               onChange={e => setFilter(e.target.value)}
             >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
             </select>
          </div>
       </div>

       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
          <table className="w-full text-left text-sm">
             <thead className="bg-gray-50 text-gray-500 font-medium border-b">
                <tr>
                   <th className="p-4">Order ID</th>
                   <th className="p-4">Customer/Item</th>
                   <th className="p-4">Payment</th>
                   <th className="p-4">Status</th>
                   <th className="p-4 text-right">Actions</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
                {filteredOrders.map(order => (
                   <tr key={order.id} className="hover:bg-gray-50">
                      <td className="p-4 font-mono font-bold text-gray-700">#{order.id}</td>
                      <td className="p-4">
                         <div className="font-bold text-gray-800">{order.items[0]?.productTitle}</div>
                         <div className="text-xs text-gray-500">{order.items[0]?.optionName}</div>
                         {order.items[0]?.playerId && <div className="text-xs text-blue-600 bg-blue-50 inline-block px-1 rounded mt-1">ID: {order.items[0].playerId}</div>}
                      </td>
                      <td className="p-4">
                         <div className="font-bold">{order.paymentMethod}</div>
                         {order.transactionId && <div className="text-xs font-mono text-gray-500">Trx: {order.transactionId}</div>}
                         <div className="text-xs font-bold text-green-600">৳ {order.total}</div>
                         {order.discountApplied && <div className="text-xs text-red-500">(- ৳{order.discountApplied})</div>}
                      </td>
                      <td className="p-4">
                         <span className={`px-2 py-1 rounded text-xs font-bold ${
                            order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                            order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                         }`}>
                            {order.status}
                         </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                         {order.status !== 'Completed' && (
                            <button onClick={() => updateOrderStatus(order.id, 'Completed')} className="p-2 bg-green-50 text-green-600 rounded hover:bg-green-100" title="Mark Completed"><CheckCircle className="w-4 h-4" /></button>
                         )}
                         {order.status !== 'Cancelled' && (
                            <button onClick={() => updateOrderStatus(order.id, 'Cancelled')} className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100" title="Cancel Order"><XCircle className="w-4 h-4" /></button>
                         )}
                         {order.status === 'Pending' && (
                            <button onClick={() => updateOrderStatus(order.id, 'Processing')} className="p-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100" title="Process"><Clock className="w-4 h-4" /></button>
                         )}
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
          {filteredOrders.length === 0 && <div className="p-8 text-center text-gray-500">No orders found.</div>}
       </div>
    </div>
  );
};

// --- Sub-Component: Product Manager ---
const ProductManager = () => {
   const { products, updateProduct, deleteProduct, addProduct } = useShop();
   const [editingProduct, setEditingProduct] = useState<Product | null>(null);
   const [isAdding, setIsAdding] = useState(false);

   const initialProductState: Product = {
      id: '',
      title: '',
      category: 'Game Topup',
      image: '',
      description: '',
      type: 'player_id',
      options: []
   };

   const [formData, setFormData] = useState<Product>(initialProductState);

   const handleEdit = (product: Product) => {
      setEditingProduct(product);
      setFormData(product);
      setIsAdding(false);
   };

   const handleAddNew = () => {
      setEditingProduct(null);
      setFormData({ ...initialProductState, id: `prod-${Date.now()}` });
      setIsAdding(true);
   };

   const handleSave = (e: React.FormEvent) => {
      e.preventDefault();
      if (isAdding) {
         addProduct(formData);
      } else {
         updateProduct(formData);
      }
      setIsAdding(false);
      setEditingProduct(null);
   };

   const handleOptionChange = (idx: number, field: string, value: any) => {
      const newOptions = [...formData.options];
      newOptions[idx] = { ...newOptions[idx], [field]: value };
      setFormData({ ...formData, options: newOptions });
   };

   const addOption = () => {
      setFormData({
         ...formData,
         options: [...formData.options, { id: `opt-${Date.now()}`, name: 'New Option', price: 0 }]
      });
   };

   const removeOption = (idx: number) => {
      const newOptions = formData.options.filter((_, i) => i !== idx);
      setFormData({ ...formData, options: newOptions });
   };

   if (editingProduct || isAdding) {
      return (
         <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-2xl font-bold mb-6">{isAdding ? 'Add New Product' : 'Edit Product'}</h2>
            <form onSubmit={handleSave} className="space-y-4">
               <div className="grid grid-cols-2 gap-4">
                  <div>
                     <label className="block text-sm font-bold text-gray-700">Title</label>
                     <input type="text" className="w-full border p-2 rounded" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-gray-700">Category</label>
                     <input type="text" className="w-full border p-2 rounded" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                  </div>
                  <div className="col-span-2">
                     <label className="block text-sm font-bold text-gray-700">Image URL</label>
                     <input type="text" className="w-full border p-2 rounded" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
                  </div>
                  <div className="col-span-2">
                     <label className="block text-sm font-bold text-gray-700">Description</label>
                     <textarea className="w-full border p-2 rounded" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                  </div>
                  <div className="col-span-2">
                     <label className="block text-sm font-bold text-gray-700 mb-2">Pricing Options</label>
                     {formData.options.map((opt, idx) => (
                        <div key={idx} className="flex gap-2 mb-2 items-center">
                           <input type="text" placeholder="Name" className="border p-2 rounded flex-grow" value={opt.name} onChange={e => handleOptionChange(idx, 'name', e.target.value)} />
                           <input type="number" placeholder="Price" className="border p-2 rounded w-24" value={opt.price} onChange={e => handleOptionChange(idx, 'price', Number(e.target.value))} />
                           <button type="button" onClick={() => removeOption(idx)} className="text-red-500"><XCircle className="w-5 h-5"/></button>
                        </div>
                     ))}
                     <button type="button" onClick={addOption} className="text-sm text-primary font-bold flex items-center gap-1 mt-2">+ Add Option</button>
                  </div>
               </div>
               <div className="flex gap-4 pt-4">
                  <button type="submit" className="px-6 py-2 bg-primary text-white rounded font-bold">Save Product</button>
                  <button type="button" onClick={() => { setIsAdding(false); setEditingProduct(null); }} className="px-6 py-2 bg-gray-200 text-gray-700 rounded font-bold">Cancel</button>
               </div>
            </form>
         </div>
      );
   }

   return (
      <div className="space-y-6">
         <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Product Management</h2>
            <button onClick={handleAddNew} className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2 font-bold hover:bg-orange-600 transition">
               <Plus className="w-4 h-4" /> Add Product
            </button>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
               <div key={product.id} className="bg-white rounded-xl shadow-sm border p-4 flex gap-4">
                  <img src={product.image} className="w-20 h-20 rounded bg-gray-100 object-cover" alt="" />
                  <div className="flex-1 min-w-0">
                     <h3 className="font-bold text-gray-800 truncate">{product.title}</h3>
                     <p className="text-xs text-gray-500">{product.category}</p>
                     <p className="text-sm font-bold text-primary mt-1">{product.options.length} Variations</p>
                     <div className="flex gap-2 mt-3">
                        <button onClick={() => handleEdit(product)} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded font-bold flex items-center gap-1"><Edit2 className="w-3 h-3" /> Edit</button>
                        <button onClick={() => { if(window.confirm('Delete this product?')) deleteProduct(product.id) }} className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded font-bold flex items-center gap-1"><Trash2 className="w-3 h-3" /> Delete</button>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

// --- Sub-Component: Marketing Manager ---
const MarketingManager = () => {
   const { siteNotice, updateSiteNotice, promoCodes, addPromoCode, deletePromoCode } = useShop();
   const [noticeText, setNoticeText] = useState(siteNotice);
   const [promoForm, setPromoForm] = useState<PromoCode>({
      code: '', type: 'percentage', value: 0, isActive: true, usageCount: 0
   });

   const handleNoticeSave = () => {
      updateSiteNotice(noticeText);
   };

   const handleAddPromo = (e: React.FormEvent) => {
      e.preventDefault();
      addPromoCode(promoForm);
      setPromoForm({ code: '', type: 'percentage', value: 0, isActive: true, usageCount: 0 });
   };

   return (
      <div className="space-y-8">
         <h2 className="text-2xl font-bold text-gray-800">Marketing & Promotions</h2>

         {/* Notice Board Section */}
         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Megaphone className="w-5 h-5 text-primary"/> Global Notice Board</h3>
            <p className="text-sm text-gray-500 mb-2">This message will be displayed at the top of the Home page.</p>
            <textarea 
               className="w-full border p-3 rounded-lg focus:outline-none focus:border-primary"
               rows={3}
               placeholder="Enter announcement text..."
               value={noticeText}
               onChange={e => setNoticeText(e.target.value)}
            />
            <button onClick={handleNoticeSave} className="mt-3 px-6 py-2 bg-primary text-white rounded-lg font-bold hover:bg-orange-600 transition">
               Update Notice
            </button>
         </div>

         {/* Promo Codes Section */}
         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Tag className="w-5 h-5 text-primary"/> Promo Codes</h3>
            
            {/* Add Promo Form */}
            <form onSubmit={handleAddPromo} className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
               <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Code</label>
                  <input required type="text" placeholder="e.g. SUMMER20" className="w-full p-2 border rounded" value={promoForm.code} onChange={e => setPromoForm({...promoForm, code: e.target.value.toUpperCase()})} />
               </div>
               <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Type</label>
                  <select className="w-full p-2 border rounded" value={promoForm.type} onChange={e => setPromoForm({...promoForm, type: e.target.value as any})}>
                     <option value="percentage">Percentage (%)</option>
                     <option value="fixed">Fixed Amount (৳)</option>
                  </select>
               </div>
               <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Value</label>
                  <input required type="number" placeholder="Value" className="w-full p-2 border rounded" value={promoForm.value} onChange={e => setPromoForm({...promoForm, value: Number(e.target.value)})} />
               </div>
               <button type="submit" className="px-4 py-2 bg-green-600 text-white font-bold rounded hover:bg-green-700">Add Promo</button>
            </form>

            {/* Promo List */}
            <div className="overflow-x-auto">
               <table className="w-full text-left text-sm">
                  <thead className="bg-gray-100 text-gray-600">
                     <tr>
                        <th className="p-3">Code</th>
                        <th className="p-3">Discount</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y">
                     {promoCodes.map((promo, idx) => (
                        <tr key={idx}>
                           <td className="p-3 font-mono font-bold text-gray-800">{promo.code}</td>
                           <td className="p-3 font-bold text-green-600">{promo.value} {promo.type === 'percentage' ? '%' : '৳'} OFF</td>
                           <td className="p-3"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">Active</span></td>
                           <td className="p-3 text-right">
                              <button onClick={() => deletePromoCode(promo.code)} className="text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 className="w-4 h-4"/></button>
                           </td>
                        </tr>
                     ))}
                     {promoCodes.length === 0 && <tr><td colSpan={4} className="p-4 text-center text-gray-500">No active promo codes.</td></tr>}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
};

// --- Sub-Component: User Manager ---
const UserManager = () => {
   const { allUsers, updateUserBalance, toggleUserBan } = useShop();
   const [search, setSearch] = useState('');
   
   const [walletModal, setWalletModal] = useState<{ open: boolean, email: string, current: number }>({ open: false, email: '', current: 0 });
   const [amount, setAmount] = useState('');
   const [type, setType] = useState<'credit' | 'debit'>('credit');

   const handleWalletSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!amount) return;
      updateUserBalance(walletModal.email, Number(amount), type);
      setWalletModal({ ...walletModal, open: false });
      setAmount('');
   };

   const filteredUsers = allUsers.filter(u => 
      u.role !== 'admin' && (u.email.includes(search) || u.name.toLowerCase().includes(search.toLowerCase()))
   );

   return (
      <div className="space-y-6">
         <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
            <input 
               type="text" 
               placeholder="Search Users..." 
               className="px-4 py-2 border rounded-lg"
               value={search} 
               onChange={e => setSearch(e.target.value)}
            />
         </div>

         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
            <table className="w-full text-left text-sm">
               <thead className="bg-gray-50 text-gray-500 font-medium border-b">
                  <tr>
                     <th className="p-4">User</th>
                     <th className="p-4">Contact</th>
                     <th className="p-4">Wallet Balance</th>
                     <th className="p-4">Status</th>
                     <th className="p-4 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                  {filteredUsers.map(user => (
                     <tr key={user.email} className="hover:bg-gray-50">
                        <td className="p-4 font-bold text-gray-800">{user.name}</td>
                        <td className="p-4">
                           <div>{user.email}</div>
                           <div className="text-xs text-gray-500">{user.phone}</div>
                        </td>
                        <td className="p-4 font-mono font-bold text-green-600">৳ {user.walletBalance || 0}</td>
                        <td className="p-4">
                           {user.isBanned ? (
                              <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">Banned</span>
                           ) : (
                              <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Active</span>
                           )}
                        </td>
                        <td className="p-4 text-right space-x-2">
                           <button 
                              onClick={() => setWalletModal({ open: true, email: user.email, current: user.walletBalance || 0 })}
                              className="p-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100" 
                              title="Manage Wallet"
                           >
                              <Wallet className="w-4 h-4" />
                           </button>
                           <button 
                              onClick={() => toggleUserBan(user.email)}
                              className={`p-2 rounded ${user.isBanned ? 'bg-gray-200 text-gray-600' : 'bg-red-50 text-red-600 hover:bg-red-100'}`} 
                              title={user.isBanned ? "Unban User" : "Ban User"}
                           >
                              <Ban className="w-4 h-4" />
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>

         {/* Wallet Modal */}
         {walletModal.open && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
               <div className="bg-white rounded-xl p-6 w-full max-w-sm">
                  <h3 className="text-lg font-bold mb-4">Manage Wallet: {walletModal.email}</h3>
                  <p className="mb-4 text-sm text-gray-500">Current Balance: ৳ {walletModal.current}</p>
                  <form onSubmit={handleWalletSubmit} className="space-y-4">
                     <div className="flex gap-2">
                        <button type="button" onClick={() => setType('credit')} className={`flex-1 py-2 rounded font-bold ${type === 'credit' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-50 text-gray-600'}`}>Add (+)</button>
                        <button type="button" onClick={() => setType('debit')} className={`flex-1 py-2 rounded font-bold ${type === 'debit' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-gray-50 text-gray-600'}`}>Deduct (-)</button>
                     </div>
                     <input 
                        type="number" 
                        placeholder="Amount" 
                        className="w-full border p-2 rounded" 
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        required
                     />
                     <div className="flex gap-2">
                        <button type="submit" className="flex-1 bg-primary text-white py-2 rounded font-bold">Update</button>
                        <button type="button" onClick={() => setWalletModal({...walletModal, open: false})} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded font-bold">Cancel</button>
                     </div>
                  </form>
               </div>
            </div>
         )}
      </div>
   );
};

// --- Main Admin Layout ---
const AdminPanel: React.FC = () => {
  const { logout, user } = useShop();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'products' | 'users' | 'marketing'>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Guard clause is handled in App.tsx typically, but safe check here
  if (user?.role !== 'admin') {
     return <div className="p-10 text-center">Access Denied. <button onClick={() => navigate('/')}>Go Home</button></div>;
  }

  const NavItem = ({ id, icon: Icon, label }: { id: typeof activeTab, icon: any, label: string }) => (
     <button 
      onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${activeTab === id ? 'bg-secondary text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'}`}
     >
        <Icon className="w-5 h-5" /> {label}
     </button>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
       {/* Sidebar */}
       <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1A1A2E] text-white transform transition-transform duration-300 md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 flex items-center justify-between">
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-bold">A</div>
                <span className="font-bold text-lg">Admin Panel</span>
             </div>
             <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400"><X className="w-6 h-6"/></button>
          </div>
          <nav className="px-4 space-y-1 mt-4">
             <NavItem id="dashboard" icon={LayoutDashboard} label="Dashboard" />
             <NavItem id="orders" icon={ShoppingBag} label="Orders" />
             <NavItem id="products" icon={Box} label="Products" />
             <NavItem id="users" icon={Users} label="Users" />
             <NavItem id="marketing" icon={Megaphone} label="Marketing" />
          </nav>
          <div className="absolute bottom-6 left-0 w-full px-4">
             <button onClick={() => { logout(); navigate('/admin/login'); }} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-white/5 rounded-lg transition">
                <LogOut className="w-5 h-5" /> Logout
             </button>
          </div>
       </aside>

       {/* Main Content */}
       <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
          <header className="bg-white shadow-sm border-b p-4 flex items-center justify-between sticky top-0 z-40">
             <div className="flex items-center gap-4">
                <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 text-gray-600"><Menu className="w-6 h-6"/></button>
                <h1 className="text-xl font-bold text-gray-800 capitalize">{activeTab}</h1>
             </div>
             <div className="flex items-center gap-4">
                <button onClick={() => navigate('/')} className="text-sm font-bold text-primary hover:underline">View Site</button>
                <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center text-xs font-bold">AD</div>
             </div>
          </header>

          <main className="p-4 md:p-8 flex-1 overflow-y-auto">
             {activeTab === 'dashboard' && <DashboardOverview />}
             {activeTab === 'orders' && <OrderManager />}
             {activeTab === 'products' && <ProductManager />}
             {activeTab === 'users' && <UserManager />}
             {activeTab === 'marketing' && <MarketingManager />}
          </main>
       </div>
    </div>
  );
};

export default AdminPanel;