import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useShop } from '../store/context';
import { CheckCircle, ShieldCheck, Zap } from 'lucide-react';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, products } = useShop();
  
  const product = products.find((p) => p.id === id);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState('');
  const [error, setError] = useState('');

  // Reset state when product changes
  useEffect(() => {
    setSelectedOption(null);
    setPlayerId('');
    setError('');
  }, [id]);

  if (!product) {
    return <div className="text-center py-20">Product not found. <button onClick={() => navigate('/')} className="text-primary underline">Go Home</button></div>;
  }

  const handleAddToCart = () => {
    if (!selectedOption) {
      setError('Please select a top-up package.');
      return;
    }
    if (product.type === 'player_id' && !playerId.trim()) {
      setError('Please enter your Player ID.');
      return;
    }

    const option = product.options.find(o => o.id === selectedOption);
    if (!option) return;

    addToCart({
      productId: product.id,
      productTitle: product.title,
      productImage: product.image,
      optionId: option.id,
      optionName: option.name,
      price: option.price,
      playerId: playerId,
      quantity: 1,
    });

    navigate('/checkout');
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Image & Info */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-2xl shadow-sm p-4 border sticky top-24">
            <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.title}</h1>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">{product.description}</p>
            
            <div className="space-y-3 pt-4 border-t">
               <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Zap className="w-4 h-4 text-primary" />
                  <span>Instant Delivery (Automated)</span>
               </div>
               <div className="flex items-center gap-3 text-sm text-gray-600">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  <span>Secure Payment</span>
               </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border">
            
            {/* Step 1: Input Player ID (if applicable) */}
            {product.type === 'player_id' && (
              <div className="mb-8">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center text-xs">1</span>
                  Enter Account Info
                </h2>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Player ID / User ID</label>
                  <input 
                    type="text" 
                    value={playerId}
                    onChange={(e) => setPlayerId(e.target.value)}
                    placeholder="Example: 123456789"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                  />
                  <p className="text-xs text-gray-400 mt-2">Find your ID in the game profile section.</p>
                </div>
              </div>
            )}

            {/* Step 2: Select Package */}
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center text-xs">2</span>
                  Select Recharge
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {product.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => { setSelectedOption(option.id); setError(''); }}
                    className={`relative p-4 rounded-xl border-2 text-left transition-all group ${
                      selectedOption === option.id 
                      ? 'border-primary bg-orange-50' 
                      : 'border-gray-100 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="font-semibold text-gray-800 text-sm group-hover:text-primary transition">{option.name}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-bold text-primary">৳ {option.price}</span>
                      {option.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">৳ {option.originalPrice}</span>
                      )}
                    </div>
                    {selectedOption === option.id && (
                      <CheckCircle className="absolute top-2 right-2 w-4 h-4 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-3 bg-red-100 text-red-700 text-sm rounded-lg flex items-center gap-2">
                 <span>⚠️</span> {error}
              </div>
            )}

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-6 border-t mt-4">
               <div>
                  <span className="text-sm text-gray-500 block">Total Price:</span>
                  <span className="text-2xl font-bold text-secondary">
                    {selectedOption 
                      ? `৳ ${product.options.find(o => o.id === selectedOption)?.price}` 
                      : '৳ 0'}
                  </span>
               </div>
               <button 
                onClick={handleAddToCart}
                className="px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-orange-600 transition shadow-lg shadow-orange-500/30"
               >
                 Buy Now
               </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;