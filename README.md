# Kaar.Rentals - Premium Car Rental Platform

A modern, full-featured car rental platform built with React, TypeScript, and Supabase. This application provides a comprehensive solution for car rental businesses with advanced features including multi-language support, Google Maps integration, and sophisticated admin controls.

## 🚀 Key Features

### 🔐 Authentication & Security
- **Complete Website Protection**: Role-based authentication system protecting all routes
- **Admin Password Protection**: Additional security layer for admin dashboard access
- **User Role Management**: Customer, dealer, and admin role differentiation
- **Session Management**: Secure session handling with automatic expiry

### 🌍 Internationalization
- **Urdu Translation Toggle**: Complete Urdu language support with RTL layout
- **Dynamic Language Switching**: Real-time language switching without page reload
- **Localized Content**: All UI elements, labels, and messages translated
- **Cultural Adaptation**: Right-to-left text direction for Urdu

### 🗺️ Google Maps Integration
- **Location Mapping**: Interactive maps showing car locations and dealership branches
- **Multi-location Support**: Support for multiple pickup/drop-off locations
- **Custom Markers**: Branded markers with detailed information popups
- **Dark Theme Integration**: Maps styled to match the application's dark theme

### 📊 Real-time Statistics
- **Live Data**: Real-time statistics from Supabase database
- **Auto-updating**: Statistics update automatically when data changes
- **Comprehensive Metrics**: Total vehicles, brands, dealerships, and ratings
- **Performance Optimized**: Efficient subscriptions for live updates

### 🏢 Dealership Features
- **Enhanced Header Display**: Prominent dealership branding in header
- **Dealer Badge**: Visual indicators for dealer accounts
- **Custom Branding**: Personalized dealership names and information
- **Professional Presentation**: Enhanced visual styling for dealer presence

### 📦 Car Listing Packages
- **Basic Package**: Free standard listing (30 days)
- **Featured Package**: Enhanced visibility with priority placement (45 days, Rs 2,000)
- **Premium Package**: Maximum exposure with homepage featuring (60 days, Rs 5,000)
- **Package Benefits**: Each tier includes specific advantages and support levels

### 🚗 Extended Car Categories
- **Comprehensive Collection**: Sedan, SUV, Hatchback, Crossover, Coupe, Convertible
- **Luxury Vehicles**: Premium and luxury car categories
- **Commercial Options**: Vans and pickup trucks for business needs
- **Smart Categorization**: Easy browsing and filtering by vehicle type

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Maps**: Google Maps JavaScript API
- **Internationalization**: react-i18next
- **State Management**: React Query + Context API
- **Build Tool**: Vite
- **Deployment**: Vercel/Netlify ready

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Maps API key
- Supabase project

## 🚀 Quick Start

### 1. Clone and Install
```bash
git clone <repository-url>
cd kaar-rentals
npm install
```

### 2. Environment Setup
Create a `.env` file in the root directory:

```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_ADMIN_PASSWORD=your_secure_admin_password
```

### 3. Google Maps Setup
1. Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the following APIs:
   - Maps JavaScript API
   - Places API
3. Add your domain to the API key restrictions

### 4. Supabase Setup
1. Create a new Supabase project
2. Set up the required database tables (cars, profiles, etc.)
3. Configure Row Level Security (RLS) policies
4. Add your Supabase URL and anon key to `.env`

### 5. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` to see the application.

## 🔧 Configuration

### Admin Access
- Default admin password: `admin123` (change in production)
- Admin session expires after 24 hours
- Additional security layer beyond role-based authentication

### Language Configuration
- Default language: English (en)
- Secondary language: Urdu (ur) with RTL support
- Language preference stored in localStorage
- Automatic language detection from browser settings

### Maps Configuration
- Default center: Karachi, Pakistan (24.8607, 67.0011)
- Multiple branch locations supported
- Custom markers with info windows
- Dark theme integration

## 📱 Features Overview

### User Authentication
- Email/password authentication
- Role-based access control
- Protected routes throughout the application
- Secure session management

### Car Management
- Comprehensive car listing system
- Multiple car categories and types
- Feature-rich car profiles
- Image upload and management
- Package-based listing enhancement

### Admin Dashboard
- Complete car inventory management
- User and dealer management
- Advertisement management
- Real-time statistics and analytics
- Drag-and-drop reordering

### Internationalization
- English and Urdu language support
- RTL layout for Urdu
- Culturally appropriate translations
- Language toggle in header

### Location Services
- Google Maps integration
- Multiple branch locations
- Interactive location selection
- Custom map styling

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── admin/          # Admin-specific components
│   ├── Header.tsx      # Enhanced header with dealer support
│   ├── GoogleMap.tsx   # Maps integration
│   └── ...
├── pages/              # Application pages
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── i18n/               # Internationalization files
│   ├── config.ts       # i18n configuration
│   └── locales/        # Translation files
└── integrations/       # External service integrations
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Deploy to Netlify
1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables

## 🔒 Security Considerations

- Environment variables for sensitive data
- Admin password protection
- Role-based access control
- Secure session management
- API key restrictions
- Database row-level security

## 🌟 Advanced Features

### Real-time Updates
- Live statistics updates
- Real-time car availability
- Automatic data synchronization

### Enhanced UX
- Dark theme throughout
- Responsive design
- Loading states and animations
- Toast notifications
- Smooth transitions

### Performance
- Optimized bundle size
- Lazy loading
- Efficient API calls
- Caching strategies

## 📞 Support

For support and questions:
- Phone: 03090017510
- International: +923090017510
- Email: Contact through the application

## 📄 License

This project is proprietary software developed for Kaar.Rentals.

---

**Built with ❤️ using modern web technologies**
