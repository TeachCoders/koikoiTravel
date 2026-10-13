import React from 'react';
import { ShieldCheck, HeadphonesIcon, Globe, HeartHandshake } from 'lucide-react';

const TrustedPartners: React.FC = () => {
  return (
    <div className="py-8 sm:py-10 border-t border-slate-100 bg-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
        <p className="text-center text-[11px] sm:text-xs font-bold tracking-widest text-[#F8904D] uppercase mb-6">The KoiKoi Travel Promise</p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-7 h-7 text-[#F8904D]" />
            <span className="font-semibold text-slate-800 text-base sm:text-[17px]">100% Secure Booking</span>
          </div>
          <div className="flex items-center gap-3">
            <HeadphonesIcon className="w-7 h-7 text-[#F8904D]" />
            <span className="font-semibold text-slate-800 text-base sm:text-[17px]">24/7 Trip Support</span>
          </div>
          <div className="flex items-center gap-3">
            <Globe className="w-7 h-7 text-[#F8904D]" />
            <span className="font-semibold text-slate-800 text-base sm:text-[17px]">Handpicked Experiences</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedPartners;
