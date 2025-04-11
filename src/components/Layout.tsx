
import React from "react";
import { Outlet } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import Logo from "@/components/Logo";
import NavigationMenu from "@/components/NavigationMenu";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Layout: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-tv-bg border-b border-muted">
        <div className="container flex h-16 items-center px-4">
          <Logo size="md" className="mr-4" />
          
          {isMobile ? (
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="ml-auto text-white"
                >
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-tv-bg border-r border-muted">
                <Logo size="md" className="mb-6" />
                <NavigationMenu />
              </SheetContent>
            </Sheet>
          ) : (
            <nav className="ml-auto flex gap-4">
              <NavigationMenu className="flex-row" />
            </nav>
          )}
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 container py-6 px-4">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="w-full bg-tv-bg border-t border-muted py-4">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Logo size="sm" />
            <div className="text-tv-text-secondary text-sm">
              © {new Date().getFullYear()} PPTV. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
