import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../../store/context';
import { Lock, ArrowRight, AlertCircle } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { adminLogin } = useShop();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminLogin(username, password)) {
       navigate('/admin/dashboard');
    } else {
       setError('Invalid credentials. Access Denied.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
         <div className="bg-secondary p-8 text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
               <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
            <p className="text-gray-400 text-sm mt-1">Authorized Personnel Only</p>
         </div>
         
         <div className="p-8">
            {error && (
               <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 flex items-center gap-2 border border-red-100">
                  <AlertCircle className="w-4 h-4" /> {error}
               </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Username</label>
                  <input 
                     type="text" 
                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                     value={username}
                     onChange={e => setUsername(e.target.value)}
                     required
                  />
               </div>
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
                  <input 
                     type="password" 
                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                     value={password}
                     onChange={e => setPassword(e.target.value)}
                     required
                  />
               </div>
               
               <button type="submit" className="w-full py-3 bg-primary hover:bg-orange-600 text-white font-bold rounded-lg transition shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2">
                  Access Panel <ArrowRight className="w-4 h-4" />
               </button>
            </form>
         </div>
         
         <div className="bg-gray-50 p-4 text-center border-t text-xs text-gray-500">
            Secure Connection • RoyTopUp System
         </div>
      </div>
    </div>
  );
};

export default AdminLogin;