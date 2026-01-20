import React, { useState } from 'react';
import { useShop } from '../store/context';
import { Search, Package, Clock, CheckCircle, XCircle, ArrowRight, MapPin, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

const TrackOrder: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [searchResult, setSearchResult] = useState<any | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const { orders } = useShop();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    setHasSearched(false);
    setSearchResult(null);

    // Simulate API lookup delay
    setTimeout(() => {
      // Search in local context (in real app, this would be an API call)
      const found = orders.find(o => o.id.toLowerCase() === orderId.toLowerCase() || o.transactionId.toLowerCase() === orderId.toLowerCase());
      setSearchResult(found || null);
      setHasSearched(true);
      setLoading(false);
    }, 1000);
  };

  const getStatusStep = (status: string) => {
    if (status === 'Cancelled') return 0;
    if (status === 'Pending') return 1;
    if (status === 'Processing') return 2; // Hypothetical status
    if (status === 'Completed') return 3;
    return 1;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Search Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-secondary sm:text-4xl">Track Your Order</h1>
          <p className="mt-3 text-lg text-gray-500">
            Enter your Order ID or Transaction ID to check the real-time status of your top-up.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-xl p-2 mb-10 border border-gray-100 transform transition-all hover:scale-[1.01]">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-4 py-4 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-gray-50 transition text-lg"
                placeholder="Ex: ORD-12345 or TrxID"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>Track <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </form>
        </div>

        {/* Results Section */}
        {hasSearched && !searchResult && (
          <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-8 text-center animate-fade-in-up">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Order Not Found</h3>
            <p className="text-gray-500 mt-2">
              We couldn't find an order with ID "{orderId}". Please check the ID and try again.
            </p>
          </div>
        )}

        {searchResult && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-fade-in-up">
            {/* Order Header */}
            <div className="bg-secondary text-white p-6 flex flex-wrap justify-between items-center gap-4">
              <div>
                <p className="text-gray-400 text-sm uppercase tracking-wider">Order ID</p>
                <h2 className="text-2xl font-mono font-bold">{searchResult.id}</h2>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm uppercase tracking-wider">Total Amount</p>
                <h2 className="text-2xl font-bold text-primary">৳ {searchResult.total}</h2>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="p-8 border-b bg-gray-50">
               <div className="relative">
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                     <div 
                        style={{ width: searchResult.status === 'Completed' ? '100%' : searchResult.status === 'Cancelled' ? '100%' : '50%' }} 
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${searchResult.status === 'Cancelled' ? 'bg-red-500' : searchResult.status === 'Completed' ? 'bg-green-500' : 'bg-primary'}`}
                     ></div>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm font-medium text-gray-600">
                     <div className="flex flex-col items-center">
                        <div className="w-6 h-6 bg-green-500 rounded-full text-white flex items-center justify-center mb-2"><CheckCircle className="w-4 h-4"/></div>
                        <span>Placed</span>
                     </div>
                     <div className="flex flex-col items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mb-2 ${searchResult.status !== 'Pending' ? 'bg-green-500 text-white' : 'bg-primary text-white animate-pulse'}`}>
                           {searchResult.status !== 'Pending' ? <CheckCircle className="w-4 h-4"/> : <Clock className="w-4 h-4"/>}
                        </div>
                        <span>Processing</span>
                     </div>
                     <div className="flex flex-col items-center">
                        {searchResult.status === 'Cancelled' ? (
                           <div className="w-6 h-6 bg-red-500 rounded-full text-white flex items-center justify-center mb-2"><XCircle className="w-4 h-4"/></div>
                        ) : (
                           <div className={`w-6 h-6 rounded-full flex items-center justify-center mb-2 ${searchResult.status === 'Completed' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
                              <Package className="w-4 h-4"/>
                           </div>
                        )}
                        <span>{searchResult.status === 'Cancelled' ? 'Cancelled' : 'Delivered'}</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Order Details */}
            <div className="p-6 sm:p-8">
              <div className="grid md:grid-cols-2 gap-8">
                
                {/* Items */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                     <Package className="w-5 h-5 text-primary" /> Product Details
                  </h3>
                  <div className="space-y-4">
                    {searchResult.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <img src={item.productImage} className="w-12 h-12 rounded-lg object-cover" alt="" />
                        <div>
                          <p className="font-bold text-gray-800 text-sm">{item.productTitle}</p>
                          <p className="text-xs text-gray-500">{item.optionName}</p>
                          {item.playerId && <p className="text-xs text-primary font-mono mt-0.5">ID: {item.playerId}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                     <MapPin className="w-5 h-5 text-primary" /> Delivery Info
                  </h3>
                  <div className="space-y-4 text-sm">
                     <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-500">Order Date</span>
                        <span className="font-medium">{new Date(searchResult.date).toLocaleString()}</span>
                     </div>
                     <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-500">Payment Method</span>
                        <span className="font-medium flex items-center gap-2">
                           {searchResult.paymentMethod}
                        </span>
                     </div>
                     <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-500">Transaction ID</span>
                        <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-800">{searchResult.transactionId}</span>
                     </div>
                     <div className="flex justify-between pt-2">
                        <span className="text-gray-500">Payment Status</span>
                        <span className="text-green-600 font-bold flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Paid</span>
                     </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
               <p className="text-sm text-gray-500 mb-4">Having trouble with this order?</p>
               <Link to="/contact" className="text-primary font-bold hover:underline">Contact Support</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;