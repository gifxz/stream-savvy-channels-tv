
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Tv, 
  CreditCard, 
  User, 
  LogOut
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface NavigationMenuProps {
  className?: string;
}

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
  requiresAuth?: boolean;
  hideWhenAuth?: boolean;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ className }) => {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const navItems: NavItem[] = [
    {
      name: "Home",
      path: "/",
      icon: Home,
    },
    {
      name: "Channels",
      path: "/channels",
      icon: Tv,
      requiresAuth: true,
    },
    {
      name: "Plans",
      path: "/plans",
      icon: CreditCard,
    },
    {
      name: "Account",
      path: "/account",
      icon: User,
      requiresAuth: true,
    },
    {
      name: "Sign In",
      path: "/signin",
      icon: User,
      hideWhenAuth: true,
    },
  ];

  const filteredNavItems = navItems.filter(item => {
    if (item.requiresAuth && !isAuthenticated) return false;
    if (item.hideWhenAuth && isAuthenticated) return false;
    return true;
  });

  return (
    <nav className={cn("p-2 flex flex-col gap-2", className)}>
      {filteredNavItems.map((item) => {
        const isActive = location.pathname === item.path;
        
        return (
          <Button
            key={item.name}
            variant={isActive ? "default" : "ghost"}
            className={cn(
              "justify-start p-2 h-10 tv-focus",
              isActive ? "bg-tv-primary text-white" : "text-tv-text-secondary hover:text-tv-text hover:bg-muted"
            )}
            asChild
          >
            <Link to={item.path}>
              <item.icon className="mr-2 h-5 w-5" />
              {item.name}
            </Link>
          </Button>
        );
      })}
      
      {isAuthenticated && (
        <Button
          variant="ghost"
          className="justify-start p-2 h-10 text-tv-text-secondary hover:text-tv-text hover:bg-muted tv-focus"
          onClick={logout}
        >
          <LogOut className="mr-2 h-5 w-5" />
          Sign Out
        </Button>
      )}
    </nav>
  );
};

export default NavigationMenu;
