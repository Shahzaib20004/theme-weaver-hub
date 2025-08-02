import { MessageCircle, Phone } from "lucide-react";
import { useState } from "react";

const WhatsAppFloat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = "+923090017510"; // Pakistani WhatsApp number
  const message = "Hi! I'm interested in cars on Kaar.Rentals. Can you help me?";

  const openWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const openCall = () => {
    window.open(`tel:${whatsappNumber}`, '_self');
  };

  return (
    <>
      {/* Main WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Expanded Menu */}
        {isOpen && (
          <div className="flex flex-col gap-2 animate-in slide-in-from-bottom-2 duration-200">
            {/* Call Button */}
            <button
              onClick={openCall}
              className="flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 group"
            >
              <Phone className="w-5 h-5" />
              <span className="text-sm font-medium whitespace-nowrap">Call Now</span>
            </button>

            {/* WhatsApp Button */}
            <button
              onClick={openWhatsApp}
              className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 group"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium whitespace-nowrap">WhatsApp</span>
            </button>

            {/* Info Text */}
            <div className="bg-dark-elevated/90 backdrop-blur-sm text-foreground px-3 py-2 rounded-lg text-xs text-center shadow-lg border border-border">
              <div className="font-medium text-gold">Instant Help Available</div>
              <div className="text-text-secondary">Speak to our experts</div>
            </div>
          </div>
        )}

        {/* Main Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="whatsapp-float w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full flex items-center justify-center shadow-xl transition-all duration-300 group relative overflow-hidden"
        >
          {/* Ripple Effect */}
          <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
          
          {/* Icon */}
          <MessageCircle className={`w-7 h-7 transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`} />
          
          {/* Notification Dot */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">!</span>
          </div>
        </button>
      </div>

      {/* Mobile Optimized Quick Actions Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-dark-surface/95 backdrop-blur-md border-t border-border z-40 safe-area-inset-bottom">
        <div className="flex items-center justify-around py-3 px-4">
          {/* Call Button */}
          <button
            onClick={openCall}
            className="flex flex-col items-center gap-1 p-2 text-blue-500 hover:text-blue-400 transition-colors"
          >
            <Phone className="w-6 h-6" />
            <span className="text-xs font-medium">Call</span>
          </button>

          {/* WhatsApp Button */}
          <button
            onClick={openWhatsApp}
            className="flex flex-col items-center gap-1 p-2 text-green-500 hover:text-green-400 transition-colors relative"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="text-xs font-medium">WhatsApp</span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </button>

          {/* Search Cars */}
          <a
            href="/cars"
            className="flex flex-col items-center gap-1 p-2 text-gold hover:text-gold-light transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-xs font-medium">Search</span>
          </a>

          {/* Favorites */}
          <button className="flex flex-col items-center gap-1 p-2 text-text-secondary hover:text-gold transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-xs font-medium">Saved</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default WhatsAppFloat;