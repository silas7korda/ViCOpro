
import React, { useState } from 'react';
import { Logo } from './Logo';
import { authService } from '../lib/authService';

interface ForgotPasswordPageProps {
  onBack: () => void;
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onBack }) => {
  const [gmail, setGmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.sendResetEmail(gmail);
      setIsSent(true);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card w-full p-10 flex flex-col items-center relative animate-in">
      <button 
        onClick={onBack} 
        className="absolute left-8 top-10 text-gray-400 hover:text-white transition-colors"
      >
        <i className="fa-solid fa-arrow-left text-lg"></i>
      </button>

      <Logo />

      <div className="w-full text-left mb-6">
        <h2 className="text-xl font-bold text-white">Reset Password</h2>
        <p className="text-xs text-gray-400 mt-2 leading-relaxed">
          {isSent 
            ? "We've sent recovery instructions to your Gmail." 
            : "Enter your registered Gmail address to receive a verification link."}
        </p>
      </div>

      {!isSent ? (
        <form onSubmit={handleSubmit} className="w-full space-y-6">
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

          <button
            type="submit"
            disabled={loading}
            className={`btn-primary w-full text-white font-bold py-4 rounded-xl ${loading ? 'opacity-70 cursor-wait' : ''}`}
          >
            {loading ? 'Transmitting link...' : 'Send Recovery Link'}
          </button>
        </form>
      ) : (
        <div className="w-full space-y-6 text-center">
          <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto border border-indigo-500/50">
            <i className="fa-solid fa-paper-plane text-indigo-400 text-3xl animate-bounce"></i>
          </div>
          <button
            onClick={onBack}
            className="btn-primary w-full text-white font-bold py-4 rounded-xl"
          >
            Back to Login
          </button>
        </div>
      )}

      {!isSent && (
        <button 
          onClick={onBack} 
          className="mt-10 text-xs text-gray-500 font-bold uppercase tracking-widest hover:text-white transition-colors"
        >
          Nevermind, I remember
        </button>
      )}
    </div>
  );
};
