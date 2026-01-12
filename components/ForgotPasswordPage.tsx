
import React, { useState } from 'react';
import { Logo } from './Logo';
import { authService } from '../lib/authService';

interface ForgotPasswordPageProps {
  onBack: () => void;
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.sendResetEmail(email);
      setIsSent(true);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card w-full p-10 flex flex-col items-center relative animate-in backdrop-blur-md bg-white/80 border border-white/20">
      <button 
        onClick={onBack} 
        className="absolute left-8 top-10 text-gray-400 hover:text-indigo-600"
      >
        <i className="fa-solid fa-arrow-left text-lg"></i>
      </button>

      <Logo />

      <div className="w-full text-left mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Recover Password</h2>
        <p className="text-xs text-gray-500 mt-2 leading-relaxed">
          {isSent 
            ? "Recovery instructions have been sent." 
            : "Enter your email address to receive a reset link."}
        </p>
      </div>

      {!isSent ? (
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <input
            type="email"
            required
            className="cignifi-input w-full py-4 px-5 rounded-xl text-sm text-gray-700"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className={`btn-primary w-full text-white font-semibold py-4 rounded-xl ${loading ? 'opacity-70 cursor-wait' : ''}`}
          >
            {loading ? 'Sending link...' : 'Send Recovery Link'}
          </button>
        </form>
      ) : (
        <div className="w-full space-y-6 text-center">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto border border-green-100">
            <i className="fa-solid fa-check text-green-500 text-2xl"></i>
          </div>
          <button
            onClick={onBack}
            className="btn-primary w-full text-white font-semibold py-4 rounded-xl"
          >
            Back to Login
          </button>
        </div>
      )}

      {!isSent && (
        <button 
          onClick={onBack} 
          className="mt-10 text-xs text-gray-400 font-bold uppercase tracking-widest hover:text-indigo-600 transition-colors"
        >
          Cancel
        </button>
      )}
    </div>
  );
};
