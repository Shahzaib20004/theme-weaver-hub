interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Logo = ({ size = "md", className = "" }: LogoProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10", 
    lg: "w-12 h-12"
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg 
        viewBox="0 0 120 120" 
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
          <radialGradient id="bgGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2D2D2D" />
            <stop offset="100%" stopColor="#1A1A1A" />
          </radialGradient>
        </defs>
        
        {/* Circular Background */}
        <circle cx="60" cy="60" r="58" fill="url(#bgGradient)" stroke="url(#goldGradient)" strokeWidth="2"/>
        
        {/* Car Silhouette */}
        <g transform="translate(20, 35)">
          {/* Main Car Body */}
          <path 
            d="M10 20 L30 20 L35 15 L45 15 L50 20 L60 20 L60 25 L50 25 L50 30 L45 30 L15 30 L10 30 L10 25 L5 25 L5 20 Z" 
            fill="url(#goldGradient)"
          />
          {/* Car Windows */}
          <path 
            d="M15 15 L20 10 L35 10 L40 15 L35 20 L20 20 Z" 
            fill="url(#goldGradient)"
            opacity="0.8"
          />
          {/* Front Wheel */}
          <circle cx="15" cy="25" r="4" fill="url(#goldGradient)" />
          <circle cx="15" cy="25" r="2" fill="#1A1A1A" />
          {/* Rear Wheel */}
          <circle cx="45" cy="25" r="4" fill="url(#goldGradient)" />
          <circle cx="45" cy="25" r="2" fill="#1A1A1A" />
        </g>
        
        {/* Main Text "Kaar.Rental" */}
        <text x="60" y="75" fontSize="10" fontWeight="bold" fill="url(#goldGradient)" fontFamily="serif" textAnchor="middle">
          Kaar.Rental
        </text>
        
        {/* Tagline */}
        <text x="60" y="87" fontSize="5" fill="url(#goldGradient)" fontFamily="sans-serif" letterSpacing="1" textAnchor="middle">
          RELIABLE RIDES ANYTIME
        </text>
      </svg>
    </div>
  );
};

export default Logo;