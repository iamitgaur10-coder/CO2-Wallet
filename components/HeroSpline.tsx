import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';
import { Loader2 } from 'lucide-react';

export const HeroSpline: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-full h-full relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center text-emerald-500">
           <Loader2 className="animate-spin w-10 h-10" />
        </div>
      )}
      {/* Fallback to a sleek dark gradient if Spline fails or while loading */}
      <div className={`absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A] to-emerald-950/20 transition-opacity duration-1000 ${loading ? 'opacity-100' : 'opacity-0'}`} />
      
      <Spline 
        scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" 
        onLoad={() => setLoading(false)}
        className="w-full h-full"
      />
      
      {/* Overlay to fade bottom into the page content */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
    </div>
  );
};