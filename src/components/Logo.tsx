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
        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#FFC107" />
            <stop offset="100%" stopColor="#FF8F00" />
          </linearGradient>
          <radialGradient id="bgGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1A1A1A" />
            <stop offset="100%" stopColor="#0A0A0A" />
          </radialGradient>
          <linearGradient id="rimGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
        </defs>
        
        {/* Outer Ring */}
        <circle cx="60" cy="60" r="58" fill="url(#bgGradient)" stroke="url(#rimGradient)" strokeWidth="4"/>
        
        {/* Inner Circle Background */}
        <circle cx="60" cy="60" r="50" fill="rgba(26, 26, 26, 0.8)" stroke="url(#goldGradient)" strokeWidth="1" opacity="0.3"/>
        
        {/* Premium Car Icon in Center */}
        <g transform="translate(35, 40)">
          {/* Main Car Body - More Sleek */}
          <path 
            d="M5 20 L15 18 L20 12 L30 12 L35 18 L45 20 L45 25 L40 27 L35 25 L15 25 L10 27 L5 25 Z" 
            fill="url(#goldGradient)"
            stroke="#FFD700"
            strokeWidth="0.5"
          />
          
          {/* Windshield */}
          <path 
            d="M18 12 L32 12 L30 18 L20 18 Z" 
            fill="rgba(255, 215, 0, 0.3)"
            stroke="url(#goldGradient)"
            strokeWidth="0.5"
          />
          
          {/* Side Windows */}
          <path 
            d="M15 15 L18 18 L32 18 L35 15 L32 12 L18 12 Z" 
            fill="rgba(255, 215, 0, 0.2)"
          />
          
          {/* Premium Wheels */}
          <circle cx="15" cy="25" r="4" fill="url(#goldGradient)" stroke="#FFD700" strokeWidth="0.5"/>
          <circle cx="15" cy="25" r="2.5" fill="#1A1A1A" />
          <circle cx="15" cy="25" r="1" fill="url(#goldGradient)" />
          
          <circle cx="35" cy="25" r="4" fill="url(#goldGradient)" stroke="#FFD700" strokeWidth="0.5"/>
          <circle cx="35" cy="25" r="2.5" fill="#1A1A1A" />
          <circle cx="35" cy="25" r="1" fill="url(#goldGradient)" />
          
          {/* Headlights */}
          <circle cx="42" cy="22" r="1.5" fill="#FFF" opacity="0.8"/>
          <circle cx="8" cy="22" r="1.5" fill="#FFF" opacity="0.8"/>
        </g>
        
        {/* Brand Text - Curved */}
        <path id="circle-text" d="M 60,60 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none"/>
        <text fontSize="9" fontWeight="bold" fill="url(#goldGradient)" fontFamily="serif">
          <textPath href="#circle-text" startOffset="25%">
            Kaar.Rentals
          </textPath>
        </text>
        
        {/* Center Badge */}
        <circle cx="60" cy="85" r="8" fill="url(#goldGradient)" opacity="0.1"/>
        <text x="60" y="88" fontSize="6" fontWeight="bold" fill="url(#goldGradient)" fontFamily="sans-serif" textAnchor="middle">
          🇵🇰
        </text>
        
        {/* Premium Accent Dots */}
        <circle cx="25" cy="35" r="1" fill="url(#goldGradient)" opacity="0.6"/>
        <circle cx="95" cy="35" r="1" fill="url(#goldGradient)" opacity="0.6"/>
        <circle cx="25" cy="85" r="1" fill="url(#goldGradient)" opacity="0.6"/>
        <circle cx="95" cy="85" r="1" fill="url(#goldGradient)" opacity="0.6"/>
      </svg>
    </div>
  );
};

export default Logo;