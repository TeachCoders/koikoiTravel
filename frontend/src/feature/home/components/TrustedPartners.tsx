import React from 'react';
import { ShieldCheck, HeadphonesIcon, Globe, HeartHandshake } from 'lucide-react';

const TrustedPartners: React.FC = () => {
  return (
    <div className="py-8 sm:py-10 border-t border-slate-100 bg-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
        <p className="text-center text-xs font-bold tracking-widest text-slate-400 uppercase mb-6">The KoiKoi Travel Promise</p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-slate-600" />
            <span className="font-bold text-slate-600 text-lg">100% Secure Booking</span>
          </div>
          <div className="flex items-center gap-3">
            <HeadphonesIcon className="w-8 h-8 text-slate-600" />
            <span className="font-bold text-slate-600 text-lg">24/7 Trip Support</span>
          </div>
          <div className="flex items-center gap-3">
            <Globe className="w-8 h-8 text-slate-600" />
            <span className="font-bold text-slate-600 text-lg">Handpicked Experiences</span>
          </div>
          <div className="flex items-center gap-3">
            <HeartHandshake className="w-8 h-8 text-slate-600" />
            <span className="font-bold text-slate-600 text-lg">Best Price Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedPartners;
