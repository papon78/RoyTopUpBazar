import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden group border border-gray-100 block h-full flex flex-col">
      <div className="relative overflow-hidden aspect-square">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute top-2 right-2 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded shadow">
          INSTANT
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs text-gray-500 mb-1">{product.category}</span>
        <h3 className="font-semibold text-gray-800 text-sm md:text-base leading-tight mb-2 group-hover:text-primary transition">{product.title}</h3>
        <div className="mt-auto">
          <button className="w-full py-2 rounded-lg border border-primary text-primary text-sm font-medium group-hover:bg-primary group-hover:text-white transition">
            Top Up Now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
