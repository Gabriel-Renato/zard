import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, ArrowLeft, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EmAnalise = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Verificar se o usuário ainda está logado
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    toast({ title: "Você foi desconectado" });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Decoration */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para o início
        </Link>

        <Card className="border-2">
          <CardHeader className="text-center pb-2">
            <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-10 h-10 text-yellow-600" />
            </div>
            <CardTitle className="text-2xl">Cadastro em Análise</CardTitle>
            <CardDescription>
              Seu cadastro está aguardando aprovação do administrador
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6 space-y-6">
            <div className="text-center space-y-2">
              <p className="text-muted-foreground">
                Sua solicitação de cadastro foi recebida e está sendo analisada pelo administrador.
              </p>
              <p className="text-sm text-muted-foreground">
                Você receberá um email quando seu cadastro for aprovado e poderá acessar todas as funcionalidades do sistema.
              </p>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>O que acontece agora?</strong>
              </p>
              <ul className="text-sm text-yellow-700 dark:text-yellow-300 mt-2 space-y-1 list-disc list-inside">
                <li>Seu cadastro está em análise</li>
                <li>Você receberá um email quando for aprovado</li>
                <li>Após a aprovação, poderá fazer login normalmente</li>
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <Button variant="outline" onClick={handleLogout} className="w-full">
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
              <Button variant="ghost" asChild className="w-full">
                <Link to="/">Voltar para o início</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default EmAnalise;

