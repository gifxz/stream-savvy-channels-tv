
import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types";
import { mockUser } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { DatabaseService } from "@/services/DatabaseService";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
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
    // Initialize database
    DatabaseService.init();
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Check if the user exists in our mock database
      const users = DatabaseService.getUsers();
      const foundUser = users.find(u => u.email === email);
      
      // For demo purposes, we're not actually checking the password
      // In a real app, you would hash and compare passwords
      if (foundUser) {
        // Update last login
        const updatedUser = {
          ...foundUser,
          lastLogin: new Date().toISOString()
        };
        DatabaseService.updateUser(updatedUser);
        setUser(updatedUser);
        localStorage.setItem("pptv_user", JSON.stringify(updatedUser));
        toast({
          title: "Success",
          description: "You have successfully logged in",
        });
      } else if (email === "admin@example.com" && password === "admin123") {
        // Default admin user
        const adminUser: User = {
          id: "admin-1",
          email: "admin@example.com",
          name: "Administrator",
          role: "admin",
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        };
        DatabaseService.addUser(adminUser);
        setUser(adminUser);
        localStorage.setItem("pptv_user", JSON.stringify(adminUser));
        toast({
          title: "Admin Login",
          description: "You have successfully logged in as administrator",
        });
      } else if (email === "user@example.com" && password === "password") {
        // Default regular user
        const regularUser = {
          ...mockUser,
          lastLogin: new Date().toISOString()
        };
        DatabaseService.addUser(regularUser);
        setUser(regularUser);
        localStorage.setItem("pptv_user", JSON.stringify(regularUser));
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
      // Check if the user already exists
      const users = DatabaseService.getUsers();
      const userExists = users.some(u => u.email === email);
      
      if (userExists) {
        throw new Error("User with this email already exists");
      }
      
      // Create a new user
      const newUser: User = {
        ...mockUser,
        id: `user-${Date.now()}`,
        email,
        name,
        role: "user",
        subscriptionPlan: undefined,
        subscriptionStatus: "inactive",
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };
      
      DatabaseService.addUser(newUser);
      setUser(newUser);
      localStorage.setItem("pptv_user", JSON.stringify(newUser));
      toast({
        title: "Success",
        description: "Your account has been created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Registration failed",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    if (!user) return;
    
    try {
      const updatedUser = { ...user, ...userData };
      DatabaseService.updateUser(updatedUser);
      setUser(updatedUser);
      localStorage.setItem("pptv_user", JSON.stringify(updatedUser));
      toast({
        title: "Success",
        description: "User profile updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user profile",
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        logout,
        register,
        updateUser,
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
