import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cars from "./pages/Cars";
import AddCar from "./pages/AddCar";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import DailyOffers from "./pages/DailyOffers";
import Dealerships from "./pages/Dealerships";
import Services from "./pages/Services";
import Brands from "./pages/Brands";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/add-car" element={<AddCar />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/daily-offers" element={<DailyOffers />} />
          <Route path="/dealerships" element={<Dealerships />} />
          <Route path="/services" element={<Services />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/about" element={<About />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
