
import React, { useState, useEffect } from 'react';
import { SocialButtons } from './SocialButtons';
import { Logo } from './Logo';
import { authService } from '../lib/authService';
import { getAutoDetectedCountry } from '../lib/locationService';

interface SignUpPageProps {
  onSwitch: () => void;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({ onSwitch }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gmail: '',
    phone: '',
    password: '',
  });
  const [countryCode, setCountryCode] = useState('+1');
  const [loading, setLoading] = useState(false);
  const [detecting, setDetecting] = useState(true);

  useEffect(() => {
    const trace = async () => {
      const { countryCode } = await getAutoDetectedCountry();
      setCountryCode(countryCode);
      setDetecting(false);
    };
    trace();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.gmail.toLowerCase().endsWith('@gmail.com')) {
      alert("Please use a valid Gmail address.");
      return;
    }

    setLoading(true);
    try {
      await authService.signUp({
        ...formData,
        phone: `${countryCode} ${formData.phone}`
      });
      alert(`Welcome to Cignifi, ${formData.firstName}! Account created.`);
      onSwitch();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card w-full p-8 flex flex-col items-center relative animate-in">
      <button 
        onClick={onSwitch} 
        className="absolute left-6 top-8 text-gray-500 hover:text-white transition-colors"
      >
        <i className="fa-solid fa-arrow-left text-lg"></i>
      </button>

      <Logo size="sm" />

      <div className="w-full text-left mb-6">
        <h2 className="text-xl font-bold text-white">Create Account</h2>
        <p className="text-xs text-gray-400 mt-1">Join the future of connectivity</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            required
            className="cignifi-input w-full py-3.5 px-4 rounded-xl text-sm"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />
          <input
            type="text"
            required
            className="cignifi-input w-full py-3.5 px-4 rounded-xl text-sm"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold text-gray-500 ml-1 tracking-wider">Date of Birth</label>
          <input
            type="date"
            required
            className="cignifi-input w-full py-3.5 px-4 rounded-xl text-sm"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
          />
        </div>

        <div className="relative">
          <i className="fa-regular fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
          <input
            type="email"
            required
            className="cignifi-input w-full py-3.5 pl-11 pr-4 rounded-xl text-sm"
            placeholder="Gmail Address"
            value={formData.gmail}
            onChange={(e) => setFormData({ ...formData, gmail: e.target.value })}
          />
        </div>

        <div className="flex gap-2">
          <div className={`cignifi-input px-3 flex items-center justify-center rounded-xl text-sm font-semibold min-w-[60px] ${detecting ? 'animate-pulse' : ''}`}>
            {detecting ? '...' : countryCode}
          </div>
          <input
            type="tel"
            required
            className="cignifi-input flex-1 py-3.5 px-4 rounded-xl text-sm"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div className="relative">
          <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
          <input
            type="password"
            required
            className="cignifi-input w-full py-3.5 pl-11 pr-4 rounded-xl text-sm"
            placeholder="Create Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`btn-primary w-full text-white font-bold py-4 rounded-xl mt-4 ${loading ? 'opacity-70 cursor-wait' : ''}`}
        >
          {loading ? 'Processing...' : 'Complete Registration'}
        </button>
      </form>

      <div className="w-full my-6 flex flex-col items-center gap-4">
        <div className="flex items-center w-full gap-4">
          <div className="h-[1px] bg-white/10 flex-1"></div>
          <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Instant Sign Up</span>
          <div className="h-[1px] bg-white/10 flex-1"></div>
        </div>
        <SocialButtons />
      </div>

      <div className="text-xs text-gray-400">
        Already registered?{' '}
        <button onClick={onSwitch} className="text-indigo-400 font-bold hover:underline">
          Sign In
        </button>
      </div>
    </div>
  );
};
