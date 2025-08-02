import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Lock, User, Phone, Eye, EyeOff, Chrome, Apple } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Logo from "@/components/Logo";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [signupMethod, setSignupMethod] = useState<"email" | "phone">("email");
  const [isPhoneVerification, setIsPhoneVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  
  const [emailFormData, setEmailFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: ""
  });

  const [phoneFormData, setPhoneFormData] = useState({
    fullName: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: ""
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return "Password must be at least 8 characters long";
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter";
    }
    if (!hasNumbers) {
      return "Password must contain at least one number";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character";
    }
    return null;
  };

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^(\+92|92|0)?[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/[\s-]/g, ''));
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (emailFormData.password !== emailFormData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    const passwordError = validatePassword(emailFormData.password);
    if (passwordError) {
      toast({
        title: "Invalid Password",
        description: passwordError,
        variant: "destructive",
      });
      return;
    }

    if (!emailFormData.userType) {
      toast({
        title: "User Type Required",
        description: "Please select whether you're a customer or dealer",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: emailFormData.email,
        password: emailFormData.password,
        options: {
          data: {
            full_name: emailFormData.fullName,
            user_type: emailFormData.userType,
            is_dealer: emailFormData.userType === "dealer"
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Account Created!",
        description: "Please check your email to verify your account.",
      });

      navigate("/login");
    } catch (error: any) {
      toast({
        title: "Signup Failed",
        description: error.message || "Failed to create account",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePhoneNumber(phoneFormData.phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid Pakistani phone number",
        variant: "destructive",
      });
      return;
    }

    if (phoneFormData.password !== phoneFormData.confirmPassword) {
      toast({
        title: "Password Mismatch", 
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    const passwordError = validatePassword(phoneFormData.password);
    if (passwordError) {
      toast({
        title: "Invalid Password",
        description: passwordError,
        variant: "destructive",
      });
      return;
    }

    if (!phoneFormData.userType) {
      toast({
        title: "User Type Required",
        description: "Please select whether you're a customer or dealer",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // For now, simulate phone verification process
      setIsPhoneVerification(true);
      toast({
        title: "Verification Code Sent",
        description: `We've sent a verification code to ${phoneFormData.phone}`,
      });
    } catch (error: any) {
      toast({
        title: "Signup Failed",
        description: error.message || "Failed to send verification code",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (verificationCode.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter the 6-digit verification code",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // For demo purposes, accept any 6-digit code
      // In production, you would verify with your SMS service
      const tempEmail = `${phoneFormData.phone.replace(/\D/g, '')}@temp.kaar.rentals`;
      
      const { data, error } = await supabase.auth.signUp({
        email: tempEmail,
        password: phoneFormData.password,
        options: {
          data: {
            full_name: phoneFormData.fullName,
            phone: phoneFormData.phone,
            user_type: phoneFormData.userType,
            is_dealer: phoneFormData.userType === "dealer",
            signup_method: "phone"
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Account Created!",
        description: "Your phone number has been verified and account created.",
      });

      navigate("/login");
    } catch (error: any) {
      toast({
        title: "Verification Failed",
        description: error.message || "Failed to verify phone number",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });

      if (error) throw error;

      toast({
        title: "Redirecting to Google",
        description: "Please complete the signup process with Google",
      });
    } catch (error: any) {
      toast({
        title: "Google Signup Failed",
        description: error.message || "Failed to signup with Google",
        variant: "destructive",
      });
    }
  };

  const handleAppleSignup = () => {
    toast({
      title: "Apple Sign-In",
      description: "Apple Sign-In will be available soon!",
    });
  };

  if (isPhoneVerification) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-surface via-background to-dark-surface flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Card className="border-border bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Logo size="lg" />
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">
                Verify Phone Number
              </CardTitle>
              <p className="text-muted-foreground">
                Enter the 6-digit code sent to {phoneFormData.phone}
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePhoneVerification} className="space-y-4">
                <div>
                  <Label htmlFor="verification-code">Verification Code</Label>
                  <Input
                    id="verification-code"
                    type="text"
                    maxLength={6}
                    placeholder="000000"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                    className="text-center text-2xl tracking-widest"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-gold to-gold-dark hover:from-gold/90 hover:to-gold-dark/90 text-dark font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? "Verifying..." : "Verify & Create Account"}
                </Button>

                <div className="text-center">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setIsPhoneVerification(false)}
                    className="text-muted-foreground hover:text-gold"
                  >
                    Back to Phone Signup
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-surface via-background to-dark-surface flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Card className="border-border bg-card/50 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Logo size="lg" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Create Your Account
            </CardTitle>
            <p className="text-muted-foreground">
              Join Kaar.Rentals and start your car rental journey
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Social Login Options */}
            <div className="space-y-3">
              <Button
                onClick={handleGoogleSignup}
                variant="outline"
                className="w-full border-border hover:border-gold/50"
              >
                <Chrome className="w-4 h-4 mr-2" />
                Continue with Google
              </Button>
              <Button
                onClick={handleAppleSignup}
                variant="outline"
                className="w-full border-border hover:border-gold/50"
              >
                <Apple className="w-4 h-4 mr-2" />
                Continue with Apple
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Email/Phone Tabs */}
            <Tabs value={signupMethod} onValueChange={(value: "email" | "phone") => setSignupMethod(value)}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="phone">Phone</TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="space-y-4 mt-6">
                <form onSubmit={handleEmailSignup} className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="John Doe"
                        value={emailFormData.fullName}
                        onChange={(e) => setEmailFormData({ ...emailFormData, fullName: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={emailFormData.email}
                        onChange={(e) => setEmailFormData({ ...emailFormData, email: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="userType">I am a</Label>
                    <Select value={emailFormData.userType} onValueChange={(value) => setEmailFormData({ ...emailFormData, userType: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="customer">Customer (Rent cars)</SelectItem>
                        <SelectItem value="dealer">Car Owner/Dealer (List cars)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={emailFormData.password}
                        onChange={(e) => setEmailFormData({ ...emailFormData, password: e.target.value })}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={emailFormData.confirmPassword}
                        onChange={(e) => setEmailFormData({ ...emailFormData, confirmPassword: e.target.value })}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-gold to-gold-dark hover:from-gold/90 hover:to-gold-dark/90 text-dark font-semibold"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="phone" className="space-y-4 mt-6">
                <form onSubmit={handlePhoneSignup} className="space-y-4">
                  <div>
                    <Label htmlFor="fullNamePhone">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="fullNamePhone"
                        type="text"
                        placeholder="John Doe"
                        value={phoneFormData.fullName}
                        onChange={(e) => setPhoneFormData({ ...phoneFormData, fullName: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="phoneNumber"
                        type="tel"
                        placeholder="+92 300 1234567"
                        value={phoneFormData.phone}
                        onChange={(e) => setPhoneFormData({ ...phoneFormData, phone: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      We'll send a verification code to this number
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="userTypePhone">I am a</Label>
                    <Select value={phoneFormData.userType} onValueChange={(value) => setPhoneFormData({ ...phoneFormData, userType: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="customer">Customer (Rent cars)</SelectItem>
                        <SelectItem value="dealer">Car Owner/Dealer (List cars)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="passwordPhone">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="passwordPhone"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={phoneFormData.password}
                        onChange={(e) => setPhoneFormData({ ...phoneFormData, password: e.target.value })}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="confirmPasswordPhone">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="confirmPasswordPhone"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={phoneFormData.confirmPassword}
                        onChange={(e) => setPhoneFormData({ ...phoneFormData, confirmPassword: e.target.value })}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-gold to-gold-dark hover:from-gold/90 hover:to-gold-dark/90 text-dark font-semibold"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending Code..." : "Send Verification Code"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="text-center text-sm">
              <p className="text-muted-foreground">
                By creating an account, you agree to our{" "}
                <Link to="/terms" className="text-gold hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-gold hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-gold hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;