import { useState } from "react";
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

// Mock data for pending requests
const mockRequests = [
  { id: 1, nome: "Carlos Silva", email: "carlos@email.com", motivo: "Estudar para OAB", data: "2024-01-15" },
  { id: 2, nome: "Ana Paula", email: "ana@email.com", motivo: "Vestibular Medicina", data: "2024-01-14" },
  { id: 3, nome: "Pedro Santos", email: "pedro@email.com", motivo: "Concurso Federal", data: "2024-01-13" },
];

const mockStats = {
  totalUsers: 156,
  pendingRequests: 3,
  approvedToday: 5,
  totalFlashcards: 12450,
};

const AdminDashboard = () => {
  const [requests, setRequests] = useState(mockRequests);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleApprove = (id: number) => {
    setRequests(requests.filter(r => r.id !== id));
    toast({
      title: "Usuário aprovado!",
      description: "Um email foi enviado com as instruções de acesso.",
    });
  };

  const handleReject = (id: number) => {
    setRequests(requests.filter(r => r.id !== id));
    toast({
      title: "Solicitação rejeitada",
      description: "O usuário foi notificado por email.",
      variant: "destructive",
    });
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
            { label: "Total de Usuários", value: mockStats.totalUsers, icon: Users, color: "bg-primary" },
            { label: "Solicitações Pendentes", value: mockStats.pendingRequests, icon: Clock, color: "bg-accent" },
            { label: "Aprovados Hoje", value: mockStats.approvedToday, icon: UserCheck, color: "bg-zard-sage" },
            { label: "Flashcards Criados", value: mockStats.totalFlashcards.toLocaleString(), icon: BarChart3, color: "bg-zard-coral" },
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
            {requests.length === 0 ? (
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
