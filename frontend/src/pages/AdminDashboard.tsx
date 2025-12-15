import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  UserCheck, 
  BarChart3,
  Clock,
  Mail,
  ArrowRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import apiService from "@/services/api";

const AdminDashboard = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [stats, setStats] = useState({
    total_usuarios: 0,
    solicitacoes_pendentes: 0,
    aprovados_hoje: 0,
    total_flashcards: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
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
        setRequests(solicitacoesRes.data.slice(0, 5)); // Mostrar apenas 5 primeiras
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

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          <p className="text-muted-foreground">Visão geral do sistema</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Total de Usuários", value: stats.total_usuarios, icon: Users, color: "bg-primary", link: "/admin/usuarios" },
          { label: "Solicitações Pendentes", value: stats.solicitacoes_pendentes, icon: Clock, color: "bg-accent", link: "/admin/solicitacoes" },
          { label: "Aprovados Hoje", value: stats.aprovados_hoje, icon: UserCheck, color: "bg-green-500", link: "/admin/solicitacoes" },
          { label: "Flashcards Criados", value: stats.total_flashcards.toLocaleString(), icon: BarChart3, color: "bg-zard-coral", link: null },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            {stat.link ? (
              <Link to={stat.link}>
                <Card className="hover:bg-secondary/50 transition-colors cursor-pointer">
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
              </Link>
            ) : (
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
            )}
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Link to="/admin/usuarios">
          <Card className="hover:bg-secondary/50 transition-colors cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold mb-1">Gerenciar Usuários</p>
                  <p className="text-sm text-muted-foreground">Ver e editar todos os usuários</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/admin/solicitacoes">
          <Card className="hover:bg-secondary/50 transition-colors cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold mb-1">Ver Solicitações</p>
                  <p className="text-sm text-muted-foreground">Aprovar ou rejeitar solicitações</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/admin/configuracoes">
          <Card className="hover:bg-secondary/50 transition-colors cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold mb-1">Configurações</p>
                  <p className="text-sm text-muted-foreground">Configurar o sistema</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Requests */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                Solicitações Pendentes Recentes
              </CardTitle>
              <CardDescription>
                Últimas solicitações aguardando aprovação
              </CardDescription>
            </div>
            <Button variant="outline" asChild>
              <Link to="/admin/solicitacoes">
                Ver todas
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
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
                        {request.nome.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">{request.nome}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {request.email}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(request.criado_em).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/admin/solicitacoes">
                      Ver detalhes
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
