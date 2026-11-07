import React from "react";

interface SectionLabelProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  dotColor?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  children,
  icon,
  className = "",
  dotColor = "bg-[#F8904D]",
}) => {
  return (
    <div
      className={`inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-slate-800 mb-1.5 ${className}`}
    >
      {icon ? (
        <span className="shrink-0 text-[#F8904D]">{icon}</span>
      ) : (
        <span className={`w-2 h-2 rounded-full ${dotColor} shrink-0`} />
      )}
      <span>{children}</span>
    </div>
  );
};
