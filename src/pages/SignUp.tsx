
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "@/components/Logo";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...formErrors };
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }
    
    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      valid = false;
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      valid = false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions";
      valid = false;
    }
    
    setFormErrors(newErrors);
    return valid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await register(formData.email, formData.password, formData.name);
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center py-8">
      <Card className="w-full max-w-md bg-tv-card">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
          <CardTitle className="text-3xl">Create an Account</CardTitle>
          <CardDescription>
            Sign up to start watching your favorite channels
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className={`bg-muted ${formErrors.name ? "border-red-500" : ""}`}
              />
              {formErrors.name && (
                <p className="text-red-500 text-sm">{formErrors.name}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                className={`bg-muted ${formErrors.email ? "border-red-500" : ""}`}
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm">{formErrors.email}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className={`bg-muted ${formErrors.password ? "border-red-500" : ""}`}
              />
              {formErrors.password && (
                <p className="text-red-500 text-sm">{formErrors.password}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`bg-muted ${formErrors.confirmPassword ? "border-red-500" : ""}`}
              />
              {formErrors.confirmPassword && (
                <p className="text-red-500 text-sm">{formErrors.confirmPassword}</p>
              )}
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onCheckedChange={(checked) => {
                  setFormData((prev) => ({ ...prev, agreeTerms: checked as boolean }));
                  if (checked) {
                    setFormErrors((prev) => ({ ...prev, agreeTerms: "" }));
                  }
                }}
              />
              <Label htmlFor="agreeTerms" className="text-sm leading-tight">
                I agree to the{" "}
                <a href="#" className="text-tv-secondary hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-tv-secondary hover:underline">
                  Privacy Policy
                </a>
              </Label>
            </div>
            {formErrors.agreeTerms && (
              <p className="text-red-500 text-sm">{formErrors.agreeTerms}</p>
            )}
            
            <Button 
              type="submit" 
              className="w-full tv-btn bg-tv-primary hover:bg-tv-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <p className="text-tv-text-secondary text-sm">
            Already have an account?{" "}
            <Link to="/signin" className="text-tv-secondary font-medium hover:underline">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
