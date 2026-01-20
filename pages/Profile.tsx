import React, { useState } from 'react';
import { useShop } from '../store/context';
import { useNavigate } from 'react-router-dom';
import { 
  User, Package, LogOut, Settings, CreditCard, Camera, Edit2, 
  Clock, CheckCircle, XCircle, Plus, Trash2, Key, Bell, Shield, 
  AlertTriangle, ChevronRight, Wallet, ArrowUpRight, ArrowDownLeft, Copy 
} from 'lucide-react';
import { BKASH_NUMBER, NAGAD_NUMBER } from '../types';

const PaymentIcon: React.FC<{ method?: string }> = ({ method }) => {
  if (method === 'Bkash') {
    return (
      <span className="flex items-center gap-1.5 bg-pink-50 text-pink-700 px-2 py-0.5 rounded border border-pink-100 text-[10px] font-bold uppercase tracking-wider">
         <span className="w-1.5 h-1.5 rounded-full bg-pink-600"></span> Bkash
      </span>
    );
  }
  if (method === 'Nagad') {
    return (
      <span className="flex items-center gap-1.5 bg-orange-50 text-orange-700 px-2 py-0.5 rounded border border-orange-100 text-[10px] font-bold uppercase tracking-wider">
         <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span> Nagad
      </span>
    );
  }
  if (method === 'Wallet') {
     return (
       <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100 text-[10px] font-bold uppercase tracking-wider">
          <Wallet className="w-2.5 h-2.5" /> Wallet
       </span>
     );
   }
  return <span className="text-gray-500 text-xs">{method || 'Unknown'}</span>;
}

const Profile: React.FC = () => {
  const { user, isLoggedIn, logout, orders, updateUser, walletTransactions, addMoneyToWallet, showNotification } = useShop();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wallet' | 'settings'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  
  // Wallet Modal State
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [addAmount, setAddAmount] = useState('');
  const [addMethod, setAddMethod] = useState<'Bkash' | 'Nagad'>('Bkash');
  const [addTrx, setAddTrx] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Forms state
  const [editForm, setEditForm] = useState({
     name: user?.name || '',
     phone: user?.phone || '',
     email: user?.email || '',
  });

  const [passwordForm, setPasswordForm] = useState({
     current: '', new: '', confirm: ''
  });

  const [notifications, setNotifications] = useState({
     email: true,
     sms: true,
     promos: false
  });

  if (!isLoggedIn) {
    navigate('/login');
    return null;
  }

  const handleUpdateProfile = (e: React.FormEvent) => {
     e.preventDefault();
     updateUser(editForm);
     setIsEditing(false);
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Password updated successfully!");
    setPasswordForm({ current: '', new: '', confirm: '' });
  };

  const handleAddMoney = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addAmount || !addTrx) return;
    setIsProcessing(true);
    
    // Simulate API verification
    setTimeout(() => {
       addMoneyToWallet(Number(addAmount), addMethod, addTrx);
       setIsProcessing(false);
       setShowAddMoney(false);
       setAddAmount('');
       setAddTrx('');
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showNotification('Number copied to clipboard!', 'info');
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Completed': return <span className="flex items-center gap-1 text-green-700 bg-green-50 border border-green-100 px-2 py-0.5 rounded text-xs font-bold"><CheckCircle className="w-3 h-3"/> Completed</span>;
      case 'Cancelled': return <span className="flex items-center gap-1 text-red-700 bg-red-50 border border-red-100 px-2 py-0.5 rounded text-xs font-bold"><XCircle className="w-3 h-3"/> Cancelled</span>;
      default: return <span className="flex items-center gap-1 text-yellow-700 bg-yellow-50 border border-yellow-100 px-2 py-0.5 rounded text-xs font-bold"><Clock className="w-3 h-3"/> Pending</span>;
    }
  }

  const TabButton = ({ id, icon: Icon, label }: { id: typeof activeTab, icon: any, label: string }) => (
    <button 
       onClick={() => setActiveTab(id)}
       className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition text-sm font-medium mb-1 ${
         activeTab === id 
           ? 'bg-orange-50 text-primary' 
           : 'text-gray-600 hover:bg-gray-50'
       }`}
    >
       <div className="flex items-center gap-3">
         <Icon className={`w-5 h-5 ${activeTab === id ? 'text-primary' : 'text-gray-400'}`} />
         {label}
       </div>
       {activeTab === id && <ChevronRight className="w-4 h-4 text-primary" />}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
         
         {/* Header / Banner */}
         <div className="bg-secondary rounded-2xl p-6 md:p-10 text-white mb-8 relative overflow-hidden shadow-xl">
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                 <div className="w-24 h-24 rounded-full bg-white/10 border-4 border-white/20 flex items-center justify-center text-4xl font-bold relative backdrop-blur-sm">
                    {user?.name.charAt(0)}
                    <button className="absolute bottom-0 right-0 bg-primary p-2 rounded-full hover:bg-orange-600 transition shadow-lg border-2 border-secondary">
                       <Camera className="w-3 h-3" />
                    </button>
                 </div>
                 <div className="text-center md:text-left">
                    <h1 className="text-3xl font-bold">{user?.name}</h1>
                    <p className="text-gray-400">{user?.email}</p>
                    <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-primary/20 text-primary border border-primary/20">MEMBER</span>
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/20 text-green-400 border border-green-500/20">VERIFIED</span>
                    </div>
                 </div>
                 <div className="md:ml-auto flex gap-3">
                    <div className="bg-white/10 px-6 py-3 rounded-xl text-center backdrop-blur-sm border border-white/5">
                       <span className="block text-2xl font-bold text-primary">{orders.length}</span>
                       <span className="text-xs text-gray-300 uppercase tracking-wider font-semibold">Orders</span>
                    </div>
                    <div className="bg-white/10 px-6 py-3 rounded-xl text-center backdrop-blur-sm border border-white/5">
                       <span className="block text-2xl font-bold text-green-400">৳ {user?.walletBalance || 0}</span>
                       <span className="text-xs text-gray-300 uppercase tracking-wider font-semibold">Wallet</span>
                    </div>
                 </div>
             </div>
         </div>

         <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar Navigation */}
            <div className="lg:w-1/4">
               <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
                  <div className="p-3">
                     <div className="space-y-1">
                        <TabButton id="profile" icon={User} label="My Profile" />
                        <TabButton id="orders" icon={Package} label="Order History" />
                        <TabButton id="wallet" icon={Wallet} label="My Wallet" />
                        <TabButton id="settings" icon={Settings} label="Settings" />
                     </div>
                     <div className="border-t border-gray-100 mt-3 pt-3">
                        <button 
                           onClick={() => { logout(); navigate('/'); }}
                           className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition text-sm font-medium"
                        >
                           <LogOut className="w-5 h-5" /> Sign Out
                        </button>
                     </div>
                  </div>
               </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:w-3/4">
               
               {/* Profile Tab */}
               {activeTab === 'profile' && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 animate-fade-in-up">
                     <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
                        <div>
                          <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
                          <p className="text-sm text-gray-500 mt-1">Manage your personal details</p>
                        </div>
                        {!isEditing && (
                           <button onClick={() => setIsEditing(true)} className="px-4 py-2 rounded-lg bg-gray-50 text-primary text-sm font-bold hover:bg-gray-100 transition flex items-center gap-2 border border-gray-200">
                              <Edit2 className="w-4 h-4" /> Edit Profile
                           </button>
                        )}
                     </div>
                     
                     {isEditing ? (
                        <form onSubmit={handleUpdateProfile} className="space-y-6">
                           <div className="grid md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                 <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                 <input 
                                    type="text" 
                                    value={editForm.name}
                                    onChange={e => setEditForm({...editForm, name: e.target.value})}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition" 
                                 />
                              </div>
                              <div className="space-y-2">
                                 <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                 <input 
                                    type="email" 
                                    value={editForm.email}
                                    onChange={e => setEditForm({...editForm, email: e.target.value})}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition" 
                                 />
                              </div>
                              <div className="space-y-2">
                                 <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                 <input 
                                    type="text" 
                                    value={editForm.phone}
                                    onChange={e => setEditForm({...editForm, phone: e.target.value})}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition" 
                                 />
                              </div>
                           </div>
                           <div className="flex gap-4 pt-4">
                              <button type="submit" className="px-6 py-2.5 bg-primary text-white rounded-lg font-bold hover:bg-orange-600 shadow-lg shadow-orange-500/20 transition">Save Changes</button>
                              <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition">Cancel</button>
                           </div>
                        </form>
                     ) : (
                        <div className="grid md:grid-cols-2 gap-6">
                           <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 group hover:border-primary/30 transition">
                              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider font-semibold">Full Name</label>
                              <p className="font-semibold text-gray-800 text-lg">{user?.name}</p>
                           </div>
                           <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 group hover:border-primary/30 transition">
                              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider font-semibold">Email Address</label>
                              <p className="font-semibold text-gray-800 text-lg">{user?.email}</p>
                           </div>
                           <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 group hover:border-primary/30 transition">
                              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider font-semibold">Phone Number</label>
                              <p className="font-semibold text-gray-800 text-lg">{user?.phone || 'Not provided'}</p>
                           </div>
                           <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 group hover:border-primary/30 transition">
                              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider font-semibold">Account Status</label>
                              <div className="flex items-center gap-2 mt-1">
                                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                 <span className="font-semibold text-green-600">Active Member</span>
                              </div>
                           </div>
                        </div>
                     )}
                  </div>
               )}

               {/* Orders Tab */}
               {activeTab === 'orders' && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 animate-fade-in-up">
                     <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
                        <div>
                           <h2 className="text-xl font-bold text-gray-800">Order History</h2>
                           <p className="text-sm text-gray-500 mt-1">Track and view your recent purchases</p>
                        </div>
                     </div>
                     
                     {orders.length === 0 ? (
                        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                           <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300 shadow-sm border">
                              <Package className="w-10 h-10" />
                           </div>
                           <h3 className="text-lg font-bold text-gray-700">No orders yet</h3>
                           <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
                           <button onClick={() => navigate('/')} className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-orange-600 font-medium transition shadow-lg shadow-orange-500/20">Start Shopping</button>
                        </div>
                     ) : (
                        <div className="space-y-6">
                           {orders.map((order) => (
                              <div key={order.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition duration-300 group">
                                 {/* Card Header */}
                                 <div className="bg-gray-50 px-5 py-4 border-b border-gray-100 flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                       <span className="font-mono font-bold text-gray-700 bg-white px-2 py-0.5 rounded border border-gray-200">#{order.id}</span>
                                       <div className="flex items-center gap-1 text-xs text-gray-500">
                                          <Clock className="w-3.5 h-3.5" />
                                          {new Date(order.date).toLocaleDateString()}
                                       </div>
                                    </div>
                                    {getStatusBadge(order.status)}
                                 </div>

                                 {/* Card Body */}
                                 <div className="p-5">
                                    <div className="space-y-4 mb-5">
                                       {order.items.map((item, idx) => (
                                          <div key={idx} className="flex items-center gap-4">
                                             <div className="w-12 h-12 rounded-lg bg-gray-100 p-0.5 border">
                                                <img src={item.productImage} alt="" className="w-full h-full object-cover rounded-md" />
                                             </div>
                                             <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold text-gray-800 truncate group-hover:text-primary transition">{item.productTitle}</p>
                                                <p className="text-xs text-gray-500 truncate">{item.optionName}</p>
                                             </div>
                                             <div className="text-sm font-bold text-gray-700">৳ {item.price}</div>
                                          </div>
                                       ))}
                                    </div>
                                    
                                    {/* Card Footer Info */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                       <div className="flex items-center gap-4">
                                          <div className="flex items-center gap-2">
                                             <span className="text-xs text-gray-400">Paid via:</span>
                                             <PaymentIcon method={order.paymentMethod} />
                                          </div>
                                          {order.transactionId && (
                                             <>
                                                <span className="text-xs text-gray-300">|</span>
                                                <span className="text-xs text-gray-500 font-mono">Trx: {order.transactionId}</span>
                                             </>
                                          )}
                                       </div>
                                       <div className="text-right">
                                          <span className="text-sm text-gray-400 mr-2">Total:</span>
                                          <span className="text-xl font-bold text-primary">৳ {order.total}</span>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     )}
                  </div>
               )}

               {/* Wallet Tab */}
               {activeTab === 'wallet' && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 animate-fade-in-up">
                     <div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-4 border-b border-gray-100 gap-4">
                        <div>
                           <h2 className="text-xl font-bold text-gray-800">My Wallet</h2>
                           <p className="text-sm text-gray-500 mt-1">Manage your balance and view transactions</p>
                        </div>
                        <button 
                           onClick={() => setShowAddMoney(true)}
                           className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:bg-orange-600 transition flex items-center gap-2 shadow-lg shadow-orange-500/20"
                        >
                           <Plus className="w-4 h-4" /> Add Money
                        </button>
                     </div>
                     
                     {/* Balance Card */}
                     <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 md:p-8 text-white mb-8 relative overflow-hidden shadow-xl">
                        <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
                           <div>
                              <p className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-widest">Available Balance</p>
                              <h3 className="text-4xl md:text-5xl font-bold font-mono">৳ {user?.walletBalance || 0}</h3>
                           </div>
                           <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/10 backdrop-blur-sm">
                              <Wallet className="w-6 h-6" />
                           </div>
                        </div>
                     </div>

                     {/* Transaction History */}
                     <h3 className="font-bold text-gray-800 mb-4 text-lg">Transaction History</h3>
                     <div className="space-y-4">
                        {walletTransactions.length === 0 ? (
                           <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-xl border border-gray-100 border-dashed">
                              <p>No transactions found.</p>
                           </div>
                        ) : (
                           walletTransactions.map((trx) => (
                              <div key={trx.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition">
                                 <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${trx.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                       {trx.type === 'credit' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                                    </div>
                                    <div>
                                       <h4 className="font-bold text-gray-800 text-sm">{trx.description}</h4>
                                       <p className="text-xs text-gray-500 flex items-center gap-1">
                                          {new Date(trx.date).toLocaleDateString()} 
                                          {trx.method && <span className="bg-gray-200 px-1 rounded text-[10px]">{trx.method}</span>}
                                       </p>
                                    </div>
                                 </div>
                                 <div className={`text-right font-mono font-bold ${trx.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                                    {trx.type === 'credit' ? '+' : '-'}৳ {trx.amount}
                                 </div>
                              </div>
                           ))
                        )}
                     </div>
                  </div>
               )}

               {/* Settings Tab */}
               {activeTab === 'settings' && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 animate-fade-in-up">
                     <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
                        <div>
                           <h2 className="text-xl font-bold text-gray-800">Account Settings</h2>
                           <p className="text-sm text-gray-500 mt-1">Manage security and notification preferences</p>
                        </div>
                     </div>

                     <div className="space-y-8">
                        {/* Security Section */}
                        <section>
                           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                              <Key className="w-4 h-4" /> Security
                           </h3>
                           <form onSubmit={handlePasswordChange} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                              <div className="space-y-4">
                                 <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Current Password</label>
                                    <input 
                                       type="password" 
                                       className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-primary text-sm" 
                                       value={passwordForm.current}
                                       onChange={e => setPasswordForm({...passwordForm, current: e.target.value})}
                                    />
                                 </div>
                                 <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                       <label className="block text-sm font-bold text-gray-700 mb-1">New Password</label>
                                       <input 
                                          type="password" 
                                          className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-primary text-sm" 
                                          value={passwordForm.new}
                                          onChange={e => setPasswordForm({...passwordForm, new: e.target.value})}
                                       />
                                    </div>
                                    <div>
                                       <label className="block text-sm font-bold text-gray-700 mb-1">Confirm New Password</label>
                                       <input 
                                          type="password" 
                                          className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-primary text-sm" 
                                          value={passwordForm.confirm}
                                          onChange={e => setPasswordForm({...passwordForm, confirm: e.target.value})}
                                       />
                                    </div>
                                 </div>
                              </div>
                              <div className="mt-4 flex justify-end">
                                 <button type="submit" className="px-4 py-2 bg-secondary text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition">Update Password</button>
                              </div>
                           </form>
                        </section>

                        {/* Notifications Section */}
                        <section>
                           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                              <Bell className="w-4 h-4" /> Notifications
                           </h3>
                           <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                              <div className="p-4 border-b border-gray-100 flex items-center justify-between hover:bg-gray-50 transition">
                                 <div>
                                    <h4 className="font-bold text-gray-800 text-sm">Order Updates</h4>
                                    <p className="text-xs text-gray-500">Receive emails about your order status</p>
                                 </div>
                                 <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                    <input 
                                       type="checkbox" 
                                       name="toggle" 
                                       id="toggle1" 
                                       className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                       checked={notifications.email}
                                       onChange={() => setNotifications({...notifications, email: !notifications.email})}
                                    />
                                    <label htmlFor="toggle1" className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer ${notifications.email ? 'bg-primary' : 'bg-gray-300'}`}></label>
                                 </div>
                              </div>
                              <div className="p-4 border-b border-gray-100 flex items-center justify-between hover:bg-gray-50 transition">
                                 <div>
                                    <h4 className="font-bold text-gray-800 text-sm">SMS Notifications</h4>
                                    <p className="text-xs text-gray-500">Get text messages for instant delivery</p>
                                 </div>
                                 <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                    <input 
                                       type="checkbox" 
                                       name="toggle" 
                                       id="toggle2" 
                                       className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                       checked={notifications.sms}
                                       onChange={() => setNotifications({...notifications, sms: !notifications.sms})}
                                    />
                                    <label htmlFor="toggle2" className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer ${notifications.sms ? 'bg-primary' : 'bg-gray-300'}`}></label>
                                 </div>
                              </div>
                              <div className="p-4 flex items-center justify-between hover:bg-gray-50 transition">
                                 <div>
                                    <h4 className="font-bold text-gray-800 text-sm">Promotional Offers</h4>
                                    <p className="text-xs text-gray-500">Receive emails about new discounts</p>
                                 </div>
                                 <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                    <input 
                                       type="checkbox" 
                                       name="toggle" 
                                       id="toggle3" 
                                       className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                       checked={notifications.promos}
                                       onChange={() => setNotifications({...notifications, promos: !notifications.promos})}
                                    />
                                    <label htmlFor="toggle3" className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer ${notifications.promos ? 'bg-primary' : 'bg-gray-300'}`}></label>
                                 </div>
                              </div>
                           </div>
                        </section>

                        {/* Danger Zone */}
                        <section>
                           <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4" /> Danger Zone
                           </h3>
                           <div className="bg-red-50 rounded-xl p-4 border border-red-100 flex items-center justify-between">
                              <div>
                                 <h4 className="font-bold text-red-800 text-sm">Delete Account</h4>
                                 <p className="text-xs text-red-600 mt-1">Permanently remove your account and all data</p>
                              </div>
                              <button className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg text-sm font-bold hover:bg-red-600 hover:text-white transition">Delete</button>
                           </div>
                        </section>
                     </div>
                  </div>
               )}

            </div>
         </div>
         
         {/* Add Money Modal */}
         {showAddMoney && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
               <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-fade-in-up">
                  <div className="bg-secondary p-4 flex justify-between items-center text-white">
                     <h3 className="font-bold flex items-center gap-2"><Plus className="w-5 h-5 text-primary" /> Add Money to Wallet</h3>
                     <button onClick={() => setShowAddMoney(false)} className="hover:text-gray-300"><XCircle className="w-5 h-5"/></button>
                  </div>
                  <form onSubmit={handleAddMoney} className="p-6">
                     <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">Amount</label>
                        <div className="relative">
                           <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-gray-500">৳</span>
                           <input 
                              required
                              type="number" 
                              min="10"
                              placeholder="0.00"
                              className="w-full pl-8 pr-3 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-primary font-bold text-lg"
                              value={addAmount}
                              onChange={e => setAddAmount(e.target.value)}
                           />
                        </div>
                     </div>

                     <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Select Method</label>
                        <div className="grid grid-cols-2 gap-3">
                           <button 
                             type="button"
                             onClick={() => setAddMethod('Bkash')}
                             className={`p-3 border rounded-xl flex items-center justify-center gap-2 font-bold text-sm transition ${addMethod === 'Bkash' ? 'border-pink-500 bg-pink-50 text-pink-700' : 'border-gray-200 text-gray-600'}`}
                           >
                              Bkash
                           </button>
                           <button 
                             type="button"
                             onClick={() => setAddMethod('Nagad')}
                             className={`p-3 border rounded-xl flex items-center justify-center gap-2 font-bold text-sm transition ${addMethod === 'Nagad' ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 text-gray-600'}`}
                           >
                              Nagad
                           </button>
                        </div>
                     </div>

                     <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300 mb-4 text-center">
                        <p className="text-xs text-gray-500 mb-1">Send money to this number:</p>
                        <div className="flex items-center justify-center gap-2">
                           <span className="font-mono font-bold text-lg text-gray-800">
                              {addMethod === 'Bkash' ? BKASH_NUMBER : NAGAD_NUMBER}
                           </span>
                           <button type="button" onClick={() => copyToClipboard(addMethod === 'Bkash' ? BKASH_NUMBER : NAGAD_NUMBER)} className="text-primary hover:text-orange-700">
                              <Copy className="w-4 h-4" />
                           </button>
                        </div>
                     </div>

                     <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-700 mb-1">Transaction ID</label>
                        <input 
                           required
                           type="text" 
                           placeholder="Enter TrxID"
                           className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-primary"
                           value={addTrx}
                           onChange={e => setAddTrx(e.target.value)}
                        />
                     </div>

                     <button 
                        type="submit" 
                        disabled={isProcessing}
                        className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-500/30 flex justify-center items-center"
                     >
                        {isProcessing ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : 'Verify & Add Balance'}
                     </button>
                  </form>
               </div>
            </div>
         )}
         
         <style>{`
            .toggle-checkbox:checked {
               right: 0;
               border-color: #FF6B00;
            }
            .toggle-checkbox {
               right: 0;
               left: auto;
               transition: all 0.3s;
               border-color: #D1D5DB;
            }
            .toggle-checkbox:checked + .toggle-label {
               background-color: #FF6B00;
            }
         `}</style>
      </div>
    </div>
  );
};

export default Profile;