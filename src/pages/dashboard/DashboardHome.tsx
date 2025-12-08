import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  CreditCard, 
  TrendingUp, 
  Clock,
  Plus,
  ArrowRight
} from "lucide-react";

const stats = [
  { label: "Matérias", value: 5, icon: BookOpen, color: "bg-primary" },
  { label: "Flashcards", value: 127, icon: CreditCard, color: "bg-accent" },
  { label: "Taxa de Acerto", value: "78%", icon: TrendingUp, color: "bg-zard-sage" },
  { label: "Tempo de Estudo", value: "12h", icon: Clock, color: "bg-zard-coral" },
];

const recentSubjects = [
  { id: 1, name: "Direito Constitucional", color: "#0D9488", flashcards: 45, progress: 72 },
  { id: 2, name: "Português", color: "#F59E0B", flashcards: 32, progress: 85 },
  { id: 3, name: "Raciocínio Lógico", color: "#EC4899", flashcards: 28, progress: 60 },
];

const DashboardHome = () => {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold">Olá, Estudante! 👋</h1>
          <p className="text-muted-foreground">Continue de onde parou e acelere seu aprendizado</p>
        </div>
        <Button variant="hero" asChild>
          <Link to="/dashboard/materias">
            <Plus className="w-4 h-4 mr-2" />
            Nova Matéria
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="hover:shadow-card-hover transition-shadow">
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

      {/* Recent Subjects */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Suas Matérias</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard/materias">
                Ver todas
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {recentSubjects.map((subject, i) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/dashboard/materias/${subject.id}`}>
                  <div className="p-4 rounded-xl border-2 border-border hover:border-primary/30 transition-colors group">
                    <div className="flex items-center gap-3 mb-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${subject.color}20` }}
                      >
                        <BookOpen className="w-5 h-5" style={{ color: subject.color }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {subject.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{subject.flashcards} flashcards</p>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all"
                        style={{ 
                          width: `${subject.progress}%`,
                          backgroundColor: subject.color 
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{subject.progress}% concluído</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <Card className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-2">Revisão Rápida</h3>
            <p className="text-primary-foreground/80 mb-4">
              Revise os flashcards que precisam de atenção
            </p>
            <Button 
              variant="secondary" 
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              asChild
            >
              <Link to="/dashboard/flashcards">
                Iniciar Revisão
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent to-zard-coral text-accent-foreground">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-2">Criar Flashcard</h3>
            <p className="text-accent-foreground/80 mb-4">
              Adicione novos cartões às suas matérias
            </p>
            <Button 
              variant="secondary"
              className="bg-accent-foreground text-accent hover:bg-accent-foreground/90"
              asChild
            >
              <Link to="/dashboard/flashcards">
                Novo Flashcard
                <Plus className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
