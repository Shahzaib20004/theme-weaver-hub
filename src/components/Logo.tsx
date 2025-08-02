interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Logo = ({ size = "md", className = "" }: LogoProps) => {
  const sizeClasses = {
    sm: "w-40 h-16",
    md: "w-52 h-20", 
    lg: "w-64 h-28"
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg 
        viewBox="0 0 520 200" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#FFA500" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
          <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="30%" stopColor="#FFC107" />
            <stop offset="70%" stopColor="#FF8F00" />
            <stop offset="100%" stopColor="#E65100" />
          </linearGradient>
        </defs>
        
        {/* Car Silhouette - Much Larger and More Detailed */}
        <g transform="translate(30, 20)">
          {/* Main Car Body */}
          <path 
            d="M20 80 L120 80 L130 60 L160 60 L170 50 L200 50 L210 60 L240 60 L250 80 L280 80 L285 90 L285 110 L270 110 L270 120 L250 120 L50 120 L30 120 L30 110 L15 110 L15 90 Z" 
            fill="url(#carGradient)"
            stroke="#B8860B"
            strokeWidth="2"
          />
          
          {/* Car Windows */}
          <path 
            d="M50 60 L70 40 L120 40 L140 35 L180 35 L200 40 L220 60 L200 80 L70 80 Z" 
            fill="url(#goldGradient)"
            opacity="0.9"
          />
          
          {/* Front Window Detail */}
          <path 
            d="M50 60 L70 45 L120 45 L140 60 L120 75 L70 75 Z" 
            fill="url(#goldGradient)"
            opacity="0.7"
          />
          
          {/* Rear Window Detail */}
          <path 
            d="M160 60 L180 45 L220 45 L200 60 L180 75 L160 75 Z" 
            fill="url(#goldGradient)"
            opacity="0.7"
          />
          
          {/* Front Wheel */}
          <circle cx="70" cy="110" r="18" fill="url(#carGradient)" stroke="#B8860B" strokeWidth="2"/>
          <circle cx="70" cy="110" r="12" fill="#2C1810" />
          <circle cx="70" cy="110" r="6" fill="url(#goldGradient)" />
          
          {/* Rear Wheel */}
          <circle cx="230" cy="110" r="18" fill="url(#carGradient)" stroke="#B8860B" strokeWidth="2"/>
          <circle cx="230" cy="110" r="12" fill="#2C1810" />
          <circle cx="230" cy="110" r="6" fill="url(#goldGradient)" />
          
          {/* Car Details */}
          <rect x="25" y="95" width="8" height="6" fill="url(#goldGradient)" rx="2" />
          <rect x="267" y="95" width="8" height="6" fill="url(#goldGradient)" rx="2" />
          
          {/* Headlights */}
          <ellipse cx="20" cy="85" rx="6" ry="8" fill="#FFFFFF" opacity="0.9" />
          <ellipse cx="280" cy="85" rx="6" ry="8" fill="#FF6B6B" opacity="0.9" />
          
          {/* Car Grille */}
          <rect x="15" y="75" width="10" height="15" fill="url(#goldGradient)" opacity="0.8" />
        </g>
        
        {/* Main Text "Kaar.Rental" - Much Larger */}
        <text x="40" y="165" fontSize="36" fontWeight="bold" fill="url(#goldGradient)" fontFamily="serif">
          Kaar.Rental
        </text>
        
        {/* Tagline */}
        <text x="40" y="185" fontSize="14" fill="url(#goldGradient)" fontFamily="sans-serif" letterSpacing="3">
          RELIABLE RIDES ANYTIME
        </text>
      </svg>
    </div>
  );
};

export default Logo;