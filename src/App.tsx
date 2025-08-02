import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import "@/i18n/config";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Cars from "./pages/Cars";
import AddCar from "./pages/AddCar";
import Admin from "./pages/Admin";
import DealerDashboard from "./pages/DealerDashboard";
import DealerShowroom from "./pages/DealerShowroom";
import CarDetails from "./pages/CarDetails";
import Contact from "./pages/Contact";
import DailyOffers from "./pages/DailyOffers";
import Dealerships from "./pages/Dealerships";
import Services from "./pages/Services";
import Brands from "./pages/Brands";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import PublicHome from "./pages/PublicHome";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<PublicHome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/" element={<PublicHome />} />
            <Route path="/dashboard" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/cars" element={<ProtectedRoute><Cars /></ProtectedRoute>} />
            <Route path="/add-car" element={<ProtectedRoute><AddCar /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute requireAdmin={true}><Admin /></ProtectedRoute>} />
            <Route path="/dealer-dashboard" element={<ProtectedRoute><DealerDashboard /></ProtectedRoute>} />
            <Route path="/dealer-showroom/:dealerId" element={<ProtectedRoute><DealerShowroom /></ProtectedRoute>} />
            <Route path="/car-details/:carId" element={<ProtectedRoute><CarDetails /></ProtectedRoute>} />
            <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
            <Route path="/daily-offers" element={<ProtectedRoute><DailyOffers /></ProtectedRoute>} />
            <Route path="/dealerships" element={<ProtectedRoute><Dealerships /></ProtectedRoute>} />
            <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
            <Route path="/brands" element={<ProtectedRoute><Brands /></ProtectedRoute>} />
            <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
