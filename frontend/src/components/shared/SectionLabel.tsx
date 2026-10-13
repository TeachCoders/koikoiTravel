import React from "react";

interface SectionLabelProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({ children, icon, className = "" }) => {
  return (
    <div className={`inline-flex items-center gap-1.5 text-[#F8904D] font-bold text-[11px] sm:text-xs uppercase tracking-widest mb-1.5 ${className}`}>
      {icon}
      <span>{children}</span>
    </div>
  );
};
