
import React, { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { SignUpPage } from './components/SignUpPage';
import { ForgotPasswordPage } from './components/ForgotPasswordPage';

export type AuthView = 'login' | 'signup' | 'forgot-password';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AuthView>('login');

  const renderView = () => {
    switch (currentView) {
      case 'login':
        return (
          <LoginPage 
            onSwitchSignup={() => setCurrentView('signup')} 
            onSwitchForgot={() => setCurrentView('forgot-password')} 
          />
        );
      case 'signup':
        return <SignUpPage onSwitch={() => setCurrentView('login')} />;
      case 'forgot-password':
        return <ForgotPasswordPage onBack={() => setCurrentView('login')} />;
      default:
        return <LoginPage onSwitchSignup={() => setCurrentView('signup')} onSwitchForgot={() => setCurrentView('forgot-password')} />;
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-md transition-all duration-500 ease-in-out">
        {renderView()}
      </div>
    </div>
  );
};

export default App;
