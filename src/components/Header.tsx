import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap, LogOut, User, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

interface HeaderProps {
  onLogout?: () => void;
  user?: { name: string; role: string } | null;
}

export const Header = ({ onLogout, user }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <header className="glass-strong sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-1.5 md:p-2 bg-white/20 backdrop-blur-sm rounded-lg group-hover:bg-white/30 transition-all duration-300">
              <GraduationCap className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-medium text-base md:text-lg text-white">UMEED</h1>
              <p className="text-[10px] md:text-xs text-white/60">Student Success Platform / छात्र सफलता मंच</p>
            </div>
            <div className="sm:hidden">
              <h1 className="font-medium text-base text-white">UMEED</h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {!isLanding && user && (
              <>
                <Link
                  to="/dashboard"
                  className={`text-sm font-medium transition-all duration-300 hover:text-white ${
                    location.pathname === "/dashboard" ? "text-white" : "text-white/70"
                  }`}
                >
                  Dashboard / डैशबोर्ड
                </Link>
                <Link
                  to="/students"
                  className={`text-sm font-medium transition-all duration-300 hover:text-white ${
                    location.pathname === "/students" ? "text-white" : "text-white/70"
                  }`}
                >
                  Students / छात्र
                </Link>
                <Link
                  to="/upload"
                  className={`text-sm font-medium transition-all duration-300 hover:text-white ${
                    location.pathname === "/upload" ? "text-white" : "text-white/70"
                  }`}
                >
                  Data Upload / डेटा अपलोड
                </Link>
              </>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2 md:space-x-4">
            <ThemeToggle />
            
            {user ? (
              <>
                <div className="hidden lg:flex items-center space-x-2 text-sm">
                  <User className="h-4 w-4 text-white/70" />
                  <span className="font-medium text-white">{user.name}</span>
                  <span className="text-white/60">({user.role})</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  <span className="hidden lg:inline">Logout / लॉगआउट</span>
                  <span className="lg:hidden">Logout</span>
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="glass" size="sm" className="text-white border-white/25">
                  <span className="hidden lg:inline">Login / लॉगिन</span>
                  <span className="lg:hidden">Login</span>
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:bg-white/10"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 animate-fade-in border-t border-white/10 pt-4">
            {!isLanding && user && (
              <>
                <Link
                  to="/dashboard"
                  className={`block text-sm font-medium py-2 transition-all duration-300 hover:text-white ${
                    location.pathname === "/dashboard" ? "text-white" : "text-white/70"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard / डैशबोर्ड
                </Link>
                <Link
                  to="/students"
                  className={`block text-sm font-medium py-2 transition-all duration-300 hover:text-white ${
                    location.pathname === "/students" ? "text-white" : "text-white/70"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Students / छात्र
                </Link>
                <Link
                  to="/upload"
                  className={`block text-sm font-medium py-2 transition-all duration-300 hover:text-white ${
                    location.pathname === "/upload" ? "text-white" : "text-white/70"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Data Upload / डेटा अपलोड
                </Link>
              </>
            )}
            
            {user ? (
              <>
                <div className="flex items-center space-x-2 text-sm py-2 border-t border-white/10 pt-3">
                  <User className="h-4 w-4 text-white/70" />
                  <span className="font-medium text-white">{user.name}</span>
                  <span className="text-white/50 text-xs">({user.role})</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    onLogout?.();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout / लॉगआउट
                </Button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="glass" size="sm" className="w-full text-white border-white/25">
                  Login / लॉगिन
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
