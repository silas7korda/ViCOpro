
import React from 'react';

export const Logo: React.FC<{ size?: 'sm' | 'lg' }> = ({ size = 'lg' }) => {
  const isLarge = size === 'lg';
  return (
    <div className={`flex flex-col items-center ${isLarge ? 'mb-8' : 'mb-4'}`}>
      <div className="flex items-baseline gap-0.5">
        <span className={`font-bold tracking-tighter text-[#1E2E9D] ${isLarge ? 'text-4xl' : 'text-2xl'}`}>
          cignifi
        </span>
      </div>
      <div className="flex gap-1 mt-[-4px]">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-300"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-blue-800"></div>
      </div>
    </div>
  );
};
