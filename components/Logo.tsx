
import React from 'react';

export const Logo: React.FC<{ size?: 'sm' | 'lg' }> = ({ size = 'lg' }) => {
  const isLarge = size === 'lg';
  return (
    <div className={`flex flex-col items-center ${isLarge ? 'mb-8' : 'mb-4'}`}>
      <div className="flex items-baseline gap-0.5">
        <span className={`font-bold tracking-tighter text-white ${isLarge ? 'text-4xl' : 'text-2xl'}`}>
          cignifi
        </span>
      </div>
      <div className="flex gap-1.5 mt-1">
        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
};
