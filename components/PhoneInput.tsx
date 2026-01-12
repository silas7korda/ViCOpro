
import React, { useState } from 'react';

interface PhoneInputProps {
  onBack: () => void;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({ onBack }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState<'number' | 'otp'>('number');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation:
    // const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});
    // signInWithPhoneNumber(auth, phoneNumber, verifier)
    setStep('otp');
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== '' && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  return (
    <div className="w-full animate-in fade-in duration-300">
      {step === 'number' ? (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div className="flex gap-2">
            <div className="cignifi-input px-4 py-4 rounded-xl text-sm flex items-center min-w-[70px] justify-center text-gray-500">
              +1
            </div>
            <input
              type="tel"
              required
              className="cignifi-input flex-1 py-4 px-5 rounded-xl text-sm text-gray-700"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          
          <div id="recaptcha-container" className="flex justify-center"></div>

          <button type="submit" className="btn-primary w-full text-white font-semibold py-4 rounded-xl">
            Send OTP
          </button>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between gap-1">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type="text"
                maxLength={1}
                className="cignifi-input w-10 h-12 text-center text-lg font-bold rounded-xl"
                value={digit}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
              />
            ))}
          </div>
          <button className="btn-primary w-full text-white font-semibold py-4 rounded-xl">
            Verify Code
          </button>
          <button onClick={() => setStep('number')} className="w-full text-xs text-gray-400 font-bold uppercase tracking-widest">
            Change Number
          </button>
        </div>
      )}
      {step === 'number' && (
        <button onClick={onBack} className="mt-4 w-full text-xs text-gray-400 font-bold uppercase tracking-widest">
          Back to Email
        </button>
      )}
    </div>
  );
};
