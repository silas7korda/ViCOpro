
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPhoneLogin, setShowPhoneLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.signIn(email, password);
      alert("Welcome back! Login successful (Simulated).");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card w-full p-10 flex flex-col items-center animate-in backdrop-blur-md bg-white/80 border border-white/20">
      <Logo />
      
      <div className="w-full text-left mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Login to your Account</h2>
      </div>

      {!showPhoneLogin ? (
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <input
            type="email"
            required
            className="cignifi-input w-full py-4 px-5 rounded-xl text-sm text-gray-700"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="space-y-2">
            <input
              type="password"
              required
              className="cignifi-input w-full py-4 px-5 rounded-xl text-sm text-gray-700"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-end px-1">
              <button 
                type="button"
                onClick={onSwitchForgot}
                className="text-[11px] font-bold text-indigo-500 hover:text-[#1E2E9D] transition-colors"
              >
                Forgot Password?
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`btn-primary w-full text-white font-semibold py-4 rounded-xl mt-4 ${loading ? 'opacity-70 cursor-wait' : ''}`}
          >
            {loading ? 'Authenticating...' : 'Sign in'}
          </button>
        </form>
      ) : (
        <PhoneInput onBack={() => setShowPhoneLogin(false)} />
      )}

      <div className="w-full my-8 flex flex-col items-center gap-6">
        <div className="flex items-center w-full gap-4">
          <div className="h-[1px] bg-gray-200 flex-1"></div>
          <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Or connect with</span>
          <div className="h-[1px] bg-gray-200 flex-1"></div>
        </div>
        <SocialButtons />
      </div>

      {!showPhoneLogin && (
        <button 
          onClick={() => setShowPhoneLogin(true)}
          className="text-xs text-gray-500 font-bold hover:text-indigo-600 transition-colors uppercase tracking-wider"
        >
          Use Phone Number
        </button>
      )}

      <div className="mt-10 text-sm text-gray-500">
        Don't have an account?{' '}
        <button onClick={onSwitchSignup} className="text-indigo-600 font-bold hover:underline">
          Sign up
        </button>
      </div>
    </div>
  );
};
