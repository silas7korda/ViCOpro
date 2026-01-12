
import React from 'react';

export const SocialButtons: React.FC = () => {
  const handleSocialLogin = (provider: string) => {
    alert(`${provider} login simulation started...`);
    // Simulated redirect
    setTimeout(() => {
      alert(`${provider} sign-in success!`);
    }, 1200);
  };

  return (
    <div className="flex gap-4 items-center">
      {/* Google */}
      <button
        onClick={() => handleSocialLogin('Google')}
        className="social-btn w-14 h-14 rounded-xl flex items-center justify-center border border-gray-100 bg-white hover:bg-gray-50 transition-all shadow-sm"
        title="Sign in with Google"
      >
        <img 
          src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" 
          className="w-6 h-6" 
          alt="Google" 
        />
      </button>

      {/* Apple */}
      <button
        onClick={() => handleSocialLogin('Apple')}
        className="social-btn w-14 h-14 rounded-xl flex items-center justify-center border border-gray-100 bg-white hover:bg-gray-50 transition-all shadow-sm"
        title="Sign in with Apple"
      >
        <i className="fa-brands fa-apple text-2xl text-black"></i>
      </button>

      {/* Microsoft */}
      <button
        onClick={() => handleSocialLogin('Microsoft')}
        className="social-btn w-14 h-14 rounded-xl flex items-center justify-center border border-gray-100 bg-white hover:bg-gray-50 transition-all shadow-sm"
        title="Sign in with Microsoft"
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" 
          className="w-5 h-5" 
          alt="Microsoft" 
        />
      </button>
    </div>
  );
};
