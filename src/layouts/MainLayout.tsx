
import { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { 
  Home, User, MessageSquare, Bell, Search, 
  Settings, Code, LogOut, Menu, X 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

// We'll add framer-motion for animations
<lov-add-dependency>framer-motion@10.12.4</lov-add-dependency>

const MainLayout = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null); // This would normally come from an auth context
  
  // Simulate fetching user data
  useEffect(() => {
    // Mock user data - in a real app, this would come from your API
    setUser({
      id: "1",
      username: "johndoe",
      displayName: "John Doe",
      avatarUrl: "https://i.pravatar.cc/150?u=john"
    });
  }, []);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  
  const handleLogout = () => {
    // In a real app, this would call your logout API
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/auth");
  };
  
  // Animation variants for page transitions
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 10,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.2,
      },
    },
  };
  
  // Navigation items
  const navItems = [
    { to: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
    { to: `/profile/${user?.username}`, label: "Profile", icon: <User className="w-5 h-5" /> },
    { to: "/chat", label: "Messages", icon: <MessageSquare className="w-5 h-5" /> },
    { to: "/notifications", label: "Notifications", icon: <Bell className="w-5 h-5" /> },
    { to: "/explore", label: "Explore", icon: <Search className="w-5 h-5" /> },
    { to: "/settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
    { to: "/api-playground", label: "API Playground", icon: <Code className="w-5 h-5" /> },
  ];
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Mobile Header */}
      {isMobile && (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b flex justify-between items-center px-4 py-3">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <h1 className="ml-2 text-xl font-display font-bold text-primary">SocialSphere</h1>
          </div>
          
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatarUrl} />
            <AvatarFallback>
              {user?.displayName?.slice(0, 2) || "JD"}
            </AvatarFallback>
          </Avatar>
        </header>
      )}
      
      {/* Mobile Navigation - Slide in menu */}
      {isMobile && (
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 left-0 bottom-0 z-40 w-64 bg-background border-r pt-16 flex flex-col"
            >
              <div className="flex-1 overflow-y-auto p-3">
                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <NavLink 
                      key={item.to} 
                      to={item.to}
                      onClick={closeMenu}
                      className={({ isActive }) => `
                        flex items-center gap-3 px-4 py-3 text-sm rounded-md transition-colors
                        ${isActive 
                          ? "bg-primary text-primary-foreground font-medium" 
                          : "hover:bg-muted text-foreground"
                        }
                      `}
                    >
                      {item.icon}
                      {item.label}
                    </NavLink>
                  ))}
                </nav>
              </div>
              
              <div className="p-3 border-t">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-sm px-4 py-3"
                  onClick={handleLogout}
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Log out
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
      
      {/* Desktop Navigation - Fixed Sidebar */}
      {!isMobile && (
        <aside className="fixed top-0 left-0 bottom-0 w-64 border-r bg-background flex flex-col">
          <div className="p-5">
            <h1 className="text-xl font-display font-bold text-primary">SocialSphere</h1>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavLink 
                  key={item.to} 
                  to={item.to}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3 text-sm rounded-md transition-colors
                    ${isActive 
                      ? "bg-primary text-primary-foreground font-medium" 
                      : "hover:bg-muted text-foreground"
                    }
                  `}
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
          
          <div className="p-3 border-t mt-auto">
            {user && (
              <div className="flex items-center p-2 mb-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatarUrl} />
                  <AvatarFallback>
                    {user.displayName?.slice(0, 2) || "JD"}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-2">
                  <p className="text-sm font-medium">{user.displayName}</p>
                  <p className="text-xs text-muted-foreground">@{user.username}</p>
                </div>
              </div>
            )}
            
            <Button 
              variant="ghost" 
              className="w-full justify-start text-sm"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-2" />
              Log out
            </Button>
          </div>
        </aside>
      )}
      
      {/* Main Content */}
      <main className={`flex-1 ${!isMobile ? "ml-64" : "mt-14"}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            className="min-h-screen"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default MainLayout;
