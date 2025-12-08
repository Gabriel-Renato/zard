import { useState } from "react";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  LayoutDashboard, 
  BookOpen, 
  Layers,
  CreditCard,
  Settings, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Matérias", icon: BookOpen, path: "/dashboard/materias" },
  { label: "Flashcards", icon: CreditCard, path: "/dashboard/flashcards" },
  { label: "Configurações", icon: Settings, path: "/dashboard/configuracoes" },
];

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({ title: "Até logo!", description: "Você foi desconectado." });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-card rounded-xl shadow-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-card border-r border-border p-6
        transform transition-transform duration-300 lg:transform-none
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Link to="/" className="flex items-center gap-2 mb-10">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Zap className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">Zard</span>
        </Link>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant={location.pathname === item.path ? "secondary" : "ghost"}
              className="w-full justify-start gap-3"
              asChild
            >
              <Link to={item.path} onClick={() => setIsSidebarOpen(false)}>
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Button variant="ghost" className="w-full justify-start gap-3 text-destructive" onClick={handleLogout}>
            <LogOut className="w-5 h-5" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-foreground/20 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 pt-16 lg:pt-10">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
