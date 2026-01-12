
import React, { useState } from 'react';
import { SocialButtons } from './SocialButtons';
import { PhoneInput } from './PhoneInput';
import { Logo } from './Logo';
import { authService } from '../lib/authService';

interface LoginPageProps {
  onSwitchSignup: () => void;
  onSwitchForgot: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onSwitchSignup, onSwitchForgot }) => {
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPhoneLogin, setShowPhoneLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await authService.signIn(gmail, password);
      alert(`Welcome back, ${user.firstName}!`);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card w-full p-10 flex flex-col items-center animate-in">
      <Logo />
      
      <div className="w-full text-left mb-6">
        <h2 className="text-xl font-bold text-white">Sign In</h2>
        <p className="text-xs text-gray-400 mt-1">Access your account via Gmail or phone</p>
      </div>

      {!showPhoneLogin ? (
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="relative">
            <i className="fa-regular fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
            <input
              type="email"
              required
              className="cignifi-input w-full py-4 pl-12 pr-5 rounded-xl text-sm"
              placeholder="Gmail Address"
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="relative">
              <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input
                type="password"
                required
                className="cignifi-input w-full py-4 pl-12 pr-5 rounded-xl text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-end px-1">
              <button 
                type="button"
                onClick={onSwitchForgot}
                className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Forgot Password?
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`btn-primary w-full text-white font-bold py-4 rounded-xl mt-4 ${loading ? 'opacity-70 cursor-wait' : ''}`}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      ) : (
        <PhoneInput onBack={() => setShowPhoneLogin(false)} />
      )}

      <div className="w-full my-8 flex flex-col items-center gap-6">
        <div className="flex items-center w-full gap-4">
          <div className="h-[1px] bg-white/10 flex-1"></div>
          <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Connect with</span>
          <div className="h-[1px] bg-white/10 flex-1"></div>
        </div>
        <SocialButtons />
      </div>

      {!showPhoneLogin && (
        <button 
          onClick={() => setShowPhoneLogin(true)}
          className="text-xs text-gray-400 font-bold hover:text-indigo-400 transition-colors uppercase tracking-wider"
        >
          <i className="fa-solid fa-mobile-screen-button mr-2"></i>
          Use Phone Number
        </button>
      )}

      <div className="mt-10 text-sm text-gray-400">
        New here?{' '}
        <button onClick={onSwitchSignup} className="text-indigo-400 font-bold hover:underline">
          Create account
        </button>
      </div>
    </div>
  );
};
