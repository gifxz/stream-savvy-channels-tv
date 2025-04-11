
import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const Logo: React.FC<LogoProps> = ({ className, size = "md" }) => {
  const sizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  };

  return (
    <div className={cn("flex items-center font-bold", sizes[size], className)}>
      <span className="text-tv-primary">PP</span>
      <span className="text-tv-secondary">TV</span>
    </div>
  );
};

export default Logo;
