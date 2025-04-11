
import React from "react";
import { NavLink } from "react-router-dom";
import {
  NavigationMenu as Nav,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User } from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const NavigationMenu: React.FC = () => {
  const { isAuthenticated, isAdmin, logout, user } = useAuth();
  const isMobile = useMobile();

  if (isMobile) {
    return (
      <div className="flex gap-4">
        {isAuthenticated ? (
          <Nav className="max-w-none w-full">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-3 w-[200px]">
                    <li>
                      <NavLink 
                        to="/" 
                        className={({ isActive }) => cn(
                          "block p-2 hover:bg-muted rounded-md",
                          isActive && "bg-muted"
                        )}
                      >
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink 
                        to="/channels" 
                        className={({ isActive }) => cn(
                          "block p-2 hover:bg-muted rounded-md",
                          isActive && "bg-muted"
                        )}
                      >
                        Channels
                      </NavLink>
                    </li>
                    <li>
                      <NavLink 
                        to="/account" 
                        className={({ isActive }) => cn(
                          "block p-2 hover:bg-muted rounded-md",
                          isActive && "bg-muted"
                        )}
                      >
                        Account
                      </NavLink>
                    </li>
                    <li>
                      <NavLink 
                        to="/plans" 
                        className={({ isActive }) => cn(
                          "block p-2 hover:bg-muted rounded-md",
                          isActive && "bg-muted"
                        )}
                      >
                        Plans
                      </NavLink>
                    </li>
                    {isAdmin && (
                      <li>
                        <NavLink 
                          to="/admin" 
                          className={({ isActive }) => cn(
                            "block p-2 hover:bg-muted rounded-md text-tv-primary",
                            isActive && "bg-muted"
                          )}
                        >
                          Admin Panel
                        </NavLink>
                      </li>
                    )}
                    <li>
                      <button 
                        onClick={logout}
                        className="w-full text-left flex items-center p-2 text-red-500 hover:bg-muted rounded-md"
                      >
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </button>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </Nav>
        ) : (
          <>
            <NavLink to="/signin">
              <Button variant="ghost">Sign In</Button>
            </NavLink>
            <NavLink to="/signup">
              <Button>Sign Up</Button>
            </NavLink>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Nav className="max-w-none">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavLink to="/">
              <NavigationMenuLink className={({ isActive }: { isActive: boolean }) => cn(
                "px-4 py-2 hover:text-tv-primary transition-colors",
                isActive ? "text-tv-primary font-medium" : "text-tv-text-secondary"
              )}>
                Home
              </NavigationMenuLink>
            </NavLink>
          </NavigationMenuItem>
          {isAuthenticated && (
            <NavigationMenuItem>
              <NavLink to="/channels">
                <NavigationMenuLink className={({ isActive }: { isActive: boolean }) => cn(
                  "px-4 py-2 hover:text-tv-primary transition-colors",
                  isActive ? "text-tv-primary font-medium" : "text-tv-text-secondary"
                )}>
                  Channels
                </NavigationMenuLink>
              </NavLink>
            </NavigationMenuItem>
          )}
          <NavigationMenuItem>
            <NavLink to="/plans">
              <NavigationMenuLink className={({ isActive }: { isActive: boolean }) => cn(
                "px-4 py-2 hover:text-tv-primary transition-colors",
                isActive ? "text-tv-primary font-medium" : "text-tv-text-secondary"
              )}>
                Plans
              </NavigationMenuLink>
            </NavLink>
          </NavigationMenuItem>
          {isAdmin && (
            <NavigationMenuItem>
              <NavLink to="/admin">
                <NavigationMenuLink className={({ isActive }: { isActive: boolean }) => cn(
                  "px-4 py-2 hover:text-tv-primary transition-colors font-medium",
                  isActive ? "text-tv-primary" : "text-tv-primary/80"
                )}>
                  Admin
                </NavigationMenuLink>
              </NavLink>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </Nav>

      {isAuthenticated ? (
        <div className="flex items-center gap-2">
          <NavLink to="/account">
            <Button 
              variant="ghost" 
              className="flex items-center gap-2"
            >
              <User size={18} />
              {user?.name || "Account"}
            </Button>
          </NavLink>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <NavLink to="/signin">
            <Button variant="ghost">Sign In</Button>
          </NavLink>
          <NavLink to="/signup">
            <Button>Sign Up</Button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default NavigationMenu;
