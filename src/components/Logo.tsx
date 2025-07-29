interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Logo = ({ size = "md", className = "" }: LogoProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16"
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Golden car silhouette */}
        <g fill="currentColor" className="text-gold">
          {/* Car body */}
          <path d="M15 60 L85 60 L85 50 Q85 45 80 40 L70 35 L30 35 L20 40 Q15 45 15 50 Z" />
          {/* Car windows */}
          <path d="M25 45 L75 45 L70 35 L30 35 Z" fill="currentColor" className="text-dark-surface" />
          {/* Car wheels */}
          <circle cx="25" cy="60" r="8" />
          <circle cx="75" cy="60" r="8" />
          {/* Wheel details */}
          <circle cx="25" cy="60" r="4" fill="currentColor" className="text-dark-surface" />
          <circle cx="75" cy="60" r="4" fill="currentColor" className="text-dark-surface" />
        </g>
      </svg>
    </div>
  );
};

export default Logo;