
import React, { useState } from 'react';
import { SocialButtons } from './SocialButtons';
import { Logo } from './Logo';
import { authService } from '../lib/authService';

interface SignUpPageProps {
  onSwitch: () => void;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({ onSwitch }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    setLoading(true);
    try {
      await authService.signUp(formData.email, formData.password);
      alert("Account created! You can now sign in.");
      onSwitch();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card w-full p-10 flex flex-col items-center relative animate-in backdrop-blur-md bg-white/80 border border-white/20">
      <button 
        onClick={onSwitch} 
        className="absolute left-8 top-10 text-gray-400 hover:text-indigo-600"
      >
        <i className="fa-solid fa-arrow-left text-lg"></i>
      </button>

      <Logo />

      <div className="w-full text-left mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Create Account</h2>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <input
          type="email"
          required
          className="cignifi-input w-full py-4 px-5 rounded-xl text-sm text-gray-700"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <input
          type="password"
          required
          className="cignifi-input w-full py-4 px-5 rounded-xl text-sm text-gray-700"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />

        <input
          type="password"
          required
          className="cignifi-input w-full py-4 px-5 rounded-xl text-sm text-gray-700"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        />

        <button
          type="submit"
          disabled={loading}
          className={`btn-primary w-full text-white font-semibold py-4 rounded-xl mt-4 ${loading ? 'opacity-70 cursor-wait' : ''}`}
        >
          {loading ? 'Creating Account...' : 'Sign up'}
        </button>
      </form>

      <div className="w-full my-8 flex flex-col items-center gap-6">
        <div className="flex items-center w-full gap-4">
          <div className="h-[1px] bg-gray-200 flex-1"></div>
          <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Or sign up with</span>
          <div className="h-[1px] bg-gray-200 flex-1"></div>
        </div>
        <SocialButtons />
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Already have an account?{' '}
        <button onClick={onSwitch} className="text-indigo-600 font-bold hover:underline">
          Sign in
        </button>
      </div>
    </div>
  );
};
