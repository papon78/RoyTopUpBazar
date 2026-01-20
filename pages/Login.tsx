import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../store/context';
import { Mail, Lock, User, ArrowRight, Phone, Facebook } from 'lucide-react';

// Enhanced Google Icon
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const { login } = useShop();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      login({
        name: isLogin ? 'Demo User' : formData.name,
        email: formData.email || 'demo@example.com',
        phone: formData.phone
      });
      setLoading(false);
      navigate('/profile');
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
     setLoading(true);
     // Simulate Redirect/Popup delay
     setTimeout(() => {
        login({
           name: `${provider} User`,
           email: `user@${provider.toLowerCase()}.com`
        });
        setLoading(false);
        navigate('/profile');
     }, 1500);
  }

  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
        
        {/* Left Side - Brand Visuals */}
        <div className="hidden md:flex md:w-5/12 bg-secondary text-white p-12 flex-col justify-between relative overflow-hidden">
           <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
           <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-600/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
           
           <div className="relative z-10">
             <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-2xl mb-6 shadow-lg shadow-orange-500/20">R</div>
             <h2 className="text-4xl font-extrabold mb-4 leading-tight">Welcome to <br/><span className="text-primary">RoyTopUp</span></h2>
             <p className="text-gray-300 leading-relaxed text-sm opacity-90">
               Your #1 destination for instant game credits. Login to track orders, save payment methods, and get exclusive discounts.
             </p>
           </div>
           
           <div className="relative z-10 space-y-4 mt-8">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                 <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
                 2,400+ Users Online Now
              </div>
           </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="md:w-7/12 p-8 md:p-12 lg:p-16 relative bg-white">
          <div className="max-w-md mx-auto">
             <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{isLogin ? 'Sign In' : 'Create Account'}</h2>
                <p className="text-gray-500 text-sm">
                   {isLogin ? 'Access your orders and account details.' : 'Join us for faster checkout and exclusive deals.'}
                </p>
             </div>

             {/* Tab Switcher */}
             <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
                <button 
                  className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${isLogin ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setIsLogin(true)}
                >
                  Log In
                </button>
                <button 
                  className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${!isLogin ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setIsLogin(false)}
                >
                  Register
                </button>
             </div>

             {/* Professional Social Login */}
             <div className="space-y-3 mb-8">
                <button onClick={() => handleSocialLogin('Google')} className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition text-sm font-semibold text-gray-700 bg-white group shadow-sm hover:shadow-md">
                   <GoogleIcon />
                   <span>Continue with Google</span>
                </button>
                <button onClick={() => handleSocialLogin('Facebook')} className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-[#1877F2] border border-transparent rounded-xl hover:bg-[#166fe5] transition text-sm font-semibold text-white group shadow-sm hover:shadow-md">
                   <Facebook className="w-5 h-5 fill-white" />
                   <span>Continue with Facebook</span>
                </button>
             </div>

             <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                   <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase tracking-wider">
                   <span className="px-4 bg-white text-gray-400 font-semibold">Or with Email</span>
                </div>
             </div>

             <form onSubmit={handleSubmit} className="space-y-5">
               {!isLogin && (
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition" />
                    </div>
                    <input
                      required
                      type="text"
                      placeholder="Full Name"
                      className="block w-full pl-11 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition outline-none bg-gray-50/50 focus:bg-white"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
               )}

               <div className="relative group">
                 <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                   <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition" />
                 </div>
                 <input
                   required
                   type="email"
                   placeholder="Email Address"
                   className="block w-full pl-11 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition outline-none bg-gray-50/50 focus:bg-white"
                   value={formData.email}
                   onChange={e => setFormData({...formData, email: e.target.value})}
                 />
               </div>

               <div className="relative group">
                 <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                   <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition" />
                 </div>
                 <input
                   required
                   type="password"
                   placeholder="Password"
                   className="block w-full pl-11 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition outline-none bg-gray-50/50 focus:bg-white"
                   value={formData.password}
                   onChange={e => setFormData({...formData, password: e.target.value})}
                 />
               </div>

               {!isLogin && (
                  <>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition" />
                    </div>
                    <input
                      required
                      type="password"
                      placeholder="Confirm Password"
                      className="block w-full pl-11 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition outline-none bg-gray-50/50 focus:bg-white"
                      value={formData.confirmPassword}
                      onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                    />
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition" />
                    </div>
                    <input
                      required
                      type="tel"
                      placeholder="Phone Number"
                      className="block w-full pl-11 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition outline-none bg-gray-50/50 focus:bg-white"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  </>
               )}

               {isLogin && (
                  <div className="flex justify-between items-center text-sm">
                     <label className="flex items-center gap-2 cursor-pointer text-gray-600">
                        <input type="checkbox" className="rounded text-primary focus:ring-primary border-gray-300" />
                        Remember me
                     </label>
                     <Link to="/forgot-password" className="text-primary hover:underline font-medium">Forgot Password?</Link>
                  </div>
               )}

               <button
                 type="submit"
                 disabled={loading}
                 className="group w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-primary hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-primary/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-orange-500/30 transform active:scale-[0.98]"
               >
                 {loading ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                 ) : (
                    <span className="flex items-center gap-2">
                       {isLogin ? 'Sign In' : 'Create Account'}
                       <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                    </span>
                 )}
               </button>
             </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;