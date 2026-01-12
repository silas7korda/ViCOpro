
import React from 'react';

export const SocialButtons: React.FC = () => {
  const handleSocialLogin = (provider: string) => {
    alert(`${provider} login protocol initiated...`);
    setTimeout(() => {
      alert(`${provider} connected successfully!`);
    }, 1500);
  };

  return (
    <div className="flex gap-4 items-center justify-center">
      {/* Google */}
      <button
        onClick={() => handleSocialLogin('Google')}
        className="social-btn w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
        title="Sign in with Google"
      >
        <img 
          src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" 
          className="w-5 h-5" 
          alt="Google" 
        />
      </button>

      {/* Apple */}
      <button
        onClick={() => handleSocialLogin('Apple')}
        className="social-btn w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
        title="Sign in with Apple"
      >
        <i className="fa-brands fa-apple text-xl text-white"></i>
      </button>

      {/* Microsoft */}
      <button
        onClick={() => handleSocialLogin('Microsoft')}
        className="social-btn w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
        title="Sign in with Microsoft"
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" 
          className="w-4 h-4" 
          alt="Microsoft" 
        />
      </button>
    </div>
  );
};
