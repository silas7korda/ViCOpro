
import React, { useState, useEffect } from 'react';
import { getAutoDetectedCountry } from '../lib/locationService';

interface PhoneInputProps {
  onBack: () => void;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({ onBack }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [step, setStep] = useState<'number' | 'otp'>('number');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
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

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 1500);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value !== '' && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  return (
    <div className="w-full animate-in">
      {step === 'number' ? (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div className="flex gap-2">
            <div className={`cignifi-input px-4 flex items-center justify-center rounded-xl text-sm font-semibold min-w-[70px] ${detecting ? 'animate-pulse' : ''}`}>
              {detecting ? '...' : countryCode}
            </div>
            <input
              type="tel"
              required
              className="cignifi-input flex-1 py-4 px-5 rounded-xl text-sm"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          
          <button type="submit" disabled={loading} className="btn-primary w-full text-white font-bold py-4 rounded-xl">
            {loading ? 'Sending OTP...' : 'Get Security Code'}
          </button>
        </form>
      ) : (
        <div className="space-y-6">
          <p className="text-center text-xs text-gray-400">Enter the 6-digit code sent to your device</p>
          <div className="flex justify-between gap-2">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type="text"
                maxLength={1}
                className="cignifi-input w-12 h-14 text-center text-xl font-bold rounded-xl"
                value={digit}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
              />
            ))}
          </div>
          <button className="btn-primary w-full text-white font-bold py-4 rounded-xl">
            Verify & Continue
          </button>
          <button onClick={() => setStep('number')} className="w-full text-xs text-gray-500 font-bold uppercase tracking-widest hover:text-white transition-colors">
            Use different number
          </button>
        </div>
      )}
      {step === 'number' && (
        <button onClick={onBack} className="mt-4 w-full text-xs text-gray-500 font-bold uppercase tracking-widest hover:text-white transition-colors">
          Back to Gmail Login
        </button>
      )}
    </div>
  );
};
