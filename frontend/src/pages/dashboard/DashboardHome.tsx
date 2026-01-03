import { useState, useEffect } from "react";
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
import apiService from "@/services/api";

interface Materia {
  id: number;
  nome: string;
  cor: string;
  flashcards_count?: number;
  flashcards_revisados?: number;
}

const DashboardHome = () => {
  const userId = parseInt(localStorage.getItem('userId') || '0');
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [flashcardsTotal, setFlashcardsTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      const [materiasRes, flashcardsRes] = await Promise.all([
        apiService.listarMaterias(userId),
        apiService.listarFlashcards(userId)
      ]);

      if (materiasRes.success && materiasRes.data) {
        const materiasData = materiasRes.data.slice(0, 3); // Primeiras 3
        setMaterias(materiasData);
      }

      if (flashcardsRes.success && flashcardsRes.data) {
        setFlashcardsTotal(flashcardsRes.data.length);
      }
    } catch (error: any) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const stats = [
    { label: "Matérias", value: materias.length, icon: BookOpen, color: "bg-primary" },
    { label: "Flashcards", value: flashcardsTotal, icon: CreditCard, color: "bg-accent" },
    { label: "Taxa de Acerto", value: "78%", icon: TrendingUp, color: "bg-zard-sage" },
    { label: "Tempo de Estudo", value: "12h", icon: Clock, color: "bg-zard-coral" },
  ];

  const calculateProgress = (materia: Materia) => {
    if (!materia.flashcards_count || materia.flashcards_count === 0) return 0;
    const revisados = materia.flashcards_revisados || 0;
    return Math.round((revisados / materia.flashcards_count) * 100);
  };

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

          {isLoading ? (
            <div className="text-center py-10 text-muted-foreground">Carregando...</div>
          ) : materias.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              <p>Nenhuma matéria encontrada. Crie sua primeira matéria!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-4">
              {materias.map((materia, i) => {
                const progress = calculateProgress(materia);
                return (
                  <motion.div
                    key={materia.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link to={`/dashboard/materias/${materia.id}`}>
                      <div className="p-4 rounded-xl border-2 border-border hover:border-primary/30 transition-colors group">
                        <div className="flex items-center gap-3 mb-3">
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${materia.cor}20` }}
                          >
                            <BookOpen className="w-5 h-5" style={{ color: materia.cor }} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold group-hover:text-primary transition-colors">
                              {materia.nome}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {materia.flashcards_count || 0} flashcards
                            </p>
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all"
                            style={{ 
                              width: `${progress}%`,
                              backgroundColor: materia.cor 
                            }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{progress}% concluído</p>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
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
