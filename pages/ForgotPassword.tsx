import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Forgot Password?</h2>
          <p className="text-gray-500 text-sm mt-2">
            No worries! Enter your email address and we will send you a link to reset your password.
          </p>
        </div>

        {submitted ? (
          <div className="text-center animate-fade-in-up">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Check your inbox</h3>
            <p className="text-gray-500 text-sm mb-6">
              If an account exists for <strong>{email}</strong>, we have sent a password reset link.
            </p>
            <Link to="/login" className="text-primary font-medium hover:underline flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
               <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                 <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition" />
               </div>
               <input
                 required
                 type="email"
                 placeholder="Enter your email"
                 className="block w-full pl-11 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition outline-none bg-gray-50/50 focus:bg-white"
                 value={email}
                 onChange={e => setEmail(e.target.value)}
               />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-primary hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-primary/30 transition shadow-lg shadow-orange-500/30"
            >
              {loading ? (
                 <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                 <span className="flex items-center gap-2">
                    Send Reset Link <ArrowRight className="w-4 h-4" />
                 </span>
              )}
            </button>
            
            <div className="text-center">
              <Link to="/login" className="text-sm text-gray-500 hover:text-gray-800 flex items-center justify-center gap-1 transition">
                 <ArrowLeft className="w-4 h-4" /> Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;