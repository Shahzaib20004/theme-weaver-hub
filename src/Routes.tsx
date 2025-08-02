import React from 'react'
import { Routes as RouterRoutes, Route } from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'
import { Cars } from './pages/Cars'

// Lazy load pages for better performance
const Index = React.lazy(() => import('./pages/Index'))
const Login = React.lazy(() => import('./pages/Login'))
const Signup = React.lazy(() => import('./pages/Signup'))
const AddCar = React.lazy(() => import('./pages/AddCar'))
const Admin = React.lazy(() => import('./pages/Admin'))
const DealerDashboard = React.lazy(() => import('./pages/DealerDashboard'))
const DealerShowroom = React.lazy(() => import('./pages/DealerShowroom'))
const CarDetails = React.lazy(() => import('./pages/CarDetails'))
const Contact = React.lazy(() => import('./pages/Contact'))
const DailyOffers = React.lazy(() => import('./pages/DailyOffers'))
const Dealerships = React.lazy(() => import('./pages/Dealerships'))
const Services = React.lazy(() => import('./pages/Services'))
const Brands = React.lazy(() => import('./pages/Brands'))
const About = React.lazy(() => import('./pages/About'))
const Privacy = React.lazy(() => import('./pages/Privacy'))
const Terms = React.lazy(() => import('./pages/Terms'))
const NotFound = React.lazy(() => import('./pages/NotFound'))

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
  </div>
)

export const Routes: React.FC = () => {
  return (
    <RouterRoutes>
      {/* Public routes */}
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/cars" element={<Cars />} />
      
      {/* Lazy loaded routes with Suspense */}
      <Route path="/" element={
        <React.Suspense fallback={<LoadingSpinner />}>
          <Index />
        </React.Suspense>
      } />
      
      <Route path="/login" element={
        <React.Suspense fallback={<LoadingSpinner />}>
          <Login />
        </React.Suspense>
      } />
      
      <Route path="/signup" element={
        <React.Suspense fallback={<LoadingSpinner />}>
          <Signup />
        </React.Suspense>
      } />
      
      <Route path="/add-car" element={
        <React.Suspense fallback={<LoadingSpinner />}>
          <AddCar />
        </React.Suspense>
      } />
      
      <Route path="/admin" element={
        <React.Suspense fallback={<LoadingSpinner />}>
          <Admin />
        </React.Suspense>
      } />
      
      <Route path="/dealer-dashboard" element={
        <React.Suspense fallback={<LoadingSpinner />}>
          <DealerDashboard />
        </React.Suspense>
      } />
      
      <Route path="/dealer-showroom/:dealerId" element={
        <React.Suspense fallback={<LoadingSpinner />}>
          <DealerShowroom />
        </React.Suspense>
      } />
      
      <Route path="/car-details/:carId" element={
        <React.Suspense fallback={<LoadingSpinner />}>
          <CarDetails />
        </React.Suspense>
      } />
      
      <Route path="/contact" element={
        <React.Suspense fallback={<LoadingSpinner />}>
          <Contact />
        </React.Suspense>
      } />
      
      <Route path="/daily-offers" element={
        <React.Suspense fallback={<LoadingSpinner />}>
          <DailyOffers />
        </React.Suspense>
      } />
      
      <Route path="/dealerships" element={
        <React.Suspense fallback={<LoadingSpinner />}>
          <Dealerships />
        </React.Suspense>
      } />
      
      <Route path="/services" element={
        <React.Suspense fallback={<LoadingSpinner />}>
          <Services />
        </React.Suspense>
      } />
      
      <Route path="/brands" element={
        <React.Suspense fallback={<LoadingSpinner />}>
          <Brands />
        </React.Suspense>
      } />
      
      <Route path="/about" element={
        <React.Suspense fallback={<LoadingSpinner />}>
          <About />
        </React.Suspense>
      } />
      
      <Route path="/privacy" element={
        <React.Suspense fallback={<LoadingSpinner />}>
          <Privacy />
        </React.Suspense>
      } />
      
      <Route path="/terms" element={
        <React.Suspense fallback={<LoadingSpinner />}>
          <Terms />
        </React.Suspense>
      } />
      
      {/* Catch all route */}
      <Route path="*" element={
        <React.Suspense fallback={<LoadingSpinner />}>
          <NotFound />
        </React.Suspense>
      } />
    </RouterRoutes>
  )
}