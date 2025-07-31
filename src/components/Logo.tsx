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
      <img 
        src="/lovable-uploads/16262c0e-7dc8-458e-bd4a-50b2e140f70a.png" 
        alt="Kaar.Rental Logo" 
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default Logo;