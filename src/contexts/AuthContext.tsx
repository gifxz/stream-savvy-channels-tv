
import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types";
import { mockUser } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check if user is logged in on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("pptv_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // This is a mock login - in a real app, you would call an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check mock credentials (for demo purposes)
      if (email === "user@example.com" && password === "password") {
        setUser(mockUser);
        localStorage.setItem("pptv_user", JSON.stringify(mockUser));
        toast({
          title: "Success",
          description: "You have successfully logged in",
        });
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("pptv_user");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // This is a mock registration - in a real app, you would call an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new user (for demo purposes)
      const newUser: User = {
        ...mockUser,
        id: `user-${Date.now()}`,
        email,
        name,
        subscriptionPlan: undefined,
        subscriptionStatus: "inactive",
      };
      
      setUser(newUser);
      localStorage.setItem("pptv_user", JSON.stringify(newUser));
      toast({
        title: "Success",
        description: "Your account has been created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Registration failed",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
