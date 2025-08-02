interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Logo = ({ size = "md", className = "" }: LogoProps) => {
  const sizeClasses = {
    sm: "w-32 h-12",
    md: "w-48 h-18", 
    lg: "w-64 h-24"
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg 
        viewBox="0 0 400 120" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#FFA500" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
        </defs>
        
        {/* Car Silhouette */}
        <g transform="translate(30, 15)">
          {/* Car Body */}
          <path 
            d="M10 35 L60 35 L65 25 L80 25 L85 35 L95 35 L95 45 L85 45 L85 50 L80 50 L25 50 L20 50 L20 45 L10 45 Z" 
            fill="url(#goldGradient)"
          />
          {/* Car Windows */}
          <path 
            d="M25 25 L35 20 L55 20 L65 25 L60 35 L30 35 Z" 
            fill="url(#goldGradient)"
            opacity="0.8"
          />
          {/* Front Wheel */}
          <circle cx="25" cy="45" r="6" fill="url(#goldGradient)" />
          <circle cx="25" cy="45" r="3" fill="#2C1810" />
          {/* Rear Wheel */}
          <circle cx="80" cy="45" r="6" fill="url(#goldGradient)" />
          <circle cx="80" cy="45" r="3" fill="#2C1810" />
          {/* Car Details */}
          <rect x="15" y="40" width="3" height="2" fill="url(#goldGradient)" />
          <rect x="87" y="40" width="3" height="2" fill="url(#goldGradient)" />
        </g>
        
        {/* Main Text "Kaar.Rental" */}
        <text x="30" y="85" fontSize="24" fontWeight="bold" fill="url(#goldGradient)" fontFamily="serif">
          Kaar.Rental
        </text>
        
        {/* Tagline */}
        <text x="30" y="105" fontSize="10" fill="url(#goldGradient)" fontFamily="sans-serif" letterSpacing="2">
          RELIABLE RIDES ANYTIME
        </text>
      </svg>
    </div>
  );
};

export default Logo;