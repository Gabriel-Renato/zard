import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Zap className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">Zard</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#como-funciona" className="text-muted-foreground hover:text-foreground transition-colors">
            Como Funciona
          </a>
          <a href="#beneficios" className="text-muted-foreground hover:text-foreground transition-colors">
            Benefícios
          </a>
          <a href="#depoimentos" className="text-muted-foreground hover:text-foreground transition-colors">
            Depoimentos
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" asChild>
            <Link to="/login">Entrar</Link>
          </Button>
          <Button variant="hero" asChild>
            <Link to="/solicitar-cadastro">Começar Agora</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
