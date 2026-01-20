import React from 'react';
import { useShop } from '../store/context';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const PaymentIcon: React.FC<{ method: string }> = ({ method }) => {
  if (method === 'Bkash') {
    return (
      <span className="flex items-center gap-1.5 bg-pink-50 text-pink-700 px-2.5 py-1 rounded-md border border-pink-100 text-xs font-bold shadow-sm">
         <span className="w-2.5 h-2.5 rounded-full bg-pink-600 ring-2 ring-pink-200"></span> Bkash
      </span>
    );
  }
  if (method === 'Nagad') {
    return (
      <span className="flex items-center gap-1.5 bg-orange-50 text-orange-700 px-2.5 py-1 rounded-md border border-orange-100 text-xs font-bold shadow-sm">
         <span className="w-2.5 h-2.5 rounded-full bg-orange-600 ring-2 ring-orange-200"></span> Nagad
      </span>
    );
  }
  return <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded text-xs">{method}</span>;
}

const OrderHistory: React.FC = () => {
  const { orders } = useShop();

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">No Orders Found</h2>
        <p className="text-gray-500 mb-8">You haven't made any purchases yet.</p>
        <Link to="/" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-orange-600 transition">Start Shopping</Link>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Completed': return <span className="flex items-center gap-1 text-green-700 bg-green-50 border border-green-100 px-2.5 py-1 rounded-full text-xs font-bold"><CheckCircle className="w-3.5 h-3.5"/> Completed</span>;
      case 'Processing': return <span className="flex items-center gap-1 text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full text-xs font-bold"><Clock className="w-3.5 h-3.5 animate-pulse"/> Processing</span>;
      case 'Cancelled': return <span className="flex items-center gap-1 text-red-700 bg-red-50 border border-red-100 px-2.5 py-1 rounded-full text-xs font-bold"><XCircle className="w-3.5 h-3.5"/> Cancelled</span>;
      default: return <span className="flex items-center gap-1 text-yellow-700 bg-yellow-50 border border-yellow-100 px-2.5 py-1 rounded-full text-xs font-bold"><Clock className="w-3.5 h-3.5"/> Pending</span>;
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-secondary">My Orders</h1>
        <div className="text-sm text-gray-500">Showing {orders.length} orders</div>
      </div>
      
      <div className="grid gap-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition duration-300">
            {/* Header */}
            <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex flex-wrap gap-4 justify-between items-center">
               <div className="flex items-center gap-4">
                 <div className="bg-white p-2 rounded-lg border shadow-sm">
                    <span className="font-mono text-gray-800 font-bold tracking-tight">#{order.id}</span>
                 </div>
                 <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {new Date(order.date).toLocaleString()}
                 </div>
               </div>
               <div>{getStatusBadge(order.status)}</div>
            </div>

            {/* Content */}
            <div className="p-6">
               <div className="flex flex-col md:flex-row gap-8">
                   {/* Items List */}
                   <div className="flex-1 space-y-4">
                     {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition border border-transparent hover:border-gray-100">
                           <img src={item.productImage} className="w-14 h-14 rounded-lg bg-gray-100 object-cover border" alt="" />
                           <div className="flex-1 min-w-0">
                              <p className="font-semibold text-gray-800 truncate">{item.productTitle}</p>
                              <p className="text-sm text-primary font-medium">{item.optionName}</p>
                              {item.playerId && <p className="text-xs text-gray-400 mt-1 font-mono bg-gray-100 inline-block px-1.5 py-0.5 rounded">ID: {item.playerId}</p>}
                           </div>
                           <div className="font-bold text-gray-700 whitespace-nowrap">৳ {item.price}</div>
                        </div>
                     ))}
                   </div>

                   {/* Payment Details */}
                   <div className="md:w-72 bg-gray-50 rounded-xl p-5 border border-gray-100 h-fit">
                      <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4 border-b pb-2">Payment Details</h4>
                      <div className="space-y-3 text-sm">
                         <div className="flex justify-between items-center">
                            <span className="text-gray-500">Method</span>
                            <PaymentIcon method={order.paymentMethod} />
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="text-gray-500">TrxID</span>
                            <span className="font-mono text-gray-800 font-medium bg-white px-2 py-0.5 rounded border text-xs">{order.transactionId}</span>
                         </div>
                         <div className="flex justify-between items-center pt-3 border-t border-gray-200 mt-2">
                            <span className="font-bold text-gray-700">Total Paid</span>
                            <span className="font-bold text-xl text-primary">৳ {order.total}</span>
                         </div>
                      </div>
                   </div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;