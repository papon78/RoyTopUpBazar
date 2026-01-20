import React, { useState } from 'react';
import { useShop } from '../store/context';
import { BKASH_NUMBER, NAGAD_NUMBER, Order } from '../types';
import { Trash2, Copy, AlertTriangle, CheckCircle, X, Wallet, ArrowRight, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { cart, removeFromCart, clearCart, addOrder, showNotification, user, processWalletPayment, verifyPromoCode } = useShop();
  const [paymentMethod, setPaymentMethod] = useState<'Bkash' | 'Nagad' | 'Wallet'>('Bkash');
  const [senderPhone, setSenderPhone] = useState('');
  const [trxId, setTrxId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  // Promo State
  const [promoInput, setPromoInput] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  
  const navigate = useNavigate();

  const subTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = Math.max(0, subTotal - appliedDiscount);
  const activeNumber = paymentMethod === 'Bkash' ? BKASH_NUMBER : NAGAD_NUMBER;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showNotification('Number copied to clipboard!', 'info');
  };

  const handleRemoveItem = (productId: string, optionId: string, title: string) => {
     if(window.confirm(`Are you sure you want to remove ${title} from your cart?`)) {
        removeFromCart(productId, optionId);
     }
  };

  const handleApplyPromo = () => {
     if (!promoInput) return;
     const promo = verifyPromoCode(promoInput.toUpperCase());
     
     if (promo) {
        let discount = 0;
        if (promo.type === 'fixed') {
           discount = promo.value;
        } else {
           discount = Math.round((subTotal * promo.value) / 100);
        }
        setAppliedDiscount(discount);
        setIsPromoApplied(true);
        showNotification(`Promo code applied! You saved ৳${discount}`, 'success');
     } else {
        showNotification('Invalid or expired promo code', 'error');
        setAppliedDiscount(0);
        setIsPromoApplied(false);
     }
  };

  const handleInitiateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === 'Wallet') {
       if (!user) {
          showNotification('Please login to use wallet', 'error');
          navigate('/login');
          return;
       }
       if ((user.walletBalance || 0) < total) {
          showNotification('Insufficient wallet balance. Please add money.', 'error');
          return;
       }
    } else {
       if (!senderPhone || !trxId) {
         showNotification('Please fill in all payment details.', 'error');
         return;
       }
    }
    // Show confirmation modal instead of immediate submit
    setShowConfirmModal(true);
  };

  const handleFinalizeOrder = () => {
    setIsProcessing(true);
    setShowConfirmModal(false);

    // Simulate API delay
    setTimeout(() => {
      const orderId = `ORD-${Math.floor(Math.random() * 100000)}`;
      
      // If Wallet payment, process deduction
      if (paymentMethod === 'Wallet') {
         const success = processWalletPayment(total, orderId);
         if (!success) {
            setIsProcessing(false);
            return;
         }
      }

      const newOrder: Order = {
        id: orderId,
        date: new Date().toISOString(),
        items: [...cart],
        total: total,
        status: paymentMethod === 'Wallet' ? 'Processing' : 'Pending', // Wallet orders are typically auto-processed
        paymentMethod,
        paymentPhone: paymentMethod === 'Wallet' ? undefined : senderPhone,
        transactionId: paymentMethod === 'Wallet' ? undefined : trxId,
        discountApplied: appliedDiscount > 0 ? appliedDiscount : undefined
      };

      addOrder(newOrder);
      clearCart();
      setIsProcessing(false);
      showNotification('Order placed successfully!', 'success');
      navigate('/orders');
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Add some game credits to get started.</p>
        <button onClick={() => navigate('/')} className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-orange-600 transition">Go to Home</button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <h1 className="text-2xl font-bold text-secondary mb-8">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Order Summary */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Order Summary</h3>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={`${item.productId}-${item.optionId}`} className="flex items-start gap-4 pb-4 border-b last:border-0">
                  <img src={item.productImage} alt={item.productTitle} className="w-16 h-16 rounded-lg object-cover bg-gray-100" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{item.productTitle}</h4>
                    <p className="text-sm text-gray-500">{item.optionName}</p>
                    {item.playerId && <p className="text-xs text-gray-400 mt-1">Player ID: {item.playerId}</p>}
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-800">৳ {item.price}</div>
                    <button 
                      onClick={() => handleRemoveItem(item.productId, item.optionId, item.productTitle)}
                      className="text-xs text-red-500 hover:text-red-700 mt-2 flex items-center gap-1 justify-end transition"
                    >
                      <Trash2 className="w-3 h-3" /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code Input */}
            <div className="mt-6 pt-6 border-t">
               <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Promo Code</label>
               <div className="flex gap-2">
                  <input 
                     type="text" 
                     placeholder="Enter Code"
                     className="flex-grow p-2 border rounded-lg uppercase"
                     value={promoInput}
                     onChange={e => setPromoInput(e.target.value)}
                     disabled={isPromoApplied}
                  />
                  <button 
                     onClick={handleApplyPromo}
                     disabled={isPromoApplied}
                     className={`px-4 py-2 rounded-lg font-bold text-sm transition ${isPromoApplied ? 'bg-gray-200 text-gray-500' : 'bg-secondary text-white hover:bg-gray-800'}`}
                  >
                     {isPromoApplied ? 'Applied' : 'Apply'}
                  </button>
               </div>
            </div>

            <div className="mt-6 pt-4 border-t space-y-2">
               <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span>৳ {subTotal}</span>
               </div>
               {isPromoApplied && (
                  <div className="flex justify-between items-center text-sm text-green-600 font-bold">
                     <span className="flex items-center gap-1"><Tag className="w-3 h-3"/> Discount</span>
                     <span>- ৳ {appliedDiscount}</span>
                  </div>
               )}
               <div className="flex justify-between items-center pt-2 border-t mt-2">
                  <span className="font-bold text-gray-700">Total Payable</span>
                  <span className="text-2xl font-bold text-primary">৳ {total}</span>
               </div>
            </div>
          </div>
        </div>

        {/* Payment Gateway Mockup */}
        <div className="lg:w-1/2">
           <form onSubmit={handleInitiateOrder} className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="font-bold text-lg mb-6 text-gray-800">Select Payment Method</h3>
              
              <div className="grid grid-cols-3 gap-3 mb-8">
                 <button 
                   type="button"
                   onClick={() => setPaymentMethod('Bkash')}
                   className={`p-3 border-2 rounded-xl flex flex-col items-center gap-1 transition ${paymentMethod === 'Bkash' ? 'border-pink-500 bg-pink-50' : 'border-gray-200 hover:border-pink-300'}`}
                 >
                   <div className="font-bold text-pink-600 text-sm">Bkash</div>
                 </button>
                 <button 
                   type="button"
                   onClick={() => setPaymentMethod('Nagad')}
                   className={`p-3 border-2 rounded-xl flex flex-col items-center gap-1 transition ${paymentMethod === 'Nagad' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`}
                 >
                   <div className="font-bold text-orange-600 text-sm">Nagad</div>
                 </button>
                 <button 
                   type="button"
                   onClick={() => setPaymentMethod('Wallet')}
                   className={`p-3 border-2 rounded-xl flex flex-col items-center gap-1 transition ${paymentMethod === 'Wallet' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                 >
                   <div className="font-bold text-blue-600 text-sm">My Wallet</div>
                 </button>
              </div>

              {/* Wallet Logic */}
              {paymentMethod === 'Wallet' ? (
                 <div className="bg-blue-50 rounded-xl p-5 border border-blue-100 mb-6">
                    <div className="flex justify-between items-center mb-4">
                       <div className="flex items-center gap-2 text-blue-800 font-bold">
                          <Wallet className="w-5 h-5" /> Wallet Balance
                       </div>
                       <div className="font-mono text-xl font-bold text-blue-900">
                          ৳ {user?.walletBalance || 0}
                       </div>
                    </div>
                    
                    {(user?.walletBalance || 0) < total ? (
                       <div className="flex flex-col gap-3">
                          <div className="bg-red-100 text-red-700 text-sm p-3 rounded-lg flex items-center gap-2">
                             <AlertTriangle className="w-4 h-4" /> Insufficient Balance
                          </div>
                          <button 
                             type="button" 
                             onClick={() => navigate('/profile')} 
                             className="w-full py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition"
                          >
                             Add Money to Wallet
                          </button>
                       </div>
                    ) : (
                       <div className="text-sm text-green-700 flex items-center gap-2 bg-green-100 p-3 rounded-lg">
                          <CheckCircle className="w-4 h-4" /> Sufficient balance available.
                       </div>
                    )}
                 </div>
              ) : (
                 <>
                    <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300 mb-6">
                       <p className="text-sm text-center text-gray-600 mb-2">Please Send Money to this Personal Number:</p>
                       <div className="flex items-center justify-center gap-3">
                          <span className="text-xl font-bold font-mono text-gray-800">{activeNumber}</span>
                          <button type="button" onClick={() => copyToClipboard(activeNumber)} className="text-primary hover:text-orange-700">
                             <Copy className="w-5 h-5" />
                          </button>
                       </div>
                       <p className="text-xs text-center text-gray-400 mt-2">Use "Send Money" option from your App.</p>
                    </div>

                    <div className="space-y-4">
                       <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Your Wallet Number</label>
                          <input 
                            required
                            type="text" 
                            placeholder={`Enter your ${paymentMethod} number`}
                            value={senderPhone}
                            onChange={e => setSenderPhone(e.target.value)}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                          />
                       </div>
                       <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID (TrxID)</label>
                          <input 
                            required
                            type="text" 
                            placeholder="e.g., 9H7D6F8G"
                            value={trxId}
                            onChange={e => setTrxId(e.target.value)}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                          />
                       </div>
                    </div>
                 </>
              )}

              <button 
                type="submit" 
                disabled={isProcessing || (paymentMethod === 'Wallet' && (user?.walletBalance || 0) < total)}
                className={`w-full mt-8 py-3 rounded-lg text-white font-bold text-lg shadow-lg transition ${isProcessing || (paymentMethod === 'Wallet' && (user?.walletBalance || 0) < total) ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-orange-600 shadow-orange-500/30'}`}
              >
                {isProcessing ? 'Verifying...' : paymentMethod === 'Wallet' ? 'Pay Now' : 'Verify & Pay'}
              </button>
           </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
           <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-fade-in-up">
              <div className="bg-secondary p-4 flex justify-between items-center text-white">
                 <h3 className="font-bold flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> Confirm Order</h3>
                 <button onClick={() => setShowConfirmModal(false)} className="hover:text-gray-300"><X className="w-5 h-5"/></button>
              </div>
              <div className="p-6">
                 <div className="text-center mb-6">
                    <p className="text-gray-500 mb-1">Total Amount to Pay</p>
                    <h2 className="text-3xl font-extrabold text-primary">৳ {total}</h2>
                    {isPromoApplied && <p className="text-xs text-green-600 font-bold mt-1">Discount of ৳{appliedDiscount} Applied</p>}
                 </div>
                 
                 <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                       <span className="text-gray-500">Method:</span>
                       <span className="font-bold text-gray-800">{paymentMethod}</span>
                    </div>
                    {paymentMethod !== 'Wallet' ? (
                       <>
                       <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Sender Number:</span>
                          <span className="font-bold text-gray-800 font-mono">{senderPhone}</span>
                       </div>
                       <div className="flex justify-between text-sm">
                          <span className="text-gray-500">TrxID:</span>
                          <span className="font-bold text-gray-800 font-mono">{trxId}</span>
                       </div>
                       </>
                    ) : (
                       <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Balance after:</span>
                          <span className="font-bold text-gray-800 font-mono">৳ {(user?.walletBalance || 0) - total}</span>
                       </div>
                    )}
                 </div>

                 {paymentMethod !== 'Wallet' && (
                    <div className="flex items-start gap-3 p-3 bg-yellow-50 text-yellow-800 rounded-lg text-xs mb-6">
                       <AlertTriangle className="w-5 h-5 shrink-0" />
                       <p>Please ensure the Transaction ID matches the amount sent. Incorrect details may delay your order.</p>
                    </div>
                 )}

                 <div className="grid grid-cols-2 gap-4">
                    <button 
                       onClick={() => setShowConfirmModal(false)} 
                       className="py-3 rounded-xl border border-gray-300 font-bold text-gray-600 hover:bg-gray-50 transition"
                    >
                       Cancel
                    </button>
                    <button 
                       onClick={handleFinalizeOrder} 
                       className="py-3 rounded-xl bg-primary text-white font-bold hover:bg-orange-600 shadow-lg shadow-orange-500/30 transition"
                    >
                       Confirm Payment
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;