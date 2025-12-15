import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Zap, 
  Users, 
  UserCheck, 
  UserX, 
  Settings, 
  LogOut, 
  BarChart3,
  Clock,
  CheckCircle,
  XCircle,
  Mail
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import apiService from "@/services/api";

interface Solicitacao {
  id: number;
  nome: string;
  email: string;
  motivo: string;
  criado_em: string;
}

const AdminDashboard = () => {
  const [requests, setRequests] = useState<Solicitacao[]>([]);
  const [stats, setStats] = useState({
    total_usuarios: 0,
    solicitacoes_pendentes: 0,
    aprovados_hoje: 0,
    total_flashcards: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [solicitacoesRes, statsRes] = await Promise.all([
        apiService.listarSolicitacoes('pendente'),
        apiService.obterEstatisticas()
      ]);

      if (solicitacoesRes.success && solicitacoesRes.data) {
        setRequests(solicitacoesRes.data);
      }

      if (statsRes.success && statsRes.data) {
        setStats(statsRes.data);
      }
    } catch (error: any) {
      toast({ 
        title: "Erro", 
        description: error.message || "Erro ao carregar dados", 
        variant: "destructive" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (id: number) => {
    try {
      await apiService.atualizarSolicitacao(id, 'aprovado');
      toast({
        title: "Usuário aprovado!",
        description: "Um email foi enviado com as instruções de acesso.",
      });
      await loadData();
    } catch (error: any) {
      toast({ 
        title: "Erro", 
        description: error.message || "Erro ao aprovar solicitação", 
        variant: "destructive" 
      });
    }
  };

  const handleReject = async (id: number) => {
    try {
      await apiService.atualizarSolicitacao(id, 'rejeitado');
      toast({
        title: "Solicitação rejeitada",
        description: "O usuário foi notificado por email.",
        variant: "destructive",
      });
      await loadData();
    } catch (error: any) {
      toast({ 
        title: "Erro", 
        description: error.message || "Erro ao rejeitar solicitação", 
        variant: "destructive" 
      });
    }
  };

  const handleLogout = () => {
    toast({ title: "Até logo!", description: "Você foi desconectado." });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border p-6 hidden lg:block">
        <Link to="/" className="flex items-center gap-2 mb-10">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Zap className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">Zard Admin</span>
        </Link>

        <nav className="space-y-2">
          <Button variant="secondary" className="w-full justify-start gap-3">
            <BarChart3 className="w-5 h-5" />
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3">
            <Users className="w-5 h-5" />
            Usuários
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3">
            <Clock className="w-5 h-5" />
            Solicitações
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3">
            <Settings className="w-5 h-5" />
            Configurações
          </Button>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Button variant="ghost" className="w-full justify-start gap-3 text-destructive" onClick={handleLogout}>
            <LogOut className="w-5 h-5" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-6 lg:p-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold">Painel Administrativo</h1>
            <p className="text-muted-foreground">Gerencie usuários e solicitações</p>
          </div>
          <Button variant="ghost" className="lg:hidden" onClick={handleLogout}>
            <LogOut className="w-5 h-5" />
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Total de Usuários", value: stats.total_usuarios, icon: Users, color: "bg-primary" },
            { label: "Solicitações Pendentes", value: stats.solicitacoes_pendentes, icon: Clock, color: "bg-accent" },
            { label: "Aprovados Hoje", value: stats.aprovados_hoje, icon: UserCheck, color: "bg-zard-sage" },
            { label: "Flashcards Criados", value: stats.total_flashcards.toLocaleString(), icon: BarChart3, color: "bg-zard-coral" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Pending Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent" />
              Solicitações Pendentes
            </CardTitle>
            <CardDescription>
              Aprove ou rejeite as solicitações de novos usuários
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-10 text-muted-foreground">
                <p>Carregando...</p>
              </div>
            ) : requests.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                <UserCheck className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Nenhuma solicitação pendente</p>
              </div>
            ) : (
              <div className="space-y-4">
                {requests.map((request, i) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-bold text-primary">
                          {request.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold">{request.nome}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {request.email}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Motivo: {request.motivo}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Data: {new Date(request.criado_em).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => handleReject(request.id)}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Rejeitar
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleApprove(request.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Aprovar
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
