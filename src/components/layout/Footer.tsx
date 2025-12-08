import { Link } from "react-router-dom";
import { Zap, Mail, Github, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold">Zard</span>
            </Link>
            <p className="text-primary-foreground/70 max-w-md mb-6">
              Transforme seu aprendizado com flashcards inteligentes. Organize suas matérias, 
              crie cartões de memória e acelere seu conhecimento.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Produto</h4>
            <ul className="space-y-3">
              <li><a href="#como-funciona" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Como Funciona</a></li>
              <li><a href="#beneficios" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Benefícios</a></li>
              <li><a href="#depoimentos" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Depoimentos</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Privacidade</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Contato</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-primary-foreground/50">
          <p>&copy; {new Date().getFullYear()} Zard. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
